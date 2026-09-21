"use client";

import { useServiceReveal } from "../useServiceReveal";
import styles from "../ServicesBody/ServicesBody.module.css";

export function WhyJabit() {
  const ref = useServiceReveal<HTMLElement>();

  return (
    <section ref={ref} className={`${styles.body} ${styles.proof}`} aria-labelledby="proof-title">
      <div className={styles.shell}>
        <header className={styles.whyHeader} data-reveal-group>
          <p className={styles.kicker} data-reveal>Why JabitSoft</p>
          <h2 id="proof-title" data-reveal><span className="section-heading-fill">Built for the work after launch.</span></h2>
          <p data-reveal>
            A polished release is only useful if the system remains understandable, maintainable and
            valuable to the people running it.
          </p>
        </header>

        <div className={styles.whyFrame} data-reveal-group>
          <div className={styles.whyPromise} data-reveal>
            <span>Our operating principle</span>
            <p>The team that frames the problem stays close enough to remain accountable for the outcome.</p>
          </div>
          <div className={styles.whyPrinciples}>
            <article data-reveal>
              <span>Since 2007</span>
              <h3>Full-lifecycle perspective</h3>
              <p>Early decisions account for implementation, adoption and long-term ownership.</p>
            </article>
            <article data-reveal>
              <span>One team</span>
              <h3>No strategy-to-delivery gap</h3>
              <p>The people shaping the solution remain close to the people building it.</p>
            </article>
            <article data-reveal>
              <span>Working releases</span>
              <h3>Progress stays visible</h3>
              <p>Real software keeps scope, quality and priorities open for discussion.</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
