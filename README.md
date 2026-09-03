# JabitSoft Website

Production-ready JabitSoft company website built with Next.js while preserving the approved visual design and interaction language of the current website.

> This project is an architecture and product expansion of the approved JabitSoft website, not a redesign.

---

## Project Goals

The codebase is being prepared to support:

- Homepage
- About
- Portfolio / Work
- Case studies
- Services
- Individual service pages
- Careers
- Job detail pages
- Internship page
- Contact
- Blog / CMS
- Forms and transactional email
- Resume / CV uploads
- SEO and structured data
- Future CRM / database integration
- Future product landing pages, pricing and waitlists

The project should remain maintainable as it grows from a homepage into a multi-page software-company website.

---

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- CSS Modules for complex, section-specific visuals
- GSAP + ScrollTrigger for intentional motion
- Lenis for global smooth scrolling
- `next/image`
- `next/font`
- Next.js Metadata API
- ESLint
- Prettier

Planned form stack:

- React Hook Form
- Zod
- Server Actions and/or Route Handlers
- email provider abstraction
- anti-spam / rate limiting
- secure upload handling

---

## Critical Design Rule

The current approved JabitSoft website is the visual source of truth.

Architecture can change, but approved UI must not be casually changed.

Preserve unless a task explicitly requests otherwise:

- typography
- font sizes
- line heights
- colors
- spacing
- section heights
- container widths
- borders
- radii
- shadows
- gradients
- images and crops
- cards
- diagrams
- buttons
- hover states
- responsive behavior
- GSAP interactions
- pinned sections
- entrance animations

If cleaner architecture conflicts with visual parity, visual parity wins.

---

## Styling Policy

Use Tailwind for straightforward layout and utility styling.

Use CSS Modules when the section has:

- complex diagrams
- animation-specific selectors
- layered visuals
- detailed responsive composition
- selectors that GSAP queries directly

Do not rewrite a stable CSS Module into Tailwind just for the sake of reducing CSS.

---

## Motion Rules

- Use exactly one global Lenis instance.
- Do not create a second Lenis instance inside a section.
- Scope ScrollTrigger cleanup to the triggers created by that component.
- Do not globally kill all ScrollTriggers.
- Respect `prefers-reduced-motion`.
- Motion should support the story, not decorate every element.
- Existing approved scroll behavior must remain stable during unrelated work.

---

## Current Homepage Direction

Recommended final flow:

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
Client Results / Testimonials
Why JabitSoft
Founder / Company
FAQ
Latest Insights
Final CTA
Footer
```

The Featured Service Card Carousel is optional and should remain only if it adds value beyond the Services Directory.

---

## Current Locked Section: Problems We Solve

`Problems We Solve` is now considered finalized.

Expected location:

```text
src/components/sections/ProblemsWeSolve/
├── ProblemsWeSolve.tsx
└── ProblemsWeSolve.module.css
```

Final behavior:

- desktop pinned story progression
- five problem states
- active problem navigation
- animated system/workflow/scale/AI/experience diagrams
- GSAP transitions between stories
- mobile non-pinned reading flow
- main H2 uses the existing `RevealHeading`
- main H2 remains fully black
- larger readable supporting copy
- three bottom insight/result cards remain visible without clipping
- `Capabilities we bring` was removed
- no second Lenis instance

Do not edit this section unless a task explicitly asks for it.

---

## Services

Current service set:

1. Agentic AI Development
2. Cloud Consulting
3. Mobile Application Development
4. ERP Services
5. SEO / Digital Marketing
6. Website Solutions

Planned routes:

```text
/services/agentic-ai-development
/services/cloud-consulting
/services/mobile-application-development
/services/erp-services
/services/seo-digital-marketing
/services/website-solutions
```

---

## Header Navigation

Final desktop labels:

```text
About
Portfolio
Services
Careers
Blog
Contact
```

Rules:

- no Home menu item
- logo links to `/`
- Services has desktop mega-menu behavior
- mobile uses an expandable/accordion interaction
- existing approved header styling remains the source of truth

Navigation typography target:

```text
Inter
14px
500
21px line-height
rgb(19, 19, 19)
```

---

## Reveal Headings

The project already uses a reusable `RevealHeading`.

Use it for prominent H1/H2 headings where appropriate.

Rules:

- reveal animation controls motion only
- do not let generated character spans change heading color or typography
- preserve natural word wrapping
- do not animate eyebrow labels character-by-character
- do not double-animate text that already has its own scroll animation

---

## Project Structure Direction

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── robots.ts
│   ├── sitemap.ts
│   ├── (marketing)/
│   └── (content)/
│
├── components/
│   ├── layout/
│   ├── sections/
│   ├── common/
│   ├── ui/
│   └── providers/
│
├── features/
│   ├── home/
│   ├── services/
│   ├── work/
│   ├── careers/
│   ├── products/
│   └── forms/
│
├── data/
├── hooks/
├── lib/
├── styles/
└── types/
```

Do not reorganize the repository purely to match this diagram if the current production structure is already working. Refactor incrementally.

---

## Local Development

Install dependencies:

```bash
npm install
```

Start the Next.js development server:

```bash
npm run dev
```

Production build:

```bash
npm run build
```

Run lint if present:

```bash
npm run lint
```

Run type checking if present:

```bash
npm run typecheck
```

Legacy Vite scripts may still exist during migration:

```bash
npm run legacy:dev
npm run legacy:build
npm run legacy:preview
```

Always check the current `package.json` before assuming a script exists.

---

## Environment Variables

Never commit secrets.

Use `.env.local` for real local values and maintain `.env.example` for documented variable names.

Future form/email variables may include:

```text
CONTACT_EMAIL
SALES_EMAIL
HR_EMAIL
CAREERS_EMAIL
PRODUCT_EMAIL
FROM_EMAIL
```

Provider-specific secrets should stay behind an email abstraction rather than leaking into components.

---

## SEO Rules

Use the project's SEO utilities / installed SEO skill when implementing routes.

Expected coverage:

- metadata
- canonical URLs
- sitemap
- robots
- semantic headings
- Open Graph
- structured data
- internal linking
- service-page SEO
- blog SEO
- product SEO

Never invent:

- reviews
- ratings
- metrics
- awards
- client results
- certifications
- testimonials

---

## Content Rules

Copy should sound like a credible software company.

Prefer:

- clear
- concise
- business-aware
- technically accurate
- outcome-oriented

Avoid:

- AI-fluff
- keyword stuffing
- fake proof
- generic “digital transformation” filler
- invented numbers

---

## Contribution Workflow

Before editing:

1. Inspect the exact current file.
2. Understand existing animation selectors and responsive rules.
3. Define the smallest scope needed.
4. Change only that scope.
5. Run lint / typecheck / build where available.
6. Verify desktop and mobile.
7. Verify unrelated sections did not change.

Do not rebuild a component from memory when the actual file is available.

---

## Repository

```text
https://github.com/kshitiz-chaudhary-8890/jabitsoft.git
```

---

## Project Documentation

Read these before large changes:

```text
README.md
JABITSOFT_PROJECT_PLAN.md
CODING_AGENT_GUIDE.md
```

`README.md` explains the project.

`JABITSOFT_PROJECT_PLAN.md` defines roadmap and page/section direction.

`CODING_AGENT_GUIDE.md` defines how an AI coding agent must work safely in this repository.
