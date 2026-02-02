from datetime import date
from typing import Optional

from pydantic import BaseModel


class Annotation(BaseModel):
    id: str
    id_annotation: str
    id_group: str
    classe: str
    family: str
    genus: str
    order: str
    species: str
    number: int
    life_stage: str
    biological_state: str
    behaviour: str
    sex: str
    comments: str


class Stats(BaseModel):
    medias: int
    sites: int
    device: int
    annotations: int


class DataProject(BaseModel):
    media_number: int
    annotation_percentage: float


class StatsProject(BaseModel):
    id: int
    name: str
    status: Optional[str] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    deployment_number: int
    site_number: int
    device_number: int
    targeted_species: Optional[str] = None
    url: Optional[str] = None
    media_number: int
    annotation_percentage: float


class FirstUntreated(BaseModel):
    file_id: str
    deploy_id: int
