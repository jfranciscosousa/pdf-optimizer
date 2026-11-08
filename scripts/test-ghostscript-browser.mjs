import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, statSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { PDFDict, PDFDocument, PDFName } from "pdf-lib";

const origin = new URL(process.argv[2] ?? "http://127.0.0.1:8791");
if (!["127.0.0.1", "localhost", "[::1]"].includes(origin.hostname)) {
  throw new Error("Browser regression checks must use a local server");
}
const response = await fetch(new URL("/optimize", origin));
assert.ok(response.ok, "Start the local app before running browser checks");
const directory = mkdtempSync(join(tmpdir(), "pdf-optimizer-regression-"));
execFileSync(
  process.execPath,
  ["scripts/create-ghostscript-fixtures.mjs", directory],
  { stdio: "inherit" },
);
const session = execFileSync(
  "agent-browser",
  [
    "session",
    "id",
    "--scope",
    "worktree",
    "--prefix",
    `ghostscript-test-${Date.now()}`,
  ],
  { encoding: "utf8" },
).trim();

function browser(...args) {
  const result = JSON.parse(
    execFileSync(
      "agent-browser",
      ["--session", session, "--headed", "false", "--json", ...args],
      { encoding: "utf8", timeout: 180_000, maxBuffer: 4 * 1024 * 1024 },
    ),
  );
  assert.ok(result.success, result.error);
  return result.data;
}
function snapshot() {
  return browser("snapshot", "-i");
}
function button(name) {
  const refs = snapshot().refs;
  const entry = Object.entries(refs).find(
    ([, value]) =>
      value.role === "button" &&
      (typeof name === "string" ? value.name === name : name.test(value.name)),
  );
  assert.ok(entry, `Missing button: ${name}`);
  return `@${entry[0]}`;
}
function startOptimization() {
  browser("click", button(/^Optimize/));
}
function waitForDownloads(count) {
  browser(
    "wait",
    "--fn",
    `Array.from(document.querySelectorAll('button')).some(b => /^Optimize/.test(b.textContent) && !b.disabled) && Array.from(document.querySelectorAll('button')).filter(b => b.textContent.trim() === 'Download').length === ${count}`,
  );
}
function geometry(page) {
  let { width, height } = page.getSize();
  if (page.getRotation().angle % 180 !== 0) [width, height] = [height, width];
  return { width, height };
}
async function verifyPdf(name, level, path) {
  const input = await PDFDocument.load(
    readFileSync(join(directory, `${name}.pdf`)),
  );
  const output = await PDFDocument.load(readFileSync(path));
  assert.deepEqual(
    output.getPages().map(geometry),
    input.getPages().map(geometry),
  );
  const images = [];
  for (const page of output.getPages()) {
    const resources = page.node.Resources();
    if (name === "text-layout") {
      const fonts = resources.lookupMaybe(PDFName.of("Font"), PDFDict);
      assert.ok(fonts && fonts.keys().length > 0, "Missing fonts");
    }
    const xobjects = resources.lookupMaybe(PDFName.of("XObject"), PDFDict);
    for (const [, ref] of xobjects?.entries() ?? []) {
      const object = output.context.lookup(ref);
      if (object.dict?.get(PDFName.of("Subtype")) === PDFName.of("Image")) {
        images.push(Number(String(object.dict.get(PDFName.of("Width")))));
      }
    }
  }
  if (name === "scan") {
    assert.ok(images.length > 0, "Missing scan image");
    if (level === "light")
      assert.ok(images.includes(1600), "Light must not downsample");
    else
      assert.ok(
        images.every((width) => width < 1600),
        "Expected downsampling",
      );
    assert.ok(statSync(path).size < statSync(join(directory, "scan.pdf")).size);
  }
  console.log(
    `${name}/${level}: valid PDF, geometry preserved, ${statSync(path).size} bytes`,
  );
}

try {
  browser("set", "viewport", "1440", "900");
  browser("open", new URL("/optimize", origin).href);
  // This page has no polling. Let the initial dev modules finish before upload.
  browser("wait", "--load", "networkidle");
  browser(
    "upload",
    "input[type=file]",
    join(directory, "text-layout.pdf"),
    join(directory, "scan.pdf"),
  );
  for (const level of ["light", "medium", "heavy"]) {
    const tree = snapshot().snapshot;
    const label = tree.match(
      new RegExp(
        `LabelText "${level[0].toUpperCase() + level.slice(1)} compression[^\\n]+?\\[ref=(e\\d+)\\]`,
      ),
    );
    assert.ok(label, `Missing compression control: ${level}`);
    browser("click", `@${label[1]}`);
    startOptimization();
    waitForDownloads(2);
    const downloads = [
      ...snapshot().snapshot.matchAll(/button "Download" \[ref=(e\d+)\]/g),
    ];
    for (const [index, name] of ["text-layout", "scan"].entries()) {
      const path = join(directory, `${name}-${level}.pdf`);
      browser("download", `@${downloads[index][1]}`, path);
      await verifyPdf(name, level, path);
    }
    browser("click", button("Clear all results"));
  }

  browser("click", button("Clear all"));
  browser("upload", "input[type=file]", join(directory, "invalid.pdf"));
  startOptimization();
  browser("wait", "--text", "Ghostscript CLI exited with code");
  assert.ok(
    !/button "Download"/.test(snapshot().snapshot),
    "Malformed input must not produce a download",
  );
  console.log("Malformed PDF: error shown, no download");

  browser("click", button("Clear all"));
  browser("upload", "input[type=file]", join(directory, "text-layout.pdf"));
  startOptimization();
  waitForDownloads(1);
  console.log("Valid PDF after failure: recovered");

  browser("click", button("Language"));
  const languageTree = snapshot();
  const portuguese = Object.entries(languageTree.refs).find(([, value]) =>
    /Portugu/.test(value.name),
  );
  assert.ok(portuguese, "Missing Portuguese locale");
  browser("click", `@${portuguese[0]}`);
  browser("wait", "--text", "Optimizar");
  browser("open", new URL("/license", origin).href);
  browser("wait", "--text", "Motor de PDF Ghostscript 10.08.0");
  console.log("Portuguese license page: engine version and notices shown");

  for (const file of [
    "NOTICES.txt",
    "manifest.json",
    "BUILDINFO.txt",
    "provenance.json",
    "sbom.cdx.json",
  ]) {
    const result = await fetch(
      new URL(`/licenses/ghostscript/${file}`, origin),
    );
    assert.ok(result.ok, `Missing license asset: ${file}`);
    assert.ok((await result.text()).length > 0);
  }
  assert.deepEqual(browser("errors").errors, [], "Unexpected browser errors");
  console.log(`Browser checks passed. Synthetic PDFs: ${directory}`);
} finally {
  browser("close");
}
