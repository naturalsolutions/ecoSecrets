from datetime import date, datetime
from typing import TYPE_CHECKING, List, Optional

from sqlmodel import JSON, Column, Field, Relationship, SQLModel


class SiteBase(SQLModel):
    name: str
    latitude: float
    longitude: float
    habitat: Optional[str]
    description: Optional[str]


class Sites(SiteBase, table=True):
    id: Optional[int] = Field(primary_key=True, index=True)
