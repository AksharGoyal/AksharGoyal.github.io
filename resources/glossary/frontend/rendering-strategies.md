# Rendering strategies

- **CSR (Client-Side Rendering)** — server sends near-empty HTML; JS builds the DOM in the browser.
  **Seen in:** any Create-React-App site. View-source shows `<div id="root"></div>` and nothing else. Try it on an older Jira or Figma page.

- **SSR (Server-Side Rendering)** — server renders full HTML per request, client hydrates it.
  **Seen in:** Reddit, Amazon product pages. View-source shows the actual price/title text in the HTML, not an empty div.

- **SSG (Static Site Generation)** — HTML prerendered at build time, served from a CDN.
  **Seen in:** most docs sites — React docs, Astro docs, Tailwind docs. Also this project's eventual portfolio.

- **ISR (Incremental Static Regeneration)** — SSG that regenerates individual pages on a timer/webhook instead of a full rebuild.
  **Seen in:** Next.js `revalidate: 60` on a blog or e-commerce listing.

- **Islands Architecture** — static HTML by default, hydrate only isolated interactive regions. Non-interactive page ships ~0 JS.
  **Seen in:** Astro's `<Counter client:visible />`. Also Eleventy + `is-land`, and Next.js App Router's `"use client"` boundary as an approximation.

- **Hydration** — attaching JS handlers/state to server-rendered HTML to make it interactive. SSR does **not** reduce JS shipped.
  **Seen in:** that moment a Next.js page renders instantly but buttons do nothing for ~1s. That gap is pre-hydration.

- **Rendering strategy is per-route, not per-site** — choose SSG/SSR/CSR per page based on where that page's data lives.
  **Seen in:** Next.js — marketing pages static, `/dashboard` dynamic, in one app.

- **Jekyll** — Ruby-based static site generator (SSG). Turns Markdown and Liquid templates into plain HTML at build time. Built into GitHub Pages, so a repo with Markdown files can publish with no setup. Add an empty `.nojekyll` file to turn it off and serve files exactly as written.
  **Seen in:** a `<user>.github.io` repo with only a `README.md` serves it as the home page. Repo → Actions → "pages build and deployment".
