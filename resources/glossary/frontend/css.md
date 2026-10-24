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

- **Cascade and specificity** — the rules for choosing which CSS declaration wins when several target one element: importance, then specificity (an ID beats a class, attribute or pseudo-class, which beats an element), then source order, where the later rule wins a tie. Keep selectors low in specificity so overrides stay predictable.
  **Seen in:** DevTools → Elements → Styles. Overridden declarations appear struck through, with the winning rule above them.

- **Custom property inheritance** — custom properties inherit down the tree like `color` does. If a dark-mode block omits one, the element keeps the value from the outer scope instead of falling back to a browser default, so every theme token needs an override.
  **Seen in:** DevTools → Computed. Toggle `prefers-color-scheme` and watch which variables change.

- **Fluid type with `clamp()`** — `clamp(min, preferred, max)` returns the preferred value limited to a range. With a viewport unit in the preferred value (`clamp(1rem, 0.95rem + 0.25vw, 1.125rem)`), text scales smoothly between screen sizes with no media queries.
  **Seen in:** DevTools → Computed → `font-size` while you resize the window.

- **`box-sizing: border-box`** — makes an element's `width` and `height` include its padding and border, so adding padding doesn't make it wider. Most resets apply it to every element.
  **Seen in:** DevTools → Computed → the box-model diagram.

- **Flexbox vs Grid** — flexbox lays items out along one axis (a row or a column) and suits navs and button rows. Grid lays out rows and columns together and suits page and card layouts. `grid-template-areas` names regions so items can be placed by name.
  **Seen in:** DevTools → Layout tab, which can overlay flex and grid lines on a page.

- **Scroll-driven animations** — CSS animations whose progress follows scrolling instead of time: `animation-timeline: scroll()` tracks a scroll container, `view()` tracks an element crossing the viewport. They need no JavaScript, but support is limited, so wrap them in `@supports`.
  **Seen in:** reading-progress bars and sections that fade in on scroll. MDN lists the current browser support.

- **Registered custom properties (`@property`)** — declares a custom property with a type (`syntax`), an inheritance rule and an initial value. A typed property can be animated smoothly, such as a percentage or colour, where an unregistered one flips at the halfway point.
  **Seen in:** DevTools → Styles → `:root`, where a registered property shows its typed value.

- **`color-mix()`** — computes a colour from two others, for example `color-mix(in srgb, red, blue 30%)`. Combined with a custom property it gives a colour that changes smoothly between two tokens.
  **Seen in:** DevTools colour picker → hover a computed `color-mix` value.

- **Stacking context and `isolation: isolate`** — a stacking context is a group of elements painted together, so a `z-index` inside it can't escape outside. `isolation: isolate` creates one without other side effects, which keeps a `z-index: -1` child behind its parent's text but above the parent's surroundings.
  **Seen in:** DevTools → Layers panel, or the 3D view in Chrome's Rendering tools.

- **`steps()` timing function** — makes an animation jump between values in discrete steps instead of easing. `steps(1)` holds each keyframe's value until the next keyframe, which gives glitchy, snapping motion.
  **Seen in:** DevTools → Animations panel while an animation with `steps()` plays.

- **Hard `text-shadow`** — a `text-shadow` with zero blur (`2px 1px 0 colour`) draws a solid, offset copy of the text. Two of them in contrasting colours give a chromatic-aberration look without extra markup.
  **Seen in:** DevTools → Styles → toggle a heading's `text-shadow` on and off.
