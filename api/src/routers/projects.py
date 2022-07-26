from typing import List
from uuid import uuid4

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from sqlmodel import Session

from src.connectors import s3
from src.connectors.database import get_db
from src.dependencies import get_token_header
from src.models import models
from src.schemas.hybrid import ProjectWithDeployments
from src.schemas.project import Project, ProjectBase
from src.services import deployment, project

router = APIRouter(
    prefix="/projects",
    tags=["projects"],
    # dependencies=[Depends(get_token_header)],
    responses={404: {"description": "Not found"}},
)


@router.get("/", response_model=List[Project])
def read_projects(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    projects = project.get_projects(db, skip=skip, limit=limit)
    return projects


@router.get("/{project_id}", response_model=Project)
def read_project(project_id: int, db: Session = Depends(get_db)):
    db_project = project.get_project(db, project_id=project_id)
    if db_project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    return db_project


@router.post("/", response_model=Project)
def create_project(new_project: ProjectBase, db: Session = Depends(get_db)):
    db_project = project.get_project_by_name(db, name_project=new_project.name)
    if db_project:
        raise HTTPException(status_code=400, detail="Name already registered")
    return project.create_project(db=db, project=new_project)


@router.put("/{project_id}", response_model=Project)
def update_project(
    project_id: int, data_project: ProjectBase, db: Session = Depends(get_db)
):
    return project.update_project(db=db, project=data_project, id=project_id)


@router.delete("/{project_id}")
def delete_project(project_id: int, db: Session = Depends(get_db)):
    return project.delete_project(db=db, id=project_id)


@router.get("/deployments/", response_model=List[ProjectWithDeployments])
def read_projects_with_deployments(
    skip: int = 0, limit: int = 100, db: Session = Depends(get_db)
):
    return project.get_projects(db, skip=skip, limit=limit)
