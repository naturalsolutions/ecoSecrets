from datetime import date, datetime
from typing import List, Optional, Union

from sqlmodel import SQLModel


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
