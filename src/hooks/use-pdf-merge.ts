import { useState } from "react";
import { mergePdfs } from "../worker/pdf-tools";
import { downloadBlobUrl } from "../lib/download";

interface MergeResult {
  url: string | null;
  size: number | null;
  error: string | null;
}

interface UsePdfMergeReturn {
  files: File[];
  result: MergeResult | null;
  isLoading: boolean;
  addFiles: (files: File[]) => void;
  removeFile: (index: number) => void;
  moveFile: (index: number, direction: "up" | "down") => void;
  mergeFiles: () => Promise<void>;
  downloadResult: () => void;
  clearAll: () => void;
}

export function usePdfMerge(): UsePdfMergeReturn {
  const [files, setFiles] = useState<File[]>([]);
  const [result, setResult] = useState<MergeResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  function addFiles(newFiles: File[]) {
    setFiles((prev) => [...prev, ...newFiles]);
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  function moveFile(index: number, direction: "up" | "down") {
    setFiles((prev) => {
      const target = direction === "up" ? index - 1 : index + 1;
      if (target < 0 || target >= prev.length) return prev;

      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  async function mergeFiles() {
    setIsLoading(true);
    try {
      const bytes = await mergePdfs(files);
      const blob = new Blob([bytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setResult({ url, size: bytes.byteLength, error: null });
    } catch (error: any) {
      setResult({
        url: null,
        size: null,
        error: error.message ?? "Unknown error",
      });
    } finally {
      setIsLoading(false);
    }
  }

  function downloadResult() {
    if (result?.url) {
      downloadBlobUrl(result.url, "merged.pdf");
    }
  }

  function clearAll() {
    setFiles([]);
    setResult(null);
  }

  return {
    files,
    result,
    isLoading,
    addFiles,
    removeFile,
    moveFile,
    mergeFiles,
    downloadResult,
    clearAll,
  };
}
