#! /bin/sh

rm -rf dist
mkdir -p dist dist/js

cp -r css dist
cp -r icon dist
cp manifest.json dist

uglifyjs --compress --mangle -- js/script.js > dist/js/script.js
uglifyjs --compress --mangle -- js/tablesort_custom.js > dist/js/tablesort_custom.js

(
    cd dist
    zip yahoo_finance_extension.zip *
)