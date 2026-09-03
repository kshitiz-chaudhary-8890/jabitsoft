"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import styles from "./ProblemsWeSolve.module.css";
import RevealHeading from "../../common/RevealHeading.jsx";

const problems = [
  {
    number: "01",
    kicker: "Connected operations",
    title: "Disconnected systems",
    short:
      "Your tools may work independently, but growth slows when they cannot work together.",
    description:
      "When operations, customer data, reporting, and support live in separate systems, teams lose context between hand-offs, repeat the same work, and struggle to see one reliable picture of the business.",
    signals: [
      "Duplicate data across business tools",
      "Conflicting sources of truth",
      "Manual hand-offs between teams",
    ],
    response: [
      "API and system integrations",
      "Unified operational workflows",
      "Clear ownership of shared data",
    ],
    outcome:
      "A connected operating environment where information moves reliably between teams, ownership is clearer, and decisions are made with better context.",
    approach:
      "We map how data and work move today, identify the gaps that create friction, and connect the systems that matter without forcing unnecessary platform changes.",
    visual: "systems",
  },
  {
    number: "02",
    kicker: "Workflow design",
    title: "Manual workflows",
    short:
      "Routine work should move through a system, not a chain of repetitive hand-offs.",
    description:
      "Approvals, reporting, updates, and operational tasks often become slow because the process evolved around spreadsheets, inboxes, and individual habits instead of a clear digital workflow.",
    signals: [
      "Repeated approvals and data entry",
      "Spreadsheet-led operational processes",
      "Routine work dependent on individuals",
    ],
    response: [
      "Workflow and process automation",
      "Clear states, rules, and ownership",
      "Human review at the right checkpoints",
    ],
    outcome:
      "Fewer repetitive steps, cleaner hand-offs, faster decisions, and automation that supports teams without removing the control they still need.",
    approach:
      "We map the workflow before automating it, then combine product design, engineering, and automation so each step has a clear state, owner, and next action.",
    visual: "workflow",
  },
  {
    number: "03",
    kicker: "Scalable architecture",
    title: "Products that do not scale",
    short:
      "The architecture that launched the product should not become the limit on its growth.",
    description:
      "As usage grows, shortcuts in architecture, infrastructure, integrations, and release processes can turn into slower delivery, fragile changes, performance issues, and rising technical debt.",
    signals: [
      "Releases taking longer to ship",
      "Fragile integrations and dependencies",
      "Performance degrading as usage grows",
    ],
    response: [
      "Architecture and platform review",
      "Modular, maintainable system design",
      "Scalable cloud infrastructure",
    ],
    outcome:
      "A maintainable technical foundation that can support more users, more teams, new capabilities, and future integrations without making every release harder.",
    approach:
      "We review architecture, infrastructure, performance, and release flow together, then strengthen the parts that are limiting product velocity or operational reliability.",
    visual: "scale",
  },
  {
    number: "04",
    kicker: "Applied AI",
    title: "AI without a clear use case",
    short:
      "AI creates value when it connects real data, real tools, and clear human control.",
    description:
      "A model or isolated demo is not enough. Useful AI needs access to the right business context, defined actions, guardrails, review states, and a measurable role inside an existing workflow.",
    signals: [
      "AI experiments isolated from daily work",
      "No reliable connection to business data",
      "No approval, review, or action framework",
    ],
    response: [
      "Tool-connected AI agents",
      "Controlled, traceable workflows",
      "Human approval for critical actions",
    ],
    outcome:
      "AI becomes part of a dependable operating workflow, connected to business tools and data while keeping people in control of the decisions that matter.",
    approach:
      "We start with the workflow and business outcome, then design the agent, tool access, guardrails, review points, and integrations required to make AI useful in production.",
    visual: "ai",
  },
  {
    number: "05",
    kicker: "Experience systems",
    title: "Fragmented customer experiences",
    short:
      "Customers experience one brand, even when your internal systems are fragmented.",
    description:
      "Web, mobile, support, operations, and marketing may be managed separately, but customers feel every inconsistency when they move between those touchpoints.",
    signals: [
      "Inconsistent web and mobile experiences",
      "Disconnected support and product journeys",
      "Customers repeating information across channels",
    ],
    response: [
      "Unified experience architecture",
      "Shared design and data patterns",
      "Connected cross-channel journeys",
    ],
    outcome:
      "A more coherent digital journey where interfaces, information, and product behavior feel connected across the touchpoints customers actually use.",
    approach:
      "We align UX, interface patterns, data, content, and product behavior across channels so each touchpoint feels like part of the same product and operating system.",
    visual: "experience",
  },
] as const;

type Problem = (typeof problems)[number];
type VisualType = Problem["visual"];

function SystemsVisual() {
  return (
    <div className={`${styles.diagram} ${styles.systemsDiagram}`} aria-hidden="true">
      <div className={styles.diagramGrid} />

      <span className={`${styles.systemNode} ${styles.systemNodeA}`} data-diagram-node>
        CRM
      </span>
      <span className={`${styles.systemNode} ${styles.systemNodeB}`} data-diagram-node>
        Operations
      </span>
      <span className={`${styles.systemNode} ${styles.systemNodeC}`} data-diagram-node>
        Data
      </span>
      <span className={`${styles.systemNode} ${styles.systemNodeD}`} data-diagram-node>
        Support
      </span>

      <span className={`${styles.systemLine} ${styles.systemLineA}`} data-diagram-line />
      <span className={`${styles.systemLine} ${styles.systemLineB}`} data-diagram-line />
      <span className={`${styles.systemLine} ${styles.systemLineC}`} data-diagram-line />
      <span className={`${styles.systemLine} ${styles.systemLineD}`} data-diagram-line />

      <div className={styles.systemCore} data-diagram-core>
        <small>Unified</small>
        <strong>Platform</strong>
        <i />
      </div>

      <div className={styles.visualStatus} data-diagram-status>
        <i />
        <span>Systems connected</span>
      </div>
    </div>
  );
}

function WorkflowVisual() {
  return (
    <div className={`${styles.diagram} ${styles.workflowDiagram}`} aria-hidden="true">
      <div className={styles.diagramGrid} />

      <div className={styles.workflowTrack}>
        <span className={styles.workflowPath} data-diagram-path />
        <span className={styles.workflowRunner} data-diagram-runner />

        {["Request", "Review", "Approve", "Complete"].map((step, index) => (
          <div className={styles.workflowStep} data-diagram-step key={step}>
            <b>0{index + 1}</b>
            <span>{step}</span>
          </div>
        ))}
      </div>

      <div className={styles.workflowCaption} data-diagram-caption>
        <span>one connected flow</span>
        <i />
      </div>

      <div className={styles.visualStatus} data-diagram-status>
        <i />
        <span>Hand-offs automated</span>
      </div>
    </div>
  );
}

function ScaleVisual() {
  return (
    <div className={`${styles.diagram} ${styles.scaleDiagram}`} aria-hidden="true">
      <div className={styles.diagramGrid} />

      <div className={styles.scaleLabel} data-diagram-label>
        <small>System capacity</small>
        <strong>Built for the next stage</strong>
      </div>

      <div className={styles.scaleBars}>
        <span className={styles.scaleBarOne} data-diagram-bar />
        <span className={styles.scaleBarTwo} data-diagram-bar />
        <span className={styles.scaleBarThree} data-diagram-bar />
        <span className={styles.scaleBarFour} data-diagram-bar />
        <span className={styles.scaleBarFive} data-diagram-bar />
      </div>

      <span className={styles.scaleAxis}>usage →</span>

      <div className={styles.visualStatus} data-diagram-status>
        <i />
        <span>Ready to expand</span>
      </div>
    </div>
  );
}

function AiVisual() {
  return (
    <div className={`${styles.diagram} ${styles.aiDiagram}`} aria-hidden="true">
      <div className={styles.diagramGrid} />

      <div className={styles.aiOrbit}>
        <span className={styles.aiRing} data-diagram-ring />
        <span className={`${styles.aiNode} ${styles.aiNodeA}`} data-diagram-node>
          Data
        </span>
        <span className={`${styles.aiNode} ${styles.aiNodeB}`} data-diagram-node>
          Tools
        </span>
        <span className={`${styles.aiNode} ${styles.aiNodeC}`} data-diagram-node>
          Review
        </span>
        <span className={`${styles.aiNode} ${styles.aiNodeD}`} data-diagram-node>
          Action
        </span>

        <div className={styles.aiCore} data-diagram-core>
          <small>Controlled</small>
          <strong>AI Agent</strong>
        </div>
      </div>

      <div className={styles.visualStatus} data-diagram-status>
        <i />
        <span>Human approval enabled</span>
      </div>
    </div>
  );
}

function ExperienceVisual() {
  return (
    <div className={`${styles.diagram} ${styles.experienceDiagram}`} aria-hidden="true">
      <div className={styles.diagramGrid} />

      <div className={`${styles.screen} ${styles.desktopScreen}`} data-diagram-desktop>
        <div className={styles.screenBar}>
          <i />
          <i />
          <i />
        </div>
        <div className={styles.screenHero}>
          <span data-diagram-ui />
          <span data-diagram-ui />
        </div>
        <div className={styles.screenRows}>
          <i data-diagram-ui />
          <i data-diagram-ui />
          <i data-diagram-ui />
        </div>
      </div>

      <div className={`${styles.screen} ${styles.mobileScreen}`} data-diagram-mobile>
        <div className={styles.notch} />
        <span className={styles.mobileHero} data-diagram-ui />
        <i data-diagram-ui />
        <i data-diagram-ui />
      </div>

      <span className={styles.experienceBridge} data-diagram-bridge>
        One connected journey
      </span>

      <div className={styles.visualStatus} data-diagram-status>
        <i />
        <span>Experience aligned</span>
      </div>
    </div>
  );
}

function Visual({ type }: { type: VisualType }) {
  if (type === "systems") return <SystemsVisual />;
  if (type === "workflow") return <WorkflowVisual />;
  if (type === "scale") return <ScaleVisual />;
  if (type === "ai") return <AiVisual />;
  return <ExperienceVisual />;
}

const DESKTOP_BREAKPOINT = 961;
const PIN_TOP = 24;

export default function ProblemsWeSolve() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const contentTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const diagramTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const idleAnimationsRef = useRef<gsap.core.Animation[]>([]);
  const pendingIndexRef = useRef(0);

  const [activeIndex, setActiveIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;

    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add(`(min-width: ${DESKTOP_BREAKPOINT}px)`, () => {
      const reduced = window.matchMedia?.(
        "(prefers-reduced-motion: reduce)",
      )?.matches;

      if (reduced) return undefined;

      let lastIndex = 0;

      const trigger = ScrollTrigger.create({
        trigger: stage,
        start: () => `top top+=${PIN_TOP}`,
        end: () =>
          `+=${Math.round(window.innerHeight * (problems.length - 1) * 0.84)}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.5,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const nextIndex = Math.min(
            problems.length - 1,
            Math.round(self.progress * (problems.length - 1)),
          );

          if (nextIndex !== lastIndex) {
            lastIndex = nextIndex;
            pendingIndexRef.current = nextIndex;
            setActiveIndex(nextIndex);
          }
        },
      });

      triggerRef.current = trigger;

      const refreshFrame = requestAnimationFrame(() => {
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      });

      return () => {
        cancelAnimationFrame(refreshFrame);
        trigger.kill();
        if (triggerRef.current === trigger) triggerRef.current = null;
      };
    });

    return () => mm.revert();
  }, []);

  useEffect(() => {
    if (activeIndex === displayIndex) return;

    const content = contentRef.current;
    const visual = visualRef.current;

    if (!content || !visual) {
      setDisplayIndex(activeIndex);
      return;
    }

    const reduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    )?.matches;

    if (reduced) {
      const frame = requestAnimationFrame(() => setDisplayIndex(activeIndex));
      return () => cancelAnimationFrame(frame);
    }

    pendingIndexRef.current = activeIndex;
    contentTimelineRef.current?.kill();
    diagramTimelineRef.current?.kill();
    idleAnimationsRef.current.forEach((animation) => animation.kill());
    idleAnimationsRef.current = [];

    const contentTargets = content.querySelectorAll("[data-story-content]");
    const tl = gsap.timeline({
      onComplete: () => {
        setDisplayIndex(pendingIndexRef.current);
      },
    });

    tl.to(contentTargets, {
      autoAlpha: 0,
      y: -12,
      duration: 0.2,
      stagger: 0.014,
      ease: "power2.in",
    }).to(
      visual,
      {
        autoAlpha: 0,
        scale: 0.985,
        duration: 0.2,
        ease: "power2.in",
      },
      0,
    );

    contentTimelineRef.current = tl;

    return () => {
      tl.kill();
      if (contentTimelineRef.current === tl) {
        contentTimelineRef.current = null;
      }
    };
  }, [activeIndex, displayIndex]);

  useLayoutEffect(() => {
    const content = contentRef.current;
    const visual = visualRef.current;

    if (!content || !visual) return undefined;

    const reduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    )?.matches;

    const contentTargets = content.querySelectorAll("[data-story-content]");

    contentTimelineRef.current?.kill();
    diagramTimelineRef.current?.kill();
    idleAnimationsRef.current.forEach((animation) => animation.kill());
    idleAnimationsRef.current = [];

    if (reduced) {
      gsap.set([contentTargets, visual], {
        clearProps: "all",
        autoAlpha: 1,
      });
      return undefined;
    }

    const contentTl = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    contentTl
      .fromTo(
        contentTargets,
        {
          autoAlpha: 0,
          y: 18,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.46,
          stagger: 0.045,
          clearProps: "transform",
        },
      )
      .fromTo(
        visual,
        {
          autoAlpha: 0,
          scale: 0.985,
          y: 8,
        },
        {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          duration: 0.48,
        },
        0.04,
      );

    contentTimelineRef.current = contentTl;

    const diagram = visual.querySelector(`.${styles.diagram}`) as HTMLElement | null;
    if (!diagram) return () => contentTl.kill();

    const type = problems[displayIndex].visual;
    const diagramTl = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    const addIdleAnimation = (animation: gsap.core.Animation | null) => {
      if (animation) idleAnimationsRef.current.push(animation);
    };

    const grid = diagram.querySelector<HTMLElement>(`.${styles.diagramGrid}`);
    const statusDot = diagram.querySelector<HTMLElement>("[data-diagram-status] i");

    if (grid) {
      gsap.set(grid, { autoAlpha: 0, scale: 0.985 });
      diagramTl.to(
        grid,
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.58,
          ease: "power2.out",
        },
        0,
      );
    }

    if (type === "systems") {
      const nodes = Array.from(
        diagram.querySelectorAll<HTMLElement>("[data-diagram-node]"),
      );
      const lines = diagram.querySelectorAll<HTMLElement>("[data-diagram-line]");
      const core = diagram.querySelector<HTMLElement>("[data-diagram-core]");
      const status = diagram.querySelector<HTMLElement>("[data-diagram-status]");

      gsap.set(nodes, { autoAlpha: 0 });
      gsap.set(lines, {
        autoAlpha: 0,
        scaleY: 0,
        transformOrigin: "50% 100%",
      });
      gsap.set(core, { autoAlpha: 0, scale: 0.76, rotation: -3 });
      gsap.set(status, { autoAlpha: 0, y: 10 });

      const offsets = [
        { x: -34, y: -20 },
        { x: 34, y: -18 },
        { x: -32, y: 22 },
        { x: 34, y: 22 },
      ];

      nodes.forEach((node, index) => {
        gsap.set(node, {
          ...(offsets[index] ?? { x: 0, y: 16 }),
          scale: 0.94,
        });
      });

      diagramTl
        .to(
          core,
          {
            autoAlpha: 1,
            scale: 1,
            rotation: 0,
            duration: 0.62,
            ease: "back.out(1.5)",
          },
          0.04,
        )
        .to(
          lines,
          {
            autoAlpha: 1,
            scaleY: 1,
            duration: 0.52,
            stagger: 0.055,
            ease: "power2.out",
          },
          0.18,
        )
        .to(
          nodes,
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.56,
            stagger: 0.07,
            ease: "back.out(1.35)",
          },
          0.2,
        )
        .to(status, { autoAlpha: 1, y: 0, duration: 0.34 }, 0.62)
        .call(() => {
          addIdleAnimation(
            core
              ? gsap.to(core, {
                  scale: 1.022,
                  duration: 2.2,
                  repeat: -1,
                  yoyo: true,
                  ease: "sine.inOut",
                })
              : null,
          );

          addIdleAnimation(
            gsap.to(nodes, {
              y: (index) => (index % 2 === 0 ? -4 : 4),
              duration: 2.6,
              repeat: -1,
              yoyo: true,
              stagger: {
                each: 0.16,
                from: "random",
              },
              ease: "sine.inOut",
            }),
          );

          addIdleAnimation(
            gsap.to(lines, {
              opacity: 0.42,
              duration: 1.45,
              repeat: -1,
              yoyo: true,
              stagger: 0.12,
              ease: "sine.inOut",
            }),
          );
        });
    }

    if (type === "workflow") {
      const steps = diagram.querySelectorAll<HTMLElement>("[data-diagram-step]");
      const path = diagram.querySelector<HTMLElement>("[data-diagram-path]");
      const runner = diagram.querySelector<HTMLElement>("[data-diagram-runner]");
      const caption = diagram.querySelector<HTMLElement>("[data-diagram-caption]");
      const status = diagram.querySelector<HTMLElement>("[data-diagram-status]");

      gsap.set(steps, { autoAlpha: 0, y: 18, scale: 0.96 });
      gsap.set(path, { scaleX: 0, transformOrigin: "0% 50%" });
      gsap.set(runner, { autoAlpha: 0, left: "10%", scale: 0.7 });
      gsap.set([caption, status], { autoAlpha: 0, y: 10 });

      diagramTl
        .to(path, { scaleX: 1, duration: 0.7, ease: "power2.inOut" }, 0.04)
        .to(
          steps,
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.46,
            stagger: 0.09,
            ease: "back.out(1.25)",
          },
          0.12,
        )
        .to(
          runner,
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.22,
          },
          0.3,
        )
        .to(
          runner,
          {
            left: "88%",
            duration: 1.0,
            ease: "power2.inOut",
          },
          0.34,
        )
        .to(caption, { autoAlpha: 1, y: 0, duration: 0.34 }, 0.7)
        .to(status, { autoAlpha: 1, y: 0, duration: 0.34 }, 0.92)
        .call(() => {
          if (runner) {
            const runnerLoop = gsap.timeline({
              repeat: -1,
              repeatDelay: 0.24,
            });

            runnerLoop
              .set(runner, { left: "10%", autoAlpha: 0.22, scale: 0.82 })
              .to(
                runner,
                {
                  autoAlpha: 1,
                  scale: 1,
                  duration: 0.2,
                },
                0,
              )
              .to(
                runner,
                {
                  left: "88%",
                  duration: 2.35,
                  ease: "power1.inOut",
                },
                0.08,
              )
              .to(
                runner,
                {
                  autoAlpha: 0.22,
                  scale: 0.82,
                  duration: 0.22,
                },
                2.18,
              );

            addIdleAnimation(runnerLoop);
          }

          addIdleAnimation(
            gsap.to(steps, {
              y: -3,
              duration: 1.8,
              repeat: -1,
              yoyo: true,
              stagger: 0.14,
              ease: "sine.inOut",
            }),
          );

          addIdleAnimation(
            path
              ? gsap.to(path, {
                  opacity: 0.55,
                  duration: 1.5,
                  repeat: -1,
                  yoyo: true,
                  ease: "sine.inOut",
                })
              : null,
          );
        });
    }

    if (type === "scale") {
      const bars = diagram.querySelectorAll<HTMLElement>("[data-diagram-bar]");
      const label = diagram.querySelector<HTMLElement>("[data-diagram-label]");
      const status = diagram.querySelector<HTMLElement>("[data-diagram-status]");

      gsap.set(label, { autoAlpha: 0, y: 12 });
      gsap.set(bars, {
        scaleY: 0,
        transformOrigin: "50% 100%",
        autoAlpha: 0.45,
      });
      gsap.set(status, { autoAlpha: 0, y: 10 });

      diagramTl
        .to(label, { autoAlpha: 1, y: 0, duration: 0.42 }, 0.04)
        .to(
          bars,
          {
            scaleY: 1,
            autoAlpha: 1,
            duration: 0.78,
            ease: "expo.out",
            stagger: 0.09,
          },
          0.12,
        )
        .to(
          bars,
          {
            y: -4,
            duration: 0.22,
            stagger: 0.06,
            ease: "power1.out",
          },
          0.62,
        )
        .to(
          bars,
          {
            y: 0,
            duration: 0.26,
            stagger: 0.06,
            ease: "power1.inOut",
          },
          0.78,
        )
        .to(status, { autoAlpha: 1, y: 0, duration: 0.34 }, 0.8)
        .call(() => {
          addIdleAnimation(
            gsap.to(bars, {
              scaleY: 1.035,
              duration: 1.9,
              repeat: -1,
              yoyo: true,
              stagger: {
                each: 0.11,
                from: "start",
              },
              ease: "sine.inOut",
            }),
          );

          addIdleAnimation(
            label
              ? gsap.to(label, {
                  y: -3,
                  duration: 2.4,
                  repeat: -1,
                  yoyo: true,
                  ease: "sine.inOut",
                })
              : null,
          );
        });
    }

    if (type === "ai") {
      const core = diagram.querySelector<HTMLElement>("[data-diagram-core]");
      const ring = diagram.querySelector<HTMLElement>("[data-diagram-ring]");
      const nodes = diagram.querySelectorAll<HTMLElement>("[data-diagram-node]");
      const status = diagram.querySelector<HTMLElement>("[data-diagram-status]");

      gsap.set(core, { autoAlpha: 0, scale: 0.72 });
      gsap.set(ring, { autoAlpha: 0, scale: 0.68, rotation: -28 });
      gsap.set(nodes, { autoAlpha: 0, scale: 0.72 });
      gsap.set(status, { autoAlpha: 0, y: 10 });

      diagramTl
        .to(
          core,
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.56,
            ease: "back.out(1.55)",
          },
          0.04,
        )
        .to(
          ring,
          {
            autoAlpha: 1,
            scale: 1,
            rotation: 0,
            duration: 0.76,
            ease: "expo.out",
          },
          0.1,
        )
        .to(
          nodes,
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.46,
            stagger: 0.085,
            ease: "back.out(1.4)",
          },
          0.24,
        )
        .to(status, { autoAlpha: 1, y: 0, duration: 0.34 }, 0.7)
        .call(() => {
          addIdleAnimation(
            ring
              ? gsap.to(ring, {
                  rotation: 360,
                  duration: 18,
                  repeat: -1,
                  ease: "none",
                })
              : null,
          );

          addIdleAnimation(
            core
              ? gsap.to(core, {
                  scale: 1.025,
                  duration: 2.0,
                  repeat: -1,
                  yoyo: true,
                  ease: "sine.inOut",
                })
              : null,
          );

          addIdleAnimation(
            gsap.to(nodes, {
              y: (index) => (index % 2 === 0 ? -4 : 4),
              x: (index) => (index < 2 ? 2 : -2),
              duration: 2.3,
              repeat: -1,
              yoyo: true,
              stagger: 0.13,
              ease: "sine.inOut",
            }),
          );
        });
    }

    if (type === "experience") {
      const desktop = diagram.querySelector<HTMLElement>(
        "[data-diagram-desktop]",
      );
      const mobile = diagram.querySelector<HTMLElement>(
        "[data-diagram-mobile]",
      );
      const ui = diagram.querySelectorAll<HTMLElement>("[data-diagram-ui]");
      const bridge = diagram.querySelector<HTMLElement>(
        "[data-diagram-bridge]",
      );
      const status = diagram.querySelector<HTMLElement>("[data-diagram-status]");

      gsap.set(desktop, { autoAlpha: 0, x: -30, y: 6, scale: 0.97 });
      gsap.set(mobile, { autoAlpha: 0, x: 28, y: 18, scale: 0.95 });
      gsap.set(ui, { autoAlpha: 0, y: 8, scaleX: 0.94 });
      gsap.set(bridge, { autoAlpha: 0, scale: 0.88 });
      gsap.set(status, { autoAlpha: 0, y: 10 });

      diagramTl
        .to(
          desktop,
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.58,
            ease: "power3.out",
          },
          0.04,
        )
        .to(
          mobile,
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.25)",
          },
          0.14,
        )
        .to(
          ui,
          {
            autoAlpha: 1,
            y: 0,
            scaleX: 1,
            duration: 0.34,
            stagger: 0.045,
          },
          0.28,
        )
        .to(
          bridge,
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.4,
            ease: "back.out(1.35)",
          },
          0.58,
        )
        .to(status, { autoAlpha: 1, y: 0, duration: 0.34 }, 0.72)
        .call(() => {
          addIdleAnimation(
            desktop
              ? gsap.to(desktop, {
                  y: -4,
                  duration: 2.8,
                  repeat: -1,
                  yoyo: true,
                  ease: "sine.inOut",
                })
              : null,
          );

          addIdleAnimation(
            mobile
              ? gsap.to(mobile, {
                  y: 4,
                  duration: 2.4,
                  repeat: -1,
                  yoyo: true,
                  ease: "sine.inOut",
                })
              : null,
          );

          addIdleAnimation(
            bridge
              ? gsap.to(bridge, {
                  scale: 1.025,
                  duration: 1.8,
                  repeat: -1,
                  yoyo: true,
                  ease: "sine.inOut",
                })
              : null,
          );

          addIdleAnimation(
            gsap.to(ui, {
              opacity: 0.68,
              duration: 1.45,
              repeat: -1,
              yoyo: true,
              stagger: {
                each: 0.09,
                from: "random",
              },
              ease: "sine.inOut",
            }),
          );
        });
    }

    diagramTl.call(() => {
      addIdleAnimation(
        statusDot
          ? gsap.to(statusDot, {
              scale: 1.35,
              duration: 1.15,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            })
          : null,
      );
    });

    diagramTimelineRef.current = diagramTl;

    return () => {
      contentTl.kill();
      diagramTl.kill();
      idleAnimationsRef.current.forEach((animation) => animation.kill());
      idleAnimationsRef.current = [];
    };
  }, [displayIndex]);

  const goToProblem = (index: number) => {
    const trigger = triggerRef.current;

    if (!trigger || window.innerWidth < DESKTOP_BREAKPOINT) {
      setActiveIndex(index);
      setDisplayIndex(index);
      return;
    }

    const progress = index / (problems.length - 1);
    const targetY = trigger.start + (trigger.end - trigger.start) * progress;

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  };

  const activeProblem = problems[displayIndex];
  const activeProgress = (activeIndex / (problems.length - 1)) * 100;

  return (
    <section
      className={styles.section}
      id="problems"
      ref={sectionRef}
      aria-labelledby="problems-title"
    >
      <div className={styles.shell}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>(Problems we solve)</p>

          <div className={styles.headerGrid}>
            <RevealHeading
              as="h2"
              id="problems-title"
              aria-label="We solve the problems that slow growth down."
            >
              We solve the problems that
              <span> slow growth down.</span>
            </RevealHeading>

            <p>
              From disconnected systems and manual operations to scaling,
              customer experience, and applied AI, we turn operational friction
              into clear software priorities — then bring the right mix of
              strategy, design, engineering, cloud, automation, and AI to solve
              them properly.
            </p>
          </div>
        </header>

        <div className={styles.desktopStory} ref={stageRef}>
          <aside className={styles.problemRail} aria-label="Problems">
            <div className={styles.problemRailTop}>
              <div>
                <span className={styles.problemRailEyebrow}>Business friction</span>
                <strong>Where we create leverage</strong>
              </div>

              <span className={styles.problemRailCount}>0{problems.length}</span>
            </div>

            <div className={styles.problemRailList}>
              {problems.map((problem, index) => (
                <button
                  type="button"
                  className={`${styles.problemRailButton}${
                    activeIndex === index ? ` ${styles.problemRailButtonActive}` : ""
                  }`}
                  aria-current={activeIndex === index ? "step" : undefined}
                  onClick={() => goToProblem(index)}
                  key={problem.number}
                >
                  <span className={styles.problemRailNumber}>{problem.number}</span>

                  <span className={styles.problemRailCopy}>
                    <small>{problem.kicker}</small>
                    <strong>{problem.title}</strong>
                  </span>

                  <span className={styles.problemRailArrow} aria-hidden="true">
                    ↗
                  </span>
                </button>
              ))}
            </div>

            <div className={styles.problemRailFooter}>
              <div className={styles.problemRailProgress} aria-hidden="true">
                <span style={{ height: `${Math.max(8, activeProgress)}%` }} />
              </div>

              <div>
                <span>Scroll to explore</span>
                <strong>{problems[activeIndex].number} / 0{problems.length}</strong>
              </div>
            </div>
          </aside>

          <div className={styles.activePanel} ref={contentRef}>
            <div className={styles.activePanelTop} data-story-content>
              <div className={styles.activePanelStatus}>
                <span>From problem to measurable outcome</span>
                <i aria-hidden="true" />
              </div>
            </div>

            <div className={styles.activePanelGrid}>
              <div className={styles.activeCopy}>
                <h3 className={styles.editorialTitle} data-story-content>
                  {activeProblem.title}
                </h3>

                <p className={styles.editorialLead} data-story-content>
                  {activeProblem.short}
                </p>

                <p className={styles.editorialDescription} data-story-content>
                  {activeProblem.description}
                </p>

                <div className={styles.activeApproach} data-story-content>
                  <span>Our approach</span>
                  <p>{activeProblem.approach}</p>
                </div>
              </div>

              <div className={styles.visualField} ref={visualRef}>
                <span className={styles.ghostNumber} aria-hidden="true">
                  {activeProblem.number}
                </span>

                <span className={styles.visualLabel}>solution map</span>
                <Visual type={activeProblem.visual} />
              </div>
            </div>

            <div className={styles.insightGrid}>
              <section className={styles.insightBlock} data-story-content>
                <div className={styles.insightHead}>
                  <span>01</span>
                  <div>
                    <small>What we see</small>
                    <strong>Operational signals</strong>
                  </div>
                </div>

                <div className={styles.insightList}>
                  {activeProblem.signals.map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                </div>
              </section>

              <section
                className={`${styles.insightBlock} ${styles.insightBlockResponse}`}
                data-story-content
              >
                <div className={styles.insightHead}>
                  <span>02</span>
                  <div>
                    <small>How we respond</small>
                    <strong>Our intervention</strong>
                  </div>
                </div>

                <div className={styles.insightList}>
                  {activeProblem.response.map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                </div>
              </section>

              <section className={styles.resultBlock} data-story-content>
                <div className={styles.resultBlockTop}>
                  <span>03</span>
                  <small>Resulting shift</small>
                </div>

                <p>{activeProblem.outcome}</p>

                <span className={styles.resultArrow} aria-hidden="true">
                  →
                </span>
              </section>
            </div>
          </div>
        </div>

        <div className={styles.mobileList}>
          {problems.map((problem) => (
            <article className={styles.mobileItem} key={problem.number}>
              <div className={styles.storyMeta}>
                <span>{problem.number}</span>
                <i />
                <small>{problem.kicker}</small>
              </div>

              <h3>{problem.title}</h3>

              <div className={styles.mobileSummary}>
                <p className={styles.storyLead}>{problem.short}</p>
                <p className={styles.storyDescription}>{problem.description}</p>
              </div>

              <div className={styles.mobileApproach}>
                <span>Our approach</span>
                <p>{problem.approach}</p>
              </div>

              <div className={styles.mobileVisual}>
                <span className={styles.mobileGhostNumber} aria-hidden="true">
                  {problem.number}
                </span>
                <Visual type={problem.visual} />
              </div>

              <div className={styles.mobileReadingGrid}>
                <section className={styles.readingLane}>
                  <div className={styles.readingLaneHead}>
                    <span>01</span>
                    <small>What we see</small>
                  </div>

                  <div className={styles.readingLaneList}>
                    {problem.signals.map((item) => (
                      <p key={item}>{item}</p>
                    ))}
                  </div>
                </section>

                <section className={`${styles.readingLane} ${styles.responseLane}`}>
                  <div className={styles.readingLaneHead}>
                    <span>02</span>
                    <small>How we respond</small>
                  </div>

                  <div className={styles.readingLaneList}>
                    {problem.response.map((item) => (
                      <p key={item}>{item}</p>
                    ))}
                  </div>
                </section>
              </div>

              <div className={styles.editorialOutcome}>
                <div className={styles.editorialOutcomeLabel}>
                  <span>03</span>
                  <small>Resulting shift</small>
                </div>

                <p>{problem.outcome}</p>
                <i aria-hidden="true">→</i>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
