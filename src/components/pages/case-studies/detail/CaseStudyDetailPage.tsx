"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { caseStudies } from "../data";
import { SharedCTA } from "@/components/common/SharedCTA/SharedCTA";
import type { CaseStudyDetail } from "../detailData";
import styles from "./CaseStudyDetailPage.module.css";
import { useCaseStudyDetailMotion } from "./useCaseStudyDetailMotion";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true">
      <path d="M3 9h11M10 4l5 5-5 5" />
    </svg>
  );
}

export function CaseStudyDetailPage({ study }: { study: CaseStudyDetail }) {
  const rootRef = useRef<HTMLDivElement>(null);
  useCaseStudyDetailMotion(rootRef);
  const titleWords = study.name.split(" ");
  const relatedStudies = caseStudies.filter((item) => item.slug !== study.slug).slice(0, 2);

  return (
    <div className={styles.page} ref={rootRef}>
      <section className={styles.hero} aria-labelledby="case-study-title">
        <div className={styles.shell}>
          <div className={styles.heroGrid}>
            <div className={styles.heroTitle}>
              <div className={styles.metaRow} data-detail-copy>
                <span className={styles.categoryBadge}>{study.category}</span>
                <span>Case study · {study.location}</span>
              </div>
              <h1 id="case-study-title" aria-label={study.name}>
                {titleWords.map((word) => (
                  <span className={styles.heroWord} key={word} aria-hidden="true">
                    <span data-detail-word>{word}</span>
                  </span>
                ))}
              </h1>
            </div>

            <div className={styles.heroSummary}>
              <h2 data-detail-copy>{study.headline}</h2>
              <p data-detail-copy>{study.intro}</p>
            </div>
          </div>

          <div className={styles.heroMedia} data-detail-hero-media>
            <div className={styles.artworkCopy} data-detail-copy>
              <span>JabitSoft × {study.name}</span>
              <strong>{study.headline}</strong>
              <p>{study.service}</p>
            </div>

            <div className={styles.productStage} data-detail-hero-image aria-hidden="true">
              <div className={styles.productTopbar}>
                <span>{study.name}</span>
                <div><i /><i /><i /></div>
              </div>
              <div className={styles.productBody}>
                <div className={styles.productNav}>
                  <b>Overview</b><span>Workflows</span><span>Reports</span><span>Settings</span>
                </div>
                <div className={styles.productContent}>
                  <div className={styles.productIntro}>
                    <div><span>Live workspace</span><strong>Operational overview</strong></div>
                    <em>Updated now</em>
                  </div>
                  <div className={styles.productStats}>
                    {study.metrics.map((metric) => (
                      <div key={metric.label}>
                        <span>{metric.label}</span><strong>{metric.value}</strong>
                      </div>
                    ))}
                  </div>
                  <div className={styles.productGrid}>
                    <div className={styles.chartPanel}>
                      <span>Activity</span>
                      <svg viewBox="0 0 420 160" preserveAspectRatio="none">
                        <path d="M0 132 C44 119 63 128 98 96 C132 65 158 112 194 78 C232 42 254 88 292 51 C332 12 367 50 420 18" />
                        <path d="M0 150H420M0 110H420M0 70H420M0 30H420" />
                      </svg>
                    </div>
                    <div className={styles.statusPanel}>
                      <span>Current status</span>
                      <strong>On track</strong>
                      <div><i /><i /><i /><i /><i /></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.mediaLabel}>
              <span>{study.name}</span>
              <span>Case study / {study.category}</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.story} aria-label={`${study.name} project story`}>
        <div className={`${styles.shell} ${styles.storyGrid}`}>
          <aside className={styles.sidebar} data-detail-sidebar>
            <div className={styles.metricPanel}>
              {study.metrics.map((metric) => (
                <div key={metric.label}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>

            <div className={styles.glancePanel}>
              <p>Project at a glance</p>
              <dl>
                <div>
                  <dt>Timeline</dt>
                  <dd>{study.timeline}</dd>
                </div>
                <div>
                  <dt>Team</dt>
                  <dd>{study.team}</dd>
                </div>
                <div>
                  <dt>Service</dt>
                  <dd>{study.service}</dd>
                </div>
                <div>
                  <dt>Tech stack</dt>
                  <dd className={styles.techList}>
                    {study.techStack.map((technology) => (
                      <span key={technology}>{technology}</span>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>
          </aside>

          <article className={styles.narrative}>
            {study.sections.map((section) => (
              <section className={styles.chapter} key={section.number} data-detail-chapter>
                <header className={styles.chapterHeader}>
                  <span>{section.number}</span>
                  <h2>
                    <span className="section-heading-fill">{section.title}</span>
                  </h2>
                  <i aria-hidden="true" />
                </header>

                <div className={styles.chapterCopy}>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} data-detail-paragraph>
                      {paragraph}
                    </p>
                  ))}
                </div>

                {section.image ? (
                  <figure className={styles.storyMedia} data-detail-media>
                    <Image
                      src={section.image.src}
                      alt={section.image.alt}
                      fill
                      sizes="(max-width: 820px) 100vw, 850px"
                      data-detail-image
                    />
                  </figure>
                ) : null}
              </section>
            ))}

            <blockquote className={styles.quote} data-detail-quote>
              <span aria-hidden="true">“</span>
              <p>{study.quote}</p>
              <cite>JabitSoft, on the {study.name} engagement</cite>
            </blockquote>
          </article>
        </div>
      </section>

      <section className={styles.cta} aria-label="Related work">
        <div className={styles.shell}>
          <p className={styles.ctaIndex} data-detail-reveal>
            04 / Related work
          </p>
          <div className={styles.relatedGrid} data-related-work>
            {relatedStudies.map((related) => (
              <Link
                className={styles.relatedCard}
                href={`/case-studies/${related.slug}`}
                key={related.slug}
                data-detail-reveal
              >
                <div className={styles.relatedMedia}>
                  <Image
                    src={related.image}
                    alt={related.imageAlt}
                    fill
                    sizes="(max-width: 800px) 100vw, 44vw"
                  />
                </div>
                <div className={styles.relatedMeta}>
                  <div>
                    <span>{related.category}</span>
                    <h3>{related.name}</h3>
                    <p>{related.summary}</p>
                  </div>
                  <ArrowIcon />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <SharedCTA
        headline={`Building something like ${study.name}?`}
        lede="Start with a focused conversation about the workflow, product or platform you need to move forward."
        primaryLabel="Start a conversation"
        primaryHref="/contact-us"
        secondaryLabel="Explore our services"
        secondaryHref="/services"
        image="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1600&auto=format&fit=crop"
      />
    </div>
  );
}
