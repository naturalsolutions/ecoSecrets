from datetime import datetime
from typing import TYPE_CHECKING, List, Optional

from sqlmodel import Field, Relationship, SQLModel

from src.models.file import Files, ReadFiles
from src.models.models import DeploymentTemplateSequenceCorrespondance, ORMModelConfig, TemplateSequence, TemplateSequenceRead

if TYPE_CHECKING:  # pragma: no cover
    from .device import Devices
    from .project import Projects
    from .site import Sites


class DeploymentEssentials(ORMModelConfig, SQLModel):
    name: str
    start_date: datetime
    end_date: Optional[datetime] = None
    site_id: int = Field(foreign_key="sites.id")
    device_id: int = Field(foreign_key="devices.id")


class DeploymentBase(DeploymentEssentials):
    height: Optional[float] = None
    support: Optional[str] = None
    bait: Optional[str] = None
    feature: Optional[str] = None
    description: Optional[str] = None
    image: Optional[str] = None
    project_id: int = Field(foreign_key="projects.id")


class Deployments(DeploymentBase, table=True):
    id: Optional[int] = Field(primary_key=True, index=True)
    project: "Projects" = Relationship(back_populates="deployments")
    files: Optional[List["Files"]] = Relationship(
        back_populates="deployment",
        sa_relationship_kwargs={"lazy": "raise", "order_by": "Files.name"},
    )
    sites: Optional["Sites"] = Relationship(
        back_populates="deployments",
        sa_relationship_kwargs={"lazy": "raise"}
    )
    devices: Optional["Devices"] = Relationship(
        back_populates="deployments",
        sa_relationship_kwargs={"lazy": "raise"}
    )
    template_sequences: Optional[List["TemplateSequence"]] = Relationship(
        back_populates="deployments",
        link_model=DeploymentTemplateSequenceCorrespondance
    )


class ReadDeployment(DeploymentBase):
    id: int


class DeploymentWithFile(ReadDeployment):
    files: Optional[List[ReadFiles]] = None


class DeploymentWithTemplateSequence(ReadDeployment):
    template_sequences: Optional[List["TemplateSequenceRead"]] = None


class NewDeploymentWithTemplateSequence(DeploymentBase):
    template_sequences: Optional[List["TemplateSequenceRead"]] = None


class DeploymentForProjectSheet(DeploymentEssentials):
    id: int
    site_name: Optional[str] = None
    device_name: Optional[str] = None