from sqlalchemy.orm import Session
from models import models
# import schemas.schemas
from schemas import schemas

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()


def create_user(db: Session, user: schemas.UserCreate):
    fake_hashed_password = user.password + "notreallyhashed"
    db_user = models.User(email=user.email, name= user.name, hashed_password=fake_hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def update_user(db: Session, user: schemas.User):
    db_user = db.query(models.User).filter(models.User.id == user.id).first()
    db_user.name = user.name
    # db_user=update(models.User).where(models.User.c.id==user.id).values(name=user.name)
    # db.execute(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def delete_user(db: Session, id: int):
    # db_user=models.User.delete().where(models.User.c.id==user.id)
    # db.execute(db_user)
    db_user = db.query(models.User).filter(models.User.id == id).first()
    db.delete(db_user)
    db.commit()
    return db_user


# def get_items(db: Session, skip: int = 0, limit: int = 100):
#     return db.query(models.Item).offset(skip).limit(limit).all()


# def create_user_item(db: Session, item: schemas.ItemCreate, user_id: int):
#     db_item = models.Item(**item.dict(), owner_id=user_id)
#     db.add(db_item)
#     db.commit()
#     db.refresh(db_item)
#     return db_item