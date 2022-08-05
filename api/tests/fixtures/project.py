from datetime import datetime

import pytest

from src.models.project import ProjectBase, Projects
from src.services.project import create_project


@pytest.fixture()
def project(db) -> Projects:
    data = ProjectBase(
        name="testproject",
        description="desc",
        creation_date=datetime.fromisoformat("2022-04-12"),
        end_date=datetime.fromisoformat("2022-04-19"),
        status="statut",
        # owner_id=1,
        # contact_id=1
    )

    return create_project(db=db, project=data)
