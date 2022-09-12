from datetime import date
from email.policy import default

from pydantic import BaseModel
from sqlmodel import Field


class Annotation(BaseModel):
    id: str
    classe: str
    family: str
    genus: str
    order: str
    specie: str
    life_stage: str
    biological_state: str
    comment: str
    behaviour: str
    sex: str
    number: int


class Stats(BaseModel):
    medias: int
    sites: int
    device: int
    annotations: int


class DataProject(BaseModel):
    media_number: int
    annotation_percentage: float


class StatsProject(DataProject):
    id: str
    name: str
    status: str = Field(default=None)
    start_date: date = Field(default=None)
    end_date: date = Field(default=None)
    deployment_number: int
    site_number: int
    device_number: int
    targeted_species: str = Field(default=None)
