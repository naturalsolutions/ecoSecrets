#!/bin/bash

set -o errexit
set -o pipefail
set -o nounset

alembic upgrade head

exec "$@"
