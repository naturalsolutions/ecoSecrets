import uuid as uuid_pkg
from datetime import datetime, timedelta
from typing import TYPE_CHECKING, List, Optional

from pydantic import AnyHttpUrl
from sqlalchemy.dialects.postgresql import JSONB
from sqlmodel import Column, Field, Relationship, SQLModel

from src.connectors.s3 import get_url

if TYPE_CHECKING:  # pragma: no cover
    from .deployment import Deployments


class BaseFiles(SQLModel):
    hash: str
    name: str
    extension: str
    bucket: str
    import_date: datetime
    date: Optional[datetime]

    @property
    def minio_filename(self):
        return f"{self.hash}.{self.extension}"

    # url: str


class Files(BaseFiles, table=True):
    id: Optional[uuid_pkg.UUID] = Field(
        default_factory=uuid_pkg.uuid4,
        primary_key=True,
        index=True,
        nullable=False,
    )
    hash: str = Field(index=True)
    name: str = Field(index=True)
    import_date: Optional[datetime] = Field(default_factory=datetime.utcnow)
    megadetector_id: Optional[int] = Field(foreign_key="megadetector.id")
    deepfaune_id: Optional[int] = Field(foreign_key="deepfaune.id")
    deployment_id: int = Field(foreign_key="deployments.id")
    treated: bool = Field(default=False)
    date: Optional[datetime]
    annotations: Optional[List[dict]] = Field(sa_column=Column(JSONB), default=[])
    deployment: "Deployments" = Relationship(back_populates="files")


class CreateFiles(BaseFiles):
    deployment_id: int


class CreateDeviceFile(BaseFiles):
    device_id: int


class ReadFiles(Files):
    url: Optional[AnyHttpUrl] = ""

    class Config:
        json_encoders = {
            datetime: lambda v: (
                v.strftime("%Y-%m-%dT%H:%M:%SZ")
                if v.tzinfo and v.tzinfo.utcoffset(v) == timedelta(0)
                else v.isoformat()
            )
        }
