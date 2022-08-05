from datetime import date, datetime
from typing import TYPE_CHECKING, List, Optional

from sqlmodel import JSON, Column, Field, Relationship, SQLModel

if TYPE_CHECKING:  # pragma: no cover

    from api.src.models.file import Files


class Annotations(SQLModel, table=True):
    id: int = Field(primary_key=True, index=True)
    specie_id: int
    behavior: str
    sex: str
    life_stage: str
    biological_state: str
    ind_number: int
    file_id: str = Field(foreign_key="files.id")
    file: "Files" = Relationship(back_populates="annotations")
