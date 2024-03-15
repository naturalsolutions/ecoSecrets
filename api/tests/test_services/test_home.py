from src.schemas.schemas import Stats
from src.services.home import get_stats


def test_get_stats(db, file_object, device, site):
    stats = get_stats(db=db)
    assert isinstance(stats, Stats)
