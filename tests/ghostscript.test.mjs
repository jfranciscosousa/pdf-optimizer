import assert from "node:assert/strict";
import { test } from "node:test";
import { optimizePdf } from "../src/worker/pdf-optimizer-worker.ts";
import { ghostscriptNotices } from "../scripts/ghostscript-assets.ts";
import {
  buildGhostscriptArgs,
  runGhostscript,
} from "../src/worker/ghostscript.ts";

test("releases the input blob URL when reading fails", async (context) => {
  const revoked = [];
  context.mock.method(globalThis, "fetch", async () => ({ ok: false }));
  context.mock.method(URL, "revokeObjectURL", (url) => revoked.push(url));
  await assert.rejects(
    optimizePdf({ psDataURL: "blob:input", level: "medium" }),
    /Failed to read the input PDF/,
  );
  assert.deepEqual(revoked, ["blob:input"]);
});

test("verifies engine hashes and includes redistributable license notices", () => {
  const files = ghostscriptNotices();
  const notices = files.get("/licenses/ghostscript/NOTICES.txt");
  assert.match(notices, /GNU AFFERO GENERAL PUBLIC LICENSE/);
  assert.match(notices, /LICENSE.wasm-zoo.txt/);
  assert.match(notices, /THIRD-PARTY-LICENSES/);
  const manifest = JSON.parse(files.get("/licenses/ghostscript/manifest.json"));
  assert.equal(manifest.upstream.version, "10.08.0");
  assert.equal(manifest.runtime.threads, false);
  assert.equal(manifest.runtime.sharedArrayBuffer, false);
});

for (const [level, preset, resolution, downsample] of [
  ["light", "/printer", 300, false],
  ["medium", "/ebook", 150, true],
  ["heavy", "/screen", 96, true],
]) {
  test(`${level} keeps its compression profile and sandbox flags`, () => {
    const args = buildGhostscriptArgs(level);
    for (const flag of [
      "-dSAFER",
      "-dPDFSTOPONERROR",
      "-dBATCH",
      "-dNOPAUSE",
      "-sDEVICE=pdfwrite",
      "-dAutoRotatePages=/None",
      `-dPDFSETTINGS=${preset}`,
      `-dColorImageResolution=${resolution}`,
      `-dGrayImageResolution=${resolution}`,
      `-dDownsampleColorImages=${downsample}`,
    ]) {
      assert.ok(args.includes(flag), flag);
    }
    assert.deepEqual(args.slice(-2), [
      "-sOutputFile=/output.pdf",
      "/input.pdf",
    ]);
    assert.ok(!args.includes("-dNOSAFER"));
  });
}

test("rejects an unknown compression profile", () => {
  for (const level of ["unknown", "__proto__", "constructor"]) {
    assert.throws(() => buildGhostscriptArgs(level), /Invalid/);
  }
});

test("passes input bytes to an isolated command with a finite timeout", async () => {
  const input = new TextEncoder().encode("%PDF-1.7\ninput");
  const output = new TextEncoder().encode("%PDF-1.4\noutput");
  const runtime = {
    async exec(args, options) {
      assert.deepEqual(args, buildGhostscriptArgs("medium"));
      assert.deepEqual(options.files, [{ name: "/input.pdf", data: input }]);
      assert.deepEqual(options.outputs, ["/output.pdf"]);
      assert.equal(options.timeoutMs, 120_000);
      return { exitCode: 0, files: [{ name: "/output.pdf", data: output }] };
    },
  };
  assert.equal(await runGhostscript(runtime, input, "medium"), output);
});

test("rejects a nonzero exit even if partial output exists", async () => {
  const runtime = {
    async exec() {
      return {
        exitCode: 1,
        files: [
          { name: "/output.pdf", data: new TextEncoder().encode("%PDF-") },
        ],
      };
    },
  };
  await assert.rejects(
    runGhostscript(runtime, new Uint8Array(), "light"),
    /code 1/,
  );
});

for (const [name, files] of [
  ["missing", []],
  ["empty", [{ name: "/output.pdf", data: new Uint8Array() }]],
  [
    "invalid",
    [{ name: "/output.pdf", data: new TextEncoder().encode("error") }],
  ],
]) {
  test(`rejects ${name} output instead of returning a download URL`, async () => {
    const runtime = {
      async exec() {
        return { exitCode: 0, files };
      },
    };
    await assert.rejects(
      runGhostscript(runtime, new Uint8Array(), "heavy"),
      /did not produce a PDF/,
    );
  });
}

test("propagates worker startup, execution, and timeout errors", async () => {
  for (const message of [
    "WASM fetch failed",
    "Worker failed",
    "CLI timed out",
  ]) {
    const error = new Error(message);
    const runtime = {
      async exec() {
        throw error;
      },
    };
    await assert.rejects(
      runGhostscript(runtime, new Uint8Array(), "medium"),
      error,
    );
  }
});
