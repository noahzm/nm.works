# CLAUDE.md

Personal portfolio site for Noah Michaels (nm.works). Static Astro site with TypeScript and Tailwind CSS v4, deployed to Cloudflare.

## Commands

- `npm run dev` — start the Astro dev server.
- `npm run build` — runs `npm run check:site` first, then builds to `dist/`.
- `npm run preview` — preview the production build.
- `npm run check:site` — enforce project/page parity and block `.DS_Store` files under `public/`.
- `npm run typecheck` — `astro check` with strict TypeScript settings.
- `npm run lint` — ESLint across `**/*.{ts,astro}`. Single file: `npx eslint src/pages/index.astro`.
- `npm run format` / `npm run format:check` — Prettier write/check across `**/*.{ts,astro}`.

There is no unit/integration test runner.

## Architecture

- `src/layouts/main.astro` — global shell: SEO/meta tags, canonical URL generation, navigation, and `ClientRouter` view transitions.
- `src/layouts/case-study.astro` — wraps project pages, adds shared case-study chrome, and computes "next project" navigation from `publishedProjects`.
- `src/data/projects.ts` — content source of truth. The exported filters (`publishedCaseStudies`, `upcomingCaseStudies`, `visualWork`, `publishedProjects`) drive listings and page behavior.
- `src/pages/index.astro` — editorially curated; `selectedWork` is a hard-coded ordered slug list, not an automatic featured query.
- Project imagery uses Astro assets (`Picture`) plus shared wrappers like `ProjectPreview` and `AspectRatio` for responsive AVIF/WEBP output.
- `scripts/check-site-invariants.mjs` — build gate, runs automatically through `npm run build`.

## Conventions

- When adding or changing a project, update `src/data/projects.ts` and `src/pages/projects/<slug>.astro` together.
- Keep project `slug` values as direct string literals in `src/data/projects.ts`; the invariant script parses them with a regex.
- Use the `CaseStudy` layout for project detail pages and `getProject("<slug>")!` to keep metadata and navigation consistent.
- `project.status === "coming-soon"` affects listings and sets `noindex` in the case-study layout.
- `ProjectPreview` assumes both `project.image` and `project.imageAlt`; missing either falls back to an empty aspect-ratio block.
- Prefer `@/` imports for code under `src/`.

## Copy and voice

The site positions Noah as a product designer (applying to UX, product, and graphic design roles). All user-facing copy follows these rules:

- Plain, confident, first person: "I designed / built / redesigned," never "architected / engineered / optimized / leveraged."
- Concrete outcomes over abstractions; keep numbers (170 legislators, one press pass instead of two).
- No em dashes in body text; use commas, colons, or separate sentences.
- Typographic curly apostrophes (') in source copy, matching existing text.
