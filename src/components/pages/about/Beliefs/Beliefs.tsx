"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./Beliefs.module.css";

const principles = [
  {
    number: "01",
    thesis: "Stay curious. Keep improving.",
    copy: "Technology changes quickly, so our thinking has to keep moving with it. We question assumptions, explore better approaches, and use new tools when they create a clearer advantage for the work.",
    practice: "Curiosity stays close to delivery — we learn, test, and improve instead of repeating yesterday's solution.",
  },
  {
    number: "02",
    thesis: "Own the outcome end to end.",
    copy: "Responsibility does not stop when a task is marked complete. We stay accountable for how the system behaves, how it serves the business, and what happens after it reaches real users.",
    practice: "The work is followed through from decision to delivery — with quality, maintainability, and support treated as part of the same responsibility.",
  },
  {
    number: "03",
    thesis: "Make the work visible.",
    copy: "Better decisions come from shared context. We value clear communication around priorities, trade-offs, progress, and problems so teams can act with confidence instead of working through guesswork.",
    practice: "Decisions, risks, and progress are communicated clearly — especially when the answer is not the easiest one.",
  },
  {
    number: "04",
    thesis: "Build with the best idea in the room.",
    copy: "Strong products come from collaboration across business, design, engineering, and operations. Good ideas should win on their merit, not on the title of the person who suggested them.",
    practice: "We bring the right disciplines into the conversation early and challenge the work constructively before complexity becomes expensive.",
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
              Principles Behind How We Work.
            </span>
          </h2>
          <p data-beliefs-intro className={styles.description}>
            Innovation, ownership, transparency, and collaboration shape how we make decisions,
            work with teams, and turn ambitious ideas into software that can keep growing.
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
              <span className={styles.disqualifierMark}>How we work together</span>
              <h3 className={styles.disqualifierStatement}>
                The strongest partnerships are built on shared context, clear ownership, and open decisions.
              </h3>
            </div>
            <p className={styles.disqualifierCopy}>
              We work best when there is room to ask questions, challenge assumptions, and take
              <strong> responsibility for the outcome</strong>. That creates better decisions during
              delivery and a stronger system after launch.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
