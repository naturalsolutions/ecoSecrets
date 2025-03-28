import hashlib
import tempfile
import uuid as uuid_pkg
from datetime import datetime
from typing import List

from botocore.exceptions import BotoCoreError, ClientError
from fastapi import HTTPException
from sqlalchemy.orm.attributes import flag_modified
from sqlmodel import Session

from src.config import settings
from src.connectors import s3
from src.models.file import CreateDeviceFile, CreateFiles, Files
from src.schemas.file import FilterParams, UpdateFile

# import schemas.schemas
from src.utils import file_as_bytes


def get_hash(file):
    return hashlib.sha256(file_as_bytes(file)).hexdigest()


def get_files(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Files).order_by(Files.name).offset(skip).limit(limit).all()


def get_file(db: Session, file_id: uuid_pkg.UUID):
    return db.query(Files).filter(Files.id == file_id).first()


def get_deployment_files_with_filters(
    db: Session, deployment_id: int, filters_params: FilterParams, skip: int = 0, limit: int = 10000
):
    filters = filters_params.get_filters()
    query = db.query(Files).filter(
        Files.deployment_id == deployment_id,
    )
    if filters.taxonomy_filters:
        query = query.filter(Files.annotations.contains([filters.taxonomy_filters]))

    start_date = filters.date_ranges.get("start_date")
    end_date = filters.date_ranges.get("end_date")

    if start_date and end_date:
        query = query.filter(Files.date.between(start_date, end_date))
    elif start_date:
        query = query.filter(Files.date >= start_date)
    elif end_date:
        query = query.filter(Files.date <= end_date)

    query = query.order_by(Files.name).offset(skip).limit(limit)

    files = query.all()
    res = []
    for f in files:
        new_f = f.dict()
        url = s3.get_url(f"{f.hash}.{f.extension}")
        new_f["url"] = url
        res.append(new_f)
    return res


def get_deployment_files(db: Session, id: int, skip: int = 0, limit: int = 10000):
    return (
        db.query(Files)
        .filter(Files.deployment_id == id)
        .order_by(Files.name)
        .offset(skip)
        .limit(limit)
        .all()
    )


def delete_media_deployment(db: Session, name: str):
    db_files = db.query(Files).filter(Files.name == name).first()
    db.delete(db_files)
    db.commit()


def create_file(db: Session, file: CreateFiles):
    db_file = Files(**file.dict(), annotations=[])
    db.add(db_file)
    db.commit()
    db.refresh(db_file)
    return db_file


def create_file_device(db: Session, file: CreateDeviceFile):
    db_file = CreateDeviceFile(**file.dict(), annotations=[])
    db.add(db_file)
    db.commit()
    db.refresh(db_file)
    return db_file


def update_annotations(db: Session, file_id: int, data: UpdateFile):
    db_file = get_file(db=db, file_id=file_id)
    if db_file is None:
        raise HTTPException(
            status_code=404,
            detail="No file found",
        )

    if data.annotations:
        annotation = [d.dict() for d in data.annotations.annotations]

        if data.annotations.id_group:
            if annotation:
                db_file.annotations = db_file.annotations + annotation
            if not annotation:
                db_file.annotations = annotation

        if not data.annotations.id_group:
            # processing of grouped observations that become individualized
            if data.annotations.group_observations_id_to_individualize:
                for observation in annotation:
                    if observation["id"] in data.annotations.group_observations_id_to_individualize:
                        observation["id"] = str(uuid_pkg.uuid4())
                        observation["id_group"] = ""

            # update annotation for the current image displayed
            db_file.annotations = annotation

        if not data.annotations.id_group:
            # update the observations of the group's media
            db_files = get_deployment_files(db=db, id=data.deployment_id)
            for file in db_files:
                file_annotation = file.annotations
                for observation in file_annotation:
                    new = next(
                        (item for item in annotation if item["id"] == observation["id"]), None
                    )
                    if new:
                        observation["id_annotation"] = new["id_annotation"]
                        observation["id_group"] = new["id_group"]
                        observation["classe"] = new["classe"]
                        observation["family"] = new["family"]
                        observation["genus"] = new["genus"]
                        observation["order"] = new["order"]
                        observation["species"] = new["species"]
                        observation["number"] = new["number"]
                        observation["life_stage"] = new["life_stage"]
                        observation["biological_state"] = new["biological_state"]
                        observation["behaviour"] = new["behaviour"]
                        observation["sex"] = new["sex"]

                        file.annotations = file_annotation
                        flag_modified(file, "annotations")

        db_file.treated = True

    if data.metadata:
        db_file.date = datetime.fromisoformat(data.metadata.date.replace("Z", "+00:00"))

    db.commit()
    db.refresh(db_file)
    return db_file


def delete_file(db: Session, file_id: str):
    db_file = db.query(Files).filter(Files.id == file_id).first()

    if not db_file:
        raise ValueError("File not found")

    filename = f"{db_file.hash}.{db_file.extension}"

    try:
        s3.delete_file_obj(filename)
    except (BotoCoreError, ClientError) as e:
        print(f"Error deleting file from S3: {e}")
        return None
    db.delete(db_file)
    db.commit()
    return db_file


def deleteAllFilesDeployment(db: Session, id: int):
    db_files = db.query(Files).filter(Files.deployment_id == id).all()
    for f in db_files:
        db.delete(f)
    db.commit()


def upload_file(
    db: Session,
    hash: str,
    new_file: tempfile.SpooledTemporaryFile,
    filename: str,
    ext: str,
    deployment_id: int,
):
    try:
        s3.upload_file_obj(new_file, f"{hash}.{ext}")
    except Exception as e:
        print(e)
        raise HTTPException(status_code=404, detail="Impossible to save the file in minio")
    metadata = CreateFiles(
        hash=hash,
        name=filename,
        extension=ext,
        bucket=settings.MINIO_BUCKET_NAME,
        import_date=datetime.now(),
        deployment_id=deployment_id,
    )
    try:
        return create_file(db=db, file=metadata)
    except Exception as e:
        raise HTTPException(status_code=404, detail="Impossible to save the file in bdd")
