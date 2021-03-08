#!/bin/bash

ROOT_DIR="$(dirname -- "$(readlink -f -- "$BASH_SOURCE")")/../../"

echo "Initializing new project...."

echo ""

echo "Running install..."

echo ""

${ROOT_DIR}bin/init/install.sh

echo ""

echo "Removing initialization files...."

rm -rf "${ROOT_DIR}bin/init"

echo ""

echo "Initialization complete."

exit 0
