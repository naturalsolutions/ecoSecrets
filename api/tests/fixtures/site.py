import pytest

from src.models.site import Sites
from src.schemas.site import SiteBase
from src.services.site import create_site


@pytest.fixture()
def site(db) -> Sites:
    data = SiteBase(name="1er site", description="desc", habitat="habitat")

    return create_site(db=db, site=data)
