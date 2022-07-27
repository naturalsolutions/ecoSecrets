from typing import List

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from sqlmodel import Session

from src.connectors.database import get_db
from src.models import annotations, models
from src.routers.files import read_deployment_files
from src.schemas import annotations, schemas
from src.services import files

router = APIRouter(
    prefix="/devices",
    tags=["devices"],
    # dependencies=[Depends(get_token_header)],
    responses={404: {"description": "Not found"}},
)


@router.patch(
    "/annotations/{deployment_id}", response_model=schemas.FileWithAnnotations
)
def create_update_annotations(deployment_id: int, db: Session = Depends(get_db)):
    list_files = read_deployment_files(deployment_id=deployment_id, db=db)
    return list_files
