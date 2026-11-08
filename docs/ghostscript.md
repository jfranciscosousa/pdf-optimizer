# Ghostscript engine

## Distribution

PDF compression uses Ghostscript **10.08.0**, packaged as
`@wasm-zoo/ghostscript@0.7.2`. This replaces the unversioned vendored loader and
WASM binary. The old binary contains Ghostscript 9.26 resource paths; its exact
build source was not recorded.

Use the published package rather than maintaining a separate compiler fork.
`package.json` pins the package version exactly. `pnpm-lock.yaml` pins its registry
integrity. Vite emits the loader and WASM with content-hashed URLs on the app's
own origin. No CDN or server-side PDF processing is required.

The package starts a fresh classic Web Worker for each command and terminates it
on success, failure, or timeout. The app reuses the downloaded WASM bytes, not a
running Ghostscript instance. Commands use `-dSAFER`, `-dPDFSTOPONERROR`, fixed virtual filenames, and
a two-minute execution timeout. The app limits concurrent commands to two because
each instance starts with 128 MiB of memory. No SharedArrayBuffer is required.

The three compression profiles retain their resolution, downsampling, and JPEG
quality settings. Image codecs use each Ghostscript preset's defaults rather than
forcing JPEG for every image. This can change output sizes and image quality.
A small or already compressed PDF can become larger.

## Source and build pins

- [Published package and build source](https://github.com/ttomohisa/wasm-zoo/tree/b557dd168027b795bee72648c5596a751e059448)
- [Pinned Ghostscript build recipe](https://github.com/ttomohisa/wasm-zoo/tree/b557dd168027b795bee72648c5596a751e059448/builders/ghostscript)
- [Source archive with build recipe](https://github.com/ttomohisa/wasm-zoo/releases/download/ghostscript-v0.7.2/ghostscript-sources-10.08.0-zoo-0.7.2.tar.gz)
- [Official Ghostscript source archive](https://github.com/ArtifexSoftware/ghostpdl-downloads/releases/download/gs10080/ghostscript-10.08.0.tar.xz)

| Item                    | Pin                                                                |
| ----------------------- | ------------------------------------------------------------------ |
| Ghostscript             | 10.08.0                                                            |
| WASM Zoo builder        | 0.7.2, commit `b557dd168027b795bee72648c5596a751e059448`           |
| Emscripten              | 6.0.7, commit `4483d70a78098ed5d860dff2dc21f3025b2da2ee`           |
| Official source SHA-256 | `c20492bc8ebb96c87fa2e52a0926e1cda8cde95d66145e018ac713fed5da38cf` |
| Loader SHA-256          | `34855213c0cf34288c193868fea847de7fd419719d8f7343083d261bf82d94ba` |
| WASM SHA-256            | `13615a78029576ca8ebfebe1801a91441ee0485d944c89a8b16d409b649a214e` |

`scripts/ghostscript-assets.ts` checks the runtime files against the package's
manifest before serving or building. It also publishes the license notices,
manifest, build information, provenance metadata, and SBOM under
`/licenses/ghostscript/`. These files come from the installed package. They are
not generated into the source checkout.

The upstream manifest records a `gs10.08.0` source ref that was not exposed by
`git ls-remote` during this update. Use the official release archive and its
SHA-256 as the source identity, not that ref. The build recipe downloads and
checks that archive.

The registry signature and npm provenance attestation for version 0.7.2 were
verified with `npm audit signatures` in a separate temporary directory. This
verifies the publisher/build link, not the safety of all upstream code.

## Update procedure

1. Check the package release, Ghostscript release, source archive, licenses, and
   build changes. Confirm that the package contains the intended engine version.
2. Verify the registry signature and provenance in a temporary directory. Do not
   create an npm lockfile in this pnpm project.
3. Run `pnpm add --save-exact @wasm-zoo/ghostscript@<version>`. Keep the repository's
   minimum release age policy.
4. Update the engine assertion in `tests/ghostscript.test.mjs`, this document, and
   the version-specific source archive link on the license page.
5. Run install, tests, formatting, lint, typecheck, and build. Test the built app
   with text, scanned images, mixed page sizes, rotated pages, transparency,
   malformed input, multiple files, and all three compression levels.
6. Check output page geometry, readable content, fonts, image quality, and errors.
   Check that runtime and PDF requests stay on the local origin or use blob URLs.
7. Do not commit build output, generated PDF fixtures, or downloaded test results.

To rebuild the engine independently, check out the pinned upstream builder outside
this repository and follow its build instructions. It requires Docker Buildx,
Node, and its browser test prerequisites. The upstream command is
`bash builders/ghostscript/build.sh browser-full`.
A local source rebuild was not run here because Docker and Emscripten are not
installed. Do not claim byte-for-byte reproducibility without checking a rebuild.

## Local checks

```bash
pnpm install --frozen-lockfile
pnpm test
pnpm run format:check
pnpm lint
pnpm exec tsc --noEmit
pnpm build

# Generate synthetic fixtures outside the checkout.
pnpm exec node scripts/create-ghostscript-fixtures.mjs /tmp/pdf-optimizer-fixtures

# Start only the local Workers runtime for browser checks.
pnpm exec wrangler dev --local --config dist/server/wrangler.json --port 8791
```

With a preinstalled `agent-browser` and local Chromium, run the repeatable browser
checks against that local server:

```bash
pnpm run test:browser
# Or test an existing local Vite development server.
pnpm run test:browser http://127.0.0.1:3000
```

The browser script creates an isolated session, uses the upload and compression
controls, downloads results outside the checkout, checks PDF geometry/fonts/image
downsampling with pdf-lib, tests malformed-input recovery, and checks the Portuguese
license page. It closes its browser session. It does not start or stop the app server.
It accepts only loopback server URLs and installs no browser or test tools.

Use the `/optimize` controls to process the fixtures at each compression level.
Download the results and inspect them with an independent PDF parser/viewer.
`invalid.pdf` must show an error and must not offer a download. A new valid request
must still succeed after that failure.

Unit tests cover CLI arguments, timeout configuration, output validation, error
propagation, input URL cleanup, engine hashes, and license assets. They use a fake
runtime and do not execute WASM. Browser checks execute the real WASM engine.
Synthetic fixtures do not cover every PDF feature. Forms, signatures, PDF/A,
accessibility tags, encrypted files, unusual fonts, and very large PDFs need
separate regression coverage. Compression can rewrite or remove such features.

## Verification for this update

- Frozen pnpm installation, 12 unit tests, formatting, lint, typecheck, and build passed.
- The browser regression script passed against both Vite development mode and the
  built app in the local Cloudflare Workers runtime.
- Two PDFs ran concurrently at each compression level. Text and scan outputs parsed
  successfully and retained their page counts and effective page sizes, including
  a rotated page. Text outputs retained font resources. Medium and heavy scan
  outputs reduced image dimensions; light kept the original image dimensions.
- A malformed PDF showed an error without a download. A subsequent valid request
  succeeded. The test exposed Ghostscript's default repair-to-blank behavior;
  `-dPDFSTOPONERROR` now stops that case.
- The real browser engine reported version 10.08.0 through `--version`.
- The Portuguese license page and all five generated notice/metadata assets passed.
- npm verified one registry signature and one provenance attestation.
- Build warnings remain for a large client chunk and a CSS sourcemap. The old
  Ghostscript Node-module browser-externalization warnings no longer occur.

These checks do not establish complete visual fidelity or feature preservation.
No production deployment, push, or PR occurred.

## Licensing

Ghostscript is **AGPL-3.0-or-later**, not MIT. The wrapper has its own MIT notice;
linked components have additional notices. The license page links the bundled
notices and the matching source archive/build recipe. The project's existing
license text remains unchanged.

These notices do not establish that the complete application complies with the
AGPL. Before distribution or deployment, the project owner must review the
combined application's license and corresponding-source obligations. Do not
assume a Web Worker boundary removes those obligations. This issue already
applied to the previous Ghostscript binary.
