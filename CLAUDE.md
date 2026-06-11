# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Astro dev server
- `npm run build` — production build
- `npm run preview` — serve the production build locally
- `npm run typecheck` — run `astro check`; use this after edits to `.astro`, `.ts`, `.tsx`
- `npm run lint` — ESLint over `**/*.{ts,tsx}` only (`.astro` files are typechecked, not linted)
- `npm run format` — Prettier over `**/*.{ts,tsx,astro}`

No test runner is configured. `playwright` is in devDependencies but unused — `npm test` does not exist.

## Architecture

**Routing** is file-based under `src/pages/`. `src/layouts/main.astro` is the root shell: it imports global styles and mounts `ClientRouter` from `astro:transitions` for site-wide view transitions. `src/layouts/case-study.astro` wraps individual case study pages and pulls the "next project" link from `publishedProjects`.

**Project data** lives entirely in `src/data/projects.ts`. Update that file rather than duplicating metadata in page files. The module exports typed filtered arrays (`caseStudies`, `publishedCaseStudies`, `visualWork`, `publishedProjects`) and a `getProject(slug)` lookup. Projects with `status: "coming-soon"` render publicly but the case-study layout marks them `noindex`; they appear in the "In progress" section of the projects index.

**Tailwind v4** is loaded as a Vite plugin — no `tailwind.config.*` file exists. All theme configuration (colors in oklch, typography, radius) lives in `src/styles/global.css` via `@import "tailwindcss"` and `@theme`.

**UI components** in `src/components/ui/` are custom implementations built on Radix UI primitives + CVA (class-variance-authority). The `cn()` merge helper is in `src/lib/utils.ts`. Use `@/components/ui/...` and `@/lib/utils` (the `@/*` alias resolves to `src/*`).

React components inside `.astro` files render as static HTML by default. Add a hydration directive (`client:load`, `client:idle`, `client:visible`) only when browser-side behavior is needed.

## Code Style

Prettier: no semicolons, double quotes, 2-space indent, `trailingComma: "es5"`, 80-column width. The Tailwind Prettier plugin sorts classes including those inside `cn()` and `cva()` calls. ESLint uses flat config with `typescript-eslint`, `react-hooks`, and `react-refresh`.

The `yaml` override in `package.json` (`"yaml": "^2.9.0"`) is a security pin — do not remove it.

## Visual Direction

This is a designer's portfolio. Layouts should feel precise and editorial: strong typographic hierarchy, restrained spacing, project imagery as the focus. Do not introduce ornamental UI, oversized explanatory copy, or decorative gradients unless already present in the visual system.
