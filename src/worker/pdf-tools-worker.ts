import { PDFDocument } from "pdf-lib";
import { zipSync } from "fflate";
import type {
  PdfToolsWorkerRequest,
  PdfToolsWorkerResponse,
  SplitPage,
} from "./pdf-tools-types";

function toArrayBuffer(bytes: Uint8Array): ArrayBuffer {
  return bytes.slice().buffer;
}

function zipPages(pages: SplitPage[]): ArrayBuffer {
  const files: Record<string, Uint8Array> = {};
  for (const page of pages) {
    files[`page-${page.index + 1}.pdf`] = new Uint8Array(page.bytes);
  }
  return toArrayBuffer(zipSync(files));
}

interface MergeResult {
  bytes: ArrayBuffer;
}

async function mergePdfs(files: ArrayBuffer[]): Promise<MergeResult> {
  const target = await PDFDocument.create();

  for (const file of files) {
    const source = await PDFDocument.load(file);
    const pages = await target.copyPages(source, source.getPageIndices());
    pages.forEach((page) => target.addPage(page));
  }

  const bytes = await target.save();
  return { bytes: toArrayBuffer(bytes) };
}

async function splitPdf(file: ArrayBuffer): Promise<SplitPage[]> {
  const source = await PDFDocument.load(file);
  const pages: SplitPage[] = [];

  for (let index = 0; index < source.getPageCount(); index++) {
    const target = await PDFDocument.create();
    const [page] = await target.copyPages(source, [index]);
    target.addPage(page);
    const bytes = await target.save();
    pages.push({ index, bytes: toArrayBuffer(bytes) });
  }

  return pages;
}

self.addEventListener(
  "message",
  async (event: MessageEvent<PdfToolsWorkerRequest>) => {
    const request = event.data;

    try {
      if (request.type === "merge") {
        const { bytes } = await mergePdfs(request.files);
        const response: PdfToolsWorkerResponse = { type: "merge", bytes };
        self.postMessage(response, { transfer: [bytes] });
      } else {
        const pages = await splitPdf(request.file);
        const zip = zipPages(pages);
        const response: PdfToolsWorkerResponse = { type: "split", pages, zip };
        self.postMessage(response, {
          transfer: [...pages.map((page) => page.bytes), zip],
        });
      }
    } catch (error: any) {
      const response: PdfToolsWorkerResponse = {
        type: "error",
        message: error.message ?? "Unknown error",
      };
      self.postMessage(response);
    }
  },
);
