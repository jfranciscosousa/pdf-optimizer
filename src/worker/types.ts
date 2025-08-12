export type OptimizationLevel = "light" | "medium" | "heavy";

export interface PdfOptimizationRequest {
  psDataURL: string;
  level: OptimizationLevel;
}

export interface PdfOptimizationResponse {
  pdfDataURL: string;
  url?: string;
}

export interface WorkerMessage {
  data: PdfOptimizationRequest;
  target: "wasm";
}

export interface OptimizationConfig {
  pdfSettings: string;
  imageDownsample: string;
  colorImageResolution: string;
  grayscaleImageResolution: string;
  monoImageResolution: string;
  jpegQuality: string;
}
