from pydantic import BaseModel


class annotation(BaseModel):
    specie: str
    life_stage: str
    biological_state: str
    comment: str
    behaviour: str
    sexe: str
    number: int
