# Architecture Decision Record — Trinity AI Website

## Title
Static, evidence-labelled React site with configuration-driven content

## Status
Accepted

## Context
The website presents a student-led AI smart-city prototype to technical and institutional audiences. Every visual asset came from the project itself. Some screenshots show live, measured camera calibration; others are explicitly labelled `OFFLINE · SIMULATED` in the source interface. The site must not blur that distinction or imply commercial deployment. Content (contact details, links, video URLs, status wording) will change more often than presentation code.

## Decision
1. Build a static Vite + React + TypeScript single-page site. No backend or runtime API keys are required.
2. Keep all editable content in `src/config/`: site metadata and contact details, section copy, media manifest, and video sources. Components import typed data and contain no hard-coded claims.
3. Use a discriminated union for video sources (`local`, `youtube`) and only list videos that have a real file or share link.
4. Label every gallery item with an evidence value (`MEASURED`, `SIMULATED`, or `PLANNED`) that is visible in the UI, matching the labels used in the dashboard itself.
5. Optimize supplied assets into `public/media/` as WebP, and keep original uploads in ignored `assets-source/` so large raw files are not committed.
6. Use Framer Motion only for short scroll reveals, menu transitions, and lightbox transitions; all motion collapses under `prefers-reduced-motion`.
7. Use Tailwind CSS tokens for the navy/blue system; no component contains arbitrary colour values except the generated SVG diagram accents.

## Consequences
**Positive:** Single source of truth for claims and links; accurate evidence presentation; fast static deployment on GitHub Pages; no placeholder cards or broken embeds; accessible reduced-motion path.

**Negative:** Editing copy requires touching config files rather than component markup; the architecture diagram has separate SVG (desktop) and stacked (mobile) representations.

**Risks:** A future editor could remove an evidence label. The content-integrity unit test checks asset paths, unique IDs, and navigation targets, but human review is still required before publishing new claims.

## Compliance
- `npm run typecheck` — strict TypeScript, no `any`.
- `npm test` — config integrity and interaction tests.
- `npm run build` — production bundle check.
- Senior-engineer 20-point review checklist applied before completion.
