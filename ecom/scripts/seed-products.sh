#!/bin/sh

set -eu

SCRIPT_DIR=$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)
cd "$SCRIPT_DIR/.."

if docker compose ps --status running --services django-app | grep -qx "django-app"; then
    exec docker compose exec -T django-app python manage.py seed_products "$@"
fi

exec docker compose run --rm django-app python manage.py seed_products "$@"
