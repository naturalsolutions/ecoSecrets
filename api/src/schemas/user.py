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

    model_config = {"from_attributes": True}
