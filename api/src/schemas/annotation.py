import uuid as uuid_pkg

from pydantic import BaseModel


class Annotation(BaseModel):
    id: str
    specie: str
    life_stage: str
    biological_state: str
    comment: str
    behaviour: str
    sex: str
    number: int
