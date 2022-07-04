from sqlalchemy.orm import Session
from models import models
# import schemas.schemas
from schemas import schemas
import hashlib

from fastapi import File, UploadFile, Form

# async def stockage_image(file):
#     try :
#         contents = await file.read()
#         with open(f'{file.filename}',"wb") as f:
#             f.write(contents)
#     except Exception:
#         return {"message": "There was an error uploading the file"}
#     finally:
#         await file.close()
    
#     return {"message": f"Successfuly uploaded {file.filename}"}

def file_as_bytes(file):
    with file:
        return file.read()

def get_hash(file):
    return hashlib.sha256(file_as_bytes(file)).hexdigest()

def get_files(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.File).offset(skip).limit(limit).all()

def get_file(db: Session, file_id: int):
    return db.query(models.File).filter(models.File.id == file_id).first()

def create_file(db: Session, file: schemas.File):
    db_file = models.File(id = file["id"],
                        hash = file["hash"],
                        name = file["name"],
                        extension = file["extension"],
                        bucket = file["extension"],
                        date = file["date"])
    db.add(db_file)
    db.commit()
    db.refresh(db_file)
    return db_file

# def get_file_by_path(db: Session, path: str):
#     return db.query(models.File).filter(models.File.path == path).first()


# def update_file(db: Session, file: schemas.File):
#     db_file = db.query(models.File).filter(models.File.id == file.id).first()
#     db_file.name = file.name
#     db.commit()
#     db.refresh(db_file)
#     return db_file

def delete_file(db: Session, id: int):
    db_user = db.query(models.File).filter(models.File.id == id).first()
    db.delete(db_file)
    db.commit()
    return db_file
