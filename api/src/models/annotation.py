from typing import TYPE_CHECKING, Optional

from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:  # pragma: no cover
    from api.src.models.file import Files


class Annotations(SQLModel, table=True):
    id: Optional[int] = Field(primary_key=True, index=True)
    classe: str
    family: str
    genus: str
    order: str
    specie_id: int
    behavior: str
    sex: str
    life_stage: str
    biological_state: str
    ind_number: int
    file_id: str = Field(foreign_key="files.id")
    file: "Files" = Relationship(back_populates="annotations")
