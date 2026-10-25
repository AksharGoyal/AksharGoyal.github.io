# Akshar Goyal

Personal portfolio: who I am, the data engineering work I have done, and the projects I am building.

- **Status:** In progress
- **Site:** https://akshargoyal.github.io (not yet published)

## Approach

Plain HTML and CSS, with no JavaScript, framework or build step, so the page is
fast, accessible and easy to read. Tooling only checks the code; nothing is
compiled.

## Run locally

Serve the folder with any static server, for example:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000. Opening `index.html` directly also works, since
all paths are relative.

## Structure

```
index.html      Single page: intro, about, experience, projects, education, skills
css/            Design tokens and styles
assets/         Favicon and self-hosted font
scripts/        Accessibility check (axe-core through Playwright)
.github/        Quality-checks workflow and Dependabot config
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

## Resources

`resources/` holds a glossary of software and data engineering terms, grouped by
topic (frontend, networking, security, data engineering and engineering
practices), and a list of frontend learning resources. Start at
[`resources/glossary/README.md`](resources/glossary/README.md).

## Standards

Goals, to be checked off as they are verified:

- Accessible (WCAG 2.2 AA)
- Mobile-first and responsive
- Works in current Chrome, Safari and Firefox
