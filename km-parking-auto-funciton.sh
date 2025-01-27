rm -rf compiled-by-ts
echo "compiled-by-ts을 초기화했습니다."

mkdir -p dist
mkdir -p compiled-by-ts

npx tsc

cd compiled-by-ts

zip -r km-parking-auto-function.zip .

cd ../
mv compiled-by-ts/km-parking-auto-function.zip dist
