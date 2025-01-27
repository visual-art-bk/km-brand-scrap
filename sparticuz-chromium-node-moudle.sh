# 기존 디렉토리 구조 준비
mkdir -p sparticuz-layer/nodejs
mkdir -p dist

# @sparticuz 패키지를 제외한 모든 패키지를 복사
rsync -av --progress \
    --include '@sparticuz*/' \
    --include '@sparticuz*/**' \
    --exclude '*' \
    node_modules/ sparticuz-layer/nodejs/node_modules/

# ZIP 파일 생성
cd sparticuz-layer
zip -r sparticuz-chromium-node-module-sparticuz-layer.zip .
cd ..
mv sparticuz-layer/sparticuz-chromium-node-module-sparticuz-layer.zip dist
rm -rf sparticuz-layer
