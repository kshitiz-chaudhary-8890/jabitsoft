"use client";

import Link from "next/link";
import { useRef } from "react";

import { useAboutReveal } from "../useAboutReveal";
import styles from "./AboutCTA.module.css";

function Arrow() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function AboutCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  useAboutReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      id="about-cta"
      data-about-cta
      className={styles.section}
      aria-labelledby="about-cta-title"
    >
      <div className={styles.shell}>
        <div className={styles.card}>
          <div className={styles.visual} aria-hidden="true" />
          <div className={styles.content}>
            <h2 data-about-intro id="about-cta-title" className={styles.display}>
              Ready to build what lasts?
            </h2>
            <p data-about-intro className={styles.lede}>
              Tell us what needs to work better — we&apos;ll reply in one business
              day with clear next steps.
            </p>
            <div data-about-intro className={styles.actions}>
              <Link
                href="/contact-us"
                className={styles.primary}
              >
                Start a conversation
                <Arrow />
              </Link>
              <Link
                href="/case-studies"
                className={styles.secondary}
              >
                See our work
                <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
