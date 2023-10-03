import os
from datetime import datetime as dt
from pathlib import Path

from sqlmodel import Session, create_engine

from src.config import settings
from src.models.deployment import NewDeploymentWithTemplateSequence
from src.models.device import DeviceBase
from src.models.models import Roles
from src.models.project import ProjectBase
from src.models.site import SiteBase
from src.schemas.user import UserCreate
from src.services import deployment, device, files, project, site, user

DATABASE_URL = settings.DB_URL

engine = create_engine(DATABASE_URL, echo=True)


def init_db():
    # TODO: make it conditionnal not to create at each startup
    with Session(engine) as session:
        role = Roles(role="user", description="default_user")
        session.add(role)
        session.commit()
        owner = user.create_user(
            db=session,
            user=UserCreate(name="user", email="user@user.com", password="password"),
        )
        project_example = project.create_project(
            db=session,
            project=ProjectBase(
                name="Projet 1",
                description="Description premier projet",
                protocole="Protocole A",
                creation_date=dt.fromisoformat("2022-04-12"),
                start_date=dt.fromisoformat("2022-04-12"),
                end_date=dt.fromisoformat("2023-04-12"),
                protocol="Protocole A",
                acquisition_framework="Acq 1",
                targeted_species="Loup",
                referential="ref 1",
                timezone="CET",
                image="",
                onwner_id=owner.id,
                contact_id=owner.id,
            ),
        )
        project.create_project(
            db=session,
            project=ProjectBase(
                name="Projet 2",
                creation_date=dt.fromisoformat("2022-04-12"),
                start_date=dt.fromisoformat("2022-09-12"),
                end_date=dt.fromisoformat("2022-12-12"),
                description="Description deuxième projet",
                owner_id=owner.id,
                contact_id=owner.id,
            ),
        )

        site_example = site.create_site(
            db=session,
            site=SiteBase(
                name="Site 1",
                latitude=43.29,
                longitude=5.37,
                habitat="Prairie",
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
            deployment=NewDeploymentWithTemplateSequence(
                name="Déploiement 1",
                site_id=site_example.id,
                device_id=device_example.id,
                start_date=dt.fromisoformat("2022-04-12"),
                end_date=dt.fromisoformat("2022-04-12"),
                description="Description premier déploiement",
                bait="None",
                feature="Arbre fruitier",
                project_id=project_example.id,
                template_sequences=[]
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
