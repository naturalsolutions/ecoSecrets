from datetime import date, datetime
from typing import TYPE_CHECKING, List, Optional

from sqlmodel import JSON, Column, Field, Relationship, SQLModel


class SiteBase(SQLModel):
    name: str
    habitat: str
    description: str


class Sites(SiteBase, table=True):
    id: int = Field(primary_key=True, index=True)
