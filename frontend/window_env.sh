#!/bin/sh

# This script sets env variables especially to work
# with nginx

echo "window._env_ = {" > ./env-config.js

# Read each line in .env file
# Each line represents key=value pairs
env -0 | while IFS='=' read -r -d '' n v;
do
    # Test if the variable contains REACT_APP
    if echo "$n" | grep -q "REACT_APP"; then
        # Append configuration property to JS file
        echo "  $n: \"$v\"," >> ./env-config.js
    fi
done

echo "}" >> ./env-config.js