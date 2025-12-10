#!/bin/sh
set -e

envsubst < /usr/share/nginx/html/env/runtime-config.js.template > /usr/share/nginx/html/env/runtime-config.js

exec "$@"
