"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
  const sectionRef = useRef<HTMLElement>(null);

  // About-style scroll reveals: header fades up, cards cascade in.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return undefined;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const head = section.querySelectorAll(`.${styles.workHead} > *`);
      const cards = section.querySelectorAll(`.${styles.studyItem}`);
      const headingFill = section.querySelector(".section-heading-fill");

      gsap.set(head, { autoAlpha: 0, y: 26 });
      gsap.set(cards, { autoAlpha: 0, y: 40 });

      gsap.to(head, {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 82%", once: true },
      });

      // About-style shared heading fill scrub.
      if (headingFill) {
        gsap.fromTo(
          headingFill,
          { backgroundSize: "0% 100%, 100% 100%" },
          {
            backgroundSize: "100% 100%, 100% 100%",
            ease: "none",
            scrollTrigger: {
              trigger: headingFill,
              start: "top 88%",
              end: "bottom 42%",
              scrub: 0.9,
              invalidateOnRefresh: true,
            },
          },
        );
      }
      gsap.to(cards, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        clearProps: "transform",
        scrollTrigger: { trigger: `.${styles.studyGrid}`, start: "top 85%", once: true },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="selected-case-studies" className={styles.work} aria-label="Selected case studies">
      <div className={styles.shell}>
        <header className={styles.workHead}>
          <p className={styles.eyebrow}>Selected work</p>
          <h2 className={styles.workTitle}>
            <span className="section-heading-fill">Don&apos;t take our word for it.</span>
          </h2>
          <p className={styles.workDesc}>
            Shipped systems, real teams, measured outcomes — browse the builds and
            the numbers behind them.
          </p>
        </header>
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
