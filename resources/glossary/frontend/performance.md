# Performance

- **Core Web Vitals** — Google's user-centric performance metrics (LCP, INP, CLS). Also a search ranking signal.
  **Seen in:** Chrome DevTools → Lighthouse tab. Run it on your own site; run it on cnn.com for a horror show.

- **LCP (Largest Contentful Paint)** — time until the largest above-fold element paints. Target < 2.5s.
  **Seen in:** Lighthouse report; DevTools Performance panel marks the LCP element with a badge.

- **INP (Interaction to Next Paint)** — input → next visual update. Target < 200ms. Replaced **FID (First Input Delay)** in March 2024.
  **Seen in:** DevTools Performance panel, "Interactions" track. Type fast in a heavy React form and watch it spike.

- **CLS (Cumulative Layout Shift)** — how much visible content jumps during load. Target < 0.1.
  **Seen in:** any news site where you go to click a link and an ad loads above it, shoving the page down. DevTools Performance → "Layout Shifts" track.

- **TTFB (Time To First Byte)** — request → first response byte.
  **Seen in:** DevTools Network tab → click any request → Timing → "Waiting for server response."

- **Code splitting** — break the bundle so each route/island loads only its own JS.
  **Seen in:** vanilla via `const mod = await import('./game.js')`; frameworks via `React.lazy()`. Watch Network tab load a new `.js` chunk when you navigate.

- **Layout thrash** — animating layout-affecting properties (`top`, `width`, `height`, `left`) forces repeated layout + paint.
  **Seen in:** DevTools Performance recording — long purple "Layout" bars every frame. Fix: animate `transform`/`opacity` (compositor-only, no layout).

- **Long task** — main-thread work > 50ms. Blocks input; wrecks INP.
  **Seen in:** DevTools Performance, tasks flagged with a red triangle. Offload to a **Web Worker** or chunk it with `requestAnimationFrame`.

- **Web Worker** — background JS thread with no DOM access; communicates via `postMessage`.
  **Seen in:** Figma, Google Sheets, any in-browser code editor doing syntax parsing off-thread.

- **`requestAnimationFrame` (rAF)** — schedules a callback right before the next repaint (~60fps).
  **Seen in:** every browser game loop and smooth scroll animation.

- **`font-display: swap`** — show fallback text immediately, swap in the web font when loaded. Avoids **FOIT** (Flash of Invisible Text), can cause **FOUT** (Flash of Unstyled Text) and CLS if metrics differ.
  **Seen in:** Google Fonts embed URLs — they append `&display=swap` by default now.

- **`srcset` / `sizes`** — let the browser pick the right image for the viewport and device pixel ratio.
  **Seen in:** view-source on any Shopify or WordPress site; `<img srcset="a-400.jpg 400w, a-800.jpg 800w">`.

- **`preconnect` / `dns-prefetch` / `preload`** — resource hints. Warm a connection early / resolve DNS early / fetch a critical asset early.
  **Seen in:** `<link rel="preconnect" href="https://fonts.gstatic.com">` in nearly every site's `<head>`.
