"use client";

import { useRef } from "react";

import { useIndustryReveal } from "../useIndustryReveal";
import type { IndustryDetailData } from "../types";
import styles from "./IndustryLandscape.module.css";

export function IndustryLandscape({ data }: { data: IndustryDetailData }) {
  const ref = useRef<HTMLElement>(null);
  useIndustryReveal(ref);
  const { landscape } = data;

  return (
    <section ref={ref} className={styles.section} aria-labelledby="industry-landscape-title">
      <div className={styles.shell}>
        <div className={styles.head}>
          <p data-ind-intro className={styles.eyebrow}>
            Industry Overview
          </p>
          <h2 data-ind-intro id="industry-landscape-title" className={styles.title}>
            <span className="section-heading-fill">{landscape.title}</span>
          </h2>
          <p data-ind-intro className={styles.intro}>
            {landscape.intro}
          </p>
        </div>

        <div className={styles.field}>
          <div className={styles.forces}>
            <p data-ind-intro className={styles.sideLabel}>
              What is changing
            </p>
            {landscape.forces.map((force, index) => (
              <article data-ind-item key={force.title} className={styles.force}>
                <span data-ind-rule className={styles.rule} aria-hidden="true" />
                <span className={styles.forceIndex}>0{index + 1}</span>
                <div>
                  <h3>{force.title}</h3>
                  <p>{force.text}</p>
                </div>
              </article>
            ))}
          </div>

          <aside data-ind-item className={styles.opportunityField}>
            <p className={styles.sideLabelInk}>The opportunity</p>
            {landscape.opportunities.map((opportunity) => (
              <div key={opportunity.title} className={styles.opportunity}>
                <h3>{opportunity.title}</h3>
                <p>{opportunity.text}</p>
              </div>
            ))}
          </aside>
        </div>
      </div>
    </section>
  );
}
