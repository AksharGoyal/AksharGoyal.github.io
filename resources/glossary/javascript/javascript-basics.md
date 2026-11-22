# JavaScript basics

- **ES modules (ESM) and `.mjs`** — the modern way to split JavaScript into files with `import` and `export`. A `.mjs` extension (or `"type": "module"` in `package.json`) tells Node to treat the file as a module instead of the older CommonJS `require()` style.
  **Seen in:** `scripts/a11y.mjs` starts with `import` lines; `package.json` has `"type": "module"`.

- **Promise and `async` / `await`** — some work takes time (reading a file, loading a page). A Promise is a placeholder for the eventual result. `await` pauses the function until it arrives, so slow code reads top to bottom. Forgetting `await` leaves you holding the placeholder instead of the value.
  **Seen in:** `await page.goto(...)` in `scripts/a11y.mjs`.

- **Top-level `await`** — using `await` outside any function, allowed only in ES modules. Handy for scripts: no wrapper function needed.
  **Seen in:** `const browser = await chromium.launch();` at the top level of `a11y.mjs`.

- **Destructuring** — pulling named values out of an object (or array) into variables. `const { port } = server.address();` means `const port = server.address().port;`. If the source is `null` or `undefined`, it throws a `TypeError`.
  **Seen in:** `const { port } = server.address();` and `const { violations } = ...` in `a11y.mjs`.

- **Rest and spread (`...`)** — in a pattern, `...rest` collects the remaining properties into a new object; in an expression, `...obj` spreads them out. Same three dots, opposite direction.
  **Seen in:** `for (const { name, ...size } of viewports)` collects `width` and `height` into `size`.

- **Optional chaining (`?.`)** — `a?.b` returns `undefined` instead of throwing when `a` is `null` or `undefined`. Use it when a value may be missing, not to hide bugs you should fix.
  **Seen in:** `response?.ok()` in `a11y.mjs`.

- **Template literal** — a string in backticks that can embed values with `${...}` and span several lines. Replaces fragile `"a" + b + "c"` concatenation.
  **Seen in:** `` `http://localhost:${port}/` `` in `a11y.mjs`.

- **`const` and the temporal dead zone** — `const` and `let` exist from the start of their block but can't be touched until the line that declares them runs. Using one earlier throws `ReferenceError: Cannot access 'x' before initialization`.
  **Seen in:** an early draft of `og-image.mjs` used `name` before its `const` line and crashed.

- **Variable shadowing** — an inner name hides an outer one with the same name. Legal, but confusing: you can read the wrong variable without noticing. Rename one.
  **Seen in:** a callback parameter named `resolve` hiding the imported `resolve` (renamed to `ready`).

- **`try` / `catch` / `finally`** — `catch` handles an error; `finally` runs whether or not one happened. Use `finally` for cleanup (closing a browser or server) that must always run.
  **Seen in:** the `finally` block in `a11y.mjs` closes each browser even if a guard throws.

- **Regular expression (regex)** — a pattern for matching text. `/\s+/g` means "one or more whitespace characters, everywhere", which collapses indentation and newlines into single spaces.
  **Seen in:** `.replace(/\s+/g, " ")` in `og-image.mjs`.

- **`process.exit()` vs `process.exitCode`** — `process.exit(1)` stops Node immediately, even if output is still being written. Setting `process.exitCode = 1` lets Node finish pending work and then exit with that code. Prefer `exitCode` when everything is already cleaned up.
  **Seen in:** the last line of `a11y.mjs`.

- **`flatMap`** — `map` followed by flattening one level. Use it when each item turns into several items and you want one flat list, not a list of lists.
  **Seen in:** building every viewport and colour-scheme pair for `a11y.mjs`.
