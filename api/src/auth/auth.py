from functools import lru_cache
import logging
from typing import Annotated
from src.config import settings

import httpx
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from authlib.jose import JsonWebToken, JsonWebKey
from authlib.jose.errors import JoseError


KEYCLOAK_URL = settings.KEYCLOAK_CLIENT_URL.rstrip("/")
REALM = settings.KEYCLOAK_REALM
CLIENT_ID = settings.KEYCLOAK_CLIENT_ID
KEYCLOAK_SERVER_URL=settings.KEYCLOAK_SERVER_URL

ISSUER = f"{KEYCLOAK_URL}/realms/{REALM}"
JWKS_URL = f"{KEYCLOAK_SERVER_URL}/realms/{REALM}/protocol/openid-connect/certs"

security = HTTPBearer()
jwt = JsonWebToken(["RS256"])



@lru_cache(maxsize=1)
def get_jwks():
    """
    Récupère la clé publique Keycloak.
    """
    response = httpx.get(JWKS_URL, timeout=5.0)
    response.raise_for_status()
    jwks = response.json()
    return JsonWebKey.import_key_set(jwks)



logger = logging.getLogger(__name__)

def verify_token(token: str):
    try:
        key_set = get_jwks()

        claims = jwt.decode(
            token,
            key_set,
            claims_options={
                "iss": {"essential": True, "value": ISSUER},
                "exp": {"essential": True},
            },
        )

        claims.validate()
        return claims

    except JoseError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"JWT error: {str(e)}",
        )

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )

def get_current_token(
    credentials: Annotated[HTTPAuthorizationCredentials, Depends(security)],
) -> dict:
    return verify_token(credentials.credentials)


def require_role(role: str):
    def role_checker(token: dict = Depends(get_current_token)):
        roles = token.get("realm_access", {}).get("roles", [])
        if role not in roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Not enough permissions",
            )
        return token

    return role_checker
