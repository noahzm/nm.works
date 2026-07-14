# nm.works

Portfolio site for Noah Michaels — a Product Designer working across product UX, UI, front-end development, mobile, information architecture, and visual systems.

Built as a static Astro site with TypeScript and Tailwind CSS v4, and deployed on Cloudflare Pages.

## What this site showcases

- Case studies from shipped product and design systems work
- Visual and UI craft across web, product, and brand surfaces
- Ongoing work-in-progress projects

## Built with

- Astro 7 (static output)
- TypeScript
- Tailwind CSS v4 via Vite
- CVA-based styling with `tailwind-merge`
- Cloudflare Pages project `nm-works`

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

## Deploy

The production site is served at [nm.works](https://nm.works) by Cloudflare Pages.

- Branch: `main`
- Build command: `npm run build`
- Output directory: `dist`
