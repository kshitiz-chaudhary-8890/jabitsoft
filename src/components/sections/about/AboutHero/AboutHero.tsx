"use client";

import { useLayoutEffect, useRef } from "react";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./AboutHero.module.css";

const capabilities = [
  { index: "01", label: "Agentic AI" },
  { index: "02", label: "Cloud Consulting" },
  { index: "03", label: "Mobile Apps" },
  { index: "04", label: "ERP Services" },
  { index: "05", label: "SEO / Marketing" },
  { index: "06", label: "Website Solutions" },
];

/** Split an element's text into masked word wrappers for a cascading reveal. */
function splitWords(el: Element): Element[] {
  const text = el.textContent ?? "";
  el.setAttribute("aria-label", text.trim());
  el.innerHTML = "";
  const words = text.split(/\s+/).filter(Boolean);
  const inners: Element[] = [];
  words.forEach((word, index) => {
    const wrap = document.createElement("span");
    wrap.className = styles.word;
    wrap.setAttribute("aria-hidden", "true");
    const inner = document.createElement("span");
    inner.className = styles.wordInner;
    inner.textContent = word;
    wrap.appendChild(inner);
    el.appendChild(wrap);
    inners.push(inner);
    if (index < words.length - 1) el.appendChild(document.createTextNode(" "));
  });
  return inners;
}

export function AboutHero() {
  const heroRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const hero = heroRef.current;
    if (!hero) return undefined;

    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const cleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      const support = hero.querySelectorAll("[data-hero-support]");
      const lines = hero.querySelectorAll("[data-hero-line]");
      const ambientGrid = hero.querySelector("[data-hero-ambient]");
      const contours = hero.querySelector("[data-hero-contours]");
      const orb = hero.querySelector("[data-hero-orb]");
      const headline = hero.querySelector("[data-hero-headline]");
      const accentUnderline = hero.querySelector("[data-hero-underline] path");
      const ctaWrap = hero.querySelector("[data-hero-cta-wrap]");

      // Split each headline line into masked words.
      const lineInners: Element[] = [];
      lines.forEach((line) => {
        lineInners.push(...splitWords(line));
      });

      if (reduced) {
        return;
      }

      // ---------- Initial states ----------
      gsap.set(support, { autoAlpha: 0, y: 24 });
      gsap.set(lineInners, { yPercent: 115 });

      // ---------- Master entrance ----------
      gsap.timeline({
        defaults: { ease: "power4.out" },
        delay: 0.1,
      })
        .to(support, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08 }, 0)
        .to(
          lineInners,
          { yPercent: 0, duration: 1.05, stagger: 0.06, ease: "expo.out" },
          0.18,
        );

      // ---------- Accent underline draws itself ----------
      if (accentUnderline) {
        const len = (accentUnderline as SVGPathElement).getTotalLength();
        gsap.set(accentUnderline, {
          strokeDasharray: len,
          strokeDashoffset: len,
        });
        gsap.to(accentUnderline, {
          strokeDashoffset: 0,
          duration: 1,
          ease: "power2.inOut",
          delay: 1.1,
        });
      }

      // ---------- Ambient parallax (slow drift across the hero) ----------
      if (ambientGrid) {
        gsap.to(ambientGrid, {
          yPercent: -14,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      if (contours) {
        gsap.to(contours, {
          yPercent: -10,
          xPercent: -4,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }

      if (orb) {
        gsap.to(orb, {
          yPercent: -22,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.4,
          },
        });
      }

      // ---------- Headline exit parallax ----------
      if (headline) {
        gsap.to(headline, {
          yPercent: -14,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      // ---------- Magnetic hover on CTA ----------
      if (ctaWrap && window.matchMedia("(hover: hover) and (fine: pointer)").matches) {
        const target = ctaWrap as HTMLElement;
        const xTo = gsap.quickTo(target, "x", { duration: 0.5, ease: "expo.out" });
        const yTo = gsap.quickTo(target, "y", { duration: 0.5, ease: "expo.out" });
        const onMove = (event: MouseEvent) => {
          const bounds = target.getBoundingClientRect();
          xTo((event.clientX - (bounds.left + bounds.width / 2)) * 0.25);
          yTo((event.clientY - (bounds.top + bounds.height / 2)) * 0.25);
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
      }
    }, hero);

    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  return (
    <section ref={heroRef} id="about-hero" aria-labelledby="about-hero-heading" className={styles.hero}>
      <div className={styles.ambient} aria-hidden="true" />
      <div data-hero-ambient className={styles.ambientGrid} aria-hidden="true" />

      <svg
        data-hero-contours
        className={styles.contours}
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <path d="M-40 470 C 120 380, 260 420, 380 360 C 500 300, 620 340, 840 250" />
        <path d="M-40 410 C 130 320, 270 360, 390 300 C 510 240, 630 280, 840 190" />
        <path d="M-40 350 C 140 260, 280 300, 400 240 C 520 180, 640 220, 840 130" />
        <path className="thin" d="M-40 510 C 110 430, 250 470, 370 410 C 490 350, 610 390, 840 300" />
        <path className="thin" d="M-40 290 C 150 200, 290 240, 410 180 C 530 120, 650 160, 840 70" />
        <path className="thin" d="M-40 230 C 160 140, 300 180, 420 120 C 540 60, 660 100, 840 10" />
        <path className="thin" d="M-40 560 C 100 480, 240 520, 360 460 C 480 400, 600 440, 840 360" />
      </svg>

      <div data-hero-orb className={styles.orb} aria-hidden="true" />

      <div className={styles.shell}>
        <div className={styles.metaRow}>
          <p data-hero-support className={styles.eyebrow}>
            <span className={styles.pulse} aria-hidden="true" />
            00 / About JabitSoft
          </p>
          <span data-hero-support className={styles.stamp}>
            One team · Six disciplines
          </span>
        </div>

        <h1
          id="about-hero-heading"
          data-hero-headline
          className={styles.headline}
          aria-label="One team building software that works together."
        >
          <span data-hero-line className={styles.line}>
            One team building
          </span>
          <span data-hero-line className={styles.line}>
            software that works
          </span>
          <span data-hero-line className={styles.line}>
            <span className={styles.accentWord}>
              together.
              <svg
                data-hero-underline
                className={styles.accentUnderline}
                viewBox="0 0 320 14"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d="M4 9 C 60 2, 140 2, 200 7 C 250 11, 290 8, 316 5" />
              </svg>
            </span>
          </span>
        </h1>

        <div className={styles.split}>
          <div className={styles.copyCol}>
            <p data-hero-support className={styles.copy}>
              JabitSoft is a software and technology partner that turns ambiguous business problems
              into <span className={styles.fill}>clear, dependable digital progress</span> — across
              AI, cloud, mobile, ERP, and the web.
            </p>

            <div data-hero-support className={styles.actions}>
              <div data-hero-cta-wrap className={styles.ctaWrap}>
                <motion.a
                  className={styles.cta}
                  href="mailto:hello@jabitsoft.com"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 400, damping: 26 }}
                >
                  Start a conversation
                  <svg className={styles.ctaArrow} viewBox="0 0 22 10" aria-hidden="true">
                    <path d="M1 5 H 19 M 14 1 L 19 5 L 14 9" />
                  </svg>
                </motion.a>
              </div>
              <a className={styles.ghostLink} href="#our-story">
                Read our story
              </a>
            </div>
          </div>

          <aside data-hero-support className={styles.rail} aria-label="What JabitSoft does">
            <span className={styles.railLabel}>What we do</span>
            <ul className={styles.railList}>
              {capabilities.map((cap) => (
                <li key={cap.index}>
                  <span className={styles.index}>{cap.index}</span>
                  {cap.label}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>

      <div className={styles.scrollCue} aria-hidden="true">
        <span>Scroll</span>
        <span className={styles.scrollCueTrack}>
          <span className={styles.scrollCueFill} />
        </span>
      </div>
    </section>
  );
}
