from datetime import date, datetime
from typing import TYPE_CHECKING, List, Optional

from sqlmodel import JSON, Column, Field, Relationship, SQLModel

if TYPE_CHECKING:  # pragma: no cover

    from .models import Projects


class Deployments(SQLModel, table=True):
    id: Optional[int] = Field(primary_key=True, index=True)
    name: str
    start_date: Optional[datetime]
    end_date: Optional[datetime]
    site_id: Optional[int] = Field(foreign_key="sites.id")
    device_id: Optional[int] = Field(foreign_key="devices.id")
    bait: str
    feature: str
    description: str
    project_id: int = Field(foreign_key="projects.id")
    project: "Projects" = Relationship(back_populates="deployments")
    template_sequence_id: Optional[int] = Field(foreign_key="templatesequence.id")
    # mode:  Field(foreign_key = "users.id")
