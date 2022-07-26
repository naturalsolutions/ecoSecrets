from datetime import date, datetime
from typing import TYPE_CHECKING, List, Optional

from sqlmodel import JSON, Column, Field, Relationship, SQLModel

if TYPE_CHECKING:  # pragma: no cover

    from .deployment import Deployments


class Projects(SQLModel, table=True):
    id: Optional[int] = Field(primary_key=True, index=True)
    name: str
    description: str
    creation_date: Optional[datetime]
    end_date: Optional[datetime]
    status: Optional[str]
    owner_id: Optional[int] = Field(foreign_key="users.id")
    contact_id: Optional[int] = Field(foreign_key="users.id")
    deployments: Optional[List["Deployments"]] = Relationship(back_populates="project")
