#!/bin/sh
set -e

# Adjust paths for serve
if [ -f ./env/runtime-config.js.template ]; then
  envsubst < ./env/runtime-config.js.template > ./env/runtime-config.js
fi

# Forward CMD arguments to start serve
exec "$@"
