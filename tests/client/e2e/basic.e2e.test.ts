import { afterAll, beforeAll, describe, expect, test } from "vitest";
import puppeteer from "puppeteer";
import type { Browser, Page } from "puppeteer";
import { getDocument, queries } from "pptr-testing-library";
import { createServer } from "../../../server";

describe("basic", async () => {
  let server: any;
  let port: number;
  let browser: Browser;
  let page: Page;
  const { getByRole } = queries;

  beforeAll(async () => {
    const bootstrap = await createServer();
    server = bootstrap.app;
    port = Number(bootstrap.port);

    browser = await puppeteer.launch({
      headless: true,
      ignoreDefaultArgs: ["--disable-extensions"],
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    await new Promise<void>((resolve, reject) => {
      server.close(error => (error ? reject(error) : resolve()));
    });
  });

  test("should have the correct title", async () => {
    try {
      await page.goto(`http://localhost:${port}`);
      const $document = await getDocument(page);
      const $title = await getByRole($document, "heading", { name: /Hi/g });
      expect($title).toBeDefined();
    } catch (e) {
      console.error(e);
      expect(e).toBeUndefined();
    }
  }, 60_000);
});
