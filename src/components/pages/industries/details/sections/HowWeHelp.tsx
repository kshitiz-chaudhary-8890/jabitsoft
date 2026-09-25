"use client";

import { useMemo, useRef, useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";

import { useIndustryReveal } from "../useIndustryReveal";
import type { IndustryDetailData } from "../types";
import { OperationsDiagram } from "./IndustryVisuals";
import styles from "./HowWeHelp.module.css";

function slugify(title: string) {
  return title.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function HowWeHelp({ data }: { data: IndustryDetailData }) {
  const ref = useRef<HTMLElement>(null);
  useIndustryReveal(ref);
  const { howWeHelp } = data;
  const [active, setActive] = useState(0);
  const current = howWeHelp.items[active] ?? howWeHelp.items[0];
  const path = useMemo(() => `~/${data.slug}/${slugify(current.title)}`, [data.slug, current.title]);

  const onRailKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    const next = (active + (event.key === "ArrowDown" ? 1 : -1) + howWeHelp.items.length) % howWeHelp.items.length;
    setActive(next);
    document.getElementById(`ind-help-tab-${next}`)?.focus();
  };

  return (
    <section ref={ref} className={styles.section} aria-labelledby="industry-help-title">
      <div className={styles.shell}>
        <div className={styles.head}>
          <p data-ind-intro className={styles.kicker}><span>How Jabitsoft Helps</span></p>
          <h2 data-ind-intro id="industry-help-title" className={styles.title}>
            <span className={`section-heading-fill ${styles.titleFill}`}>{howWeHelp.title}</span>
          </h2>
          <p data-ind-intro className={styles.intro}>{howWeHelp.intro}</p>
        </div>

        <div className={styles.body}>
          <div data-ind-item className={styles.rail} role="tablist" aria-label="Capabilities" onKeyDown={onRailKeyDown}>
            {howWeHelp.items.map((item, index) => {
              const selected = index === active;
              return (
                <button
                  key={item.title}
                  id={`ind-help-tab-${index}`}
                  role="tab"
                  aria-selected={selected}
                  aria-controls="ind-help-panel"
                  tabIndex={selected ? 0 : -1}
                  type="button"
                  className={`${styles.railItem} ${selected ? styles.railItemActive : ""}`}
                  onMouseEnter={() => {
                    if (window.matchMedia("(hover: hover)").matches) setActive(index);
                  }}
                  onClick={() => setActive(index)}
                >
                  <span className={styles.railIndex} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <span className={styles.railText}>{item.title}</span>
                  <span className={styles.railArrow} aria-hidden="true"><ArrowUpRight size={16} strokeWidth={2} /></span>
                  <span className={styles.railBar} aria-hidden="true" />
                </button>
              );
            })}
          </div>

          <article
            data-ind-item
            id="ind-help-panel"
            role="tabpanel"
            aria-live="polite"
            aria-label={current.title}
            className={styles.console}
            key={current.title}
          >
            <div className={styles.consoleTop}>
              <span className={styles.dots} aria-hidden="true"><i /><i /><i /></span>
              <code className={styles.path}>{path}</code>
              <span className={styles.live} aria-hidden="true"><i />workflow model</span>
            </div>

            <div className={styles.consoleMain}>
              <div className={styles.consoleGrid}>
                <div className={styles.consoleCopy}>
                  <h3 className={styles.consoleTitle}>{current.title}</h3>
                  <p className={styles.consoleText}>{current.text}</p>
                  {current.tags?.length ? (
                    <ul className={styles.deliverables}>
                      {current.tags.map((tag) => (
                        <li key={tag}><Check size={15} strokeWidth={2.25} aria-hidden="true" /><span>{tag}</span></li>
                      ))}
                    </ul>
                  ) : null}
                </div>
                <div className={styles.figure}>
                  <OperationsDiagram slug={data.slug} index={active} />
                </div>
              </div>
            </div>

            <div className={styles.consoleFoot}>
              <span>Mapped to the workflow above</span>
              <span className={styles.footRule} aria-hidden="true" />
              <span className={styles.footCount}>
                {howWeHelp.items.map((_, i) => <i key={i} data-on={i === active} aria-hidden="true" />)}
              </span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
