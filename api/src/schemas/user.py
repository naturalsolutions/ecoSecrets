from datetime import date, datetime
from typing import List, Optional, Union

from sqlmodel import SQLModel

# class ItemBase(SQLModel):
#     title: str
#     description: Union[str, None] = None


# class ItemCreate(ItemBase):
#     pass


# class Item(ItemBase):
#     id: int
#     owner_id: int

#     class Config:
#         orm_mode = True


########################  USER  ###########################
###########################################################


class UserBase(SQLModel):
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
