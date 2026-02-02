from datetime import date
from typing import TYPE_CHECKING, List, Optional

from pydantic import ConfigDict
from sqlmodel import Field, Relationship, SQLModel

from src.models.models import ORMModelConfig

if TYPE_CHECKING:
    from .deployment import Deployments


class DeviceBase(ORMModelConfig, SQLModel):
    name: str
    model: Optional[str] = None
    purchase_date: Optional[date] = None
    price: Optional[float] = None
    description: Optional[str] = None
    detection_area: Optional[float] = None
    status: Optional[str] = None
    operating_life: Optional[float] = None
    image: Optional[str] = None


class Devices(DeviceBase, table=True):
    id: Optional[int] = Field(primary_key=True, index=True)
    deployments: Optional[List["Deployments"]] = Relationship(
        back_populates="devices", sa_relationship_kwargs={"lazy": "raise"}
    )


class DeviceMenu(DeviceBase):
    id: int
    nb_images: int
    last_image_date: Optional[date] = None
