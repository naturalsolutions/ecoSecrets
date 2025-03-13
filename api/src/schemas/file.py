from datetime import datetime
from typing import List, Optional, Union

from pydantic import BaseModel
from sqlmodel import SQLModel

from src.schemas.schemas import Annotation


class FileInfo(SQLModel):
    hash: str


class File(SQLModel):
    id: str
    name: str
    extension: str
    bucket: str
    date: datetime
    url: str


class MetaData(BaseModel):
    date: Optional[str] = None


class AnnotationData(BaseModel):
    annotations: List[Annotation]
    id_group: Optional[str]
    group_observations_id_to_update: Optional[List[str]] = []
    group_observations_id_to_individualize: Optional[
        List[str]
    ] = []  # need to be separated to distinguish from ungrouped observation


class FileData(BaseModel):
    annotation_data: Optional[AnnotationData]
    metadata_data: Optional[MetaData]
