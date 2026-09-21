"use client";

import { useRef } from "react";
import { useAboutHeadingFill, useAboutReveal } from "../useAboutReveal";
import styles from "./Culture.module.css";

const behaviors = [
  [
    "Customer focus",
    "Begin with the outcome the business and its users need.",
    "Requirements, priorities and trade-offs stay connected to practical value throughout delivery.",
  ],
  [
    "Trust and reliability",
    "Treat quality as a long-term responsibility.",
    "Security, maintainability, performance and support are considered before development accelerates.",
  ],
  [
    "Collaboration",
    "Keep decisions close to the people doing the work.",
    "Designers, engineers and delivery partners share context early and remain accountable together.",
  ],
  [
    "Continuous innovation",
    "Use new technology where it creates a better result.",
    "The team explores AI, cloud and modern engineering methods without losing sight of usability or reliability.",
  ],
];

export function Culture() {
  const ref = useRef<HTMLElement>(null);
  useAboutReveal(ref);
  useAboutHeadingFill(ref);

  return (
    <section ref={ref} id="culture" className={styles.section} aria-labelledby="culture-title">
      <div className={styles.shell}>
        <div className={styles.sticky}>
          <p data-about-intro className={styles.eyebrow}>
            Our Values
          </p>
          <h2 data-about-intro id="culture-title">
            <span data-about-heading-fill className="section-heading-fill">
              Values That Guide How We Build.
            </span>
          </h2>
          <p data-about-intro className={styles.description}>
            JabitSoft&apos;s culture is built around customer focus, trust, collaboration,
            innovation and long-term relationships. These values shape how the team communicates,
            makes technical decisions and supports software after launch.
          </p>
          <p data-about-intro className={styles.closing}>
            Quality in the product. Clarity in the partnership. Ownership beyond launch.
          </p>
        </div>

        <ol className={styles.rows}>
          {behaviors.map(([theme, principle, evidence], index) => (
            <li data-about-item key={theme}>
              <span data-about-rule className={styles.rule} />
              <div className={styles.meta}>
                <span>0{index + 1}</span>
                <p>{theme}</p>
              </div>
              <div>
                <h3>{principle}</h3>
                <p>{evidence}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
