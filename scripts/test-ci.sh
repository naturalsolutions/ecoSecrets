#!/bin/bash

USER_ID=$(id -u)
GROUP_ID=$(id -g)

./scripts/docker.sh build --build-arg USER_ID=$USER_ID --build-arg GROUP_ID=$GROUP_ID
./scripts/docker.sh up -d
./scripts/docker.sh exec api pytest tests --cov-fail-under=${COV_FAIL_UNDER:-70} --cov-report html:/home/app/src/htmlcov --cov=src
./scripts/docker.sh exec api coverage xml
./scripts/docker.sh down -v