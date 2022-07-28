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
            "sexe": "string",
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
