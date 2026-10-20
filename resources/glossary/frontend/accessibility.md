# Accessibility (a11y)

- **Semantic HTML** — use elements for their meaning (`<nav>`, `<main>`, `<button>`, `<label>`). Free keyboard support, roles, focus behavior.
  **Seen in:** GOV.UK — the reference implementation. View-source is almost pure semantic HTML.

- **ARIA (Accessible Rich Internet Applications)** — W3C attributes exposing role, state, and name to assistive tech when HTML can't. Changes the **accessibility tree only — never behavior**.
  **Seen in:** DevTools → Elements → Accessibility pane. Inspect any dropdown on GitHub.

- **Accessibility tree** — the parallel tree browsers expose to screen readers, derived from DOM + ARIA.
  **Seen in:** Chrome DevTools → Elements → Accessibility → "Full-page accessibility tree" toggle.

- **First rule of ARIA** — don't use ARIA if a native element does the job.
  **Seen in:** the WAI-ARIA Authoring Practices Guide (APG), rule #1. Counterexample in the wild: `<div role="button">` on sites with no keyboard support.

- **`aria-label` / `aria-labelledby` / `aria-describedby`** — accessible name inline / by element reference / longer description.
  **Seen in:** icon-only buttons — `<button aria-label="Close">×</button>` in every modal on the web.

- **`aria-expanded` / `aria-current` / `aria-hidden`** — state attributes: disclosure open?, current nav item?, hide from assistive tech.
  **Seen in:** GitHub's repo dropdown toggles `aria-expanded` on click. Inspect it.

- **`aria-live` / `role="status"`** — a region screen readers announce when it updates.
  **Seen in:** "3 items added to cart" toasts; form validation summaries. How you'd expose `<canvas>` game state to non-visual users.

- **Focus management** — deliberately moving keyboard focus on UI change (into a modal on open, back to the trigger on close).
  **Seen in:** open a GitHub modal, hit Esc — focus returns to the button you came from. That's deliberate code.

- **Focus trap** — keeping Tab focus inside an open dialog until it closes.
  **Seen in:** any well-built modal. Test: open one, hold Tab, see if focus escapes to the page behind.

- **`:focus-visible`** — style focus rings for keyboard users only, not mouse clicks.
  **Seen in:** modern CSS resets. Anti-pattern to hunt for: `*{outline:none}` in old stylesheets.

- **Contrast ratio** — WCAG AA needs 4.5:1 for body text, 3:1 for large text and UI components.
  **Seen in:** DevTools → inspect a text node → click the color swatch → contrast ratio with a pass/fail check. **This is the tool you're about to build.**

- **WCAG (Web Content Accessibility Guidelines)** — the standard. Levels A / AA / AAA. AA is the legal/practical bar.
  **Seen in:** procurement docs, VPATs, EU/US accessibility lawsuits (Domino's v. Robles).

- **`prefers-reduced-motion`** — OS-level user setting requesting less animation. Respect it (vestibular disorders).
  **Seen in:** macOS System Settings → Accessibility → Display → Reduce Motion. Then reload a parallax site that honors it.

- **Ghost focus** — bug where `aria-hidden="true"` sits on a still-focusable element: screen reader loses it, keyboard still lands there.
  **Seen in:** badly-built carousels hiding offscreen slides without also removing them from tab order.

- **Landmark regions** — semantic elements (`<header>`, `<nav>`, `<main>`, `<footer>`) that screen readers expose as jump targets. One `<main>` per page; use real elements before reaching for `role=` attributes.
  **Seen in:** VoiceOver rotor → Landmarks (Cmd+Ctrl+U on macOS). Also the "Skip to content" link on GitHub and gov.uk.

- **`aria-current`** — attribute marking which item in a set is the current one, e.g. `aria-current="page"` on the nav link for the page you are on. Screen readers announce "current page"; CSS can style it with `[aria-current="page"]`. Other values: `step`, `location`, `date`, `time`, `true`.
  **Seen in:** DevTools → Elements on GitHub's repo tabs. The active tab carries `aria-current="page"`.
