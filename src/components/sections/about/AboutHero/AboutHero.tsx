"use client";

import { Fragment, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
// @ts-expect-error The shared homepage hills visual is an existing JavaScript module.
import HillsBackground from "../../../three/HillsBackground/HillsBackground.jsx";
import styles from "./AboutHero.module.css";

const media = {
  software: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=85",
  team: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=500&q=85",
};

function RevealText({ text }: { text: string }) {
  return text.split(" ").map((word, wordIndex, words) => (
    <Fragment key={`${word}-${wordIndex}`}>
      <span className={styles.word}>
        {Array.from(word).map((character, characterIndex) => (
          <span className={styles.char} key={`${wordIndex}-${characterIndex}`}>
            {character}
          </span>
        ))}
      </span>
      {wordIndex < words.length - 1 ? " " : null}
    </Fragment>
  ));
}

export function AboutHero() {
  const heroRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const hero = heroRef.current;
    if (!hero) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const ctx = gsap.context(() => {
      const chars = hero.querySelectorAll(`.${styles.char}`);
      const images = hero.querySelectorAll(`.${styles.inlineImage}`);
      const support = hero.querySelectorAll("[data-hero-support]");

      gsap.set(chars, { opacity: 0, yPercent: 118, rotateX: -24 });
      gsap.set(images, { opacity: 0, yPercent: 28, scale: 0.72 });
      gsap.set(support, { opacity: 0, y: 16 });

      gsap.timeline({ defaults: { ease: "power4.out" } })
        .to(chars, { opacity: 1, yPercent: 0, rotateX: 0, duration: 0.78, stagger: 0.014 }, 0.16)
        .to(images, { opacity: 1, yPercent: 0, scale: 1, duration: 0.7, stagger: 0.14 }, 0.46)
        .to(support, { opacity: 1, y: 0, duration: 0.54, stagger: 0.1 }, 0.82);
    }, hero);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} id="about-hero" aria-labelledby="about-hero-heading" className={styles.hero}>
      <HillsBackground />

      <p data-hero-support className={styles.eyebrow}>
        <span aria-hidden="true" />
        About JabitSoft
      </p>

      <h1 id="about-hero-heading" aria-label="One team building software that works together" className={styles.headline}>
        <span className={styles.line} aria-hidden="true">
          <b><RevealText text="One Team" /></b>{" "}
          <span className={`${styles.inlineImage} ${styles.roundImage}`}>
            <img src={media.team} alt="" width="500" height="500" />
          </span>{" "}
          <RevealText text="Building" />
        </span>
        <span className={styles.line} aria-hidden="true">
          <RevealText text="Software" />{" "}
          <span className={`${styles.inlineImage} ${styles.wideImage}`}>
            <img src={media.software} alt="" width="500" height="320" />
          </span>{" "}
          <RevealText text="That Works" />
        </span>
        <span className={`${styles.line} ${styles.accentLine}`} aria-hidden="true">
          <RevealText text="Together." />
        </span>
      </h1>

      <p data-hero-support className={styles.copy}>
        JabitSoft brings product thinking, design and engineering into one accountable team—so growing businesses can move from idea to dependable systems without disconnected handoffs.
      </p>

      <a data-hero-support className={styles.cta} href="mailto:hello@jabitsoft.com">
        Start a conversation <span aria-hidden="true">→</span>
      </a>
    </section>
  );
}
