# 기존 디렉토리 구조 준비
mkdir -p layer/nodejs
mkdir -p dist

rm -rf node_modules
npm install --omit=dev

# @sparticuz 패키지를 제외한 모든 패키지를 복사
rsync -av --progress node_modules/ layer/nodejs/node_modules --exclude '@sparticuz*'

# ZIP 파일 생성
cd layer
zip -r node-moudules-without-sparticuz-chromium-layer.zip .
cd ..
mv layer/node-moudules-without-sparticuz-chromium-layer.zip dist
rm -rf layer

rm -rf node_modules
npm i
