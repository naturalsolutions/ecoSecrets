from datetime import date, datetime
from typing import TYPE_CHECKING, List, Optional

from sqlmodel import JSON, Column, Field, Relationship, SQLModel

from src.models.deployment import Deployments

if TYPE_CHECKING:  # pragma: no cover

    from .deployment import Deployments


class ProjectBase(SQLModel):
    name: str
    description: str
    creation_date: date
    start_date: Optional[date]
    end_date: Optional[date]
    status: Optional[str]
    owner_id: Optional[int] = Field(foreign_key="users.id")
    contact_id: Optional[int] = Field(foreign_key="users.id")


class Projects(ProjectBase, table=True):
    id: Optional[int] = Field(primary_key=True, index=True)
    deployments: Optional[List["Deployments"]] = Relationship(back_populates="project")


class ReadProject(ProjectBase):
    id: int


class ProjectWithDeployment(ReadProject):
    deployments: Optional[List[Deployments]]
