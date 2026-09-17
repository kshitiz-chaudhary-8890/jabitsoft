# Services Landing Hero Redesign — Design Doc

Date: 2026-09-17
Status: Approved
Scope: `/services` landing page hero only (`ServiceHero` component). Detail pages (`/services/[slug]`) untouched.

## Problem

Current hero is a centered stack with a black 6-card services grid below the copy. The grid duplicates `ServiceOverview` (which already lists all six services as links, anchored at `#what-we-build`), violates the research recommendation ("do not put a long capability list in the hero"), and the centered composition does not match the left-aligned editorial language of the detail pages.

## Goals

- New left-aligned editorial hero on a white background.
- Remove the black 6-card grid from the hero.
- Add a compact, verifiable proof strip inside the hero.
- Keep the rotating scope word + drawn underline as the signature accent.

## Non-Goals

- No changes to `ServiceOverview` or any section below the hero.
- No new visuals/diagrams in the hero.
- No copy rewrites beyond the eyebrow.

## Design

### 1. Layout & content

- Full-height white hero, left-aligned.
- Eyebrow above headline: `Software development services` — signal green, uppercase, matches detail-page kickers.
- Headline, two left-aligned lines, same type scale as today (clamp 44–78px):
  - Line 1: `Built for [rotating word].` (rotating word + hand-drawn underline preserved)
  - Line 2: `Engineered around your business.`
- Thin ink rule below headline (mirrors detail-page `headingRule`).
- Below the rule, two columns: description (max 620px) on the left, CTAs end-aligned on the right (`Explore what we build` primary → `#what-we-build`, `Talk to us` secondary → mailto).
- `platforms` block (black grid) is deleted from `ServiceHero.tsx`.

### 2. Proof strip

- Inside the hero, below the copy block, bordered top/bottom hairlines.
- 3 verifiable facts with hairline separators: `Six service lines` · `One accountable team` · `Design to deployment` (no invented metrics).
- Visual: light, ink-on-white, matches detail-page list styling.

### 3. Motion & responsive

- GSAP entrance (scoped, revert on unmount): kicker → char stagger → rule scaleX → description/CTAs → proof strip items.
- Scroll scrub (heading/copy parallax) preserved.
- Mobile: stacked layout, CTAs wrap, proof strip becomes 2×2 / vertical list.
- Null-target guards in GSAP code; `.site-nav` animation conditional.
- `prefers-reduced-motion: reduce` skips animation; copy remains visible.
- A11y: `aria-labelledby="service-title"` retained; proof strip is plain text, no role changes.

## Files

- `src/components/pages/services/landing/ServiceHero/ServiceHero.tsx` — markup restructure, remove platforms, add proof strip, adjust GSAP timeline.
- `src/components/pages/services/landing/ServiceHero/ServiceHero.module.css` — rewrite layout styles, responsive rules, remove cell/platform styles.
- No data or route changes.

## Verification

- `/services` renders styled, console clean (no GSAP warnings/errors).
- CTA anchor scrolls to `ServiceOverview`.
- Screenshots: desktop + 700px + 430px widths.
