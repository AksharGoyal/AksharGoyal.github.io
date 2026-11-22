# Testing

- **Automated accessibility check (axe)** — a tool that loads a page and tests it against accessibility rules (contrast, labels, landmarks). It catches roughly a third of real problems; the rest need a person, a keyboard and a screen reader.
  **Seen in:** `npm run a11y` runs axe-core on the portfolio.

- **Headless browser** — a real browser engine running with no visible window, driven by code. It is how CI renders pages and takes screenshots on a machine with no screen.
  **Seen in:** Playwright's `chromium.launch()` in `a11y.mjs` and `og-image.mjs`.

- **Viewport and colour-scheme emulation** — telling a browser to pretend to be a 375px phone, or to report `prefers-color-scheme: dark`, so one test covers several situations.
  **Seen in:** the `viewports` and `schemes` lists in `a11y.mjs`.

- **Vacuous pass** — a test that succeeds because it checked nothing. An accessibility audit of a blank or 404 page reports zero violations. Guard against it by asserting the thing you test is really there.
  **Seen in:** the status and `h1` checks in `a11y.mjs`.

- **Negative test** — deliberately breaking the thing to prove the test fails. A test you have never seen fail is a test you cannot trust.
  **Seen in:** pointing the a11y server at the wrong folder to see the 404 guard fire.

- **Exit code** — the number a program returns when it ends: `0` means success, anything else means failure. CI and shell scripts read it; printed text alone fails nothing.
  **Seen in:** `process.exit(failed ? 1 : 0)` at the end of `a11y.mjs`; run `npm run a11y; echo $?`.

- **Flaky test** — one that sometimes passes and sometimes fails with no code change. Usual causes: timing, animation, shared state, the network. Fix the cause instead of re-running until green.
  **Seen in:** axe once read text mid fade-in and reported a false contrast failure; the fix was waiting for the animation.

- **Fail fast** — stop at the first broken precondition with a clear message, instead of producing confusing results later.
  **Seen in:** `a11y.mjs` throws `desktop light: page failed to load (404)` before running axe.

- **Test matrix** — running the same test across a grid of conditions (browser × screen size × colour scheme). The number of runs multiplies, so keep each axis to what could really differ.
  **Seen in:** `a11y.mjs` loops viewports × colour schemes; the cross-browser change adds a third axis, the browser.

- **Fixed sleep** — pausing for a set time (`waitForTimeout(500)`) instead of waiting for a condition. It is too slow when the page is ready early and too fast on a slow machine, which makes tests flaky. Prefer waiting for something observable, such as an element or a finished animation.
  **Seen in:** the 500 ms wait before axe runs in `a11y.mjs`.

- **Cartesian product** — every combination of items from several lists, so 2 viewports × 2 colour schemes gives 4 runs. A test matrix is a cartesian product written as data.
  **Seen in:** the viewport, colour-scheme and browser runs in `a11y.mjs`.
