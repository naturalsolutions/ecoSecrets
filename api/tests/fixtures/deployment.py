from datetime import datetime

import pytest

from src.models.deployment import DeploymentBase, Deployments
from src.services.deployment import create_deployment


@pytest.fixture()
def deployment(db, device, project, site) -> Deployments:
    data = DeploymentBase(
        name="1er deployment",
        start_date=datetime.fromisoformat("2022-04-12"),
        end_date=datetime.fromisoformat("2022-04-19"),
        site_id=site.id,
        device_id=device.id,
        bait="bait",
        feature="feature",
        description="desc",
        project_id=project.id,
        # template_sequence_id= Optional[int]
    )

    return create_deployment(db=db, deployment=data)
