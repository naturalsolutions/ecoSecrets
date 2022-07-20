from datetime import date, datetime
from typing import TYPE_CHECKING, List, Optional

from sqlmodel import JSON, Column, Field, Relationship, SQLModel

if TYPE_CHECKING:  # pragma: no cover

    from .deployment import Deployments


class Users(SQLModel, table=True):
    id: Optional[int] = Field(primary_key=True, index=True)
    name: str = Field(index=True)
    email: str
    hashed_password: str
    is_active: Optional[bool] = Field(default=True)
    role_id: Optional[int] = Field(foreign_key="roles.id")


class Files(SQLModel, table=True):
    id: str = Field(primary_key=True, index=True)
    hash: str = Field(index=True)
    name: str = Field(index=True)
    extension: str
    bucket: str
    date: date
    deployment_id: int = Field(foreign_key="deployments.id")
    megadetector_id: Optional[int] = Field(foreign_key="megadetector.id")
    deepfaune_id: Optional[int] = Field(foreign_key="deepfaune.id")


# class Item(SQLModel, table=True):
#     # __tablename__ = "items"

#     id : int  = Field(primary_key=True, index=True)
#     title : str = Field( index=True)
#     description : str = Field( index=True)
#     owner_id : int = Field(foreign_key = "users.id")


class Projects(SQLModel, table=True):
    id: Optional[int] = Field(primary_key=True, index=True)
    name: str
    description: str
    creation_date: Optional[datetime]
    end_date: Optional[datetime]
    status: Optional[str]
    owner_id: Optional[int] = Field(foreign_key="users.id")
    contact_id: Optional[int] = Field(foreign_key="users.id")
    deployments: Optional[List["Deployments"]] = Relationship(back_populates="project")


class Sites(SQLModel, table=True):
    id: int = Field(primary_key=True, index=True)
    name: str
    habitat: str
    description: str


class Sequences(SQLModel, table=True):
    id: int = Field(primary_key=True, index=True)
    deployment_id: int = Field(foreign_key="deployments.id")


class Sequences_Files(SQLModel, table=True):
    id: int = Field(primary_key=True, index=True)
    sequence_id: int = Field(foreign_key="sequences.id")
    file_id: str = Field(foreign_key="files.id")


class Devices(SQLModel, table=True):
    id: int = Field(primary_key=True, index=True)
    name: str
    model: str
    purchase_date: date
    price: float
    description: str
    detection_area: float
    status: str
    exif_id: Optional[int] = Field(foreign_key="exifkeymodel.id")


class Annotations(SQLModel, table=True):
    id: int = Field(primary_key=True, index=True)
    specie_id: int
    behavior: str
    sexe: str
    life_stage: str
    biological_state: str
    ind_number: int
    file_id: str = Field(foreign_key="files.id")


class Megadetector(SQLModel, table=True):
    id: int = Field(primary_key=True, index=True)
    label_class: str


class Deepfaune(SQLModel, table=True):
    id: int = Field(primary_key=True, index=True)
    label_class: str


class TemplateSequence(SQLModel, table=True):
    id: int = Field(primary_key=True, index=True)
    mode: str
    frequence: int = Field(default=0)
    number_images: int = Field(default=1)


class ExifKeyModel(SQLModel, table=True):
    id: int = Field(primary_key=True, index=True)
    json_exif: dict = Field(sa_column=Column(JSON), default={})


class Groups(SQLModel, table=True):
    id: int = Field(primary_key=True, index=True)
    name: str
    role_id: int = Field(foreign_key="roles.id")


class GroupsUsers(SQLModel, table=True):
    id: int = Field(primary_key=True, index=True)
    user_id: int = Field(foreign_key="users.id")
    group_id: int = Field(foreign_key="groups.id")


class Roles(SQLModel, table=True):
    id: int = Field(primary_key=True, index=True)
    role: str
    description: str
