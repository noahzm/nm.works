# nm.works — Agent Guide

Guidance for coding agents (Cursor, Claude Code, Codex, OpenCode, etc.) working in this repository.

## Commands

- `npm run dev` — start the Astro dev server
- `npm run build` — run `check:site`, then production build
- `npm run preview` — serve the production build locally
- `npm run check:site` — verify project/page parity and static asset hygiene
- `npm run typecheck` — run `astro check`; use this after edits to `.astro`, `.ts`, `.tsx`
- `npm run lint` — ESLint over `**/*.{ts,tsx}` only (`.astro` files are typechecked, not linted)
- `npm run format` — Prettier write over `**/*.{ts,tsx,astro}`
- `npm run format:check` — non-mutating Prettier check over `**/*.{ts,tsx,astro}`

No test runner is configured. `playwright` is in devDependencies but unused — `npm test` does not exist.

The site builds to static output (`dist/`) and is served by the Cloudflare **Pages** project **`nm-works`** (custom domain `nm.works`; `site` is set in `astro.config.mjs`). The Cloudflare Pages project is connected to GitHub repo `noahzm/nm.works`; pushes to `main` trigger Production deploys with build command `npm run build` and output directory `dist`. You can also publish manually with `npx wrangler pages deploy dist --project-name=nm-works` (wrangler is not a project dependency; run via `npx`). Deploy state lives in the gitignored `.wrangler/`.

MCP servers in `.mcp.json`: `shadcn` (component registry), `astro` (hosted Astro docs), and `xcode-tools` (`xcrun mcpbridge` — requires Xcode open). Treat `.mcp.json` as the cross-agent source of truth; `.codex/config.toml` mirrors that set for Codex.

## Architecture

**Routing** is file-based under `src/pages/`. `src/layouts/main.astro` is the root shell: it imports global styles and mounts `ClientRouter` from `astro:transitions` for site-wide view transitions. `src/layouts/case-study.astro` wraps individual case study pages and pulls the "next project" link from `publishedProjects`.

**Project data** lives entirely in `src/data/projects.ts`. Update that file rather than duplicating metadata in page files. The module exports typed filtered arrays (`caseStudies`, `publishedCaseStudies`, `visualWork`, `publishedProjects`) and a `getProject(slug)` lookup. Projects with `status: "coming-soon"` render publicly but the case-study layout marks them `noindex`; they appear in the "In progress" section of the projects index.

Project links in `CaseStudyHeader`: optional `liveUrl` (label from `liveUrlLabel`, default **View web app**), `appStoreUrl` (App Store, primary when set), `githubUrl` (**View on GitHub**, outline), and `headerLinks` (outline; set `external: false` for in-page anchors). Optional `headerDetails` adds rows to the header metadata grid (e.g. Built with, Shipped, Scope); a single detail spans full width.

Disciplines include `mobile` (labeled "Mobile") alongside product design, front-end, UX/UI, information architecture, and brand & apparel.

**Tailwind v4** is loaded as a Vite plugin — no `tailwind.config.*` file exists. All theme configuration (colors in oklch, typography, radius) lives in `src/styles/global.css` via `@import "tailwindcss"` and `@theme`.

**UI components** in `src/components/ui/` are custom implementations built on Radix UI primitives + CVA (class-variance-authority). The `cn()` merge helper is in `src/lib/utils.ts`. Use `@/components/ui/...` and `@/lib/utils` (the `@/*` alias resolves to `src/*`).

React components inside `.astro` files render as static HTML by default. Add a hydration directive (`client:load`, `client:idle`, `client:visible`) only when browser-side behavior is needed.

**Case study figures** are authored in `src/pages/projects/<slug>.astro`. Screenshots are phone-framed app captures (1170×2532 — an iPhone 390×844 viewport at DPR 3) under `src/assets/projects/<slug>/`, rendered through Astro's `<Picture>` inside `.phone` / `.annotated-figure` wrappers. For Wheely Weather, native iOS Simulator captures are canonical (`scripts/capture-wheely-ios-screenshots.mjs` when available). `scripts/capture-wheely-screenshots.mjs` remains for the legacy web app at wheelyweather.app. Overlay annotations are declared as data arrays in the page and positioned by matching `.annotation-list__item--*` CSS; each connector's dot is offset by a per-item `--reach` length, and because the desktop content column is a fixed width with the phone centered, dot placement is deterministic. The overlay is hidden below `768px`, where the `<figcaption>` carries the meaning instead.

**Resume** is generated locally by `scripts/make-resume.py` (python-docx) for tailored job applications. Edit the script, then run it to write `NoahMichaelsResume.docx` in the repo root (gitignored). Export PDFs locally as needed (e.g. `soffice --headless --convert-to pdf --outdir . NoahMichaelsResume.docx`). Do **not** commit or serve a resume from `public/` — the portfolio site has no public resume link.

## Code Style

Prettier: no semicolons, double quotes, 2-space indent, `trailingComma: "es5"`, 80-column width. The Tailwind Prettier plugin sorts classes including those inside `cn()` and `cva()` calls. ESLint uses flat config with `typescript-eslint`, `react-hooks`, and `react-refresh`.

The `yaml` override in `package.json` (`"yaml": "^2.9.0"`) is a security pin — do not remove it.

## Visual Direction

This is a designer's portfolio. Layouts should feel precise and editorial: strong typographic hierarchy, restrained spacing, project imagery as the focus. Do not introduce ornamental UI, oversized explanatory copy, or decorative gradients unless already present in the visual system.
