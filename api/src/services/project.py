# Service projet
from sqlmodel import Session

from src.models import models
from src.schemas import schemas


def get_projects(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Projects).offset(skip).limit(limit).all()


def get_project(db: Session, project_id: int):
    return db.query(models.Projects).filter(models.Projects.id == project_id).first()


def get_project_by_name(db: Session, name_project: str):
    return (
        db.query(models.Projects).filter(models.Projects.name == name_project).first()
    )


def create_project(db: Session, project: schemas.Project):
    db_project = models.Projects(
        name=project.name,
        description=project.description,
        creation_date=project.creation_date,
        end_date=project.end_date,
        status=project.status,
        owner_id=project.owner_id,
        contact_id=project.contact_id,
    )
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project


def update_project(db: Session, project: schemas.Project, id: int):
    db_project = db.query(models.Projects).filter(models.Projects.id == id).first()
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
    db_project = db.query(models.Projects).filter(models.Projects.id == id).first()
    db.delete(db_project)
    db.commit()
    return db_project
