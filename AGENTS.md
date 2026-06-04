# AGENTS.md

Guidance for Codex and other coding agents working in this repository.

## Project Snapshot

This is an Astro 6 portfolio site with React enabled through
[@astrojs/react](astro.config.mjs). Tailwind v4 is loaded as a Vite plugin in
[astro.config.mjs](astro.config.mjs); there is no `tailwind.config.*` file.
Theme configuration lives in [src/styles/global.css](src/styles/global.css) via
`@import "tailwindcss"` and `@theme`.

Package management is npm. Use `package-lock.json` as the source of truth.

## Commands

- `npm run dev` starts the Astro dev server.
- `npm run build` creates a production build.
- `npm run preview` serves the built site.
- `npm run typecheck` runs `astro check` for TypeScript and `.astro`
  diagnostics. Run this after edits to `.astro`, `.ts`, and `.tsx` files.
- `npm run lint` runs ESLint. The config in
  [eslint.config.js](eslint.config.js) only targets `**/*.{ts,tsx}`. `.astro`
  files are not linted.
- `npm run format` runs Prettier over `**/*.{ts,tsx,astro}`.

There is no test runner configured. `playwright` is listed under devDependencies
but no script uses it, so do not assume `npm test` exists.

## Architecture

Routes are file-based under [src/pages/](src/pages/). Shared page chrome lives in
[src/layouts/](src/layouts/), with [src/layouts/main.astro](src/layouts/main.astro)
importing global styles and mounting `ClientRouter` from `astro:transitions`
site-wide. Case study framing lives in
[src/layouts/case-study.astro](src/layouts/case-study.astro), which pulls the
"next project" link from `publishedProjects`.

Project metadata is centralized in [src/data/projects.ts](src/data/projects.ts).
Prefer updating that data source over duplicating project details in multiple
pages. Projects with `status: "coming-soon"` are still rendered at their public
URLs but the case-study layout sets `noindex` on them. They are listed in the
"In progress" section of [src/pages/projects/index.astro](src/pages/projects/index.astro).

React components used inside `.astro` files render as server-rendered HTML by
default. Add an Astro hydration directive such as `client:load`, `client:idle`,
or `client:visible` only when the component needs browser-side behavior.

TypeScript extends `astro/tsconfigs/strict` and uses automatic React JSX
runtime with `jsx: "react-jsx"`.

## Imports And Components

The `@/*` alias resolves to `./src/*` in both [tsconfig.json](tsconfig.json) and
[components.json](components.json). Prefer alias imports such as:

```ts
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
```

shadcn/ui is configured in [components.json](components.json) with:

- style: `radix-luma`
- base color: `neutral`
- icon library: `lucide`
- UI output path: [src/components/ui/](src/components/ui/)

Add shadcn/ui components with:

```bash
npx shadcn@latest add <component>
```

Use `@/components/ui/...` and `@/lib/utils` rather than relative paths for shared
UI and utilities. `cn` is exported from [src/lib/utils.ts](src/lib/utils.ts).

`package.json` pins an `overrides` entry for `yaml` to `^2.9.0` (CVE-2025-64756).
Do not remove it when regenerating or sorting the file.

## Code Style

Prettier enforces no semicolons, double quotes, 2-space indentation,
`trailingComma: "es5"`, and an 80-column print width. The Tailwind Prettier
plugin sorts classes, including classes passed through `cn(...)` and `cva(...)`.

ESLint uses the flat config in [eslint.config.js](eslint.config.js) with
`typescript-eslint`, `react-hooks`, and `react-refresh/vite`. Astro files are
typechecked and formatted, but not linted by ESLint.

Keep edits scoped to the existing structure. Prefer Astro components for static
content and React only when interactivity or an existing React UI component makes
it useful.

## Visual Direction

This is a designer portfolio. The interface should feel precise, composed, and
editorial without becoming decorative. Favor restrained layouts, strong
typographic hierarchy, careful spacing, and high-quality project imagery.

Do not introduce ornamental UI that competes with the work. Avoid generic
marketing sections, oversized explanatory copy, and decorative gradients unless
they are already part of the project’s visual system.

## Voice And Copy

All user-facing copy, including case studies, intros, headings, captions, alt
text, and microcopy, should sound like a senior product designer writing a
direct, plainspoken brief. Confident and specific, never performative.

Write copy that is:

- Confident and plainspoken. State the work and its impact without overselling.
- Specific. Name tools, surfaces, audiences, behaviors, and shipped artifacts.
- Active. Prefer "I designed and built", "I redesigned the flow so…", and
  "the design prioritizes…" over passive or corporate phrasing. Use "the team
  shipped" only when a real team is named in the case study.
- Outcome-oriented. Connect claims to a user need, behavior change, business
  result, or concrete deliverable.
- Tight. Cut filler such as "in order to", "very", "really", "essentially",
  "leverage" (unless the word is literal), "bridge the gap between", and
  "iterative" when paired with "feedback-driven" or "design cycles."
- Aspirational without becoming grandiose. "Set new standards" can work;
  LinkedIn-style humblebrags do not.

Craft should be implied through specificity. Do not write "great taste",
"passionate", "talented", or stacked adjectives that ask the reader to admire the
work before seeing it.

Do not break the fourth wall. Lines like "you see the design prioritize action"
or "what you notice here is…" are performative meta-commentary, not active voice.
Let the description speak for itself.

Avoid throat-clearing openers ("With a background in…", "During this time, I
also applied this approach to…"). Start with the subject and the action.

Use curly quotes in rendered prose: " " and ' '. Straight quotes are for code,
string literals, JSX attributes, and other source syntax.

Use em dashes sparingly. Prefer periods, commas, and colons unless the sentence
needs the rhythm.

When in doubt, write the sentence as if briefing a designer on what shipped, who
it served, and why it mattered.
