from datetime import datetime

import pytest

from src.models.deployment import Deployments, NewDeploymentWithTemplateSequence
from src.services.deployment import create_deployment


@pytest.fixture()
def deployment(db, device, project, site) -> Deployments:
    date = datetime.now()
    data = NewDeploymentWithTemplateSequence(
        name="1er deployment",
        start_date=date.isoformat(),
        end_date=date.isoformat(),
        site_id=site.id,
        device_id=device.id,
        bait="bait",
        feature="feature",
        description="desc",
        project_id=project.id,
        template_sequences=[],
    )

    return create_deployment(db=db, deployment=data)
