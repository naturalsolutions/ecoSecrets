Generic single-database configuration.

# Alembic

1. Initialize Alembic: alembic init alembic
2. Edit alembic.ini by taking
(this)[https://github.com/tiangolo/full-stack-fastapi-postgresql/blob/master/%7B%7Bcookiecutter.project_slug%7D%7D/backend/app/alembic.ini]
as example
3. Edit alembic/env.py  by taking
(this)[https://github.com/tiangolo/full-stack-fastapi-postgresql/blob/master/%7B%7Bcookiecutter.project_slug%7D%7D/backend/app/alembic/env.py]
as example
4. alembic revision --autogenerate -m "init"
