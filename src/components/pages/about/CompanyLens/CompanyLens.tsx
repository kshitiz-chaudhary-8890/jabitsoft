"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useAboutHeadingFill } from "../useAboutReveal";
import styles from "./CompanyLens.module.css";

/**
 * CompanyLens
 *
 * One brace, one tip, one outcome.
 *
 * A brace already carries the meaning this section needs: these statements,
 * taken as one system, resolving to a single point. So the five things
 * JabitSoft understands before touching any technology sit *inside* the brace
 * (no index, no number, no order), the outcome sits at its tip, and the
 * disciplines sit just past the tip — recruited only when a reading asks for
 * them. On small screens the brace rotates rather than disappears.
 */

type DisciplineId = "product" | "engineering" | "ai" | "cloud" | "systems" | "webmobile";

type ReadingId = "context" | "people" | "product" | "systems" | "constraints";

const disciplines: Array<{ id: DisciplineId; label: string }> = [
  { id: "product", label: "Product thinking" },
  { id: "engineering", label: "Software engineering" },
  { id: "ai", label: "Artificial intelligence" },
  { id: "cloud", label: "Cloud and infrastructure" },
  { id: "systems", label: "Business systems" },
  { id: "webmobile", label: "Web and mobile products" },
];

const disciplineLabels = new Map(disciplines.map((d) => [d.id, d.label]));

/**
 * The five readings are deliberately unnumbered and unlettered: the content's
 * own claim is that they are held at once, so nothing here may imply a queue.
 * `recruits` is the actual argument of the section — which disciplines a given
 * reading is what pulls in.
 */
const readings: Array<{
  id: ReadingId;
  label: string;
  phrase: string;
  recruits: DisciplineId[];
}> = [
  {
    id: "context",
    label: "Business context",
    phrase: "Where the revenue, the risk and the decisions actually sit.",
    recruits: ["systems", "ai"],
  },
  {
    id: "people",
    label: "The people in it",
    phrase: "Who does this work today, and what would make them trust a change to it.",
    recruits: ["product", "webmobile"],
  },
  {
    id: "product",
    label: "The product as it stands",
    phrase: "What already exists, and where it is quietly straining.",
    recruits: ["product", "engineering", "webmobile"],
  },
  {
    id: "systems",
    label: "The systems already running",
    phrase: "The tools, data and workflows the business already runs on, and can't stop using.",
    recruits: ["systems", "cloud", "engineering"],
  },
  {
    id: "constraints",
    label: "The real constraints",
    phrase: "What the budget, the timeline, the rules and the existing code will allow.",
    recruits: ["engineering", "cloud", "ai"],
  },
];

/**
 * Two half-braces per orientation so the stroke can be drawn outward *from the
 * tip* — the convergence point is where the gesture originates.
 */
export function CompanyLens() {
  const sectionRef = useRef<HTMLElement>(null);
  useAboutHeadingFill(sectionRef);

  // `pinned` is the click / Enter / Space state; `preview` is hover or focus.
  // Pointer and keyboard drive exactly the same visual state.
  const [pinned, setPinned] = useState<ReadingId | null>(null);
  const [preview, setPreview] = useState<ReadingId | null>(null);
  const active = pinned ?? preview;
  const activeReading = readings.find((r) => r.id === active) ?? null;

  const openPreview = useCallback((id: ReadingId) => setPreview(id), []);
  const closePreview = useCallback((id: ReadingId) => {
    setPreview((current) => (current === id ? null : current));
  }, []);
  const togglePinned = useCallback((id: ReadingId) => {
    setPinned((current) => (current === id ? null : id));
  }, []);

  // Escape releases a pinned reading, so the keyboard path is fully reversible.
  useEffect(() => {
    if (!pinned) return undefined;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPinned(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [pinned]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const introEls = gsap.utils.toArray<HTMLElement>("[data-lens-intro]");
      const readingEls = gsap.utils.toArray<HTMLElement>("[data-lens-reading]");
      const signalEl = section.querySelector("[data-lens-signal]");
      const closeEl = section.querySelector("[data-lens-close]");

      // Reduced motion: resting state only. Highlighting still works — it is a
      // state change, not an animation.
      if (reduced) return;

      gsap.set(
        introEls.filter((element) => element.tagName !== "H2"),
        { autoAlpha: 0, y: 22 },
      );
      gsap.set(readingEls, { autoAlpha: 0, y: 16 });
      gsap.set(signalEl, { autoAlpha: 0, y: 22 });
      gsap.set(closeEl, { autoAlpha: 0, y: 14 });

      /**
       * The section's entire motion budget: one orchestrated entrance.
       * No parallax layers, no velocity skew, no scroll-driven highlighting —
       * highlighting belongs to the person, not to the scrollbar.
       */
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          once: true,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        introEls.filter((element) => element.tagName !== "H2"),
        { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08 },
        0,
      )
        .to(readingEls, { autoAlpha: 1, y: 0, duration: 0.72, stagger: 0.055 }, 0.18)
        .to(signalEl, { autoAlpha: 1, y: 0, duration: 0.72 }, 0.32)
        .to(closeEl, { autoAlpha: 1, y: 0, duration: 0.65 }, 0.62);
    }, section);

    return () => ctx.revert();
  }, []);

  const gaugeState = (id: DisciplineId) => {
    if (!activeReading) return undefined;
    return activeReading.recruits.includes(id) ? "on" : "off";
  };

  return (
    <section
      ref={sectionRef}
      id="company-lens"
      className={styles.section}
      aria-labelledby="company-lens-title"
    >
      <div className={styles.shell}>
        <header className={styles.intro}>
          <p data-lens-intro className={styles.eyebrow}>
            Company Lens
          </p>
          <h2 id="company-lens-title" data-lens-intro className={styles.display}>
            <span data-about-heading-fill className="section-heading-fill">
              We understand the system before choosing the technology.
            </span>
          </h2>
          <p data-lens-intro className={styles.lede}>
            Before a stack, a platform or a template enters the conversation, we hold five things in
            view at once. None of them is a phase, and none of them waits its turn.
          </p>
        </header>

        <div className={styles.field}>
          <div
            className={styles.readings}
            role="group"
            aria-label="The five things we understand before choosing any technology"
          >
            <div className={styles.readingsHeader} aria-hidden="true">
              <span>What we read first</span>
              <span>Explore the signals</span>
            </div>
            {readings.map((reading) => (
              <button
                key={reading.id}
                type="button"
                data-lens-reading
                data-state={active === reading.id ? "on" : undefined}
                className={styles.reading}
                aria-pressed={pinned === reading.id}
                onPointerEnter={() => openPreview(reading.id)}
                onPointerLeave={() => closePreview(reading.id)}
                onFocus={() => openPreview(reading.id)}
                onBlur={() => closePreview(reading.id)}
                onClick={() => togglePinned(reading.id)}
              >
                <span className={styles.readingTick} aria-hidden="true" />
                <span className={styles.readingLabel}>{reading.label}</span>
                <span className={styles.readingPhrase}>{reading.phrase}</span>
                <span className={styles.srOnly}>
                  {" "}
                  Brings in {reading.recruits.map((id) => disciplineLabels.get(id)).join(", ")}.
                </span>
              </button>
            ))}
          </div>

          <aside data-lens-signal className={styles.signal} aria-live="polite">
            <span className={styles.signalKicker}>Decision signal</span>
            <p className={styles.outcome}>The one outcome that has to change.</p>

            <div className={styles.activeReadout}>
              <span>{activeReading?.label ?? "The whole business picture"}</span>
              <p>
                {activeReading?.phrase ??
                  "Explore a business signal to see which capabilities it brings into the work."}
              </p>
            </div>

            <div className={styles.gauge}>
              <h3 className={styles.gaugeTitle}>Capabilities brought into focus</h3>
              <ul className={styles.gaugeList}>
                {disciplines.map((discipline) => (
                  <li
                    key={discipline.id}
                    className={styles.gaugeItem}
                    data-state={gaugeState(discipline.id)}
                  >
                    <span className={styles.gaugeName}>{discipline.label}</span>
                    <span className={styles.gaugeBar} aria-hidden="true" />
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        <div data-lens-close className={styles.close}>
          <span>One accountable team</span>
          <p>
            Whatever is needed runs as one team on the outcome, not as six services booked
            separately.
          </p>
        </div>
      </div>
    </section>
  );
}
