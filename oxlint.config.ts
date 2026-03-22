import { defineConfig } from "oxlint";

export default defineConfig({
  ignorePatterns: ["src/worker/bg-worker.js", "src/worker/gs-worker.js"],
  plugins: ["react", "react-perf", "import", "promise", "oxc"],
  categories: {
    suspicious: "error",
    perf: "error",
  },
  rules: {
    "react/react-in-jsx-scope": "off",
  },
});
