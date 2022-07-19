from sqlmodel import Session

from src.models import models
from src.schemas import schemas


def get_devices(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Devices).offset(skip).limit(limit).all()


def get_device(db: Session, device_id: int):
    return db.query(models.Devices).filter(models.Devices.id == device_id).first()


def get_device_by_name(db: Session, name_device: str):
    return db.query(models.Devices).filter(models.Devices.name == name_device).first()


def create_device(db: Session, device: schemas.Device):
    db_device = models.Devices(
        name=device.name,
        description=device.description,
        status=device.status,
        model=device.model,
        purchase_date=device.purchase_date,
        price=device.price,
        detection_area=device.detection_area,
        exif_id=device.exif_id,
    )
    db.add(db_device)
    db.commit()
    db.refresh(db_device)
    return db_device


def update_device(db: Session, device: schemas.Device, id: int):
    db_device = db.query(models.Devices).filter(models.Devices.id == id).first()
    db_device.name = device.name
    db_device.description = device.description
    db_device.status = device.status
    db_device.model = device.model
    db_device.purchase_date = device.purchase_date
    db_device.price = device.price
    db_device.detection_area = device.detection_area
    db.commit()
    db.refresh(db_device)
    return db_device


def delete_device(db: Session, id: int):
    db_device = db.query(models.Devices).filter(models.Devices.id == id).first()
    db.delete(db_device)
    db.commit()
    return db_device
