from fastapi import status

from src.main import app
from src.services.device import get_device, get_devices


def test_read_devices(client, device):
    url = app.url_path_for("read_devices")

    response = client.get(url)

    assert response.status_code == status.HTTP_200_OK

    content = response.json()
    # assert device.dict() in content


def test_create_device(client):
    url = app.url_path_for("create_device")
    device = {
        "name": "2nd device",
        "model": "model",
        "purchase_date": "2022-07-19",
        "price": 120,
        "description": "gcvsusbck",
        "detection_area": 1163,
        "status": "blabla",
    }

    response = client.post(url, json=device)

    assert response.status_code == status.HTTP_200_OK


def test_update_device(client, device):
    url = app.url_path_for("update_device", device_id=device.id)

    data = {
        "name": "2nd device",
        "model": "model",
        "purchase_date": "2022-07-19",
        "price": 140,
        "description": "Updated device",
        "detection_area": 1163,
        "status": "updated",
    }

    response = client.put(
        url,
        json=data,
    )

    assert response.status_code == status.HTTP_200_OK

    content = response.json()
    assert content["name"] == data["name"]
    assert content["id"] == device.id


def test_delete_device(client, device, db):
    url = app.url_path_for("delete_device", device_id=device.id)

    response = client.delete(url)

    assert response.status_code == status.HTTP_200_OK
    content = response.json()
    assert content["name"] == device.name
    assert content["id"] == device.id

    assert get_device(db, device_id=device.id) == None