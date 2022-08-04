from __future__ import annotations

from sqlmodel import Session

from src.models.device import Devices
from src.models.file import Files
from src.models.site import Sites
from src.schemas.schemas import Stats
from src.services.files import get_files


def get_stats(db: Session):
    devices = db.query(Devices).count()
    medias = db.query(Files).count()
    sites = db.query(Sites).count()

    files = get_files(db=db)
    annotation = 0
    for f in files:
        annotation += len(f.annotations)

    stats = Stats(medias=medias, sites=sites, device=devices, annotations=annotation)
    return stats
