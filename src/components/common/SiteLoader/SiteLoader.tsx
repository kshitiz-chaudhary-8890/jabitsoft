"use client";

import { useEffect, useLayoutEffect, useState } from "react";

import styles from "./SiteLoader.module.css";

const WORDS = ["Welcome", "to", "JabitSoft"];

const SEEN_KEY = "jabit-loader-seen";

export function SiteLoader() {
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);
  const [reduced, setReduced] = useState(false);

  // Runs before paint: repeat visitors never see a flash of the loader,
  // and server HTML always matches the first client render.
  useLayoutEffect(() => {
    let seen = false;
    try {
      seen =
        window.localStorage.getItem(SEEN_KEY) === "1" ||
        document.cookie.split("; ").some((c) => c === `${SEEN_KEY}=1`);
    } catch {
      seen = false;
    }
    if (seen) {
      setGone(true);
    } else {
      try {
        window.localStorage.setItem(SEEN_KEY, "1");
      } catch {
        /* storage unavailable */
      }
      try {
        document.cookie = `${SEEN_KEY}=1; max-age=31536000; path=/; SameSite=Lax`;
      } catch {
        /* cookies unavailable */
      }
    }
  }, []);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      return undefined;
    }

    document.documentElement.style.overflow = "hidden";

    const minShow = window.setTimeout(() => setLeaving(true), 2900);
    const kill = window.setTimeout(() => {
      setGone(true);
      document.documentElement.style.overflow = "";
    }, 4650);

    return () => {
      window.clearTimeout(minShow);
      window.clearTimeout(kill);
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (reduced || gone) return null;

  let li = 0;

  return (
    <div
      className={`site-loader-veil ${styles.veils} ${leaving ? styles.leaving : ""}`}
      aria-hidden="true"
    >
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
