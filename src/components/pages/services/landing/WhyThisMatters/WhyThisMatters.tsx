"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./WhyThisMatters.module.css";

export function WhyThisMatters() {
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
      const lines = section.querySelectorAll(`.${styles.cardLine}`);
      const stats = section.querySelectorAll(`.${styles.stat}`);
      const visual = section.querySelector(`.${styles.visual}`);
      const visualNodes = section.querySelectorAll(`.${styles.visualNode}`);
      const visualConnections = section.querySelectorAll(`.${styles.visualConnection}`);

      gsap.set([eyebrow, heading, description], { opacity: 0, y: 28 });
      gsap.set(cards, { opacity: 0, y: 40, scale: 0.96 });
      gsap.set(lines, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(stats, { opacity: 0, y: 20 });
      gsap.set(visual, { opacity: 0, scale: 0.97 });
      gsap.set(visualNodes, { opacity: 0, scale: 0.8, y: 16 });
      gsap.set(visualConnections, { strokeDashoffset: 120, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
          once: true,
        },
        defaults: { ease: "power4.out" },
      });

      tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.5 }, 0)
        .to(heading, { opacity: 1, y: 0, duration: 0.6 }, 0.08)
        .to(description, { opacity: 1, y: 0, duration: 0.55 }, 0.16)
        .to(cards, { opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.08 }, 0.24)
        .to(lines, { scaleX: 1, duration: 0.5, stagger: 0.08, ease: "power3.out" }, 0.32)
        .to(stats, { opacity: 1, y: 0, duration: 0.5, stagger: 0.06 }, 0.4)
        .to(visual, { opacity: 1, scale: 1, duration: 0.7 }, 0.2)
        .to(visualNodes, { opacity: 1, scale: 1, y: 0, duration: 0.55, stagger: 0.07, ease: "back.out(1.4)" }, 0.35)
        .to(visualConnections, { strokeDashoffset: 0, opacity: 0.35, duration: 1.2, stagger: 0.15, ease: "power2.out" }, 0.6);

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

      gsap.to(visualNodes, {
        y: (i, target) => {
          const base = gsap.getProperty(target, "y");
          return `${base}px`;
        },
        scrollTrigger: {
          trigger: visual,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className={styles.section} aria-labelledby="why-matters-title">
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>(Why This Matters)</p>
          <h2 id="why-matters-title" className={styles.heading}>
            <span className={styles.headingFill}>The shift from tools to teammates</span>
          </h2>
          <p className={styles.description}>
            Most companies treat AI as a feature. The ones pulling ahead treat it as workforce.
            Agentic systems don&apos;t just answer prompts&mdash;they own outcomes.
          </p>
        </header>

        <div className={styles.grid}>
          <div className={styles.cardsColumn}>
            <article className={styles.card}>
              <div className={styles.cardNumber}>01</div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>From Assistance to Autonomy</h3>
                <p className={styles.cardText}>
                  Copilots wait for input. Agents take initiative—decomposing goals, selecting tools,
                  and iterating until the work is done.
                </p>
              </div>
              <div className={styles.cardLine} aria-hidden="true" />
            </article>

            <article className={styles.card}>
              <div className={styles.cardNumber}>02</div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>Compound Leverage</h3>
                <p className={styles.cardText}>
                  One agent coordinating five tools replaces five separate workflows. The multiplier
                  effect compounds across every department.
                </p>
              </div>
              <div className={styles.cardLine} aria-hidden="true" />
            </article>

            <article className={styles.card}>
              <div className={styles.cardNumber}>03</div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>Observable by Design</h3>
                <p className={styles.cardText}>
                  Every decision, tool call, and state change is logged and auditable.
                  No black boxes—just transparent, debuggable automation.
                </p>
              </div>
              <div className={styles.cardLine} aria-hidden="true" />
            </article>

            <article className={styles.card}>
              <div className={styles.cardNumber}>04</div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>Human Judgment Where It Counts</h3>
                <p className={styles.cardText}>
                  Approval gates, escalation paths, and policy guardrails keep humans in control
                  without being in the loop for every step.
                </p>
              </div>
            </article>
          </div>

          <div className={styles.visualColumn}>
            <div className={styles.visualWrapper}>
              <div className={styles.visual} aria-hidden="true">
                <svg className={styles.visualSvg} viewBox="0 0 360 480" aria-hidden="true">
                  <defs>
                    <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2563eb" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#a4f66f" stopOpacity="0.4" />
                    </linearGradient>
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  <path
                    className={styles.visualConnection}
                    d="M180 60 C180 140 280 180 300 240"
                    stroke="url(#connectionGradient)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="8 6"
                    strokeLinecap="round"
                    strokeDashoffset="120"
                  />
                  <path
                    className={styles.visualConnection}
                    d="M180 60 C180 140 80 180 60 240"
                    stroke="url(#connectionGradient)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="8 6"
                    strokeLinecap="round"
                    strokeDashoffset="120"
                  />
                  <path
                    className={styles.visualConnection}
                    d="M300 240 C320 300 310 380 280 420"
                    stroke="url(#connectionGradient)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="8 6"
                    strokeLinecap="round"
                    strokeDashoffset="120"
                  />
                  <path
                    className={styles.visualConnection}
                    d="M60 240 C40 300 50 380 80 420"
                    stroke="url(#connectionGradient)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="8 6"
                    strokeLinecap="round"
                    strokeDashoffset="120"
                  />
                  <path
                    className={styles.visualConnection}
                    d="M180 60 C180 120 180 300 180 360"
                    stroke="url(#connectionGradient)"
                    strokeWidth="1.5"
                    fill="none"
                    strokeDasharray="6 8"
                    strokeLinecap="round"
                    strokeDashoffset="120"
                  />

                  <g className={styles.visualNode} style={{ transformOrigin: "180px 60px" }}>
                    <circle cx="180" cy="60" r="36" fill="#111827" stroke="#2563eb" strokeWidth="1.5" filter="url(#glow)" />
                    <circle cx="180" cy="60" r="28" fill="none" stroke="#a4f66f" strokeWidth="1" strokeDasharray="4 6" opacity="0.4" />
                    <text x="180" y="65" textAnchor="middle" fill="#a4f66f" fontSize="10" fontWeight="600" fontFamily="Inter, sans-serif" letterSpacing="0.12em">GOAL</text>
                  </g>

                  <g className={styles.visualNode} style={{ transformOrigin: "300px 240px" }}>
                    <circle cx="300" cy="240" r="32" fill="#111827" stroke="#2563eb" strokeWidth="1.5" />
                    <circle cx="300" cy="240" r="24" fill="none" stroke="#a4f66f" strokeWidth="1" strokeDasharray="4 6" opacity="0.4" />
                    <text x="300" y="245" textAnchor="middle" fill="#a4f66f" fontSize="9" fontWeight="600" fontFamily="Inter, sans-serif" letterSpacing="0.1em">PLAN</text>
                  </g>

                  <g className={styles.visualNode} style={{ transformOrigin: "60px 240px" }}>
                    <circle cx="60" cy="240" r="32" fill="#111827" stroke="#2563eb" strokeWidth="1.5" />
                    <circle cx="60" cy="240" r="24" fill="none" stroke="#a4f66f" strokeWidth="1" strokeDasharray="4 6" opacity="0.4" />
                    <text x="60" y="245" textAnchor="middle" fill="#a4f66f" fontSize="9" fontWeight="600" fontFamily="Inter, sans-serif" letterSpacing="0.1em">TOOLS</text>
                  </g>

                  <g className={styles.visualNode} style={{ transformOrigin: "280px 420px" }}>
                    <circle cx="280" cy="420" r="28" fill="#111827" stroke="#a4f66f" strokeWidth="1.5" />
                    <text x="280" y="424" textAnchor="middle" fill="#a4f66f" fontSize="8" fontWeight="600" fontFamily="Inter, sans-serif" letterSpacing="0.08em">EXECUTE</text>
                  </g>

                  <g className={styles.visualNode} style={{ transformOrigin: "80px 420px" }}>
                    <circle cx="80" cy="420" r="28" fill="#111827" stroke="#a4f66f" strokeWidth="1.5" />
                    <text x="80" y="424" textAnchor="middle" fill="#a4f66f" fontSize="8" fontWeight="600" fontFamily="Inter, sans-serif" letterSpacing="0.08em">VERIFY</text>
                  </g>

                  <g className={styles.visualNode} style={{ transformOrigin: "180px 360px" }}>
                    <circle cx="180" cy="360" r="24" fill="#111827" stroke="rgba(164,246,111,0.3)" strokeWidth="1" strokeDasharray="3 5" />
                    <text x="180" y="364" textAnchor="middle" fill="rgba(164,246,111,0.6)" fontSize="8" fontWeight="500" fontFamily="Inter, sans-serif" letterSpacing="0.1em">LOOP</text>
                  </g>
                </svg>

                <div className={styles.visualLegend}>
                  <div className={styles.legendItem}>
                    <span className={styles.legendDot} style={{ background: "#2563eb" }} />
                    <span>Agent Decision Point</span>
                  </div>
                  <div className={styles.legendItem}>
                    <span className={styles.legendDot} style={{ background: "#a4f66f" }} />
                    <span>Completion / Output</span>
                  </div>
                  <div className={styles.legendItem}>
                    <span className={styles.legendDotDashed} />
                    <span>Iterative Flow</span>
                  </div>
                </div>
              </div>

              <div className={styles.stats}>
                <div className={styles.stat}>
                  <div className={styles.statValue}>Auditable</div>
                  <div className={styles.statLabel}>Decision and action trail</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statValue}>Guardrailed</div>
                  <div className={styles.statLabel}>Human approval where required</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statValue}>Connected</div>
                  <div className={styles.statLabel}>Tools, data and workflows</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
