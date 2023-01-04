from datetime import datetime

from fastapi import status

from src.main import app
from src.services.deployment import get_deployment


def test_read_deployments(client, deployment):
    url = app.url_path_for("read_deployments")

    response = client.get(url)

    assert response.status_code == status.HTTP_200_OK


def test_read_deployment(client, deployment):
    url = app.url_path_for("read_deployment", deployment_id=deployment.id)

    response = client.get(url)

    assert response.status_code == status.HTTP_200_OK

    content = response.json()
    assert deployment.name == content["name"]
    assert deployment.id == content["id"]


def test_create_deployment(client, site, device, project):
    url = app.url_path_for("create_deployment")
    date = datetime.now()
    deployment = {
        "name": "New deployment",
        "start_date": date.isoformat(),
        "end_date": date.isoformat(),
        "site_id": site.id,
        "device_id": device.id,
        "bait": "bait",
        "feature": "feature",
        "description": "desc",
        "project_id": project.id,
    }

    response = client.post(url, json=deployment)

    assert response.status_code == status.HTTP_200_OK


def test_update_deployment(client, site, device, project, deployment):
    url = app.url_path_for("update_deployment", deployment_id=deployment.id)

    date = datetime.now()
    data = {
        "name": "New deployment",
        "start_date": date.isoformat(),
        "end_date": date.isoformat(),
        "site_id": site.id,
        "device_id": device.id,
        "bait": "bait",
        "feature": "feature",
        "description": "desc",
        "project_id": project.id,
        "id": deployment.id,
    }

    response = client.put(
        url,
        json=data,
    )

    assert response.status_code == status.HTTP_200_OK

    content = response.json()
    assert content["name"] == data["name"]
    assert content["id"] == deployment.id


def test_delete_deployment(client, deployment, db):
    url = app.url_path_for("delete_deployment", deployment_id=deployment.id)

    response = client.delete(url)

    assert response.status_code == status.HTTP_200_OK
    content = response.json()
    assert content["name"] == deployment.name
    assert content["id"] == deployment.id

    assert get_deployment(db, deployment_id=deployment.id) == None


def test_read_project_deployments(client, deployment, project):
    url = app.url_path_for("read_project_deployments", project_id=project.id)

    response = client.get(url)

    assert response.status_code == status.HTTP_200_OK
