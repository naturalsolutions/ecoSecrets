import pytest


@pytest.fixture(scope="session")
def admin_headers():
    """
    Header simulating an admin user.
    Can be used with TestClient.get(..., headers=admin_headers)
    """
    return {"Authorization": "Bearer test-admin"}


@pytest.fixture(scope="session")
def basic_headers():
    """
    Header simulating an basic user.
    Can be used with TestClient.get(..., headers=basic_headers)
    """
    return {"Authorization": "Bearer test-basic"}


@pytest.fixture(scope="session")
def admin_user():
    """
    Fake admin user for tests.
    """
    return {
        "sub": "admin-id",
        "username": "admin@ecosecrets.fr",
        "email": "admin@ecosecrets.fr",
        "realm_access": {"roles": ["admin"]},
    }


@pytest.fixture(scope="session")
def basic_user():
    """
    Fake basic user for tests
    """
    return {
        "sub": "basic-id",
        "username": "basic@ecosecrets.fr",
        "email": "basic@ecosecrets.fr",
        "realm_access": {"roles": []},
    }
