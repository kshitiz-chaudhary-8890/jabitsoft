import Link from "next/link";

import styles from "./SharedCTA.module.css";

export type SharedCTAProps = {
  headline: string;
  lede: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  image: string;
};

function Arrow() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function SharedCTA({
  headline,
  lede,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  image,
}: SharedCTAProps) {
  return (
    <section className={styles.section} aria-label={headline}>
      <div className={styles.shell}>
        <div className={styles.card}>
          <div
            className={styles.visual}
            aria-hidden="true"
            style={{ backgroundImage: `url("${image}")` }}
          />
          <div className={styles.content}>
            <h2 className={styles.display}>{headline}</h2>
            <p className={styles.lede}>{lede}</p>
            <div className={styles.actions}>
              <Link href={primaryHref} className={styles.primary}>
                {primaryLabel}
                <Arrow />
              </Link>
              <Link href={secondaryHref} className={styles.secondary}>
                {secondaryLabel}
                <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
