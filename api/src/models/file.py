from datetime import date, datetime
from typing import TYPE_CHECKING, List, Optional

from sqlmodel import JSON, Column, Field, Relationship, SQLModel


class Files(SQLModel, table=True):
    id: str = Field(primary_key=True, index=True)
    hash: str = Field(index=True)
    name: str = Field(index=True)
    extension: str
    bucket: str
    date: date
    deployment_id: int = Field(foreign_key="deployments.id")
    megadetector_id: Optional[int] = Field(foreign_key="megadetector.id")
    deepfaune_id: Optional[int] = Field(foreign_key="deepfaune.id")
