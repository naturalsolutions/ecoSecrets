from datetime import datetime

import pytest

from src.schemas.schemas import Device
from src.services.device import create_device


@pytest.fixture(scope="session")
def device(db):
    name = "test"
    model = "panasonic"
    purchase_date = datetime.now()
    price = 1520.2
    description = "description"
    detection_area = 150.0
    status = "status"
    device = Device(
        id=1,
        name=name,
        model=model,
        purchase_date=purchase_date,
        price=price,
        description=description,
        detection_area=detection_area,
        status=status,
    )

    return create_device(db=db, device=device)
