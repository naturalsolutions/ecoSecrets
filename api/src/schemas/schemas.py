from datetime import date, datetime
from typing import List, Optional, Union

from pydantic import BaseModel


class ItemBase(BaseModel):
    title: str
    description: Union[str, None] = None


class ItemCreate(ItemBase):
    pass


class Item(ItemBase):
    id: int
    owner_id: int

    class Config:
        orm_mode = True


########################  USER  ###########################
###########################################################


class UserBase(BaseModel):
    email: str
    name: str


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int
    is_active: bool
    # items: List[Item] = []

    class Config:
        orm_mode = True


####################  FILES  ###############################
############################################################
class FileInfo(BaseModel):
    hash: str


class File(BaseModel):
    id: str
    name: str
    extension: str
    bucket: str
    date: datetime
    url: str


####################  PROJECT  ###############################
##############################################################


class Project(BaseModel):
    name: str
    description: str
    creation_date: Optional[datetime]
    end_date: Optional[datetime]
    status: Optional[str]
    owner_id: int
    contact_id: int


####################  DEPLOYMENT  ############################
##############################################################


class Deployment(BaseModel):
    id: Optional[int]
    name: str
    start_date: Optional[datetime]
    end_date: Optional[datetime]
    site_id: Optional[int]
    device_id: Optional[int]
    bait: str
    feature: str
    description: str
    project_id: int
    template_sequence_id: Optional[int]


####################  SITE  ###############################
###########################################################


class Site(BaseModel):
    id: int
    name: str
    habitat: str
    description: str


####################  DEVICE  ###############################
###########################################################


class Device(BaseModel):
    id: int
    name: str
    model: str
    purchase_date: date
    price: float
    description: str
    detection_area: float
    status: str
    exif_id: Optional[int]
