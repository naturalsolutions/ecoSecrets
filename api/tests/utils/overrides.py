from typing import Generator

from sqlmodel import Session

from tests.utils.test_db import engine


def override_get_session() -> Generator:
    with Session(engine) as session:
        yield session
