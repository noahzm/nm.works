# nm.works

Portfolio site for Noah Michaels, focused on email and marketing automation: variable data personalization, HTML/CSS, and production QA.

Built as a static Astro site with TypeScript and Tailwind CSS v4, and deployed on Cloudflare Pages.

## What this site showcases

- Case studies from variable data, production QA, and responsive web work
- An email portfolio at `/email` (hidden until it has content)
- Side projects

## Built with

- Astro 7 (static output)
- TypeScript
- Tailwind CSS v4 via Vite
- CVA-based styling with `tailwind-merge`
- Cloudflare Pages project `nm-works`
- System fonts only (Times New Roman for body, Arial for labels and tables), no webfonts
- Header name in `public/wordmark.svg`: text outlined from Naive Font by Mr.Fisk (personal use); the font file itself is not in the repo
- Footer 88x31 button and favicon drawn by `scripts/make-badge.py`; social preview `public/og.png` drawn by `scripts/make-og.py` from the wordmark and badge (run both with `python3`, needs Pillow; `make-og.py` uses macOS system fonts)

## SEO & performance

- Sitemap generation via `@astrojs/sitemap`
- Dynamic `robots.txt` based on `astro.config.mjs` site value
- Prefetch enabled for faster client-side navigation

## Commands

```bash
npm run dev           # start the Astro dev server
npm run build         # run check:site, then build to dist/
npm run preview       # serve the production build locally
npm run check:site    # verify project/page parity and asset hygiene
npm run typecheck
npm run lint
npm run format
npm run format:check
```

No dedicated unit/integration test runner is configured. For broad changes, run `npm run build` before shipping.

## Project content model

Project metadata lives in `src/data/projects.ts`. Case-study pages live under `src/pages/projects/` and use the shared `CaseStudy` layout in `src/layouts/case-study.astro`.

When adding a new case study, update both:

- `src/data/projects.ts`
- `src/pages/projects/<slug>.astro`

Build checks enforce that data slugs and project pages stay in sync.

Site-wide copy, contact links, and the resume path live in `src/data/site.ts`. Resume links render only when the PDF exists under `public/` at build time.

## Email portfolio

Templates live in `src/data/email-templates.ts`. Each has a title, description, techniques, and a `previewHtml` file under `public/email-previews/` (shown in a sandboxed iframe) and/or a screenshot imported from `src/assets/email/`. The build fails if a `previewHtml` file is missing.

`/email` stays out of navigation and the sitemap, and is noindexed, until `emailWorkLive` is `true` and at least one template exists.

## Deploy

The production site is served at [nm.works](https://nm.works) by Cloudflare Pages.

- Branch: `main`
- Build command: `npm run build`
- Output directory: `dist`
