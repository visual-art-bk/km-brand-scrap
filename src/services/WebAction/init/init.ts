import { PROCESS_ENV_DEVELOPMENT } from "../../../CONSTANTS";
import * as dotenv from "dotenv";
import {
  chromium as playwright,
  Browser,
  BrowserContext,
  Page,
} from "playwright-core";

import chromium from "@sparticuz/chromium";
import { initExecutalbePath } from "./initExecutalbePath";
// dotenv.config();

const ENV_STATE = process.env.NODE_ENV;

export const initPlaywright = async (): Promise<void> => {
  const executablePath: string = await initExecutalbePath();

  // 브라우저 실행
  const browser: Browser = await playwright.launch({
    args: chromium.args,
    executablePath: executablePath,
  });

  // 새로운 브라우저 컨텍스트 생성
  const context: BrowserContext = await browser.newContext();

  // 페이지 생성 및 URL 이동
  const page: Page = await context.newPage();
  await page.goto("https://news.naver.com/");

  // 페이지 제목 출력
  const pageTitle: string = await page.title();
  console.log("pageTitle:", pageTitle);

  // 브라우저 종료
  await browser.close();
};
