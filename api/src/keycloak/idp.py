from src.config import settings
from src.keycloak.base import Keycloak

idp = Keycloak(
    admin_client_secret=settings.KEYCLOAK_ADMIN_CLIENT_SECRET,
    callback_uri=settings.KEYCLOAK_CALLBACK_URI,
    client_id=settings.KEYCLOAK_CLIENT_ID,
    client_secret=settings.KEYCLOAK_CLIENT_SECRET,
    realm=settings.KEYCLOAK_REALM,
    server_url=settings.KEYCLOAK_SERVER_URL,
    token_uri=settings.KEYCLOAK_TOKEN_URI,
)
