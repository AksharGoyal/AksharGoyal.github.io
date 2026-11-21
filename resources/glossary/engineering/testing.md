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
