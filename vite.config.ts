import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import { ghostscriptAssets } from "./scripts/ghostscript-assets.ts";

export default defineConfig(({ command }) => ({
  resolve: { tsconfigPaths: true },
  worker: {
    format: "es",
  },
  server: {
    port: 3000,
  },
  plugins: [
    ghostscriptAssets(),
    command === "build" && cloudflare({ viteEnvironment: { name: "ssr" } }),
    tanstackStart(),
    viteReact({
      exclude: [/src\/worker\//],
      // @ts-expect-error
      babel: {
        plugins: ["babel-plugin-react-compiler"],
      },
    }),
    tailwindcss(),
  ],
}));
