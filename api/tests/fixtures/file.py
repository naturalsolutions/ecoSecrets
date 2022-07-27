import io
from random import randrange

import pytest
from PIL import Image


def gen_img():
    width = 400
    height = 300
    red = randrange(0, 255)
    green = randrange(0, 255)
    blue = randrange(0, 255)

    # Different from init_data since we do not want to have the same md5 sum

    return Image.new(mode="RGB", size=(width, height), color=(red, green, blue))


def save_img(img: Image.Image, exif=Image.Exif()):
    img_bytes = io.BytesIO()
    img.save(img_bytes, "JPEG", exif=exif)
    img_bytes.seek(0)
    return img_bytes


@pytest.fixture
def pillow_image() -> io.BytesIO:
    """Creates a green image with pillow
    Returns:
        io.BytesIO: the image as BytesIO

    """
    img = gen_img()
    return save_img(img=img)
