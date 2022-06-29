from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from decouple import config

db_user = config('DB_USER')
db_pwd = config('DB_PASSWORD')
db_name = config('DB_NAME')

SQLALCHEMY_DATABASE_URL = f"postgresql://{db_user}:{db_pwd}@annotation_db/{db_name}"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
