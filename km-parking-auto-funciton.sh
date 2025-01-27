mkdir -p dist
mkdir -p compiled-by-ts

npx tsc

cd compiled-by-ts
zip -r km-parking-auto-function.zip index.js

cd ../
mv compiled-by-ts/km-parking-auto-function.zip dist
