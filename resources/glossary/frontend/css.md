# CSS

- **Design tokens** — design decisions (colours, spacing, font sizes) stored as named values instead of repeated literals. In CSS they are implemented as custom properties, usually in one file such as `tokens.css`, so a redesign means editing values in one place.
  **Seen in:** GitHub's Primer, Material and Tailwind all publish their tokens. View the `:root` rule in DevTools on any of their sites.

- **Custom properties (CSS variables)** — `--name: value;` declared on a selector and read with `var(--name)`. They inherit down the tree and can be overridden per scope, per media query, or per component.
  **Seen in:** DevTools → Elements → `html` → Styles: look at the `:root` block, or toggle `prefers-color-scheme` and watch the values swap.

- **`rem` vs `em` vs `px`** — `px` is a fixed size. `rem` is a multiple of the root (`<html>`) font size, which defaults to the user's browser setting (normally 16px). `em` is a multiple of the element's parent font size, so nested values compound. Prefer `rem` for font sizes and spacing so text follows the user's size preference.
  **Seen in:** Chrome → Settings → Appearance → Font size. Change it and watch a `rem` site scale while a `px` site does not.

- **`ch` unit** — a length equal to the width of the "0" glyph in the element's font. `max-width: 65ch` keeps a text column at roughly 65 characters per line, a comfortable reading width, whatever the font or size.
  **Seen in:** the narrow text column on MDN or GitHub README pages. Resize the window and watch the line length stay put.

- **Logical properties (`padding-block`, `margin-inline`)** — spacing properties named by text flow instead of screen direction. `block` is the direction lines stack (top and bottom in English), `inline` is the direction text runs (left and right in English). In right-to-left or vertical writing modes they flip automatically. `padding-block: 1rem` sets both block edges; `padding-inline` sets both inline edges.
  **Seen in:** DevTools → Elements → Computed. Set `direction: rtl` on `<html>` and watch `margin-inline-start` move to the other side.
