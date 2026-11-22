# Releases and versioning

- **Git tag** — a permanent name for one commit, such as `v1.2.0`. A lightweight tag is just a pointer. An annotated tag (`git tag -a`) also stores the tagger, a date and a message, and is the right choice for releases. Tags don't move when new commits arrive.
  **Seen in:** the "Tags" page of any GitHub repository.

- **Semantic versioning (semver)** — version numbers shaped `MAJOR.MINOR.PATCH`. Bump PATCH for bug fixes, MINOR for new backward-compatible features, MAJOR for breaking changes. It lets users judge the risk of an upgrade from the number alone.
  **Seen in:** semver.org, and the version in any `package.json` or `pyproject.toml`.

- **Package version vs API version** — they are different things. The package version (`2.3.1`) names a build of the code. The API version (`/v1`) names a contract with clients. One package release can serve several API versions, and a MAJOR package bump usually means a new API version.
  **Seen in:** a service whose docs list both `/v1` and `/v2` endpoints.

- **GitHub Release** — a page built on a tag, with release notes and downloadable files (binaries, archives). A tag marks the commit, and the release is how users find and download it.
  **Seen in:** the "Releases" panel on the right of a repository page.

- **Changelog** — a human-written file listing what changed in each version, grouped as Added, Changed, Deprecated, Removed, Fixed and Security. It is written for users, so it is not a copy of `git log`.
  **Seen in:** a `CHANGELOG.md` following keepachangelog.com.

- **Pre-release / release candidate** — a version published for testing before the real one, such as `2.0.0-rc.1`. It sorts before `2.0.0` under semver, so tools don't pick it up as the stable version by default.
  **Seen in:** the "Pre-release" badge on a GitHub Release.

- **Release artifact** — a file produced by a build and attached to a release, such as a binary, a wheel or a Docker image. Users download the artifact, not the source.
  **Seen in:** the "Assets" list under a GitHub Release.

- **Checksum** — a short fingerprint of a file (SHA-256) published beside it. A user who computes the same fingerprint knows the download wasn't corrupted or swapped.
  **Seen in:** a `SHA256SUMS` file next to release downloads.

- **Deprecation policy** — a promise about how long an old feature or API version keeps working after you announce its removal. It gives users time to migrate instead of breaking them on upgrade.
  **Seen in:** the "Deprecated" section of a changelog, or a `Deprecation` HTTP header.

- **Release automation** — letting a workflow create the version bump, changelog, tag and release from commit messages (conventional commits) or on a tag push. It cuts manual mistakes. Do a release by hand first so you understand what the tool is doing.
  **Seen in:** tools such as release-please and semantic-release.

- **Cross-compilation** — building a program for a different operating system or CPU than the one you build on. A CI matrix builds macOS, Linux and Windows binaries so users don't need a compiler.
  **Seen in:** a GitHub Actions `matrix` with several `os` values.

- **Trusted publishing (OIDC)** — publishing a package to a registry such as PyPI from CI with a short-lived identity token instead of a stored password. There's no long-lived secret to leak.
  **Seen in:** the "Trusted publishers" setting on a PyPI project.
