"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { useIndustryReveal } from "../useIndustryReveal";
import type { IndustryDetailData } from "../types";
import { UseCaseDiagram } from "./IndustryVisuals";
import styles from "./UseCases.module.css";

export function UseCases({ data }: { data: IndustryDetailData }) {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);
  useIndustryReveal(ref);
  const { useCases } = data;
  const [active, setActive] = useState(0);
  const total = useCases.items.length;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    const update = () => {
      rafRef.current = 0;
      const cards = track.querySelectorAll<HTMLElement>("[data-uc-card]");
      if (!cards.length) return;
      const gap = cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft - cards[0].offsetWidth : 0;
      const step = cards[0].offsetWidth + gap;
      const i = Math.round(track.scrollLeft / step);
      setActive(Math.max(0, Math.min(total - 1, i)));
    };
    const onScroll = () => {
      if (!rafRef.current) rafRef.current = window.requestAnimationFrame(update);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    update();

    let inObserver: IntersectionObserver | undefined;
    if (typeof IntersectionObserver !== "undefined") {
      ref.current?.classList.add("uc-anim");
      inObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-in");
              inObserver?.unobserve(entry.target);
            }
          }
        },
        { root: track, threshold: 0.35 },
      );
      track.querySelectorAll<HTMLElement>("[data-uc-card]").forEach((card) => inObserver?.observe(card));
    } else {
      track.querySelectorAll<HTMLElement>("[data-uc-card]").forEach((card) => card.classList.add("is-in"));
    }

    return () => {
      track.removeEventListener("scroll", onScroll);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      inObserver?.disconnect();
    };
  }, [total]);

  const scrollTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const next = (index + total) % total;
    const card = track.querySelectorAll<HTMLElement>("[data-uc-card]")[next];
    if (!card) return;
    const delta = card.getBoundingClientRect().left - track.getBoundingClientRect().left;
    track.scrollTo({ left: track.scrollLeft + delta, behavior: "smooth" });
  };

  return (
    <section ref={ref} id="industry-use-cases" className={styles.section} aria-labelledby="industry-usecases-title">
      <div className={styles.shell}>
        <header className={styles.head}>
          <div>
            <p data-ind-intro className={styles.eyebrow}>Use Cases</p>
            <h2 data-ind-intro id="industry-usecases-title" className={styles.title}>
              <span className="section-heading-fill">{useCases.title}</span>
            </h2>
            <p data-ind-intro className={styles.intro}>{useCases.intro}</p>
          </div>
          <div data-ind-intro className={styles.controls}>
            <p className={styles.counter} aria-live="polite">
              {String(active + 1).padStart(2, "0")} <span>/ {String(total).padStart(2, "0")}</span>
            </p>
            <div className={styles.buttons}>
              <button type="button" className={styles.navButton} aria-label="Previous use case" onClick={() => scrollTo(active - 1)}>
                <ArrowLeft size={18} strokeWidth={2} />
              </button>
              <button type="button" className={styles.navButton} aria-label="Next use case" onClick={() => scrollTo(active + 1)}>
                <ArrowRight size={18} strokeWidth={2} />
              </button>
            </div>
            <div className={styles.progress} aria-hidden="true">
              <i style={{ width: `${((active + 1) / total) * 100}%` }} />
            </div>
          </div>
        </header>

        <div ref={trackRef} className={styles.track} role="list" aria-label={`${data.label} use cases`}>
          {useCases.items.map((item, index) => (
            <article data-ind-item data-uc-card key={item.title} className={styles.card} role="listitem">
              <div className={styles.visual}>
                <UseCaseDiagram slug={data.slug} index={index} />
              </div>
              <div className={styles.body}>
                <p className={styles.index} aria-hidden="true"><span>{String(index + 1).padStart(2, "0")}</span><i /></p>
                <h3>{item.title}</h3>
                <p className={styles.text}>{item.text}</p>
                {item.points?.length ? (
                  <ul className={styles.pills}>
                    {item.points.map((point) => <li key={point}>{point}</li>)}
                  </ul>
                ) : null}
              </div>
            </article>
          ))}
        </div>
        <p className={styles.hint} aria-hidden="true">Swipe or use arrows to explore</p>
      </div>
    </section>
  );
}
