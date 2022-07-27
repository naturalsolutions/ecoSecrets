from __future__ import annotations

import io
import tempfile
from datetime import datetime
from distutils import extension
from typing import List
from uuid import uuid4
from zipfile import ZipFile

from fastapi import APIRouter, Depends, File, Form, HTTPException, Query, UploadFile
from fastapi.responses import StreamingResponse
from sqlmodel import Session

from src.connectors import s3
from src.connectors.database import get_db
from src.models.file import CreateFiles
from src.schemas.annotation import annotation
from src.services import dependencies, files

router = APIRouter(
    prefix="/files",
    tags=["files"],
    # dependencies=[Depends(get_token_header)],
    responses={404: {"description": "Not found"}},
)

# @router.get("/", response_model=List[schemas.File])
# def read_files(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
#     users = crud.get_files(db, skip=skip, limit=limit)
#     return files


# @router.get("/{file_id}", response_model=schemas.File)
# def read_file(file_id: int, db: Session = Depends(get_db)):
#     db_file = crud.get_file(db, file_id=file_id)
#     if db_file is None:
#         raise HTTPException(status_code=404, detail="File not found")
#     return db_file


def file_as_bytes(file):
    with file:
        return file.read()


@router.get("/")
def get_files(db: Session = Depends(get_db)):
    List_files = files.get_files(db)
    res = []
    for f in List_files:
        new_f = f.dict()
        url = s3.get_url(f"{f.hash}.{f.extension}")
        new_f["url"] = url
        res.append(new_f)
    return res


@router.get("/urls/")
def display_file(name: str):
    return s3.get_url(name)


@router.post("/exif/")
def upload_file(file: UploadFile = File(...), db: Session = Depends(get_db)):
    from exif import Image

    exif_data = Image(file_as_bytes(file.file))
    res = {}
    for key in exif_data.list_all():
        try:
            res[key] = exif_data[key]
        except Exception as e:
            res[key] = "Erreur inconnue pour le moment"
    return res


@router.post("/upload/")
def upload_file(
    hash: str = Form(), file: UploadFile = File(...), db: Session = Depends(get_db)
):
    ext = file.filename.split(".")[1]
    insert = files.upload_file(db, hash, file.file, file.filename, ext)
    return insert


@router.get("/download/{id}")
def download_file(id: str, db: Session = Depends(get_db)):
    f = files.get_file(db, id)
    my_file = s3.download_file_obj(f"{f.hash}.{f.extension}")

    response = StreamingResponse(my_file, media_type="application/x-zip-compressed")
    response.headers["Content-Disposition"] = f"attachment; filename={f.name}"
    response.headers["Content-Length"] = str(my_file.getbuffer().nbytes)
    return response


@router.post("/upload_files/")
def upload_files(
    list_files: List[UploadFile] = File(...),
    db: Session = Depends(get_db),
):
    if len(list_files) < 20:

        print(list_files)
        for file in list_files:
            hash = dependencies.generate_checksum(file)
            ext = file.filename.split(".")[1]
            try:
                s3.upload_file_obj(file.file, f"{hash}.{ext}")
            except Exception as e:
                raise HTTPException(
                    status_code=404, detail="Impossible to save the file in minio"
                )

            # metadata = {
            #     "hash": hash,
            #     "name": file.filename,
            #     "extension": ext,
            #     "bucket": "jean-paul-bucket",
            #     "date": "2022-01-22",
            # }
            metadata = CreateFiles(
                hash=hash,
                name=file.filename,
                extension=ext,
                bucket="jean-paul-bucket",
                date=datetime.fromisoformat("2022-01-22"),
                deployment_id=1,
            )
            a = metadata.dict()
            try:
                files.create_file(db=db, file=metadata)
            except Exception as e:
                print(e)
                raise HTTPException(
                    status_code=404, detail="Impossible to save the file in bdd"
                )
        return "Files créés !"

    else:
        return "Erreur: le nombre de fichiers à importer est limité à 20"


@router.post("/upload_zip/")
def upload_zip(
    hash: List[str] = Form(),
    zipFile: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    listHash = hash[0].split(",")
    ext = zipFile.filename.split(".")[1]
    if ext == "zip":
        with ZipFile(io.BytesIO(zipFile.file.read()), "r") as myzip:
            res = []
            for info, hash in zip(myzip.infolist(), listHash):
                bytes = myzip.read(info.filename)
                with tempfile.SpooledTemporaryFile() as tf:
                    tf.write(bytes)
                    tf.seek(0)
                    insert = files.upload_file(db, hash, tf, info.filename, "JPG")
                    res.append(insert)
            return res
    else:
        raise HTTPException(
            status_code=500, detail="Vous ne pouvez déposer que des fichiers.zip"
        )


@router.get("/{deployment_id}")
def read_deployment_files(deployment_id: int, db: Session = Depends(get_db)):
    List_files = files.get_deployment_files(db=db, id=deployment_id)
    res = []
    for f in List_files:
        new_f = f.dict()
        url = s3.get_url(f"{f.hash}.{f.extension}")
        new_f["url"] = url
        res.append(new_f)
    return res
