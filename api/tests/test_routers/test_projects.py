from fastapi import status

from src.main import app


def test_read_projects(client):
    url = app.url_path_for("read_projects")

    response = client.get(url)

    assert response.status_code == status.HTTP_200_OK


def test_read_projects_with_deployments(client, project, deployment):
    url = app.url_path_for("read_projects_with_deployments")
    response = client.get(url)

    assert response.status_code == status.HTTP_200_OK
