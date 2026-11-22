# API design

- **Idempotency** — doing an operation once or many times leaves the system in the same state. `PUT` and `DELETE` are idempotent by definition of HTTP. `POST` is not, so a retried "create payment" can charge twice. Networks drop replies, so clients retry, so servers must expect repeats.
  **Seen in:** the HTTP method semantics in the MDN HTTP reference.

- **Idempotency key** — a unique value the client sends (often an `Idempotency-Key` header) so the server can recognise a retry. The server stores the first result under that key and replays it instead of doing the work again.
  **Seen in:** the Stripe API documentation on idempotent requests.

- **API versioning** — a way to change an API without breaking existing clients. Common choices are in the path (`/v1/users`), in a header, or in a query parameter. Path versions are easy to see and cache, but they tie the version to the URL. Header versions keep URLs stable but are easy to forget.
  **Seen in:** public APIs such as GitHub (`X-GitHub-Api-Version` header) and Stripe (dated versions).

- **Breaking change** — an edit that makes an existing, correct client fail: removing or renaming a field, changing a type, or making an optional field required. Adding an optional field is usually safe.
  **Seen in:** the changelog of any public API.

- **Rate limiting** — capping how many requests a client may make in a time window, to protect the service from overload and abuse. A rejected request returns `429 Too Many Requests`, often with a `Retry-After` header.
  **Seen in:** the `X-RateLimit-*` response headers on the GitHub API.

- **Pagination** — returning a long list in pages. Offset pagination (`?page=3`) is simple but slow on big tables and shifts when rows are added. Cursor pagination (`?after=abc`) stays stable and fast, but you can't jump to page 50.
  **Seen in:** `gh api` calls that return a `Link` header.

- **Optimistic locking** — let everyone read freely, then reject a write if the row changed since it was read, usually by comparing a version number. It avoids holding locks, and the loser retries. Pessimistic locking blocks others up front instead.
  **Seen in:** an `ETag` plus `If-Match` request header.

- **Repository pattern** — hide storage behind an interface such as `save(order)` and `find(id)`, so business code doesn't know whether it talks to Postgres, SQLite or a dictionary. It makes testing easy, but adds a layer that small apps may not need.
  **Seen in:** a class that wraps all SQL for one entity.

- **Strategy pattern** — put interchangeable algorithms behind one interface and choose one at run time, for example several ways to compute a shipping fee.
  **Seen in:** passing a function (the strategy) as an argument to a sort or retry helper.

- **Resource-oriented design (REST)** — URLs name things (nouns) and HTTP methods are the verbs: `POST /links` creates, `GET /links/{code}` reads one, `GET /links` lists, `DELETE /links/{code}` removes. Collection and item URLs are different resources. Verb URLs such as `/createLink` are RPC style, which suits actions that are not create-read-update-delete.
  **Seen in:** the GitHub API, `GET /repos/{owner}/{repo}/issues`.
