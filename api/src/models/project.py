from datetime import date
from typing import TYPE_CHECKING, List, Optional

from pydantic import field_validator
from sqlmodel import Field, Relationship, SQLModel

from src.models.deployment import (
    DeploymentForProjectSheet,
    Deployments,
    DeploymentWithFile,
    ReadDeployment,
)
from src.models.models import ORMModelConfig
from src.schemas.schemas import DataProject

if TYPE_CHECKING:  # pragma: no cover
    from .deployment import Deployments


class ProjectBase(ORMModelConfig, SQLModel):
    name: str
    creation_date: date
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    protocol: Optional[str] = None
    acquisition_framework: Optional[str] = None
    targeted_species: Optional[str] = None
    referential: Optional[str] = None
    timezone: Optional[str] = None
    image: Optional[str] = None

    @field_validator("name")
    def check_storage_type(cls, value):
        if len(value) < 2:
            raise ValueError("Name project must be greater than 2 characters")
        return value


class Projects(ProjectBase, table=True):
    id: Optional[int] = Field(primary_key=True, index=True)
    deployments: Optional[List["Deployments"]] = Relationship(
        back_populates="project", sa_relationship_kwargs={"lazy": "raise"}
    )


class ReadProject(ProjectBase):
    id: int


class ProjectWithDeployment(ReadProject):
    deployments: Optional[List[ReadDeployment]] = None


class ProjectWithDeploymentAndFiles(ReadProject):
    deployments: Optional[List[DeploymentWithFile]] = None


class ProjectSheet(ReadProject):
    deployments: List[DeploymentForProjectSheet] = None
    stats: DataProject
