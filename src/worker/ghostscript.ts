import type { GhostscriptRuntime } from "@wasm-zoo/ghostscript";
import type { OptimizationLevel } from "./types";

const INPUT_PATH = "/input.pdf";
const OUTPUT_PATH = "/output.pdf";

const CONFIGS = {
  light: {
    pdfSettings: "/printer",
    downsample: false,
    colorResolution: 300,
    monoResolution: 1200,
    jpegQuality: 95,
  },
  medium: {
    pdfSettings: "/ebook",
    downsample: true,
    colorResolution: 150,
    monoResolution: 600,
    jpegQuality: 85,
  },
  heavy: {
    pdfSettings: "/screen",
    downsample: true,
    colorResolution: 96,
    monoResolution: 300,
    jpegQuality: 70,
  },
} satisfies Record<
  OptimizationLevel,
  {
    pdfSettings: string;
    downsample: boolean;
    colorResolution: number;
    monoResolution: number;
    jpegQuality: number;
  }
>;

export function buildGhostscriptArgs(level: OptimizationLevel): string[] {
  if (!Object.hasOwn(CONFIGS, level)) {
    throw new Error("Invalid PDF optimization level");
  }
  const config = CONFIGS[level];

  return [
    "-sDEVICE=pdfwrite",
    "-dCompatibilityLevel=1.4",
    "-dNOPAUSE",
    "-dQUIET",
    "-dBATCH",
    "-dSAFER",
    "-dPDFSTOPONERROR",
    "-dEmbedAllFonts=true",
    "-dSubsetFonts=true",
    "-dCompressFonts=true",
    "-dDetectDuplicateImages=true",
    "-dCompressPages=true",
    "-dAutoRotatePages=/None",
    `-dPDFSETTINGS=${config.pdfSettings}`,
    `-dDownsampleColorImages=${config.downsample}`,
    `-dColorImageResolution=${config.colorResolution}`,
    `-dDownsampleGrayImages=${config.downsample}`,
    `-dGrayImageResolution=${config.colorResolution}`,
    `-dDownsampleMonoImages=${config.downsample}`,
    `-dMonoImageResolution=${config.monoResolution}`,
    `-dJPEGQ=${config.jpegQuality}`,
    `-sOutputFile=${OUTPUT_PATH}`,
    INPUT_PATH,
  ];
}

export async function runGhostscript(
  runtime: GhostscriptRuntime,
  input: Uint8Array,
  level: OptimizationLevel,
): Promise<Uint8Array<ArrayBuffer>> {
  // The package creates and terminates one isolated worker for each command.
  const result = await runtime.exec(buildGhostscriptArgs(level), {
    files: [{ name: INPUT_PATH, data: input }],
    outputs: [OUTPUT_PATH],
    timeoutMs: 120_000,
  });

  if (result.exitCode !== 0) {
    throw new Error(`Ghostscript exited with code ${result.exitCode}`);
  }

  const output = result.files.find((file) => file.name === OUTPUT_PATH)?.data;
  if (!output || new TextDecoder().decode(output.subarray(0, 5)) !== "%PDF-") {
    throw new Error("Ghostscript did not produce a PDF");
  }
  return output;
}
