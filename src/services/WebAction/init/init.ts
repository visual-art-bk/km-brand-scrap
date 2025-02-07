import { writeFileSync } from "fs";
import { chromium, Browser, BrowserContext, Page } from "playwright-core";

const ABLY_PATH =
  "https://m.a-bly.com/screens?screen_name=CLOTHING_CATEGORY_DEPARTMENT&next_token=eyJsIjogIkRlcGFydG1lbnRDYXRlZ29yeVJlYWx0aW1lUmFua0dlbmVyYXRvciIsICJwcmV2aW91c19zY3JlZW5fbmFtZSI6ICJUT0RBWSJ9";

export const initPlaywright = async (): Promise<void> => {
  const executablePath =
    "C:\\Users\\USER\\AppData\\Local\\ms-playwright\\chromium-1155\\chrome-win\\chrome.exe";

  // 브라우저 실행
  const browser: Browser = await chromium.launch({
    headless: false, // headless 모드 비활성화 (브라우저 창 열림)
    executablePath, // Playwright가 기본 경로 사용
    args: ["--disable-blink-features=AutomationControlled"],
  });

  // 새로운 브라우저 컨텍스트 및 페이지 생성
  const context: BrowserContext = await browser.newContext();
  const page: Page = await context.newPage();

  console.log("🚀 페이지 이동 중...");
  await page.goto(ABLY_PATH, { waitUntil: "domcontentloaded" });

  console.log("🔽 페이지를 아래로 스크롤 중...");

  // 최신 방식: `page.evaluateHandle()` 사용하여 스크롤 실행
  await page.evaluateHandle(() => {
    window.scrollBy(0, document.body.scrollHeight); // 스크롤 끝까지 이동
  });

  // 페이지가 스크롤 후 로딩될 시간을 확보
  await page.waitForTimeout(2000);

  console.log("✅ 스크롤 완료. 보이는 이미지 크롤링 시작...");

  // 특정 도메인을 포함하지 않는 화면에 보이는 이미지 가져오기
  const filteredImages = await page.$$eval("img", (imgs) =>
    imgs
      .filter((img) => {
        const rect = img.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0; // 화면에 보이는 이미지 필터링
      })
      .filter(
        (img) =>
          img.src.includes("pr:NEW_GOODS_THUMB_WEBP") && // ✅ 특정 경로 포함
          !img.src.includes("https://img.a-bly.com/icons") // ❌ 특정 도메인은 제외
      )
      .map((img) => ({
        src: img.src,
        alt: img.alt || "No alt text",
        width: img.naturalWidth,
        height: img.naturalHeight,
      }))
  );

  console.log(`✅ 총 ${filteredImages.length}개의 이미지 발견 (스크롤 후)`);
  console.log(filteredImages);

  writeFileSync("links.txt", JSON.stringify(filteredImages, null, 2), "utf-8");

  console.log(`✅ 링크 데이터를 JSON 파일로 저장 완료: links.txt`);

  // 브라우저 종료

  if (filteredImages.length > 0) {
    console.log(`✅ ${filteredImages.length}개의 보이는 이미지가 발견됨.`);

    // 첫 번째 필터링된 이미지 찾기
    const firstImageSrc = filteredImages[0].src;
    console.log(`🔍 클릭할 이미지의 SRC: ${firstImageSrc}`);

    // Playwright에서 실제 클릭할 이미지 요소 가져오기
    const firstImageElement = await page.$(`img[src="${firstImageSrc}"]`);

    if (firstImageElement) {
      await firstImageElement.click();
      console.log("🖱️ 첫 번째 이미지 클릭 성공!");
    } else {
      console.log("❌ 클릭할 수 있는 이미지 요소를 찾을 수 없음.");
    }
  } else {
    console.log("❌ 화면에 보이는 이미지가 없음.");
  }

  // 페이지 제목 출력
  const pageTitle: string = await page.title();
  console.log("📄 현재 페이지 제목:", pageTitle);

  // 브라우저 종료
  await browser.close();
};
