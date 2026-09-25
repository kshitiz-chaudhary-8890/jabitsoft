"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { gsap } from "gsap";

import type { IndustryDetailData } from "../types";
import styles from "./IndustryHero.module.css";

const HillsBackground = dynamic(
  () => import("@/components/three/HillsBackground/HillsBackground"),
  {
    ssr: false,
  },
);

function TrailingArrow({ tone }: { tone: "onInk" | "onSurface" }) {
  return (
    <span
      className={tone === "onInk" ? styles.arrowOnInk : styles.arrowOnSurface}
      aria-hidden="true"
    >
      <svg viewBox="0 0 16 16" fill="none">
        <path
          d="M3.5 12.5 12.5 3.5M6 3.5h6.5V10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function IndustryHero({ data }: { data: IndustryDetailData }) {
  const ref = useRef<HTMLElement>(null);
  const { hero } = data;
  const words = useMemo(() => hero.headline.split(" "), [hero.headline]);

  // Mount entrance: kicker → masked title words → lede/actions → stats.
  useLayoutEffect(() => {
    const section = ref.current;
    if (!section) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const ctx = gsap.context(() => {
      const kicker = section.querySelector(`.${styles.kicker}`);
      const inners = section.querySelectorAll(`.${styles.wordInner}`);
      const ledeRow = section.querySelector(`.${styles.ledeRow}`);
      const stats = section.querySelectorAll(`.${styles.stats} li`);

      gsap.set(kicker, { autoAlpha: 0, y: 18 });
      gsap.set(inners, { yPercent: 115 });
      gsap.set(ledeRow, { autoAlpha: 0, y: 26 });
      gsap.set(stats, { autoAlpha: 0, y: 22 });

      const tl = gsap.timeline({
        defaults: { ease: "expo.out" },
        delay: 0.45,
        onComplete: () => {
          gsap.set([kicker, ledeRow, inners, stats], { clearProps: "all" });
        },
      });
      tl.to(kicker, { autoAlpha: 1, y: 0, duration: 0.55 })
        .to(inners, { yPercent: 0, duration: 0.8, stagger: 0.04 }, 0.1)
        .to(ledeRow, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.45)
        .to(stats, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.05 }, 0.6);
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={ref} className={styles.hero} aria-labelledby="industry-title">
      <HillsBackground />
      <div className={styles.heroMain}>
        <p className={styles.kicker}>{data.kicker}</p>

        <h1 id="industry-title" className={styles.title} aria-label={hero.headline}>
          {words.map((word, i) => (
            <span key={`${word}-${i}`} className={styles.wordMask} aria-hidden="true">
              <span className={styles.wordInner}>{word}</span>
              {i < words.length - 1 ? " " : ""}
            </span>
          ))}
        </h1>

        <div className={styles.ledeRow}>
          <p className={styles.lede}>{hero.lede}</p>
          <div className={styles.actions}>
            <Link
              href="/#contact"
              className={styles.primary}
              data-site-button
              data-button-variant="primary"
            >
              {hero.primaryCta}
              <TrailingArrow tone="onInk" />
            </Link>
            <Link
              href={data.whatWeBuild ? "#what-we-build" : hero.secondaryCta === "See what we build" ? "#industry-use-cases" : "/services/"}
              className={styles.secondary}
              data-site-button
              data-button-variant="secondary"
            >
              {hero.secondaryCta ?? "Explore all services"}
              <TrailingArrow tone="onSurface" />
            </Link>
          </div>
        </div>

        <ul className={styles.stats}>
          {hero.stats.map((stat, index) => (
            <li key={stat.label}>
              <span className={styles.statIndex}>0{index + 1}</span>
              <strong className={styles.statValue}>{stat.value}</strong>
              <span className={styles.statLabel}>{stat.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.ticker} aria-hidden="true">
        <div className={styles.tickerTrack}>
          {[0, 1].map((copy) => (
            <ul key={copy} className={styles.tickerList}>
              {hero.ticker.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
