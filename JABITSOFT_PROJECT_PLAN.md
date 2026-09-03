# JabitSoft — Project & Implementation Plan

## Purpose

This file is the planning source of truth for taking the approved JabitSoft homepage and turning it into a scalable, multi-page, production website.

It covers:

- homepage roadmap
- route expansion
- content structure
- forms and email
- blog / CMS
- products
- SEO
- performance
- responsive quality
- implementation order

---

# 1. Non-Negotiable Principle

This is a **pixel-safe product expansion**, not an open-ended redesign.

```text
Approved design = visual source of truth.
```

Existing approved components may be refactored internally, but their output should stay visually and behaviorally consistent unless the task specifically requests a design change.

---

# 2. Technical Direction

Target stack:

```text
Next.js App Router
TypeScript
React
Tailwind CSS
CSS Modules where complexity justifies them
GSAP + ScrollTrigger
one global Lenis instance
next/image
next/font
Metadata API
ESLint
Prettier
```

Default to Server Components.

Use Client Components only for:

- state
- browser APIs
- GSAP
- event handling
- mobile navigation
- accordions
- carousels
- modals
- form interaction
- other genuinely client-only behavior

---

# 3. Project Status

## Foundation

Status: COMPLETE / established

Already established direction includes:

- Next.js App Router foundation
- TypeScript
- ESLint / Prettier
- `next/font`
- global styles/tokens
- metadata helpers
- sitemap / robots foundation
- reusable container/provider direction
- legacy Vite scripts preserved during migration
- SEO utilities direction

Do not redo foundation work without checking the current repository first.

---

# 4. Homepage Roadmap

## 4.1 Header

Status: EXISTING / APPROVED

Navigation:

```text
About
Portfolio
Services
Careers
Blog
Contact
```

Requirements:

- logo → `/`
- no Home menu item
- title case labels
- Services mega-menu
- keyboard accessible
- Escape closes
- mobile expandable navigation
- 14px / 500 / 21px Inter menu typography

Do not replace the current header with a UI-library navbar.

---

## 4.2 Hero

Status: EXISTING / APPROVED

Goals:

- communicate JabitSoft's software-engineering value immediately
- retain approved inline image treatment
- keep existing entrance choreography
- coordinate correctly with the site loader

Do not alter hero structure during unrelated tasks.

---

## 4.3 Trust / Client Signal

Status: EXISTING

Use real client logos only.

Preferred behavior:

- clean horizontal marquee
- restrained motion
- no invented trust counts or logos

---

## 4.4 Intro / Positioning

Status: EXISTING

Purpose:

- explain what JabitSoft helps a business achieve
- bridge the story from brand promise into actual business problems

If it already has intentional word-based motion, do not add a second reveal effect.

---

## 4.5 Problems We Solve

Status: FINAL / LOCKED

This section is complete.

Problems:

1. Disconnected systems
2. Manual workflows
3. Products that do not scale
4. AI without a clear use case
5. Fragmented customer experiences

Final design/behavior:

- desktop pinned story
- problem navigation rail
- active story content
- animated problem-specific diagram
- three insight/result cards
- mobile normal reading flow
- main heading uses reusable `RevealHeading`
- main heading remains fully black
- `Capabilities we bring` has been removed
- supporting copy is readable at larger sizes
- bottom cards fit without clipping
- section animations clean up locally
- one global Lenis remains untouched

**Do not change this section unless explicitly requested.**

---

## 4.6 Services Directory

Status: EXISTING / KEEP

Services:

1. Agentic AI Development
2. Cloud Consulting
3. Mobile Application Development
4. ERP Services
5. SEO / Digital Marketing
6. Website Solutions

Purpose:

- fast capability overview
- route users into service detail pages

Direction:

- white/light section
- six service rows
- animated diagram/preview on desktop
- mobile simplified intentionally
- no unnecessary hover background

---

## 4.7 Featured Service Cards

Status: OPTIONAL

Decision rule:

If this section repeats the Services Directory without adding meaningful narrative or proof, remove it.

Do not keep a section merely because code exists for it.

---

## 4.8 Recent Works

Status: EXISTING / REFINE ONLY AS NEEDED

Purpose:

Primary project proof and case-study teaser.

Known project concepts:

- FlowOps
- Nexa AI
- CoreERP

Desired motion direction:

- Skiper17-inspired desktop pinned stack
- current card scales/rotates subtly
- next card enters from below
- mobile remains simpler and vertical
- no extra Lenis
- no global ScrollTrigger kill

Content should eventually connect to real case-study routes.

---

## 4.9 How We Build

Status: NEXT NEW SECTION / NOT STARTED

Do not implement until explicitly requested.

Purpose:

Explain how JabitSoft moves from a business problem to a production solution.

Suggested stages:

```text
Understand
Architect
Build
Launch & Scale
```

Each stage should answer:

- what happens
- why it matters
- what the client receives

Avoid:

- four generic equal cards
- stock icons
- meaningless process jargon

Preferred direction:

- connected system / journey
- progress moves through stages
- strong editorial explanation
- subtle purposeful motion
- mobile becomes readable vertical steps

---

## 4.10 Company Stats

Status: EXISTING

Use only real, supportable numbers.

If any current figure is placeholder/demo content, it must be verified before production.

---

## 4.11 Client Results / Testimonials

Status: EXISTING

Purpose:

- customer proof
- outcomes
- real testimonial content

Rules:

- never invent names or quotes
- preserve current approved card behavior
- ensure mobile readability

---

## 4.12 Why JabitSoft

Status: PLANNED

Purpose:

Answer:

> Why JabitSoft instead of another software development company?

Potential positioning:

- business-first engineering
- scalable architecture
- strategy + design + engineering in one flow
- practical AI adoption
- maintainable systems
- direct collaboration
- long-term support

Avoid another generic icon-card grid.

---

## 4.13 Founder / Company

Status: EXISTING

Use to humanize the company and add credibility.

Do not turn it into fake founder-story marketing copy.

---

## 4.14 FAQ

Status: EXISTING

Rules:

- accessible accordion
- all items initially closed if that remains the approved behavior
- content should reflect real software/service questions

---

## 4.15 Latest Insights / Blog Preview

Status: EXISTING / CMS-READY LATER

Purpose:

- demonstrate expertise
- create internal links to content
- support SEO

Do not hardwire the long-term blog architecture to one static file per article.

---

## 4.16 Final CTA

Status: PLANNED

Purpose:

Close the homepage with one clear next step.

Direction:

- strong, concise
- visually distinctive but still on-brand
- contact/project-enquiry action
- no fake urgency

---

# 5. Page Roadmap

## About

Suggested flow:

```text
Hero
Company story
How we think
Mission / vision
Leadership
Team
Values
Real milestones
Credibility
CTA
```

Do not invent company history, years, headcount or awards.

---

## Portfolio / Work Index

Suggested flow:

```text
Hero
Featured work
Project grid
Filters only if enough real projects exist
Capabilities
Industries if supportable
Results
CTA
```

---

## Case Study Detail

Suggested flow:

```text
Hero
Overview
Challenge
Strategy
Solution
Product / screen visuals
Key features
Tech stack
Verified impact
Real testimonial
Gallery
Related work
CTA
```

No fake metrics.

---

## Services Index

Suggested flow:

```text
Hero
Services directory
Problems clients bring
Capabilities
Process
Technology
Relevant work
Why JabitSoft
FAQ
CTA
```

---

## Service Detail

Common structure:

```text
Service hero
Business problems
What we deliver
Capabilities
Process
Technology
Relevant work
Why JabitSoft
FAQ
CTA
```

Each service page should have its own emphasis; do not make six pages that feel copy-pasted.

Routes:

```text
/services/agentic-ai-development
/services/cloud-consulting
/services/mobile-application-development
/services/erp-services
/services/seo-digital-marketing
/services/website-solutions
```

---

## Careers

Suggested flow:

```text
Hero
Why work here
Culture
Values
Benefits
Open positions
Internship
Hiring process
Real employee stories if available
CTA / application
```

---

## Job Detail

Suggested flow:

```text
Role hero
Role overview
Responsibilities
Required skills
Preferred skills
Work type/location
Benefits
Hiring process
Apply
```

---

## Internship

Suggested flow:

```text
Hero
Program overview
What interns learn
Tracks
Eligibility
Process
Why join
Application form
```

---

## Blog

Architecture should support:

```text
/blog
/blog/[slug]
/blog/category/[slug]
/blog/author/[slug]
```

Keep a CMS abstraction layer so the source can change later.

Likely future direction:

- CMS-backed content
- ISR where useful
- reusable post schema/types
- SEO metadata per article

---

## Contact

Suggested flow:

```text
Hero
Project/contact form
Contact details
Office locations
What happens next
FAQ
```

---

## Products — Future

Reserve scalable structure for future products.

Potential routes:

```text
/products
/products/[slug]
/products/[slug]/pricing
/products/[slug]/docs
```

Potential sections:

- product hero
- features
- benefits
- screenshots
- pricing
- FAQ
- CTA / demo
- waitlist

Do not build product infrastructure prematurely.

---

# 6. Forms & Email Plan

Future forms:

- Contact
- Project enquiry
- CTA lead
- Internship application
- Job application
- Product waitlist

Preferred stack:

```text
React Hook Form
Zod
Server Actions / Route Handlers
server-side validation
rate limiting
anti-spam
secure upload handling
```

Email architecture:

```text
lib/email/sendEmail.ts
```

Provider should be swappable.

Possible providers:

- Resend
- Postmark
- AWS SES
- SendGrid
- Brevo
- SMTP

Do not lock the UI to a provider.

Possible recipient env vars:

```text
CONTACT_EMAIL
SALES_EMAIL
HR_EMAIL
CAREERS_EMAIL
PRODUCT_EMAIL
FROM_EMAIL
```

---

# 7. SEO Plan

For every production route:

- unique title
- unique description
- canonical
- semantic H1
- internal links
- Open Graph where appropriate
- structured data only when valid
- indexation rules
- sitemap inclusion

Potential schema:

- Organization
- WebSite
- Service
- BreadcrumbList
- Article
- JobPosting

Only use schema that matches real page content.

---

# 8. Performance Plan

Targets:

- minimize unnecessary Client Components
- lazy-load heavy interactive sections where reasonable
- use `next/image`
- use `next/font`
- reduce oversized assets
- avoid excessive GSAP timelines
- avoid layout shift
- keep one Lenis
- clean ScrollTriggers locally
- do not animate offscreen content without purpose

Performance optimization must not alter approved visuals without approval.

---

# 9. Responsive Plan

Every section must be verified at minimum for:

```text
large desktop
standard desktop/laptop
short laptop viewport
tablet
mobile
small mobile
```

Important for pinned sections:

- never let fixed/pinned layouts clip content
- reduce visual height before shrinking readable body copy too far
- mobile should generally use normal document flow instead of forced desktop pinning

---

# 10. Accessibility Floor

Maintain:

- semantic headings
- keyboard navigation
- visible focus
- accessible buttons
- accessible accordion/menu state
- meaningful labels
- reduced-motion behavior
- no important information only on hover
- reasonable contrast

---

# 11. Implementation Phases

## Phase A — Homepage Completion

1. Keep approved Header/Hero/Trust/Intro stable
2. Problems We Solve — COMPLETE
3. Verify Services Directory
4. Decide whether Featured Service Cards stay
5. Finalize Recent Works
6. Build How We Build
7. Verify Company Stats
8. Finalize Client Results
9. Build Why JabitSoft
10. Verify Founder
11. Finalize FAQ
12. Prepare Latest Insights for CMS
13. Build Final CTA
14. Homepage full responsive QA
15. Homepage performance QA

---

## Phase B — Core Marketing Routes

1. About
2. Services index
3. six service detail pages
4. Portfolio index
5. case study template
6. Contact
7. Legal pages

---

## Phase C — Careers

1. Careers index
2. job detail template
3. Internship
4. application flows
5. CV upload
6. email notification flow

---

## Phase D — Blog / Content

1. CMS abstraction
2. blog index
3. article template
4. categories/authors
5. SEO/schema
6. ISR/revalidation strategy

---

## Phase E — Forms / CRM Readiness

1. shared validation
2. server actions/routes
3. email abstraction
4. anti-spam
5. rate limiting
6. storage strategy
7. analytics/event hooks
8. CRM adapter if needed

---

## Phase F — Products

Only when product requirements are real.

---

## Phase G — Final Production QA

- lint
- typecheck
- tests
- build
- responsive
- keyboard
- reduced motion
- broken links
- metadata
- structured data
- sitemap/robots
- forms
- email
- image optimization
- Core Web Vitals review

---

# 12. Immediate Next Work

Current recommended next section:

```text
How We Build
```

But **do not start it automatically**.

Before implementation:

1. user explicitly asks to start
2. inspect current homepage files
3. confirm exact insertion location
4. design section in isolation
5. integrate with minimal scope
6. verify Problems We Solve remains untouched
7. stop after that section is approved
