import { chromium } from "playwright";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const source = pathToFileURL(resolve("scripts/og-image.html")).href;
const output = resolve("assets/og-image.jpg");

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  colorScheme: "dark",
});

await page.goto(pathToFileURL(resolve("index.html")).href);
const name = await page.locator("h1").textContent();
const tagline = (await page.locator(".tagline").textContent())
  .replace(/\s+/g, " ")
  .trim();
const canonical = await page
  .locator('link[rel="canonical"]')
  .getAttribute("href");
const host = new URL(canonical).host;

await page.goto(source);
await page.evaluate(
  ({ name, tagline, host }) => {
    document.querySelector("#name").textContent = name;
    document.querySelector("#tagline").textContent = tagline;
    document.querySelector("#host").textContent = host;
  },
  { name, tagline, host },
);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: output, type: "jpeg", quality: 85 });
await browser.close();

console.log(`Wrote ${output}`);
