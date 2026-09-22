"use client";

import { useEffect, useState } from "react";

import styles from "./SiteLoader.module.css";

const WORDS = ["Welcome", "to", "JabitSoft"];

export function SiteLoader() {
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      return undefined;
    }

    document.documentElement.style.overflow = "hidden";

    const minShow = window.setTimeout(() => setLeaving(true), 2300);
    const kill = window.setTimeout(() => {
      setGone(true);
      document.documentElement.style.overflow = "";
    }, 3950);

    return () => {
      window.clearTimeout(minShow);
      window.clearTimeout(kill);
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (reduced || gone) return null;

  let li = 0;

  return (
    <div className={`${styles.veils} ${leaving ? styles.leaving : ""}`} aria-hidden="true">
      <h1 className={styles.heading}>
        {WORDS.map((word) => (
          <span key={word} className={styles.word}>
            {word.split("").map((ch) => {
              const i = li++;
              return (
                <span key={i} className={styles.mask}>
                  <span
                    className={styles.char}
                    style={{ "--i": i } as React.CSSProperties}
                  >
                    {ch}
                  </span>
                </span>
              );
            })}
          </span>
        ))}
      </h1>
      <p className={styles.kicker}>JabitSoft.com</p>
    </div>
  );
}
