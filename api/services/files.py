import tempfile
from sqlmodel import Session
from models import models
# import schemas.schemas
from schemas import schemas
import hashlib
from uuid import uuid4
from fastapi import File, UploadFile, Form, HTTPException
from connectors import s3
from typing import List

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
    return db.query(models.Files).offset(skip).limit(limit).all()

def get_file(db: Session, file_id: int):
    return db.query(models.Files).filter(models.Files.id == file_id).first()

def create_file(db: Session, file: schemas.File):
    db_file = models.Files(id = file["id"],
                        hash = file["hash"],
                        name = file["name"],
                        extension = file["extension"],
                        bucket = file["extension"],
                        date = file["date"],
                        deployment_id = 1)
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
    db_user = db.query(models.Files).filter(models.Files.id == id).first()
    db.delete(db_file)
    db.commit()
    return db_file


def upload_file(db: Session,hash: str, new_file: tempfile.SpooledTemporaryFile, filename: str, ext:str ):
    
    try:
        s3.upload_file_obj(new_file,f"{hash}.{ext}")
    except Exception as e:
        print(e)
        raise HTTPException(status_code=404, detail="Impossible to save the file in minio")
    metadata = {"id":str(uuid4()),"hash": hash, "name": filename, "extension":ext , "bucket": "jean-paul-bucket", "date": '2022-01-22'}
    try:
        return create_file(db=db, file=metadata)
    except Exception as e:
        raise HTTPException(status_code=404, detail="Impossible to save the file in bdd")