"use client";

import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./ServiceHero.module.css";

const HillsBackground = dynamic(() => import("@/components/three/HillsBackground/HillsBackground"), {
  ssr: false,
});

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

const SCOPE_WORDS = [
  "AI systems.",
  "Cloud platforms.",
  "Mobile products.",
  "Core operations.",
  "Digital growth.",
  "Web platforms.",
];

const FACTS = ["Six service lines", "One accountable team", "Design to deployment"];

export function ServiceHero() {
  const ref = useRef<HTMLElement>(null);
  const [scopeIndex, setScopeIndex] = useState(0);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const timer = window.setInterval(() => {
      setScopeIndex((index) => (index + 1) % SCOPE_WORDS.length);
    }, 2600);
    return () => window.clearInterval(timer);
  }, []);

  useLayoutEffect(() => {
    const hero = ref.current;
    if (!hero) return undefined;

    gsap.registerPlugin(ScrollTrigger);
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return undefined;

    const ctx = gsap.context(() => {
      const nav = document.querySelector(".site-nav");
      const chars = hero.querySelectorAll(`.${styles.char}`);
      const swap = hero.querySelector(`.${styles.swap}`);
      const description = hero.querySelector(`.${styles.description}`);
      const actions = hero.querySelector(`.${styles.actions}`);
      const facts = hero.querySelectorAll(`.${styles.fact}`);
      const kicker = hero.querySelector(`.${styles.kicker}`);
      const hills = hero.querySelector(".hero-hills-layer");
      const heading = hero.querySelector("h1");

      if (!swap || !description || !actions || !heading) return undefined;

      if (nav) gsap.set(nav, { opacity: 0, y: -14 });
      if (kicker) gsap.set(kicker, { opacity: 0, y: 10 });
      gsap.set(chars, {
        opacity: 0,
        yPercent: 96,
        rotateX: -12,
        transformOrigin: "50% 100%",
        force3D: true,
      });
      gsap.set([swap, description, actions], { opacity: 0, y: 18 });
      gsap.set(facts, { opacity: 0, y: 14 });

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
        .to(swap, { opacity: 1, y: 0, duration: 0.4, clearProps: "opacity,transform" }, 0.45)
        .to(description, { opacity: 1, y: 0, duration: 0.38, clearProps: "opacity,transform" }, 0.6)
        .to(actions, { opacity: 1, y: 0, duration: 0.4, clearProps: "opacity,transform" }, 0.7)
        .to(facts, { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 }, 0.85);

      gsap
        .timeline({
          scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.85 },
          defaults: { ease: "none" },
        })
        .to(heading, { yPercent: -8 }, 0)
        .to([description, actions], { yPercent: -14 }, 0)
        .to(facts, { yPercent: 6, opacity: 0.35 }, 0);
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
    <section ref={ref} id="top" className={styles.hero} aria-labelledby="service-title">
      <HillsBackground />
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.inner}>
        <p className={styles.kicker}>Software development services</p>
        <h1 id="service-title">
          <span className={styles.line}>
            <AnimatedText text="Built for" />{" "}
            <span className={styles.swap}>
              <span className={styles.swapWord} key={scopeIndex}>
                {SCOPE_WORDS[scopeIndex].replace(/\.$/, "")}
                <span className={styles.dot}>.</span>
              </span>
            </span>
          </span>
          <span className={styles.line}>
            <AnimatedText text="Engineered around your business." />
          </span>
        </h1>
        <p className={styles.description}>
          We pair product thinking, design and engineering to the way your business actually runs.
          One accountable team, no hand-offs.
        </p>
        <div className={styles.actions}>
          <Link className={styles.ctaPrimary} href="#what-we-build" data-site-button data-button-variant="primary">
            Explore what we build
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
          <Link
            className={styles.ctaSecondary}
            href="mailto:hello@jabitsoft.com?subject=New%20Project"
            data-site-button
            data-button-variant="secondary"
          >
            Talk to us
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

      <ul className={styles.proofStrip} aria-label="Delivery facts">
        {FACTS.map((fact) => (
          <li className={styles.fact} key={fact}>
            {fact}
          </li>
        ))}
      </ul>
    </section>
  );
}
