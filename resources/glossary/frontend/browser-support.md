# Browser support

- **Baseline** — a label from the web platform project for features that work in all major current browsers ("widely available" after about 30 months). A feature marked "limited availability" is missing from some major browsers. Check it on MDN or webstatus.dev before relying on a feature.
  **Seen in:** the green or amber Baseline banner at the top of an MDN property page.

- **Progressive enhancement** — build the page so it works with basic HTML and CSS, then layer extra behaviour on top for browsers that support it. If an animation isn't supported, visitors get the static page instead of a broken one.
  **Seen in:** turning JavaScript off in DevTools (Command menu → "Disable JavaScript") and checking that a site still reads.

- **Feature queries (`@supports`)** — a CSS rule block that applies only when the browser supports a property or value, for example `@supports (animation-timeline: view())`. It lets you use new features safely, with the base styles as the fallback.
  **Seen in:** the DevTools Styles pane, where a rule inside `@supports` is shown only when it applies.

- **Stale cache and hard refresh** — browsers keep copies of CSS and JavaScript files, so an edit may not appear. A hard refresh (Cmd+Shift+R) or DevTools → Network → "Disable cache" reloads from the server. Partial caching, with a new stylesheet and an old one, can break pages that rely on variables defined in the stale file.
  **Seen in:** DevTools → Network → the "Size" column, which reads "(disk cache)" for cached files.

- **Browser engines (Blink, Gecko, WebKit)** — the part of a browser that turns HTML and CSS into pixels. Chrome and Edge use Blink, Firefox uses Gecko, Safari uses WebKit. Every iPhone browser must use WebKit, so "works in Chrome" says nothing about Safari.
  **Seen in:** Playwright's `chromium`, `firefox` and `webkit` browsers, and the cross-browser accessibility check.

- **Cross-browser testing** — running the same checks in more than one engine, because the same CSS or JavaScript can behave differently. Cover at least one engine from each family. Trade-off: more engines catch more bugs but make CI slower and flakier.
  **Seen in:** `scripts/a11y.mjs` running its audit in Chromium, Firefox and WebKit.

- **Playwright WebKit is not Safari** — Playwright runs the WebKit engine without Safari's interface or macOS-specific behaviour. It catches most engine differences, but a final check in real Safari is still worth doing for anything important.
  **Seen in:** the `webkit` entry of the browser list in `a11y.mjs`.

- **Graceful degradation of an enhancement** — a feature that only some browsers support is written so everyone still gets a usable page, just without the extra. The check that proves it is testing in a browser that lacks the feature.
  **Seen in:** scroll-driven animations in `css/site.css` sit inside `@supports (animation-timeline: view())`. Firefox gets the plain page.
