import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import { chromium, firefox, webkit } from "playwright";
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
const engines = [chromium, firefox, webkit];
const schemes = ["light", "dark"];

const server = createServer(async (req, res) => {
  const path = req.url === "/" ? "/index.html" : req.url.split("?")[0];
  try {
    const file = resolve(root, "." + path);
    if (!file.startsWith(root + sep)) return res.writeHead(403).end();
    const body = await readFile(file);
    res.writeHead(200, {
      "Content-Type": types[extname(path)] ?? "application/octet-stream",
    });
    res.end(body);
  } catch {
    res.writeHead(404).end();
  }
});
await new Promise((ready) => server.listen(0, ready));
const { port } = server.address();

const url = `http://localhost:${port}/`;

async function audit(browser, label, size, colorScheme) {
  const context = await browser.newContext({ viewport: size, colorScheme });
  const page = await context.newPage();
  const response = await page.goto(url);
  if (!response?.ok()) {
    throw new Error(`${label}: page failed to load (${response?.status()})`);
  }
  const headings = await page.locator("h1").allTextContents();
  if (!headings.join("").trim()) {
    throw new Error(`${label}: page rendered without a heading`);
  }
  // Let the open role's fade-in finish so axe reads settled colours
  await page.waitForTimeout(500);
  const { violations } = await new AxeBuilder({ page })
    .withTags(tags)
    .analyze();
  console.log(`${label}: ${violations.length} violation(s)`);
  for (const v of violations) {
    console.log(`  ${v.id} (${v.impact}): ${v.help}`);
    for (const node of v.nodes) {
      console.log(`    ${node.target.join(" ")}`);
      for (const check of node.any) {
        console.log(`      ${check.message} ${JSON.stringify(check.data)}`);
      }
    }
  }
  await context.close();
  return violations;
}

const runs = viewports.flatMap(({ name, ...size }) =>
  schemes.map((colorScheme) => ({ name, size, colorScheme })),
);

let violationCount = 0;

for (const engine of engines) {
  const browser = await engine.launch();
  try {
    for (const { name, size, colorScheme } of runs) {
      const label = `${engine.name()} ${name} ${colorScheme}`;
      const violations = await audit(browser, label, size, colorScheme);
      violationCount += violations.length;
    }
  } finally {
    await browser.close();
  }
}
server.close();
process.exitCode = violationCount > 0 ? 1 : 0;
