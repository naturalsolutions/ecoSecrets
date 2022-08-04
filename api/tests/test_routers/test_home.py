from fastapi import status

from src.main import app


def test_get_user_stats(client, device, site, project, file_object):
    url = app.url_path_for("get_user_stats")

    response = client.get(url)

    assert response.status_code == status.HTTP_200_OK

    # content = response.json()
    # assert device.dict() in content
