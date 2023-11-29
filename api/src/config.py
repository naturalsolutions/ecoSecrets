from pydantic import AnyHttpUrl, BaseSettings, PostgresDsn


class Settings(BaseSettings):
    API_ROOT_PATH: str = "/api/v1"
    DB_URL: PostgresDsn = "postgresql://annotation:password@db/annotation"
    MINIO_ENTRYPOINT_URL: AnyHttpUrl = "http://localhost:9000"
    MINIO_ROOT_USER: str = "test"
    MINIO_ROOT_PASSWORD: str = "password"
    MINIO_BUCKET_NAME: str = "bucket"
    CELERY_BROKER: str = "redis://:EzbBLVQGWWQQ43g44AZbWyCSy593rE@broker/0"
    CELERY_BACKEND: str = "redis://:EzbBLVQGWWQQ43g44AZbWyCSy593rE@broker/0"
    CELERY_APP: str = "deepfaune"

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
