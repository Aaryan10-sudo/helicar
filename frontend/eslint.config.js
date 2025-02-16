import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginJsxA11y from "eslint-plugin-jsx-a11y";
import pluginPrettier from "eslint-plugin-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      "react-hooks": pluginReactHooks,
      "jsx-a11y": eslintPluginJsxA11y,
      prettier: pluginPrettier,
    },
    settings: { react: { version: "detect" } },
    rules: {
      semi: ["error", "always"],
      "react/react-in-jsx-scope": "off",
      "no-unused-vars": "error",
      "no-undef": "error",
      camelcase: "error",
      eqeqeq: "error",
      "no-alert": "error",
      "no-empty": "error",
      "no-empty-function": "error",
      "no-var": "error",

      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      "jsx-a11y/alt-text": "warn", // ✅ Warn if images don't have alt text

      "prettier/prettier": "error",
      "react/prop-types": "off",
    },
  },
];
