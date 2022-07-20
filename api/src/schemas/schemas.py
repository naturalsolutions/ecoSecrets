from datetime import date, datetime
from typing import List, Optional, Union

from sqlmodel import SQLModel


class ItemBase(SQLModel):
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


####################  FILES  ###############################
############################################################
class FileInfo(SQLModel):
    hash: str


class File(SQLModel):
    id: str
    name: str
    extension: str
    bucket: str
    date: datetime
    url: str


####################  PROJECT  ###############################
##############################################################


class ProjectBase(SQLModel):
    name: str
    description: str
    creation_date: Optional[datetime]
    end_date: Optional[datetime]
    status: Optional[str]
    owner_id: Optional[int]
    contact_id: Optional[int]


class Project(ProjectBase):
    id: int


####################  DEPLOYMENT  ############################
##############################################################


class DeploymentBase(SQLModel):
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


class Deployment(DeploymentBase):
    id: int


class ProjectWithDeployments(Project):
    deployments: List[Deployment] = []


####################  SITE  ###############################
###########################################################


class SiteBase(SQLModel):
    name: str
    habitat: str
    description: str


class Site(SiteBase):
    id: int


####################  DEVICE  ###############################
#############################################################
class DeviceBase(SQLModel):
    name: str
    model: str
    purchase_date: date
    price: float
    description: str
    detection_area: float
    status: str
    exif_id: Optional[int]


class Device(DeviceBase):
    id: int
