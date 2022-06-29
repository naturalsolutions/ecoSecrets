from fastapi import APIRouter, Depends, HTTPException, File, UploadFile, Form
from dependencies import get_token_header
from connectors import s3
from connectors.database import get_db
from services import crud, crud_files
from models import models
from schemas import schemas
from typing import List
import hashlib

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

@router.post("/")
async def put_hash(file: UploadFile = File(...)):
    return hashlib.sha256(file_as_bytes(file.file)).hexdigest()


@router.post("/uploadfile/")
def upload_file(file: UploadFile = File(...)):
    return s3.upload_file_obj(file.file,file.filename)

files

id(sha256)   |  name(original filename)  |  extension   |   bucket   |    date  |  lng-lt  |  id_deploiement | id_sequences  |  list_carac

carac {
    espece
    Nb
    sexe
    comportement
}


# @router.post("/uploadfile/")
# async def upload_file(file: UploadFile = File(...)):
    
#     try :
#         contents = await file.read()
#         with open(f'{file.filename}',"wb") as f:
#             f.write(contents)
#     except Exception:
#         return {"message": "There was an error uploading the file"}
#     finally:
#         await file.close()
        
#     return {"message": f"Successfuly uploaded {file.filename}"}

# @router.post("/", response_model=schemas.File)
# def create_upload_file(file: UploadFile, db: Session = Depends(get_db)):
#     file_details = {"name": file.filename ,"path": 'test' }
#     db_file = crud. get_file_by_path(db, path = 'test' )
#     if db_file:
#         raise HTTPException(status_code=400, detail="Path already registered")
    
#     return crud.create_file(db=db, file=file)


# @router.put("/{file_id}", response_model=schemas.File)
# def update_file(file_id: int, file: schemas.File, db: Session = Depends(get_db)):
#     return crud.update_file(db=db, file=file)
    

# @router.delete("/{file_id}")
# def delete_file(file_id: int, db: Session = Depends(get_db)):
#     return crud.delete_file(db=db, id=file_id)