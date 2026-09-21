# Our Story Section Redesign — Design Spec

Date: 18 September 2026
Scope: `src/components/pages/about/OurStory/OurStory.tsx` + `OurStory.module.css`
Status: Approved (user, 18 Sep 2026)

## Problem

The current Our Story section is a pinned horizontal-scroll GSAP experience (6 chapter panels, ghost numeral parallax, progress beam/ticks, containerAnimation tweens). It is heavy, complex to maintain, and does not follow the approved About-page research direction ("narrative on the left and visual system on the right", vertical editorial rhythm).

## Decision

Complete redesign as a **vertical editorial section** with a **sticky era visual**, built with **CSS sticky + GSAP entrance reveals** (Approach A). No pinning, no scrubbed horizontal scroll.

## Structure

```
section#our-story            (aria-labelledby="our-story-title")
├── .head                    eyebrow "(Our Story)" + h2 display + intro paragraph
│                            (existing copy retained; keeps section-heading-fill scrub)
└── .body                    2-column grid ≥681px
    ├── .eraCol              position: sticky, top ~96px, aria-hidden decorative
    │   ├── era number       01–04, Plus Jakarta, blue ink, clamp(180px, 22vw, 320px)
    │   ├── era label        small caps + "Since 2007 · Noida" anchor line
    │   └── progress         vertical hairline + 4 dots, active dot follows milestone
    └── .milestones          4 <article> blocks in normal flow
        └── h3 + 1 paragraph + small meta line per milestone (no bullet lists)
```

## Content — 4 milestones (condensed from 6 chapters, verified facts only)

1. **01 · Beginnings** — "A technology-first start." Founded 2007 in Noida by Baldeep Singh; custom software from day one; long-term partnerships over transactions.
2. **02 · Trust earned** — "Work where trust is non-negotiable." Defense, Navy and Air Force collaborations; quality and trust under real constraints set the standard for everything after.
3. **03 · What we built** — "From web and mobile to enterprise systems." ERP and billing systems, web and mobile platforms; clean UI, strong performance, long-term reliability.
4. **04 · Today & next** — "AI, cloud, and the full digital stack." Worldwide delivery; smart, secure, scalable software; partnership beyond launch.

Facts currently in bullet lists fold into the paragraph copy.

## Motion (GSAP, no pinning)

- Header: entrance reveal (staggered fade-up) + retained `section-heading-fill` scroll scrub.
- Milestones: h3 word-mask rise (reuse existing `splitWords` helper) + copy/meta fade-up, `once: true`.
- Era visual: when a milestone reaches viewport center, era number + label crossfade (~0.4s) and the active dot updates — ScrollTrigger `onToggle`/`onEnter`, **not** scrubbed.
- `prefers-reduced-motion: reduce`: all content visible immediately, era visual shows the first milestone statically, dots hidden.

## Responsive

- ≥681px: sticky left era column + scrolling right milestones.
- ≤680px: single column; era column hidden — each milestone shows an inline compact index chip + era label above its h3.
- Uses About-page tokens (`--about-section-space`, `--about-blue`, `--about-blue-deep`, `--about-shell-width`, etc.). No hardcoded one-off values where a token exists.

## Accessibility

- Era visual is decorative (`aria-hidden="true"`); milestone order conveys the narrative.
- Section keeps `aria-labelledby="our-story-title"` and the existing h2 id.
- No content depends on hover, autoplay, or animation completion.

## Cleanup (removed)

- Pinned horizontal stage, `containerAnimation` tweens, progress beam + ticks, ghost numeral parallax, ambient grid parallax, stacked-mode class logic.
- `data-story-head` attribute retained on milestone h3s so they inherit the page-level editorial sizing rule in `about-us.module.css`.

## Files touched

- `src/components/pages/about/OurStory/OurStory.tsx` — rewrite (same export name `OurStory`, same section id).
- `src/components/pages/about/OurStory/OurStory.module.css` — rewrite.

No other components import these files beyond `about-us/page.tsx` (import path unchanged).

## Verification

- `npm run typecheck`, `npm run lint`, `npx prettier --check` on touched files, `npm test` (vitest suite).
