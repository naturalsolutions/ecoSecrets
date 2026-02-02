from typing import List, Optional

from sqlmodel import Field, Relationship, SQLModel

from src.models.deployment import Deployments


class SiteBase(SQLModel):
    name: str
    latitude: float
    longitude: float
    habitat: Optional[str] = None
    description: Optional[str] = None
    image: Optional[str] = None


class Sites(SiteBase, table=True):
    id: Optional[int] = Field(primary_key=True, index=True)
    deployments: Optional[List["Deployments"]] = Relationship(
        back_populates="sites", sa_relationship_kwargs={"lazy": "raise"}
    )

class ReadSite(SiteBase):
    id: int
