from typing import Optional

from pydantic import BaseSettings


class Settings(BaseSettings):
    ROOT_PATH: str = "/deepfaune"
    HOST: Optional[str] = None
    CELERY_BROKER: str = "redis://:EzbBLVQGWWQQ43g44AZbWyCSy593rE@broker/0"
    CELERY_BACKEND: str = "redis://:EzbBLVQGWWQQ43g44AZbWyCSy593rE@broker/0"
    CELERY_APP: str = "deepfaune"

    class Config:
        case_sensitive = True


settings = Settings()
