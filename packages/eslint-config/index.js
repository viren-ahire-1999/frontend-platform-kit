import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";

/**
 * Base flat config shared across every FPK package and app.
 * Consumers extend it in their own `eslint.config.js`.
 */
export default tseslint.config(
  {
    // public/ holds static, browser-loaded runtime assets (e.g. config.js)
    // that aren't part of the typed source graph.
    ignores: [
      "**/dist/**",
      "**/build/**",
      "**/.turbo/**",
      "**/node_modules/**",
      "**/public/**"
    ]
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.es2022 }
    },
    plugins: {
      "react-hooks": reactHooks
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
      ]
    }
  },
  {
    // Node-based build/config files (e.g. webpack.config.cjs) run in CommonJS.
    files: ["**/*.cjs", "**/*.config.{js,cjs,mjs}"],
    languageOptions: {
      sourceType: "commonjs",
      globals: { ...globals.node }
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "no-undef": "off"
    }
  }
);
