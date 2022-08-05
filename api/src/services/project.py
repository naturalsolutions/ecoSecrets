# Service projet
from sqlmodel import Session, select

from src.models.deployment import Deployments
from src.models.file import Files
from src.models.project import ProjectBase, Projects
from src.schemas.schemas import Stats_Project
from src.services import deployment


def get_projects(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Projects).offset(skip).limit(limit).all()


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
    db_project.description = project.description
    db_project.creation_date = project.creation_date
    db_project.end_date = project.end_date
    db_project.status = project.status
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


# def get_projects_with_deployments(db: Session, skip: int = 0, limit: int = 100):
#     projects = get_projects(db, skip=skip, limit=limit)
#     list_projects = []
#     for p in projects:
#         new_p = p.dict()
#         project_id = p.id
#         deployments = deployment.get_project_deployments(db=db, id=project_id)
#         list_deployments = []
#         for d in deployments:
#             new_d = d.dict()
#             list_deployments.append(new_d)
#         new_p["deployments"] = list_deployments
#         list_projects.append(new_p)
#     return list_projects

def get_projects_stats(db: Session, skip: int = 0, limit: int = 100):
 
    # projects_and_deployments_and_images = db.query(Projects, Deployments, Files).filter(Projects.id == Deployments.project_id).filter(Deployments.id == Files.deployment_id).all()

    projects_and_deployments_and_images = get_projects(db)

    result = []
    for project in projects_and_deployments_and_images:
        name = project.name
        status = project.status
        targeted_species = project.targeted_species
        deployment_number = len(project.deployments)

        unique_site = []
        site_number = 0
        unique_device = []
        device_number = 0
        media_number = 0
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
        result.append(Stats_Project(name, status, media_number, deployment_number, site_number, device_number, targeted_species, annotation_percentage))
    print(result)
    return result
