from pydantic import BaseModel


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

class Stats_Project(BaseModel):
    id: str
    name: str
    status: str
    media_number: int
    deployment_number: int
    site_number: int
    device_number: int
    targeted_species: str
    annotation_percentage: float

