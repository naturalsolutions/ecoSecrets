#!/bin/bash
set -e

cron -f &

exec "$@"