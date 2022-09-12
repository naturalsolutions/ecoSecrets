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
    operating_life: float
    exif_id: Optional[int] = Field(foreign_key="exifkeymodel.id")


class Devices(DeviceBase, table=True):
    id: int = Field(primary_key=True, index=True)


class DeviceMenu(Devices):
    nb_images: int
    last_image_date: date = Field(default=None)
