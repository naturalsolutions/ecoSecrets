from src.config import settings
from celery import Celery, chord, shared_task

celery_app = Celery(
    settings.CELERY_APP, broker=settings.CELERY_BROKER, backend=settings.CELERY_BACKEND
)
