import js from "@eslint/js"
import astro from "eslint-plugin-astro"
import prettier from "eslint-config-prettier"
import globals from "globals"
import tseslint from "typescript-eslint"
import { defineConfig, globalIgnores } from "eslint/config"

export default defineConfig([
  globalIgnores(["dist", ".astro"]),

  js.configs.recommended,
  ...tseslint.configs.recommended,

  ...astro.configs["flat/recommended"],
  ...astro.configs["flat/jsx-a11y-recommended"],

  {
    files: ["**/*.config.{js,mjs,ts}", "scripts/**/*.mjs"],
    languageOptions: {
      globals: globals.node,
    },
  },

  prettier,
])
