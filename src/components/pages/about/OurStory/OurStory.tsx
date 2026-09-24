"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./OurStory.module.css";

const VALUES: Array<{ name: string; desc: string }> = [
  {
    name: "Excellence First",
    desc: "We deliver solutions that combine premium design with robust performance.",
  },
  {
    name: "Trust & Integrity",
    desc: "Every project is approached with transparency, reliability, and a quality-first mindset.",
  },
  {
    name: "Innovation Always",
    desc: "We embrace future-ready technologies to keep our clients ahead of the curve.",
  },
  {
    name: "Collaboration & Care",
    desc: "We believe in empowering people, fostering teamwork, and building relationships that last.",
  },
  {
    name: "Impact Driven",
    desc: "Our software is designed to solve real-world challenges and create measurable outcomes.",
  },
];

export function OurStory() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const ctx = gsap.context(() => {
      const intro = section.querySelectorAll("[data-story-intro]");
      const headingFill = section.querySelector(".section-heading-fill");
      const blocks: Element[] = Array.from(section.querySelectorAll("[data-reveal]"));

      // Header entrance.
      gsap.set(intro, { autoAlpha: 0, y: 30 });
      gsap
        .timeline({
          defaults: { ease: "power4.out" },
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            once: true,
            invalidateOnRefresh: true,
          },
        })
        .to(intro, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08 }, 0);

      // Shared page heading fill scrub.
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

      // Quiet fade-ups per content block.
      blocks.forEach((block) => {
        gsap.fromTo(
          block,
          { autoAlpha: 0, y: 26 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: block, start: "top 85%", once: true },
          },
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="our-story"
      className={styles.section}
      aria-labelledby="our-story-title"
    >
      <div className={styles.shell}>
        <p data-story-intro className={styles.eyebrow}>
          Our Story
        </p>
        <h2 id="our-story-title" className={styles.display}>
          <span className="section-heading-fill">Know More About Jabit Soft</span>
        </h2>

        <div className={styles.intro}>
          <p data-story-intro className={styles.deck}>
            At Jabit Soft, brilliance isn&rsquo;t just a promise &mdash; it&rsquo;s our Edge.
          </p>
          <div className={styles.introCopy}>
            <p data-story-intro className={styles.lede}>
              Headquartered in Noida, we&rsquo;ve been a trusted software development partner since
              2007, delivering custom web, mobile, and enterprise solutions that empower businesses
              worldwide. For nearly two decades, we&rsquo;ve transformed bold ideas into scalable
              digital products with clean UI, strong performance, and long-term reliability.
            </p>
            <p data-story-intro className={styles.lede}>
              Our journey spans industries and includes impactful collaborations with government
              organizations such as the Defense, Navy, and Air Force where quality, trust, and
              innovation are non-negotiable. Today, we specialize in ERP systems, billing software,
              mobile applications, web platforms, and AI-powered chatbots helping businesses of all
              sizes achieve digital excellence.
            </p>
          </div>
        </div>

        <div data-reveal className={styles.objectivesHead}>
          <p className={styles.subLabel}>Our objective is to</p>
        </div>
        <div data-reveal className={styles.objectiveRow}>
          <p className={styles.objectiveStatement}>
            Deliver excellence. Drive growth. Ensure reliability. Innovate continuously. Build
            trust.
          </p>
          <p className={styles.objectiveNote}>
            In every project &mdash; from startups to government organizations.
          </p>
        </div>

        <div data-reveal className={styles.statements}>
          {[
            {
              name: "Mission",
              lead: "To empower businesses with smart, secure, and scalable software solutions.",
              copy: "We focus on creating technology that delivers modern design, seamless performance, and long-term support ensuring every product drives real impact and measurable growth.",
            },
            {
              name: "Vision",
              lead: "To be a globally trusted technology partner recognized for innovation, quality, and customer success.",
              copy: "We aim to build future-ready software that enhances efficiency, simplifies complexity, and creates better digital experiences for businesses worldwide.",
            },
          ].map((s) => (
            <div key={s.name} className={styles.statement}>
              <span className={styles.ghostWord} aria-hidden="true">
                {s.name}
              </span>
              <h3 className={styles.statementTitle}>{s.name}</h3>
              <p className={styles.statementLead}>{s.lead}</p>
              <p className={styles.statementCopy}>{s.copy}</p>
            </div>
          ))}
        </div>

        <div data-reveal className={styles.valuesHead}>
          <div className={styles.objectivesHead}>
            <p className={styles.subLabel}>Our Values</p>
          </div>
          <p className={styles.valuesIntro}>
            At Jabit Soft, our strength lies not just in technology but in the principles that guide
            us every day. These values shape how we work, innovate, and build lasting partnerships:
          </p>
        </div>
        <div data-reveal className={styles.valuesList}>
          {VALUES.map((v, i) => (
            <div key={v.name} className={styles.valueRow}>
              <span className={styles.valueIndex} aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className={styles.valueName}>{v.name}</p>
              <p className={styles.valueDesc}>{v.desc}</p>
            </div>
          ))}
        </div>
        <p data-reveal className={styles.valuesClose}>
          These values are more than words &mdash; they are the foundation of our culture and the
          reason businesses, from startups to government organizations, continue to rely on Jabit
          Soft.
        </p>
      </div>
    </section>
  );
}
