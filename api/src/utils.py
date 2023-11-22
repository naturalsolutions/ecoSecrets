def file_as_bytes(file):
    with file:
        return file.read()


# Authorized mime types
authorized_mime = [
    "video/mp4",
    "video/mpeg",
    "video/ogg",
    "video/webm",
    "image/jpeg",
    "image/avif",
    "image/png",
    "image/bmp",
    "image/gif",
    "image/tiff",
    "image/webp",
]


def check_mime(mime):
    return mime in authorized_mime
