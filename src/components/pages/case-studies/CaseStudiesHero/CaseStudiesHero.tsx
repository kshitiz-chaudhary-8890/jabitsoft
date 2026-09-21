import Image from "next/image";
import Link from "next/link";

import { caseStudies } from "../data";
import styles from "../CaseStudiesPage.module.css";

const heroLines = ["Real products,", "measurable progress."];

export function CaseStudiesHero() {
  const featuredStudy = caseStudies[0];

  return (
    <section className={styles.hero} aria-labelledby="case-studies-title">
      <div className={styles.shell}>
        <header className={styles.heroIntro}>
          <div className={styles.heroTopline}>
            <p className={styles.eyebrow} data-cs-hero-copy>
              (Case Studies)
            </p>
            <span className={styles.heroEdition} data-cs-hero-copy>
              Selected studies · 2026
            </span>
          </div>

          <h1 id="case-studies-title" aria-label="Real products, measurable progress">
            {heroLines.map((line, index) => (
              <span
                className={`${styles.heroLine}${index === 1 ? ` ${styles.heroAccent}` : ""}`}
                key={line}
                aria-hidden="true"
              >
                <span data-cs-hero-word>{line}</span>
              </span>
            ))}
          </h1>

          <div className={styles.heroSupport} data-cs-hero-copy>
            <p className={styles.heroCopy}>
              A closer look at the platforms, workflows and business systems we design and
              engineer—and the practical outcomes they create for the teams using them.
            </p>
            <a className={styles.heroJump} href="#selected-case-studies">
              Explore the work <span aria-hidden="true">↓</span>
            </a>
          </div>
        </header>

        <Link
          className={styles.heroFeature}
          href={`/case-studies/${featuredStudy.slug}`}
          data-cs-hero-lower
        >
          <Image
            className={styles.heroFeatureImage}
            src={featuredStudy.image}
            alt={featuredStudy.imageAlt}
            fill
            priority
            sizes="(max-width: 700px) 100vw, 90vw"
          />
          <span className={styles.heroFeatureShade} aria-hidden="true" />

          <div className={styles.heroFeatureTopline}>
            <span className={styles.heroFeatureBadge}>
              <i aria-hidden="true" />
              Featured case study
            </span>
            <div className={styles.heroFeatureTags} aria-hidden="true">
              <span>Product engineering</span>
              <span>Systems design</span>
            </div>
          </div>

          <div className={styles.heroFeatureFooter}>
            <div className={styles.heroFeatureIdent}>
              <span>{featuredStudy.category}</span>
              <strong>{featuredStudy.name}</strong>
            </div>
            <p className={styles.heroFeatureOutcome}>{featuredStudy.outcome}</p>
            <span className={styles.heroFeatureArrow} aria-hidden="true">
              <svg viewBox="0 0 16 16" fill="none">
                <path
                  d="M4.5 11.5 11.5 4.5M11.5 4.5H5.75M11.5 4.5v5.75"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
