"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./Leadership.module.css";

const principles = [
  "Technology with business context",
  "Long-term client partnerships",
  "Ownership close to the work",
];

const facts = [
  { label: "Founded", value: "2007" },
  { label: "Role", value: "Founder & CEO" },
  { label: "Based in", value: "Noida, India" },
];

export function Leadership() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const ctx = gsap.context(() => {
      const headingFill = section.querySelector(".section-heading-fill");

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

      gsap.from("[data-leader-intro]:not(h2)", {
        autoAlpha: 0,
        y: 26,
        duration: 0.72,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 82%", once: true },
      });

      gsap.from("[data-leader-photo]", {
        autoAlpha: 0,
        clipPath: "inset(0 0 100% 0 round 24px)",
        y: 30,
        duration: 1,
        ease: "power4.inOut",
        scrollTrigger: { trigger: "[data-leader-photo]", start: "top 84%", once: true },
      });

      gsap.from("[data-leader-detail]", {
        autoAlpha: 0,
        x: 32,
        duration: 0.72,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-leader-profile]", start: "top 80%", once: true },
      });

      gsap.from("[data-leader-fact]", {
        autoAlpha: 0,
        y: 18,
        duration: 0.55,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-leader-facts]", start: "top 88%", once: true },
      });

      const portraitImage = section.querySelector("[data-leader-image]");
      if (portraitImage && window.matchMedia("(min-width: 901px)").matches) {
        gsap.fromTo(
          portraitImage,
          { yPercent: -3, scale: 1.035 },
          {
            yPercent: 3,
            scale: 1.035,
            ease: "none",
            scrollTrigger: {
              trigger: "[data-leader-photo]",
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          },
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="leadership"
      className={styles.section}
      aria-labelledby="leadership-title"
    >
      <div className={styles.shell}>
        <header className={styles.intro}>
          <p data-leader-intro className={styles.eyebrow}>
            Leadership
          </p>
          <h2 data-leader-intro id="leadership-title">
            <span className="section-heading-fill">Leadership Grounded in the Work.</span>
          </h2>
          <p data-leader-intro className={styles.description}>
            Founder and CEO Baldeep Singh leads JabitSoft with a practical belief: understand the
            business clearly, stay close to the work and build technology that remains useful long
            after launch. That approach has guided the company across web, mobile, enterprise, cloud
            and AI delivery.
          </p>
        </header>

        <div className={styles.profile} data-leader-profile>
          <figure className={styles.portrait} data-leader-photo>
            <Image
              data-leader-image
              className={styles.portraitImage}
              src="https://ik.imagekit.io/5bwd4hel7/About%20us/Leadership/baldeep-singh-founder.webp"
              alt="Baldeep Singh, Founder and CEO of JabitSoft"
              fill
              sizes="(max-width: 900px) 100vw, 48vw"
            />
            <figcaption className={styles.photoCaption}>
              <span>Founder portrait</span>
              <span>JabitSoft leadership</span>
            </figcaption>
          </figure>

          <div className={styles.profileCopy}>
            <div data-leader-detail className={styles.identity}>
              <span className={styles.index}>Founder &amp; CEO</span>
              <h3>Baldeep Singh</h3>
              <p>Founder &amp; CEO, JabitSoft Pvt. Ltd.</p>
            </div>

            <blockquote data-leader-detail className={styles.quote}>
              <span aria-hidden="true">&ldquo;</span>
              <p>
                We don&rsquo;t just write code; we architect experiences that redefine how
                businesses interact with the world.
              </p>
            </blockquote>

            <div data-leader-detail className={styles.bio}>
              <p>
                Since founding JabitSoft, Baldeep has brought more than 15 years of software
                development experience to custom products, enterprise systems and web and mobile
                platforms across industries.
              </p>
              <p>
                His technology-first, client-focused leadership keeps technical decisions connected
                to real operations, measurable outcomes and long-term partnerships.
              </p>
            </div>

            <ul data-leader-detail className={styles.principles} aria-label="Leadership principles">
              {principles.map((principle) => (
                <li key={principle}>{principle}</li>
              ))}
            </ul>
          </div>
        </div>

        <dl data-leader-facts className={styles.facts}>
          {facts.map((fact) => (
            <div data-leader-fact key={fact.label} className={styles.fact}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
