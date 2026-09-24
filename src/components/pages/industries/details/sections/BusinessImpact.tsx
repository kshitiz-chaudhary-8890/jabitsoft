"use client";

import { useRef } from "react";
import { BarChart3, CircleDollarSign, Cog, Expand, Rocket, Sparkles } from "lucide-react";

import { useIndustryReveal } from "../useIndustryReveal";
import type { IndustryDetailData } from "../types";
import styles from "./BusinessImpact.module.css";

const icons = [Rocket, Cog, Expand, Sparkles, BarChart3, CircleDollarSign];

export function BusinessImpact({ data }: { data: IndustryDetailData }) {
  const ref = useRef<HTMLElement>(null);
  useIndustryReveal(ref);
  const { businessImpact } = data;

  return (
    <section ref={ref} className={styles.section} aria-labelledby="industry-impact-title">
      <div className={styles.shell}>
        <div className={styles.head}>
          <p data-ind-intro className={styles.eyebrow}>
            Business Impact
          </p>
          <h2 data-ind-intro id="industry-impact-title" className={styles.title}>
            <span className="section-heading-fill">{businessImpact.title}</span>
          </h2>
          <p data-ind-intro className={styles.intro}>
            {businessImpact.intro}
          </p>
        </div>

        <div className={styles.wall}>
          {businessImpact.dimensions.map((dimension, index) => {
            const Icon = icons[index % icons.length];
            return (
              <article data-ind-item key={dimension.name} className={styles.line}>
                <span data-ind-rule className={styles.rule} aria-hidden="true" />
                <span className={styles.ghost} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className={styles.content}>
                  {dimension.tag ? <p className={styles.tag}>{dimension.tag}</p> : null}
                  <h3>{dimension.name}</h3>
                  <p className={styles.outcome}>{dimension.text}</p>
                </div>
                <span className={styles.icon} aria-hidden="true">
                  <Icon size={22} strokeWidth={1.75} />
                </span>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
