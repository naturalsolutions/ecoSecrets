from datetime import date, datetime
from typing import TYPE_CHECKING, List, Optional

from sqlmodel import JSON, Column, Field, Relationship, SQLModel

from src.models.file import Files
from src.models.models import DeploymentTemplateSequenceCorrespondance, TemplateSequence

if TYPE_CHECKING:  # pragma: no cover

    from .file import Files
    from .project import Projects


class DeploymentEssentials(SQLModel):
    name: str
    start_date: datetime
    end_date: Optional[datetime]
    site_id: int = Field(foreign_key="sites.id")
    device_id: int = Field(foreign_key="devices.id")


class DeploymentBase(DeploymentEssentials):
    height: Optional[float]
    support: Optional[str]
    bait: Optional[str]
    feature: Optional[str]
    description: Optional[str]
    image: Optional[str]
    project_id: int = Field(foreign_key="projects.id")


class Deployments(DeploymentBase, table=True):
    id: Optional[int] = Field(primary_key=True, index=True)
    project: "Projects" = Relationship(back_populates="deployments")
    files: Optional[List["Files"]] = Relationship(back_populates="deployment")
    template_sequences: Optional[List["TemplateSequence"]] = Relationship(back_populates="deployments", link_model=DeploymentTemplateSequenceCorrespondance)


class ReadDeployment(DeploymentBase):
    id: int


class DeploymentWithFile(ReadDeployment):
    files: Optional[List[Files]]


class DeploymentWithTemplateSequence(ReadDeployment):
    template_sequences: Optional[List[TemplateSequence]]


class DeploymentForProjectSheet(DeploymentEssentials):
    id: int
    site_name: Optional[str]
    device_name: Optional[str]
