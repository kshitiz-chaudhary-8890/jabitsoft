"use client";

import { useMemo, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";

import { useIndustryReveal } from "../useIndustryReveal";
import type { IndustryDetailData } from "../types";
import styles from "./HowWeHelp.module.css";

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function HelpVisual({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className={styles.visual} aria-hidden="true">
        <div className={styles.vHead}>
          <span className={styles.vTitle}>Trust checks</span>
          <span className={styles.vPill}>SOC 2 ready</span>
        </div>
        {["SSO enforced", "Audit trail on", "Backups verified"].map((t) => (
          <div key={t} className={styles.checkRow}>
            <Check size={14} strokeWidth={2.5} aria-hidden="true" />
            <span>{t}</span>
          </div>
        ))}
        <div className={styles.uptime}>
          <i data-on /> <i data-on /> <i data-on /> <i data-on /> <i data-on={false} />
          <span>99.99% · 90d</span>
        </div>
      </div>
    );
  }
  if (index === 1) {
    return (
      <div className={styles.visual} aria-hidden="true">
        <div className={styles.bigNum}>
          2.4M <span>events / mo</span>
        </div>
        <div className={styles.bars}>
          {[34, 52, 44, 70, 92].map((h, i) => (
            <i key={i} style={{ height: `${h}%` }} data-hot={i === 4} />
          ))}
        </div>
        <div className={styles.vRow}>
          <span className={styles.vPill}>Scale plan</span>
          <span className={styles.vMuted}>metered live</span>
        </div>
      </div>
    );
  }
  if (index === 2) {
    return (
      <div className={styles.visual} aria-hidden="true">
        <div className={styles.prompt}>Summarize usage for Acme…</div>
        <div className={styles.aLine} style={{ width: "92%" }} />
        <div className={styles.aLine} style={{ width: "78%" }} />
        <div className={styles.aLine} style={{ width: "64%" }} />
        <div className={styles.vRow}>
          <span className={styles.vPill}>eval passed</span>
          <span className={styles.vPillSoft}>guardrail on</span>
        </div>
      </div>
    );
  }
  if (index === 3) {
    return (
      <div className={styles.visual} aria-hidden="true">
        <div className={styles.vHead}>
          <span className={styles.vTitle}>Tenants</span>
          <span className={styles.vPill}>3 isolated</span>
        </div>
        {[
          { name: "Acme Corp", meta: "peak 12k rpm", hot: true },
          { name: "Globex", meta: "steady 3k rpm", hot: false },
          { name: "Initech", meta: "burst 8k rpm", hot: false },
        ].map((t) => (
          <div key={t.name} className={`${styles.tRow} ${t.hot ? styles.tRowHot : ""}`}>
            <span className={styles.tDot} />
            <span className={styles.tName}>{t.name}</span>
            <span className={styles.tMeta}>{t.meta}</span>
          </div>
        ))}
        <div className={styles.vFoot}>Noisy neighbor contained</div>
      </div>
    );
  }
  if (index === 4) {
    return (
      <div className={styles.visual} aria-hidden="true">
        <div className={styles.pipe}>
          {["Build", "Test", "Release", "Monitor"].map((s, i) => (
            <div key={s} className={styles.step} data-done={i < 3} data-now={i === 2}>
              <i>{i < 3 ? "✓" : `0${i + 1}`}</i>
              <span>{s}</span>
            </div>
          ))}
        </div>
        <div className={styles.vFoot}>Deploys daily — no rollback drama</div>
      </div>
    );
  }
  return (
    <div className={styles.visual} aria-hidden="true">
      <div className={styles.vHead}>
        <span className={styles.vTitle}>Monolith → services</span>
        <span className={styles.vPill}>zero freeze</span>
      </div>
      <div className={styles.migRow}>
        <div className={styles.migLegacy}>monolith</div>
        <span className={styles.migArrow}>
          <ArrowRight size={18} strokeWidth={2} />
        </span>
        <div className={styles.migGrid}>
          <span>billing</span>
          <span>tenants</span>
          <span>search</span>
          <span>jobs</span>
        </div>
      </div>
      <div className={styles.vFoot}>Roadmap keeps shipping throughout</div>
    </div>
  );
}

export function HowWeHelp({ data }: { data: IndustryDetailData }) {
  const ref = useRef<HTMLElement>(null);
  useIndustryReveal(ref);
  const { howWeHelp } = data;
  const [active, setActive] = useState(0);

  const current = howWeHelp.items[active] ?? howWeHelp.items[0];
  const path = useMemo(() => `~/platform/${slugify(current.title)}`, [current.title]);

  const onRailKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    const dir = event.key === "ArrowDown" ? 1 : -1;
    const next = (active + dir + howWeHelp.items.length) % howWeHelp.items.length;
    setActive(next);
    document.getElementById(`ind-help-tab-${next}`)?.focus();
  };

  return (
    <section ref={ref} className={styles.section} aria-labelledby="industry-help-title">
      <div className={styles.shell}>
        <div className={styles.head}>
          <p data-ind-intro className={styles.kicker}>
            <span>How Jabisoft Helps</span>
          </p>
          <h2 data-ind-intro id="industry-help-title" className={styles.title}>
            <span className={`section-heading-fill ${styles.titleFill}`}>{howWeHelp.title}</span>
          </h2>
          <p data-ind-intro className={styles.intro}>
            {howWeHelp.intro}
          </p>
        </div>

        <div className={styles.body}>
          <div
            data-ind-item
            className={styles.rail}
            role="tablist"
            aria-label="Capabilities"
            onKeyDown={onRailKeyDown}
          >
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
                  <span className={styles.railIndex} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.railText}>{item.title}</span>
                  <span className={styles.railArrow} aria-hidden="true">
                    <ArrowUpRight size={16} strokeWidth={2} />
                  </span>
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
              <span className={styles.dots} aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <code className={styles.path}>{path}</code>
              <span className={styles.live} aria-hidden="true">
                <i />
                in your repos
              </span>
            </div>

            <div className={styles.consoleMain}>
              <div className={styles.consoleGrid}>
                <div className={styles.consoleCopy}>
                  <h3 className={styles.consoleTitle}>{current.title}</h3>
                  <p className={styles.consoleText}>{current.text}</p>

                  {current.tags?.length ? (
                    <ul className={styles.deliverables}>
                      {current.tags.map((tag) => (
                        <li key={tag}>
                          <Check size={15} strokeWidth={2.25} aria-hidden="true" />
                          <span>{tag}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
                <div className={styles.figure}>
                  <HelpVisual index={active} />
                </div>
              </div>
            </div>

            <div className={styles.consoleFoot}>
              <span>Shipped with tests, docs & runbooks</span>
              <span className={styles.footRule} aria-hidden="true" />
              <span className={styles.footCount}>
                {howWeHelp.items.map((_, i) => (
                  <i key={i} data-on={i === active} aria-hidden="true" />
                ))}
              </span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
