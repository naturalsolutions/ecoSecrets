from fastapi import status

from src.main import app
from src.services import dependencies
from src.services.files import get_file, get_files, upload_file

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


def test_update_annotations(client, file_object, db):

    url = app.url_path_for("update_annotations", file_id=file_object.id)

    annotations = [
        {
            "specie": "string",
            "life_stage": "string",
            "biological_state": "string",
            "comment": "string",
            "behaviour": "string",
            "sex": "string",
            "number": 1,
        }
    ]

    response = client.patch(url, json=annotations)

    assert response.status_code == status.HTTP_200_OK

    content = response.json()
    assert content["id"] == str(file_object.id)
    db.expire_all()  ## Prevent SQLAlchemy from caching

    current_file = get_file(db=db, file_id=file_object.id)
    assert current_file.annotations == annotations


def test_get_files(client, file_object):
    url = app.url_path_for("get_files")

    response = client.get(url)

    assert response.status_code == status.HTTP_200_OK

    content = response.json()

    # assert file_object.json() in content


def test_display_file(client, db, file_object):
    url = app.url_path_for("display_file")

    response = client.get(url, params={"name": file_object.minio_filename})
    print(response.json())

    assert response.status_code == status.HTTP_200_OK


def test_upload_file(client, pillow_image, db):
    url = app.url_path_for("upload_file")

    response = client.post(url, files={"file": (FILENAME, pillow_image, "image/jpeg")})

    assert response.status_code == status.HTTP_200_OK

    content = response.json()
    list_files = get_files(db=db)

    assert content in list_files
