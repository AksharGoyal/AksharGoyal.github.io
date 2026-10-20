# Dependencies and compliance

- **Dependabot** — GitHub's bot that raises alerts, and optionally opens pull requests, for vulnerable or outdated dependencies.
  **Seen in:** a repository's Security tab → Dependabot alerts.

- **CVE (Common Vulnerabilities and Exposures)** — a public identifier, such as `CVE-2021-44228`, for a specific known vulnerability. Scanners match your dependencies against CVE databases.
  **Seen in:** the nvd.nist.gov search page, and the advisory links in a Dependabot alert.

- **Container image scanning** — checking a built container image's operating-system packages and libraries for known CVEs before it ships. Trivy is a common open-source scanner. Teams often block releases on fixable critical findings and set deadlines for lower severities.
  **Seen in:** a CI job that runs `trivy image`, and the scan summary in GitHub Actions logs.

- **SOC 2** — an auditing framework in which an independent auditor reports on a service company's controls for security and related criteria such as availability and confidentiality. It is an auditor's report, not a certificate. Typical controls include access control, change management, vulnerability management and security training.
  **Seen in:** the "Security" or "Trust" page on a SaaS vendor's website.
