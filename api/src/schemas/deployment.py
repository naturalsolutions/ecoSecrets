from datetime import date, datetime
from typing import List, Optional, Union

from sqlmodel import SQLModel


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
