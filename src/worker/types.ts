export type OptimizationLevel = "light" | "medium" | "heavy";

export interface PdfOptimizationRequest {
  psDataURL: string;
  level: OptimizationLevel;
}
