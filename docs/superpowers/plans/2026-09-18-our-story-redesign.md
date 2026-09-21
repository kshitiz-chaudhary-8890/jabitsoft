# Our Story Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the pinned horizontal-scroll Our Story section with a vertical editorial layout — sticky era visual left, 4 milestone blocks right.

**Architecture:** CSS `position: sticky` for the era column, GSAP ScrollTrigger only for entrance reveals (`once: true`) and era-activation class toggles (CSS transitions do the crossfade). Component + CSS module rewritten in place; export name, section id and `data-story-head` attributes preserved.

**Tech Stack:** Next.js (App Router), React 19, GSAP + ScrollTrigger, CSS Modules, Vitest + Testing Library.

## Global Constraints

- Spec: `docs/superpowers/specs/2026-09-18-our-story-redesign-design.md`
- Use About-page tokens only (`--about-*` from `about-us.module.css`); no hardcoded one-off values where a token exists.
- No pinning, no scrubbed horizontal scroll; only the shared `section-heading-fill` scrub remains.
- `prefers-reduced-motion: reduce`: all content visible, no animation, era visual static (first milestone), dots hidden.
- Era column is decorative (`aria-hidden="true"`); milestone order conveys the narrative.
- Section id `our-story`, export `OurStory`, `aria-labelledby="our-story-title"` unchanged (import in `about-us/page.tsx` must keep working).
- **Commits are deferred** — the working tree has extensive unrelated WIP; do not stage or commit. User commits when ready.

---

### Task 1: Failing test for the redesigned section

**Files:**

- Create: `src/components/pages/about/OurStory/OurStory.test.tsx`

**Interfaces:**

- Consumes: `OurStory` (named export from `./OurStory`)
- Produces: regression tests asserting 4 milestones, heading copy, anchor id.

- [ ] **Step 1: Write the failing test**

```tsx
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi, beforeAll } from "vitest";

vi.mock("gsap", () => ({
  gsap: {
    registerPlugin: vi.fn(),
    set: vi.fn(),
    to: vi.fn(),
    fromTo: vi.fn(),
    context: (fn: () => void) => {
      fn();
      return { revert: vi.fn() };
    },
    timeline: vi.fn(() => ({ to: vi.fn().mockReturnThis() })),
  },
}));
vi.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: { create: vi.fn() },
}));

import { OurStory } from "./OurStory";

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockReturnValue({ matches: true, addEventListener: vi.fn() }),
  });
});

afterEach(() => cleanup());

describe("OurStory", () => {
  it("renders the eyebrow, display heading and intro", () => {
    render(<OurStory />);
    expect(screen.getByText("(Our Story)")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      /Two decades of building software that lasts/i,
    );
    expect(screen.getByText(/Founded in Noida in 2007/i)).toBeInTheDocument();
  });

  it("renders four milestones with the condensed narrative", () => {
    render(<OurStory />);
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(4);
    expect(screen.getByText("A technology-first start.")).toBeInTheDocument();
    expect(screen.getByText("Work where trust is non-negotiable.")).toBeInTheDocument();
    expect(screen.getByText("From web and mobile to enterprise systems.")).toBeInTheDocument();
    expect(screen.getByText("AI, cloud, and the full digital stack.")).toBeInTheDocument();
  });

  it("keeps the our-story anchor id", () => {
    render(<OurStory />);
    expect(screen.getByRole("region", { name: /Two decades/i })).toHaveAttribute("id", "our-story");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/pages/about/OurStory/OurStory.test.tsx`
Expected: FAIL — old component renders 6 chapter panels (getAllByRole h3 length 6, not 4).

---

### Task 2: Rewrite component + styles

**Files:**

- Modify: `src/components/pages/about/OurStory/OurStory.tsx` (full rewrite)
- Modify: `src/components/pages/about/OurStory/OurStory.module.css` (full rewrite)

**Interfaces:**

- Consumes: gsap, ScrollTrigger, About-page CSS custom properties.
- Produces: same named export `OurStory`; `data-story-intro`, `data-story-article`, `data-story-head`, `data-story-copy`, `data-story-meta`, `data-era`, `data-era-dot` hooks; `data-story-head` keeps the page-level h3 sizing rule in `about-us.module.css` working.

- [ ] **Step 1: Replace `OurStory.tsx` with the vertical editorial component**

```tsx
"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./OurStory.module.css";

type Milestone = {
  index: string;
  label: string;
  head: string;
  copy: string;
  meta: string;
};

const MILESTONES: Milestone[] = [
  {
    index: "01",
    label: "Beginnings",
    head: "A technology-first start.",
    copy: "Baldeep Singh founded JabitSoft in Noida in 2007 with a technology-first mindset and a commitment to building software businesses could rely on. From the beginning, the work was shaped by a hands-on approach and a focus on long-term partnerships — not transactions.",
    meta: "Since 2007 · Noida, India",
  },
  {
    index: "02",
    label: "Trust earned",
    head: "Work where trust is non-negotiable.",
    copy: "Nearly two decades of work spans industries, including collaborations with government organizations such as the Defense, Navy, and Air Force — contexts where quality, trust, and innovation are non-negotiable, and where the standard was set for everything that followed.",
    meta: "Across industries · Government grade",
  },
  {
    index: "03",
    label: "What we built",
    head: "From web and mobile to enterprise systems.",
    copy: "The practice specialized in custom web, mobile, and enterprise solutions — and today builds ERP systems, billing software, mobile applications, and web platforms. Each product is shaped around clean UI, strong performance, and long-term reliability.",
    meta: "Web · Mobile · Enterprise · ERP",
  },
  {
    index: "04",
    label: "Today & next",
    head: "AI, cloud, and the full digital stack.",
    copy: "JabitSoft now crafts solutions across the full digital stack for businesses worldwide — smart, secure and scalable software that simplifies complexity, supports measurable growth and earns long-term trust, with partnership that continues beyond launch.",
    meta: "AI · Cloud · Worldwide",
  },
];

/** Split an element's text into masked word wrappers for a cascading reveal. */
function splitWords(el: Element): Element[] {
  const text = el.textContent ?? "";
  el.setAttribute("aria-label", text.trim());
  el.innerHTML = "";
  const words = text.split(/\s+/).filter(Boolean);
  const inners: Element[] = [];
  words.forEach((word, index) => {
    const wrap = document.createElement("span");
    wrap.className = styles.word;
    wrap.setAttribute("aria-hidden", "true");
    const inner = document.createElement("span");
    inner.className = styles.wordInner;
    inner.textContent = word;
    wrap.appendChild(inner);
    el.appendChild(wrap);
    inners.push(inner);
    if (index < words.length - 1) el.appendChild(document.createTextNode(" "));
  });
  return inners;
}

export function OurStory() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const intro = section.querySelectorAll("[data-story-intro]");
      const headingFill = section.querySelector(".section-heading-fill");
      const articles: Element[] = Array.from(section.querySelectorAll("[data-story-article]"));
      const heads: Element[] = Array.from(section.querySelectorAll("[data-story-head]"));
      const eras: Element[] = Array.from(section.querySelectorAll("[data-era]"));
      const dots: Element[] = Array.from(section.querySelectorAll("[data-era-dot]"));

      if (reduced) return;

      const headInners: Element[] = [];
      heads.forEach((h) => headInners.push(...splitWords(h)));

      // Header entrance.
      gsap.set(intro, { autoAlpha: 0, y: 34 });
      gsap
        .timeline({
          defaults: { ease: "power4.out" },
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            once: true,
            invalidateOnRefresh: true,
          },
        })
        .to(intro, { autoAlpha: 1, y: 0, duration: 0.62, stagger: 0.08 }, 0);

      // Shared page heading fill scrub.
      if (headingFill) {
        gsap.fromTo(
          headingFill,
          { backgroundSize: "0% 100%, 100% 100%" },
          {
            backgroundSize: "100% 100%, 100% 100%",
            ease: "none",
            scrollTrigger: {
              trigger: headingFill,
              start: "top 88%",
              end: "bottom 42%",
              scrub: 0.9,
              invalidateOnRefresh: true,
            },
          },
        );
      }

      // Milestone entrance reveals (once).
      gsap.set(headInners, { yPercent: 115 });
      articles.forEach((article) => {
        const head = article.querySelector("[data-story-head]");
        const copy = article.querySelector("[data-story-copy]");
        const meta = article.querySelector("[data-story-meta]");

        if (head) {
          const inners = Array.from(head.querySelectorAll(`.${styles.wordInner}`));
          gsap.to(inners, {
            yPercent: 0,
            duration: 0.9,
            stagger: 0.04,
            ease: "expo.out",
            scrollTrigger: { trigger: article, start: "top 78%", once: true },
          });
        }

        if (copy) {
          gsap.fromTo(
            copy,
            { autoAlpha: 0, y: 22 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: { trigger: copy, start: "top 85%", once: true },
            },
          );
        }

        if (meta) {
          gsap.fromTo(
            meta,
            { autoAlpha: 0, y: 16 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.6,
              ease: "power3.out",
              scrollTrigger: { trigger: meta, start: "top 88%", once: true },
            },
          );
        }
      });

      // Era activation — class toggles only; CSS owns the crossfade.
      articles.forEach((article, i) => {
        ScrollTrigger.create({
          trigger: article,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (!self.isActive) return;
            eras.forEach((era, j) => era.classList.toggle(styles.eraActive, j === i));
            dots.forEach((dot, j) => dot.classList.toggle(styles.dotActive, j === i));
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="our-story"
      className={styles.section}
      aria-labelledby="our-story-title"
    >
      <div className={styles.head}>
        <p data-story-intro className={styles.eyebrow}>
          (Our Story)
        </p>
        <h2 id="our-story-title" className={styles.display}>
          <span className="section-heading-fill">Two decades of building software that lasts.</span>
        </h2>
        <p data-story-intro className={styles.description}>
          Founded in Noida in 2007, JabitSoft has grown from a custom software development partner
          into a team delivering web platforms, mobile applications, ERP and billing systems, cloud
          solutions and applied AI.
        </p>
      </div>

      <div className={styles.body}>
        <div className={styles.eraCol} aria-hidden="true">
          <div className={styles.eraStack}>
            {MILESTONES.map((m, i) => (
              <div
                key={m.index}
                data-era
                className={`${styles.era} ${i === 0 ? styles.eraActive : ""}`}
              >
                <span className={styles.eraNumber}>{m.index}</span>
                <span className={styles.eraLabel}>{m.label}</span>
              </div>
            ))}
          </div>
          <p className={styles.eraAnchor}>Since 2007 · Noida</p>
          <div className={styles.eraDots}>
            {MILESTONES.map((m, i) => (
              <span
                key={m.index}
                data-era-dot
                className={`${styles.eraDot} ${i === 0 ? styles.dotActive : ""}`}
              />
            ))}
          </div>
        </div>

        <div className={styles.milestones}>
          {MILESTONES.map((m) => (
            <article key={m.index} data-story-article className={styles.milestone}>
              <p className={styles.chip}>
                <span className={styles.chipIndex}>{m.index}</span>
                <span className={styles.chipLabel}>{m.label}</span>
              </p>
              <h3 data-story-head className={styles.milestoneHead}>
                {m.head}
              </h3>
              <p data-story-copy className={styles.milestoneCopy}>
                {m.copy}
              </p>
              <p data-story-meta className={styles.milestoneMeta}>
                {m.meta}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Replace `OurStory.module.css`**

```css
.section,
.section * {
  box-sizing: border-box;
}

.section {
  position: relative;
  overflow: clip;
  background: #ffffff;
  border-top: 1px solid var(--about-line);
  color: var(--about-ink);
}

/* ---------- Header ---------- */

.head {
  width: var(--about-shell-width);
  margin-inline: auto;
  padding: var(--about-section-space) 0 clamp(48px, 6vw, 84px);
}

.eyebrow {
  margin: 0 0 var(--about-eyebrow-gap);
  color: var(--about-eyebrow-color);
  font: var(--about-eyebrow-font);
  letter-spacing: var(--about-eyebrow-tracking);
}

/* Size/leading/tracking come from the page-level h2 rule in about-us.module.css. */
.display {
  margin: 0;
  max-width: 18ch;
  color: var(--about-heading-color);
}

.description {
  max-width: var(--about-copy-measure);
  margin: var(--about-copy-gap) 0 0;
  color: var(--about-copy-color);
  text-wrap: pretty;
}

/* ---------- Body grid ---------- */

.body {
  display: grid;
  grid-template-columns: minmax(240px, 0.42fr) minmax(0, 1fr);
  gap: clamp(40px, 6vw, 96px);
  align-items: start;
  width: var(--about-shell-width);
  margin-inline: auto;
  padding-bottom: var(--about-section-space);
}

/* ---------- Sticky era visual ---------- */

.eraCol {
  position: sticky;
  top: clamp(88px, 12vh, 132px);
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.eraStack {
  position: relative;
  height: clamp(200px, 22vw, 290px);
}

.era {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
  opacity: 0;
  transform: translateY(14px);
  transition:
    opacity 0.4s ease,
    transform 0.4s ease;
  pointer-events: none;
}

.era.eraActive {
  opacity: 1;
  transform: translateY(0);
}

.eraNumber {
  color: var(--about-blue);
  font-family: var(--font-plus-jakarta-sans), "Plus Jakarta Sans", sans-serif;
  font-size: clamp(170px, 20vw, 260px);
  font-weight: 700;
  line-height: 0.82;
  letter-spacing: -0.05em;
  font-variant-numeric: tabular-nums;
}

.eraLabel {
  color: var(--about-muted);
  font:
    600 12px/1.4 var(--font-inter),
    Inter,
    sans-serif;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.eraAnchor {
  margin: 0;
  color: var(--about-copy-color);
  font:
    550 12px/1.4 var(--font-inter),
    Inter,
    sans-serif;
  letter-spacing: 0.08em;
}

.eraDots {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-left: 2px;
}

.eraDot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--about-line-strong);
  transition:
    background 0.3s ease,
    transform 0.3s ease;
}

.eraDot.dotActive {
  background: var(--about-blue-deep);
  transform: scale(1.2);
}

/* ---------- Milestones ---------- */

.milestones {
  display: flex;
  flex-direction: column;
}

.milestone {
  padding: clamp(36px, 5vw, 64px) 0;
  border-top: 1px solid var(--about-line);
}

.milestone:first-child {
  padding-top: 0;
  border-top: 0;
}

/* Compact inline era chip — hidden on desktop, shown when the era column hides. */
.chip {
  display: none;
  margin: 0 0 14px;
  align-items: center;
  gap: 10px;
}

.chipIndex {
  color: var(--about-blue);
  font:
    700 12px/1 var(--font-inter),
    Inter,
    sans-serif;
  letter-spacing: 0.12em;
  font-variant-numeric: tabular-nums;
}

.chipLabel {
  color: var(--about-muted);
  font:
    600 11px/1 var(--font-inter),
    Inter,
    sans-serif;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

/* Headline size comes from the page-level h3[data-story-head] rule. */
.milestoneHead {
  margin: 0;
  max-width: 22ch;
  color: var(--about-heading-color);
}

.milestoneHead .word {
  display: inline-block;
  overflow: hidden;
  vertical-align: top;
  padding-bottom: 0.09em;
  margin-bottom: -0.09em;
}

.milestoneHead .wordInner {
  display: inline-block;
  will-change: transform;
}

.milestoneCopy {
  max-width: 58ch;
  margin: clamp(16px, 2vw, 22px) 0 0;
  color: var(--about-copy-color);
  font:
    400 clamp(16px, 1.2vw, 18px) / 1.65 var(--font-inter),
    Inter,
    sans-serif;
  text-wrap: pretty;
}

.milestoneMeta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: clamp(18px, 2.2vw, 26px) 0 0;
  color: var(--about-muted);
  font:
    600 11px/1 var(--font-inter),
    Inter,
    sans-serif;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.milestoneMeta::before {
  content: "";
  width: 22px;
  height: 1px;
  background: var(--about-blue);
}

/* ---------- Mobile / tablet ---------- */

@media (max-width: 680px) {
  .body {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .eraCol {
    display: none;
  }

  .chip {
    display: flex;
  }

  .milestone {
    padding: 34px 0;
  }

  .milestoneCopy {
    font-size: 15px;
  }
}

/* ---------- Reduced motion ---------- */

@media (prefers-reduced-motion: reduce) {
  .milestoneHead .wordInner {
    transform: none !important;
  }

  .era,
  .eraDot {
    transition: none;
  }

  .eraDots {
    display: none;
  }
}
```

- [ ] **Step 3: Run the component test**

Run: `npx vitest run src/components/pages/about/OurStory/OurStory.test.tsx`
Expected: PASS (3 tests).

---

### Task 3: Full verification

- [ ] **Step 1: Typecheck** — `npm run typecheck` → no errors.
- [ ] **Step 2: Lint** — `npm run lint` → no errors.
- [ ] **Step 3: Format** — `npx prettier --check` on the four touched files → pass (run `--write` if needed).
- [ ] **Step 4: Full test suite** — `npm test` → all green.
- [ ] **Step 5: Manual smoke (optional, user)** — `npm run dev`, visit `/about-us`, verify: sticky era visual crossfades over milestones, mobile shows inline chips, reduced-motion shows static content.
