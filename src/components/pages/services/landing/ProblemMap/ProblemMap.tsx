"use client";

import { problems } from "../servicesContent";
import { useServiceReveal } from "../useServiceReveal";
import styles from "../ServicesBody/ServicesBody.module.css";

export function ProblemMap() {
  const ref = useServiceReveal<HTMLElement>();

  return (
    <section ref={ref} className={`${styles.body} ${styles.problems}`} aria-labelledby="problems-title">
      <div className={`${styles.shell} ${styles.problemLayout}`}>
        <div className={styles.problemLead} data-reveal-group>
          <p className={styles.kicker} data-reveal>Start with the friction</p>
          <h2 id="problems-title" data-reveal><span className={`${styles.headingFill} section-heading-fill`}>The service is not the starting point.</span></h2>
          <p data-reveal>
            The right engagement begins with what is slowing the business down—not with a predetermined
            technology or a fashionable solution.
          </p>
        </div>
        <div className={styles.problemList} data-reveal-group>
          {problems.map(([problem, response], index) => (
            <div className={styles.problemRow} key={problem} data-reveal>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{problem}</strong>
              <p>{response}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
