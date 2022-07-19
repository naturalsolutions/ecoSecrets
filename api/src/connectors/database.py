from decouple import config
from sqlalchemy_utils import create_database, database_exists, drop_database
from sqlmodel import Session, SQLModel, create_engine

from src.models import models
from src.schemas.schemas import UserCreate
from src.services import user

DATABASE_URL = config("DB_URL")

engine = create_engine(DATABASE_URL, echo=True)
if database_exists(engine.url):
    drop_database(engine.url)
create_database(engine.url)


def init_db():
    SQLModel.metadata.drop_all(engine)
    SQLModel.metadata.create_all(engine)
    with Session(engine) as session:
        role = models.Roles(role="user", description="default_user")
        session.add(role)
        session.commit()
        user.create_user(
            db=session,
            user=UserCreate(
                name="jeanjacques", email="jj@gmail.com", password="password"
            ),
        )
        project = models.Projects(
            name="frist project",
            description="desc firt project",
            owner_id=1,
            contact_id=1,
        )
        session.add(project)
        session.commit()
        project = models.Projects(
            name="second project",
            description="desc second project",
            owner_id=1,
            contact_id=1,
        )
        session.add(project)
        session.commit()
        deploy = models.Deployments(
            name="frist deploy",
            description="desc firt project",
            bait="aurélie",
            feature="fruitin tree",
            project_id=1,
        )
        session.add(deploy)
        session.commit()


# Dependency
def get_db():
    with Session(engine) as session:
        yield session
