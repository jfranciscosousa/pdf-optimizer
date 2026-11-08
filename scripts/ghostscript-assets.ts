import { createHash } from "node:crypto";
import { readFileSync, readdirSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import type { Plugin } from "vite";

const require = createRequire(import.meta.url);
const root = dirname(require.resolve("@wasm-zoo/ghostscript/manifest.json"));
const base = "/licenses/ghostscript/";

export function ghostscriptNotices(): Map<string, string> {
  const read = (name: string) => readFileSync(join(root, name), "utf8");
  const manifest = JSON.parse(read("manifest.json"));
  for (const name of ["gs-core.js", "gs-core.wasm"]) {
    const digest = createHash("sha256")
      .update(readFileSync(join(root, name)))
      .digest("hex");
    if (digest !== manifest.files[name].sha256) {
      throw new Error(`Ghostscript asset checksum mismatch: ${name}`);
    }
  }

  const notices = [
    "LICENSE",
    "LICENSE.wasm-zoo.txt",
    "LICENSE-Ghostscript.txt",
    ...readdirSync(join(root, "THIRD-PARTY-LICENSES"))
      .sort()
      .map((name) => `THIRD-PARTY-LICENSES/${name}`),
  ];
  return new Map([
    [
      `${base}NOTICES.txt`,
      notices
        .map((name) => `\n===== ${name} =====\n\n${read(name)}`)
        .join("\n"),
    ],
    ...[
      "manifest.json",
      "BUILDINFO.txt",
      "provenance.json",
      "sbom.cdx.json",
    ].map((name): [string, string] => [`${base}${name}`, read(name)]),
  ]);
}

export function ghostscriptAssets(): Plugin {
  const files = ghostscriptNotices();
  return {
    name: "ghostscript-license-assets",
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        const path = new URL(request.url ?? "/", "http://localhost").pathname;
        const content = files.get(path);
        if (
          content === undefined ||
          !["GET", "HEAD"].includes(request.method ?? "")
        ) {
          next();
          return;
        }
        response.setHeader(
          "Content-Type",
          path.endsWith(".json")
            ? "application/json"
            : "text/plain; charset=utf-8",
        );
        response.end(request.method === "HEAD" ? undefined : content);
      });
    },
    generateBundle() {
      if (this.environment.name !== "client") return;
      for (const [path, source] of files) {
        this.emitFile({ type: "asset", fileName: path.slice(1), source });
      }
    },
  };
}
