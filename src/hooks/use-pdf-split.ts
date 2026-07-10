import { useState } from "react";
import { splitPdf } from "../worker/pdf-tools";
import { downloadBlobUrl } from "../lib/download";

interface SplitResult {
  name: string;
  url: string;
  size: number;
}

interface UsePdfSplitReturn {
  file: File | null;
  results: SplitResult[];
  zipUrl: string | null;
  error: string | null;
  isLoading: boolean;
  setFile: (file: File | null) => void;
  splitFile: () => Promise<void>;
  downloadResult: (index: number) => void;
  downloadZip: () => void;
  clearAll: () => void;
}

export function usePdfSplit(): UsePdfSplitReturn {
  const [file, setFile] = useState<File | null>(null);
  const [results, setResults] = useState<SplitResult[]>([]);
  const [zipUrl, setZipUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function splitFile() {
    if (!file) return;

    setIsLoading(true);
    setError(null);
    try {
      const { pages, zip } = await splitPdf(file);
      const pageResults = pages.map((page) => {
        const blob = new Blob([page.bytes], { type: "application/pdf" });
        return {
          name: `page-${page.index + 1}.pdf`,
          url: URL.createObjectURL(blob),
          size: page.bytes.byteLength,
        };
      });
      const zipBlob = new Blob([zip], { type: "application/zip" });
      setResults(pageResults);
      setZipUrl(URL.createObjectURL(zipBlob));
    } catch (err: any) {
      setError(err.message ?? "Unknown error");
      setResults([]);
      setZipUrl(null);
    } finally {
      setIsLoading(false);
    }
  }

  function downloadResult(index: number) {
    const result = results[index];
    if (result) {
      downloadBlobUrl(result.url, result.name);
    }
  }

  function downloadZip() {
    if (zipUrl) {
      const baseName = file?.name.replace(/\.pdf$/i, "") ?? "split";
      downloadBlobUrl(zipUrl, `${baseName}-pages.zip`);
    }
  }

  function clearAll() {
    setFile(null);
    setResults([]);
    setZipUrl(null);
    setError(null);
  }

  return {
    file,
    results,
    zipUrl,
    error,
    isLoading,
    setFile,
    splitFile,
    downloadResult,
    downloadZip,
    clearAll,
  };
}
