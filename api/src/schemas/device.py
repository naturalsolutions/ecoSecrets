from datetime import date, datetime
from typing import List, Optional, Union

from sqlmodel import SQLModel


class DeviceBase(SQLModel):
    name: str
    model: str
    purchase_date: date
    price: float
    description: str
    detection_area: float
    status: str
    exif_id: Optional[int]


class Device(DeviceBase):
    id: int
