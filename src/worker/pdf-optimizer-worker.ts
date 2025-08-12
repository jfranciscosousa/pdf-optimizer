import { PdfOptimizationRequest } from "./types";

/**
 * Optimizes a PDF using WebAssembly Ghostscript worker
 * @param request - The optimization request containing file data and optimization level
 * @returns Promise that resolves to the optimized PDF data URL
 */
export async function optimizePdf(
  request: PdfOptimizationRequest,
): Promise<string> {
  const worker = new Worker(new URL("./bg-worker.js", import.meta.url), {
    type: "module",
  });

  return new Promise((resolve, reject) => {
    // Set up error handling
    worker.onerror = (error) => {
      worker.terminate();
      reject(new Error(`Worker error: ${error.message}`));
    };

    // Set up success handling
    const handleMessage = (event: MessageEvent) => {
      try {
        const result = event.data;
        if (typeof result === "string") {
          resolve(result);
        } else {
          reject(new Error("Invalid response from worker"));
        }
      } catch (error) {
        reject(new Error(`Failed to process worker response: ${error}`));
      } finally {
        cleanup();
      }
    };

    // Clean up worker and listeners
    const cleanup = () => {
      worker.removeEventListener("message", handleMessage);
      worker.removeEventListener("error", worker.onerror!);
      // Terminate worker after a short delay to ensure message processing
      setTimeout(() => worker.terminate(), 0);
    };

    // Set up message listener
    worker.addEventListener("message", handleMessage);

    // Send the optimization request
    worker.postMessage({
      data: request,
      target: "wasm",
    });
  });
}
