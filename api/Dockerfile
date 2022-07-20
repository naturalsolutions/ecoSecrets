FROM python:3.8-slim-buster

RUN apt-get update \
    && apt-get install -y --no-install-recommends curl

ENV PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100 \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

RUN pip3 install pipenv

EXPOSE 8000

CMD python3 -m pipenv install --skip-lock --system; python3 -m pipenv run start
