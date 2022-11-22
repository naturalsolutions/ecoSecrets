from fastapi import Depends, FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from src.config import settings
from src.connectors.s3 import init_bucket
from src.dependencies import get_query_token, get_token_header
from src.internal import admin
from src.routers import (
    deployments,
    devices,
    files,
    home,
    projects,
    sites,
    templateSequences,
    users,
)

ROOT_PATH = settings.API_ROOT_PATH

app = FastAPI(
    root_path=ROOT_PATH,
    swagger_ui_parameters={"persistAuthorization": True},
)  # dependencies=[Depends(get_query_token)]

app.include_router(users.router)
app.include_router(files.router)
app.include_router(projects.router)
app.include_router(deployments.router)
app.include_router(sites.router)
app.include_router(devices.router)
app.include_router(home.router)
app.include_router(templateSequences.router)
app.include_router(
    admin.router,
    prefix="/admin",
    tags=["admin"],
    # dependencies=[Depends(get_token_header)],
    responses={418: {"description": "I'm a teapot"}},
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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
