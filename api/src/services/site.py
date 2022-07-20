from sqlmodel import Session

from src.models import models
from src.schemas import schemas


def get_sites(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Sites).offset(skip).limit(limit).all()


def get_site(db: Session, site_id: int):
    return db.query(models.Sites).filter(models.Sites.id == site_id).first()


def get_site_by_name(db: Session, name_site: str):
    return db.query(models.Sites).filter(models.Sites.name == name_site).first()


def create_site(db: Session, site: schemas.SiteBase):
    db_site = models.Sites(
        name=site.name, description=site.description, habitat=site.habitat
    )
    db.add(db_site)
    db.commit()
    db.refresh(db_site)
    return db_site


def update_site(db: Session, site: schemas.SiteBase, id: int):
    db_site = db.query(models.Sites).filter(models.Sites.id == id).first()
    db_site.name = site.name
    db_site.description = site.description
    db_site.habitat = site.habitat
    db.commit()
    db.refresh(db_site)
    return db_site


def delete_site(db: Session, id: int):
    db_site = db.query(models.Sites).filter(models.Sites.id == id).first()
    db.delete(db_site)
    db.commit()
    return db_site
