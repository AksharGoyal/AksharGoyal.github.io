# Auth and web security

- **AuthN (authentication)** — who are you. **AuthZ (authorization)** — what you may do. Different problems, often conflated.
  **Seen in:** HTTP status codes — `401 Unauthorized` is actually authN failure; `403 Forbidden` is authZ failure. (401 is misnamed in the spec.)

- **Server session (stateful)** — server stores session state, client holds an opaque ID in a cookie. Instantly revocable; needs a shared store (Redis) to scale horizontally.
  **Seen in:** Django, Rails, PHP defaults. Cookie named `sessionid` / `_session_id` / `PHPSESSID`.

- **JWT (JSON Web Token)** — signed `header.payload.signature`, verified without a lookup. Stateless, but **not revocable before expiry**, and the payload is base64url-encoded, **not encrypted**.
  **Seen in:** paste one into jwt.io and read your own claims. Then realize anyone can.

- **Access token / refresh token** — short-lived credential for API calls (5–15 min) + long-lived revocable credential that mints new ones.
  **Seen in:** any OAuth response body: `{access_token, refresh_token, expires_in}`.

- **Cookie flags** — `HttpOnly` (no JS access), `Secure` (HTTPS only), `SameSite=Lax|Strict|None` (CSRF defense), `Path`, `Domain`.
  **Seen in:** DevTools → Application → Cookies. Columns for each flag. Check your bank's — they'll all be set.

- **Token storage trade-off** — HttpOnly cookie (XSS-safe, CSRF-exposed) vs `localStorage` (CSRF-safe, XSS-fatal) vs in-memory (safest, lost on refresh).
  **Seen in:** DevTools → Application → Local Storage. If you find a JWT sitting there, that app is one XSS from full compromise.

- **OAuth 2.0** — delegated **authorization** framework ("let this app act for me at that service"). Not a login protocol, despite universal misuse as one.
  **Seen in:** the GitHub screen listing "This app will be able to read your repositories." That list is OAuth **scopes**.

- **OIDC (OpenID Connect)** — identity layer on OAuth 2.0; adds the **ID token**. This is what "Sign in with Google" actually is.
  **Seen in:** the redirect URL during Google login — `response_type=code&scope=openid email profile`. `openid` in the scope means OIDC.

- **PKCE (Proof Key for Code Exchange)** — required for public clients (browser/mobile); stops an intercepted authorization code from being redeemed.
  **Seen in:** `code_challenge` and `code_challenge_method=S256` params in an auth redirect URL.

- **SAML** — older XML-based enterprise SSO protocol.
  **Seen in:** corporate logins that bounce you through Okta/Azure AD with a giant base64 blob POSTed between domains.

- **RBAC / ABAC / ReBAC** — authorization by role / by attributes and policy / by relationship graph.
  **Seen in:** RBAC → AWS IAM roles, GitHub's admin/write/read. ReBAC → Google Docs sharing (built on Zanzibar).

- **XSS (Cross-Site Scripting)** — injected JS running in your origin. Defeats every client-side mitigation, so it's the root vulnerability.
  **Seen in:** any place you build HTML with string concatenation and `innerHTML`. **Avoid this:** use `textContent`.

- **CSRF (Cross-Site Request Forgery)** — tricking a logged-in browser into sending an authenticated request the user didn't intend.
  **Seen in:** hidden `<input name="csrf_token">` in Django/Rails forms; the `SameSite=Lax` cookie default that killed most of this attack class.

- **IDOR (Insecure Direct Object Reference)** — reaching another user's resource by guessing its ID.
  **Seen in:** change the number in `/invoice/1042` to `1041`. If it loads, that's IDOR. (Only test this on your own apps.)

- **Client-side auth checks are UX, not security** — hiding a button is cosmetic; the server must enforce every rule.
  **Seen in:** DevTools → delete the `disabled` attribute or the `display:none` on an admin button. If the API then obeys you, the backend is broken.

- **Path traversal (CWE-22)** — input like `/../../etc/passwd` escapes the folder a server meant to expose. `normalize` alone doesn't stop it. Resolve the final path, then check it still starts with the allowed root.
  **Seen in:** the static server in `scripts/a11y.mjs` (`resolve`, then a `startsWith` guard returning 403).

- **Prefix confusion** — checking `path.startsWith("/repo")` also accepts `/repo-secrets`. Compare against the root plus a separator (`root + sep`) so only real children match.
  **Seen in:** `file.startsWith(root + sep)` in `a11y.mjs`.

- **Code scanning (SAST / CodeQL)** — static analysis that reads source without running it and flags dangerous data flows, such as user input reaching a file read. Results appear in the repo's Security tab. It reasons about possible flows, so you fix a finding or dismiss it with a reason.
  **Seen in:** the repo's Security → Code scanning page; alert `js/path-injection` led to the fix above.

- **Supply-chain attack** — compromising something you depend on (a package, an action, a tag) instead of your own code. Mitigations: pin versions or commit SHAs, keep dependencies few, review updates.
  **Seen in:** SHA-pinned `uses:` lines in `.github/workflows/`; Dependabot PRs.

- **SSRF (Server-Side Request Forgery)** — tricking your server into making a request for an attacker. The server sits inside a trusted network and can reach addresses the attacker cannot, such as `http://169.254.169.254/`, which serves cloud credentials. Defend by checking where a URL resolves, not just how it looks.
  **Seen in:** the OWASP SSRF page.

- **Open redirect** — a site that redirects to any user-supplied URL, letting attackers borrow your domain's trust for phishing. A link shortener is one by design, so it needs abuse controls: allow only `http` and `https`, limit length, and offer a way to report links.
  **Seen in:** the scheme check in shortlink-api.

- **Enumeration attack** — guessing predictable identifiers to read data you were not given, such as `/1`, `/2`, `/3`. Random, unguessable ids make this impractical; sequential ids make it trivial.
  **Seen in:** the choice of short-code strategy in shortlink-api.
