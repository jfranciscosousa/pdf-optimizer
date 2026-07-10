import {
  PdfToolsWorkerRequest,
  PdfToolsWorkerResponse,
  SplitPage,
} from "./pdf-tools-types";

function runWorker(
  request: PdfToolsWorkerRequest,
  transfer: ArrayBuffer[],
): Promise<PdfToolsWorkerResponse> {
  const worker = new Worker(new URL("./pdf-tools-worker.ts", import.meta.url), {
    type: "module",
  });

  return new Promise((resolve, reject) => {
    worker.onerror = (error) => {
      worker.terminate();
      reject(new Error(`Worker error: ${error.message}`));
    };

    worker.onmessage = (event: MessageEvent<PdfToolsWorkerResponse>) => {
      worker.terminate();
      resolve(event.data);
    };

    worker.postMessage(request, transfer);
  });
}

export async function mergePdfs(files: File[]): Promise<ArrayBuffer> {
  const buffers = await Promise.all(files.map((file) => file.arrayBuffer()));
  const response = await runWorker({ type: "merge", files: buffers }, buffers);

  if (response.type === "error") {
    throw new Error(response.message);
  }

  if (response.type !== "merge") {
    throw new Error("Invalid response from worker");
  }

  return response.bytes;
}

export interface SplitOutcome {
  pages: SplitPage[];
  zip: ArrayBuffer;
}

export async function splitPdf(file: File): Promise<SplitOutcome> {
  const buffer = await file.arrayBuffer();
  const response = await runWorker({ type: "split", file: buffer }, [buffer]);

  if (response.type === "error") {
    throw new Error(response.message);
  }

  if (response.type !== "split") {
    throw new Error("Invalid response from worker");
  }

  return { pages: response.pages, zip: response.zip };
}
