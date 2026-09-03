# JabitSoft — Coding Agent Guide

## Mission

Work on the JabitSoft codebase safely, incrementally, and with visual parity.

Your job is not to redesign the site unless the user explicitly asks for a redesign.

The correct workflow is:

```text
inspect current code
→ understand the exact request
→ make the smallest safe change
→ verify
→ stop
```

---

# 1. Read These First

Before substantial work, read:

```text
README.md
JABITSOFT_PROJECT_PLAN.md
CODING_AGENT_GUIDE.md
```

Then inspect the exact files involved in the task.

Documentation gives context; the current repository gives truth.

If docs and current code differ, inspect the code and report the discrepancy before making broad assumptions.

---

# 2. Golden Rule: Do Not Reconstruct From Memory

If a component/file exists, open it first.

Never recreate a current component from:

- an old chat
- a screenshot alone
- an earlier generated version
- memory of a previous refactor

unless the actual file is unavailable.

The user frequently iterates pixel-level UI. Old versions become stale quickly.

---

# 3. Design Preservation Lock

Unless the request explicitly changes design, do not change:

- component layout
- widths
- heights
- padding
- margins
- gaps
- typography
- font sizes
- weights
- line heights
- letter spacing
- colors
- gradients
- shadows
- borders
- radii
- image size/crop
- section order
- hover behavior
- responsive breakpoints
- animation direction
- pinned behavior
- existing content

A request such as:

> make the diagram animation better

does not authorize changing the card design.

A request such as:

> increase this paragraph font size

does not authorize restructuring the whole section.

---

# 4. Current Locked Component

## Problems We Solve

Treat this section as finalized unless explicitly requested.

Expected files:

```text
src/components/sections/ProblemsWeSolve/ProblemsWeSolve.tsx
src/components/sections/ProblemsWeSolve/ProblemsWeSolve.module.css
```

Current final intent:

- five problem states
- desktop pinned storytelling
- problem rail navigation
- problem-specific animated diagrams
- content transition between active items
- three bottom cards
- readable body copy
- mobile non-pinned flow
- main H2 uses the existing reveal animation
- heading is completely black
- `Capabilities we bring` is removed
- no card clipping
- balanced panel spacing
- no second Lenis

Do not refactor or “clean up” this section while working elsewhere.

---

# 5. Homepage Direction

Recommended order:

```text
Header
Hero
Trust / Client Signal
Intro / Positioning
Problems We Solve
Services Directory
Recent Works
How We Build
Company Stats
Client Results
Why JabitSoft
Founder
FAQ
Latest Insights
Final CTA
Footer
```

Do not reorder sections without a specific request.

Featured Service Cards are optional and require a deliberate decision before removal.

---

# 6. Technology Rules

Use:

```text
Next.js App Router
TypeScript
React
Tailwind CSS
CSS Modules
GSAP + ScrollTrigger
one global Lenis
next/image
next/font
Metadata API
```

Server Component by default.

Use `"use client"` only when needed for:

- state
- event listeners
- DOM/browser APIs
- GSAP
- forms
- accordion
- menu
- carousel
- modal
- client-only animation

Do not turn a page into a Client Component just because one child is interactive.

---

# 7. Tailwind vs CSS Modules

Tailwind is preferred for straightforward:

- layout
- flex/grid
- spacing
- typography utilities
- simple responsive rules

CSS Modules are appropriate for:

- complex diagrams
- deeply layered compositions
- keyframes
- selectors queried by GSAP
- complicated pseudo-elements
- stable section-specific design systems

Do not aggressively convert working CSS Modules to Tailwind if it risks design regressions.

Do not aggressively delete CSS based only on a quick regex scan. CSS may be used through:

- composed selectors
- responsive overrides
- pseudo selectors
- GSAP class queries
- dynamically built class names

Dead-CSS removal must be conservative and followed by build + visual verification.

---

# 8. Lenis Rule

There must be exactly one global Lenis instance.

Never add:

```text
ReactLenis root
new Lenis()
```

inside an individual section when the global site already owns smooth scrolling.

When integrating ScrollTrigger with Lenis, use the existing project integration.

---

# 9. GSAP / ScrollTrigger Rules

Every animated component must clean up only what it creates.

Prefer:

```text
gsap.context(...)
gsap.matchMedia()
local ScrollTrigger reference
timeline.kill()
trigger.kill()
mm.revert()
ctx.revert()
```

Avoid:

```js
ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
```

unless the task genuinely intends to destroy every trigger in that scope/application.

Pinned sections must be tested on:

- large desktop
- 1440-ish desktop
- 1366×768-ish laptop
- short-height desktop
- tablet
- mobile

When vertical fit is tight:

1. reduce decorative visual height first
2. reduce gaps carefully
3. preserve body readability
4. do not solve clipping by making content tiny

---

# 10. RevealHeading Rules

The project has a reusable main-heading reveal component.

When using it:

- preserve the semantic heading tag
- preserve `id`
- preserve `aria-*`
- preserve existing selectors
- preserve natural word wrapping
- preserve all typography
- animation should affect motion only

Generated internal spans can accidentally inherit selectors such as:

```css
.header h2 span
```

Therefore, inspect descendant color selectors before wrapping a heading.

Do not animate eyebrow labels character-by-character.

Do not double-animate headings/text that already have a dedicated scroll animation.

---

# 11. Header Rules

Final nav:

```text
About
Portfolio
Services
Careers
Blog
Contact
```

No Home item.

Logo → `/`.

Services menu:

Desktop:

- hover
- click
- keyboard focus
- Escape close
- outside-click close
- pointer can move from trigger to panel without accidental close

Mobile:

- expandable
- no hover dependency

Do not replace the approved JabitSoft header with a library navbar.

Menu typography:

```text
Inter
14px
500
21px
rgb(19, 19, 19)
```

---

# 12. Services

Service names:

```text
Agentic AI Development
Cloud Consulting
Mobile Application Development
ERP Services
SEO / Digital Marketing
Website Solutions
```

Routes:

```text
/services/agentic-ai-development
/services/cloud-consulting
/services/mobile-application-development
/services/erp-services
/services/seo-digital-marketing
/services/website-solutions
```

Do not invent new service names/routes without approval.

---

# 13. Content Rules

Website copy should be:

- clear
- credible
- concise
- business-aware
- technically correct
- natural

Avoid:

- “revolutionize your business”
- “unlock unparalleled potential”
- generic AI prose
- unnecessary buzzwords
- keyword stuffing

Never invent:

- client metrics
- awards
- headcount
- testimonials
- certifications
- performance numbers
- project results
- years in business

If a proof point is not supplied or verified, keep the copy qualitative.

---

# 14. SEO Rules

Use the project's SEO utilities and installed SEO skill for route/page SEO work.

For new routes, consider:

- metadata
- canonical
- Open Graph
- semantic H1
- internal links
- BreadcrumbList
- Service schema
- Article schema
- JobPosting schema

Only add schema supported by the actual content.

---

# 15. Forms Rules

Future forms should use shared patterns.

Preferred direction:

```text
React Hook Form
Zod
server-side validation
Server Actions / Route Handlers
anti-spam
rate limiting
secure uploads
email abstraction
```

Do not put email secrets or SMTP credentials in client components.

Do not hardcode recipient addresses in multiple files.

---

# 16. Safe Editing Workflow

For every task:

## Step 1 — Inspect

Open:

- the target component
- its CSS module
- directly imported helpers
- relevant parent integration
- animation hooks that target it

## Step 2 — State the Scope Internally

Example:

```text
Only increase body copy font size in ProblemsWeSolve cards.
Do not alter layout, colors, pin behavior or diagrams.
```

## Step 3 — Modify Minimal Files

Do not perform unrelated cleanup.

Do not rename classes that animations depend on.

## Step 4 — Verify Syntax

Run the appropriate parser/build tools.

At minimum, catch:

- malformed JSX
- missing imports
- wrong relative paths
- duplicate exports
- CSS brace errors
- TypeScript errors

## Step 5 — Verify Project

Where scripts exist:

```bash
npm run lint
npm run typecheck
npm run build
```

Also run relevant tests.

## Step 6 — Visual QA

Check:

- intended change
- desktop
- laptop
- mobile
- content overflow
- animation
- unrelated sections

## Step 7 — Stop

Do not continue into another section unless requested.

---

# 17. Build Error Discipline

When a build error appears:

1. read the exact compiler line
2. inspect surrounding source
3. fix the smallest syntax/integration issue
4. rerun parser/build
5. do not redesign the component as part of the fix

Example lesson from `ProblemsWeSolve`:

A removed JSX block left an extra closing `</div>`, causing the parser to fail later at `</section>`.

The line reported by the compiler may be where parsing finally fails, not where the actual mistake begins.

---

# 18. CSS Cleanup Discipline

Dead CSS cleanup is allowed only when requested or clearly necessary.

Safe cleanup order:

1. inspect class usage
2. inspect nested selectors
3. inspect animations
4. inspect JS/GSAP queries
5. remove clear dead rules
6. run build
7. visually compare

Do not collapse or reorder the cascade casually.

Late overrides may intentionally protect:

- short viewport layouts
- responsive fixes
- animation states
- browser-specific behavior

---

# 19. Git / Change Discipline

Prefer small, focused commits.

Good:

```text
fix: prevent ProblemsWeSolve cards clipping on short laptops
feat: add HowWeBuild section
refactor: extract service route data
```

Bad:

```text
update website
changes
final fix
```

Before a large refactor, create a branch or safe copy.

Do not overwrite a known-good implementation without a rollback path.

---

# 20. Next Planned Work

`Problems We Solve` is finalized.

The next planned new homepage section is:

```text
How We Build
```

Do **not** start automatically.

When asked to begin:

1. inspect current homepage
2. confirm insertion point
3. create design/content concept
4. build it in isolation
5. integrate without touching Problems We Solve
6. verify
7. stop for approval
