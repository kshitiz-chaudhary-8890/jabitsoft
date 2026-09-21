"use client";

import { stages } from "../servicesContent";
import { useServiceReveal } from "../useServiceReveal";
import styles from "../ServicesBody/ServicesBody.module.css";

export function DeliveryProcess() {
  const ref = useServiceReveal<HTMLElement>();

  return (
    <section ref={ref} className={`${styles.body} ${styles.process}`} id="process" aria-labelledby="process-title">
      <div className={styles.shell}>
        <header className={styles.processHeader} data-reveal-group>
          <div>
            <p className={styles.kicker} data-reveal>How we work</p>
            <h2 id="process-title" data-reveal><span className={`${styles.headingFill} section-heading-fill`}>A clear path through complicated work.</span></h2>
          </div>
          <p data-reveal>
            Each stage produces something the next stage can use. No theatre, no long disappearing act,
            and no hand-off between strategy and delivery.
          </p>
        </header>
        <div className={styles.deliveryRail}>
          <div className={styles.processRule} data-process-rule aria-hidden="true" />
          <ol className={styles.stageList}>
            {stages.map(([title, copy, output], index) => (
              <li key={title} data-process-stage>
                <span className={styles.stageNumber} data-process-cell>{String(index + 1).padStart(2, "0")}</span>
                <h3 data-process-cell>{title}</h3>
                <p data-process-cell>{copy}</p>
                <span className={styles.stageOutput} data-process-cell><i aria-hidden="true" />{output}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
