from fastapi import status

from src.main import app

FILENAME = "test.jpg"


def test_upload_files(
    client,
    deployment,
    pillow_image,
):
    url = app.url_path_for("upload_files")

    response = client.post(
        url, files={"list_files": (FILENAME, pillow_image, "image/jpeg")}
    )

    assert response.status_code == status.HTTP_200_OK
