from decouple import config
from sqlalchemy_utils import create_database, database_exists, drop_database
from sqlmodel import Session, SQLModel, create_engine

from src.models.deployment import Deployments
from src.models.device import Devices
from src.models.models import Roles
from src.models.project import ProjectBase
from src.models.site import SiteBase, Sites
from src.schemas.deployment import DeploymentBase
from src.schemas.device import DeviceBase
from src.schemas.schemas import UserCreate
from src.services import deployment, device, project, site, user

DATABASE_URL = config("DB_URL")

engine = create_engine(DATABASE_URL, echo=True)
if database_exists(engine.url):
    drop_database(engine.url)
create_database(engine.url)


def init_db():
    SQLModel.metadata.drop_all(engine)
    SQLModel.metadata.create_all(engine)
    with Session(engine) as session:
        role = Roles(role="user", description="default_user")
        session.add(role)
        session.commit()
        user.create_user(
            db=session,
            user=UserCreate(
                name="jeanjacques", email="jj@gmail.com", password="password"
            ),
        )
        project.create_project(
            db=session,
            project=ProjectBase(
                name="frist project",
                description="desc firt project",
                owner_id=1,
                contact_id=1,
            ),
        )
        project.create_project(
            db=session,
            project=ProjectBase(
                name="second project",
                description="desc second project",
                owner_id=1,
                contact_id=1,
            ),
        )
        deployment.create_deployment(
            db=session,
            deployment=DeploymentBase(
                name="frist deploy",
                description="desc firt project",
                bait="aurélie",
                feature="fruitin tree",
                project_id=1,
            ),
        )
        site.create_site(
            db=session,
            site=SiteBase(name="first site", habitat="toto", description="description"),
        )
        device.create_device(
            db=session,
            device=DeviceBase(
                name="first device",
                model="model",
                purchase_date="2022-07-19",
                price=120,
                description="gcvsusbck",
                detection_area=1163,
                status="blabla",
            ),
        )


# Dependency
def get_db():
    with Session(engine) as session:
        yield session
