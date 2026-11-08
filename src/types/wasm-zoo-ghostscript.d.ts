declare module "@wasm-zoo/ghostscript" {
  export interface GhostscriptResult {
    exitCode: number;
    files: { name: string; data: Uint8Array<ArrayBuffer> }[];
  }

  export interface GhostscriptRuntime {
    exec(
      args: string[],
      options: {
        files: { name: string; data: Uint8Array }[];
        outputs: string[];
        timeoutMs: number;
      },
    ): Promise<GhostscriptResult>;
    dispose(): void;
  }

  export function load(): Promise<GhostscriptRuntime>;
}
