import { useState } from "react";
import { optimizePdf as optimizePdfWorker } from "../worker/pdf-optimizer-worker";
import pLimit from "p-limit";

export type OptimizationLevel = "light" | "medium" | "heavy";

interface FileOptimizationResult {
  file: File;
  originalSize: number;
  optimizedUrl: string | null;
  optimizedSize: number | null;
  error: string | null;
}

interface UsePdfOptimizationReturn {
  fileResults: FileOptimizationResult[];
  optimizeFiles: (files: File[], level: OptimizationLevel) => void;
  downloadFile: (index: number) => void;
  clearResult: (index: number) => void;
  clearAllResults: () => void;
  isLoading: boolean;
}

function loadPDFData(response: any): Promise<any> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", response);
    xhr.responseType = "arraybuffer";
    xhr.onload = function () {
      window.URL.revokeObjectURL(response);
      const blob = new Blob([xhr.response], { type: "application/pdf" });
      const pdfURL = window.URL.createObjectURL(blob);
      const size = xhr.response.byteLength;
      resolve({ pdfURL, size });
    };
    xhr.onerror = function () {
      reject();
    };
    xhr.send();
  });
}

async function optimizeFile(
  file: File,
  level: OptimizationLevel,
): Promise<FileOptimizationResult> {
  try {
    const response = await optimizePdfWorker({
      psDataURL: window.URL.createObjectURL(file),
      level,
    });

    const { pdfURL, size } = await loadPDFData(response);

    return {
      file,
      originalSize: file.size,
      optimizedUrl: pdfURL,
      optimizedSize: size,
      error: null,
    };
  } catch (error: any) {
    return {
      file,
      originalSize: file.size,
      error: error.message ?? "Unknown error",
      optimizedSize: null,
      optimizedUrl: null,
    };
  }
}

const limit = pLimit(4);

export function usePdfOptimization(): UsePdfOptimizationReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [fileResults, setFileResults] = useState<FileOptimizationResult[]>([]);

  async function optimizeFiles(files: File[], level: string) {
    setIsLoading(true);

    const tasks = files.map((file) =>
      limit(() => optimizeFile(file, level as OptimizationLevel)),
    );
    const results = await Promise.all(tasks);

    setFileResults(results);
    setIsLoading(false);
  }

  function downloadFile(index: number) {
    setFileResults((prev) => {
      const result = prev[index];
      if (result?.optimizedUrl) {
        const link = document.createElement("a");
        link.href = result.optimizedUrl;
        link.download = `optimized_${result.file.name}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
      return prev;
    });
  }

  function clearResult(index: number) {
    setFileResults((prev) => prev.filter((_, i) => i !== index));
  }

  function clearAllResults() {
    setFileResults([]);
  }

  return {
    fileResults,
    optimizeFiles,
    downloadFile,
    clearResult,
    clearAllResults,
    isLoading,
  };
}
