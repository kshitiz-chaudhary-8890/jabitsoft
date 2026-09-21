"use client";

import { Fragment, useLayoutEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../../services/landing/ServiceHero/ServiceHero.module.css";

const HillsBackground = dynamic(
  () => import("../../../three/HillsBackground/HillsBackground.jsx"),
  { ssr: false },
);

function AnimatedText({ text }: { text: string }) {
  return text.split(" ").map((word, wordIndex, words) => (
    <Fragment key={`${word}-${wordIndex}`}>
      <span className={styles.word}>
        {Array.from(word).map((char, charIndex) => (
          <span className={styles.char} key={`${wordIndex}-${charIndex}`}>
            {char}
          </span>
        ))}
      </span>
      {wordIndex < words.length - 1 ? " " : null}
    </Fragment>
  ));
}

export function AboutHero() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const hero = ref.current;
    if (!hero) return undefined;

    gsap.registerPlugin(ScrollTrigger);
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return undefined;

    const ctx = gsap.context(() => {
      const nav = document.querySelector(".site-nav");
      const chars = hero.querySelectorAll(`.${styles.char}`);
      const kicker = hero.querySelector(`.${styles.kicker}`);
      const description = hero.querySelector(`.${styles.description}`);
      const actions = hero.querySelector(`.${styles.actions}`);
      const hills = hero.querySelector(".hero-hills-layer");
      const heading = hero.querySelector("h1");

      if (!description || !actions || !heading) return undefined;

      if (nav) gsap.set(nav, { opacity: 0, y: -14 });
      if (kicker) gsap.set(kicker, { opacity: 0, y: 10 });
      gsap.set(chars, {
        opacity: 0,
        yPercent: 96,
        rotateX: -12,
        transformOrigin: "50% 100%",
        force3D: true,
      });
      gsap.set([description, actions], { opacity: 0, y: 18 });

      const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
      if (nav) intro.to(nav, { opacity: 1, y: 0, duration: 0.42 }, 0);
      if (kicker) intro.to(kicker, { opacity: 1, y: 0, duration: 0.35 }, 0);
      intro
        .to(
          chars,
          {
            opacity: 1,
            yPercent: 0,
            rotateX: 0,
            duration: 0.55,
            stagger: { each: 0.006, from: "start" },
            clearProps: "transform",
          },
          0.06,
        )
        .to(description, { opacity: 1, y: 0, duration: 0.38, clearProps: "opacity,transform" }, 0.6)
        .to(actions, { opacity: 1, y: 0, duration: 0.4, clearProps: "opacity,transform" }, 0.7);

      gsap
        .timeline({
          scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.85 },
          defaults: { ease: "none" },
        })
        .to(heading, { yPercent: -8 }, 0)
        .to([description, actions], { yPercent: -14 }, 0);
      if (hills) {
        gsap.to(hills, {
          yPercent: 5,
          scale: 1.065,
          transformOrigin: "50% 100%",
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 0.85,
            invalidateOnRefresh: true,
          },
        });
      }
    }, hero);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="top" className={styles.hero} aria-labelledby="about-title">
      <HillsBackground />
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.inner}>
        <p className={styles.kicker}>About JabitSoft</p>
        <h1 id="about-title" aria-label="Software Built Around How Business Really Works">
          <span className={styles.line}>
            <AnimatedText text="Software Built Around" />
          </span>
          <span className={styles.line}>
            <AnimatedText text="How Business Really Works" />
            <span className={styles.dot}>.</span>
          </span>
        </h1>
        <p className={styles.description}>
          JabitSoft is a Noida-based software development company building dependable web, mobile,
          ERP, cloud and AI solutions. We combine product thinking, design and engineering to
          support real operations and long-term growth.
        </p>
        <div className={styles.actions}>
          <Link className={styles.ctaPrimary} href="#our-story" data-site-button data-button-variant="primary">
            Explore our story
            <span className={styles.arrow} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 15h11M12 9l5 6-5 6"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Link>
          <Link className={styles.ctaSecondary} href="/services" data-site-button data-button-variant="secondary">
            Explore our services
            <span className={styles.arrow} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 15h11M12 9l5 6-5 6"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
