#!/bin/bash

set -e

USER_ID=$(id -u)
GROUP_ID=$(id -g)

# Copy .env.sample so that docker-compose can start
cp ./docker/.env.sample ./docker/.env

./scripts/docker.sh build --build-arg USER_ID=$USER_ID --build-arg GROUP_ID=$GROUP_ID
# Keycloak and api because api depends on db and minio
./scripts/docker.sh up -d keycloak api
./scripts/docker.sh exec api pytest tests --cov-fail-under=${COV_FAIL_UNDER:-70} --cov-report html:/home/app/src/htmlcov --cov=src
./scripts/docker.sh exec api coverage xml
./scripts/docker.sh down -v