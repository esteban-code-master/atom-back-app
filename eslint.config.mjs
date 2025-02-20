import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import js from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{ts}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  // importPlugin.flatConfigs.recommended,
  // eslintPluginPrettier.configs.recommended,
  ...tseslint.configs.recommended,
  js.configs.recommended,
  {
    ignores: ["**/*.{js}"],
    rules: {
      // Estilo de código
      quotes: ["error", "double"],
      semi: ["error", "always"],
      indent: ["error", 2],
      "max-len": ["error", { code: 120 }],
      "linebreak-style": ["error", "unix"],
      "no-trailing-spaces": "error",
      "no-magic-numbers": ["error", { ignore: [0, 1] }],

      // Consola
      "no-console": "warn",
      "no-unused-vars": ["error"],
      "no-debugger": "error",
      "no-undef": "error",
      "consistent-return": "error",

      // TypeScript
      // '@typescript-eslint/no-unused-vars': 'error',
      // '@typescript-eslint/no-explicit-any': 'error',
      // '@typescript-eslint/no-unsafe-assignment': 'error',
      // '@typescript-eslint/no-unsafe-member-access': 'error',
      // '@typescript-eslint/no-unsafe-call': 'error',
    },
  },
];
