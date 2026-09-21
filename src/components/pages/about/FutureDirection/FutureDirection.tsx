"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./FutureDirection.module.css";

type Direction = {
  id: string;
  label: string;
  statement: string;
  body: string;
  cx: number;
  cy: number;
  labelPos: "top" | "right" | "left" | "bottom";
};

const directions: Direction[] = [
  {
    id: "ai",
    label: "Intelligent systems",
    statement: "Software is becoming more capable of acting on its own.",
    body: "Agentic systems that reason over context, use tools, and take bounded actions inside real workflows — observed, evaluated, and improved over time.",
    cx: 500,
    cy: 90,
    labelPos: "top",
  },
  {
    id: "connected",
    label: "Connected software",
    statement: "Systems work better when they connect around the business.",
    body: "Software that connects operations, data, and customers around one shared source of truth — instead of fragmenting into disconnected tools.",
    cx: 820,
    cy: 470,
    labelPos: "right",
  },
  {
    id: "transformation",
    label: "Business transformation",
    statement: "Technology should move the business, not just the roadmap.",
    body: "Engagements shaped around long-term capability: better decisions, stronger teams, and systems that earn their place by serving real outcomes.",
    cx: 180,
    cy: 470,
    labelPos: "left",
  },
];

function labelPosClass(pos: Direction["labelPos"]): string {
  switch (pos) {
    case "top":
      return styles.labelTop;
    case "right":
      return styles.labelRight;
    case "left":
      return styles.labelLeft;
    case "bottom":
    default:
      return styles.labelBottom;
  }
}

export function FutureDirection() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const cleanups: Array<() => void> = [];

    const ctx = gsap.context(() => {
      const intro = section.querySelectorAll("[data-future-intro]");
      const headingLines = section.querySelectorAll("[data-future-heading-line]");
      const heading = section.querySelector("[data-future-heading]");
      const signature = section.querySelector("[data-future-signature] path");
      const progressFill = section.querySelector("[data-future-progress]");
      const reveals = section.querySelectorAll("[data-future-reveal]");
      const systemStage = section.querySelector("[data-future-system]");
      const coreNode = section.querySelector("[data-future-core]");
      const corePulse = section.querySelector("[data-future-core-pulse]");
      const connectors = section.querySelectorAll("[data-future-connector]");
      const nodes = section.querySelectorAll("[data-future-node]");
      const ambientGrid = section.querySelector("[data-future-ambient]");
      const directionCards = section.querySelectorAll("[data-future-direction]");

      if (reduced) {
        gsap.set(headingLines, { backgroundSize: "100% 100%, 100% 100%" });
        gsap.set(connectors, { strokeDashoffset: 0 });
        return;
      }

      // Initial states
      gsap.set(intro, { autoAlpha: 0, y: 34 });
      gsap.set(reveals, { autoAlpha: 0, y: 28 });
      gsap.set(nodes, { autoAlpha: 0, scale: 0.7 });
      gsap.set(coreNode, { autoAlpha: 0, scale: 0.5 });
      gsap.set(directionCards, { autoAlpha: 0, y: 28 });

      // Pre-compute connector path lengths.
      connectors.forEach((connector) => {
        const path = connector as SVGPathElement;
        let len = 0;
        try {
          len = path.getTotalLength?.() ?? 0;
        } catch {
          len = 0;
        }
        if (len) gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      });

      // Master entrance.
      gsap
        .timeline({
          defaults: { ease: "power4.out" },
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            once: true,
            invalidateOnRefresh: true,
          },
        })
        .to(intro, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.09 })
        .to(
          coreNode,
          { autoAlpha: 1, scale: 1, duration: 0.9, ease: "expo.out" },
          "-=0.4",
        )
        .to(
          reveals,
          { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.1 },
          "-=0.4",
        );

      // Heading left-to-right scrubbed fill.
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
            index * 0.5,
          );
        });
      }

      // Signature underline draws on scroll.
      if (signature) {
        const len = (signature as SVGPathElement).getTotalLength();
        gsap.set(signature, { strokeDasharray: len, strokeDashoffset: len });
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

      // Section progress hairline.
      if (progressFill) {
        gsap.fromTo(
          progressFill,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 60%",
              end: "bottom 55%",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          },
        );
      }

      // Ambient grid parallax.
      if (ambientGrid) {
        gsap.to(ambientGrid, {
          yPercent: -16,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      // Connectors draw outward as the system expands.
      connectors.forEach((connector) => {
        const path = connector as SVGPathElement;
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: systemStage,
            start: "top 75%",
            end: "top 20%",
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
      });

      // Direction nodes appear as connectors reach them.
      nodes.forEach((node, i) => {
        gsap.to(node, {
          autoAlpha: 1,
          scale: 1,
          duration: 0.7,
          ease: "expo.out",
          scrollTrigger: {
            trigger: systemStage,
            start: () => `top ${65 - i * 12}%`,
            end: () => `top ${45 - i * 12}%`,
            scrub: 0.6,
          },
        });
      });

      // Direction cards reveal as you scroll past the system.
      directionCards.forEach((card) => {
        gsap.to(card, {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 82%",
            once: true,
          },
        });
      });

      // Core pulse — subtle continuous breathing.
      if (corePulse) {
        gsap.to(corePulse, {
          scale: 1.6,
          opacity: 0,
          duration: 2.4,
          ease: "sine.out",
          repeat: -1,
          transformOrigin: "center center",
        });
      }

      // Subtle parallax on system stage.
      if (systemStage) {
        gsap.to(systemStage, {
          yPercent: -4,
          ease: "none",
          scrollTrigger: {
            trigger: systemStage,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      // Magnetic hover on nodes (pointer-only).
      if (window.matchMedia("(hover: hover) and (fine: pointer)").matches) {
        nodes.forEach((node) => {
          const target = node as HTMLElement;
          const xTo = gsap.quickTo(target, "x", { duration: 0.5, ease: "expo.out" });
          const yTo = gsap.quickTo(target, "y", { duration: 0.5, ease: "expo.out" });
          const onMove = (event: MouseEvent) => {
            const bounds = target.getBoundingClientRect();
            xTo((event.clientX - (bounds.left + bounds.width / 2)) * 0.3);
            yTo((event.clientY - (bounds.top + bounds.height / 2)) * 0.3);
          };
          const onLeave = () => {
            xTo(0);
            yTo(0);
          };
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
    <section
      ref={sectionRef}
      id="future"
      className={styles.section}
      aria-labelledby="future-title"
    >
      <div data-future-ambient className={styles.ambientGrid} aria-hidden="true" />

      <div className={styles.shell}>
        <header className={styles.heading}>
          <p data-future-intro className={styles.eyebrow}>
            (Future)
          </p>
          <h2
            id="future-title"
            data-future-heading
            data-reveal-heading
            className={styles.display}
          >
            <span className={styles.titleLine} data-future-heading-line>
              Where Software is
            </span>
            <span className={styles.titleLine} data-future-heading-line>
              Heading Next.
            </span>
          </h2>
          <p data-future-intro className={styles.description}>
            We see the next chapter of software as a tighter connection between intelligent
            systems, connected platforms, and real business outcomes. These are the
            directions we believe will shape the work that matters — not a roadmap of dates
            or commitments.
          </p>

          <svg
            data-future-signature
            className={styles.signature}
            viewBox="0 0 320 28"
            fill="none"
            aria-hidden="true"
          >
            <path d="M4 18 C 48 4, 96 4, 138 16 C 180 28, 224 28, 264 14 C 286 6, 304 8, 316 14" />
          </svg>
        </header>

        <div className={styles.progressLine} aria-hidden="true">
          <span data-future-progress className={styles.progressFill} />
        </div>

        <div className={styles.systemStage} data-future-system>
          <div className={styles.systemFrame}>
            <svg
              className={styles.systemSvg}
              viewBox="0 0 1000 600"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              {/* Connectors from center (500, 300) to each direction node */}
              {directions.map((d) => (
                <path
                  key={`c-${d.id}`}
                  data-future-connector
                  className={styles.connector}
                  d={`M 500 300 L ${d.cx} ${d.cy}`}
                />
              ))}

              {/* Outer ring marks at each direction */}
              {directions.map((d) => (
                <circle
                  key={`r-${d.id}`}
                  className={styles.ringMark}
                  cx={d.cx}
                  cy={d.cy}
                  r="36"
                />
              ))}

              {/* Direction node marks */}
              {directions.map((d) => (
                <circle
                  key={`n-${d.id}`}
                  className={styles.nodeMark}
                  cx={d.cx}
                  cy={d.cy}
                  r="6"
                />
              ))}

              {/* Central core */}
              <circle data-future-core-pulse className={styles.corePulse} cx="500" cy="300" r="18" />
              <circle className={styles.coreHalo} cx="500" cy="300" r="30" />
              <circle data-future-core className={styles.core} cx="500" cy="300" r="12" />
            </svg>

            {/* Core label */}
            <div className={styles.coreLabel} aria-hidden="true">
              <span className={styles.coreLabelText}>Today</span>
              <span className={styles.coreLabelSub}>forward</span>
            </div>

            {/* HTML overlay direction nodes */}
            {directions.map((d) => (
              <div
                key={d.id}
                data-future-node
                className={`${styles.node} ${labelPosClass(d.labelPos)}`}
                style={{ left: `${d.cx / 10}%`, top: `${d.cy / 6}%` }}
                aria-label={`${d.label}: ${d.statement}`}
              >
                <span className={styles.nodeDot} aria-hidden="true" />
                <span className={styles.nodeLabel}>
                  <span className={styles.nodeLabelText}>{d.label}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <ol className={styles.directions}>
          {directions.map((d, i) => (
            <li
              key={d.id}
              data-future-direction
              data-future-reveal
              className={styles.direction}
            >
              <span className={styles.directionNumber}>0{i + 1}</span>
              <div className={styles.directionBody}>
                <span className={styles.directionLabel}>{d.label}</span>
                <h3 className={styles.directionHeading}>{d.statement}</h3>
                <p className={styles.directionCopy}>{d.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className={styles.closing} data-future-reveal>
          <span className={styles.closingLine} aria-hidden="true" />
          <p className={styles.closingBody}>
            The direction is consistent: build software that earns its place — useful,
            dependable, and able to keep growing with the business.
          </p>
        </div>
      </div>
    </section>
  );
}
