"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./Beliefs.module.css";

const principles = [
  {
    number: "01",
    thesis: "Clarity before complexity.",
    copy: "We make the problem, the trade-offs, and the next decision legible before adding technology. Most failures don't come from bad engineering — they come from solving the wrong problem well.",
    practice: "No code ships before the brief is challenged — problem, options, trade-offs, cost.",
  },
  {
    number: "02",
    thesis: "Useful over impressive.",
    copy: "Every feature must improve a real workflow, a customer moment, or a business outcome. A polished demo that doesn't move a metric is a cost, not an asset.",
    practice: "If it doesn't move a real workflow, it doesn't ship — even if it'd look good in a demo.",
  },
  {
    number: "03",
    thesis: "Ownership beyond launch.",
    copy: "Quality, maintainability, and what happens next remain part of our responsibility. Shipping is a checkpoint, not a hand-off — the system has to keep earning its place after we leave the room.",
    practice: "Documentation, handover sessions, and support windows ship with the delivery — not as extras.",
  },
  {
    number: "04",
    thesis: "Built to keep changing.",
    copy: "Products should create room for the next release, the next customer, and the next opportunity. Rigid systems become liabilities the moment the business changes direction.",
    practice: "We architect for the release after next, not just the one in front of us.",
  },
];

/** Split an element's text into masked word wrappers for a cascading reveal. */
function splitWords(el: Element, wordClass: string, innerClass: string): Element[] {
  const text = el.textContent ?? "";
  el.setAttribute("aria-label", text.trim());
  el.innerHTML = "";
  const words = text.split(/\s+/).filter(Boolean);
  const inners: Element[] = [];
  words.forEach((word, index) => {
    const wrap = document.createElement("span");
    wrap.className = wordClass;
    wrap.setAttribute("aria-hidden", "true");
    const inner = document.createElement("span");
    inner.className = innerClass;
    inner.textContent = word;
    wrap.appendChild(inner);
    el.appendChild(wrap);
    inners.push(inner);
    if (index < words.length - 1) el.appendChild(document.createTextNode(" "));
  });
  return inners;
}

export function Beliefs() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const cleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      const wipe = section.querySelector("[data-belief-wipe]");
      const ambientGrid = section.querySelector("[data-belief-ambient]");
      const intro = section.querySelectorAll("[data-beliefs-intro]");
      const headingFill = section.querySelector("[data-beliefs-heading-line]");
      const progressFill = section.querySelector("[data-belief-progress]");
      const reveals = section.querySelectorAll("[data-belief-reveal]");
      const rules = section.querySelectorAll("[data-belief-rule]");
      const watermarks = section.querySelectorAll("[data-belief-watermark]");
      const principles = section.querySelectorAll("[data-belief-row]");
      const theses = Array.from(section.querySelectorAll(`.${styles.principleThesis}`));

      // Masked word cascades for each thesis and the CTA lead, tracked per-element.
      const leadGroups: Array<{ inners: Element[]; parent: Element }> = [];
      section.querySelectorAll("[data-belief-lead]").forEach((el) => {
        const inners = splitWords(el, styles.word, styles.wordInner);
        leadGroups.push({ inners, parent: el });
      });

      if (reduced) {
        return;
      }

      // ---------- Initial states ----------
      gsap.set(intro, { autoAlpha: 0, y: 34 });
      gsap.set(reveals, { autoAlpha: 0, y: 28 });
      gsap.set(rules, { scaleX: 0 });
      leadGroups.forEach(({ inners }) => gsap.set(inners, { yPercent: 115 }));

      // ---------- Light curtain wipe (scrubbed) ----------
      if (wipe) {
        gsap.fromTo(
          wipe,
          { clipPath: "inset(0% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 100% 0%)",
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              end: "top 35%",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          },
        );
      }

      // ---------- Ambient grid parallax ----------
      if (ambientGrid) {
        gsap.to(ambientGrid, {
          yPercent: -18,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      // ---------- Intro entrance ----------
      gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          once: true,
          invalidateOnRefresh: true,
        },
      }).to(intro, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08 });

      // ---------- Per-element masked word reveals ----------
      leadGroups.forEach(({ inners, parent }) => {
        gsap.to(inners, {
          yPercent: 0,
          duration: 0.9,
          stagger: 0.03,
          ease: "expo.out",
          scrollTrigger: {
            trigger: parent,
            start: "top 82%",
            once: true,
          },
        });
      });

      // ---------- Supporting reveals ----------
      reveals.forEach((el) => {
        gsap.to(el, {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        });
      });

      // ---------- Heading fill scrub (How We Build motion, adapted for dark background) ----------
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

      // ---------- Section progress hairline ----------
      if (progressFill) {
        gsap.fromTo(
          progressFill,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 60%",
              end: "bottom 55%",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          },
        );
      }

      // ---------- Drawn dividers (scrubbed scaleX) ----------
      rules.forEach((rule) => {
        const parent = rule.closest(`.${styles.principle}, .${styles.disqualifier}`);
        gsap.to(rule, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: parent ?? rule,
            start: "top 78%",
            end: "top 48%",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });
      });

      // ---------- Ghost watermark parallax ----------
      // yPercent -50 centers vertically; ±15 gives the parallax drift range.
      watermarks.forEach((wm) => {
        gsap.fromTo(
          wm,
          { yPercent: -35 },
          {
            yPercent: -65,
            ease: "none",
            scrollTrigger: {
              trigger: wm.closest(`.${styles.principle}`),
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          },
        );
      });

      // ---------- Principle row parallax drift ----------
      principles.forEach((row) => {
        const inner = row.querySelector(`.${styles.principleInner}`);
        if (!inner) return;
        gsap.fromTo(
          inner,
          { y: 32 },
          {
            y: -20,
            ease: "none",
            scrollTrigger: {
              trigger: row,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.9,
            },
          },
        );
      });

      // ---------- Velocity skew on theses (±2°) ----------
      const skewSetters = theses.map((t) =>
        gsap.quickTo(t as HTMLElement, "skewY", { duration: 0.5, ease: "power3.out" }),
      );

      const velocityST = ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const v = gsap.utils.clamp(-1200, 1200, self.getVelocity());
          const skew = gsap.utils.mapRange(-1200, 1200, 2, -2, v);
          skewSetters.forEach((set) => set(skew));
        },
      });
      cleanups.push(() => velocityST.kill());

    }, section);

    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="beliefs" className={styles.section} aria-labelledby="beliefs-title">
      <div data-belief-ambient className={styles.ambientGrid} aria-hidden="true" />
      <div className={styles.ambient} aria-hidden="true" />
      <span data-belief-wipe className={styles.wipe} aria-hidden="true" />

      <div className={styles.shell}>
        <header className={styles.heading}>
          <p data-beliefs-intro className={styles.eyebrow}>(Beliefs)</p>
          <h2 id="beliefs-title" className={styles.display}>
            <span data-beliefs-heading-line className={styles.beliefsHeadingFill}>
              Beliefs that shape better software.
            </span>
          </h2>
          <p data-beliefs-intro className={styles.description}>
            A shared standard for how we understand the work, make decisions, and build systems that
            stay useful long after the launch call ends.
          </p>
        </header>

        <div className={styles.progressLine} aria-hidden="true">
          <span data-belief-progress className={styles.progressFill} />
        </div>

        <ol className={styles.principles}>
          {principles.map((principle) => (
            <li key={principle.number} data-belief-row className={styles.principle}>
              <span data-belief-rule className={styles.principleRule} aria-hidden="true" />

              <div className={styles.principleWatermarkWrap} aria-hidden="true">
                <span data-belief-watermark className={styles.principleWatermark}>
                  {principle.number}
                </span>
              </div>

              <div className={styles.principleInner}>
                <div className={styles.principleMeta}>
                  <span className={styles.principleNumber}>{principle.number}</span>
                  <span className={styles.principleLabel}>Principle</span>
                </div>

                <div className={styles.principleBody}>
                  <h3 data-belief-lead className={styles.principleThesis}>
                    {principle.thesis}
                  </h3>
                  <p data-belief-reveal className={styles.principleCopy}>
                    {principle.copy}
                  </p>
                  <p data-belief-reveal className={styles.principlePractice}>
                    <span>In practice</span>
                    {principle.practice}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div data-belief-reveal className={styles.disqualifier}>
          <span data-belief-rule className={styles.disqualifierRule} aria-hidden="true" />

          <div className={styles.disqualifierSplit}>
            <div className={styles.disqualifierLeft}>
              <span className={styles.disqualifierMark}>Not for everyone</span>
              <h3 className={styles.disqualifierStatement}>
                If you need a vendor to execute a fixed spec and disappear, we are the wrong team.
              </h3>
            </div>
            <p className={styles.disqualifierCopy}>
              JabitSoft works best as an <strong>accountable partner</strong> embedded in the
              decisions that shape the product — not as a back-office delivery resource. We take
              ownership of outcomes, not just output, and that is a different kind of relationship.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
