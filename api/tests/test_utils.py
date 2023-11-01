import pytest

from src.utils import check_mime

all_authorized_mimes = {
    "video/mp4",
    "video/mpeg",
    "video/ogg",
    "video/webm",
    "image/jpeg",
    "image/png",
    "image/avif",
    "image/bmp",
    "image/gif",
    "image/tiff",
    "image/webp",
}

some_unauthorized_mimes = {
    "audio/aac",
    "video/x-msvideo",
    "application/pdf",
    "application/xml",
    "application/vnd.mozilla.xul+xml",
    "application/zip",
    "video/3gpp2",
    "audio/3gpp2",
    "application/x-7z-compressed",
}


if not all_authorized_mimes.isdisjoint(some_unauthorized_mimes):
    raise Exception(
        "Value(s) shared between lists of authorized and unauthorized mime types. Tests cannot be performed."
    )


@pytest.mark.parametrize("authorized", all_authorized_mimes)
@pytest.mark.parametrize("unauthorized", some_unauthorized_mimes)
def test_check_mime(authorized, unauthorized):
    assert check_mime(authorized)
    assert not check_mime(unauthorized)
