#!/bin/bash

OUTPUT_FULL_PACKAGE_JSON="console.log(JSON.stringify(packageJson, undefined, 2))";

open_package_json () {
    
    RUN_SCRIPT="$1"
    
    LOADED_JSON="$(cat "$PACKAGE_JSON")"
    SCRIPT_OUT="$(node -e "var packageJson = $LOADED_JSON;$RUN_SCRIPT;")"
    
    echo "$SCRIPT_OUT"
    
}

output_package_json () {
    
    RUN_EXPR="$1"
    
    EXPR_OUT="$(open_package_json "console.log($RUN_EXPR);")"
    
    echo "$EXPR_OUT"

}

edit_package_json () {

    EDIT_SCRIPT="$1"
    
    UPDATED_JSON="$(open_package_json "${EDIT_SCRIPT};$OUTPUT_FULL_PACKAGE_JSON;")"
    
    printf "${UPDATED_JSON}\n" > "$PACKAGE_JSON"

}

get_dependency_list () {
    
    DEPENDENCY_KEY="$1"
    
    DEPENDENCY_LIST="$(output_package_json "Object.keys(packageJson['$DEPENDENCY_KEY']).join(' ')")"
    
    echo "$DEPENDENCY_LIST"
    
}

delete_package_json_key () {

    KEY="$1"
    
    edit_package_json "delete packageJson['$KEY'];"
    
}

REQUIRED_NODE_VERSION="12"
ROOT_DIR="$(dirname -- "$(readlink -f -- "$BASH_SOURCE")")/../../"
PACKAGE_JSON="${ROOT_DIR}package.json"

NODE_VERSION="$(node --version)"
NODE_MAJOR_VERSION="$(echo "$NODE_VERSION" | cut -c 2-3)"

# Check for required Node version
if [ "$NODE_MAJOR_VERSION" != "$REQUIRED_NODE_VERSION" ]; then
    echo "Node v$REQUIRED_NODE_VERSION required, but $NODE_VERSION is installed."
    exit 1
fi

DEPENDENCIES_KEY="dependencies1"
DEV_DEPENDENCIES_KEY="devDependencies1"

# Get custom/private dependencies
DEV_TASKS_DEP_KEY="dev-tasks"
DEV_TASKS_DEP="$(output_package_json "packageJson['$DEV_DEPENDENCIES_KEY']['$DEV_TASKS_DEP_KEY']")"

# Delete custom/private dependencies
edit_package_json "delete packageJson['$DEV_DEPENDENCIES_KEY']['$DEV_TASKS_DEP_KEY'];"

# Get package lists
DEPENDENCY_LIST="$(get_dependency_list $DEPENDENCIES_KEY)"
DEV_DEPENDENCY_LIST="$(get_dependency_list $DEV_DEPENDENCIES_KEY)"

# Install
echo "Installing dependencies: $DEPENDENCY_LIST"
npm install --save $DEPENDENCY_LIST
echo ""
echo "Installing dev dependencies: $DEV_DEPENDENCY_LIST"
npm install --save-dev $DEV_DEPENDENCY_LIST
echo ""

# Install custom/private dependencies
echo "Installing custom/private dependencies"
echo "Installing: $DEV_TASKS_DEP_KEY"
edit_package_json "packageJson['devDependencies']['$DEV_TASKS_DEP_KEY'] = '$DEV_TASKS_DEP';"
npm install "$DEV_TASKS_DEP_KEY"
echo ""

# Remove old package.json keys
delete_package_json_key "$DEPENDENCIES_KEY"
delete_package_json_key "$DEV_DEPENDENCIES_KEY"

echo "Completed install."
exit 0
