from datetime import date
from typing import Optional

from sqlmodel import Field, SQLModel


class DeviceBase(SQLModel):
    name: str
    model: str
    purchase_date: date
    price: float
    description: str
    detection_area: float
    status: str
    exif_id: Optional[int] = Field(foreign_key="exifkeymodel.id")


# class Device(DeviceBase):
#     id: int
