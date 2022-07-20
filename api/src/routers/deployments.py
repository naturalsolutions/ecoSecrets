from typing import List

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from sqlmodel import Session

from src.connectors import s3
from src.connectors.database import get_db
from src.dependencies import get_token_header
from src.models import models
from src.schemas import schemas
from src.services import deployment

router = APIRouter(
    prefix="/deployments",
    tags=["deployments"],
    # dependencies=[Depends(get_token_header)],
    responses={404: {"description": "Not found"}},
)


@router.get("/", response_model=List[schemas.Deployment])
def read_deployments(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    deployments = deployment.get_deployments(db, skip=skip, limit=limit)
    return deployments


@router.get("/{deployment_id}", response_model=schemas.Deployment)
def read_deployment(deployment_id: int, db: Session = Depends(get_db)):
    db_deployment = deployment.get_deployment(db, deployment_id=deployment_id)
    if db_deployment is None:
        raise HTTPException(status_code=404, detail="Deployment not found")
    return db_deployment


@router.post("/", response_model=schemas.Deployment)
def create_deployment(
    new_deployment: schemas.DeploymentBase, db: Session = Depends(get_db)
):
    db_deployment = deployment.get_deployment_by_name(
        db, name_deployment=new_deployment.name
    )
    if db_deployment:
        raise HTTPException(status_code=400, detail="Name already registered")
    return deployment.create_deployment(db=db, deployment=new_deployment)


@router.put("/{deployment_id}", response_model=schemas.Deployment)
def update_deployment(
    deployment_id: int,
    data_deployment: schemas.DeploymentBase,
    db: Session = Depends(get_db),
):
    return deployment.update_deployment(
        db=db, deployment=data_deployment, id=deployment_id
    )


@router.delete("/{deployment_id}")
def delete_deployment(deployment_id: int, db: Session = Depends(get_db)):
    return deployment.delete_deployment(db=db, id=deployment_id)


@router.get("/{project_id}", response_model=List[schemas.Deployment])
def read_project_deployments(project_id: int, db: Session = Depends(get_db)):
    return deployment.get_project_deployments(db=db, id=project_id)
