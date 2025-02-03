// eslint.config.js
import js from "@eslint/js";
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";

export default [
  js.configs.recommended,
  {
    files: ["**/*.ts", "**/*.js"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        sourceType: "module",
        ecmaVersion: "latest"
      }
    },
    plugins: {
      "@typescript-eslint": ts
    },
    rules: {
      "prettier/prettier": "error",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/explicit-function-return-type": "off"
    }
  },
  prettier,
  {
    ignores: ["node_modules", "dist"]
  }
];