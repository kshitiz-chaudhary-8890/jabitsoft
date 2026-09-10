"use client";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  type Variants,
} from "motion/react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

import styles from "./HowWeBuild.module.css";

/* ==========================================================================
   JabitSoft — How we work
   Editorial "delivery ledger": six horizontal panels on desktop, one open at a
   time; vertical accordion under 1024px. Motion is layered on top of a layout
   that already reads correctly with JavaScript and animation disabled.
   ========================================================================== */

type StageKey =
  | "align"
  | "blueprint"
  | "prove"
  | "build"
  | "launch"
  | "compound";

type StageColumn = {
  label: string;
  items: string[];
};

type Stage = {
  key: StageKey;
  number: string;
  spine: string;
  phase: string;
  title: string;
  lead: string;
  columns: StageColumn[];
  outcome: string;
  meta: { label: string; value: string }[];
  practices: string;
};

const STAGES: Stage[] = [
  {
    key: "align",
    number: "01",
    spine: "Align",
    phase: "Discovery & alignment",
    title: "We map the operation before we scope the software.",
    lead:
      "The first conversations are spent on how work actually moves through your business — who touches it, which systems hold the data, and where the cost or delay is created. A broad ambition is turned into a first release that can be defended internally.",
    columns: [
      {
        label: "You are involved in",
        items: [
          "Two working sessions a week with the people who live inside the workflow",
          "Read-only access to current tools, exports and reporting",
          "One decision-maker who can confirm scope and success measures",
        ],
      },
      {
        label: "What our team does",
        items: [
          "Process and data-flow mapping across ERP, CRM, spreadsheets and internal tools",
          "Constraint review: compliance, procurement, integration limits, internal capacity",
          "Effort-to-impact scoring for every candidate module, with assumptions written down",
        ],
      },
      {
        label: "You receive",
        items: [
          "Current-state workflow map and system inventory",
          "Prioritised scope with measurable success criteria",
          "Indicative budget bands and a delivery sequence",
        ],
      },
    ],
    outcome:
      "Both sides agree on the same problem, the same first release and the same definition of done.",
    meta: [
      { label: "Typical duration", value: "1–2 weeks" },
      { label: "Your time", value: "~4 hrs / week" },
      { label: "Led by", value: "Delivery lead + domain engineer" },
    ],
    practices: "Applies across ERP · Cloud Consulting · Agentic AI",
  },
  {
    key: "blueprint",
    number: "02",
    spine: "Blueprint",
    phase: "Architecture & solution design",
    title: "One blueprint covering product, data, cloud and agents.",
    lead:
      "Product, engineering, cloud and AI decisions are made in the same room instead of being handed between teams. You see two viable architectures with honest trade-offs — cost, speed, lock-in, operating burden — and choose with your own IT and security stakeholders present.",
    columns: [
      {
        label: "You are involved in",
        items: [
          "A structured review of two architecture options, explained without jargon",
          "Sign-off on data ownership, hosting region and access model",
          "Security and IT review with your internal or external auditors",
        ],
      },
      {
        label: "What our team does",
        items: [
          "Domain and data modelling, API contracts, event flows and integration boundaries",
          "Cloud topology: environments, networking, IAM, backup strategy and a cost envelope",
          "Agent design — tool permissions, retrieval sources, evaluation criteria, human-in-the-loop points",
        ],
      },
      {
        label: "You receive",
        items: [
          "Solution architecture, data model and integration contracts",
          "Interface direction and the flows that carry the most business value",
          "Sprint-level delivery plan with dependencies and owners named",
        ],
      },
    ],
    outcome:
      "The expensive decisions get made on paper, while changing them still costs a conversation instead of a rebuild.",
    meta: [
      { label: "Typical duration", value: "1–3 weeks" },
      { label: "Your time", value: "2 review sessions" },
      { label: "Led by", value: "Solution architect" },
    ],
    practices: "Applies across Cloud Consulting · Agentic AI · Website Solutions",
  },
  {
    key: "prove",
    number: "03",
    spine: "Prove",
    phase: "Prototype & technical proof",
    title: "Prove the risky twenty percent before the budget commits.",
    lead:
      "Every programme has one part that decides whether the rest works: a legacy integration, a data migration, a model that has to be accurate enough to trust. We build a thin slice straight through it and measure the result against thresholds you set in advance.",
    columns: [
      {
        label: "You are involved in",
        items: [
          "Hands-on review of a clickable prototype running on real sample data",
          "Agreeing acceptance thresholds for accuracy, latency and unit cost",
          "An honest go / adjust / stop conversation at the end of the stage",
        ],
      },
      {
        label: "What our team does",
        items: [
          "Builds one vertical slice through the hardest path, end to end",
          "Runs agent and model evaluations against a labelled golden set, not vibes",
          "Load, failure-mode and cost testing on the shortlisted stack, including fallback behaviour",
        ],
      },
      {
        label: "You receive",
        items: [
          "Working prototype on a staging environment you can share internally",
          "Benchmark report: accuracy, latency, throughput and cost per transaction",
          "Revised estimate for the full build, based on measured evidence",
        ],
      },
    ],
    outcome:
      "Technical and commercial risk is retired with data before the largest part of the investment is released.",
    meta: [
      { label: "Typical duration", value: "2–3 weeks" },
      { label: "Gate", value: "Thresholds met or scope changes" },
      { label: "Led by", value: "Principal engineer" },
    ],
    practices: "Applies across Agentic AI · ERP · Mobile Apps",
  },
  {
    key: "build",
    number: "04",
    spine: "Build",
    phase: "Engineering delivery",
    title: "Two-week cycles that end in software, not status decks.",
    lead:
      "A senior pod builds the highest-value path first and keeps it releasable. You work from the same board we do, see running software every second Friday, and can reprioritise the next cycle without renegotiating the contract.",
    columns: [
      {
        label: "You are involved in",
        items: [
          "A demo of working software at the end of every sprint",
          "One product owner with the authority to reorder the backlog",
          "Shared board and shared repository access — the same tickets we work from",
        ],
      },
      {
        label: "What our team does",
        items: [
          "Product engineering across web, mobile, ERP modules and agent workflows",
          "Trunk-based delivery with CI, automated test suites and per-branch preview environments",
          "Continuous integration against your live systems, plus code review on every change",
        ],
      },
      {
        label: "You receive",
        items: [
          "A tested increment deployed to staging each sprint",
          "Sprint notes covering scope changes, decisions and remaining budget",
          "Technical documentation, API references and test coverage kept current",
        ],
      },
    ],
    outcome:
      "Progress stays visible and reversible, so scope can change direction without losing the work already paid for.",
    meta: [
      { label: "Typical duration", value: "6–20 weeks" },
      { label: "Cadence", value: "2-week sprints" },
      { label: "Pod", value: "4–6 senior engineers" },
    ],
    practices: "Applies across Mobile Apps · Website Solutions · ERP · Agentic AI",
  },
  {
    key: "launch",
    number: "05",
    spine: "Launch",
    phase: "Hardening & release",
    title: "Release day is rehearsed, observable and reversible.",
    lead:
      "Before anything reaches your customers, the critical paths are proven under security, performance, accessibility and search conditions. Migration is rehearsed on a copy of production, and the rollout has a monitored path forward and a tested path back.",
    columns: [
      {
        label: "You are involved in",
        items: [
          "Signed user-acceptance testing on the flows your business depends on",
          "Admin and support training, recorded and documented for new joiners",
          "Choosing the launch window, comms plan and rollback criteria",
        ],
      },
      {
        label: "What our team does",
        items: [
          "Security review, load testing and a WCAG 2.2 AA accessibility pass",
          "Core Web Vitals, technical SEO, indexation, redirects and analytics instrumentation",
          "Staged or blue-green rollout with migration dry runs, alerting and dashboards in place",
        ],
      },
      {
        label: "You receive",
        items: [
          "Production environment with monitoring, alert routing and on-call runbooks",
          "Migration and rollback plan that has already been executed in rehearsal",
          "Handover pack: architecture, credentials, ownership matrix and training material",
        ],
      },
    ],
    outcome:
      "You go live with documented proof of readiness — and a team that can operate the system without us in the room.",
    meta: [
      { label: "Typical duration", value: "1–2 weeks" },
      { label: "Gates", value: "Security · performance · a11y · SEO" },
      { label: "Support", value: "Hypercare for 30 days" },
    ],
    practices: "Applies across Website Solutions · SEO / Digital Growth · Cloud Consulting",
  },
  {
    key: "compound",
    number: "06",
    spine: "Compound",
    phase: "Operate, measure & improve",
    title: "After launch, real usage decides the roadmap.",
    lead:
      "Once the system is live, evidence replaces opinion. Product analytics, reliability data, cloud spend and search performance feed one improvement loop, and every next investment is argued from measured impact rather than a wish list.",
    columns: [
      {
        label: "You are involved in",
        items: [
          "A monthly review of adoption, reliability, spend and growth metrics",
          "One ranked backlog, ordered by business impact and cost to serve",
          "Optional co-ownership: your engineers work inside the same pod and rituals",
        ],
      },
      {
        label: "What our team does",
        items: [
          "Reliability engineering: SLOs, incident response, capacity and cloud cost optimisation",
          "Regression tracking for prompts, models and agent tools as your data drifts",
          "Conversion, content and technical SEO experiments with measured lift and a written result",
        ],
      },
      {
        label: "You receive",
        items: [
          "Monthly impact report across product, uptime, cloud cost and search",
          "Prioritised next-quarter roadmap with effort and expected return",
          "A continuous release train under an agreed response and resolution SLA",
        ],
      },
    ],
    outcome:
      "The platform keeps compounding value instead of freezing at version one and quietly ageing.",
    meta: [
      { label: "Duration", value: "Ongoing" },
      { label: "Rhythm", value: "Monthly review · quarterly plan" },
      { label: "Led by", value: "Account engineer + growth lead" },
    ],
    practices: "Applies across SEO / Digital Growth · Cloud Consulting · Agentic AI",
  },
];

const FACTS = [
  { value: "06", label: "stages from first call to compounding value" },
  { value: "02", label: "week release cadence, from stage four onward" },
  { value: "01", label: "accountable delivery lead for the whole journey" },
  { value: "03", label: "decision gates where you can stop or redirect" },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const bodyVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.055, delayChildren: 0.08 },
  },
  exit: {},
};

const pieceVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
  exit: { opacity: 0, transition: { duration: 0.18, ease: "linear" } },
};

/* ------------------------------------------------------------------ glyphs */

function StageGlyph({ stageKey }: { stageKey: StageKey }) {
  const common = {
    className: styles.glyph,
    viewBox: "0 0 48 48",
    "aria-hidden": true as const,
  };

  switch (stageKey) {
    case "align":
      return (
        <svg {...common}>
          <path data-draw="" d="M4 10h16M4 24h10M4 38h16" />
          <path data-draw="" d="M20 10 34 24 20 38" />
          <circle data-draw="" cx="40" cy="24" r="4" />
        </svg>
      );
    case "blueprint":
      return (
        <svg {...common}>
          <path data-draw="" d="M6 14h36M6 24h36M6 34h36" />
          <path data-draw="" d="M16 8v32M32 8v32" />
          <rect data-draw="" x="16" y="14" width="16" height="10" />
        </svg>
      );
    case "prove":
      return (
        <svg {...common}>
          <path data-draw="" d="M4 34c6 0 8-20 14-20s8 14 14 14 6-8 12-8" />
          <path data-draw="" d="M4 42h40" />
          <circle data-draw="" cx="18" cy="14" r="3" />
        </svg>
      );
    case "build":
      return (
        <svg {...common}>
          <rect data-draw="" x="4" y="12" width="12" height="10" />
          <rect data-draw="" x="18" y="26" width="12" height="10" />
          <rect data-draw="" x="32" y="12" width="12" height="10" />
          <path data-draw="" d="M10 22v8h14M30 31h4v-9" />
        </svg>
      );
    case "launch":
      return (
        <svg {...common}>
          <path data-draw="" d="M24 4 40 12v14c0 10-8 15-16 18-8-3-16-8-16-18V12Z" />
          <path data-draw="" d="M17 24l5 5 10-11" />
        </svg>
      );
    case "compound":
    default:
      return (
        <svg {...common}>
          <path data-draw="" d="M10 30a14 14 0 1 1 28-8" />
          <path data-draw="" d="M38 14v9h-9" />
          <path data-draw="" d="M38 22a14 14 0 0 1-28 8" />
          <path data-draw="" d="M10 38v-9h9" />
        </svg>
      );
  }
}

/* ------------------------------------------------------------------- hooks */

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const list = window.matchMedia(query);
    const update = () => setMatches(list.matches);

    update();
    list.addEventListener("change", update);

    return () => list.removeEventListener("change", update);
  }, [query]);

  return matches;
}

/* --------------------------------------------------------------- component */

export default function HowWeBuild() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const hoverTimer = useRef<number | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const isDesktop = useMediaQuery("(min-width: 1180px)");
  const canHover = useMediaQuery("(hover: hover) and (pointer: fine)");

  const activeStage = activeIndex >= 0 ? STAGES[activeIndex] : null;

  const clearHoverTimer = useCallback(() => {
    if (hoverTimer.current !== null) {
      window.clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
  }, []);

  useEffect(() => clearHoverTimer, [clearHoverTimer]);

  const handleHover = useCallback(
    (index: number) => {
      if (!isDesktop || !canHover) return;
      clearHoverTimer();
      hoverTimer.current = window.setTimeout(() => setActiveIndex(index), 90);
    },
    [canHover, clearHoverTimer, isDesktop],
  );

  const handleActivate = useCallback(
    (index: number) => {
      clearHoverTimer();
      setActiveIndex((current) => {
        if (current !== index) return index;
        // Desktop always keeps one panel open; mobile allows collapsing.
        return isDesktop ? current : -1;
      });
    },
    [clearHoverTimer, isDesktop],
  );

  /* ----------------------------------------------------------- GSAP layer */

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.registerPlugin(ScrollTrigger);

    const media = gsap.matchMedia();

    const context = gsap.context(() => {
      media.add(
        {
          reduce: "(prefers-reduced-motion: reduce)",
          desktop: "(min-width: 1180px)",
        },
        (mediaContext) => {
          const { reduce, desktop } = mediaContext.conditions as {
            reduce: boolean;
            desktop: boolean;
          };

          const q = gsap.utils.selector(section);
          const headingLines = q("[data-heading-line]");
          const ghost = q("[data-ghost]")[0] as HTMLElement | undefined;
          const drawPaths = Array.from(
            section.querySelectorAll<SVGGeometryElement>("[data-draw]"),
          );

          section.dataset.motionReady = "true";

          if (reduce) {
            gsap.set(headingLines, {
              backgroundSize: "100% 100%, 100% 100%",
            });
            gsap.set(q("[data-reveal]"), { clearProps: "all" });
            gsap.set(drawPaths, { clearProps: "all" });
            return;
          }

          // Grey → dark, left-to-right scroll fill on the section heading.
          const headingFill = gsap.timeline({
            scrollTrigger: {
              trigger: q("[data-heading]")[0],
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

          // Editorial intro reveal.
          gsap.fromTo(
            q("[data-reveal]"),
            { y: 26, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.66,
              stagger: 0.08,
              ease: "power3.out",
              clearProps: "transform,opacity",
              scrollTrigger: {
                trigger: q("[data-head]")[0],
                start: "top 82%",
                once: true,
              },
            },
          );

          // Rail entrance.
          gsap.fromTo(
            q("[data-rail]")[0],
            { y: 34, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.72,
              ease: "power3.out",
              clearProps: "transform,opacity",
              scrollTrigger: {
                trigger: q("[data-rail]")[0],
                start: "top 88%",
                once: true,
              },
            },
          );

          // Technical line-drawing on the stage glyphs.
          if (drawPaths.length) {
            gsap.set(drawPaths, { strokeDasharray: 1, strokeDashoffset: 1 });
            gsap.to(drawPaths, {
              strokeDashoffset: 0,
              duration: 1.1,
              stagger: 0.05,
              ease: "power2.out",
              scrollTrigger: {
                trigger: q("[data-rail]")[0],
                start: "top 82%",
                once: true,
              },
            });
          }

          // Oversized background typography drifts slightly against the scroll.
          if (ghost && desktop) {
            gsap.fromTo(
              ghost,
              { xPercent: -3, yPercent: 6 },
              {
                xPercent: 3,
                yPercent: -6,
                ease: "none",
                scrollTrigger: {
                  trigger: q("[data-stageband]")[0],
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1.1,
                  invalidateOnRefresh: true,
                },
              },
            );
          }
        },
      );
    }, section);

    return () => {
      media.kill();
      context.revert();
    };
  }, []);

  // Panel widths change layout, so let ScrollTrigger re-measure after a switch.
  useEffect(() => {
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 780);
    return () => window.clearTimeout(id);
  }, [activeIndex, isDesktop]);

  /* --------------------------------------------------------------- render */

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="how-we-work"
        ref={sectionRef}
        className={styles.section}
        aria-labelledby="how-we-work-title"
      >
        <div className={styles.shell}>
          <header className={styles.head} data-head="">
            <div className={styles.headMain}>
              <p className={styles.eyebrow} data-reveal="">
                (How we build)
              </p>

              <h2 className={styles.title} id="how-we-work-title" data-heading="">
                <span className={styles.titleLine} data-heading-line="">
                  How We Build
                </span>
                <span
                  className={`${styles.titleLine} ${styles.titleLineAlt}`}
                  data-heading-line=""
                >
                  First Call To Compounding Value
                </span>
              </h2>
            </div>

            <div className={styles.headAside}>
              <p className={styles.headLead} data-reveal="">
                JabitSoft runs one delivery system across agentic AI, cloud, mobile,
                ERP, web and search. The stages below are the actual operating
                rhythm of a programme — what gets decided, who is in the room, and
                what leaves each stage as a reviewable artefact.
              </p>

              <dl className={styles.headMeta} data-reveal="">
                <div>
                  <dt>Engagement shape</dt>
                  <dd>Fixed-scope discovery, then sprint-based delivery</dd>
                </div>
                <div>
                  <dt>Exit points</dt>
                  <dd>After stage 01, 03 and any sprint boundary</dd>
                </div>
              </dl>
            </div>
          </header>

          <div className={styles.stageBand} data-stageband="">
            <div className={styles.railHeader} data-reveal="">
              <span>Stage ledger</span>
              <span className={styles.railHeaderRule} aria-hidden="true" />
              <span>
                {activeStage ? activeStage.number : "\u2014"} / {STAGES.length}
              </span>
            </div>

            <div className={styles.ghostRow} aria-hidden="true">
              <AnimatePresence initial={false} mode="wait">
                <motion.span
                  key={activeStage ? activeStage.key : "index"}
                  className={styles.ghost}
                  data-ghost=""
                  initial={{ opacity: 0, y: "18%" }}
                  animate={{ opacity: 1, y: "0%" }}
                  exit={{ opacity: 0, y: "-14%" }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  {activeStage ? activeStage.spine : "Process"}
                </motion.span>
              </AnimatePresence>
            </div>

            <ol className={styles.rail} data-rail="">
              {STAGES.map((stage, index) => {
                const isActive = index === activeIndex;

                return (
                  <motion.li
                    key={stage.key}
                    className={styles.panel}
                    data-active={isActive ? "true" : "false"}
                    style={isDesktop ? { flexBasis: 0 } : undefined}
                    animate={
                      isDesktop ? { flexGrow: isActive ? 9.4 : 1 } : { flexGrow: 0 }
                    }
                    transition={{ duration: 0.72, ease: EASE }}
                    onMouseEnter={() => handleHover(index)}
                  >
                    <button
                      type="button"
                      className={styles.face}
                      aria-expanded={isActive}
                      aria-controls={`stage-panel-${stage.key}`}
                      id={`stage-face-${stage.key}`}
                      onClick={() => handleActivate(index)}
                      onFocus={() => setActiveIndex(index)}
                    >
                      <span className={styles.faceNumber} aria-hidden="true">
                        {stage.number}
                      </span>

                      <span className={styles.faceLabel}>
                        <span className={styles.faceSpine}>{stage.spine}</span>
                        <span className={styles.facePhase}>{stage.phase}</span>
                      </span>

                      <span className={styles.faceFoot} aria-hidden="true">
                        <StageGlyph stageKey={stage.key} />
                        <motion.span
                          className={styles.faceIndicator}
                          animate={{ rotate: isActive ? 45 : 0 }}
                          transition={{ duration: 0.4, ease: EASE }}
                        >
                          <svg viewBox="0 0 16 16" aria-hidden="true">
                            <path d="M8 2v12M2 8h12" />
                          </svg>
                        </motion.span>
                        <span className={styles.faceTicks} />
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isActive ? (
                        <motion.div
                          key="body"
                          id={`stage-panel-${stage.key}`}
                          role="region"
                          aria-labelledby={`stage-face-${stage.key}`}
                          className={styles.body}
                          variants={bodyVariants}
                          initial="hidden"
                          animate="show"
                          exit="exit"
                          {...(isDesktop
                            ? {}
                            : {
                                style: { overflow: "hidden" },
                                initial: { height: 0, opacity: 0 },
                                animate: { height: "auto", opacity: 1 },
                                exit: { height: 0, opacity: 0 },
                                transition: { duration: 0.45, ease: EASE },
                              })}
                        >
                          <div className={styles.bodyInner}>
                            <span className={styles.bodyGhost} aria-hidden="true">
                              {stage.number}
                            </span>

                            <motion.div
                              className={styles.bodyHead}
                              variants={isDesktop ? pieceVariants : undefined}
                            >
                              <p className={styles.bodyPhase}>{stage.phase}</p>
                              <h3 className={styles.bodyTitle}>{stage.title}</h3>
                              <p className={styles.bodyLead}>{stage.lead}</p>
                            </motion.div>

                            <div className={styles.bodyGrid}>
                              {stage.columns.map((column) => (
                                <motion.div
                                  key={column.label}
                                  className={styles.col}
                                  variants={isDesktop ? pieceVariants : undefined}
                                >
                                  <h4 className={styles.colLabel}>{column.label}</h4>
                                  <ul className={styles.colList}>
                                    {column.items.map((item) => (
                                      <li key={item}>
                                        <span
                                          className={styles.bullet}
                                          aria-hidden="true"
                                        />
                                        {item}
                                      </li>
                                    ))}
                                  </ul>
                                </motion.div>
                              ))}
                            </div>

                            <motion.div
                              className={styles.bodyFoot}
                              variants={isDesktop ? pieceVariants : undefined}
                            >
                              <div className={styles.footMain}>
                                <span className={styles.outcomeLabel}>
                                  What this stage achieves
                                </span>
                                <p className={styles.outcome}>{stage.outcome}</p>
                                <p className={styles.practices}>{stage.practices}</p>
                              </div>

                              <div className={styles.metaRow}>
                                {stage.meta.map((entry) => (
                                  <div key={entry.label} className={styles.metaItem}>
                                    <span className={styles.metaLabel}>
                                      {entry.label}
                                    </span>
                                    <span className={styles.metaValue}>
                                      {entry.value}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </motion.li>
                );
              })}
            </ol>
          </div>

          <footer className={styles.factStrip} data-reveal="">
            {FACTS.map((fact) => (
              <div key={fact.label} className={styles.fact}>
                <span className={styles.factValue}>{fact.value}</span>
                <span className={styles.factLabel}>{fact.label}</span>
              </div>
            ))}
          </footer>
        </div>
      </section>
    </MotionConfig>
  );
}
