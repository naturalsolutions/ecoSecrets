from fastapi import status

from src.main import app


def test_read_projects(client):
    url = app.url_path_for("read_projects")

    response = client.get(url)

    assert response.status_code == status.HTTP_200_OK
