FROM python:3.8-slim-buster

WORKDIR /app

RUN pip3 install pipenv

CMD python3 -m pipenv install --skip-lock; python3 -m pipenv run start
