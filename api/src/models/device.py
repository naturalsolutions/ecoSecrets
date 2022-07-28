from datetime import date
from typing import Optional

from sqlmodel import Field

from src.schemas.device import DeviceBase


class Devices(DeviceBase, table=True):
    id: int = Field(primary_key=True, index=True)
