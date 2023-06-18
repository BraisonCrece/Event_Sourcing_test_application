#!/usr/bin/env bash

set -e

echo "Removing node modules directory..."
rm -rf node_modules
echo "Removing yarn.lock file..."
rm -f yarn.lock
echo

cmd="yarn install"

echo $cmd
($cmd)

echo '- - -'
echo '(done)'
echo
