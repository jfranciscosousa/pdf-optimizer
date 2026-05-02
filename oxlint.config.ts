import { defineConfig } from "oxlint";

export default defineConfig({
  ignorePatterns: ["src/worker/bg-worker.js", "src/worker/gs-worker.js"],
  plugins: ["react", "import", "promise", "oxc"],
  jsPlugins: ["oxlint-tailwindcss"],
  categories: {
    suspicious: "error",
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/no-array-index-key": "off",
    // Correctness
    "tailwindcss/no-unknown-classes": "error",
    "tailwindcss/no-duplicate-classes": "error",
    "tailwindcss/no-conflicting-classes": "error",
    "tailwindcss/no-deprecated-classes": "error",
    "tailwindcss/no-unnecessary-whitespace": "error",
    "tailwindcss/no-contradicting-variants": "warn",
    // Style
    "tailwindcss/enforce-canonical": "warn",
    "tailwindcss/enforce-sort-order": "warn",
    "tailwindcss/enforce-shorthand": "warn",
    "tailwindcss/enforce-logical": "off",
    "tailwindcss/enforce-physical": "off",
    "tailwindcss/enforce-consistent-important-position": "warn",
    "tailwindcss/enforce-negative-arbitrary-values": "warn",
    "tailwindcss/enforce-consistent-variable-syntax": "warn",
    "tailwindcss/consistent-variant-order": "warn",
    // Complexity
    "tailwindcss/max-class-count": "off",
    "tailwindcss/enforce-consistent-line-wrapping": "off",
    // Restrictions
    "tailwindcss/no-restricted-classes": "off",
    "tailwindcss/no-arbitrary-value": "off",
    "tailwindcss/no-hardcoded-colors": "warn",
    "tailwindcss/no-unnecessary-arbitrary-value": "warn",
  },
});
