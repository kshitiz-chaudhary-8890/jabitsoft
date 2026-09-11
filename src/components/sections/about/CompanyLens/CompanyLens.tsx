"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./CompanyLens.module.css";

type Lens = {
  number: string;
  title: string;
  perspective: string;
  copy: string;
  build: string;
  mark: "agentic" | "cloud" | "mobile" | "erp" | "seo" | "web";
};

const lenses: Lens[] = [
  {
    number: "01",
    title: "Agentic AI Development",
    perspective: "AI that takes action, not just answers.",
    copy: "We design agents that plan, call tools, and complete real workflows — not chatbots that stall at the first clarification. Every pipeline ships with evaluation, guardrails, and the observability to know exactly what the agent did and why.",
    build: "Agent orchestration · tool-using pipelines · evaluation harnesses",
    mark: "agentic",
  },
  {
    number: "02",
    title: "Cloud Consulting",
    perspective: "Infrastructure that absorbs growth, not friction.",
    copy: "Cloud should be a foundation that gets quieter as you scale, not a source of recurring surprises. We architect for resilience, predictable cost, and the visibility that lets teams move without second-guessing the platform beneath them.",
    build: "Cloud architecture · infrastructure-as-code · cost & observability",
    mark: "cloud",
  },
  {
    number: "03",
    title: "Mobile Application Development",
    perspective: "Mobile experiences built for retention.",
    copy: "A mobile product earns its place on the home screen by being fast, reliable, and genuinely useful under real conditions. We build for retention — offline-first, performance-budgeted, and shipped with the polish that survives bad networks and busy users.",
    build: "Native & cross-platform · offline-first · store delivery",
    mark: "mobile",
  },
  {
    number: "04",
    title: "ERP Services",
    perspective: "Systems that hold the business together.",
    copy: "An ERP is the nervous system of a business, and a poor implementation quietly taxes every team that depends on it. We implement, extend, and integrate ERPs around the way the business actually runs — so the system stops being the obstacle.",
    build: "ERP implementation · custom modules · data migration",
    mark: "erp",
  },
  {
    number: "05",
    title: "SEO / Digital Marketing",
    perspective: "Visibility earned through substance.",
    copy: "Rankings follow substance. We build technical foundations, content systems, and measurement that compound — so visibility is earned by being genuinely useful, not gamed against the next algorithm shift.",
    build: "Technical SEO · content systems · conversion paths",
    mark: "seo",
  },
  {
    number: "06",
    title: "Website Solutions",
    perspective: "Sites that load fast and convert faster.",
    copy: "A website is the fastest, most honest version of your story. We engineer marketing sites and platforms that load in milliseconds, stay maintainable, and convert without resorting to dark patterns.",
    build: "Marketing sites · headless CMS · performance engineering",
    mark: "web",
  },
];

function LensMark({ type }: { type: Lens["mark"] }) {
  switch (type) {
    case "agentic":
      return (
        <svg className={styles.lensDiagram} viewBox="0 0 64 64" aria-hidden="true">
          <circle cx="32" cy="32" r="7" className="accent" />
          <circle cx="12" cy="16" r="4.5" />
          <circle cx="52" cy="14" r="4.5" />
          <circle cx="50" cy="50" r="4.5" />
          <circle cx="14" cy="50" r="4.5" />
          <line x1="26.5" y1="28" x2="15.5" y2="19.5" />
          <line x1="37.5" y1="28" x2="48.5" y2="17.5" />
          <line x1="37" y1="37" x2="47" y2="46.5" />
          <line x1="27" y1="37" x2="17" y2="46.5" />
        </svg>
      );
    case "cloud":
      return (
        <svg className={styles.lensDiagram} viewBox="0 0 64 64" aria-hidden="true">
          <rect x="10" y="40" width="36" height="12" rx="3" />
          <rect x="16" y="26" width="36" height="12" rx="3" className="accent" />
          <rect x="22" y="12" width="36" height="12" rx="3" />
          <line x1="16" y1="46" x2="40" y2="46" />
          <line x1="22" y1="32" x2="46" y2="32" />
          <line x1="28" y1="18" x2="52" y2="18" />
        </svg>
      );
    case "mobile":
      return (
        <svg className={styles.lensDiagram} viewBox="0 0 64 64" aria-hidden="true">
          <rect x="20" y="8" width="24" height="48" rx="5" />
          <line x1="27" y1="14" x2="37" y2="14" className="accent" />
          <line x1="28" y1="50" x2="36" y2="50" />
          <line x1="24" y1="22" x2="40" y2="22" />
          <line x1="24" y1="30" x2="40" y2="30" />
          <line x1="24" y1="38" x2="34" y2="38" />
        </svg>
      );
    case "erp":
      return (
        <svg className={styles.lensDiagram} viewBox="0 0 64 64" aria-hidden="true">
          <rect x="10" y="10" width="20" height="20" rx="2" />
          <rect x="34" y="10" width="20" height="20" rx="2" className="accent" />
          <rect x="10" y="34" width="20" height="20" rx="2" />
          <rect x="34" y="34" width="20" height="20" rx="2" />
          <line x1="30" y1="20" x2="34" y2="20" />
          <line x1="30" y1="44" x2="34" y2="44" />
          <line x1="20" y1="30" x2="20" y2="34" />
          <line x1="44" y1="30" x2="44" y2="34" />
        </svg>
      );
    case "seo":
      return (
        <svg className={styles.lensDiagram} viewBox="0 0 64 64" aria-hidden="true">
          <circle cx="27" cy="27" r="14" />
          <line x1="37.5" y1="37.5" x2="52" y2="52" className="accent" />
          <polyline points="20,30 25,24 30,28 35,20" className="accent" />
          <line x1="20" y1="34" x2="35" y2="34" />
        </svg>
      );
    case "web":
      return (
        <svg className={styles.lensDiagram} viewBox="0 0 64 64" aria-hidden="true">
          <rect x="8" y="12" width="48" height="40" rx="4" />
          <line x1="8" y1="22" x2="56" y2="22" />
          <circle cx="14" cy="17" r="1.6" className="accent" />
          <circle cx="20" cy="17" r="1.6" />
          <circle cx="26" cy="17" r="1.6" />
          <line x1="14" y1="30" x2="42" y2="30" />
          <line x1="14" y1="38" x2="48" y2="38" />
          <line x1="14" y1="44" x2="36" y2="44" />
        </svg>
      );
    default:
      return null;
  }
}

export function CompanyLens() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const cleanups: Array<() => void> = [];
    let mm: ReturnType<typeof gsap.matchMedia> | null = null;

    const ctx = gsap.context(() => {
      const intro = section.querySelectorAll("[data-lens-intro]");
      const headingLines = section.querySelectorAll("[data-heading-line]");
      const heading = section.querySelector("[data-lens-heading]");
      const wrap = section.querySelector("[data-lens-wrap]");
      const track = section.querySelector("[data-lens-track]");
      const diagrams: Element[] = Array.from(section.querySelectorAll(`.${styles.lensDiagram}`));
      const titles: Element[] = Array.from(section.querySelectorAll(`.${styles.lensTitle}`));
      const lenses: Element[] = Array.from(section.querySelectorAll("[data-lens]"));
      const progressBeam = section.querySelector("[data-lens-progress]");
      const ticks: Element[] = Array.from(section.querySelectorAll("[data-lens-tick]"));


      // Pre-compute path lengths for draw-on-scroll.
      const diagramPaths: Array<{ el: Element; len: number }> = [];
      diagrams.forEach((diag) => {
        const shapeEls = Array.from(diag.querySelectorAll("path, circle, rect, line, polyline"));
        shapeEls.forEach((shape) => {
          const s = shape as SVGPathElement;
          let len = 0;
          try {
            len = (s as SVGPathElement).getTotalLength?.() ?? 0;
          } catch {
            len = 0;
          }
          if (!len) {
            // Fallback for shapes without a reliable total length.
            len = 220;
          }
          if (!reduced) {
            gsap.set(s, { strokeDasharray: len, strokeDashoffset: len });
          }
          diagramPaths.push({ el: s, len });
        });
      });

      if (reduced) {
        // Reduced motion: stack lenses vertically so all are accessible without horizontal scroll.
        if (wrap) (wrap as HTMLElement).classList.add(styles.isStacked);
        gsap.set(headingLines, { backgroundSize: "100% 100%, 100% 100%" });
        return;
      }

      // Editorial intro reveal, matched to How We Build.
      gsap.fromTo(
        intro,
        { y: 26, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.66,
          stagger: 0.08,
          ease: "power3.out",
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: section.querySelector("[data-lens-intro-wrap]") ?? section,
            start: "top 82%",
            once: true,
          },
        },
      );

      // Grey → dark, left-to-right scroll fill, matched to How We Build.
      if (heading && headingLines.length) {
        const headingFill = gsap.timeline({
          scrollTrigger: {
            trigger: heading,
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
      }

      const matchMedia = gsap.matchMedia();
      mm = matchMedia;

      // ---------- Desktop: pinned horizontal scroll ----------
      matchMedia.add("(min-width: 681px)", () => {
        if (!wrap || !track) return;

        const localCleanups: Array<() => void> = [];

        const getScrollAmount = () =>
          Math.max(0, (track as HTMLElement).scrollWidth - window.innerWidth);

        // Pre-build skew setters so onUpdate can call them cheaply.
        const skewSetters = titles.map((t) =>
          gsap.quickTo(t as HTMLElement, "skewY", { duration: 0.4, ease: "power3.out" }),
        );

        const horizontalTween = gsap.to(track, {
          x: () => -getScrollAmount(),
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "top top",
            end: () => "+=" + getScrollAmount(),
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self: ScrollTrigger) => {
              // Active tick follows horizontal progress.
              const i = Math.min(
                ticks.length - 1,
                Math.max(0, Math.round(self.progress * (ticks.length - 1))),
              );
              ticks.forEach((t, idx) => {
                t.classList.toggle(styles.isActive, idx === i);
              });
              // Subtle velocity skew on titles (±3°).
              const v = gsap.utils.clamp(-1200, 1200, self.getVelocity());
              const skew = gsap.utils.mapRange(-1200, 1200, 3, -3, v);
              skewSetters.forEach((set) => set(skew));
            },
          },
        });

        // Lens diagrams draw as they enter the viewport (horizontally).
        diagramPaths.forEach(({ el }) => {
          gsap.to(el, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              containerAnimation: horizontalTween,
              trigger: (el as Element).closest(`.${styles.lens}`) as Element,
              start: "left 82%",
              end: "left 38%",
              scrub: true,
            },
          });
        });

        // Progress beam fills with horizontal progress.
        if (progressBeam) {
          gsap.to(progressBeam, {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: wrap,
              start: "top top",
              end: () => "+=" + getScrollAmount(),
              scrub: true,
              invalidateOnRefresh: true,
            },
          });
        }

        // Magnetic hover on lens titles.
        if (window.matchMedia("(hover: hover) and (fine: pointer)").matches) {
          titles.forEach((title) => {
            const target = title as HTMLElement;
            const xTo = gsap.quickTo(target, "x", { duration: 0.5, ease: "expo.out" });
            const onMove = (event: MouseEvent) => {
              const bounds = target.getBoundingClientRect();
              xTo((event.clientX - (bounds.left + bounds.width / 2)) * 0.08);
            };
            const onLeave = () => xTo(0);
            target.addEventListener("mousemove", onMove);
            target.addEventListener("mouseleave", onLeave);
            localCleanups.push(() => {
              target.removeEventListener("mousemove", onMove);
              target.removeEventListener("mouseleave", onLeave);
            });
          });
        }

        return () => {
          localCleanups.forEach((fn) => fn());
          skewSetters.forEach((set) => set(0));
        };
      });

      // ---------- Mobile: vertical stack ----------
      matchMedia.add("(max-width: 680px)", () => {
        if (!wrap) return;
        (wrap as HTMLElement).classList.add(styles.isStacked);

        lenses.forEach((lens) => {
          gsap.fromTo(
            lens,
            { autoAlpha: 0, y: 36 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: {
                trigger: lens,
                start: "top 80%",
                once: true,
              },
            },
          );
        });

        diagramPaths.forEach(({ el }) => {
          gsap.to(el, {
            strokeDashoffset: 0,
            duration: 1,
            ease: "none",
            scrollTrigger: {
              trigger: (el as Element).closest(`.${styles.lens}`) as Element,
              start: "top 75%",
              once: true,
            },
          });
        });

        return () => {
          (wrap as HTMLElement).classList.remove(styles.isStacked);
        };
      });
    }, section);

    return () => {
      cleanups.forEach((fn) => fn());
      mm?.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="company-lens" className={styles.section} aria-labelledby="company-lens-title">
      <div className={styles.shell}>
        <header className={styles.intro} data-lens-intro-wrap>
          <p data-lens-intro className={styles.eyebrow}>(Company Lens)</p>
          <h2
            id="company-lens-title"
            data-lens-heading
            data-reveal-heading
            className={styles.display}
          >
            <span className={styles.titleLine} data-heading-line>
              Six Disciplines, Viewed As One Practice.
            </span>
          </h2>
          <p data-lens-intro className={styles.description}>
            JabitSoft brings six connected capabilities under a single accountable team. Each lens
            below is a perspective we take on the work — and the concrete ground we stand on when
            we ship it.
          </p>
        </header>
      </div>

      <div data-lens-wrap className={styles.horizWrap}>
        <div data-lens-track className={styles.horizTrack}>
          {lenses.map((lens) => (
            <article data-lens className={styles.lens} key={lens.number} aria-labelledby={`lens-${lens.number}-title`}>
              <div className={styles.lensHead}>
                <span className={styles.lensNumber}>{lens.number}</span>
                <LensMark type={lens.mark} />
              </div>

              <div className={styles.lensBody}>
                <h3 id={`lens-${lens.number}-title`} className={styles.lensTitle}>
                  {lens.title}
                </h3>
                <p className={styles.lensPerspective}>{lens.perspective}</p>
                <p className={styles.lensCopy}>{lens.copy}</p>
                <p className={styles.lensBuild}>
                  <span>What we build</span>
                  {lens.build}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.progressRail} aria-hidden="true">
          <div className={styles.progressTrack}>
            <span data-lens-progress className={styles.progressBeam} />
          </div>
          <div className={styles.progressTicks}>
            {lenses.map((lens) => (
              <span data-lens-tick key={lens.number}>{lens.number}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
