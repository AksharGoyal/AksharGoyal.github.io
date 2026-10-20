# Networking

- **RTT (Round-Trip Time)** — one request→response cycle. Latency, not bandwidth, dominates page load.
  **Seen in:** `ping google.com` in your terminal. ~20ms local, ~250ms intercontinental.

- **DNS lookup → TCP handshake → TLS handshake** — three round-trip stages before any HTTP byte moves.
  **Seen in:** DevTools Network → any request → Timing tab shows each stage broken out by ms.

- **Waterfall** — the cascading dependency chart of requests. HTML must parse before its CSS/JS/images are even discovered.
  **Seen in:** DevTools Network tab, the bar chart on the right. Load a heavy site and watch the staircase.

- **HTTP/1.1 vs HTTP/2 vs HTTP/3** — serial per connection (~6 per origin) vs multiplexed streams on one connection vs multiplexed over QUIC/UDP.
  **Seen in:** DevTools Network → right-click column headers → enable "Protocol". You'll see `h2`, `h3`, `http/1.1` per request.

- **Head-of-line blocking** — one stalled item blocks everything queued behind it. Solved at HTTP level by HTTP/2, at TCP level only by HTTP/3.
  **Seen in:** legacy HTTP/1.1 sites on bad wifi — images load strictly one batch at a time.

- **Domain sharding / sprite sheets** — dead HTTP/1.1 hacks working around the 6-connection limit. Now actively harmful (extra handshakes).
  **Seen in:** old sites with `static1.example.com`, `static2.example.com`. Historical curiosity.

- **`Cache-Control`** — `max-age` (seconds fresh), `immutable` (never revalidate), `no-cache` (cache but **always revalidate**), `no-store` (never store), `public`/`private`.
  **Seen in:** DevTools Network → any request → Response Headers. Compare a `.js` bundle (year-long max-age) to the HTML document (`no-cache`).

- **ETag / `304 Not Modified`** — content fingerprint enabling a conditional request that returns no body when unchanged.
  **Seen in:** Network tab, Status column showing `304`, Size column showing a few hundred bytes instead of the full file.

- **Cache busting** — content hash in the filename (`app.a3f9c2.js`) so assets cache forever yet deploy instantly.
  **Seen in:** view-source on any Vite/webpack production site; every asset name has a hash.

- **CDN / edge PoP (Point of Presence)** — distributed cache servers near users. Cuts RTT.
  **Seen in:** response headers like `cf-cache-status: HIT`, `x-vercel-cache: HIT`, `x-served-by: cache-lhr`.

- **Same-Origin Policy** — browsers block JS from reading cross-origin responses. Origin = scheme + host + port.
  **Seen in:** `https://a.com` vs `http://a.com` vs `https://a.com:8443` — all three are different origins.

- **CORS (Cross-Origin Resource Sharing)** — server opt-in to the above via `Access-Control-Allow-Origin`. Protects the **browser user**, not the server — `curl` ignores it entirely.
  **Seen in:** the console error every developer meets in week one: *"has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present."*

- **Preflight** — automatic `OPTIONS` request before non-simple cross-origin requests. Costs an RTT; cache with `Access-Control-Max-Age`.
  **Seen in:** Network tab — an `OPTIONS` row immediately above your `POST` row.

- **Brotli (`br`)** — text compression, ~15–20% smaller than gzip.
  **Seen in:** response header `content-encoding: br`.

- **CSP (Content Security Policy)** — header restricting what may load or execute. Primary XSS mitigation.
  **Seen in:** GitHub's response headers — a long `content-security-policy` value. Violations log to the console.

- **HSTS (`Strict-Transport-Security`)** — forces HTTPS on a domain, blocking downgrade attacks.
  **Seen in:** `chrome://net-internals/#hsts`. Most major sites are on the browser's preload list.

- **WebSocket vs SSE (Server-Sent Events) vs polling** — bidirectional persistent connection / one-way server→client stream / repeated requests.
  **Seen in:** DevTools Network → "WS" filter. Open Slack or Discord and watch frames stream live.
