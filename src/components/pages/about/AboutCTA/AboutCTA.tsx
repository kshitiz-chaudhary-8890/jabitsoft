"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./AboutCTA.module.css";

export function AboutCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const cleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      const intro = section.querySelectorAll("[data-cta-intro]");
      const headingLines = section.querySelectorAll("[data-cta-heading-line]");
      const heading = section.querySelector("[data-cta-heading]");
      const signature = section.querySelector("[data-cta-signature] path");
      const reveals = section.querySelectorAll("[data-cta-reveal]");
      const buttons = section.querySelectorAll("[data-cta-button]");
      const ambientGrid = section.querySelector("[data-cta-ambient]");
      const wipe = section.querySelector("[data-cta-wipe]");
      const glow = section.querySelector("[data-cta-glow]");
      const bridgeLine = section.querySelector("[data-cta-bridge] path");
      const progressFill = section.querySelector("[data-cta-progress]");

      if (reduced) {
        gsap.set(headingLines, { backgroundSize: "100% 100%, 100% 100%" });
        return;
      }

      // Initial states
      gsap.set(intro, { autoAlpha: 0, y: 34 });
      gsap.set(reveals, { autoAlpha: 0, y: 22 });
      gsap.set(buttons, { autoAlpha: 0, y: 18 });

      // Master entrance.
      gsap
        .timeline({
          defaults: { ease: "power4.out" },
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            once: true,
            invalidateOnRefresh: true,
          },
        })
        .to(intro, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.09 })
        .to(reveals, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.1 }, "-=0.4")
        .to(buttons, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.08 }, "-=0.3");

      // Light curtain wipe (scrubbed) — same idea as Beliefs.
      if (wipe) {
        gsap.fromTo(
          wipe,
          { clipPath: "inset(0% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 100% 0%)",
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              end: "top 35%",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          },
        );
      }

      // Ambient grid parallax.
      if (ambientGrid) {
        gsap.to(ambientGrid, {
          yPercent: -16,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      // Glow parallax.
      if (glow) {
        gsap.to(glow, {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      // Heading left-to-right scrubbed fill (dark-section variant).
      if (heading && headingLines.length) {
        const headingFill = gsap.timeline({
          scrollTrigger: {
            trigger: heading,
            start: "top 88%",
            end: "bottom 42%",
            scrub: 0.9,
            invalidateOnRefresh: true,
          },
        });

        headingLines.forEach((line, index) => {
          headingFill.fromTo(
            line,
            { backgroundSize: "0% 100%, 100% 100%" },
            {
              backgroundSize: "100% 100%, 100% 100%",
              duration: 1,
              ease: "none",
            },
            index * 0.5,
          );
        });
      }

      // Signature underline draws as the heading scrolls in.
      if (signature) {
        const len = (signature as SVGPathElement).getTotalLength();
        gsap.set(signature, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(signature, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            end: "top 30%",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
      }

      // Bridge line — the memorable closing motion: a thin line that draws across the
      // bottom of the section, visually bridging this CTA into the footer.
      if (bridgeLine) {
        const path = bridgeLine as SVGPathElement;
        let len = 0;
        try {
          len = path.getTotalLength?.() ?? 0;
        } catch {
          len = 0;
        }
        if (len) {
          gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
          gsap.to(path, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: section.querySelector(`.${styles.bridge}`),
              start: "top 95%",
              end: "bottom 70%",
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          });
        }
      }

      // Section progress hairline.
      if (progressFill) {
        gsap.fromTo(
          progressFill,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 60%",
              end: "bottom 80%",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          },
        );
      }

      // Magnetic hover on the primary CTA (pointer-only).
      if (window.matchMedia("(hover: hover) and (fine: pointer)").matches) {
        buttons.forEach((btn) => {
          const target = btn as HTMLElement;
          const xTo = gsap.quickTo(target, "x", { duration: 0.5, ease: "expo.out" });
          const yTo = gsap.quickTo(target, "y", { duration: 0.5, ease: "expo.out" });
          const onMove = (event: MouseEvent) => {
            const bounds = target.getBoundingClientRect();
            xTo((event.clientX - (bounds.left + bounds.width / 2)) * 0.18);
            yTo((event.clientY - (bounds.top + bounds.height / 2)) * 0.22);
          };
          const onLeave = () => {
            xTo(0);
            yTo(0);
          };
          target.addEventListener("mousemove", onMove);
          target.addEventListener("mouseleave", onLeave);
          cleanups.push(() => {
            target.removeEventListener("mousemove", onMove);
            target.removeEventListener("mouseleave", onLeave);
          });
        });
      }
    }, section);

    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about-cta"
      className={styles.section}
      aria-labelledby="about-cta-title"
    >
      <div data-cta-glow className={styles.glow} aria-hidden="true" />
      <div data-cta-ambient className={styles.ambientGrid} aria-hidden="true" />
      <span data-cta-wipe className={styles.wipe} aria-hidden="true" />

      <div className={styles.shell}>
        <header className={styles.heading}>
          <p data-cta-intro className={styles.eyebrow}>
            (Let&apos;s Build)
          </p>

          <h2
            id="about-cta-title"
            data-cta-heading
            data-reveal-heading
            className={styles.display}
          >
            <span className={styles.titleLine} data-cta-heading-line>
              Let&apos;s Build What
            </span>
            <span className={styles.titleLine} data-cta-heading-line>
              Comes Next, Together.
            </span>
          </h2>

          <p data-cta-intro className={styles.description}>
            If this way of thinking matches what you&apos;re trying to build, let&apos;s talk.
            Tell us the business objective — we&apos;ll bring the engineering, design, and
            delivery to turn it into software that earns its place.
          </p>

          <svg
            data-cta-signature
            className={styles.signature}
            viewBox="0 0 320 28"
            fill="none"
            aria-hidden="true"
          >
            <path d="M4 18 C 48 4, 96 4, 138 16 C 180 28, 224 28, 264 14 C 286 6, 304 8, 316 14" />
          </svg>
        </header>

        <div className={styles.actions} data-cta-reveal>
          <a
            data-cta-button
            href="/contact"
            className={`${styles.button} ${styles.buttonPrimary}`}
          >
            <span className={styles.buttonLabel}>Start a conversation</span>
            <span className={styles.buttonArrow} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12 L19 12 M13 6 L19 12 L13 18"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>

          <a
            data-cta-button
            href="/services"
            className={`${styles.button} ${styles.buttonSecondary}`}
          >
            <span className={styles.buttonLabel}>Explore our services</span>
          </a>
        </div>

        <div className={styles.progressLine} aria-hidden="true">
          <span data-cta-progress className={styles.progressFill} />
        </div>

        <div className={styles.bridge} aria-hidden="true">
          <svg
            data-cta-bridge
            className={styles.bridgeLine}
            viewBox="0 0 1200 40"
            preserveAspectRatio="none"
          >
            <path d="M0 20 C 300 4, 600 36, 900 20 C 1050 12, 1150 24, 1200 20" />
          </svg>
          <span className={styles.bridgeLabel}>
            JabitSoft · Software that moves the business forward
          </span>
        </div>
      </div>
    </section>
  );
}
