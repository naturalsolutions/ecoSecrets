from typing import List

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from sqlmodel import Session

from src.connectors import s3
from src.connectors.database import get_db
from src.dependencies import get_token_header
from src.models.device import Devices
from src.schemas.device import DeviceBase
from src.services import device

router = APIRouter(
    prefix="/devices",
    tags=["devices"],
    # dependencies=[Depends(get_token_header)],
    responses={404: {"description": "Not found"}},
)


@router.get("/", response_model=List[Devices])
def read_devices(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    devices = device.get_devices(db, skip=skip, limit=limit)
    return devices


@router.get("/{device_id}", response_model=Devices)
def read_device(device_id: int, db: Session = Depends(get_db)):
    db_device = device.get_device(db, device_id=device_id)
    if db_device is None:
        raise HTTPException(status_code=404, detail="device not found")
    return db_device


@router.post("/", response_model=Devices)
def create_device(new_device: DeviceBase, db: Session = Depends(get_db)):
    db_device = device.get_device_by_name(db, name_device=new_device.name)
    if db_device:
        raise HTTPException(status_code=400, detail="Name already registered")
    return device.create_device(db=db, device=new_device)


@router.put("/{device_id}", response_model=Devices)
def update_device(
    device_id: int, data_device: DeviceBase, db: Session = Depends(get_db)
):
    return device.update_device(db=db, device=data_device, id=device_id)


@router.delete("/{device_id}")
def delete_device(device_id: int, db: Session = Depends(get_db)):
    return device.delete_device(db=db, id=device_id)
