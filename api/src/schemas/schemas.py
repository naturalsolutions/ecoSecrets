from email.policy import default
from pydantic import BaseModel
from sqlmodel import Field

class Annotation(BaseModel):
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

class StatsProject(BaseModel):
    id: str
    name: str
    status: str = Field(default=None)
    media_number: int
    deployment_number: int
    site_number: int
    device_number: int
    targeted_species: str = Field(default=None)
    annotation_percentage: float

