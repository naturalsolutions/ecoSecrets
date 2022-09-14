#!/usr/bin/env bash

set -e

# Pre-pre-flight? 🤷
if [[ -n "$MSYSTEM" ]]; then
    echo "Seems like you are using an MSYS2-based system (such as Git Bash) which is not supported. Please use WSL instead.";
    exit 1
fi

PROJECT_NAME="geonature-annotation"

if [ "$ENV" == "production" ]; then
    docker-compose --project-name=${PROJECT_NAME} -f ./docker/docker-compose.yml -f ./docker/docker-compose.prod.yml "$@"
else
    docker-compose --project-name=${PROJECT_NAME} --project-directory=./docker "$@"
fi
