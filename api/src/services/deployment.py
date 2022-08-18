from sqlmodel import Session, SQLModel

from src.models.deployment import DeploymentBase, Deployments
from src.services.utils import get_object_id, get_objects


def get_deployments(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Deployments).offset(skip).limit(limit).all()


def get_deployment(db: Session, deployment_id: int):
    return db.query(Deployments).filter(Deployments.id == deployment_id).first()


def get_deployment_by_name(db: Session, name_deployment: str):
    return db.query(Deployments).filter(Deployments.name == name_deployment).first()


def create_deployment(db: Session, deployment: DeploymentBase):
    db_deployment = Deployments(
        name=deployment.name,
        description=deployment.description,
        start_date=deployment.start_date,
        end_date=deployment.end_date,
        bait=deployment.bait,
        feature=deployment.feature,
        project_id=deployment.project_id,
        template_sequence_id=deployment.template_sequence_id,
        site_id=deployment.site_id,
        device_id=deployment.device_id,
    )
    db.add(db_deployment)
    db.commit()
    db.refresh(db_deployment)
    return db_deployment


def update_deployment(db: Session, deployment: DeploymentBase, id: int):
    db_deployment = db.query(Deployments).filter(Deployments.id == id).first()
    db_deployment.name = deployment.name
    db_deployment.description = deployment.description
    db_deployment.start_date = deployment.start_date
    db_deployment.end_date = deployment.end_date
    db_deployment.bait = deployment.bait
    db_deployment.feature = deployment.feature
    db_deployment.template_sequence_id = deployment.template_sequence_id
    db_deployment.site_id = deployment.site_id
    db_deployment.project_id = deployment.project_id
    db_deployment.device_id = deployment.device_id
    db.commit()
    db.refresh(db_deployment)
    return db_deployment


def delete_deployment(db: Session, id: int):
    db_deployment = db.query(Deployments).filter(Deployments.id == id).first()
    db.delete(db_deployment)
    db.commit()
    return db_deployment


def get_project_deployments(db: Session, id: int):
    return db.query(Deployments).filter(Deployments.project_id == id).all()
