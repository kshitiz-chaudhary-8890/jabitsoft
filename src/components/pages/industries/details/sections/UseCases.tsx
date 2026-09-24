"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { useIndustryReveal } from "../useIndustryReveal";
import type { IndustryDetailData } from "../types";
import styles from "./UseCases.module.css";

function CopilotVisual() {
  return (
    <div className={styles.viz} aria-hidden="true">
      <div className={styles.vPrompt}>
        Summarize usage for Acme<span className={styles.vCaret}>▍</span>
      </div>
      <div className={styles.vStream} style={{ ["--w" as string]: "92%" }} />
      <div className={styles.vStream} style={{ ["--w" as string]: "68%" }} />
      <div className={styles.vTags}>
        <span className={styles.vTagHot}>eval passed</span>
        <span className={styles.vTag}>approval-gated</span>
      </div>
    </div>
  );
}

function SearchVisual() {
  return (
    <div className={styles.viz} aria-hidden="true">
      <div className={styles.vSearch}>acme renewal history</div>
      <div className={styles.vRow} style={{ ["--d" as string]: "0s" }}>
        <span className={styles.vDot} />
        <span>Renewal Q3 — signed</span>
      </div>
      <div className={styles.vRow} style={{ ["--d" as string]: "1.4s" }}>
        <span className={styles.vDot} />
        <span>SSO rollout thread</span>
      </div>
    </div>
  );
}

function OnboardVisual() {
  return (
    <div className={styles.viz} aria-hidden="true">
      {[
        { s: "Account created", state: "done" },
        { s: "Workspace connected", state: "done" },
        { s: "First report sent", state: "now" },
      ].map((step) => (
        <div key={step.s} className={styles.vStepRow} data-state={step.state}>
          <span className={styles.vStepDot}>{step.state === "done" ? "✓" : "3"}</span>
          <span>{step.s}</span>
        </div>
      ))}
      <div className={styles.vBar}>
        <i style={{ width: "67%" }} />
      </div>
      <div className={styles.vNote}>activated without a call</div>
    </div>
  );
}

function BillingVisual() {
  return (
    <div className={styles.viz} aria-hidden="true">
      <div className={styles.vPlanHead}>
        <span>Scale plan</span>
        <span className={styles.vPlanPrice}>$1,240/mo</span>
      </div>
      <div className={styles.vMeter}>
        <i style={{ width: "78%" }} />
        <em style={{ left: "78%" }} />
      </div>
      <div className={styles.vMeterLabels}>
        <span>2.4M events used</span>
        <span>next tier · 3M</span>
      </div>
      <div className={styles.vRow}>
        <span className={styles.vDot} />
        <span>auto-upgraded at 2am</span>
      </div>
    </div>
  );
}

function AutomationVisual() {
  return (
    <div className={styles.viz} aria-hidden="true">
      <div className={styles.vJobRow}>
        <span>Provision tenant</span>
        <span className={styles.vStatusAuto}>auto</span>
      </div>
      <div className={styles.vJobRow} data-wait="true">
        <span className={styles.vWaitDot} />
        <span>Refund $480</span>
        <span className={styles.vStatusWait}>waiting</span>
      </div>
      <div className={styles.vJobRow}>
        <span>Scale workers ×4</span>
        <span className={styles.vStatusOk}>approved ✓</span>
      </div>
      <div className={styles.vNote}>humans keep the decisions</div>
    </div>
  );
}

function RadarVisual() {
  return (
    <div className={styles.viz} aria-hidden="true">
      <div className={styles.vAlertHot}>
        <span className={styles.vPulseLight} />
        <span>Acme — expansion ready</span>
        <span className={styles.vActPill}>act now</span>
      </div>
      <div className={styles.vRow}>
        <span className={styles.vDotDim} />
        <span>Globex — seats down 12%</span>
      </div>
      <div className={styles.vNote}>renewals stop being surprises</div>
    </div>
  );
}

const visuals = [CopilotVisual, SearchVisual, OnboardVisual, BillingVisual, AutomationVisual, RadarVisual];

export function UseCases({ data }: { data: IndustryDetailData }) {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  useIndustryReveal(ref);
  const { useCases } = data;
  const [active, setActive] = useState(0);
  const total = useCases.items.length;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    const update = () => {
      rafRef.current = 0;
      const cards = track.querySelectorAll<HTMLElement>("[data-uc-card]");
      if (!cards.length) return;
      const gap = cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft - cards[0].offsetWidth : 0;
      const step = cards[0].offsetWidth + gap;
      const i = Math.round(track.scrollLeft / step);
      setActive(Math.max(0, Math.min(total - 1, i)));
    };
    const onScroll = () => {
      if (!rafRef.current) rafRef.current = window.requestAnimationFrame(update);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    update();

    let inObserver: IntersectionObserver | undefined;
    if (typeof IntersectionObserver !== "undefined") {
      ref.current?.classList.add("uc-anim");
      inObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-in");
              inObserver?.unobserve(entry.target);
            }
          }
        },
        { root: track, threshold: 0.35 },
      );
      track.querySelectorAll<HTMLElement>("[data-uc-card]").forEach((card) => inObserver?.observe(card));
    } else {
      track.querySelectorAll<HTMLElement>("[data-uc-card]").forEach((card) => card.classList.add("is-in"));
    }

    return () => {
      track.removeEventListener("scroll", onScroll);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      inObserver?.disconnect();
    };
  }, [total]);

  const scrollTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const next = (index + total) % total;
    const card = track.querySelectorAll<HTMLElement>("[data-uc-card]")[next];
    if (!card) return;
    const delta = card.getBoundingClientRect().left - track.getBoundingClientRect().left;
    track.scrollTo({ left: track.scrollLeft + delta, behavior: "smooth" });
  };

  return (
    <section ref={ref} className={styles.section} aria-labelledby="industry-usecases-title">
      <div className={styles.shell}>
        <header className={styles.head}>
          <div>
            <p data-ind-intro className={styles.eyebrow}>
              Use Cases
            </p>
            <h2 data-ind-intro id="industry-usecases-title" className={styles.title}>
              <span className="section-heading-fill">{useCases.title}</span>
            </h2>
            <p data-ind-intro className={styles.intro}>
              {useCases.intro}
            </p>
          </div>
          <div data-ind-intro className={styles.controls}>
            <p className={styles.counter} aria-live="polite">
              {String(active + 1).padStart(2, "0")} <span>/ {String(total).padStart(2, "0")}</span>
            </p>
            <div className={styles.buttons}>
              <button
                type="button"
                className={styles.navButton}
                aria-label="Previous use case"
                onClick={() => scrollTo(active - 1)}
              >
                <ArrowLeft size={18} strokeWidth={2} />
              </button>
              <button
                type="button"
                className={styles.navButton}
                aria-label="Next use case"
                onClick={() => scrollTo(active + 1)}
              >
                <ArrowRight size={18} strokeWidth={2} />
              </button>
            </div>
            <div className={styles.progress} aria-hidden="true">
              <i style={{ width: `${((active + 1) / total) * 100}%` }} />
            </div>
          </div>
        </header>

        <div ref={trackRef} className={styles.track} role="list" aria-label="SaaS use cases">
          {useCases.items.map((item, index) => {
            const Visual = visuals[index % visuals.length];
            return (
              <article data-ind-item data-uc-card key={item.title} className={styles.card} role="listitem">
                <div className={styles.visual}>
                  <Visual />
                </div>
                <div className={styles.body}>
                  <p className={styles.index} aria-hidden="true">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <i />
                  </p>
                  <h3>{item.title}</h3>
                  <p className={styles.text}>{item.text}</p>
                  {item.points?.length ? (
                    <ul className={styles.pills}>
                      {item.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
        <p className={styles.hint} aria-hidden="true">
          Swipe or use arrows to explore
        </p>
      </div>
    </section>
  );
}
