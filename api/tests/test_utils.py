from src.utils import check_mime


def test_check_mime():
    authorized_mime = [
        "video/mp4",
        "video/mpeg",
        "video/ogg",
        "video/webm",
        "image/jpeg",
        "image/png",
        "image/bmp",
        "image/gif",
        "image/tiff",
        "image/webp",
    ]

    ex_unauthorized_mime = [
        "audio/aac",
        "video/x-msvideo",
        "application/pdf",
        "application/xml" "application/vnd.mozilla.xul+xml",
        "application/zip",
        "video/3gpp2",
        "audio/3gpp2",
        "application/x-7z-compressed",
    ]

    assert any(item in authorized_mime for item in ex_unauthorized_mime) == False

    for item in authorized_mime:
        assert check_mime(item)

    for item in ex_unauthorized_mime:
        assert check_mime(item) == False
