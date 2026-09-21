import Image from "next/image";
import Link from "next/link";

import { caseStudies } from "../data";
import styles from "../CaseStudiesPage.module.css";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true">
      <path d="M3 9h11M10 4l5 5-5 5" />
    </svg>
  );
}

export function CaseStudyList() {
  return (
    <section id="selected-case-studies" className={styles.work} aria-label="Selected case studies">
      <div className={styles.shell}>
        <div className={styles.studyGrid}>
          {caseStudies.map((study, index) => (
            <article className={styles.studyItem} key={study.slug} data-cs-card>
              <Link className={styles.studyCard} href={`/case-studies/${study.slug}`}>
                <div className={styles.visualFrame} data-cs-frame>
                  <Image
                    src={study.image}
                    alt={study.imageAlt}
                    fill
                    sizes="(max-width: 700px) 100vw, (max-width: 1080px) 50vw, 33vw"
                    priority={index === 0}
                    data-cs-image
                  />
                </div>

                <div className={styles.cardBody} data-cs-card-body>
                  <div className={styles.cardMeta}>
                    <span className={styles.category}>{study.category}</span>
                    <span className={styles.cardLocation}>{study.location}</span>
                  </div>

                  <h2>{study.name}</h2>
                  <p className={styles.cardSummary}>{study.summary}</p>

                  <div className={styles.cardFooter}>
                    <p className={styles.cardOutcome}>{study.outcome}</p>
                    <span className={styles.cardLink} aria-hidden="true">
                      <ArrowIcon />
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
