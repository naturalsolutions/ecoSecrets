from fastapi import Depends, FastAPI, HTTPException, File, UploadFile, Form

import services.crud
from models import models
from connectors.database import engine
from connectors.s3 import init_bucket

from fastapi.middleware.cors import CORSMiddleware

from dependencies import get_query_token, get_token_header
from internal import admin
from routers import items, users, files

models.Base.metadata.create_all(bind=engine)

app = FastAPI()#dependencies=[Depends(get_query_token)]

origins = [
    "http://localhost:4200",
]

app.include_router(users.router)
app.include_router(items.router)
app.include_router(files.router)
app.include_router(
    admin.router,
    prefix="/admin",
    tags=["admin"],
    # dependencies=[Depends(get_token_header)],
    responses={418: {"description": "I'm a teapot"}},
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello Bigger Applications!"}

@app.on_event("startup")
def on_startup():
    init_bucket()
