"use client";

import { useServiceReveal } from "../useServiceReveal";
import styles from "../ServicesBody/ServicesBody.module.css";

const capabilityGroups = [
  ["Product", "Research · UX architecture · Interface design · Product direction"],
  ["Engineering", "Web platforms · Mobile products · APIs · Enterprise integrations"],
  ["Intelligence", "AI agents · Retrieval systems · Automation · Data workflows"],
  ["Operations", "Cloud architecture · Reliability · Security · Ongoing support"],
  ["Growth", "Technical SEO · Content systems · Analytics · Campaign learning"],
] as const;

export function CapabilityStack() {
  const ref = useServiceReveal<HTMLElement>();

  return (
    <section ref={ref} className={`${styles.body} ${styles.capabilities}`} aria-labelledby="capabilities-title">
      <div className={styles.shell} data-reveal-group>
        <div className={styles.capabilityHeading}>
          <p className={styles.kicker} data-reveal>Capabilities</p>
          <h2 id="capabilities-title" data-reveal><span className="section-heading-fill">Technology in service of the system.</span></h2>
          <p className={styles.capabilityIntro} data-reveal>
            The disciplines stay connected from the first product decision through engineering,
            launch and continuous improvement.
          </p>
        </div>
        <div className={styles.capabilityMap}>
          <div className={styles.capabilityAxis} data-reveal aria-hidden="true">
            <span>Direction</span><i /><span>Support</span>
          </div>
          <div className={styles.capabilityBands} data-reveal-group>
            {capabilityGroups.map(([title, copy], index) => (
              <article key={title} data-reveal>
                <span className={styles.capabilityIndex}>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
                <span className={styles.capabilityStatus}><i />One team</span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
