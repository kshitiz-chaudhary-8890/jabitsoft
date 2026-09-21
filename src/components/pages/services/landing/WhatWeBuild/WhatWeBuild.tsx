"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./WhatWeBuild.module.css";

const capabilities = [
  {
    id: "agents",
    title: "Autonomous Agents",
    description: "Goal-driven agents that plan, reason, and execute multi-step workflows without step-by-step prompting.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
        <path d="M8 14c0 2.2 1.8 4 4 4s4-1.8 4-4" />
      </svg>
    ),
    features: ["Memory & Context", "Tool Orchestration", "Self-Correction", "Multi-Agent Coordination"],
    metrics: { label: "Avg. workflow steps", value: "12→3" },
    accent: "#2563eb",
    gradient: "linear-gradient(135deg, rgba(37, 99, 235, 0.12), rgba(164, 246, 111, 0.08))",
  },
  {
    id: "rag",
    title: "RAG & Knowledge Systems",
    description: "Production-grade retrieval-augmented generation with hybrid search, reranking, and citation tracking.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <path d="M3 6h18" />
        <path d="M16 10a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h4z" />
      </svg>
    ),
    features: ["Hybrid Vector + Keyword", "Contextual Reranking", "Source Citations", "Incremental Indexing"],
    metrics: { label: "Retrieval precision", value: "94%+" },
    accent: "#0e7490",
    gradient: "linear-gradient(135deg, rgba(14, 116, 144, 0.12), rgba(164, 246, 111, 0.08))",
  },
  {
    id: "workflows",
    title: "Workflow Automation",
    description: "Durable, observable execution engines for long-running business processes with human checkpoints.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="2" y="3" width="7" height="7" rx="1" />
        <rect x="15" y="3" width="7" height="7" rx="1" />
        <rect x="2" y="14" width="7" height="7" rx="1" />
        <rect x="15" y="14" width="7" height="7" rx="1" />
        <path d="M9 6.5h6M9 10.5h6M9 17.5h6M9 21.5h6" />
      </svg>
    ),
    features: ["State Persistence", "Retry & Compensation", "Human Approval Gates", "Audit Trails"],
    metrics: { label: "Execution reliability", value: "99.9%" },
    accent: "#d98b2b",
    gradient: "linear-gradient(135deg, rgba(217, 139, 43, 0.12), rgba(164, 246, 111, 0.08))",
  },
  {
    id: "eval",
    title: "Evaluation & Observability",
    description: "Continuous evaluation pipelines, drift detection, and real-time observability for agent behavior.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M18 20V10" />
        <path d="M12 20V4" />
        <path d="M6 20v-6" />
        <path d="M2 20h22" />
      </svg>
    ),
    features: ["Automated Eval Suites", "Drift Alerts", "Trace Visualization", "Cost & Latency Tracking"],
    metrics: { label: "Issue detection", value: "<5 min" },
    accent: "#7c3aed",
    gradient: "linear-gradient(135deg, rgba(124, 58, 237, 0.12), rgba(164, 246, 111, 0.08))",
  },
  {
    id: "integration",
    title: "System Integration",
    description: "Secure connectors for ERP, CRM, databases, and internal APIs with policy-based access control.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
      </svg>
    ),
    features: ["OAuth & mTLS", "Schema Validation", "Rate Limiting", "Audit Logging"],
    metrics: { label: "Pre-built connectors", value: "40+" },
    accent: "#059669",
    gradient: "linear-gradient(135deg, rgba(5, 150, 105, 0.12), rgba(164, 246, 111, 0.08))",
  },
  {
    id: "platform",
    title: "Agent Platform Ops",
    description: "Infrastructure, deployment, and governance for running agent fleets at scale with multi-tenancy.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 17h8" />
        <path d="M12 11v6" />
        <path d="M12 3v4" />
        <path d="M8 17v4" />
        <path d="M16 17v4" />
      </svg>
    ),
    features: ["K8s-Native Deployment", "Multi-Tenant Isolation", "Policy Engine", "Blue/Green Rollouts"],
    metrics: { label: "Scale capacity", value: "10k+ agents" },
    accent: "#dc2626",
    gradient: "linear-gradient(135deg, rgba(220, 38, 38, 0.12), rgba(164, 246, 111, 0.08))",
  },
];

export function WhatWeBuild() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = ref.current;
    if (!section) return undefined;
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduced) return undefined;

    const ctx = gsap.context(() => {
      const eyebrow = section.querySelector(`.${styles.eyebrow}`);
      const heading = section.querySelector(`.${styles.heading}`);
      const headingFill = section.querySelector(`.${styles.headingFill}`);
      const description = section.querySelector(`.${styles.description}`);
      const cards = section.querySelectorAll(`.${styles.card}`);
      const cardIcons = section.querySelectorAll(`.${styles.cardIcon}`);
      const cardFeatures = section.querySelectorAll(`.${styles.feature}`);
      const cardMetrics = section.querySelectorAll(`.${styles.metric}`);

      gsap.set([eyebrow, heading, description], { opacity: 0, y: 28 });
      gsap.set(cards, { opacity: 0, y: 50, scale: 0.95, rotateX: 5, transformOrigin: "50% 100%" });
      gsap.set(cardIcons, { opacity: 0, scale: 0.8, rotate: -12 });
      gsap.set(cardFeatures, { opacity: 0, x: -20 });
      gsap.set(cardMetrics, { opacity: 0, y: 16, scale: 0.9 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
        defaults: { ease: "power4.out" },
      });

      tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.5 }, 0)
        .to(heading, { opacity: 1, y: 0, duration: 0.6 }, 0.08)
        .to(description, { opacity: 1, y: 0, duration: 0.55 }, 0.16)
        .to(cards, { opacity: 1, y: 0, scale: 1, rotateX: 0, duration: 0.75, stagger: 0.07, ease: "power3.out" }, 0.2)
        .to(cardIcons, { opacity: 1, scale: 1, rotate: 0, duration: 0.55, stagger: 0.07, ease: "back.out(1.5)" }, 0.35)
        .to(cardFeatures, { opacity: 1, x: 0, duration: 0.45, stagger: 0.03 }, 0.5)
        .to(cardMetrics, { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.05, ease: "back.out(1.3)" }, 0.6);

      if (headingFill) {
        gsap.fromTo(
          headingFill,
          { backgroundSize: "100% 100%, 0% 100%" },
          {
            backgroundSize: "100% 100%, 100% 100%",
            ease: "none",
            scrollTrigger: {
              trigger: headingFill,
              start: "top 92%",
              end: "top 38%",
              scrub: 0.7,
              invalidateOnRefresh: true,
            },
          }
        );
      }

      cards.forEach((card) => {
        gsap.to(card, {
          y: -12,
          scale: 1.01,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="what-we-build" className={styles.section} aria-labelledby="what-we-build-title">
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>(What We Build)</p>
          <h2 id="what-we-build-title" className={styles.heading}>
            <span className={styles.headingFill}>Six capability areas, one cohesive platform</span>
          </h2>
          <p className={styles.description}>
            We do not sell point solutions. Every capability reinforces the others. Agents can retrieve,
            workflows that can be evaluated, integrations that are observable by default.
          </p>
        </header>

        <div className={styles.grid} role="list">
          {capabilities.map((cap) => (
            <article key={cap.id} className={`${styles.card} ${styles[cap.id]}`} role="listitem" style={{ "--accent": cap.accent, "--gradient": cap.gradient } as React.CSSProperties}>
              <div className={styles.cardInner}>
                <div className={styles.cardTop}>
                  <div className={styles.iconWrapper} style={{ "--iconColor": cap.accent } as React.CSSProperties}>
                    {cap.icon}
                  </div>
                  <div className={styles.metric} style={{ "--metricColor": cap.accent } as React.CSSProperties}>
                    <span className={styles.metricValue}>{cap.metrics.value}</span>
                    <span className={styles.metricLabel}>{cap.metrics.label}</span>
                  </div>
                </div>
                <h3 className={styles.cardTitle}>{cap.title}</h3>
                <p className={styles.cardDescription}>{cap.description}</p>
                <ul className={styles.features} aria-label={`${cap.title} features`}>
                  {cap.features.map((feature) => (
                    <li key={feature} className={styles.feature}>
                      <span className={styles.featureDot} style={{ "--dotColor": cap.accent } as React.CSSProperties} aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className={styles.cardGlow} aria-hidden="true" />
              </div>
            </article>
          ))}
        </div>

        <div className={styles.note}>
          <p>Each capability is production-hardened and designed to compose. Start with one, expand as needed.</p>
        </div>
      </div>
    </section>
  );
}
