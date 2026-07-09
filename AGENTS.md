# Repository Guidelines

## Project Structure & Module Organization

This is a static Astro portfolio site. Route files live in `src/pages/`, with case studies under `src/pages/projects/`. Shared layouts are in `src/layouts/`, reusable Astro components in `src/components/`, and small UI primitives in `src/components/ui/`. Project metadata is centralized in `src/data/projects.ts`; every project slug there must have a matching `.astro` page in `src/pages/projects/`. Shared utilities live in `src/lib/`, global styles in `src/styles/global.css`, optimized project imagery in `src/assets/projects/<slug>/`, and static public files such as fonts and headers in `public/`.

## Build, Test, and Development Commands

- `npm run dev`: start the Astro development server.
- `npm run build`: run site invariant checks, then build production output to `dist/`.
- `npm run preview`: serve the production build locally.
- `npm run check:site`: verify project/page parity and reject `.DS_Store` files in `public/`.
- `npm run typecheck`: run `astro check` with strict TypeScript settings.
- `npm run lint`: lint `**/*.{ts,astro}` with ESLint.
- `npm run format` / `npm run format:check`: write or verify Prettier formatting.

## Coding Style & Naming Conventions

Use Astro components for UI and TypeScript for shared data and helpers. Follow the existing two-space indentation, no-semicolon, double-quoted style enforced by Prettier (see `.prettierrc`). Prefer the `@/` alias for imports from `src/`. Name Astro components in PascalCase, utility files in camel or kebab case, and project slugs in lowercase kebab case. Keep Tailwind classes readable and let `prettier-plugin-tailwindcss` sort them.

## Testing Guidelines

No dedicated unit test runner is configured. Treat `npm run typecheck`, `npm run lint`, and `npm run build` as the required validation set before shipping. For content or project changes, run `npm run check:site` early to catch missing project pages or data entries. When adding a project, update `src/data/projects.ts`, add the matching page, and include image alt text for every rendered project image.

## Commit & Pull Request Guidelines

Recent commits use concise imperative subjects, for example `Refactor project pages and shared layout` or `Update repo docs and site build scripts`. Keep commits focused and describe user-visible content, layout, or build changes plainly. Pull requests should include a short summary, validation commands run, linked issue or context when relevant, and screenshots for visual changes across key responsive states.

## Security & Configuration Tips

Do not commit build output, local environment files, or macOS metadata. Cloudflare Pages builds from `main` with `npm run build` and publishes `dist/`; keep deployment-sensitive changes documented in the PR.
