from datetime import datetime

from fastapi import status

from src.main import app
from src.services.project import get_project


def test_read_projects(client, project, deployment, db):
    url = app.url_path_for("read_projects")

    response = client.get(url)

    assert response.status_code == status.HTTP_200_OK
    content = response.json()


def test_read_project(client, project):
    url = app.url_path_for("read_project", project_id=project.id)

    response = client.get(url)

    assert response.status_code == status.HTTP_200_OK

    content = response.json()
    assert project.name == content["name"]
    assert project.id == content["id"]


def test_read_projects_with_deployments(client, project, deployment, db):
    url = app.url_path_for("read_projects_with_deployments")
    response = client.get(url)

    assert response.status_code == status.HTTP_200_OK
    assert get_project(db, project_id=project.id)

    content = response.json()
    d = deployment.dict()
    for key, value in d.items():
        assert content[0]["deployments"][0][key] == value


def test_create_project(client, db):
    url = app.url_path_for("create_project")
    project = {
        "name": "New project",
        "creation_date": "2022-07-28",
        "end_date": "2022-12-31",
        "description": "desc",
        "status": "statut",
    }

    response = client.post(url, json=project)
    content = response.json()
    assert response.status_code == status.HTTP_200_OK

    assert get_project(db=db, project_id=content["id"])


def test_update_project(client, project):
    url = app.url_path_for("update_project", project_id=project.id)

    data = {
        "name": "Project updated",
        "creation_date": "2022-07-28",
        "end_date": "2022-12-31",
        "description": "complete description",
        "status": "statut updated",
    }

    response = client.put(
        url,
        json=data,
    )

    assert response.status_code == status.HTTP_200_OK

    content = response.json()
    assert content["name"] == data["name"]
    assert content["id"] == project.id


def test_delete_project(client, project, db):
    url = app.url_path_for("delete_project", project_id=project.id)

    response = client.delete(url)

    assert response.status_code == status.HTTP_200_OK
    content = response.json()
    assert content["name"] == project.name
    assert content["id"] == project.id

    assert get_project(db, project_id=project.id) == None
