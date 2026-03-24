import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

import globals from "globals";

export default [
  {
    ignores: ["**/dist/**", "**/node_modules/**", "**/out/**", "**/build/**"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Allow browser and node globals in files
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.serviceworker,
      },
    },
  },

  // React Specific Configuration
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "react/jsx-uses-react": "off", // Not needed in React 17+
      "react/react-in-jsx-scope": "off", // Not needed in React 17+
    },
    settings: {
      react: { version: "detect" },
    },
  },

  // My Global Rules
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      //'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
];
