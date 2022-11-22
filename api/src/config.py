from pydantic import BaseSettings, AnyHttpUrl, PostgresDsn


class Settings(BaseSettings):
    API_ROOT_PATH: str = "/api/v1"
    DB_URL: PostgresDsn = "postgresql://annotation:password@db/annotation"
    MINIO_ENTRYPOINT_URL: AnyHttpUrl = "http://localhost:9000"
    MINIO_ROOT_USER: str = "test"
    MINIO_ROOT_PASSWORD: str = "password"
    MINIO_BUCKET_NAME: str = "bucket"

    class Config:
        env_file = '.env'
        case_sensitive = True


settings = Settings()
