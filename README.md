# nm.works

Portfolio site for Noah Michaels, a design technologist working across product UI,
front-end development, mobile, information architecture, and visual systems.

Built as a static Astro site with TypeScript and Tailwind CSS v4, and Cloudflare Pages deployment.

## Stack

- Astro 7 static output
- TypeScript
- Tailwind CSS v4 through the Vite plugin
- CVA-based styling with tailwind-merge
- Cloudflare Pages project `nm-works`

## SEO & Performance

- Sitemap auto-generated via `@astrojs/sitemap` integration
- Dynamic `robots.txt` generated from `astro.config.mjs` site value
- Prefetch enabled for faster client-side navigation

## Commands

```bash
npm run dev           # start the Astro dev server
npm run build         # run site checks, then build to dist/
npm run preview       # serve the production build locally
npm run check:site    # verify project/page parity and asset hygiene
npm run typecheck     # run astro check
npm run lint          # lint TypeScript and Astro files
npm run format        # format TypeScript and Astro files
npm run format:check  # verify formatting without writing
```

No test runner is configured. Use `npm run typecheck` and `npm run format:check` to validate `.astro` and `.ts` files, and `npm run build` before shipping broader content or asset changes.

## Copilot Workflow

This repository is set up to use GitHub Copilot CLI for AI-assisted development.
Local project settings for other AI coding tools are intentionally excluded.

## Project Content

Project metadata lives in `src/data/projects.ts`. Add or update portfolio items
there first, then create the matching page under `src/pages/projects/` when the
project has a case study.

Case study pages use `src/layouts/case-study.astro`, while the global shell and
view transitions live in `src/layouts/main.astro`.

Project imagery lives under `src/assets/projects/<slug>/` and is rendered
through Astro image components. Keep screenshots and case study figures close to
the relevant project page so the narrative, captions, and assets stay in sync.

## Deploy

The production site is served at [nm.works](https://nm.works) by Cloudflare
Pages. The Pages project is connected to the GitHub repository and deploys
`main` with:

```bash
npm run build
```

Output directory:

```bash
dist
```
