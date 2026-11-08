# GitHub Actions

- **Workflow** — a YAML file in `.github/workflows/` that GitHub runs automatically. One file, one automation (checks, deploy, release).
  **Seen in:** `.github/workflows/quality-checks.yml` and `deploy-pages.yml`.

- **Event / trigger (`on:`)** — what starts a workflow: `push`, `pull_request`, `schedule`, or `workflow_dispatch` (a manual "Run workflow" button). Filters like `branches:` and `paths:` narrow it.
  **Seen in:** the `on:` block at the top of each workflow.

- **Job** — a group of steps that runs on one fresh machine. Jobs run in parallel unless one declares `needs:`. Trade-off: splitting jobs speeds things up and isolates permissions, but each job starts clean (no shared files, so artifacts pass data between them).
  **Seen in:** `lint` and `accessibility` run in parallel; `deploy` waits for `build`.

- **Step** — one task inside a job, run in order. Either `uses:` (run a packaged action) or `run:` (run shell commands). A failing step stops the job.
  **Seen in:** every `- uses:` or `- run:` line.

- **Runner (`runs-on:`)** — the machine a job runs on. `ubuntu-latest` is a GitHub-hosted Linux VM, created for the job and thrown away after. It has no memory of earlier runs.
  **Seen in:** `runs-on: ubuntu-latest`.

- **Action (`uses:`)** — a reusable step written by someone else, referenced as `owner/repo@version`. Convenient, but it is third-party code running in your pipeline, so pin it.
  **Seen in:** `actions/checkout`, `actions/setup-node`, `actions/deploy-pages`.

- **`checkout`** — an action that copies your repo onto the runner. Without it the runner has an empty folder. `persist-credentials: false` stops it leaving the token in `.git/config` for later steps to read.
  **Seen in:** the first step of each job.

- **`GITHUB_TOKEN` and `permissions:`** — each run gets a short-lived token. `permissions:` sets what it may do. Default to `contents: read` for the whole workflow and raise it per job only where needed (least privilege), so a compromised step can do little damage.
  **Seen in:** the workflow-level `permissions:` plus the extra scopes on the `deploy` job.

- **OIDC (`id-token: write`)** — lets a job prove to an outside service who it is with a signed, short-lived token, so no long-lived secret is stored. GitHub Pages uses it to verify the deploy came from your repo.
  **Seen in:** the `deploy` job's permissions.

- **Artifact** — files saved from one job so another job (or you) can use them. Jobs don't share a disk, so this is how `build` hands the site to `deploy`.
  **Seen in:** `upload-pages-artifact` in `build`, consumed by `deploy-pages`.

- **`needs:`** — makes a job wait for another and run only if it succeeded. It builds the dependency order (a DAG) between jobs.
  **Seen in:** `needs: build` on the `deploy` job.

- **Environment** — a named deploy target (`github-pages`) that can carry its own rules, approvals and secrets. Its `url:` shows as a link on the run.
  **Seen in:** `environment:` on the `deploy` job.

- **`concurrency:`** — runs sharing a group name queue or cancel. `cancel-in-progress: true` suits checks (a new push makes the old run pointless). `false` suits deploys (don't kill one halfway).
  **Seen in:** `quality-checks-${{ github.ref }}` versus the `pages` group.

- **Expressions and contexts (`${{ ... }}`)** — values GitHub fills in at run time from contexts such as `github.ref` (the branch) or `steps.<id>.outputs.<name>` (a step's result). Never put untrusted text (a PR title, say) into a `run:` script this way, because it is a script-injection risk.
  **Seen in:** `${{ steps.deployment.outputs.page_url }}`.

- **Pinning to a commit SHA** — `uses: owner/repo@<40-char sha> # v7.0.1` instead of `@v7`. A tag can be moved to different code (a supply-chain attack); a SHA can't. Dependabot can bump the SHA for you.
  **Seen in:** every `uses:` line in the workflows.

- **Required status check** — a check a branch ruleset says must pass before a PR can merge. Without it, a red CI run doesn't stop a merge.
  **Seen in:** the ruleset on `main` ("Quality checks / lint" and "accessibility").
