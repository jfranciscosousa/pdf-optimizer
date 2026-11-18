# Maintenance update — 2026-11-18

Started from `origin/master` at `eb267e8`.

## Runtime and CI

- Node 26.13.0 → 26.13.1 and pnpm 12.18.0 → 12.21.0. Updated the local and CI pins together.
- Cloudflare compatibility date 2026-11-08 → 2026-11-10, matching the installed Workerd release. The built Worker passed local checks. The README names Cloudflare Workers; production hosting settings were not verified.
- Checked the pinned GitHub Actions against their latest stable tags. Checkout 7.0.1, setup-node 7.1.0, and pnpm/action-setup 6.1.1 already match.

## Direct dependency updates

| Package                            | Old     | New     |
| ---------------------------------- | ------- | ------- |
| `@tailwindcss/vite`, `tailwindcss` | 4.3.4   | 4.3.5   |
| `@tanstack/react-router-devtools`  | 1.167.2 | 1.167.3 |
| `@tanstack/react-start`            | 1.169.4 | 1.169.5 |
| `lucide-react`                     | 1.67.0  | 1.72.0  |
| `react-dropzone`                   | 20.1.4  | 20.2.0  |
| `@cloudflare/vite-plugin`          | 1.67.0  | 1.69.1  |
| `@oxlint/plugins`, `oxlint`        | 1.91.0  | 1.93.0  |
| `@vitejs/plugin-react`             | 6.2.1   | 6.3.0   |
| `oxfmt`                            | 0.76.0  | 0.78.0  |
| `typescript-language-server`       | 6.0.3   | 6.1.0   |
| `wrangler`                         | 4.157.0 | 4.161.0 |

Refreshed transitive dependencies. Removed the unused Babel compiler option and
dependency: React plugin v6 does not read that option. Removed public hoisting
for `@tanstack/react-start-server`; a fresh frozen install and build work without it.

## Release holds and prereleases

Checked on 2026-11-18. Keep the five-day minimum release age. These latest
releases were not old enough. Recheck when they pass the age cutoff.

| Package                     | Selected | Latest stable |
| --------------------------- | -------- | ------------- |
| `@cloudflare/vite-plugin`   | 1.69.1   | 1.70.0        |
| `@oxlint/plugins`, `oxlint` | 1.93.0   | 1.94.0        |
| `lint-staged`               | 17.6.0   | 17.6.1        |
| `lucide-react`              | 1.72.0   | 1.75.0        |
| `oxfmt`                     | 0.78.0   | 0.79.0        |
| `oxlint-tailwindcss`        | 1.17.1   | 1.17.2        |
| `wrangler`                  | 4.161.0  | 4.164.0       |

The exact Ghostscript package pin, 0.7.2 (engine 10.08.0), still matches the
latest stable releases. Keep the pin and source notices together. See
[Ghostscript maintenance](docs/ghostscript.md).

The following prereleases come from upstream packages. No project override
selects them. Checked on 2026-11-18; recheck when their parents update.

- The stable Cloudflare tools pin Miniflare 5.20261110.0-beta and
  5.20261110.2-beta, and unenv 2.0.0-rc.24. Newer prereleases exist, but these
  tools require exact versions. There is no stable release on either required major.
- Miniflare pins youch 4.1.0-beta.10. Stable 4.1.1 exists, but Miniflare does not accept it.
- Babel core requires gensync 1.0.0-beta.2. No stable 1.x exists.
- Rolldown's optional WASI binding pins `@emnapi/core` and `@emnapi/runtime`
  at 2.0.0-beta.2. A newer beta exists, but the binding requires exact pins.
  There is no stable 2.x.

## Audit

The full pnpm audit reported one high finding before and after the update.
The production-only audit also reported it. GitHub Dependabot lists the same
[open picomatch alert](https://github.com/jfranciscosousa/pdf-optimizer/security/dependabot/75).

- [picomatch 4.0.7 ReDoS](https://github.com/advisories/GHSA-fc5q-39xc-vjpf):
  transitive; no patched version exists. The production dependency graph
  reaches it through the TanStack Start and Tailwind Vite build plugins.
  Development tooling also uses it. The built client and Worker JavaScript
  and source maps did not contain picomatch, so it is not reachable in that
  production bundle. Recheck when a patch is available. No suppression or override.

## Verification

Frozen install, standalone typecheck, lint, format check, 12 unit tests, and
production build passed. The local Worker returned HTTP 200 for all six routes.
The Ghostscript browser suite passed, including three compression profiles,
malformed-input recovery, and license assets. No database is configured.
The build still warns about a client chunk larger than 500 kB.

GitHub-hosted CI, production checks, and PDF merge/split browser operations
were not run. No push, deployment, or production write occurred.
