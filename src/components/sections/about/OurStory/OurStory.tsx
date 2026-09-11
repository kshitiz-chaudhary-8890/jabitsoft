"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./OurStory.module.css";

const chapters = [
  {
    number: "01",
    label: "Understand",
    copy: "Get close to the business, the people, and the decisions behind the brief — before proposing anything.",
    meta: "Discovery · context · constraints",
  },
  {
    number: "02",
    label: "Shape",
    copy: "Turn that context into a focused product direction and a plan the team can actually trust.",
    meta: "Strategy · architecture · scope",
  },
  {
    number: "03",
    label: "Build",
    copy: "Engineer a dependable system that keeps evolving long after the first release ships.",
    meta: "Engineering · delivery · ownership",
  },
];

export function OurStory() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const cleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      const intro = section.querySelectorAll("[data-story-intro]");
      const headingLines = section.querySelectorAll("[data-story-heading-line]");
      const signature = section.querySelector("[data-story-signature] path");
      const scopeStage = section.querySelector("[data-story-scope]");
      const curtain = section.querySelector("[data-story-curtain]");
      const contours = section.querySelector("[data-story-contours]");
      const gridVeil = section.querySelector("[data-story-grid]");
      const scanFrame = section.querySelector("[data-story-frame]");
      const scanLine = section.querySelector("[data-story-scanline]");
      const caption = section.querySelector("[data-story-caption]");
      const statement = section.querySelectorAll("[data-story-statement]");
      const chapterItems = section.querySelectorAll("[data-story-chapter]");
      const chapterProgress = section.querySelector("[data-story-chapterprogress]");

      if (reduced) {
        gsap.set(headingLines, { backgroundSize: "100% 100%, 100% 100%" });
        return;
      }

      gsap.set(intro, { autoAlpha: 0, y: 34 });
      gsap.set(statement, { autoAlpha: 0, y: 30 });
      gsap.set(chapterItems, { autoAlpha: 0, y: 28 });
      gsap.set(curtain, { scaleY: 1, transformOrigin: "top center" });
      gsap.set(scanFrame, { y: 0 });
      if (caption) gsap.set(caption, { autoAlpha: 0, y: 20 });

      // Master entrance: intro words -> heading words -> curtain lift -> scope caption -> statement -> chapters.
      gsap.timeline({
        defaults: { ease: "power4.out" },
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
          invalidateOnRefresh: true,
        },
      })
        .to(intro, { autoAlpha: 1, y: 0, duration: 0.62, stagger: 0.08 })
        .to(curtain, { scaleY: 0, duration: 1.05, ease: "expo.inOut" }, "-=0.18")
        .to(caption, { autoAlpha: 1, y: 0, duration: 0.7 }, "-=0.55")
        .to(statement, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.1 }, "-=0.5")
        .to(
          chapterItems,
          { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.1 },
          "-=0.45",
        );

      // Grey → dark, left-to-right scroll fill, matching How We Build.
      const headingFill = gsap.timeline({
        scrollTrigger: {
          trigger: section.querySelector("[data-story-heading]"),
          start: "top 88%",
          end: "bottom 42%",
          scrub: 0.9,
          invalidateOnRefresh: true,
        },
      });

      headingLines.forEach((line, index) => {
        headingFill.fromTo(
          line,
          { backgroundSize: "0% 100%, 100% 100%" },
          {
            backgroundSize: "100% 100%, 100% 100%",
            duration: 1,
            ease: "none",
          },
          index * 0.55,
        );
      });

      // Signature underline draws itself as the heading scrolls in.
      if (signature) {
        const len = (signature as SVGPathElement).getTotalLength();
        gsap.set(signature, {
          strokeDasharray: len,
          strokeDashoffset: len,
        });
        gsap.to(signature, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            end: "top 30%",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
      }

      // Scope panel: scrubbed bottom-up clip reveal + layered parallax.
      if (scopeStage) {
        gsap.fromTo(
          scopeStage,
          { clipPath: "inset(0 0 100% 0)" },
          {
            clipPath: "inset(0 0 0% 0)",
            ease: "none",
            scrollTrigger: {
              trigger: scopeStage,
              start: "top 78%",
              end: "top 18%",
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          },
        );

        if (contours) {
          gsap.to(contours, {
            yPercent: -12,
            ease: "none",
            scrollTrigger: {
              trigger: scopeStage,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        }

        if (gridVeil) {
          gsap.to(gridVeil, {
            yPercent: -22,
            ease: "none",
            scrollTrigger: {
              trigger: scopeStage,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        }

        // Scan frame travels down the panel as you scroll past it.
        if (scanFrame) {
          gsap.fromTo(
            scanFrame,
            { y: 0 },
            {
              y: () => {
                const panel = (scopeStage as HTMLElement).offsetHeight;
                const frame = (scanFrame as HTMLElement).offsetHeight;
                return Math.max(0, panel - frame - 96);
              },
              ease: "none",
              scrollTrigger: {
                trigger: scopeStage,
                start: "top 70%",
                end: "bottom 30%",
                scrub: 1,
                invalidateOnRefresh: true,
              },
            },
          );
        }

        // Scan line pulses independently.
        if (scanLine) {
          gsap.to(scanLine, {
            opacity: 0.15,
            duration: 1.4,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
          });
        }
      }

      // Chapter rail: vertical progress beam fills with scroll.
      if (chapterProgress) {
        gsap.fromTo(
          chapterProgress,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section.querySelector(`.${styles.chapterRail}`),
              start: "top 70%",
              end: "bottom 70%",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          },
        );
      }

      // Each chapter lights up its node when centered.
      chapterItems.forEach((item) => {
        const st = ScrollTrigger.create({
          trigger: item,
          start: "top 58%",
          end: "bottom 42%",
          onToggle: (self) => {
            item.classList.toggle(styles.isActive, self.isActive);
          },
        });
        cleanups.push(() => st.kill());
      });

      // Magnetic hover on chapter titles (pointer-only).
      if (window.matchMedia("(hover: hover) and (fine: pointer)").matches) {
        chapterItems.forEach((item) => {
          const title = item.querySelector(`.${styles.chapterTitle}`);
          if (!title) return;
          const target = title as HTMLElement;
          const xTo = gsap.quickTo(target, "x", { duration: 0.5, ease: "expo.out" });
          const onMove = (event: MouseEvent) => {
            const bounds = target.getBoundingClientRect();
            xTo((event.clientX - (bounds.left + bounds.width / 2)) * 0.08);
          };
          const onLeave = () => xTo(0);
          target.addEventListener("mousemove", onMove);
          target.addEventListener("mouseleave", onLeave);
          cleanups.push(() => {
            target.removeEventListener("mousemove", onMove);
            target.removeEventListener("mouseleave", onLeave);
          });
        });
      }
    }, section);

    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="our-story" className={styles.section} aria-labelledby="our-story-title">
      <div className={styles.shell}>
        <header className={styles.heading}>
          <p data-story-intro className={styles.eyebrow}>(Our Story)</p>
          <h2
            id="our-story-title"
            data-story-heading
            data-reveal-heading
            className={styles.display}
          >
            <span className={styles.titleLine} data-story-heading-line>Great software begins before the first line of code.</span>
          </h2>
          <p data-story-intro className={styles.description}>
            JabitSoft was founded on a simple conviction: the products that endure are shaped by
            the thinking that precedes them — the questions asked, the trade-offs weighed, and the
            decisions no one else is willing to own.
          </p>

          <svg
            data-story-signature
            className={styles.signature}
            viewBox="0 0 320 28"
            fill="none"
            aria-hidden="true"
          >
            <path d="M4 18 C 48 4, 96 4, 138 16 C 180 28, 224 28, 264 14 C 286 6, 304 8, 316 14" />
          </svg>
        </header>

        <figure data-story-scope className={styles.scopeStage}>
          <span data-story-curtain className={styles.scopeCurtain} aria-hidden="true" />

          <svg
            data-story-contours
            className={styles.contours}
            viewBox="0 0 800 600"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            <path d="M-40 470 C 120 380, 260 420, 380 360 C 500 300, 620 340, 840 250" />
            <path d="M-40 410 C 130 320, 270 360, 390 300 C 510 240, 630 280, 840 190" />
            <path d="M-40 350 C 140 260, 280 300, 400 240 C 520 180, 640 220, 840 130" />
            <path className="thin" d="M-40 510 C 110 430, 250 470, 370 410 C 490 350, 610 390, 840 300" />
            <path className="thin" d="M-40 290 C 150 200, 290 240, 410 180 C 530 120, 650 160, 840 70" />
            <path className="thin" d="M-40 230 C 160 140, 300 180, 420 120 C 540 60, 660 100, 840 10" />
            <path className="thin" d="M-40 560 C 100 480, 240 520, 360 460 C 480 400, 600 440, 840 360" />
          </svg>

          <div data-story-grid className={styles.gridVeil} aria-hidden="true" />

          <span className={styles.scopeTag} aria-hidden="true">
            <span className={styles.dot} />
            In scope
          </span>

          <div data-story-frame className={styles.scanFrame} aria-hidden="true">
            <span data-story-scanline className={styles.scanLine} />
          </div>

          <figcaption data-story-caption className={styles.scopeCaption}>
            <span>Built around the work</span>
            <strong>One team. Fewer handoffs. Better decisions.</strong>
          </figcaption>
        </figure>

        <div className={styles.editorial}>
          <div data-story-statement className={styles.statementCol}>
            <div className={styles.statement}>
              <span className={styles.statementMark} aria-hidden="true">“</span>
              <h3>We build the clarity around the product — not just the product itself.</h3>
            </div>

            <div data-story-statement className={styles.bodyCopy}>
              <p>
                Our work began with software delivery, but the strongest outcomes always came from
                understanding more: how a business operates, where customers struggle, and which
                decisions will matter next.
              </p>
              <p>
                That shaped the company we are today — an accountable partner that brings product
                direction, design, and engineering into one continuous conversation, from the first
                question to long-term growth.
              </p>
            </div>

            <div data-story-statement className={styles.signOff}>JabitSoft</div>
          </div>

          <div className={styles.chapterRail}>
            <span
              data-story-chapterprogress
              className={styles.chapterProgress}
              aria-hidden="true"
            />
            <ol aria-label="How JabitSoft turns context into software">
              {chapters.map((chapter) => (
                <li data-story-chapter key={chapter.number} className={styles.chapter}>
                  <span className={styles.chapterNode} aria-hidden="true" />
                  <div className={styles.chapterHead}>
                    <span className={styles.chapterNumber}>{chapter.number}</span>
                    <h4 className={styles.chapterTitle}>{chapter.label}</h4>
                  </div>
                  <p className={styles.chapterCopy}>{chapter.copy}</p>
                  <p className={styles.chapterMeta}>{chapter.meta}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
