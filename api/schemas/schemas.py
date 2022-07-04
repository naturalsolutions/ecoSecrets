from typing import List, Union

from pydantic import BaseModel
from datetime import datetime

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
    