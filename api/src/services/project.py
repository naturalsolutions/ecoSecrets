# Service projet
from datetime import datetime

from sqlmodel import Session, select

from src.models.deployment import DeploymentForProjectSheet
from src.models.device import Devices
from src.models.file import Files
from src.models.project import ProjectBase, Projects, ProjectWithDeployment
from src.models.site import Sites
from src.schemas.schemas import StatsProject
from src.services import deployment


def get_projects(db: Session, skip: int = 0, limit: int = 100):
    return (
        db.query(Projects)
        .order_by(Projects.creation_date.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )


def get_project(db: Session, project_id: int):
    return db.query(Projects).filter(Projects.id == project_id).first()


def get_project_by_name(db: Session, name_project: str):
    return db.query(Projects).filter(Projects.name == name_project).first()


def create_project(db: Session, project: ProjectBase):
    db_project = Projects(**project.dict())
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project


def update_project(db: Session, project: ProjectBase, id: int):
    db_project = db.query(Projects).filter(Projects.id == id).first()
    db_project.name = project.name
    db_project.creation_date = project.creation_date
    db_project.start_date = project.start_date
    db_project.end_date = project.end_date
    db_project.protocol = project.protocol
    db_project.acquisition_framework = project.acquisition_framework
    db_project.targeted_species = project.targeted_species
    db_project.referential = project.referential
    db_project.timezone = project.timezone
    db_project.image = project.image
    db_project.owner_id = project.owner_id
    db_project.contact_id = project.contact_id
    db.commit()
    db.refresh(db_project)
    return db_project


def delete_project(db: Session, id: int):
    db_project = db.query(Projects).filter(Projects.id == id).first()
    db.delete(db_project)
    db.commit()
    return db_project


def get_informations(db: Session, id: int):
    project = get_project(db, id)
    deploy = deployment.get_project_deployments(db=db, id=id)
    deploys = []
    media_number = 0
    if len(deploy) > 0:
        for d in deploy:
            site = db.query(Sites.name).filter(Sites.id == d.site_id).first()
            device = db.query(Devices.name).filter(Devices.id == d.device_id).first()
            media = db.query(Files).filter(Files.deployment_id == d.id).count()
            data_deployment = DeploymentForProjectSheet(
                id=d.id,
                site_name=site.name,
                device_name=device.name,
                name=d.name,
                start_date=d.start_date,
                end_date=d.end_date,
                site_id=d.site_id,
                device_id=d.device_id,
            )
            media_number += media
            deploys.append(data_deployment)
    project_data = ProjectWithDeployment(**project.dict())
    project_data = project_data.dict()
    project_data["deployments"] = deploys
    project_data["stats"] = {"media_number": media_number, "annotation_percentage": 50}
    return project_data


def get_projects_stats(db: Session, skip: int = 0, limit: int = 100):
    projects_and_deployments_and_images = get_projects(db)
    current_date = datetime.now().date()

    result = []
    for project in projects_and_deployments_and_images:
        id = project.id
        name = project.name
        start_date = project.start_date
        end_date = project.end_date
        targeted_species = project.targeted_species
        deployment_number = len(project.deployments)
        unique_site = []
        site_number = 0
        unique_device = []
        device_number = 0
        media_number = 0
        status = ""
        for deployment in project.deployments:
            if deployment.site_id not in unique_site:
                unique_site.append(deployment.site_id)
                site_number += 1
            if deployment.device_id not in unique_device:
                unique_device.append(deployment.device_id)
                device_number += 1
            media_number += len(deployment.files)
        # TO ADD annotation%
        annotation_percentage = 10.4
        if start_date is None or end_date is None:
            status = "Inconnu"
        elif current_date < start_date:
            status = "A venir"
        elif current_date <= end_date:
            status = "En cours"
        elif annotation_percentage < 100:
            status = "A annoter"
        else:
            status = "Terminé"

        stats = StatsProject(
            id=id,
            name=name,
            start_date=start_date,
            end_date=end_date,
            status=status,
            media_number=media_number,
            deployment_number=deployment_number,
            site_number=site_number,
            device_number=device_number,
            targeted_species=targeted_species,
            annotation_percentage=annotation_percentage,
        )
        result.append(stats.dict())
    return result
