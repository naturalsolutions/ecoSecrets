from datetime import date, datetime
from typing import TYPE_CHECKING, List, Optional

from sqlmodel import JSON, Column, Field, Relationship, SQLModel


class Devices(SQLModel, table=True):
    id: int = Field(primary_key=True, index=True)
    name: str
    model: str
    purchase_date: date
    price: float
    description: str
    detection_area: float
    status: str
    exif_id: Optional[int] = Field(foreign_key="exifkeymodel.id")
