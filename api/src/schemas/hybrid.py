from datetime import date, datetime
from typing import List, Optional, Union

from sqlmodel import SQLModel

from .deployment import Deployment
from .project import Project


class ProjectWithDeployments(Project):
    deployments: List[Deployment] = []
