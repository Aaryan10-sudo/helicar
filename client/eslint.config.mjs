import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "prettier"],
    rules: {
      semi: ["error"],
      quotes: ["error", "double"],
      "prefer-arrow-callback": ["error"],
      "prefer-template": ["error"],
      "no-var": ["error"],
      "no-unused-vars": ["error"],
      "no-console": ["warn"],
      "no-debugger": ["warn"],
      "no-duplicate-imports": ["error"],
      "no-undef": ["error"],
      "no-unused-expressions": ["error"],
      "no-duplicate-case": ["error"],
      "no-empty": ["error"],
    },
  }),
];

export default eslintConfig;
