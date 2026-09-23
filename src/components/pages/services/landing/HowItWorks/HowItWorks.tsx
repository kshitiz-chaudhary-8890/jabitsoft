"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./HowItWorks.module.css";

const stages = [
  {
    id: "discover",
    number: "01",
    title: "Discover & Define",
    description: "We map your operations, identify high-leverage workflows, and define success criteria with your team.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
        <path d="M8 11l2 2 4-4" />
      </svg>
    ),
    details: ["Process Mapping", "Value Assessment", "Risk Analysis", "Success Metrics"],
    duration: "2–3 weeks",
    color: "#2563eb",
    gradient: "linear-gradient(135deg, rgba(37, 99, 235, 0.15), rgba(164, 246, 111, 0.1))",
  },
  {
    id: "design",
    number: "02",
    title: "Architect & Design",
    description: "We design the agent architecture, select models, define tool contracts, and plan integration touchpoints.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
        <path d="M10 6.5h4M10 10.5h4M10 17.5h4M10 21.5h4" />
      </svg>
    ),
    details: ["Agent Topology", "Tool Contracts", "Guardrail Design", "Data Flow Specs"],
    duration: "3–4 weeks",
    color: "#0e7490",
    gradient: "linear-gradient(135deg, rgba(14, 116, 144, 0.15), rgba(164, 246, 111, 0.1))",
  },
  {
    id: "build",
    number: "03",
    title: "Build & Integrate",
    description: "We implement agents, connect systems, build evaluation harnesses, and deploy to staging with observability.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    details: ["Agent Development", "System Integration", "Eval Pipeline", "Staging Deploy"],
    duration: "4–6 weeks",
    color: "#d98b2b",
    gradient: "linear-gradient(135deg, rgba(217, 139, 43, 0.15), rgba(164, 246, 111, 0.1))",
  },
  {
    id: "validate",
    number: "04",
    title: "Validate & Iterate",
    description: "We run shadow evaluations, A/B test against human baselines, and refine based on real production signals.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 20V10" />
        <path d="M18 20V4" />
        <path d="M6 20v-6" />
        <path d="M2 20h22" />
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    details: ["Shadow Mode", "A/B Testing", "Drift Monitoring", "Continuous Refinement"],
    duration: "Ongoing",
    color: "#7c3aed",
    gradient: "linear-gradient(135deg, rgba(124, 58, 237, 0.15), rgba(164, 246, 111, 0.1))",
  },
  {
    id: "scale",
    number: "05",
    title: "Scale & Operate",
    description: "We graduate to production, establish operational runbooks, and enable your team to own and expand the fleet.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <polyline points="17 18 22 12 17 6" />
        <polyline points="7 18 12 12 7 6" />
        <path d="M12 2a10 10 0 0 1 7.28 16.72" />
        <path d="M2 12h20" />
      </svg>
    ),
    details: ["Production Launch", "Runbook Handoff", "Team Enablement", "Fleet Expansion"],
    duration: "Continuous",
    color: "#059669",
    gradient: "linear-gradient(135deg, rgba(5, 150, 105, 0.15), rgba(164, 246, 111, 0.1))",
  },
];

export function HowItWorks() {
  const ref = useRef<HTMLElement>(null);
  const [activeStage, setActiveStage] = useState(0);
  const stageRefs = useRef<(HTMLDivElement | null)[]>([]);

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
      const timeline = section.querySelector(`.${styles.timeline}`);
      const timelineLine = section.querySelector(`.${styles.timelineLine}`);
      const timelineProgress = section.querySelector(`.${styles.timelineProgress}`);
      const stageCards = section.querySelectorAll(`.${styles.stageCard}`);
      const visual = section.querySelector(`.${styles.visual}`);
      const visualNodes = section.querySelectorAll(`.${styles.visualNode}`);
      const visualConnections = section.querySelectorAll(`.${styles.visualConnection}`);
      const activeIndicator = section.querySelector(`.${styles.activeIndicator}`);

      gsap.set([eyebrow, heading, description], { opacity: 0, y: 28 });
      gsap.set(timeline, { opacity: 0, y: 40 });
      gsap.set(timelineLine, { scaleY: 0, transformOrigin: "top center" });
      gsap.set(stageCards, { opacity: 0, x: (i) => (i % 2 === 0 ? -60 : 60), rotateY: (i) => (i % 2 === 0 ? 15 : -15), transformOrigin: "center center" });
      gsap.set(visual, { opacity: 0, scale: 0.97 });
      gsap.set(visualNodes, { opacity: 0, scale: 0.7, y: 30 });
      gsap.set(visualConnections, { strokeDashoffset: 200, opacity: 0 });

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
        .to(timeline, { opacity: 1, y: 0, duration: 0.7 }, 0.2)
        .to(timelineLine, { scaleY: 1, duration: 1.2, ease: "power3.inOut" }, 0.3)
        .to(stageCards, { opacity: 1, x: 0, rotateY: 0, duration: 0.7, stagger: 0.1, ease: "power3.out" }, 0.35)
        .to(visual, { opacity: 1, scale: 1, duration: 0.7 }, 0.25)
        .to(visualNodes, { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "back.out(1.4)" }, 0.4)
        .to(visualConnections, { strokeDashoffset: 0, opacity: 0.4, duration: 1.5, stagger: 0.15, ease: "power2.out" }, 0.6);

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

      // Scroll-triggered stage activation
      stageCards.forEach((card, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top 55%",
          end: "bottom 45%",
          onEnter: () => setActiveStage(i),
          onEnterBack: () => setActiveStage(i),
        });
      });

      // Timeline progress scrub
      gsap.to(timelineProgress, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: timeline,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        },
      });

      // Active indicator follows scroll
      if (activeIndicator) {
        gsap.to(activeIndicator, {
          y: () => {
            const card = stageCards[activeStage] as HTMLElement;
            if (!card) return 0;
            const timelineRect = timeline?.getBoundingClientRect();
            const cardRect = card.getBoundingClientRect();
            if (!timelineRect) return 0;
            return cardRect.top - timelineRect.top + cardRect.height / 2 - 12;
          },
          ease: "power2.out",
          duration: 0.4,
          scrollTrigger: {
            trigger: timeline,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.3,
          },
        });
      }

      // Visual node pulse on stage change
      visualNodes.forEach((node, i) => {
        ScrollTrigger.create({
          trigger: stageCards[i],
          start: "top 60%",
          end: "bottom 40%",
          onToggle: (self) => {
            if (self.isActive) {
              gsap.to(node, {
                scale: 1.15,
                boxShadow: `0 0 30px ${stages[i].color}`,
                duration: 0.3,
                yoyo: true,
                repeat: 1,
                ease: "power2.inOut",
              });
            }
          },
        });
      });
    }, section);
    return () => ctx.revert();
  }, [activeStage]);

  return (
    <section ref={ref} id="how-it-works" className={styles.section} aria-labelledby="how-it-works-title">
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>(How It Works)</p>
          <h2 id="how-it-works-title" className={styles.heading}>
            <span className={styles.headingFill}>From discovery to production in months, not years</span>
          </h2>
          <p className={styles.description}>
            A proven five-stage process that de-risks agentic AI adoption at every step.
            You get working software in staging by week 6.
          </p>
        </header>

        <div className={styles.layout}>
          <div className={styles.timelineColumn}>
            <div className={styles.timeline} role="list" aria-label="Process stages">
              <div className={styles.timelineTrack}>
                <div className={styles.timelineLine} aria-hidden="true" />
                <div className={styles.timelineProgress} aria-hidden="true" />
                <div className={styles.activeIndicator} aria-hidden="true" />
              </div>

              {stages.map((stage, index) => (
                <div
                  ref={(el) => { stageRefs.current[index] = el; }}
                  key={stage.id}
                  className={`${styles.stageCard} ${styles[stage.id]}`}
                  role="listitem"
                  style={{ "--stageColor": stage.color, "--stageGradient": stage.gradient } as React.CSSProperties}
                  onMouseEnter={() => setActiveStage(index)}
                  onFocus={() => setActiveStage(index)}
                >
                  <div className={styles.stageNumber}>{stage.number}</div>
                  <div className={styles.stageContent}>
                    <div className={styles.stageHeader}>
                      <div className={styles.iconWrapper} style={{ "--iconColor": stage.color } as React.CSSProperties}>
                        {stage.icon}
                      </div>
                      <div>
                        <h3 className={styles.stageTitle}>{stage.title}</h3>
                        <span className={styles.stageDuration}>{stage.duration}</span>
                      </div>
                    </div>
                    <p className={styles.stageDescription}>{stage.description}</p>
                    <ul className={styles.stageDetails} aria-label={`${stage.title} details`}>
                      {stage.details.map((detail) => (
                        <li key={detail} className={styles.stageDetail}>
                          <span className={styles.detailDot} style={{ "--dotColor": stage.color } as React.CSSProperties} aria-hidden="true" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles.stageConnector} aria-hidden="true">
                    <span className={styles.connectorDot} style={{ "--dotColor": stage.color } as React.CSSProperties} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.visualColumn}>
            <div className={styles.visualWrapper}>
              <div className={styles.visual} aria-hidden="true">
                <svg className={styles.visualSvg} viewBox="0 0 280 520" aria-hidden="true">
                  <defs>
                    <linearGradient id="flowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#2563eb" stopOpacity="0.5" />
                      <stop offset="20%" stopColor="#0e7490" stopOpacity="0.5" />
                      <stop offset="40%" stopColor="#d98b2b" stopOpacity="0.5" />
                      <stop offset="60%" stopColor="#7c3aed" stopOpacity="0.5" />
                      <stop offset="80%" stopColor="#059669" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#a4f66f" stopOpacity="0.5" />
                    </linearGradient>
                    <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <marker id="flowArrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
                      <path d="M0,0 L0,6 L10,3 z" fill="url(#flowGradient)" />
                    </marker>
                  </defs>

                  <path
                    className={styles.visualConnection}
                    d="M140 50 C140 110 140 170 140 230 C140 290 140 350 140 410 C140 470 140 490 140 490"
                    stroke="url(#flowGradient)"
                    strokeWidth="2.5"
                    fill="none"
                    strokeDasharray="10 8"
                    strokeLinecap="round"
                    strokeDashoffset="200"
                    marker-end="url(#flowArrow)"
                  />

                  {stages.map((stage, index) => {
                    const yPositions = [50, 130, 210, 290, 370];
                    const xOffset = index % 2 === 0 ? -55 : 55;
                    return (
                      <g
                        key={stage.id}
                        className={styles.visualNode}
                        style={{
                          transformOrigin: `${140 + xOffset}px ${yPositions[index]}px`,
                          "--nodeColor": stage.color,
                        } as React.CSSProperties}
                      >
                        <circle
                          cx={140 + xOffset}
                          cy={yPositions[index]}
                          r={30}
                          fill="#111827"
                          stroke={stage.color}
                          strokeWidth="2"
                          filter="url(#nodeGlow)"
                        />
                        <circle
                          cx={140 + xOffset}
                          cy={yPositions[index]}
                          r={22}
                          fill="none"
                          stroke="rgba(164, 246, 111, 0.3)"
                          strokeWidth="1"
                          strokeDasharray="4 6"
                        />
                        <text
                          x={140 + xOffset}
                          y={yPositions[index] + 4}
                          textAnchor="middle"
                          fill={stage.color}
                          fontSize="9"
                          fontWeight="600"
                          fontFamily="Inter, sans-serif"
                          letterSpacing="0.08em"
                        >
                          {stage.number}
                        </text>
                        <text
                          x={140 + (xOffset > 0 ? 50 : -50)}
                          y={yPositions[index] + 4}
                          textAnchor={xOffset > 0 ? "start" : "end"}
                          fill="rgba(19, 19, 19, 0.5)"
                          fontSize="8"
                          fontWeight="500"
                          fontFamily="Inter, sans-serif"
                          letterSpacing="0.04em"
                        >
                          {stage.title.toUpperCase()}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                <div className={styles.visualLegend}>
                  <span className={styles.legendLine} />
                  <span>Continuous flow with feedback loops at every stage</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
