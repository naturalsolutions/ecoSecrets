from typing import List

from fastapi import APIRouter, Depends
from sqlmodel import Session

from src.connectors.database import get_db
from src.models.models import TemplateSequence
from src.services import templateSequence

router = APIRouter(
    prefix="/sequences",
    tags=["sequences"],
    # dependencies=[Depends(get_token_header)],
    responses={404: {"description": "Not found"}},
)


@router.get("/", response_model=List[TemplateSequence])
def read_template_sequences(
    mode: str, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)
):
    return templateSequence.get_template_sequence_by_mode(db=db, mode=mode, skip=skip, limit=limit)


@router.post("/", response_model=TemplateSequence)
def create_template_sequence(new_sequence: TemplateSequence, db: Session = Depends(get_db)):
    return templateSequence.post_template_sequence(db=db, sequence=new_sequence)
