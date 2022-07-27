import hashlib
import tempfile
from typing import List
from uuid import uuid4

from fastapi import File, Form, HTTPException, UploadFile
from sqlmodel import Session

from src.connectors import s3
from src.models.file import CreateFiles, Files

# import schemas.schemas
from src.schemas.file import File, FileInfo

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
    return db.query(Files).offset(skip).limit(limit).all()


def get_file(db: Session, file_id: int):
    return db.query(Files).filter(Files.id == file_id).first()


def create_file(db: Session, file: CreateFiles):
    db_file = Files(**file.dict())
    db.add(db_file)
    db.commit()
    db.refresh(db_file)
    return db_file


# def get_file_by_path(db: Session, path: str):
#     return db.query(File).filter(File.path == path).first()


# def update_file(db: Session, file: schemas.File):
#     db_file = db.query(File).filter(File.id == file.id).first()
#     db_file.name = file.name
#     db.commit()
#     db.refresh(db_file)
#     return db_file


def delete_file(db: Session, id: int):
    db_file = db.query(Files).filter(Files.id == id).first()
    db.delete(db_file)
    db.commit()
    return db_file


def upload_file(
    db: Session,
    hash: str,
    new_file: tempfile.SpooledTemporaryFile,
    filename: str,
    ext: str,
):

    try:
        s3.upload_file_obj(new_file, f"{hash}.{ext}")
    except Exception as e:
        print(e)
        raise HTTPException(
            status_code=404, detail="Impossible to save the file in minio"
        )
    metadata = {
        "id": str(uuid4()),
        "hash": hash,
        "name": filename,
        "extension": ext,
        "bucket": "jean-paul-bucket",
        "date": "2022-01-22",
    }
    try:
        return create_file(db=db, file=metadata)
    except Exception as e:
        raise HTTPException(
            status_code=404, detail="Impossible to save the file in bdd"
        )


def get_deployment_files(db: Session, id: int):
    return db.query(Files).filter(Files.deployment_id == id)
