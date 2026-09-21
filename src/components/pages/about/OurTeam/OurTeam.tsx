"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAboutReveal } from "../useAboutReveal";
import styles from "./OurTeam.module.css";

type Discipline = {
  name: string;
  role: string;
  narrative: string;
};

const disciplines: Discipline[] = [
  {
    name: "Product strategy",
    role: "Sets the direction",
    narrative:
      "Priorities, scope, and definition of success agreed before delivery begins. Business viability directly married to engineering feasibility.",
  },
  {
    name: "Experience design",
    role: "Shapes the experience",
    narrative:
      "Flows, interactions, and edge cases built against real platform capabilities. Design and development evolve as one unified medium.",
  },
  {
    name: "Systems architecture",
    role: "Holds the structure",
    narrative:
      "Data pipelines, cloud topology, and modular service boundaries planned upfront so systems scale smoothly as adoption expands.",
  },
  {
    name: "AI & software engineering",
    role: "Builds the product",
    narrative:
      "Applied machine learning capabilities and resilient application engineering executed in one synchronized delivery cadence.",
  },
  {
    name: "Quality engineering",
    role: "Protects the release",
    narrative:
      "Automated verification, regression defense, and performance benchmarking run alongside active builds instead of waiting at the end.",
  },
  {
    name: "Delivery partnership",
    role: "Keeps it moving",
    narrative:
      "Direct engineering communication, transparent milestones, and accountable stewardship from discovery through long-term evolution.",
  },
];

const principles = [
  {
    num: "01",
    title: "One business outcome",
    copy: "Every discipline works from the same priorities, constraints, and definition of success.",
  },
  {
    num: "02",
    title: "Decisions stay close",
    copy: "The people doing the work stay involved in the conversations that shape the product.",
  },
  {
    num: "03",
    title: "Knowledge moves forward",
    copy: "Context carries from discovery to delivery, launch, and the improvements that follow.",
  },
];

export function OurTeam() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useAboutReveal(sectionRef);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.registerPlugin(ScrollTrigger);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Editorial reveal for the 3 operating principles
      gsap.from("[data-principle-col]", {
        autoAlpha: 0,
        y: 30,
        stagger: 0.12,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-principles-row]",
          start: "top 86%",
          once: true,
        },
      });

      // Closing statement wipe
      gsap.from("[data-closing-statement]", {
        autoAlpha: 0,
        y: 20,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "[data-closing-statement]",
          start: "top 90%",
          once: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const active = disciplines[activeIndex] ?? disciplines[0];

  return (
    <section ref={sectionRef} id="team" className={styles.section} aria-labelledby="team-title">
      <div className={styles.shell}>
        {/* ================= 1. INTRO ================= */}
        <header className={styles.intro}>
          <p data-about-intro className={styles.eyebrow}>
            Our Team
          </p>
          <h2 data-about-intro id="team-title">
            <span className="section-heading-fill">
              Different disciplines, one shared standard of delivery.
            </span>
          </h2>
          <p data-about-intro className={styles.description}>
            JabitSoft brings product strategy, UI/UX design, software engineering, quality assurance
            and delivery into one accountable team. From discovery and requirement analysis through
            planning, development, testing, launch and support, every discipline works from the same
            business goals.
          </p>
        </header>

        {/* ================= 2. DISCIPLINES — selectable list + active narrative ================= */}
        <div className={styles.stage}>
          <div className={styles.stageHead}>
            <p className={styles.subLabel}>Coordinated Delivery</p>
          </div>

          <div className={styles.disciplines}>
            <div className={styles.discList}>
              {disciplines.map((d, i) => (
                <button
                  key={d.name}
                  type="button"
                  className={`${styles.discItem} ${i === activeIndex ? styles.discItemActive : ""}`}
                  onMouseEnter={() => setActiveIndex(i)}
                  onFocus={() => setActiveIndex(i)}
                  onClick={() => setActiveIndex(i)}
                >
                  <span className={styles.discIndex}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={styles.discName}>{d.name}</span>
                </button>
              ))}
            </div>

            <div className={styles.discPanel} aria-live="polite">
              <span className={styles.discGhost} aria-hidden="true">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <div key={activeIndex} className={styles.discPanelInner}>
                <p className={styles.discRole}>{active.role}</p>
                <p className={styles.discNarrative}>{active.narrative}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= 3. OPERATING PRINCIPLES ================= */}
        <div className={styles.principlesSection}>
          <div className={styles.principlesHead}>
            <p className={styles.subLabel}>Operating Principles</p>
          </div>

          <div data-principles-row className={styles.principlesRow}>
            {principles.map((p) => (
              <div key={p.num} data-principle-col className={styles.principleCol}>
                <span className={styles.principleIndex}>{p.num}</span>
                <h4 className={styles.principleTitle}>{p.title}</h4>
                <p className={styles.principleCopy}>{p.copy}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ================= 4. CLOSING COMMITMENT ================= */}
        <footer data-closing-statement className={styles.closing}>
          <p className={styles.closingStatement}>
            One coordinated JabitSoft team.{" "}
            <span className={styles.closingSoft}>
              Not a collection of disconnected specialists.
            </span>
          </p>
        </footer>
      </div>
    </section>
  );
}
