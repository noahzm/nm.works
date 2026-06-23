# nm.works — Agent Guide

Guidance for coding agents (Cursor, Claude Code, Codex, OpenCode, etc.) working in this repository.

## Commands

- `npm run dev` — start the Astro dev server
- `npm run build` — run `check:site`, then production build
- `npm run preview` — serve the production build locally
- `npm run check:site` — verify project/page parity and static asset hygiene
- `npm run typecheck` — run `astro check`; use this after edits to `.astro`, `.ts`, `.tsx`
- `npm run lint` — ESLint over `**/*.{ts,astro}` (Astro templates included via `eslint-plugin-astro`)
- `npm run format` — Prettier write over `**/*.{ts,astro}`
- `npm run format:check` — non-mutating Prettier check over `**/*.{ts,astro}`

No test runner is configured; `npm test` does not exist.

The site builds to static output (`dist/`) and is served by the Cloudflare **Pages** project **`nm-works`** (custom domain `nm.works`; `site` is set in `astro.config.mjs`). The Cloudflare Pages project is connected to GitHub repo `noahzm/nm.works`; pushes to `main` trigger Production deploys with build command `npm run build` and output directory `dist`. You can also publish manually with `npx wrangler pages deploy dist --project-name=nm-works` (wrangler is not a project dependency; run via `npx`). Deploy state lives in the gitignored `.wrangler/`.

## Architecture

**Routing** is file-based under `src/pages/`. `src/layouts/main.astro` is the root shell: it imports global styles and mounts `ClientRouter` from `astro:transitions` for site-wide view transitions. `src/layouts/case-study.astro` wraps individual case study pages and pulls the "next project" link from `publishedProjects`.

**Project data** lives entirely in `src/data/projects.ts`. Update that file rather than duplicating metadata in page files. The module exports typed filtered arrays (`caseStudies`, `publishedCaseStudies`, `visualWork`, `publishedProjects`) and a `getProject(slug)` lookup. Projects with `status: "coming-soon"` render publicly but the case-study layout marks them `noindex`; they appear in the "In progress" section of the projects index.

`CaseStudyHeader` accepts optional link props (`liveUrl`, `appStoreUrl`, `githubUrl`, `headerLinks`) and `headerDetails` rows for the metadata grid; see the component's props for labels and styling defaults.

Disciplines include `mobile` (labeled "Mobile") alongside product design, front-end, UX/UI, information architecture, and brand & apparel.

**Tailwind v4** is loaded as a Vite plugin — no `tailwind.config.*` file exists. All theme configuration (colors in oklch, typography, radius) lives in `src/styles/global.css` via `@import "tailwindcss"` and `@theme`.

**UI components** in `src/components/ui/` are `.astro` components styled with CVA (class-variance-authority): `badge.astro`, `separator.astro`, and `aspect-ratio.astro` consume the framework-agnostic `*-variants.ts` recipes (`badge-variants.ts`, `button-variants.ts`). Buttons are rendered by applying `buttonVariants()` directly to `<a>`/`<button>` elements rather than a component. The `cn()` merge helper is in `src/lib/utils.ts`. Use `@/components/ui/...` and `@/lib/utils` (the `@/*` alias resolves to `src/*`).

The site ships **no client-side framework** — there is no React/Vue/etc. integration. The only client JS is Astro's `ClientRouter` (view transitions) in `main.astro`. Author all components as `.astro`; everything renders to static HTML at build time.

**Icons** come from `astro-icon` + `@iconify-json/lucide`: `import { Icon } from "astro-icon/components"` then `<Icon name="lucide:arrow-right" />`. Icon size and inline-affix spacing are driven by parent CVA classes (`[&_svg]:size-4`, `has-data-[affix=inline-end]:pr-2.5`); mark a leading/trailing icon with `data-affix="inline-start"` / `data-affix="inline-end"` (not `data-icon`, which astro-icon reserves).

**Case study figures** are authored in `src/pages/projects/<slug>.astro`. Screenshots are phone-framed app captures (1170×2532 — an iPhone 390×844 viewport at DPR 3) under `src/assets/projects/<slug>/`, rendered through Astro's `<Picture>` inside `.phone` / `.annotated-figure` wrappers. Overlay annotations are declared as data arrays in the page and positioned by matching `.annotation-list__item--*` CSS; each connector's dot is offset by a per-item `--reach` length, and because the desktop content column is a fixed width with the phone centered, dot placement is deterministic. The overlay is hidden below `768px`, where the `<figcaption>` carries the meaning instead.

## Code Style

Prettier: no semicolons, double quotes, 2-space indent, `trailingComma: "es5"`, 80-column width. The Tailwind Prettier plugin sorts classes including those inside `cn()` and `cva()` calls. ESLint uses flat config with `typescript-eslint` and `eslint-plugin-astro` (recommended + jsx-a11y).

The `yaml` override in `package.json` (`"yaml": "^2.9.0"`) is a security pin — do not remove it.

## Visual Direction

This is a designer's portfolio. Layouts should feel precise and editorial: strong typographic hierarchy, restrained spacing, project imagery as the focus. Do not introduce ornamental UI, oversized explanatory copy, or decorative gradients unless already present in the visual system.
