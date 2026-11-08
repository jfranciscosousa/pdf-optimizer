# Maintenance update — 2026-11-08

Updated on `fs/update-maintenance` from `origin/master` at `d306181`.

## Runtime and service versions

| Item                          | Old        | New        |
| ----------------------------- | ---------- | ---------- |
| Node                          | 24.21.0    | 26.13.0    |
| pnpm                          | 12.8.1     | 12.18.0    |
| Cloudflare compatibility date | 2025-09-02 | 2026-11-08 |
| actions/checkout              | 6.1.0      | 7.0.1      |
| actions/setup-node            | 6.5.0      | 7.1.0      |
| pnpm/action-setup             | 6.0.10     | 6.1.1      |

Updated `mise.toml`, `.node-version`, `package.json`, and CI pins together.
GitHub Actions remain pinned to commit hashes.

Checked the [checkout migration notes](https://github.com/actions/checkout/blob/main/README.md)
and [setup-node migration notes](https://github.com/actions/setup-node/blob/main/README.md).
The CI workflow uses neither restricted checkout triggers nor registry authentication.

## Direct package updates

| Package                    | Old      | New      |
| -------------------------- | -------- | -------- |
| @base-ui/react             | 1.8.0    | 1.9.0    |
| @tailwindcss/vite          | 4.3.3    | 4.3.4    |
| @tanstack/react-router     | 1.170.40 | 1.170.46 |
| @tanstack/react-start      | 1.168.59 | 1.169.4  |
| lucide-react               | 1.48.0   | 1.67.0   |
| react, react-dom           | 19.3.0   | 19.3.1   |
| react-dropzone             | 20.1.2   | 20.1.4   |
| tailwindcss                | 4.3.3    | 4.3.4    |
| @cloudflare/vite-plugin    | 1.61.0   | 1.67.0   |
| @oxlint/plugins            | 1.85.0   | 1.91.0   |
| @types/node                | 26.6.3   | 26.6.6   |
| @vitejs/plugin-react       | 6.1.1    | 6.2.1    |
| node-gyp                   | 13.0.2   | 13.1.0   |
| oxfmt                      | 0.70.0   | 0.76.0   |
| oxlint                     | 1.85.0   | 1.91.0   |
| oxlint-tailwindcss         | 1.14.0   | 1.17.1   |
| typescript-language-server | 6.0.1    | 6.0.3    |
| vite                       | 8.3.1    | 8.3.5    |
| wrangler                   | 4.142.0  | 4.157.0  |

Other direct packages already use their latest eligible stable versions.
Regenerated `pnpm-lock.yaml` to refresh transitive dependencies.

## Held versions

The existing `minimumReleaseAge: 7200` policy requires releases to be at least
five days old. The following latest releases fail frozen installation under
that policy. Kept the policy unchanged and selected the newest eligible versions.
No package needs a hold because of a breaking API change.

| Package                         | Selected | Latest stable |
| ------------------------------- | -------- | ------------- |
| @tailwindcss/vite, tailwindcss  | 4.3.4    | 4.3.5         |
| @tanstack/react-router-devtools | 1.167.2  | 1.167.3       |
| @tanstack/react-start           | 1.169.4  | 1.169.5       |
| lucide-react                    | 1.67.0   | 1.70.0        |
| react-dropzone                  | 20.1.4   | 20.2.0        |
| @oxlint/plugins, oxlint         | 1.91.0   | 1.92.0        |
| oxfmt                           | 0.76.0   | 0.77.0        |
| vite                            | 8.3.5    | 8.3.6         |
| wrangler                        | 4.157.0  | 4.158.0       |

The vendored Ghostscript files remain unchanged:
`src/worker/gs-worker.js` and `public/static/gs-worker.wasm`.
The WASM binary contains Ghostscript 9.26 resource paths. The repository has no
build recipe or reliable release pin for this binary. Replacing it requires a
separate WASM rebuild and PDF regression tests. Decide whether to start that work.

The inventory also covered CI, editor configuration, agent skill metadata, and
tracked files for other runtime manifests, Dockerfiles, and lockfiles. No Docker,
Elixir, Erlang, or Bun runtime configuration exists. Agent skill snapshots are not
application dependencies and remain unchanged.

## Compatibility fixes

- Use canonical Tailwind data variants and dark variant order.
- Exclude the generated TanStack route file from formatting and linting, as its
  generated header requires. Do not commit regenerated route output.

## Verification

Ran with Node 26.13.0 and pnpm 12.18.0:

- `pnpm install --frozen-lockfile`: passed, including supply-chain policies.
- `pnpm exec tsc --noEmit`: passed.
- `pnpm run lint`: passed without diagnostics.
- `pnpm run format:check`: passed.
- `pnpm run build`: passed for client and Cloudflare server bundles.
- `pnpm outdated --format json`: returned no age-eligible updates.
- Local-only Wrangler HTTP checks: all six pages and the WASM asset returned 200.
- Tests: no test script or test suite exists. No browser PDF processing test ran.

A parallel lint/build run hit a Tailwind design-system timeout. The sequential
lint run passed. Build warnings remain for Ghostscript browser-externalized Node
modules, a client chunk above 500 kB, and a CSS sourcemap.
GitHub-hosted CI was not run locally.

No deployment, push, PR, secret change, or environment-file change occurred.
