import type { GhostscriptRuntime } from "@wasm-zoo/ghostscript";
import { runGhostscript } from "./ghostscript.ts";
import type { PdfOptimizationRequest } from "./types";

let runtimePromise: Promise<GhostscriptRuntime> | undefined;

function getRuntime(): Promise<GhostscriptRuntime> {
  // The package needs window. Keep it out of the server module graph at runtime.
  runtimePromise ??= import("@wasm-zoo/ghostscript")
    .then(({ load }) => load())
    .catch((error) => {
      runtimePromise = undefined;
      throw error;
    });
  return runtimePromise;
}

export async function optimizePdf({
  psDataURL,
  level,
}: PdfOptimizationRequest): Promise<string> {
  try {
    const response = await fetch(psDataURL);
    if (!response.ok) throw new Error("Failed to read the input PDF");
    const input = new Uint8Array(await response.arrayBuffer());
    const output = await runGhostscript(await getRuntime(), input, level);
    return URL.createObjectURL(new Blob([output], { type: "application/pdf" }));
  } finally {
    URL.revokeObjectURL(psDataURL);
  }
}
