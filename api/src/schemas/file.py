from datetime import datetime

from sqlmodel import SQLModel


class FileInfo(SQLModel):
    hash: str


class File(SQLModel):
    id: str
    name: str
    extension: str
    bucket: str
    date: datetime
    url: str
