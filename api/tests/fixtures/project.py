from datetime import datetime

import pytest

from src.models.project import ProjectBase, Projects
from src.services.project import create_project


@pytest.fixture()
def project(db) -> Projects:
    data = ProjectBase(
        name="testproject",
        creation_date=datetime.fromisoformat("2022-04-12"),
        start_date=datetime.fromisoformat("2022-04-15"),
        end_date=datetime.fromisoformat("2022-04-19"),
        protocol="standard protocol",
        acquisition_framework="acquisition 1",
        targeted_species="cat",
        referential="lambert",
        timezone="CET",
        image="hash",
        # owner_id=1,
        # contact_id=1
    )

    return create_project(db=db, project=data)
