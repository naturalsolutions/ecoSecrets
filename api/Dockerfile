FROM python:3.8-slim-buster

RUN apt-get update \
    && apt-get install -y --no-install-recommends curl

WORKDIR /app

RUN pip3 install pipenv

EXPOSE 8000

CMD python3 -m pipenv install --skip-lock --system; python3 -m pipenv run start
