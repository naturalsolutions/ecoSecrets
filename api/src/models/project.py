from datetime import date, datetime
from typing import TYPE_CHECKING, List, Optional

from sqlmodel import JSON, Column, Field, Relationship, SQLModel

from src.models.deployment import (
    DeploymentForProjectSheet,
    Deployments,
    DeploymentWithFile,
)
from src.models.file import Files
from src.schemas.schemas import DataProject

if TYPE_CHECKING:  # pragma: no cover

    from .deployment import Deployments
    from .file import Files


class ProjectBase(SQLModel):
    name: str
    description: str
    creation_date: date
    start_date: Optional[date]
    end_date: Optional[date]
    protocole: Optional[str]
    status: Optional[str]
    targeted_species: Optional[str]
    owner_id: Optional[int] = Field(foreign_key="users.id")
    contact_id: Optional[int] = Field(foreign_key="users.id")


class Projects(ProjectBase, table=True):
    id: Optional[int] = Field(primary_key=True, index=True)
    deployments: Optional[List["Deployments"]] = Relationship(back_populates="project")


class ReadProject(ProjectBase):
    id: int


class ProjectWithDeployment(ReadProject):
    deployments: Optional[List[Deployments]]


class ProjectWithDeploymentAndFiles(ReadProject):
    deployments: Optional[List[DeploymentWithFile]]


class ProjectSheet(ReadProject):
    deployments: List[DeploymentForProjectSheet]
    stats: DataProject
