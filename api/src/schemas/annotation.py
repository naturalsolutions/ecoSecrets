from pydantic import BaseModel


class Annotation(BaseModel):
    specie: str
    life_stage: str
    biological_state: str
    comment: str
    behaviour: str
    sexe: str
    number: int
