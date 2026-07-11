# Copilot Instructions for `nm.works`

## Build, lint, and validation commands

- `npm run dev` — start Astro dev server.
- `npm run build` — runs `npm run check:site` first, then builds to `dist/`.
- `npm run preview` — preview the production build.
- `npm run check:site` — enforce site invariants:
  - every slug in `src/data/projects.ts` must have a matching `src/pages/projects/<slug>.astro`
  - every project page must have matching project data
  - `.DS_Store` files are forbidden under `public/`
- `npm run typecheck` — `astro check` with strict TS config.
- `npm run lint` — ESLint across `**/*.{ts,astro}`.
- `npm run format:check` — Prettier check across `**/*.{ts,astro}`.

### Single-test / targeted runs

There is no unit/integration test runner in this repository, so there is no single-test command.

For targeted validation while editing:

- single file lint: `npx eslint src/pages/index.astro`
- run only invariants: `npm run check:site`

## High-level architecture

- This is a static Astro portfolio site. `src/layouts/main.astro` is the global shell (SEO/meta tags, canonical URL generation, nav, and view transitions via `ClientRouter`).
- Case study pages are wrapped by `src/layouts/case-study.astro`, which composes shared case-study header/CTA styles and computes “next project” navigation from `publishedProjects`.
- `src/data/projects.ts` is the content source of truth. Route listings and case-study metadata are derived from exported filters (`publishedCaseStudies`, `upcomingCaseStudies`, `visualWork`, `publishedProjects`), and pages load entries through `getProject(slug)`.
- The homepage (`src/pages/index.astro`) is editorially curated: `selectedWork` is a hard-coded ordered slug list, not an automatic “featured” query.
- Project and hero imagery are rendered through Astro assets (`Picture`) plus shared wrappers (`ProjectPreview`, `AspectRatio`) with AVIF/WEBP output and responsive widths/sizes.
- `scripts/check-site-invariants.mjs` is a build gate and runs automatically through `npm run build`.

## Key conventions specific to this repo

- When adding a project, update both `src/data/projects.ts` and `src/pages/projects/<slug>.astro` in the same change. Build will fail if either side is missing.
- Keep `slug` declarations in `src/data/projects.ts` as direct string properties like `slug: "my-slug",` (the invariant script parses slugs with a regex over source text).
- Project cards/previews assume both `project.image` and `project.imageAlt`; missing either falls back to placeholder aspect-ratio blocks.
- Use `CaseStudy` layout for project pages and retrieve project metadata with `getProject("<slug>")!` to keep page chrome, metadata, and next-project behavior consistent.
- `project.status === "coming-soon"` has cross-cutting effects: shown in “In progress” listings and marked `noindex` in the case-study layout.
- Prefer `@/` imports (configured in `tsconfig.json`) for code under `src/`.
