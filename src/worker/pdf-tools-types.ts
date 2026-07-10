export interface MergeRequest {
  type: "merge";
  files: ArrayBuffer[];
}

export interface SplitRequest {
  type: "split";
  file: ArrayBuffer;
}

export type PdfToolsWorkerRequest = MergeRequest | SplitRequest;

export interface MergeResponse {
  type: "merge";
  bytes: ArrayBuffer;
}

export interface SplitPage {
  index: number;
  bytes: ArrayBuffer;
}

export interface SplitResponse {
  type: "split";
  pages: SplitPage[];
  zip: ArrayBuffer;
}

export interface ErrorResponse {
  type: "error";
  message: string;
}

export type PdfToolsWorkerResponse =
  | MergeResponse
  | SplitResponse
  | ErrorResponse;
