"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./FinalCTA.module.css";

export function FinalCTA() {
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
      const description = section.querySelector(`.${styles.description}`);
      const ctaPrimary = section.querySelector(`.${styles.ctaPrimary}`);
      const ctaSecondary = section.querySelector(`.${styles.ctaSecondary}`);
      const trustItems = section.querySelectorAll(`.${styles.trustItem}`);
      const visual = section.querySelector(`.${styles.visual}`);
      const visualNodes = section.querySelectorAll(`.${styles.visualNode}`);
      const visualConnections = section.querySelectorAll(`.${styles.visualConnection}`);
      const particles = section.querySelectorAll(`.${styles.particle}`);

      gsap.set([eyebrow, heading, description], { opacity: 0, y: 28 });
      gsap.set([ctaPrimary, ctaSecondary], { opacity: 0, y: 20, scale: 0.97 });
      gsap.set(trustItems, { opacity: 0, y: 16, scale: 0.9 });
      gsap.set(visual, { opacity: 0, scale: 0.96 });
      gsap.set(visualNodes, { opacity: 0, scale: 0.7, y: 24 });
      gsap.set(visualConnections, { strokeDashoffset: 180, opacity: 0 });
      gsap.set(particles, { opacity: 0, scale: 0, y: 30 });

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
        .to([ctaPrimary, ctaSecondary], { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.08 }, 0.3)
        .to(trustItems, { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.06 }, 0.4)
        .to(visual, { opacity: 1, scale: 1, duration: 0.7 }, 0.25)
        .to(visualNodes, { opacity: 1, scale: 1, y: 0, duration: 0.55, stagger: 0.07, ease: "back.out(1.4)" }, 0.4)
        .to(visualConnections, { strokeDashoffset: 0, opacity: 0.35, duration: 1.2, stagger: 0.15, ease: "power2.out" }, 0.55)
        .to(particles, { opacity: 0.6, scale: 1, y: 0, duration: 0.8, stagger: 0.04, ease: "power3.out" }, 0.7);

      // Ambient particle animation
      particles.forEach((particle, i) => {
        gsap.to(particle, {
          y: "-=20",
          x: (i % 2 === 0 ? "+=15" : "-=15"),
          opacity: 0.3,
          duration: 3 + i * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.3,
        });
      });

      // Visual node subtle float
      visualNodes.forEach((node, i) => {
        gsap.to(node, {
          y: "+=8",
          duration: 2.5 + i * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className={styles.section} aria-labelledby="final-cta-title">
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>(Ready to Start)</p>
          <h2 id="final-cta-title" className={styles.heading}>
            Build your agentic workforce with JabitSoft
          </h2>
          <p className={styles.description}>
            From discovery through production, we handle the technical complexity while keeping your team close to every important decision.
          </p>
        </header>

        <div className={styles.ctaGroup}>
          <Link className={styles.ctaPrimary} href="/contact" data-site-button data-button-variant="primary" data-button-theme="dark">
            <span>Start a Conversation</span>
            <svg className={styles.ctaArrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <Link className={styles.ctaSecondary} href="#how-it-works" data-site-button data-button-variant="secondary" data-button-theme="dark">
            Review Our Process
          </Link>
        </div>

        <div className={styles.trust}>
          <div className={styles.trustItem}>
            <span className={styles.trustIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <path d="M8 17h8" />
                <path d="M12 11v6" />
              </svg>
            </span>
            <div>
              <span className={styles.trustValue}>Human Approval</span>
              <span className={styles.trustLabel}>At Critical Steps</span>
            </div>
          </div>
          <div className={styles.trustItem}>
            <span className={styles.trustIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </span>
            <div>
              <span className={styles.trustValue}>Clear Guardrails</span>
              <span className={styles.trustLabel}>Defined Up Front</span>
            </div>
          </div>
          <div className={styles.trustItem}>
            <span className={styles.trustIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </span>
            <div>
              <span className={styles.trustValue}>Observable Actions</span>
              <span className={styles.trustLabel}>Designed for Review</span>
            </div>
          </div>
          <div className={styles.trustItem}>
            <span className={styles.trustIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </span>
            <div>
              <span className={styles.trustValue}>Practical Handover</span>
              <span className={styles.trustLabel}>Built Around Your Team</span>
            </div>
          </div>
        </div>

        <div className={styles.visualWrapper}>
          <div className={styles.visual} aria-hidden="true">
            <svg className={styles.visualSvg} viewBox="0 0 400 280" aria-hidden="true">
              <defs>
                <linearGradient id="ctaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2563eb" />
                  <stop offset="50%" stopColor="#a4f66f" />
                  <stop offset="100%" stopColor="#0e7490" />
                </linearGradient>
                <filter id="particleGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <path
                className={styles.visualConnection}
                d="M80 140 C140 100 220 180 280 140"
                stroke="url(#ctaGradient)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="8 6"
                strokeLinecap="round"
                strokeDashoffset="180"
              />
              <path
                className={styles.visualConnection}
                d="M80 140 C140 180 220 100 280 140"
                stroke="url(#ctaGradient)"
                strokeWidth="1.5"
                fill="none"
                strokeDasharray="6 8"
                strokeLinecap="round"
                strokeDashoffset="180"
                opacity="0.5"
              />

              <g className={styles.visualNode} style={{ transformOrigin: "80px 140px" }}>
                <circle cx="80" cy="140" r="28" fill="#111827" stroke="#2563eb" strokeWidth="2" />
                <circle cx="80" cy="140" r="20" fill="none" stroke="rgba(164,246,111,0.3)" strokeWidth="1" strokeDasharray="4 6" />
                <text x="80" y="144" textAnchor="middle" fill="#a4f66f" fontSize="8" fontWeight="600" fontFamily="Inter, sans-serif" letterSpacing="0.08em">DISCOVER</text>
              </g>

              <g className={styles.visualNode} style={{ transformOrigin: "200px 140px" }}>
                <circle cx="200" cy="140" r="32" fill="#111827" stroke="url(#ctaGradient)" strokeWidth="2" filter="url(#particleGlow)" />
                <circle cx="200" cy="140" r="24" fill="none" stroke="rgba(164,246,111,0.4)" strokeWidth="1" strokeDasharray="4 6" />
                <text x="200" y="144" textAnchor="middle" fill="#a4f66f" fontSize="9" fontWeight="600" fontFamily="Inter, sans-serif" letterSpacing="0.06em">BUILD</text>
              </g>

              <g className={styles.visualNode} style={{ transformOrigin: "320px 140px" }}>
                <circle cx="320" cy="140" r="28" fill="#111827" stroke="#059669" strokeWidth="2" />
                <circle cx="320" cy="140" r="20" fill="none" stroke="rgba(164,246,111,0.3)" strokeWidth="1" strokeDasharray="4 6" />
                <text x="320" y="144" textAnchor="middle" fill="#a4f66f" fontSize="8" fontWeight="600" fontFamily="Inter, sans-serif" letterSpacing="0.08em">SCALE</text>
              </g>

              {Array.from({ length: 12 }).map((_, i) => (
                <circle
                  key={i}
                  className={styles.particle}
                  cx={60 + (i % 6) * 48 + (i % 2 === 0 ? -10 : 10)}
                  cy={80 + Math.floor(i / 6) * 60 + (i % 3 === 0 ? -15 : 15)}
                  r={i % 3 === 0 ? 3 : i % 3 === 1 ? 2 : 1.5}
                  fill={i % 3 === 0 ? "#a4f66f" : i % 3 === 1 ? "#2563eb" : "#0e7490"}
                  opacity="0"
                  filter="url(#particleGlow)"
                />
              ))}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
