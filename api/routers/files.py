import io
from uuid import uuid4
from fastapi import APIRouter, Depends, HTTPException, File, UploadFile, Form, Query
from fastapi.responses import StreamingResponse
from services import user, files
from sqlmodel import Session
from dependencies import get_token_header
from connectors import s3
from connectors.database import get_db
from models import models
from schemas import schemas
from typing import List
from zipfile import ZipFile

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
def get_files( db: Session = Depends(get_db)):
    List_files =  files.get_files(db)
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
def upload_file( file: UploadFile = File(...), db: Session = Depends(get_db)):
    from exif import Image
    exif_data = Image(file_as_bytes(file.file))
    res = {}
    for key in exif_data.list_all():
        try:
            res[key] = exif_data[key]
        except Exception as e:
            res[key] = "Erreu inconnuepour le moment"
    return res

@router.post("/upload/")
def upload_file( hash: str = Form(), file: UploadFile = File(...), db: Session = Depends(get_db)):
    ext = file.filename.split(".")[1]
    print(ext)
    print(type(file))
    insert = files.upload_file(db, hash, file, ext)
    return insert

@router.get("/download/{id}")
def download_file (id: str, db: Session = Depends(get_db)):
    f = files.get_file(db, id)
    my_file = s3.download_file_obj(f"{f.hash}.{f.extension}")

    response = StreamingResponse(my_file, media_type="application/x-zip-compressed")
    response.headers["Content-Disposition"] = f"attachment; filename={f.name}"
    response.headers["Content-Length"] = str(my_file.getbuffer().nbytes)
    return response

@router.post("/upload_files/")
def upload_files(hash: List[str] = Form(), listFiles: List[UploadFile] = File(...), db: Session = Depends(get_db)):
    if len(listFiles)<20:
        listHash = hash[0].split(",")
        print(listFiles)
        if len(listHash) == len(listFiles):
            for hash, file in zip(listHash,listFiles) :
                print(hash, file)
                ext = file.filename.split(".")[1]
                try:
                    s3.upload_file_obj(file.file,f"{hash}.{ext}")
                except Exception as e:
                    raise HTTPException(status_code=404, detail="Impossible to save the file in minio")
                metadata = {"id":str(uuid4()),"hash": hash, "name": file.filename, "extension":ext , "bucket": "jean-paul-bucket", "date": '2022-01-22'}
                try:
                    files.create_file(db=db, file=metadata)
                except Exception as e:
                    print(e)
                    raise HTTPException(status_code=404, detail="Impossible to save the file in bdd")
            return 'Files créés !'
        else:
            return "Erreur : le nombre de hash ne correspond pas au nombre de fichiers transmis"
    else:
        return "Erreur: le nombre de fichiers à importer est limité à 20"

@router.post("/upload_zip/")
def upload_zip(hash: List[str] = Form(), zipFile: UploadFile = File(...), db: Session = Depends(get_db)):
    listHash = hash[0].split(",")
    ext = zipFile.filename.split(".")[1]
    if ext == "zip":
        with ZipFile(io.BytesIO(zipFile.file.read()), "r") as myzip:
            res = []
            print(myzip)
            for info, hash in zip(myzip.infolist(), listHash):
                print(info)
                print(hash)
                with myzip.open(info.filename) as myfile:
                    print('ICI')
                    print(type(myfile))
                    insert = files.upload_file(db, hash, myfile, 'JPG')
                    res.append(insert)
            # for info in zip.infolist():
            #     from exif import Image
            #     exif_data = Image(zip.read(info.filename))
            #     infoFile = {}
            #     for key in exif_data.list_all():
            #         try:
            #             infoFile[key] = exif_data[key]
            #         except Exception as e:
            #             infoFile[key] = "Erreur inconnue pour le moment"
            return res
    else:
        return "Vous ne pouvez déposer que fichier .zip"

        
        
        #     for hash, file in zip(listHash,listFiles) :
        #         print(hash, file)
        #         ext = file.filename.split(".")[1]
        #         try:
        #             s3.upload_file_obj(file.file,f"{hash}.{ext}")
        #         except Exception as e:
        #             raise HTTPException(status_code=404, detail="Impossible to save the file in minio")
        #         metadata = {"id":str(uuid4()),"hash": hash, "name": file.filename, "extension":ext , "bucket": "jean-paul-bucket", "date": '2022-01-22'}
        #         try:
        #             files.create_file(db=db, file=metadata)
        #         except Exception as e:
        #             print(e)
        #             raise HTTPException(status_code=404, detail="Impossible to save the file in bdd")
        #     return 'Files créés !'
        # else:
        #     return "Erreur : le nombre de hash ne correspond pas au nombre de fichiers transmis"
    



# @router.get("/geturl/{name}")
# def display_file(name: str):
#     return s3.get_url(name)

# @router.get("/{id}")
# def file():
#     #renvoie toutes les datas d'un fichier
#     pass

# files

# id(sha256)   |  name(original filename)  |  extension   |   bucket   |    date  |  lng-lt  |  id_deploiement | id_sequences  |  list_carac

# carac {
#     espece
#     Nb
#     sexe
#     comportement
# }


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