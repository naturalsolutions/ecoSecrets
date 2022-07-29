# Service projet
from sqlmodel import Session

from src.models.project import ProjectBase, Projects
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


def get_projects_with_deployments(db: Session, skip: int = 0, limit: int = 100):
    projects = get_projects(db, skip=skip, limit=limit)
    list_projects = []
    for p in projects:
        new_p = p.dict()
        project_id = p.id
        deployments = deployment.get_project_deployments(db=db, id=project_id)
        list_deployments = []
        for d in deployments:
            new_d = d.dict()
            list_deployments.append(new_d)
        new_p["deployments"] = list_deployments
        list_projects.append(new_p)
    return list_projects
