import uuid as uuid_pkg
from datetime import date, datetime
from typing import TYPE_CHECKING, List, Optional

from pydantic import AnyHttpUrl, root_validator
from sqlalchemy.dialects.postgresql import JSONB
from sqlmodel import JSON, Column, Field, Relationship, SQLModel

from src.connectors.s3 import get_url

if TYPE_CHECKING:  # pragma: no cover
    from src.models.annotation import Annotations


class BaseFiles(SQLModel):
    hash: str
    name: str
    extension: str
    bucket: str
    date: datetime

    @property
    def minio_filename(self):

        return f"{self.hash}.{self.extension}"

    # url: str


class Files(BaseFiles, table=True):
    id: uuid_pkg.UUID = Field(
        default_factory=uuid_pkg.uuid4,
        primary_key=True,
        index=True,
        nullable=False,
    )
    hash: str = Field(index=True)
    name: str = Field(index=True)
    date: Optional[datetime] = Field(default_factory=datetime.utcnow)
    megadetector_id: Optional[int] = Field(foreign_key="megadetector.id")
    deepfaune_id: Optional[int] = Field(foreign_key="deepfaune.id")
    deployment_id: int = Field(foreign_key="deployments.id")
    annotations: Optional[List[dict]] = Field(sa_column=Column(JSONB), default={})


class CreateFiles(BaseFiles):
    deployment_id: int


class ReadFiles(BaseFiles):
    id: uuid_pkg.UUID
    url: Optional[AnyHttpUrl] = ""

    @root_validator
    def gen_url(cls, values):  # pylint: disable=no-self-argument,no-self-use
        filename = f"{values['hash']}.{values['ext']}"
        values["url"] = get_url(filename)
        return values
