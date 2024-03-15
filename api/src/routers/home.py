from fastapi import APIRouter, Depends
from sqlmodel import Session

from src.connectors.database import get_db
from src.schemas.schemas import Stats
from src.services.home import get_stats

router = APIRouter(
    prefix="/home",
    tags=["home"],
    # dependencies=[Depends(get_token_header)],
    responses={404: {"description": "Not found"}},
)


@router.get("/stats/", response_model=Stats)
def get_user_stats(db: Session = Depends(get_db)):
    return get_stats(db=db)
