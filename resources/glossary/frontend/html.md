# HTML

- **Quirks mode** — legacy rendering mode browsers fall back to when a page has no (or a malformed) `<!doctype html>`. Emulates 1990s browser bugs (different box model, table and font-size quirks). Standards mode is what you want.
  **Seen in:** DevTools console on a page without a doctype, or `document.compatMode` returns `"BackCompat"` (quirks) vs `"CSS1Compat"` (standards).

- **`rel="noopener"` and reverse tabnabbing** — a page opened with `target="_blank"` can reach back to the opener through `window.opener` and redirect it to a fake page. `rel="noopener"` removes that link, and `noreferrer` also hides the referring URL. Modern browsers imply `noopener` for `target="_blank"`, but writing it is harmless and covers older ones. `rel` takes a space-separated list, for example `rel="noopener me"`.
  **Seen in:** external links in the DevTools Elements panel on most large sites.
