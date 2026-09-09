"use client";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";

import styles from "./HowWeBuild.module.css";

type StageKey = "discover" | "architect" | "build" | "launch" | "scale";

type Stage = {
  key: StageKey;
  number: string;
  phase: string;
  shortTitle: string;
  title: string;
  duration: string;
  summary: string;
  deliverables: string[];
  output: string;
  signal: string;
  visualLabel: string;
};

const STAGES: Stage[] = [
  {
    key: "discover",
    number: "01",
    phase: "Discovery",
    shortTitle: "Discover",
    title: "Find the leverage, not just the feature list.",
    duration: "1–2 weeks",
    summary:
      "We map the operation behind the brief: people, workflows, systems, data and the business result that matters. A broad ambition becomes a buildable first move.",
    deliverables: [
      "Stakeholder and workflow mapping",
      "Systems, data and integration audit",
      "Prioritised scope with success measures",
    ],
    output: "A shared brief with a measurable target",
    signal: "Inputs aligned",
    visualLabel:
      "Business, user and system signals converging into one prioritised scope",
  },
  {
    key: "architect",
    number: "02",
    phase: "Architecture",
    shortTitle: "Architect",
    title: "Design the system before complexity gets expensive.",
    duration: "1–3 weeks",
    summary:
      "Product, engineering, cloud and AI decisions are made together. We shape the experience, data model, integrations and infrastructure as one coherent system.",
    deliverables: [
      "Experience flows and interface direction",
      "Data, API and integration contracts",
      "Cloud, security and agent architecture",
    ],
    output: "A reviewed blueprint and delivery plan",
    signal: "System resolved",
    visualLabel:
      "A layered solution architecture connecting experience, services, intelligence and cloud",
  },
  {
    key: "build",
    number: "03",
    phase: "Engineering",
    shortTitle: "Build",
    title: "Ship working software in focused, visible cycles.",
    duration: "2-week sprints",
    summary:
      "A senior delivery pod builds the highest-value path first. Every sprint ends with tested software you can use, review and redirect — not another status presentation.",
    deliverables: [
      "Web, mobile, ERP and AI engineering",
      "Automated tests, review and continuous delivery",
      "Working product review every sprint",
    ],
    output: "A tested increment in your hands every cycle",
    signal: "Sprint shipping",
    visualLabel:
      "A delivery pipeline moving product work through plan, build, review and release",
  },
  {
    key: "launch",
    number: "04",
    phase: "Release",
    shortTitle: "Launch",
    title: "Launch with proof, observability and a way back.",
    duration: "1–2 weeks",
    summary:
      "Before release, we prove the critical paths across security, performance, accessibility and search. Production goes live with monitoring, ownership and rollback in place.",
    deliverables: [
      "Security, performance and accessibility passes",
      "Cloud deployment and observability",
      "Runbooks, training and release support",
    ],
    output: "A production release your team can operate",
    signal: "Release ready",
    visualLabel:
      "A release system connecting quality gates, observability and controlled deployment",
  },
  {
    key: "scale",
    number: "05",
    phase: "Growth",
    shortTitle: "Scale",
    title: "Turn real usage into the next compounding advantage.",
    duration: "Ongoing",
    summary:
      "After launch, evidence replaces opinion. Product, infrastructure and growth signals feed one improvement loop, so the next investment is tied to measurable impact.",
    deliverables: [
      "Product analytics and UX optimisation",
      "Cloud cost, reliability and performance tuning",
      "SEO, content and growth experiments",
    ],
    output: "A living roadmap ranked by business impact",
    signal: "Loop active",
    visualLabel:
      "A continuous measure, learn, improve and ship loop centred on business impact",
  },
];

const DELIVERY_FACTS = [
  { value: "05", label: "clear delivery stages" },
  { value: "2 weeks", label: "default sprint rhythm" },
  { value: "06", label: "specialist practices" },
  { value: "01", label: "accountable delivery lead" },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function CheckIcon() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true">
      <path d="m3.8 9.2 3.2 3.3 7.2-7.4" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M3.5 10h12M11.5 5.8 15.7 10l-4.2 4.2" />
    </svg>
  );
}

function StageDiagram({ stage }: { stage: Stage }) {
  if (stage.key === "discover") {
    return (
      <svg
        className={styles.diagram}
        viewBox="0 0 680 520"
        role="img"
        aria-label={stage.visualLabel}
      >
        <path className={styles.diagramGuide} d="M40 72H640M40 448H640" />
        <path className={styles.diagramGuide} d="M82 48V472M598 48V472" />
        <circle className={styles.diagramOrbit} cx="340" cy="260" r="124" />
        <circle className={styles.diagramOrbitFine} cx="340" cy="260" r="174" />

        <g data-diagram-node="">
          <circle className={styles.diagramNode} cx="92" cy="140" r="11" />
          <text className={styles.diagramMicro} x="118" y="136">
            BUSINESS
          </text>
          <text className={styles.diagramText} x="118" y="157">
            Outcomes
          </text>
        </g>
        <g data-diagram-node="">
          <circle className={styles.diagramNode} cx="92" cy="260" r="11" />
          <text className={styles.diagramMicro} x="118" y="256">
            PEOPLE
          </text>
          <text className={styles.diagramText} x="118" y="277">
            Workflows
          </text>
        </g>
        <g data-diagram-node="">
          <circle className={styles.diagramNode} cx="92" cy="380" r="11" />
          <text className={styles.diagramMicro} x="118" y="376">
            SYSTEMS
          </text>
          <text className={styles.diagramText} x="118" y="397">
            Constraints
          </text>
        </g>

        <path
          className={styles.diagramDraw}
          data-draw=""
          pathLength="1"
          d="M103 140C216 140 218 206 286 235"
        />
        <path
          className={styles.diagramDraw}
          data-draw=""
          pathLength="1"
          d="M103 260H268"
        />
        <path
          className={styles.diagramDraw}
          data-draw=""
          pathLength="1"
          d="M103 380C216 380 218 314 286 285"
        />

        <path className={styles.diagramDiamond} d="m340 186 82 74-82 74-82-74Z" />
        <circle className={styles.diagramNodeAccent} cx="340" cy="260" r="12" />
        <text className={styles.diagramMicroAccent} x="340" y="244" textAnchor="middle">
          PRIORITY
        </text>
        <text className={styles.diagramValue} x="340" y="286" textAnchor="middle">
          Leverage
        </text>

        <path
          className={styles.diagramDrawAccent}
          data-draw=""
          pathLength="1"
          d="M422 260H518"
        />
        <path className={styles.diagramArrow} d="m506 251 14 9-14 9" />
        <g data-diagram-node="">
          <rect
            className={styles.diagramOutput}
            x="520"
            y="218"
            width="118"
            height="84"
          />
          <text
            className={styles.diagramMicroInvert}
            x="579"
            y="250"
            textAnchor="middle"
          >
            NEXT MOVE
          </text>
          <text
            className={styles.diagramTextInvert}
            x="579"
            y="278"
            textAnchor="middle"
          >
            Scope
          </text>
        </g>
      </svg>
    );
  }

  if (stage.key === "architect") {
    return (
      <svg
        className={styles.diagram}
        viewBox="0 0 680 520"
        role="img"
        aria-label={stage.visualLabel}
      >
        <path className={styles.diagramGuide} d="M56 64H624M56 456H624" />
        <path className={styles.diagramGuide} d="M104 40V480M576 40V480" />

        <path
          className={styles.diagramDrawAccent}
          data-draw=""
          pathLength="1"
          d="M340 101V419"
        />
        <path className={styles.diagramLayer} d="M104 82H576V152H104Z" />
        <path className={styles.diagramLayer} d="M84 178H596V248H84Z" />
        <path className={styles.diagramLayerAccent} d="M64 274H616V344H64Z" />
        <path className={styles.diagramLayer} d="M104 370H576V440H104Z" />

        <g data-diagram-node="">
          <text className={styles.diagramIndex} x="130" y="124">
            01
          </text>
          <text className={styles.diagramMicro} x="182" y="112">
            EXPERIENCE
          </text>
          <text className={styles.diagramText} x="182" y="135">
            Web, mobile and workflows
          </text>
          <circle className={styles.diagramNode} cx="540" cy="117" r="9" />
        </g>
        <g data-diagram-node="">
          <text className={styles.diagramIndex} x="110" y="220">
            02
          </text>
          <text className={styles.diagramMicro} x="162" y="208">
            SERVICES
          </text>
          <text className={styles.diagramText} x="162" y="231">
            APIs, ERP and integrations
          </text>
          <path className={styles.diagramTick} d="M517 213h38" />
        </g>
        <g data-diagram-node="">
          <text className={styles.diagramIndexAccent} x="90" y="316">
            03
          </text>
          <text className={styles.diagramMicroAccent} x="142" y="304">
            INTELLIGENCE
          </text>
          <text className={styles.diagramTextStrong} x="142" y="327">
            Data, automation and agents
          </text>
          <circle className={styles.diagramNodeAccent} cx="580" cy="309" r="10" />
        </g>
        <g data-diagram-node="">
          <text className={styles.diagramIndex} x="130" y="412">
            04
          </text>
          <text className={styles.diagramMicro} x="182" y="400">
            FOUNDATION
          </text>
          <text className={styles.diagramText} x="182" y="423">
            Cloud, security and operations
          </text>
          <path className={styles.diagramTick} d="M510 405h45" />
        </g>

        <circle className={styles.diagramJunction} cx="340" cy="165" r="5" />
        <circle className={styles.diagramJunction} cx="340" cy="261" r="5" />
        <circle className={styles.diagramJunction} cx="340" cy="357" r="5" />
      </svg>
    );
  }

  if (stage.key === "build") {
    return (
      <svg
        className={styles.diagram}
        viewBox="0 0 680 520"
        role="img"
        aria-label={stage.visualLabel}
      >
        <path className={styles.diagramGuide} d="M48 80H632M48 440H632" />
        <path className={styles.diagramGuide} d="M84 48V472M596 48V472" />
        <path className={styles.diagramTrack} d="M86 260H594" />
        <path
          className={styles.diagramDrawAccent}
          data-draw=""
          pathLength="1"
          d="M86 260H594"
        />

        {[
          { x: 112, number: "01", label: "PLAN", note: "Priority" },
          { x: 264, number: "02", label: "BUILD", note: "Working code" },
          { x: 416, number: "03", label: "REVIEW", note: "Proof" },
          { x: 568, number: "04", label: "RELEASE", note: "Increment" },
        ].map((node, index) => (
          <g key={node.label} data-diagram-node="">
            <circle
              className={
                index === 3 ? styles.diagramNodeDark : styles.diagramNodeSurface
              }
              cx={node.x}
              cy="260"
              r="29"
            />
            <text
              className={
                index === 3 ? styles.diagramMicroInvert : styles.diagramMicroAccent
              }
              x={node.x}
              y="265"
              textAnchor="middle"
            >
              {node.number}
            </text>
            <text
              className={styles.diagramMicro}
              x={node.x}
              y="332"
              textAnchor="middle"
            >
              {node.label}
            </text>
            <text
              className={styles.diagramTextSmall}
              x={node.x}
              y="355"
              textAnchor="middle"
            >
              {node.note}
            </text>
          </g>
        ))}

        <path
          className={styles.diagramDraw}
          data-draw=""
          pathLength="1"
          d="M112 228C112 126 264 126 264 228"
        />
        <path
          className={styles.diagramDraw}
          data-draw=""
          pathLength="1"
          d="M264 292C264 394 416 394 416 292"
        />
        <path
          className={styles.diagramDraw}
          data-draw=""
          pathLength="1"
          d="M416 228C416 126 568 126 568 228"
        />
        <path className={styles.diagramArrow} d="m252 219 12 9-15 5" />
        <path className={styles.diagramArrow} d="m404 301 12-9-15-5" />
        <path className={styles.diagramArrow} d="m556 219 12 9-15 5" />
        <circle className={styles.diagramPulse} cx="188" cy="260" r="6" data-pulse="" />
      </svg>
    );
  }

  if (stage.key === "launch") {
    return (
      <svg
        className={styles.diagram}
        viewBox="0 0 680 520"
        role="img"
        aria-label={stage.visualLabel}
      >
        <path className={styles.diagramGuide} d="M48 72H632M48 448H632" />
        <path className={styles.diagramGuide} d="M84 48V472M596 48V472" />

        <circle className={styles.diagramOrbitFine} cx="250" cy="260" r="166" />
        <circle className={styles.diagramOrbit} cx="250" cy="260" r="116" />
        <circle className={styles.diagramCore} cx="250" cy="260" r="72" />
        <path
          className={styles.diagramDrawAccentWide}
          data-draw=""
          pathLength="1"
          d="M250 94a166 166 0 1 1-117 48"
        />
        <text className={styles.diagramMicroAccent} x="250" y="247" textAnchor="middle">
          RELEASE
        </text>
        <text className={styles.diagramValue} x="250" y="282" textAnchor="middle">
          Ready
        </text>

        {[
          { y: 145, label: "Security" },
          { y: 222, label: "Performance" },
          { y: 299, label: "Accessibility" },
          { y: 376, label: "Operations" },
        ].map((item) => (
          <g key={item.label} data-diagram-node="">
            <path className={styles.diagramStatusLine} d={`M448 ${item.y}H612`} />
            <circle className={styles.diagramCheckCircle} cx="468" cy={item.y} r="11" />
            <path className={styles.diagramCheck} d={`m462 ${item.y} 4 4 8-9`} />
            <text className={styles.diagramText} x="494" y={item.y + 5}>
              {item.label}
            </text>
          </g>
        ))}
        <path
          className={styles.diagramDraw}
          data-draw=""
          pathLength="1"
          d="M366 260H448"
        />
        <circle className={styles.diagramPulse} cx="250" cy="94" r="7" data-pulse="" />
      </svg>
    );
  }

  return (
    <svg
      className={styles.diagram}
      viewBox="0 0 680 520"
      role="img"
      aria-label={stage.visualLabel}
    >
      <path className={styles.diagramGuide} d="M48 72H632M48 448H632" />
      <path className={styles.diagramGuide} d="M84 48V472M596 48V472" />
      <circle className={styles.diagramOrbitFine} cx="340" cy="260" r="174" />
      <circle className={styles.diagramOrbit} cx="340" cy="260" r="126" />
      <path
        className={styles.diagramDrawAccentWide}
        data-draw=""
        pathLength="1"
        d="M340 86a174 174 0 0 1 168 130"
      />
      <path
        className={styles.diagramDrawAccentWide}
        data-draw=""
        pathLength="1"
        d="M514 260a174 174 0 0 1-130 168"
      />
      <path
        className={styles.diagramDrawAccentWide}
        data-draw=""
        pathLength="1"
        d="M340 434a174 174 0 0 1-168-130"
      />
      <path
        className={styles.diagramDrawAccentWide}
        data-draw=""
        pathLength="1"
        d="M166 260A174 174 0 0 1 296 92"
      />
      <path className={styles.diagramArrow} d="m499 201 9 15 7-17" />
      <path className={styles.diagramArrow} d="m399 419-15 9 17 7" />
      <path className={styles.diagramArrow} d="m181 319-9-15-7 17" />
      <path className={styles.diagramArrow} d="m281 101 15-9-17-7" />

      {[
        { x: 340, y: 86, label: "MEASURE" },
        { x: 514, y: 260, label: "LEARN" },
        { x: 340, y: 434, label: "IMPROVE" },
        { x: 166, y: 260, label: "SHIP" },
      ].map((item) => (
        <g key={item.label} data-diagram-node="">
          <rect
            className={styles.diagramLabelPlate}
            x={item.x - 51}
            y={item.y - 20}
            width="102"
            height="40"
          />
          <text
            className={styles.diagramMicroAccent}
            x={item.x}
            y={item.y + 4}
            textAnchor="middle"
          >
            {item.label}
          </text>
        </g>
      ))}

      <circle className={styles.diagramNodeDark} cx="340" cy="260" r="76" />
      <text className={styles.diagramMicroInvert} x="340" y="247" textAnchor="middle">
        BUSINESS
      </text>
      <text
        className={styles.diagramTextInvertLarge}
        x="340"
        y="282"
        textAnchor="middle"
      >
        Impact
      </text>
      <circle className={styles.diagramPulse} cx="466" cy="260" r="7" data-pulse="" />
    </svg>
  );
}

export default function HowWeBuild() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const ctaRef = useRef<HTMLAnchorElement | null>(null);
  const stageRefs = useRef<Array<HTMLElement | null>>([]);
  const processTriggerRef = useRef<ReturnType<typeof ScrollTrigger.create> | null>(
    null,
  );
  const activeStageRef = useRef(0);
  const [activeStage, setActiveStage] = useState(0);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.registerPlugin(ScrollTrigger);

    const media = gsap.matchMedia();
    let visibilityObserver: IntersectionObserver | null = null;

    if ("IntersectionObserver" in window) {
      visibilityObserver = new IntersectionObserver(
        ([entry]) => {
          section.dataset.inView = entry.isIntersecting ? "true" : "false";
        },
        { rootMargin: "12% 0px" },
      );
      visibilityObserver.observe(section);
    } else {
      section.dataset.inView = "true";
    }

    const updateActiveStage = (index: number) => {
      if (activeStageRef.current === index) return;
      activeStageRef.current = index;
      setActiveStage(index);
    };

    const context = gsap.context(() => {
      media.add(
        {
          reduce: "(prefers-reduced-motion: reduce)",
          desktop: "(min-width: 1024px)",
          finePointer: "(hover: hover) and (pointer: fine)",
        },
        (mediaContext) => {
          const { reduce, desktop, finePointer } = mediaContext.conditions as {
            reduce: boolean;
            desktop: boolean;
            finePointer: boolean;
          };
          const q = gsap.utils.selector(section);
          const cleanups: Array<() => void> = [];
          const scenes = q("[data-stage-scene]") as HTMLElement[];
          const drawPaths = Array.from(
            section.querySelectorAll<SVGPathElement>("[data-draw]"),
          );
          const progressFill = q("[data-process-progress]")[0] as
            HTMLElement | undefined;

          section.dataset.motionReady = "true";
          gsap.set(drawPaths, {
            strokeDasharray: 1,
            strokeDashoffset: reduce ? 0 : 1,
          });

          if (reduce) {
            gsap.set(q("[data-heading-line]"), {
              backgroundSize: "100% 100%, 100% 100%",
            });
            const closingHeadingFill = q("[data-closing-heading-fill]")[0];
            if (closingHeadingFill) {
              gsap.set(closingHeadingFill, {
                backgroundSize: "100% 100%, 100% 100%",
              });
            }
            gsap.set(scenes, { clearProps: "all" });
            if (progressFill) {
              gsap.set(progressFill, { clearProps: "transform" });
            }
          } else {
            gsap.fromTo(
              q("[data-intro-reveal]"),
              { y: 28, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.9,
                stagger: 0.09,
                ease: "power3.out",
                clearProps: "transform,opacity",
                scrollTrigger: {
                  trigger: q("[data-masthead]")[0],
                  start: "top 82%",
                  once: true,
                },
              },
            );

            const headingLines = q("[data-heading-line]");
            const headingFill = gsap.timeline({
              scrollTrigger: {
                trigger: q("[data-heading-fill]")[0],
                start: "top 88%",
                end: "bottom 34%",
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
                index * 0.58,
              );
            });

            gsap.fromTo(
              q("[data-process-intro] > *"),
              { y: 30, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.85,
                stagger: 0.1,
                ease: "power3.out",
                clearProps: "transform,opacity",
                scrollTrigger: {
                  trigger: q("[data-process-intro]")[0],
                  start: "top 84%",
                  once: true,
                },
              },
            );

            gsap.fromTo(
              q("[data-closing] > *"),
              { y: 30, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.85,
                stagger: 0.08,
                ease: "power3.out",
                clearProps: "transform,opacity",
                scrollTrigger: {
                  trigger: q("[data-closing]")[0],
                  start: "top 84%",
                  once: true,
                },
              },
            );

            const closingHeadingFill = q("[data-closing-heading-fill]")[0];
            if (closingHeadingFill) {
              gsap.fromTo(
                closingHeadingFill,
                { backgroundSize: "100% 100%, 0% 100%" },
                {
                  backgroundSize: "100% 100%, 100% 100%",
                  ease: "none",
                  scrollTrigger: {
                    trigger: closingHeadingFill,
                    start: "top 92%",
                    end: "top 42%",
                    scrub: 0.75,
                    invalidateOnRefresh: true,
                  },
                },
              );
            }
          }

          if (desktop && !reduce) {
            const frame = q("[data-process-frame]")[0] as HTMLElement | undefined;

            if (frame && scenes.length && progressFill) {
              const pieces = q("[data-stage-piece]");
              gsap.set(scenes, { autoAlpha: 0 });
              gsap.set(scenes[0], { autoAlpha: 1 });
              gsap.set(progressFill, { scaleY: 0, transformOrigin: "top center" });

              const timeline = gsap.timeline({
                defaults: { ease: "none" },
                scrollTrigger: {
                  trigger: frame,
                  start: "top top+=24",
                  end: () => `+=${Math.max(3200, window.innerHeight * 4.35)}`,
                  pin: true,
                  scrub: 1.05,
                  anticipatePin: 1,
                  invalidateOnRefresh: true,
                  onUpdate: (self) => {
                    const index = Math.min(
                      STAGES.length - 1,
                      Math.max(0, Math.round(self.progress * (STAGES.length - 1))),
                    );
                    updateActiveStage(index);
                  },
                  onLeaveBack: () => updateActiveStage(0),
                  onLeave: () => updateActiveStage(STAGES.length - 1),
                },
              });

              timeline.to(
                progressFill,
                { scaleY: 1, duration: STAGES.length, ease: "none" },
                0,
              );
              timeline.to(
                scenes[0].querySelectorAll("[data-draw]"),
                {
                  strokeDashoffset: 0,
                  duration: 0.72,
                  stagger: 0.06,
                  ease: "power2.out",
                },
                0.08,
              );
              timeline.fromTo(
                scenes[0].querySelectorAll("[data-diagram-node]"),
                { opacity: 0, y: 10 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.5,
                  stagger: 0.04,
                  ease: "power3.out",
                },
                0.12,
              );

              for (let index = 1; index < scenes.length; index += 1) {
                const previous = scenes[index - 1];
                const current = scenes[index];
                const at = index;

                timeline.to(
                  previous.querySelectorAll("[data-stage-piece]"),
                  {
                    y: -20,
                    opacity: 0,
                    duration: 0.36,
                    stagger: 0.018,
                    ease: "power2.inOut",
                  },
                  at - 0.22,
                );
                timeline.to(
                  previous,
                  {
                    autoAlpha: 0,
                    duration: 0.18,
                    ease: "none",
                  },
                  at + 0.01,
                );
                timeline.fromTo(
                  current,
                  { autoAlpha: 0 },
                  {
                    autoAlpha: 1,
                    duration: 0.22,
                    ease: "none",
                  },
                  at + 0.03,
                );
                timeline.fromTo(
                  current.querySelector("[data-stage-visual]"),
                  { x: 20, opacity: 0 },
                  {
                    x: 0,
                    opacity: 1,
                    duration: 0.62,
                    ease: "power2.out",
                  },
                  at + 0.06,
                );
                timeline.fromTo(
                  current.querySelectorAll("[data-copy-reveal]"),
                  { y: 24, opacity: 0 },
                  {
                    y: 0,
                    opacity: 1,
                    duration: 0.58,
                    stagger: 0.045,
                    ease: "power2.out",
                  },
                  at + 0.1,
                );
                timeline.to(
                  current.querySelectorAll("[data-draw]"),
                  {
                    strokeDashoffset: 0,
                    duration: 0.72,
                    stagger: 0.04,
                    ease: "power2.inOut",
                  },
                  at + 0.1,
                );
                timeline.fromTo(
                  current.querySelectorAll("[data-diagram-node]"),
                  { opacity: 0, y: 10 },
                  {
                    opacity: 1,
                    y: 0,
                    duration: 0.56,
                    stagger: 0.03,
                    ease: "power2.out",
                  },
                  at + 0.16,
                );
              }

              processTriggerRef.current = timeline.scrollTrigger ?? null;

              cleanups.push(() => {
                processTriggerRef.current = null;
                gsap.set(scenes, { clearProps: "opacity,visibility,transform" });
                gsap.set(pieces, { clearProps: "opacity,transform" });
                gsap.set(progressFill, { clearProps: "transform" });
              });
            }
          } else {
            gsap.set(scenes, { clearProps: "opacity,visibility,transform" });
            if (progressFill) {
              gsap.set(progressFill, { clearProps: "transform" });
            }

            if (!reduce) {
              ScrollTrigger.batch(scenes, {
                start: "top 84%",
                onEnter: (batch) => {
                  batch.forEach((item) => {
                    const scene = item as HTMLElement;
                    const index = Number(scene.dataset.stageIndex ?? 0);
                    updateActiveStage(index);

                    const reveal = gsap.timeline();
                    reveal.fromTo(
                      scene.querySelectorAll("[data-mobile-reveal]"),
                      { y: 28, opacity: 0 },
                      {
                        y: 0,
                        opacity: 1,
                        duration: 0.78,
                        stagger: 0.045,
                        ease: "power2.out",
                        clearProps: "transform,opacity",
                      },
                    );
                    reveal.to(
                      scene.querySelectorAll("[data-draw]"),
                      {
                        strokeDashoffset: 0,
                        duration: 0.78,
                        stagger: 0.04,
                        ease: "power2.inOut",
                      },
                      0.08,
                    );
                  });
                },
                onEnterBack: (batch) => {
                  const first = batch[0] as HTMLElement | undefined;
                  if (first) updateActiveStage(Number(first.dataset.stageIndex ?? 0));
                },
              });
            }
          }

          const cta = ctaRef.current;
          if (cta && finePointer && !reduce) {
            const xTo = gsap.quickTo(cta, "x", {
              duration: 0.42,
              ease: "power3.out",
            });
            const yTo = gsap.quickTo(cta, "y", {
              duration: 0.42,
              ease: "power3.out",
            });
            let bounds: DOMRect | null = null;

            const onEnter = () => {
              bounds = cta.getBoundingClientRect();
            };
            const onMove = (event: PointerEvent) => {
              if (!bounds) return;
              xTo((event.clientX - bounds.left - bounds.width / 2) * 0.1);
              yTo((event.clientY - bounds.top - bounds.height / 2) * 0.16);
            };
            const onLeave = () => {
              bounds = null;
              xTo(0);
              yTo(0);
            };

            cta.addEventListener("pointerenter", onEnter);
            cta.addEventListener("pointermove", onMove, { passive: true });
            cta.addEventListener("pointerleave", onLeave);

            cleanups.push(() => {
              cta.removeEventListener("pointerenter", onEnter);
              cta.removeEventListener("pointermove", onMove);
              cta.removeEventListener("pointerleave", onLeave);
              gsap.set(cta, { clearProps: "transform" });
            });
          }

          return () => cleanups.forEach((cleanup) => cleanup());
        },
      );
    }, section);

    return () => {
      visibilityObserver?.disconnect();
      processTriggerRef.current = null;
      media.revert();
      context.revert();
      delete section.dataset.motionReady;
      delete section.dataset.inView;
    };
  }, []);

  const goToStage = (index: number) => {
    const trigger = processTriggerRef.current;
    activeStageRef.current = index;
    setActiveStage(index);

    if (trigger) {
      const progress = index / (STAGES.length - 1);
      const destination = trigger.start + (trigger.end - trigger.start) * progress;
      const scroll = ScrollTrigger.getScrollFunc(window);
      scroll(destination);
      return;
    }

    stageRefs.current[index]?.scrollIntoView({ block: "start" });
  };

  const active = STAGES[activeStage];

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="how-we-build"
        ref={sectionRef}
        className={styles.section}
        aria-labelledby="how-we-build-title"
        data-in-view="false"
      >
        <div className={styles.blueprint} data-blueprint="" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>

        <div className={styles.shell}>
          <header className={styles.masthead} data-masthead="">
            <p className={styles.eyebrow} data-intro-reveal="">
              (How we build)
            </p>

            <div className={styles.headingWrap}>
              <h2 className={styles.title} id="how-we-build-title" data-heading-fill="">
                <span className={styles.titleLine} data-heading-line="">
                  From Business Friction
                </span>
                <span className={styles.titleLine} data-heading-line="">
                  To Working Systems
                </span>
              </h2>
            </div>

            <div className={styles.mastCopy} data-intro-reveal="">
              <span className={styles.mastRule} aria-hidden="true" />
              <p>
                JabitSoft connects strategy, product, engineering, cloud and growth
                inside one accountable delivery system — so decisions become dependable
                software without handoff friction.
              </p>
              <div className={styles.mastNote}>
                <span>01</span>
                <p>
                  One senior team stays with the problem from first map to next release.
                </p>
              </div>
            </div>
          </header>

          <section className={styles.process} aria-labelledby="process-title">
            <div className={styles.processIntro} data-process-intro="">
              <div>
                <p className={styles.sectionKicker}>The delivery system</p>
                <h3 id="process-title">Five decisions. One continuous loop.</h3>
              </div>
              <p>
                Every stage resolves a different kind of risk. Scroll through the system
                to see how an initial signal becomes a product your team can operate,
                improve and scale.
              </p>
            </div>

            <div className={styles.processFrame} data-process-frame="">
              <aside className={styles.stageNav} aria-label="Delivery stages">
                <div className={styles.stageNavTop}>
                  <span>Process index</span>
                  <span>JabitSoft / 05</span>
                </div>

                <div className={styles.activeStage}>
                  <div className={styles.activeNumber} aria-hidden="true">
                    <AnimatePresence initial={false} mode="wait">
                      <motion.span
                        key={active.number}
                        initial={{ y: "72%", opacity: 0 }}
                        animate={{ y: "0%", opacity: 1 }}
                        exit={{ y: "-72%", opacity: 0 }}
                        transition={{ duration: 0.44, ease: EASE }}
                      >
                        {active.number}
                      </motion.span>
                    </AnimatePresence>
                    <small>/ 05</small>
                  </div>
                  <div className={styles.activeName} aria-live="polite">
                    <AnimatePresence initial={false} mode="wait">
                      <motion.span
                        key={active.key}
                        initial={{ y: 9, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -9, opacity: 0 }}
                        transition={{ duration: 0.38, ease: EASE }}
                      >
                        {active.shortTitle}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                </div>

                <div className={styles.navSequence}>
                  <span className={styles.navProgress} aria-hidden="true">
                    <span data-process-progress="" />
                  </span>
                  <ol>
                    {STAGES.map((stage, index) => (
                      <li key={stage.key}>
                        <button
                          type="button"
                          className={
                            index === activeStage ? styles.stageButtonActive : ""
                          }
                          onClick={() => goToStage(index)}
                          aria-current={index === activeStage ? "step" : undefined}
                          aria-controls={`build-stage-${stage.key}`}
                        >
                          <span className={styles.stageButtonDot} aria-hidden="true" />
                          <span className={styles.stageButtonText}>
                            <strong>{stage.shortTitle}</strong>
                            <small>{stage.phase}</small>
                          </span>
                          <span className={styles.stageButtonNumber}>
                            {stage.number}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ol>
                </div>

                <p className={styles.navFootnote}>
                  Strategy, design, engineering, cloud and growth stay in the same
                  feedback loop.
                </p>
              </aside>

              <div className={styles.sceneViewport}>
                {STAGES.map((stage, index) => {
                  const isActive = index === activeStage;

                  return (
                    <article
                      id={`build-stage-${stage.key}`}
                      key={stage.key}
                      ref={(node) => {
                        stageRefs.current[index] = node;
                      }}
                      className={styles.stageScene}
                      data-stage-scene=""
                      data-stage-index={index}
                      data-active={isActive ? "true" : "false"}
                      aria-labelledby={`build-stage-title-${stage.key}`}
                    >
                      <div
                        className={styles.diagramPane}
                        data-stage-piece=""
                        data-stage-visual=""
                        data-mobile-reveal=""
                      >
                        <div className={styles.diagramBar}>
                          <span>
                            <i aria-hidden="true" />
                            Delivery system map
                          </span>
                          <span>
                            {stage.number} / {stage.shortTitle}
                          </span>
                        </div>
                        <figure className={styles.diagramFigure}>
                          <StageDiagram stage={stage} />
                          <figcaption className={styles.srOnly}>
                            {stage.visualLabel}
                          </figcaption>
                        </figure>
                        <div className={styles.diagramFoot}>
                          <span>Signal / {stage.signal}</span>
                          <span>JabitSoft delivery OS</span>
                        </div>
                      </div>

                      <div
                        className={styles.stageCopy}
                        data-stage-piece=""
                        data-mobile-reveal=""
                      >
                        <div className={styles.stageMeta} data-copy-reveal="">
                          <span>
                            {stage.number} — {stage.phase}
                          </span>
                          <span>{stage.duration}</span>
                        </div>
                        <p className={styles.stageSignal} data-copy-reveal="">
                          <span aria-hidden="true" />
                          {stage.signal}
                        </p>
                        <h4 id={`build-stage-title-${stage.key}`} data-copy-reveal="">
                          {stage.title}
                        </h4>
                        <p className={styles.stageSummary} data-copy-reveal="">
                          {stage.summary}
                        </p>

                        <ul className={styles.deliverables} data-copy-reveal="">
                          {stage.deliverables.map((item) => (
                            <li key={item}>
                              <span className={styles.check} aria-hidden="true">
                                <CheckIcon />
                              </span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>

                        <div className={styles.stageOutput} data-copy-reveal="">
                          <span>Stage output</span>
                          <strong>{stage.output}</strong>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          <footer className={styles.closing} data-closing="">
            <div className={styles.closingLead}>
              <p className={styles.sectionKicker}>Your first move</p>
              <h3 data-closing-heading-fill="">
                Bring us the bottleneck. We’ll map the build.
              </h3>
            </div>

            <div className={styles.closingAction}>
              <p>
                A new product, an operation that needs automating, a cloud estate that
                needs modernising, or growth that has stalled — start with the business
                constraint.
              </p>
              <a className={styles.ctaButton} href="/contact" ref={ctaRef}>
                <span>Plan your project</span>
                <span className={styles.ctaArrow} aria-hidden="true">
                  <ArrowIcon />
                </span>
              </a>
            </div>

            <dl className={styles.factStrip}>
              {DELIVERY_FACTS.map((fact) => (
                <div className={styles.fact} key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </footer>
        </div>
      </section>
    </MotionConfig>
  );
}
