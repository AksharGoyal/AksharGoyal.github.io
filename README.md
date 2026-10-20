# Akshar Goyal

Personal portfolio: who I am, the data engineering work I have done, and the projects I am building.

- **Status:** In progress
- **Site:** https://AksharGoyal.github.io (not yet published)

## Approach

Plain HTML and CSS with a little JavaScript. No framework and no build step, so
the pages are fast, accessible and easy to read. Tooling such as linting,
tests and CI will be added as the site grows.

## Run locally

Serve the folder with any static server, for example:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000. Opening `index.html` directly also works,
but root-relative links such as `/work/` will not resolve over `file://`.

## Structure

```
index.html      Home
work/           Case studies
projects/       Projects (building now)
contact/        Contact links
css/            Styles
assets/         Images and the resume PDF
```

Only `index.html` exists so far. The rest is planned.

## Standards

Goals, to be checked off as they are verified:

- Accessible (WCAG 2.2 AA)
- Mobile-first and responsive
- Works in current Chrome, Safari and Firefox
