from uuid import uuid4
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from sqlmodel import Session
from dependencies import get_token_header
from connectors import s3
from connectors.database import get_db
from services import project
from models import models
from schemas import schemas
from typing import List

router = APIRouter(
    prefix="/projects",
    tags=["projects"],
    # dependencies=[Depends(get_token_header)],
    responses={404: {"description": "Not found"}},
)

@router.get("/", response_model=List[schemas.Project])
def read_projects(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    projects = project.get_projects(db, skip=skip, limit=limit)
    return projects


@router.get("/{project_id}", response_model=schemas.Project)
def read_project(project_id: int, db: Session = Depends(get_db)):
    db_project = project.get_project(db, project_id=project_id)
    if db_project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    return db_project

@router.post("/", response_model=schemas.Project)
def create_project(new_project: schemas.Project, db: Session = Depends(get_db)):
    db_project = project.get_project_by_name(db, name_project=new_project.name)
    if db_project:
        raise HTTPException(status_code=400, detail="Name already registered")
    return project.create_project(db=db, project=new_project)

@router.put("/{project_id}", response_model=schemas.Project)
def update_project(project_id: int, data_project: schemas.Project, db: Session = Depends(get_db)):
    return project.update_project(db=db, project=data_project, id=project_id)

@router.delete("/{project_id}")
def delete_project(project_id: int, db: Session = Depends(get_db)):
    return project.delete_project(db=db, id=project_id)