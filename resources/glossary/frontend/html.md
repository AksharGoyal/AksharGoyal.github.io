# HTML

- **Quirks mode** — legacy rendering mode browsers fall back to when a page has no (or a malformed) `<!doctype html>`. Emulates 1990s browser bugs (different box model, table and font-size quirks). Standards mode is what you want.
  **Seen in:** DevTools console on a page without a doctype, or `document.compatMode` returns `"BackCompat"` (quirks) vs `"CSS1Compat"` (standards).
