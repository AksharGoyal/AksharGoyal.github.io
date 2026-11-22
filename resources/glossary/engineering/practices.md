# Engineering practices

- **YAGNI ("you aren't gonna need it")** — don't build or define something until a real need appears. Unused tokens, options and abstractions are dead weight to maintain.
  **Seen in:** search a stylesheet for a declared variable that nothing uses.

- **DRY (don't repeat yourself)** — each piece of knowledge lives in one place. Repeating a value or a block invites the copies to drift apart. Apply it once the second copy appears, not before.
  **Seen in:** a site header copied into every HTML page. Templates and layouts exist to remove that duplication.

- **Separation of concerns** — each file, module or function has one reason to change. In CSS, tokens (design decisions) live apart from rules (how the page uses them).
  **Seen in:** a `tokens.css` file next to a `site.css` file.

- **Dead code** — code that is commented out or can never run. Version control already stores old versions, so delete it instead of keeping it as a comment.
  **Seen in:** `git log -p` shows a deleted file's full history.

- **Conventional commits** — a commit message format, `type(scope): description`, with types such as `feat`, `fix`, `docs` and `chore`. It makes history scannable and can drive automatic changelogs.
  **Seen in:** `git log --oneline` on most open-source projects.

- **Git hooks** — scripts git runs at fixed points, such as `pre-commit` and `commit-msg`. They live in `.git/hooks`, which is not cloned, so tools such as husky install them for each clone. Anyone can skip them with `--no-verify`, so they give fast feedback and CI is the real gate.
  **Seen in:** `ls .git/hooks` in any repo shows the `.sample` files.

- **Shift left** — catch problems earlier in the pipeline (editor, then commit, then CI, then production) because they are cheaper to fix there.
  **Seen in:** a formatter on save, a linter on commit and tests on every pull request.

- **Single responsibility principle (SRP)** — a function or module should do one job and have one reason to change. A function that starts a server, launches a browser, checks the page and prints results has four reasons to change.
  **Seen in:** `a11y.mjs` can split "audit one page" into its own function.

- **Cognitive complexity / arrow code** — the more nested loops and `if`s a block has, the more it pushes right and the harder it is to hold in your head. Cure it with early returns (guard clauses) and by extracting a named function for the inner block.
  **Seen in:** the viewport × scheme loop nested inside the browser loop in `a11y.mjs`.

- **Resource leak** — acquiring something (a browser process, a server, a file handle) and never releasing it. Pair every acquire with a release that always runs, such as `finally`.
  **Seen in:** `browser.close()` in the `finally` of `a11y.mjs`.
