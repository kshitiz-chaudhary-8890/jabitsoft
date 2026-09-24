"use client";

import { useRef } from "react";

import { useIndustryReveal } from "../useIndustryReveal";
import type { IndustryDetailData } from "../types";
import styles from "./IndustryChallenges.module.css";

export function IndustryChallenges({ data }: { data: IndustryDetailData }) {
  const ref = useRef<HTMLElement>(null);
  useIndustryReveal(ref);
  const { challenges } = data;

  return (
    <section ref={ref} className={styles.section} aria-labelledby="industry-challenges-title">
      <div className={styles.shell}>
        <div className={styles.grid}>
          <div className={styles.sticky}>
            <p data-ind-intro className={styles.eyebrow}>
              Key Challenges
            </p>
            <h2 data-ind-intro id="industry-challenges-title" className={styles.title}>
              <span className="section-heading-fill">{challenges.title}</span>
            </h2>
            <p data-ind-intro className={styles.note}>
              {challenges.intro}
            </p>
          </div>

          <div className={styles.rows}>
            {challenges.items.map((item, index) => (
              <article data-ind-item key={item.title} className={styles.row}>
                <span data-ind-rule className={styles.rule} aria-hidden="true" />
                <span className={styles.rowIndex}>0{index + 1}</span>
                <div className={styles.rowBody}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
