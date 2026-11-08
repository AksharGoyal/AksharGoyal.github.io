# Akshar Goyal

Personal portfolio: who I am, the data engineering work I have done, and the project I built.

- **Site:** https://akshargoyal.github.io (GitHub Pages, built from `main`)

## Approach

Plain HTML and CSS, with no JavaScript, framework or build step, so the page is
fast, accessible and easy to read. Tooling checks the code and generates the
link-preview image; nothing is compiled into the page.

## Run locally

```bash
npm run serve   # python3 -m http.server 8000
```

Then open http://localhost:8000. Serving over HTTP matches production better
than opening `index.html` directly, though that also works since all paths are
relative.

## Structure

```
index.html      Single page: intro, about, experience, projects, education, skills
css/            Design tokens and styles
assets/         Favicon, link-preview image and self-hosted font
scripts/        Accessibility check and the link-preview image generator
.github/        Quality-checks workflow and Dependabot config
package.json    Dev tooling only (Prettier, html-validate, stylelint, axe, Playwright)
resources/      Learning notes and a glossary
```

## Checks

```bash
npm ci
npm run check   # Prettier, html-validate, stylelint
npm run a11y    # axe-core in Chromium: light and dark, desktop and mobile
```

`npm run a11y` needs a browser once: `npx playwright install chromium`. CI runs
the same checks on every pull request (the "Quality checks" workflow).

## Link-preview image

`assets/og-image.jpg` (1200x630) is generated from `scripts/og-image.html`, which
reuses the site's design tokens. After changing the tagline or palette, run:

```bash
node scripts/og-image.mjs
```

## Resources

`resources/` holds a glossary of software and data engineering terms, grouped by
topic (frontend, networking, security, data engineering and engineering
practices), and a list of frontend learning resources. Start at
[`resources/glossary/README.md`](resources/glossary/README.md).

## Standards

Goals, with what has been verified so far:

- Accessible (WCAG 2.2 AA): axe-core reports no violations in light and dark mode
  at desktop and mobile widths. The animations have no pause control
  (WCAG 2.2.2), and there has been no screen-reader or Lighthouse pass yet.
- Mobile-first and responsive: checked at 375px and 1280px.
- Works in current Chrome, Safari and Firefox: only Chromium is tested so far.
