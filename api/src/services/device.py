from sqlmodel import Session

from src.models.device import Devices
from src.schemas.device import DeviceBase


def get_devices(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Devices).offset(skip).limit(limit).all()


def get_device(db: Session, device_id: int):
    return db.query(Devices).filter(Devices.id == device_id).first()


def get_device_by_name(db: Session, name_device: str):
    return db.query(Devices).filter(Devices.name == name_device).first()


def create_device(db: Session, device: DeviceBase):
    db_device = Devices(
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


def update_device(db: Session, device: DeviceBase, id: int):
    db_device = db.query(Devices).filter(Devices.id == id).first()
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
    db_device = db.query(Devices).filter(Devices.id == id).first()
    db.delete(db_device)
    db.commit()
    return db_device
