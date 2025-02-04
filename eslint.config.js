// eslint.config.js
const js = require("@eslint/js");
const ts = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");
const prettier = require("eslint-config-prettier");
const prettierPlugin = require("eslint-plugin-prettier");

module.exports = [
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
      "@typescript-eslint": ts,
      prettier: prettierPlugin
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