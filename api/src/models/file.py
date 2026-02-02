import uuid as uuid_pkg
from datetime import datetime, timedelta
from typing import TYPE_CHECKING, List, Optional

from pydantic import AnyHttpUrl, ConfigDict
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
    date: Optional[datetime] = None
    
    model_config = ConfigDict(
        from_attributes=True,
        arbitrary_types_allowed=True,
        json_encoders={
            datetime: lambda v: (
                v.strftime("%Y-%m-%dT%H:%M:%SZ")
                if v.tzinfo and v.tzinfo.utcoffset(v) == timedelta(0)
                else v.isoformat()
            )
        },
    )

    @property
    def minio_filename(self):
        return f"{self.hash}.{self.extension}"


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
    deployment_id: int = Field(foreign_key="deployments.id")
    treated: Optional[bool] = Field(default=False)
    date: Optional[datetime] = None
    annotations: Optional[List[dict]] = Field(sa_column=Column(JSONB), default=[])
    deployment: "Deployments" = Relationship(back_populates="files")


class CreateFiles(BaseFiles):
    deployment_id: int


class CreateDeviceFile(BaseFiles):
    device_id: int


class ReadFiles(BaseFiles):
    id: uuid_pkg.UUID
    annotations: Optional[List[dict]]=[]
    treated: Optional[bool]= None
    url: Optional[AnyHttpUrl] = ""
