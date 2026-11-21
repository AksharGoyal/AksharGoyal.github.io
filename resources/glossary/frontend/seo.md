# SEO

- **Open Graph (OG) tags** — `<meta property="og:title|description|image">` controlling link previews.
  **Seen in:** paste any URL into Slack — the card it renders comes from these. View-source any article's `<head>`.

- **Canonical URL** — `<link rel="canonical">` naming the authoritative URL among duplicates.
  **Seen in:** e-commerce sites where `/shoes?color=red&sort=price` all canonicalize to `/shoes`.

- **JSON-LD structured data** — schema.org JSON in a `<script type="application/ld+json">`.
  **Seen in:** recipe sites (that's why Google shows star ratings and cook time). Test with Google's Rich Results Test.

- **Twitter/X card tags** — `<meta name="twitter:card" content="summary">` selects the X card style (`summary` or `summary_large_image`). `twitter:title`, `twitter:description` and `twitter:image` fall back to the Open Graph values when absent. Uses `name=`.
  **Seen in:** view-source on a GitHub repo page and search for `twitter:`.

- **Link-preview cache** — LinkedIn, Slack and others fetch your `og:*` tags once and cache them. Changing the title or image on your site changes nothing for an already-shared URL until you re-scrape it (LinkedIn Post Inspector) or the cache expires.
  **Seen in:** paste the site URL into LinkedIn Post Inspector and click Inspect.

- **Single source of truth / drift** — keep each fact in one place and generate copies from it. Two hand-edited copies drift apart over time.
  **Seen in:** `npm run og` reads the name, tagline and domain from `index.html` instead of keeping a second copy on the preview card.
