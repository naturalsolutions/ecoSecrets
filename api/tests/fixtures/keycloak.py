from fastapi_keycloak import KeycloakToken, OIDCUser
from pytest import fixture

from src.keycloak.idp import idp


def generate_token(user: OIDCUser, password: str):
    token: KeycloakToken = idp.user_login(username=user.preferred_username, password=password)
    return {"Authorization": str(token)}


def get_group_or_create(name: str):
    groups = idp.get_groups([name])
    if len(groups) == 0:
        return idp.create_group(group_name=name)
    return groups[0]


@fixture(scope="session")
def admin_headers(admin_user, password):
    return generate_token(user=admin_user, password=password)


@fixture(scope="session")
def basic_headers(basic_user, password):
    return generate_token(user=basic_user, password=password)


@fixture(scope="session")
def password():
    return "test"


@fixture(scope="session")
def admin_group():
    name = "admin_group"
    group = get_group_or_create(name=name)
    yield group
    idp.delete_group(group.id)


@fixture(scope="session")
def basic_group():
    name = "basic_group"
    group = get_group_or_create(name=name)
    yield group
    idp.delete_group(group.id)


@fixture(scope="session")
def admin_user(admin_group, password):
    username = "admin@admin.fr"
    user = idp.create_user(
        first_name="pytest",
        last_name="admin",
        username=username,
        email=username,
        password=password,
        enabled=True,
        initial_roles=["admin"],
        send_email_verification=False,
    )
    # Add to group
    idp.add_user_group(user_id=user.id, group_id=admin_group.id)
    oidc_user = get_user(username=username, password=password)
    yield oidc_user
    idp.delete_user(user.id)


def get_user(username: str, password: str):
    # Get Token to have the proper object: OIDCUser
    token: KeycloakToken = idp.user_login(username=username, password=password)
    decoded_token = idp._decode_token(token=token.access_token, audience="account")
    return OIDCUser.parse_obj(decoded_token)


@fixture(scope="session")
def basic_user(basic_group, password):
    username = "basic@basic.fr"
    user = idp.create_user(
        first_name="pytest",
        last_name="basic",
        username=username,
        email=username,
        password=password,
        enabled=True,
        initial_roles=[],
        send_email_verification=False,
    )
    idp.add_user_group(user_id=user.id, group_id=basic_group.id)
    oidc_user = get_user(username=username, password=password)
    yield oidc_user
    idp.delete_user(user.id)
