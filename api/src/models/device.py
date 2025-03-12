from datetime import date
from typing import List, Optional

from sqlmodel import Field, Relationship, SQLModel

from src.models.deployment import Deployments


class DeviceBase(SQLModel):
    name: str
    model: Optional[str]
    purchase_date: Optional[date]
    price: Optional[float]
    description: Optional[str]
    detection_area: Optional[float]
    status: Optional[str]
    operating_life: Optional[float]
    image: Optional[str]
    exif_id: Optional[int] = Field(foreign_key="exifkeymodel.id")


class Devices(DeviceBase, table=True):
    id: Optional[int] = Field(primary_key=True, index=True)
    deployments: Optional[List["Deployments"]] = Relationship(
        back_populates="devices", sa_relationship_kwargs={"lazy": "raise"}
    )


class DeviceMenu(Devices):
    nb_images: int
    last_image_date: date = Field(default=None)
