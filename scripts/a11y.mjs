import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const root = process.cwd();
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
};
const tags = [
  "wcag2a",
  "wcag2aa",
  "wcag21a",
  "wcag21aa",
  "wcag22aa",
  "best-practice",
];
const viewports = [
  { name: "desktop", width: 1280, height: 800 },
  { name: "mobile", width: 375, height: 812 },
];
const schemes = ["light", "dark"];

const server = createServer(async (req, res) => {
  const path = req.url === "/" ? "/index.html" : req.url.split("?")[0];
  try {
    const file = await readFile(join(root, normalize(path)));
    res.writeHead(200, {
      "Content-Type": types[extname(path)] ?? "application/octet-stream",
    });
    res.end(file);
  } catch {
    res.writeHead(404).end();
  }
});
await new Promise((resolve) => server.listen(0, resolve));
const { port } = server.address();

const browser = await chromium.launch();
let failed = false;

for (const { name, ...size } of viewports) {
  for (const colorScheme of schemes) {
    const context = await browser.newContext({ viewport: size, colorScheme });
    const page = await context.newPage();
    await page.goto(`http://localhost:${port}/`);
    // Let the open role's fade-in finish so axe reads settled colours
    await page.waitForTimeout(500);
    const { violations } = await new AxeBuilder({ page })
      .withTags(tags)
      .analyze();
    console.log(`${name} ${colorScheme}: ${violations.length} violation(s)`);
    for (const v of violations) {
      failed = true;
      console.log(`  ${v.id} (${v.impact}): ${v.help}`);
      for (const node of v.nodes) console.log(`    ${node.target.join(" ")}`);
    }
    await context.close();
  }
}

await browser.close();
server.close();
process.exit(failed ? 1 : 0);
