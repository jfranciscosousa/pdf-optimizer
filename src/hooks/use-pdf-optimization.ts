import { useState, useCallback } from "react";
import { optimizePdf as optimizePdfWorker } from "../worker/pdf-optimizer-worker";

type OptimizationLevel = "light" | "medium" | "heavy";

interface UsePdfOptimizationReturn {
  isLoading: boolean;
  data: string | null;
  optimizedSize: number | null;
  optimizePdf: (file: File, level: OptimizationLevel) => void;
  error: string | null;
}

function loadPDFData(response: any, filename: string): Promise<any> {
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
    xhr.send();
  });
}

export function usePdfOptimization(): UsePdfOptimizationReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<string | null>(null);
  const [optimizedSize, setOptimizedSize] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const optimizePdf = useCallback(
    async (file: File, level: OptimizationLevel) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await optimizePdfWorker({
          psDataURL: window.URL.createObjectURL(file),
          level,
        });

        const { pdfURL, size } = await loadPDFData(
          response,
          `${file.name} optimized.pdf`,
        );
        console.log(pdfURL, size);
        setData(pdfURL);
        setOptimizedSize(size);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred during optimization",
        );
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  return {
    isLoading,
    data,
    optimizedSize,
    optimizePdf,
    error,
  };
}
