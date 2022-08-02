from datetime import datetime
from uuid import UUID

from src.models.device import Devices
from src.services.files import get_file, get_files


def test_get_files(db, file_object):
    files = get_files(db=db)

    assert isinstance(files, list)
    assert file_object in files


def test_get_file(db, file_object):
    file = get_file(db=db, file_id=file_object.id)

    assert file.id == file_object.id
    assert isinstance(file.id, UUID)

    assert file.name == file_object.name
    assert file.hash == file_object.hash
