"use client";

import { useLayoutEffect, useRef, useState } from "react";
import {
  MotionConfig,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  useMotionValueEvent,
  type MotionValue,
} from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./ProblemsWeSolve.module.css";
import RevealHeading from "../../common/RevealHeading.jsx";

const problems = [
  {
    number: "01",
    kicker: "Agentic AI Development",
    title: "Manual work slows your team down",
    lead: "Teams lose time when repetitive tasks, approvals, research, updates, and follow-ups still depend on people moving information manually.",
    description:
      "When important workflows live across inboxes, spreadsheets, dashboards, and disconnected tools, routine work becomes slower, harder to track, and dependent on individual effort.",
    signals:
      "Repetitive operational tasks · Manual research and follow-ups · Teams switching between multiple tools",
    response:
      "Tool-connected AI agents · Automated multi-step workflows · Human approval and control points",
    outcome:
      "A more efficient operating workflow where AI handles repetitive execution while your team stays focused on higher-value decisions.",
    approach:
      "We identify where autonomous AI agents can safely take over repetitive work, connect them to the right tools and business data, and keep human approval in place where decisions still need oversight.",
    visual: "ai",
  },
  {
    number: "02",
    kicker: "Cloud Consulting",
    title: "Your infrastructure cannot keep up with growth",
    lead: "Products become harder to scale when infrastructure, deployments, security, and cloud architecture grow without a clear strategy.",
    description:
      "As usage increases, fragmented infrastructure and short-term technical decisions can lead to unreliable releases, higher maintenance effort, performance issues, and limited visibility.",
    signals:
      "Infrastructure becoming difficult to manage · Slow or fragile deployments · Performance and reliability issues as usage grows",
    response:
      "Cloud architecture and modernization · Scalable infrastructure design · Secure deployment and operating practices",
    outcome:
      "A more reliable cloud foundation that can support product growth without making infrastructure increasingly difficult to manage.",
    approach:
      "We review your current architecture, infrastructure, deployment flow, and security needs, then design a cloud foundation that is easier to operate, scale, and evolve.",
    visual: "scale",
  },
  {
    number: "03",
    kicker: "Mobile Application Development",
    title: "Your mobile experience is holding customers back",
    lead: "A slow, confusing, or inconsistent mobile experience can make even a strong product difficult to use.",
    description:
      "Customers expect mobile apps to feel fast, intuitive, and reliable. Poor navigation, inconsistent interfaces, weak performance, and disconnected backend experiences create friction at the moments that matter most.",
    signals:
      "Slow or inconsistent mobile performance · Difficult navigation and user journeys · Mobile experience disconnected from business systems",
    response:
      "Native or cross-platform mobile development · Intuitive mobile UX and interface systems · Reliable API and backend integration",
    outcome:
      "A high-performance mobile experience that makes it easier for customers to interact with your product and your business.",
    approach:
      "We combine product thinking, mobile UX, engineering, and backend integration to build mobile experiences that are useful, responsive, and aligned with the wider digital product.",
    visual: "experience",
  },
  {
    number: "04",
    kicker: "ERP Services",
    title: "Core operations are scattered across too many systems",
    lead: "Business visibility suffers when finance, inventory, sales, operations, and reporting do not work from the same operational foundation.",
    description:
      "When teams rely on disconnected software, spreadsheets, and manual updates, data becomes harder to trust, processes take longer, and management lacks a clear view of what is happening across the business.",
    signals:
      "Duplicate data across departments · Manual updates between business functions · Limited real-time operational visibility",
    response:
      "Tailored ERP implementation · Connected operational workflows · Centralized business data and reporting",
    outcome:
      "A clearer operational system where teams work from consistent information and management has better visibility across the business.",
    approach:
      "We map your core processes, identify where information breaks between teams, and implement ERP workflows that bring the right operations, data, and reporting into one connected system.",
    visual: "systems",
  },
  {
    number: "05",
    kicker: "SEO / Digital Marketing",
    title: "Customers cannot find you when they are ready to buy",
    lead: "A strong product or service creates little value online if the right audience cannot discover it.",
    description:
      "Weak search visibility, unclear content strategy, poor technical SEO, and inconsistent digital campaigns can make a business difficult to find even when demand already exists.",
    signals:
      "Low visibility for important search terms · Website traffic that does not match business goals · Content and campaigns without a clear growth direction",
    response:
      "Technical SEO and search optimization · Content and keyword strategy · Measurable digital marketing campaigns",
    outcome:
      "A stronger digital presence that helps the right customers discover the business and move toward meaningful actions.",
    approach:
      "We connect technical SEO, search intent, content strategy, and measurable digital campaigns so visibility is built around the audiences and actions that matter to the business.",
    visual: "workflow",
  },
  {
    number: "06",
    kicker: "Website Solutions",
    title: "Your website is not doing enough for the business",
    lead: "A website should do more than look professional. It should communicate clearly, perform reliably, and help users take the next step.",
    description:
      "Slow performance, confusing structure, poor accessibility, weak mobile behavior, and unclear messaging can turn a website into a passive brochure instead of an effective business tool.",
    signals:
      "Slow or inconsistent website performance · Visitors struggling to find important information · Website experience not aligned with business goals",
    response:
      "Custom website design and development · Performance and accessibility optimization · Clear conversion-focused user journeys",
    outcome:
      "A fast, accessible, and purposeful website that represents the brand clearly and supports real business goals.",
    approach:
      "We combine strategy, UX, design, engineering, performance, and accessibility to create websites that support the brand while making the customer journey easier to understand and use.",
    visual: "experience",
  },
] as const;

type Problem = (typeof problems)[number];
type VisualType = Problem["visual"];

function toList(value: string): string[] {
  return value
    .split(" · ")
    .map((item) => item.trim())
    .filter(Boolean);
}

/* ------------------------- Per-scene glyph (SVG) ------------------------- */

function SceneGlyph({ type }: { type: VisualType }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (type === "workflow") {
    return (
      <svg viewBox="0 0 200 200" className={styles.glyph} aria-hidden="true" {...common}>
        <path d="M28 120h60" opacity="0.5" />
        <path d="M40 100h60" opacity="0.35" />
        <path d="M110 140h62" opacity="0.5" />
        <rect x="88" y="104" width="34" height="32" rx="8" />
        <rect x="140" y="120" width="34" height="32" rx="8" />
        <circle cx="34" cy="120" r="6" />
        <circle cx="46" cy="100" r="6" />
      </svg>
    );
  }

  if (type === "scale") {
    return (
      <svg viewBox="0 0 200 200" className={styles.glyph} aria-hidden="true" {...common}>
        {[0, 1, 2, 3, 4].map((i) => (
          <path key={i} d={`M${40 + i * 30} ${158 - i * 26} v${i * 26}`} opacity={0.3 + i * 0.15} />
        ))}
        <path d="M28 162h150" opacity="0.4" />
      </svg>
    );
  }

  if (type === "ai") {
    return (
      <svg viewBox="0 0 200 200" className={styles.glyph} aria-hidden="true" {...common}>
        <circle cx="100" cy="100" r="58" opacity="0.45" />
        <circle cx="100" cy="100" r="20" />
        <circle cx="42" cy="74" r="7" />
        <circle cx="158" cy="80" r="7" />
        <circle cx="120" cy="160" r="7" />
        <path d="M58 92 H122 M148 96 V128" opacity="0.55" />
      </svg>
    );
  }

  if (type === "experience") {
    return (
      <svg viewBox="0 0 200 200" className={styles.glyph} aria-hidden="true" {...common}>
        <rect x="34" y="62" width="54" height="80" rx="9" />
        <rect x="112" y="46" width="54" height="96" rx="9" />
        <path d="M88 102 h24" opacity="0.5" />
        <path d="M40 72 h42 M118 56 h42" opacity="0.35" />
      </svg>
    );
  }

  // systems
  return (
    <svg viewBox="0 0 200 200" className={styles.glyph} aria-hidden="true" {...common}>
      <circle cx="100" cy="100" r="26" />
      <circle cx="42" cy="58" r="8" />
      <circle cx="158" cy="62" r="8" />
      <circle cx="40" cy="146" r="8" />
      <circle cx="158" cy="148" r="8" />
      <path d="M74 84 L56 70 M126 84 L146 70 M76 116 L56 136 M124 116 L146 136" opacity="0.5" />
    </svg>
  );
}

/* ------------------------- Transformation figure ------------------------- */

function TransformZone({
  label,
  items,
  tone,
  progress,
  window,
}: {
  label: string;
  items: string[];
  tone: "problem" | "response";
  progress: MotionValue<number>;
  window: [number, number];
}) {
  const [start, end] = window;
  const zoneOpacity = useTransform(progress, [start, end], [0, 1]);
  const zoneY = useTransform(progress, [start, end], [14, 0]);

  return (
    <motion.div
      className={`${styles.zone} ${tone === "problem" ? styles.zoneProblem : styles.zoneResponse}`}
      style={{ opacity: zoneOpacity, y: zoneY }}
    >
      <span className={styles.zoneLabel}>{label}</span>
      <ul className={styles.zoneItems}>
        {items.map((item, i) => (
          <ZoneChip
            key={item}
            item={item}
            tone={tone}
            progress={progress}
            range={[
              start + (i / items.length) * (end - start) * 0.9,
              start + (i / items.length) * (end - start) * 0.9 + (end - start) / items.length,
            ]}
          />
        ))}
      </ul>
    </motion.div>
  );
}

function ZoneChip({
  item,
  tone,
  progress,
  range,
}: {
  item: string;
  tone: "problem" | "response";
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const chipOpacity = useTransform(progress, range, [0, 1]);
  const chipX = useTransform(progress, range, [tone === "problem" ? -16 : 16, 0]);
  return (
    <motion.li className={styles.chip} style={{ opacity: chipOpacity, x: chipX }}>
      {item}
    </motion.li>
  );
}

function Connector({
  progress,
  window,
}: {
  progress: MotionValue<number>;
  window: [number, number];
}) {
  const [start, end] = window;
  const arrowOpacity = useTransform(progress, [start, end], [0, 1]);
  const arrowScale = useTransform(progress, [start, end], [0.85, 1]);
  return (
    <div className={styles.connectorRow} aria-hidden="true">
      <span className={styles.connectorLine} />
      <motion.span
        className={styles.connectorArrow}
        style={{ opacity: arrowOpacity, scale: arrowScale }}
      >
        <svg viewBox="0 0 16 16" aria-hidden="true" className={styles.arrowSvg}>
          <path d="M3 8h10 M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </motion.span>
    </div>
  );
}

function Result({
  outcome,
  progress,
  window,
}: {
  outcome: string;
  progress: MotionValue<number>;
  window: [number, number];
}) {
  const opacity = useTransform(progress, window, [0, 1]);
  const y = useTransform(progress, window, [12, 0]);
  return (
    <motion.div className={styles.result} style={{ opacity, y }}>
      <span className={styles.resultLabel}>Result</span>
      <p className={styles.resultText}>{outcome}</p>
    </motion.div>
  );
}

/* ------------------------------ Scene (desktop) ------------------------------ */

function Scene({
  problem,
  index,
  progress,
  panelCount,
}: {
  problem: Problem;
  index: number;
  progress: MotionValue<number>;
  panelCount: number;
}) {
  const local = useTransform(progress, (p) => {
    const t = Math.max(0, Math.min(1, p * (panelCount - 1) - index + 1));
    return t * t * (3 - 2 * t);
  });

  const headOpacity = useTransform(local, [0, 0.06], [0, 1]);
  const titleY = useTransform(local, [0.01, 0.1], [26, 0]);
  const titleOpacity = useTransform(local, [0.01, 0.08], [0, 1]);
  const leadY = useTransform(local, [0.06, 0.16], [16, 0]);
  const leadOpacity = useTransform(local, [0.06, 0.14], [0, 1]);
  const descOpacity = useTransform(local, [0.1, 0.2], [0, 1]);
  const approachOpacity = useTransform(local, [0.14, 0.24], [0, 1]);
  const approachY = useTransform(local, [0.14, 0.24], [12, 0]);

  const figureIn = useTransform(local, [0.01, 0.16], [0, 1]);
  const figureY = useTransform(local, [0.01, 0.16], [18, 0]);

  const reversed = index % 2 === 1;

  return (
    <article className={styles.scene} aria-label={problem.title}>
      <div
        className={`${styles.sceneInner}${reversed ? ` ${styles.sceneInnerReversed}` : ""}`}
        style={{ gridTemplateAreas: reversed ? `"figure copy"` : `"copy figure"` }}
      >
        <div className={styles.sceneCopy}>
          <motion.div className={styles.sceneHead} style={{ opacity: headOpacity }}>
            <span className={styles.sceneNumber} aria-hidden="true">
              {problem.number}
            </span>
            <span className={styles.sceneKicker}>{problem.kicker}</span>
          </motion.div>

          <h3 className={styles.sceneTitle}>
            <motion.span className={styles.titleText} style={{ y: titleY, opacity: titleOpacity }}>
              {problem.title}
            </motion.span>
          </h3>

          <motion.p className={styles.sceneLead} style={{ y: leadY, opacity: leadOpacity }}>
            {problem.lead}
          </motion.p>

          <motion.p className={styles.sceneDesc} style={{ opacity: descOpacity }}>
            {problem.description}
          </motion.p>

          <motion.div
            className={styles.sceneApproach}
            style={{ opacity: approachOpacity, y: approachY }}
          >
            <span className={styles.approachLabel}>Our approach</span>
            <p className={styles.approachText}>{problem.approach}</p>
          </motion.div>
        </div>

        <motion.div
          className={styles.sceneFigure}
          style={{ opacity: figureIn, y: figureY }}
          aria-label={`${problem.title}: problem to solution`}
        >
          <div className={styles.figureBackdrop} />
          <SceneGlyph type={problem.visual} />
          <div className={styles.transform}>
            <TransformZone
              label="Today"
              items={toList(problem.signals)}
              tone="problem"
              progress={local}
              window={[0.2, 0.34]}
            />
            <Connector progress={local} window={[0.32, 0.38]} />
            <TransformZone
              label="With JabitSoft"
              items={toList(problem.response)}
              tone="response"
              progress={local}
              window={[0.38, 0.52]}
            />
            <Result outcome={problem.outcome} progress={local} window={[0.52, 0.6]} />
          </div>
        </motion.div>
      </div>
    </article>
  );
}

/* ------------------------------ Vertical scene ------------------------------ */

function VerticalScene({ problem }: { problem: Problem }) {
  return (
    <article className={styles.verticalScene}>
      <div className={styles.verticalHead}>
        <span className={styles.sceneNumber} aria-hidden="true">
          {problem.number}
        </span>
        <span className={styles.sceneKicker}>{problem.kicker}</span>
      </div>

      <h3 className={styles.verticalTitle}>{problem.title}</h3>
      <p className={styles.verticalLead}>{problem.lead}</p>
      <p className={styles.verticalDesc}>{problem.description}</p>

      <div className={styles.verticalApproach}>
        <span className={styles.approachLabel}>Our approach</span>
        <p className={styles.approachText}>{problem.approach}</p>
      </div>

      <div className={styles.verticalFigure}>
        <div className={styles.figureBackdrop} />
        <SceneGlyph type={problem.visual} />
        <div className={styles.transform}>
          <div className={`${styles.zone} ${styles.zoneProblem}`}>
            <span className={styles.zoneLabel}>What we see</span>
            <ul className={styles.zoneItems}>
              {toList(problem.signals).map((item) => (
                <li key={item} className={styles.chip}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.connectorRow} aria-hidden="true">
            <span className={styles.connectorLine} />
            <span className={styles.connectorArrow}>
              <svg viewBox="0 0 16 16" aria-hidden="true" className={styles.arrowSvg}>
                <path
                  d="M3 8h10 M9 4l4 4-4 4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
              </svg>
            </span>
          </div>

          <div className={`${styles.zone} ${styles.zoneResponse}`}>
            <span className={styles.zoneLabel}>How we fix it</span>
            <ul className={styles.zoneItems}>
              {toList(problem.response).map((item) => (
                <li key={item} className={styles.chip}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.result}>
            <span className={styles.resultLabel}>Result</span>
            <p className={styles.resultText}>{problem.outcome}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ------------------------------ Header & nav ------------------------------ */

function SectionHeader() {
  return (
    <header className={styles.header}>
      <p className={styles.eyebrow}>(Problems we solve)</p>
      <RevealHeading
        as="h2"
        id="problems-title"
        aria-label="We solve the problems that slow growth down."
      >
        We solve the problems that
        <span> slow growth down.</span>
      </RevealHeading>
      <p className={styles.intro}>
        From disconnected systems and manual operations to scaling, customer experience, and applied
        AI — we turn operational friction into clear software priorities.
      </p>
    </header>
  );
}

/* ------------------------------ Main ------------------------------ */

export default function ProblemsWeSolve() {
  const reducedMotion = useReducedMotion();
  const scrollWrapRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const trackViewportRef = useRef<HTMLDivElement>(null);
  const navBtnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const distanceMV = useMotionValue(0);

  const panelCount = problems.length;
  const lastIndex = panelCount - 1;

  // Progress through the pinned narrative. Instead of relying on CSS
  // `position: sticky` (which breaks when `body` is an overflow-x scroll
  // container), the section is pinned with gsap ScrollTrigger — the same
  // mechanism RecentWorks uses — and its 0..1 progress is fed into a spring
  // MotionValue so the rest of the (locked) motion pipeline stays untouched.
  const rawProgress = useMotionValue(0);

  const smoothProgress = useSpring(rawProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  // Pin the narrative stage for the full scroll distance of the tall wrapper,
  // and stream ScrollTrigger progress into the spring-driven motion pipeline.
  useLayoutEffect(() => {
    if (reducedMotion) return undefined;
    gsap.registerPlugin(ScrollTrigger);
    const wrap = scrollWrapRef.current;
    const pinned = pinnedRef.current;
    if (!wrap || !pinned) return undefined;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrap,
        start: "top top",
        end: "bottom bottom",
        pin: pinned,
        pinSpacing: true,
        anticipatePin: 1,
        onUpdate: (self) => rawProgress.set(self.progress),
      });
    }, wrap);
    const refreshFrame = requestAnimationFrame(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    });
    return () => {
      cancelAnimationFrame(refreshFrame);
      ctx.revert();
    };
  }, [reducedMotion, rawProgress]);

  // Measure the real horizontal travel once per layout, and again on resize so
  // the last panel aligns flush with no trailing blank space beside it.
  useLayoutEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const viewport = trackViewportRef.current;
      if (!track || !viewport) return;
      const distance = Math.max(0, track.scrollWidth - viewport.clientWidth);
      distanceMV.set(distance);
    };
    measure();
    if (typeof ResizeObserver !== "undefined") {
      const observer = new ResizeObserver(measure);
      if (trackRef.current) observer.observe(trackRef.current);
      if (trackViewportRef.current) observer.observe(trackViewportRef.current);
      return () => observer.disconnect();
    }
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [panelCount, distanceMV]);

  const trackX = useTransform([smoothProgress, distanceMV], (values: number[]) => {
    const [p, d] = values;
    const clamped = Math.max(0, Math.min(1, p));
    return -clamped * d;
  });

  // Sync the active nav step from the smoothed progress (not the raw scroll
  // value) and only update React state when the active index actually changes.
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const clamped = Math.max(0, Math.min(1, latest));
    const index = Math.min(lastIndex, Math.max(0, Math.round(clamped * lastIndex)));
    if (index !== activeIndexRef.current) {
      activeIndexRef.current = index;
      setActiveIndex(index);
    }
  });

  const jumpTo = (index: number) => {
    const wrap = scrollWrapRef.current;
    if (!wrap) return;
    const wrapTop = wrap.getBoundingClientRect().top + window.scrollY;
    const scrollable = Math.max(0, wrap.scrollHeight - window.innerHeight);
    const target = wrapTop + scrollable * (index / lastIndex);
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  const onNavKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const map: Record<string, number> = {
      ArrowRight: (index + 1) % panelCount,
      ArrowDown: (index + 1) % panelCount,
      ArrowLeft: (index - 1 + panelCount) % panelCount,
      ArrowUp: (index - 1 + panelCount) % panelCount,
      Home: 0,
      End: lastIndex,
    };
    const next = map[event.key];
    if (next === undefined) return;
    event.preventDefault();
    jumpTo(next);
    navBtnRefs.current[Math.min(next, lastIndex)]?.focus();
  };

  return (
    <MotionConfig reducedMotion="user">
      <section
        className={styles.section}
        data-reduced={reducedMotion ? "true" : "false"}
        id="problems"
        aria-labelledby="problems-title"
      >
        <SectionHeader />

        {/* Desktop horizontal narrative */}
        <div className={styles.horizontal}>
          <div
            className={styles.scrollWrap}
            style={{ height: `calc(${panelCount} * 100svh)` }}
            ref={scrollWrapRef}
          >
            <div className={styles.pinned} ref={pinnedRef}>
              <div className={styles.trackViewport} ref={trackViewportRef}>
                <motion.div
                  className={styles.track}
                  ref={trackRef}
                  style={{ x: trackX }}
                  aria-label="The problems we solve"
                >
                  {problems.map((problem, index) => (
                    <Scene
                      key={problem.number}
                      problem={problem}
                      index={index}
                      progress={smoothProgress}
                      panelCount={panelCount}
                    />
                  ))}
                </motion.div>
              </div>

              <nav className={styles.progressNav} aria-label="Problem navigation">
                <span className={styles.navHint}>Scroll to explore</span>
                <div className={styles.navRail}>
                  <span className={styles.navRailLine} aria-hidden="true" />
                  <motion.span
                    className={styles.navRailFill}
                    aria-hidden="true"
                    style={{ scaleX: smoothProgress }}
                  />
                  {problems.map((problem, index) => {
                    const active = index === activeIndex;
                    return (
                      <button
                        key={problem.number}
                        type="button"
                        className={`${styles.progressBtn}${active ? ` ${styles.progressBtnActive}` : ""}`}
                        aria-current={active ? "true" : undefined}
                        aria-label={`Go to problem ${problem.number}: ${problem.title}`}
                        onClick={() => jumpTo(index)}
                        onKeyDown={(event) => onNavKeyDown(event, index)}
                        ref={(el) => {
                          navBtnRefs.current[index] = el;
                        }}
                        tabIndex={active ? 0 : -1}
                      >
                        <span className={styles.progressNum}>{problem.number}</span>
                      </button>
                    );
                  })}
                </div>
                <motion.span
                  className={styles.navArrow}
                  aria-hidden="true"
                  animate={{ x: [0, 6, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <svg viewBox="0 0 16 16" aria-hidden="true" className={styles.arrowSvg}>
                    <path
                      d="M3 8h10 M9 4l4 4-4 4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                  </svg>
                </motion.span>
              </nav>
            </div>
          </div>
        </div>

        {/* Tablet / mobile vertical story */}
        <div className={styles.vertical}>
          {problems.map((problem) => (
            <VerticalScene key={problem.number} problem={problem} />
          ))}
        </div>
      </section>
    </MotionConfig>
  );
}
