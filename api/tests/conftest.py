from typing import Generator

import pytest
from fastapi.testclient import TestClient

from src.connectors.database import get_db
from src.main import app

# from app.s3.base import init_bucket, remove_bucket
from tests.utils.overrides import override_get_session
from tests.utils.test_db import init_test_db

app.dependency_overrides[get_db] = override_get_session


@pytest.fixture(scope="session", autouse=True)
def create_test_database():
    init_test_db()


# @pytest.fixture(scope="session", autouse=True)
# def create_bucket():
#     bucket_name = "testbucket"  # Careful: no underscore
#     setattr(settings, "MINIO_BUCKET_NAME", bucket_name)
#     yield init_bucket()
#     remove_bucket(bucket_name)


@pytest.fixture(scope="session")
def db() -> Generator:
    return next(override_get_session())


@pytest.fixture(scope="module")
def client() -> Generator:
    with TestClient(app) as test_client:
        yield test_client


# Add fixtures here
pytest_plugins = [
    "tests.fixtures.device",
    "tests.fixtures.deployment",
    "tests.fixtures.site",
    "tests.fixtures.project",
    "tests.fixtures.file",
    "tests.fixtures.keycloak",
]
