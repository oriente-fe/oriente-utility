#!/usr/bin/env sh

cd src && each '**/*.js' -- rollup \
  --format umd \
  -c $PWD/../rollup.config.js \
  -o $PWD/../%p \
  -n $PWD/%p $PWD/%p
