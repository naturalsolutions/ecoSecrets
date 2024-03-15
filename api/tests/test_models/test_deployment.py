from sqlalchemy.orm import joinedload

from src.models.deployment import Deployments


def test_model(db, deployment, file_object):
    query = db.query(Deployments).options(joinedload("files"))
    query2 = db.query(Deployments)
    assert query


def test_essentials(db, deployment):
    query = db.query(Deployments.id, Deployments.name)
    assert query
