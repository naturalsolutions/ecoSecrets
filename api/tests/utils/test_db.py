from sqlalchemy_utils import create_database, database_exists, drop_database
from sqlmodel import SQLModel, create_engine

from src.config import settings

DATABASE_URL = settings.DB_URL
db_test_uri = f"{DATABASE_URL}_test"

engine = create_engine(db_test_uri)
if database_exists(engine.url):
    drop_database(engine.url)
create_database(engine.url)


def init_test_db():
    SQLModel.metadata.create_all(engine)
