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

await page.goto(source);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: output, type: "jpeg", quality: 85 });
await browser.close();

console.log(`Wrote ${output}`);
