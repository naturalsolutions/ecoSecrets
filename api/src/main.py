import os

from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.auth.auth import get_current_token
from src.config import settings
from src.connectors.database import init_db
from src.connectors.s3 import init_bucket
from src.routers import deployments, devices, files, home, projects, sites, templateSequences, users

ROOT_PATH = settings.API_ROOT_PATH

app = FastAPI(
    root_path=ROOT_PATH,
    swagger_ui_parameters={"persistAuthorization": True},
)  # dependencies=[Depends(get_query_token)]

TOKEN_DEPENDS = Depends(get_current_token)
app.include_router(users.router, dependencies=[TOKEN_DEPENDS])
app.include_router(files.router, dependencies=[TOKEN_DEPENDS])
app.include_router(projects.router, dependencies=[TOKEN_DEPENDS])
app.include_router(deployments.router, dependencies=[TOKEN_DEPENDS])
app.include_router(sites.router, dependencies=[TOKEN_DEPENDS])
app.include_router(devices.router, dependencies=[TOKEN_DEPENDS])
app.include_router(home.router, dependencies=[TOKEN_DEPENDS])
app.include_router(templateSequences.router, dependencies=[TOKEN_DEPENDS])

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    init_bucket()

    is_demo_instance = os.environ.get("DEMO_INSTANCE", None) == "True"
    if is_demo_instance:
        init_db()
