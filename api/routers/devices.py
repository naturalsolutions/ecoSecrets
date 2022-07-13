from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from sqlmodel import Session
from dependencies import get_token_header
from connectors import s3
from connectors.database import get_db
from services import device
from models import models
from schemas import schemas
from typing import List

router = APIRouter(
    prefix="/devices",
    tags=["devices"],
    # dependencies=[Depends(get_token_header)],
    responses={404: {"description": "Not found"}},
)

@router.get("/", response_model=List[schemas.Device])
def read_devices(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    devices = device.get_devices(db, skip=skip, limit=limit)
    return devices


@router.get("/{device_id}", response_model=schemas.Device)
def read_device(device_id: int, db: Session = Depends(get_db)):
    db_device = device.get_device(db, device_id=device_id)
    if db_device is None:
        raise HTTPException(status_code=404, detail="device not found")
    return db_device

@router.post("/", response_model=schemas.Device)
def create_device(new_device: schemas.Device, db: Session = Depends(get_db)):
    db_device = device.get_device_by_name(db, name_device=new_device.name)
    if db_device:
        raise HTTPException(status_code=400, detail="Name already registered")
    return device.create_device(db=db, device=new_device)

@router.put("/{device_id}", response_model=schemas.Device)
def update_device(device_id: int, data_device: schemas.Device, db: Session = Depends(get_db)):
    return device.update_device(db=db, device=data_device, id=device_id)

@router.delete("/{device_id}")
def delete_device(device_id: int, db: Session = Depends(get_db)):
    return device.delete_device(db=db, id=device_id)