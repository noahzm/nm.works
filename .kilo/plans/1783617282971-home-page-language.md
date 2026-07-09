# Home Page Language Improvements

## Goal
Improve the home page copy to be **plainer and more concrete**, and to speak in a **unified, calm, precise voice** (the site's existing tone is the standard). No repositioning, no added resume signals (years of experience, AI tooling, relocation) — those were explicitly deprioritized.

## Scope
- **In scope:** Home-page-specific copy strings in `src/pages/index.astro` (hero H1, subhead, proof points, selected-work blurb, `projectImpacts` lines, CTA `description` prop).
- **Out of scope (do not edit):**
  - `project.summary` values in `src/data/projects.ts` — already plain/concrete and shared with project pages.
  - `src/components/CTA.astro` defaults — override only via the `description` prop passed from `index.astro`.
  - The resume PDF (cannot be edited here). See "Voice alignment notes" for follow-up.
- **Constraint:** Text-only changes. Do not alter markup, classes, component structure, or the `proofPoints`/`selectedWork` data shape. Preserve existing typographic apostrophes (`’`) used in the file.

## Copy changes (before → after)

All edits are in `src/pages/index.astro`.

### 1. Hero H1 (lines 35–39)
- **Before:** "I'm a design technologist who designs and builds in code, shaping workflow interfaces, internal tools, and production systems where accuracy matters."
- **After:** "I'm a design technologist who designs and builds in code. I make internal tools, production systems, and interfaces where the details have to be right."
- **Why:** Removes the abstract "shaping workflow interfaces... where accuracy matters"; states plainly what he builds and the standard he holds.

### 2. Subhead (lines 40–44)
- **Before:** "I work where design meets engineering, combining product UI, information architecture, visual design, and front-end implementation across digital tools and print production workflows."
- **After:** "I take a project from interface design through front-end code myself, across both digital products and print production."
- **Why:** Cuts the long noun-chain ("product UI, information architecture, visual design, and front-end implementation"), stops restating the H1, and adds a new point: he owns the full path from design to code.

### 3. Proof points (lines 14–20)
- Keep list; change one item for concreteness:
  - "Code prototypes" → "Working prototypes"
- Leave "Workflow UX", "Internal tools", "Production systems", "Design systems" unchanged.

### 4. Selected-work blurb (lines 66–69)
- **Before:** "Internal workflow tools, independent product builds, and web projects shaped around production realities."
- **After:** "Internal tools, independent products, and web projects built around real production constraints."
- **Why:** "shaped around production realities" is vague; "built around real production constraints" is concrete.

### 5. Project impact lines (`projectImpacts`, lines 22–29)
- **ncga-stationery-templates**
  - Before: "Replaced fragile per-legislator files with one governed workflow for all 170 members."
  - After: "Replaced fragile per-legislator files with one controlled workflow covering all 170 members."
  - Why: drops the jargon "governed."
- **wheely-weather**
  - Before: "Turned scattered forecast signals into a verdict-first product across web, iOS, and watchOS."
  - After: "Turned raw forecast data into clear ride-quality verdicts across web, iOS, and watchOS."
  - Why: "scattered forecast signals" → concrete "raw forecast data"; keeps the product's verdict concept in plain terms.
- **creative-printing-order-flow**
  - Before: "Moved order entry from service browsing to a direct customer-intent grid."
  - After: "Replaced open-ended service browsing with a grid that routes customers straight to the right order form."
  - Why: removes the jargon "customer-intent grid" and says what it does.

### 6. CTA description prop (line 126)
- **Before:** "Open to design technologist and design engineering roles where front-end fluency turns product decisions into working interfaces."
- **After:** "Open to design technologist and design engineering roles where I can take an idea from design through to working front-end code."
- **Why:** Keeps the same target roles (no repositioning) but states the value plainly instead of "front-end fluency turns product decisions into working interfaces."

## Voice alignment notes (follow-up, not editable here)
To make the resume match the site's calmer, more precise voice, later revise these resume phrases (PDF/source lives outside this repo):
- "digital touchpoints", "omnichannel touchpoints" → plain nouns ("interfaces", "screens/pages", "devices").
- "absolute visual consistency" → "consistent branding".
- "user-centric solutions", "elegant" → concrete outcomes.
- Confirm the resume title ("Design Technologist and Graphic Designer") stays consistent with the site's "design technologist".

## Validation
Run before shipping (per AGENTS.md):
- `npm run typecheck`
- `npm run lint`
- `npm run format:check` (or `npm run format` to fix)
- `npm run build`
- Visually spot-check the home page (`npm run dev`) for the hero, proof points, impacts, and CTA.

## Open questions
- None blocking. If the user later wants the deprioritized signals (5+ years, AI tooling, Portland availability) surfaced, that's a separate follow-up.
