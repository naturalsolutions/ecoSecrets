import os
from datetime import datetime as dt
from pathlib import Path

from decouple import config
from sqlalchemy_utils import create_database, database_exists, drop_database
from sqlmodel import Session, SQLModel, create_engine

from src.models.deployment import DeploymentBase, Deployments
from src.models.device import DeviceBase, Devices
from src.models.models import Roles
from src.models.project import ProjectBase
from src.models.site import SiteBase, Sites
from src.schemas.user import UserCreate
from src.services import deployment, device, files, project, site, user

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
        owner = user.create_user(
            db=session,
            user=UserCreate(
                name="jeanjacques", email="jj@gmail.com", password="password"
            ),
        )
        project.create_project(
            db=session,
            project=ProjectBase(
                name="Projet 1",
                description="Description premier projet",
                targeted_species="Loup",
                protocole="Protocole A",
                creation_date=dt.fromisoformat("2022-04-12"),
                start_date=dt.fromisoformat("2022-04-12"),
                end_date=dt.fromisoformat("2022-04-12"),
                owner_id=owner.id,
                contact_id=owner.id,
            ),
        )
        project_example = project.create_project(
            db=session,
            project=ProjectBase(
                name="Projet 2",
                creation_date=dt.fromisoformat("2022-04-12"),
                start_date=dt.fromisoformat("2022-04-12"),
                end_date=dt.fromisoformat("2022-04-12"),
                description="Description deuxième projet",
                owner_id=owner.id,
                contact_id=owner.id,
            ),
        )

        site_example = site.create_site(
            db=session,
            site=SiteBase(
                name="Site 1",
                latitude=40.23,
                longitude=90.75,
                habitat="toto",
                description="Description",
            ),
        )
        device_example = device.create_device(
            db=session,
            device=DeviceBase(
                name="Dispositif 1",
                model="Modèle A",
                purchase_date="2022-07-19",
                price=120,
                description="Description",
                detection_area=1163,
                status="En stock",
                operating_life=2000,
            ),
        )

        deployment_example = deployment.create_deployment(
            db=session,
            deployment=DeploymentBase(
                name="Déploiement 1",
                site_id=site_example.id,
                device_id=device_example.id,
                start_date=dt.fromisoformat("2022-04-12"),
                end_date=dt.fromisoformat("2022-04-12"),
                description="Description premier déploiement",
                bait="None",
                feature="Arbre fruitier",
                project_id=project_example.id,
            ),
        )

        path = Path(__file__).parent.parent.parent
        if not os.path.isdir(os.path.join(path, "img")):
            os.mkdir(os.path.join(path, "img"))
        for fileName in os.listdir(os.path.join(path, "img")):
            fileNameSplit = fileName.split(".")
            print(os.path.join(path, "img", fileName))
            with open(os.path.join(path, "img", fileName), "rb") as file:
                files.upload_file(
                    db=session,
                    hash=fileNameSplit[0],
                    ext=fileNameSplit[1],
                    filename=fileName,
                    new_file=file,
                    deployment_id=deployment_example.id,
                )


# Dependency
def get_db():
    with Session(engine) as session:
        yield session
