# Services Landing Hero Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the `/services` landing hero as a left-aligned editorial section with a proof strip, removing the black 6-card services grid.

**Architecture:** Two files change: `ServiceHero.tsx` (markup + GSAP timeline) and `ServiceHero.module.css` (layout). The 6 services remain linked in `ServiceOverview` (`#what-we-build`), which directly follows the hero.

**Tech Stack:** Next.js App Router, CSS Modules, GSAP + ScrollTrigger, Vitest + Testing Library.

## Global Constraints

- White background, left-aligned editorial composition (spec section 1).
- Keep rotating scope word + hand-drawn underline (signature accent).
- Delete the `platforms` black grid block entirely.
- Proof strip: only these 3 verifiable facts — `Six service lines` · `One accountable team` · `Design to deployment`. No invented metrics.
- CTAs unchanged: `Explore what we build` → `#what-we-build`, `Talk to us` → `mailto:hello@jabitsoft.com?subject=New%20Project`.
- GSAP: null-target guards, `prefers-reduced-motion` skips all animation, `ctx.revert()` cleanup.
- Console must be clean on `/services` (no GSAP warnings).

---

### Task 1: ServiceHero markup + GSAP rework with render test

**Files:**
- Create: `src/components/pages/services/landing/ServiceHero/ServiceHero.test.tsx`
- Modify: `src/components/pages/services/landing/ServiceHero/ServiceHero.tsx` (full rewrite)

**Interfaces:**
- Consumes: `serviceNavigation` no longer needed by hero (removed import). Keeps `ServiceArrow` from `../ServiceArrow`.
- Produces: exported `ServiceHero` (same name/signature — no props). CSS classes consumed by Task 2: `hero`, `glow`, `inner`, `kicker`, `line`, `swap`, `swapWord`, `underline`, `word`, `char`, `rule`, `split`, `description`, `actions`, `arrow`, `ctaPrimary`, `ctaSecondary`, `proofStrip`, `fact`.

- [ ] **Step 1: Write the failing test**

Create `src/components/pages/services/landing/ServiceHero/ServiceHero.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi, beforeAll } from "vitest";

vi.mock("gsap", () => ({
  gsap: {
    registerPlugin: vi.fn(),
    set: vi.fn(),
    context: (fn: () => void) => {
      fn();
      return { revert: vi.fn() };
    },
    timeline: vi.fn(() => ({ to: vi.fn().mockReturnThis() })),
  },
}));
vi.mock("gsap/ScrollTrigger", () => ({ ScrollTrigger: {} }));

import { ServiceHero } from "./ServiceHero";

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockReturnValue({ matches: true, addEventListener: vi.fn() }),
  });
});

describe("ServiceHero", () => {
  it("renders the eyebrow, headline, description and CTAs", () => {
    render(<ServiceHero />);
    expect(screen.getByText("Software development services")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: /Built for AI systems./i })).toBeInTheDocument();
    expect(screen.getByText(/We pair product thinking, design and engineering/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Explore what we build/i })).toHaveAttribute("href", "#what-we-build");
    expect(screen.getByRole("link", { name: /Talk to us/i })).toHaveAttribute("href", "mailto:hello@jabitsoft.com?subject=New%20Project");
  });

  it("renders the proof strip with verifiable facts", () => {
    render(<ServiceHero />);
    const strip = screen.getByRole("list", { name: /Delivery facts/i });
    expect(strip).toBeInTheDocument();
    expect(screen.getByText("Six service lines")).toBeInTheDocument();
    expect(screen.getByText("One accountable team")).toBeInTheDocument();
    expect(screen.getByText("Design to deployment")).toBeInTheDocument();
  });

  it("no longer renders the black services grid", () => {
    render(<ServiceHero />);
    expect(screen.queryByRole("link", { name: /Agentic AI Development/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /Cloud Consulting/i })).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/pages/services/landing/ServiceHero/ServiceHero.test.tsx`
Expected: FAIL — "Software development services" not found (old markup has no eyebrow, still has grid).

- [ ] **Step 3: Rewrite the component**

Replace the full content of `src/components/pages/services/landing/ServiceHero/ServiceHero.tsx`:

```tsx
"use client";

import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { ServiceArrow } from "../ServiceArrow";
import styles from "./ServiceHero.module.css";

function AnimatedText({ text }: { text: string }) {
  return text.split(" ").map((word, wordIndex, words) => (
    <Fragment key={`${word}-${wordIndex}`}>
      <span className={styles.word}>
        {Array.from(word).map((char, charIndex) => (
          <span className={styles.char} key={`${wordIndex}-${charIndex}`}>
            {char}
          </span>
        ))}
      </span>
      {wordIndex < words.length - 1 ? " " : null}
    </Fragment>
  ));
}

const SCOPE_WORDS = [
  "AI systems.",
  "Cloud platforms.",
  "Mobile products.",
  "Core operations.",
  "Digital growth.",
  "Web platforms.",
];

const FACTS = ["Six service lines", "One accountable team", "Design to deployment"];

export function ServiceHero() {
  const ref = useRef<HTMLElement>(null);
  const [scopeIndex, setScopeIndex] = useState(0);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const timer = window.setInterval(() => {
      setScopeIndex((index) => (index + 1) % SCOPE_WORDS.length);
    }, 2600);
    return () => window.clearInterval(timer);
  }, []);

  useLayoutEffect(() => {
    const hero = ref.current;
    if (!hero) return undefined;

    gsap.registerPlugin(ScrollTrigger);
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return undefined;

    const ctx = gsap.context(() => {
      const nav = document.querySelector(".site-nav");
      const chars = hero.querySelectorAll(`.${styles.char}`);
      const swap = hero.querySelector(`.${styles.swap}`);
      const description = hero.querySelector(`.${styles.description}`);
      const actions = hero.querySelector(`.${styles.actions}`);
      const rule = hero.querySelector(`.${styles.rule}`);
      const kicker = hero.querySelector(`.${styles.kicker}`);
      const facts = hero.querySelectorAll(`.${styles.fact}`);
      const heading = hero.querySelector("h1");

      if (!swap || !description || !actions || !heading) return undefined;

      if (nav) gsap.set(nav, { opacity: 0, y: -14 });
      if (kicker) gsap.set(kicker, { opacity: 0, y: 10 });
      if (rule) gsap.set(rule, { scaleX: 0, transformOrigin: "0 50%" });
      gsap.set(chars, {
        opacity: 0,
        yPercent: 96,
        rotateX: -12,
        transformOrigin: "50% 100%",
        force3D: true,
      });
      gsap.set([swap, description, actions], { opacity: 0, y: 18 });
      gsap.set(facts, { opacity: 0, y: 14 });

      const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
      if (nav) intro.to(nav, { opacity: 1, y: 0, duration: 0.42 }, 0);
      if (kicker) intro.to(kicker, { opacity: 1, y: 0, duration: 0.35 }, 0);
      intro
        .to(
          chars,
          {
            opacity: 1,
            yPercent: 0,
            rotateX: 0,
            duration: 0.55,
            stagger: { each: 0.006, from: "start" },
            clearProps: "transform",
          },
          0.06,
        )
        .to(swap, { opacity: 1, y: 0, duration: 0.4, clearProps: "opacity,transform" }, 0.45)
        .to(description, { opacity: 1, y: 0, duration: 0.38, clearProps: "opacity,transform" }, 0.6)
        .to(actions, { opacity: 1, y: 0, duration: 0.4, clearProps: "opacity,transform" }, 0.7);
      if (rule) intro.to(rule, { scaleX: 1, duration: 0.7, ease: "power3.inOut" }, 0.55);
      intro.to(facts, { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 }, 0.85);

      gsap
        .timeline({
          scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.85 },
          defaults: { ease: "none" },
        })
        .to(heading, { yPercent: -8 }, 0)
        .to([description, actions], { yPercent: -14 }, 0)
        .to(facts, { yPercent: 6, opacity: 0.35 }, 0);
    }, hero);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="top" className={styles.hero} aria-labelledby="service-title">
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.inner}>
        <p className={styles.kicker}>Software development services</p>
        <h1 id="service-title">
          <span className={styles.line}>
            <AnimatedText text="Built for" />{" "}
            <span className={styles.swap}>
              <span className={styles.swapWord} key={scopeIndex}>
                {SCOPE_WORDS[scopeIndex]}
              </span>
              <svg
                className={styles.underline}
                viewBox="0 0 300 10"
                fill="none"
                aria-hidden="true"
                preserveAspectRatio="none"
              >
                <path
                  d="M4 7.5c58-5 156-6.5 258-3.5 22 .6 28 1.4 36 2"
                  stroke="currentColor"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </span>
          <span className={styles.line}>
            <AnimatedText text="Engineered around your business." />
          </span>
        </h1>
        <div className={styles.rule} aria-hidden="true" />
        <div className={styles.split}>
          <p className={styles.description}>
            We pair product thinking, design and engineering to the way your business actually
            runs. One accountable team, no hand-offs.
          </p>
          <div className={styles.actions}>
            <Link className={styles.ctaPrimary} href="#what-we-build">
              Explore what we build
              <span className={styles.arrow} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 15h11M12 9l5 6-5 6"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
            <Link
              className={styles.ctaSecondary}
              href="mailto:hello@jabitsoft.com?subject=New%20Project"
            >
              Talk to us
              <span className={styles.arrow} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 15h11M12 9l5 6-5 6"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>

      <ul className={styles.proofStrip} aria-label="Delivery facts">
        {FACTS.map((fact) => (
          <li className={styles.fact} key={fact}>
            {fact}
          </li>
        ))}
      </ul>
    </section>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/pages/services/landing/ServiceHero/ServiceHero.test.tsx`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add src/components/pages/services/landing/ServiceHero/ServiceHero.tsx src/components/pages/services/landing/ServiceHero/ServiceHero.test.tsx
git commit -m "feat(services): editorial hero markup with proof strip, drop card grid"
```

---

### Task 2: Rewrite ServiceHero.module.css for the new layout

**Files:**
- Modify: `src/components/pages/services/landing/ServiceHero/ServiceHero.module.css` (full rewrite)

**Interfaces:**
- Consumes: class names from Task 1's TSX (list in Task 1 Produces).
- Produces: styled layout consumed by Task 3 verification.

- [ ] **Step 1: Replace the CSS file**

Replace the full content of `src/components/pages/services/landing/ServiceHero/ServiceHero.module.css`:

```css
.hero {
  position: relative;
  isolation: isolate;
  display: flex;
  min-height: clamp(660px, calc(100svh - 96px), 860px);
  padding: clamp(64px, 8vh, 104px) 0 clamp(32px, 4.5vh, 52px);
  overflow: hidden;
  flex-direction: column;
  background: #fff;
}

/* One soft ink wash on the surface — no pattern, no grid. */
.glow {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background: radial-gradient(56% 44% at 38% 24%, rgb(13 15 18 / 4.6%), transparent 72%);
}

.inner {
  position: relative;
  z-index: 2;
  display: flex;
  width: min(1180px, calc(100% - 48px));
  margin: auto;
  flex-direction: column;
  align-items: flex-start;
}

.kicker {
  margin: 0 0 clamp(18px, 2.6vh, 26px);
  color: var(--signal, #0d5d45);
  font:
    600 12px/1 var(--font-inter),
    Inter,
    sans-serif;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.hero h1 {
  width: 100%;
  margin: 0;
  color: var(--hd-ink, #0d0f12);
  font-family: var(--font-plus-jakarta-sans), var(--font-inter), sans-serif;
  font-size: clamp(44px, 5.2vw, 78px);
  font-style: normal;
  font-weight: 600;
  line-height: 1.04;
  letter-spacing: -0.035em;
  text-wrap: balance;
}

.line {
  display: block;
  white-space: nowrap;
}

/* Rotating scope word sits inline on the first line, underlined by drawn
   linework so the accent stays ink-on-ink, not gradient text. */
.swap {
  position: relative;
  display: inline-block;
  white-space: nowrap;
}

.swapWord {
  display: inline-block;
  animation: swap-in 0.42s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes swap-in {
  from {
    opacity: 0;
    transform: translateY(0.5em);
    filter: blur(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

.underline {
  position: absolute;
  right: 0.5%;
  bottom: -0.12em;
  left: 0.5%;
  width: 99%;
  height: 0.13em;
  color: var(--hd-ink, #0d0f12);
  pointer-events: none;
}

.word {
  display: inline-block;
  overflow: hidden;
  vertical-align: bottom;
  white-space: nowrap;
}

.char {
  display: inline-block;
  will-change: transform, opacity;
  backface-visibility: hidden;
}

.rule {
  width: 100%;
  height: 1px;
  margin: clamp(28px, 4vh, 44px) 0 clamp(22px, 3vh, 34px);
  background: var(--hd-ink, #0d0f12);
}

.split {
  display: grid;
  width: 100%;
  grid-template-columns: minmax(0, 1.2fr) auto;
  gap: clamp(24px, 4vw, 64px);
  align-items: end;
}

.description {
  max-width: 620px;
  margin: 0;
  color: rgb(13 15 18 / 0.66);
  font:
    400 clamp(16px, 1.05vw, 18px) / 1.6 var(--font-inter),
    Inter,
    sans-serif;
  letter-spacing: -0.01em;
  text-wrap: pretty;
}

.actions {
  display: flex;
  gap: 12px;
  align-items: center;
  touch-action: manipulation;
}

.actions a {
  display: inline-flex;
  min-height: 52px;
  padding: 0 24px;
  align-items: center;
  justify-content: center;
  gap: 12px;
  border-radius: 999px;
  font:
    600 15px / 1 var(--font-inter),
    Inter,
    sans-serif;
  text-decoration: none;
  transition:
    transform 0.2s ease,
    background 0.2s ease,
    border-color 0.2s ease;
}

.actions a:hover {
  transform: translateY(-2px);
}

.actions a:active {
  transform: translateY(-1px) scale(0.98);
}

.actions a:focus-visible {
  outline: 2px solid var(--hd-ink, #0d0f12);
  outline-offset: 3px;
}

.arrow {
  display: inline-flex;
  width: 15px;
  height: 15px;
  align-items: center;
  justify-content: center;
}

.arrow svg {
  width: 100%;
  height: 100%;
}

.ctaPrimary {
  border: 1px solid var(--hd-ink, #0d0f12);
  background: var(--hd-ink, #0d0f12);
  color: #fff;
}

.ctaPrimary:hover {
  background: #05060a;
}

.ctaPrimary svg {
  stroke: #fff;
}

.ctaSecondary {
  border: 1px solid rgb(13 15 18 / 0.18);
  background: #fff;
  color: #13171c;
}

.ctaSecondary:hover {
  border-color: rgb(13 15 18 / 0.4);
}

.ctaSecondary svg {
  stroke: var(--hd-ink, #0d0f12);
}

/* Compact proof strip — verifiable facts only, hairline divisions. */
.proofStrip {
  position: relative;
  z-index: 2;
  display: flex;
  width: min(1180px, calc(100% - 48px));
  margin: 0 auto;
  padding: 0;
  border-top: 1px solid var(--hd-ink, #0d0f12);
  border-bottom: 1px solid var(--hd-ink, #0d0f12);
  list-style: none;
}

.fact {
  flex: 1;
  padding: 18px 24px;
  border-left: 1px solid rgb(13 15 18 / 0.14);
  color: rgb(13 15 18 / 0.72);
  font:
    600 12px/1.3 var(--font-inter),
    Inter,
    sans-serif;
  letter-spacing: 0.09em;
  text-transform: uppercase;
}

.fact:first-child {
  border-left: 0;
  padding-left: 0;
}

@media (max-width: 700px) {
  .hero {
    min-height: calc(100svh - 76px);
    padding-top: clamp(48px, 7vh, 64px);
    padding-bottom: clamp(28px, 4vh, 40px);
  }

  .hero h1 {
    font-size: clamp(32px, 8.8vw, 44px);
    line-height: 1.07;
    letter-spacing: -0.03em;
  }

  .line,
  .swap {
    white-space: normal;
  }

  .underline {
    bottom: -0.16em;
    left: 0;
    width: 100%;
  }

  .split {
    grid-template-columns: 1fr;
    gap: 22px;
    align-items: start;
  }

  .description {
    max-width: 480px;
    font-size: 15px;
  }

  .actions {
    flex-wrap: wrap;
  }

  .actions a {
    min-height: 48px;
    padding-inline: 20px;
  }

  .proofStrip {
    width: calc(100% - 40px);
    flex-wrap: wrap;
  }

  .fact {
    flex: 1 1 50%;
    padding: 14px 16px;
  }

  .fact:nth-child(3) {
    border-left: 0;
    border-top: 1px solid rgb(13 15 18 / 0.14);
    padding-left: 0;
  }

  .fact:nth-child(4) {
    border-top: 1px solid rgb(13 15 18 / 0.14);
  }
}

@media (max-width: 430px) {
  .hero h1 {
    font-size: clamp(30px, 8.4vw, 37px);
  }

  .description {
    font-size: 14.5px;
  }

  .actions {
    gap: 10px;
  }

  .actions a {
    min-height: 46px;
    padding-inline: 18px;
    font-size: 14px;
  }

  .inner,
  .proofStrip {
    width: calc(100% - 36px);
  }

  .fact {
    flex: 1 1 100%;
    padding-left: 0;
  }
}

@media (max-width: 360px) {
  .actions a {
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .char {
    will-change: auto;
  }

  .swapWord {
    animation: none;
  }
}
```

- [ ] **Step 2: Verify in browser**

Run dev server if not running (`npm run dev`). Then:

```bash
agent-browser open http://localhost:3000/services
agent-browser screenshot C:\Users\jabit\AppData\Local\Temp\opencode\hero-desktop.png
agent-browser set viewport 700 900
agent-browser screenshot C:\Users\jabit\AppData\Local\Temp\opencode\hero-700.png
agent-browser set viewport 390 844
agent-browser screenshot C:\Users\jabit\AppData\Local\Temp\opencode\hero-390.png
agent-browser errors
```

Expected: left-aligned headline with rotating word + underline, rule, description left / CTAs right, proof strip at bottom, no black grid, console clean.

- [ ] **Step 3: Commit**

```bash
git add src/components/pages/services/landing/ServiceHero/ServiceHero.module.css
git commit -m "feat(services): editorial hero layout styles with proof strip"
```

---

### Task 3: Regression pass

**Files:**
- No file changes expected.

- [ ] **Step 1: Typecheck, lint, full test suite**

```bash
npm run typecheck
npm run lint
npm test
```

Expected: all pass.

- [ ] **Step 2: CTA anchor + interactions check**

```bash
agent-browser open http://localhost:3000/services
agent-browser snapshot -i
```

Click `Explore what we build` → viewport scrolls to the `#what-we-build` section (`ServiceOverview`). Rotating word cycles every ~2.6s. No console errors after 10s.

- [ ] **Step 3: Commit any fixes found (if none, skip)**

```bash
git add -A src/components/pages/services/landing/ServiceHero/
git commit -m "fix(services): hero regression fixes from QA pass"
```
