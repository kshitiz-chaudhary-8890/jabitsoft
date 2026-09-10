"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./CompanyLens.module.css";

const perspectives = [
  {
    title: "Business context",
    kicker: "Begin with what matters",
    copy: "We get close to the decisions, teams and operating reality behind the brief—so the work solves the right problem.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1600&q=88",
    alt: "Team discussing work around a table",
  },
  {
    title: "Real people",
    kicker: "Design around behaviour",
    copy: "Every interface has to earn its place in someone’s day. We shape useful experiences around the people who rely on them.",
    image: "https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?auto=format&fit=crop&w=1600&q=88",
    alt: "Team collaborating around a screen",
  },
  {
    title: "Lasting systems",
    kicker: "Leave room to grow",
    copy: "We engineer the foundation with the next release, next customer and next business decision already in view.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=88",
    alt: "Developer working at a laptop",
  },
];

export function CompanyLens() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const intro = section.querySelectorAll("[data-lens-intro]");
      const chapters = section.querySelectorAll("[data-lens-chapter]");
      const images = section.querySelectorAll("[data-lens-image]");
      const chapterCopy = section.querySelectorAll("[data-lens-copy]");

      gsap.set(intro, { autoAlpha: 0, y: 44 });
      gsap.set(chapters, { autoAlpha: 0, clipPath: "inset(7% 7% 7% 7% round 24px)" });
      gsap.set(images, { scale: 1.18 });
      gsap.set(chapterCopy, { autoAlpha: 0, y: 28 });

      const entrance = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: section, start: "top 76%", once: true, invalidateOnRefresh: true },
      });

      entrance
        .to(intro, { autoAlpha: 1, y: 0, duration: 0.62, stagger: 0.075 })
        .to(chapters, { autoAlpha: 1, clipPath: "inset(0% 0% 0% 0% round 24px)", duration: 0.92, stagger: 0.1 }, "-=0.14")
        .to(images, { scale: 1, duration: 1.15, stagger: 0.1 }, "-=0.78")
        .to(chapterCopy, { autoAlpha: 1, y: 0, duration: 0.58, stagger: 0.1 }, "-=0.7");

      images.forEach((image) => {
        gsap.fromTo(image, { yPercent: -5 }, {
          yPercent: 5,
          ease: "none",
          scrollTrigger: { trigger: image, start: "top bottom", end: "bottom top", scrub: 0.75 },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} aria-labelledby="company-lens-title">
      <div className={styles.shell}>
        <header className={styles.heading}>
          <p data-lens-intro className={styles.eyebrow}>The JabitSoft lens</p>
          <h2 data-lens-intro id="company-lens-title">Good software considers more than the screen.</h2>
          <p data-lens-intro className={styles.description}>
            The strongest outcomes come from seeing the whole environment around a product—not just the feature in front of us.
          </p>
        </header>

        <div className={styles.rail} aria-label="How JabitSoft approaches product work">
          {perspectives.map((perspective) => (
            <article data-lens-chapter className={styles.chapter} key={perspective.title}>
              <img data-lens-image src={perspective.image} alt={perspective.alt} />
              <div className={styles.shade} aria-hidden="true" />
              <div data-lens-copy className={styles.chapterCopy}>
                <p>{perspective.kicker}</p>
                <h3>{perspective.title}</h3>
                <span className={styles.rule} aria-hidden="true" />
                <div className={styles.detail}>
                  <p>{perspective.copy}</p>
                  <span aria-hidden="true">↗</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className={styles.footerNote}>
          Product thinking, design and engineering move together—because the work only succeeds when the whole system does.
        </p>
      </div>
    </section>
  );
}
