import { afterAll, beforeAll, describe, expect, test } from "vitest";
import puppeteer from "puppeteer";
import type { Browser, Page } from "puppeteer";
import { getDocument, queries } from "pptr-testing-library";
import { App } from "@root/server";

describe("basic", async () => {
  let app: App;
  let browser: Browser;
  let page: Page;
  const { getByRole } = queries;

  beforeAll(async () => {
    app = await App.bootstrap();
    browser = await puppeteer.launch({
      headless: true,
      ignoreDefaultArgs: ["--disable-extensions"],
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    await new Promise<void>((resolve, reject) => {
      app.web.server.close((error: any) => (error ? reject(error) : resolve()));
    });
  });

  test("should be able to test page", async () => {
    try {
      await page.goto(`http://localhost:${app.port}`);
      const $document = await getDocument(page);
      const $title = await getByRole($document, "heading", { name: /Hi/g });
      expect($title).toBeDefined();
    } catch (e) {
      console.error(e);
      expect(e).toBeUndefined();
    }
  }, 60_000);
});
