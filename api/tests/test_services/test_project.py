from datetime import datetime

from src.models.project import ProjectBase
from src.services.project import (
    create_project,
    get_informations,
    get_projects,
    get_projects_stats,
)


def test_create_project(db):
    name = "1rst project"
    creation_date = datetime.now()
    end_date = datetime.now()
    description = "description"
    status = "status"
    project = ProjectBase(
        name=name,
        creation_date=creation_date,
        end_date=end_date,
        description=description,
        status=status,
    )
    created_project = create_project(db=db, project=project)

    assert created_project.name == name


def test_get_projects(db, project):
    projects = get_projects(db=db)

    assert isinstance(projects, list)
    assert project in projects


def test_get_projects_stats(db, project, deployment, file_object):
    stats = get_projects_stats(db)


def test_get_informations(db, project, deployment, file_object):
    infos = get_informations(db=db, id=project.id)

    assert infos["name"] == project.name
    assert len(infos["deployments"]) == 1
    assert infos["stats"]["media_number"] == 1
    assert infos["stats"]["annotation_percentage"] == 0
