from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session

from src.connectors.database import get_db
from src.schemas.user import User, UserCreate
from src.services import user

router = APIRouter()


@router.get("/users/", response_model=List[User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = user.get_users(db, skip=skip, limit=limit)
    return users


@router.get("/users/{user_id}", response_model=User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = user.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@router.post("/users/", response_model=User)
def create_user(new_user: UserCreate, db: Session = Depends(get_db)):
    db_user = user.get_user_by_email(db, email=new_user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return user.create_user(db=db, user=new_user)


@router.put("/users/{user_id}", response_model=User)
def update_user(user_id: int, data_user: User, db: Session = Depends(get_db)):
    return user.update_user(db=db, user=data_user, id=user_id)


@router.delete("/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    return user.delete_user(db=db, id=user_id)
