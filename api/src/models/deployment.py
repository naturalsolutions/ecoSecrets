from datetime import date, datetime
from typing import TYPE_CHECKING, List, Optional

from sqlmodel import JSON, Column, Field, Relationship, SQLModel

from src.models.file import Files

if TYPE_CHECKING:  # pragma: no cover

    from .file import Files
    from .project import Projects


class DeploymentBase(SQLModel):
    name: str
    start_date: Optional[datetime]
    end_date: Optional[datetime]
    site_id: Optional[int] = Field(foreign_key="sites.id")
    device_id: Optional[int] = Field(foreign_key="devices.id")
    bait: str
    feature: str
    description: str
    project_id: int = Field(foreign_key="projects.id")
    template_sequence_id: Optional[int] = Field(foreign_key="templatesequence.id")


class Deployments(DeploymentBase, table=True):
    id: Optional[int] = Field(primary_key=True, index=True)
    project: "Projects" = Relationship(back_populates="deployments")
    files: Optional[List["Files"]] = Relationship(back_populates="deployment")
    # mode:  Field(foreign_key = "users.id")


class ReadDeployment(DeploymentBase):
    id: int


class DeploymentWithFile(ReadDeployment):
    files: Optional[List[Files]]
