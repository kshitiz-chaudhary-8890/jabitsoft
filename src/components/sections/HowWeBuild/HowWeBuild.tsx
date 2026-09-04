"use client";

import { useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionConfig, motion } from "motion/react";
import RevealHeading from "../../common/RevealHeading.jsx";
import styles from "./HowWeBuild.module.css";

const stages = [
  {
    number: "01",
    title: "Understand",
    shortTitle: "Understand",
    category: "Discovery",
    description:
      "We start by understanding the business problem, users, workflows, systems, growth goals, and technical constraints. Whether the need is AI automation, a mobile product, ERP, cloud modernization, a website, or digital growth, we first define what should improve and why.",
    focus: [
      "Business goals and priorities",
      "User and customer needs",
      "Existing workflows and systems",
      "Data and integration requirements",
      "Technical and growth constraints",
    ],
    decisions: [
      "Defined business problem",
      "Prioritized requirements",
      "Clear project scope",
      "Shared success criteria",
    ],
    outcome:
      "A focused problem definition and delivery direction built around the needs of the business.",
  },
  {
    number: "02",
    title: "Architect",
    shortTitle: "Architect",
    category: "Solution Design",
    description:
      "We turn the validated problem into a practical solution plan. Product experience, system architecture, data, APIs, cloud infrastructure, automation, integrations, SEO requirements, security, and scalability are designed around the type of solution being delivered.",
    focus: [
      "Product and experience architecture",
      "Data, APIs, and integrations",
      "Cloud and infrastructure design",
      "AI / automation workflow design",
      "Security, performance, and scalability",
    ],
    decisions: [
      "Solution blueprint",
      "Technical architecture",
      "Integration and data plan",
      "Delivery roadmap",
    ],
    outcome:
      "A clear solution architecture that connects business needs with the right product, engineering, cloud, automation, or growth approach.",
  },
  {
    number: "03",
    title: "Build",
    shortTitle: "Build",
    category: "Engineering & Execution",
    description:
      "We turn the solution into working output through focused iterations. This can include AI agents, mobile and web interfaces, ERP workflows, backend systems, cloud infrastructure, integrations, automation, technical SEO, and supporting digital experiences.",
    focus: [
      "Frontend and mobile development",
      "Backend and API engineering",
      "AI agents and automation",
      "ERP and system integrations",
      "Website, SEO, and performance implementation",
    ],
    decisions: [
      "Working product increments",
      "Connected systems and workflows",
      "Tested functionality",
      "Production-ready implementation",
    ],
    outcome:
      "A tested solution that brings the approved architecture and business requirements into working form.",
  },
  {
    number: "04",
    title: "Launch",
    shortTitle: "Launch",
    category: "Production Release",
    description:
      "We move the solution into real use with controlled release and validation. Deployment, cloud configuration, integrations, analytics, monitoring, SEO readiness, performance, security, and operational handover are checked before and after launch.",
    focus: [
      "Production deployment",
      "Cloud and environment setup",
      "Analytics and monitoring",
      "Performance and SEO validation",
      "Release and operational readiness",
    ],
    decisions: [
      "Stable production release",
      "Monitoring and visibility",
      "Validated integrations",
      "Launch-ready operating setup",
    ],
    outcome:
      "A controlled launch with the infrastructure, visibility, and operational readiness needed to run the solution confidently.",
  },
  {
    number: "05",
    title: "Scale & Improve",
    shortTitle: "Scale",
    category: "Growth & Optimisation",
    description:
      "After launch, real usage and business results guide the next decisions. We improve product experience, automation, cloud performance, ERP workflows, website conversion, SEO visibility, reliability, and infrastructure as the business evolves.",
    focus: [
      "Product and UX improvements",
      "AI and workflow optimisation",
      "Cloud performance and reliability",
      "SEO and digital growth optimisation",
      "Infrastructure and system scaling",
    ],
    decisions: [
      "Prioritized improvements",
      "Performance optimisation",
      "Scaled systems and infrastructure",
      "Ongoing evolution roadmap",
    ],
    outcome:
      "A clear path for continuously improving the solution as usage, customer needs, and business goals change.",
  },
] as const;

/* ------------------------------------------------------------------
   Stage diagrams
   The SVGs share one light visual language, but each explains a
   different part of the software development process.
   ------------------------------------------------------------------ */

function DiagramGuides() {
  return (
    <g className={styles.diagramGuides} data-anim="guide">
      <path d="M44 92H516M44 210H516M44 328H516" />
      <path d="M112 40V380M280 40V380M448 40V380" />
      <circle cx="280" cy="210" r="142" />
    </g>
  );
}

function UnderstandDiagram() {
  return (
    <svg viewBox="0 0 560 420" className={styles.diagram} aria-hidden="true" focusable="false">
      <DiagramGuides />

      <g className={styles.diagramNode} data-anim="input">
        <circle cx="102" cy="112" r="30" />
        <text x="102" y="116">
          Users
        </text>
      </g>
      <g className={styles.diagramNode} data-anim="input">
        <circle cx="102" cy="210" r="30" />
        <text x="102" y="214">
          Goals
        </text>
      </g>
      <g className={styles.diagramNode} data-anim="input">
        <circle cx="102" cy="308" r="30" />
        <text x="102" y="312">
          Risks
        </text>
      </g>
      <g className={styles.diagramNode} data-anim="input">
        <circle cx="226" cy="74" r="27" />
        <text x="226" y="78">
          Systems
        </text>
      </g>
      <g className={styles.diagramNode} data-anim="input">
        <circle cx="226" cy="346" r="27" />
        <text x="226" y="350">
          Workflow
        </text>
      </g>

      <path
        className={styles.diagramConnector}
        data-anim="connector"
        d="M132 112C190 112 196 166 246 190"
      />
      <path className={styles.diagramConnector} data-anim="connector" d="M132 210H238" />
      <path
        className={styles.diagramConnector}
        data-anim="connector"
        d="M132 308C190 308 196 254 246 230"
      />
      <path
        className={styles.diagramConnectorSoft}
        data-anim="connector"
        d="M226 101V150C226 174 244 184 258 192"
      />
      <path
        className={styles.diagramConnectorSoft}
        data-anim="connector"
        d="M226 319V270C226 246 244 236 258 228"
      />

      <g className={styles.diagramCore} data-anim="core">
        <circle cx="292" cy="210" r="64" />
        <circle cx="292" cy="210" r="46" className={styles.coreInner} />
        <text x="292" y="204">
          Clear
        </text>
        <text x="292" y="220">
          direction
        </text>
      </g>

      <path className={styles.diagramConnector} data-anim="connector" d="M356 210H430" />

      <g className={styles.diagramOutput} data-anim="output">
        <rect x="430" y="174" width="92" height="72" rx="20" />
        <text x="476" y="204">
          Defined
        </text>
        <text x="476" y="220">
          scope
        </text>
      </g>
    </svg>
  );
}

function ArchitectDiagram() {
  return (
    <svg viewBox="0 0 560 420" className={styles.diagram} aria-hidden="true" focusable="false">
      <DiagramGuides />

      <g className={styles.diagramModule} data-anim="input">
        <rect x="60" y="72" width="112" height="62" rx="18" />
        <text x="116" y="103">
          Experience
        </text>
      </g>
      <g className={styles.diagramModule} data-anim="input">
        <rect x="388" y="72" width="112" height="62" rx="18" />
        <text x="444" y="103">
          APIs
        </text>
      </g>
      <g className={styles.diagramModule} data-anim="input">
        <rect x="60" y="286" width="112" height="62" rx="18" />
        <text x="116" y="317">
          Data
        </text>
      </g>
      <g className={styles.diagramModule} data-anim="input">
        <rect x="388" y="286" width="112" height="62" rx="18" />
        <text x="444" y="317">
          Cloud
        </text>
      </g>

      <path className={styles.diagramConnectorSoft} data-anim="connector" d="M172 103H236" />
      <path className={styles.diagramConnectorSoft} data-anim="connector" d="M388 103H324" />
      <path className={styles.diagramConnectorSoft} data-anim="connector" d="M172 317H236" />
      <path className={styles.diagramConnectorSoft} data-anim="connector" d="M388 317H324" />

      <g className={styles.diagramCore} data-anim="core">
        <rect x="224" y="150" width="112" height="108" rx="24" />
        <text x="280" y="210">
          Architecture
        </text>
      </g>

      <path className={styles.diagramConnector} data-anim="connector" d="M280 258V306" />

      <g className={styles.diagramOutput} data-anim="output">
        <rect x="218" y="306" width="124" height="58" rx="18" />
        <text x="280" y="335">
          Blueprint
        </text>
      </g>
    </svg>
  );
}

function BuildDiagram() {
  return (
    <svg viewBox="0 0 560 420" className={styles.diagram} aria-hidden="true" focusable="false">
      <DiagramGuides />

      <g className={styles.diagramModule} data-anim="input">
        <rect x="60" y="72" width="112" height="62" rx="18" />
        <text x="116" y="103">
          Frontend
        </text>
      </g>
      <g className={styles.diagramModule} data-anim="input">
        <rect x="388" y="72" width="112" height="62" rx="18" />
        <text x="444" y="103">
          APIs
        </text>
      </g>
      <g className={styles.diagramModule} data-anim="input">
        <rect x="60" y="286" width="112" height="62" rx="18" />
        <text x="116" y="317">
          Backend
        </text>
      </g>
      <g className={styles.diagramModule} data-anim="input">
        <rect x="388" y="286" width="112" height="62" rx="18" />
        <text x="444" y="317">
          Testing
        </text>
      </g>

      <path className={styles.diagramConnectorSoft} data-anim="connector" d="M172 103H236" />
      <path className={styles.diagramConnectorSoft} data-anim="connector" d="M388 103H324" />
      <path className={styles.diagramConnectorSoft} data-anim="connector" d="M172 317H236" />
      <path className={styles.diagramConnectorSoft} data-anim="connector" d="M388 317H324" />

      <g className={styles.buildCore} data-anim="core">
        <rect x="224" y="150" width="112" height="108" rx="24" />
        <circle cx="252" cy="178" r="4" />
        <circle cx="268" cy="178" r="4" />
        <circle cx="284" cy="178" r="4" />
        <path d="M252 206H296M252 220H288M252 234H292" />
      </g>

      <path className={styles.diagramConnector} data-anim="connector" d="M280 258V306" />

      <g className={styles.diagramOutput} data-anim="output">
        <rect x="206" y="306" width="148" height="58" rx="18" />
        <text x="280" y="335">
          Working build
        </text>
      </g>
    </svg>
  );
}

function LaunchDiagram() {
  return (
    <svg viewBox="0 0 560 420" className={styles.diagram} aria-hidden="true" focusable="false">
      <DiagramGuides />

      <g className={styles.diagramModule} data-anim="input">
        <rect x="52" y="178" width="102" height="64" rx="18" />
        <text x="103" y="214">
          Build
        </text>
      </g>

      <path className={styles.diagramConnector} data-anim="connector" d="M154 210H214" />

      <g className={styles.diagramModule} data-anim="input">
        <rect x="214" y="178" width="102" height="64" rx="18" />
        <text x="265" y="214">
          Validate
        </text>
      </g>

      <path className={styles.diagramConnector} data-anim="connector" d="M316 210H376" />

      <g className={styles.diagramCore} data-anim="core">
        <rect x="376" y="164" width="120" height="92" rx="24" />
        <circle cx="436" cy="194" r="10" className={styles.launchLight} />
        <text x="436" y="224">
          Production
        </text>
      </g>

      <path
        className={styles.diagramConnectorSoft}
        data-anim="connector"
        d="M265 178V112H436V164"
      />
      <path
        className={styles.diagramConnectorSoft}
        data-anim="connector"
        d="M436 256V320H265V242"
      />

      <g className={styles.diagramNode} data-anim="input">
        <circle cx="265" cy="112" r="28" />
        <text x="265" y="116">
          Config
        </text>
      </g>
      <g className={styles.diagramNode} data-anim="output">
        <circle cx="265" cy="320" r="28" />
        <text x="265" y="324">
          Monitor
        </text>
      </g>
    </svg>
  );
}

function ScaleDiagram() {
  return (
    <svg viewBox="0 0 560 420" className={styles.diagram} aria-hidden="true" focusable="false">
      <DiagramGuides />

      <path
        className={styles.diagramConnector}
        data-anim="connector"
        d="M280 82H366C404 82 426 108 426 146V168"
      />
      <path
        className={styles.diagramConnector}
        data-anim="connector"
        d="M426 220V246C426 284 400 310 362 310H330"
      />
      <path
        className={styles.diagramConnector}
        data-anim="connector"
        d="M230 310H198C160 310 134 284 134 246V220"
      />
      <path
        className={styles.diagramConnector}
        data-anim="connector"
        d="M134 168V146C134 108 156 82 194 82H230"
      />

      <g className={styles.diagramModule} data-anim="input">
        <rect x="230" y="54" width="100" height="56" rx="18" />
        <text x="280" y="86">
          Usage
        </text>
      </g>
      <g className={styles.diagramModule} data-anim="input">
        <rect x="384" y="168" width="84" height="52" rx="17" />
        <text x="426" y="198">
          Observe
        </text>
      </g>
      <g className={styles.diagramModule} data-anim="input">
        <rect x="230" y="282" width="100" height="56" rx="18" />
        <text x="280" y="314">
          Improve
        </text>
      </g>
      <g className={styles.diagramModule} data-anim="input">
        <rect x="92" y="168" width="84" height="52" rx="17" />
        <text x="134" y="198">
          Scale
        </text>
      </g>

      <g className={styles.scaleCore} data-anim="core">
        <circle cx="280" cy="196" r="70" />
        <circle cx="280" cy="196" r="48" className={styles.coreInner} />
        <path d="M258 202L274 218L306 176" />
        <text x="280" y="244">
          Product
        </text>
      </g>

      <g className={styles.diagramOutput} data-anim="output">
        <rect x="344" y="340" width="150" height="50" rx="16" />
        <text x="419" y="369">
          Next iteration
        </text>
      </g>
      <path
        className={styles.diagramConnectorSoft}
        data-anim="connector"
        d="M330 310C354 322 374 330 392 340"
      />
    </svg>
  );
}

const diagrams = [UnderstandDiagram, ArchitectDiagram, BuildDiagram, LaunchDiagram, ScaleDiagram];

export default function HowWeBuild() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const progressTrackRef = useRef<HTMLDivElement | null>(null);
  const indicatorRef = useRef<HTMLSpanElement | null>(null);
  const stageAreaRef = useRef<HTMLDivElement | null>(null);
  const diagramWrapRef = useRef<HTMLDivElement | null>(null);

  const [selectedStage, setSelectedStage] = useState(0);
  const [displayStage, setDisplayStage] = useState(0);

  const active = stages[displayStage];
  const ActiveDiagram = diagrams[displayStage];

  const prefersReducedRef = useRef(false);
  const hasEnteredRef = useRef(false);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const transitionTlRef = useRef<ReturnType<typeof gsap.timeline> | null>(null);
  const stageInTlRef = useRef<ReturnType<typeof gsap.timeline> | null>(null);
  const selectedStageRef = useRef(0);

  useLayoutEffect(() => {
    selectedStageRef.current = selectedStage;
  }, [selectedStage]);

  const moveIndicator = (index: number, immediate = false) => {
    const track = progressTrackRef.current;
    const indicator = indicatorRef.current;
    if (!track || !indicator) return;

    const markers = track.querySelectorAll<HTMLElement>("[data-progress-marker]");
    const first = markers[0];
    const target = markers[index];
    if (!first || !target) return;

    const trackRect = track.getBoundingClientRect();
    const firstRect = first.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const startX = firstRect.left - trackRect.left + firstRect.width / 2;
    const endX = targetRect.left - trackRect.left + targetRect.width / 2;

    const vars = {
      x: startX,
      width: Math.max(0, endX - startX),
    };

    if (immediate || prefersReducedRef.current) {
      gsap.set(indicator, vars);
      return;
    }

    gsap.to(indicator, {
      ...vars,
      duration: 0.48,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  const prepareDiagram = (root: HTMLDivElement) => {
    const guides = root.querySelectorAll("[data-anim='guide']");
    const inputs = root.querySelectorAll("[data-anim='input']");
    const cores = root.querySelectorAll("[data-anim='core']");
    const outputs = root.querySelectorAll("[data-anim='output']");
    const connectors = Array.from(root.querySelectorAll<SVGPathElement>("[data-anim='connector']"));

    gsap.set(guides, { opacity: 0 });
    gsap.set(inputs, {
      opacity: 0,
      scale: 0.9,
      y: 8,
      transformOrigin: "center center",
    });
    gsap.set(cores, {
      opacity: 0,
      scale: 0.88,
      transformOrigin: "center center",
    });
    gsap.set(outputs, {
      opacity: 0,
      scale: 0.92,
      y: 8,
      transformOrigin: "center center",
    });

    connectors.forEach((path) => {
      const length = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });
    });

    return { guides, inputs, cores, outputs, connectors };
  };

  const animateStageIn = () => {
    const area = stageAreaRef.current;
    const diagram = diagramWrapRef.current;
    if (!area || !diagram) return;

    const copy = area.querySelectorAll<HTMLElement>("[data-stage-copy]");

    if (prefersReducedRef.current) {
      gsap.set(copy, { clearProps: "opacity,transform" });
      gsap.set(diagram, { clearProps: "opacity,transform" });
      gsap.set(diagram.querySelectorAll("[data-anim]"), {
        clearProps: "opacity,transform,strokeDasharray,strokeDashoffset",
      });
      return;
    }

    stageInTlRef.current?.kill();

    gsap.set(copy, { opacity: 0, y: 14 });
    gsap.set(diagram, { opacity: 0, scale: 0.985 });
    const parts = prepareDiagram(diagram);

    const tl = gsap.timeline({ defaults: { overwrite: "auto" } });
    stageInTlRef.current = tl;

    tl.to(copy, {
      opacity: 1,
      y: 0,
      duration: 0.38,
      stagger: 0.06,
      ease: "power2.out",
    })
      .to(diagram, { opacity: 1, scale: 1, duration: 0.42, ease: "power2.out" }, 0.05)
      .to(parts.guides, { opacity: 0.58, duration: 0.32, ease: "power1.out" }, 0.12)
      .to(
        parts.inputs,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.34,
          stagger: 0.055,
          ease: "power2.out",
        },
        0.18,
      )
      .to(
        parts.connectors,
        {
          strokeDashoffset: 0,
          duration: 0.46,
          stagger: 0.055,
          ease: "power2.inOut",
        },
        0.24,
      )
      .to(
        parts.cores,
        {
          opacity: 1,
          scale: 1,
          duration: 0.36,
          ease: "back.out(1.15)",
        },
        0.42,
      )
      .to(
        parts.outputs,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.34,
          ease: "power2.out",
        },
        0.58,
      );
  };

  const transitionTo = (index: number) => {
    if (index < 0 || index >= stages.length) return;
    if (index === selectedStageRef.current) return;

    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }

    selectedStageRef.current = index;
    setSelectedStage(index);
    moveIndicator(index);

    if (
      prefersReducedRef.current ||
      !hasEnteredRef.current ||
      !stageAreaRef.current ||
      !diagramWrapRef.current
    ) {
      transitionTlRef.current?.kill();
      stageInTlRef.current?.kill();
      setDisplayStage(index);
      return;
    }

    transitionTlRef.current?.kill();
    stageInTlRef.current?.kill();

    const area = stageAreaRef.current;
    const diagram = diagramWrapRef.current;
    const copy = area.querySelectorAll<HTMLElement>("[data-stage-copy]");

    const tl = gsap.timeline({
      defaults: { overwrite: "auto" },
      onComplete: () => setDisplayStage(index),
    });
    transitionTlRef.current = tl;

    tl.to(copy, {
      opacity: 0,
      y: -8,
      duration: 0.16,
      stagger: 0.018,
      ease: "power2.in",
    }).to(
      diagram,
      {
        opacity: 0,
        scale: 0.985,
        duration: 0.18,
        ease: "power2.in",
      },
      0,
    );
  };

  useLayoutEffect(() => {
    prefersReducedRef.current =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;

    const section = sectionRef.current;
    if (!section) return;

    gsap.registerPlugin(ScrollTrigger);

    if (prefersReducedRef.current) {
      hasEnteredRef.current = true;
      moveIndicator(0, true);
      return;
    }

    const ctx = gsap.context(() => {
      const headerBits = section.querySelectorAll<HTMLElement>("[data-hb-reveal]");
      const track = progressTrackRef.current;
      const steps = track?.querySelectorAll<HTMLElement>("[data-progress-step]");
      const area = stageAreaRef.current;
      const diagram = diagramWrapRef.current;
      const copy = area?.querySelectorAll<HTMLElement>("[data-stage-copy]");

      gsap.set(headerBits, { opacity: 0, y: 12 });
      if (track) gsap.set(track, { opacity: 0, y: 16 });
      if (steps) gsap.set(steps, { opacity: 0, y: 10 });
      if (copy) gsap.set(copy, { opacity: 0, y: 14 });
      if (diagram) {
        gsap.set(diagram, { opacity: 0, scale: 0.985 });
        prepareDiagram(diagram);
      }

      moveIndicator(0, true);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 74%",
          once: true,
        },
        onStart: () => {
          hasEnteredRef.current = true;
        },
      });

      tl.to(headerBits, {
        opacity: 1,
        y: 0,
        duration: 0.42,
        stagger: 0.08,
        ease: "power2.out",
      })
        .to(track, { opacity: 1, y: 0, duration: 0.42, ease: "power2.out" }, 0.12)
        .to(
          steps ?? [],
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
            stagger: 0.045,
            ease: "power2.out",
          },
          0.2,
        );

      if (copy) {
        tl.to(
          copy,
          {
            opacity: 1,
            y: 0,
            duration: 0.38,
            stagger: 0.06,
            ease: "power2.out",
          },
          0.36,
        );
      }

      if (diagram) {
        const parts = {
          guides: diagram.querySelectorAll("[data-anim='guide']"),
          inputs: diagram.querySelectorAll("[data-anim='input']"),
          cores: diagram.querySelectorAll("[data-anim='core']"),
          outputs: diagram.querySelectorAll("[data-anim='output']"),
          connectors: Array.from(
            diagram.querySelectorAll<SVGPathElement>("[data-anim='connector']"),
          ),
        };

        tl.to(diagram, { opacity: 1, scale: 1, duration: 0.42, ease: "power2.out" }, 0.42)
          .to(parts.guides, { opacity: 0.58, duration: 0.3 }, 0.46)
          .to(
            parts.inputs,
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.34,
              stagger: 0.055,
              ease: "power2.out",
            },
            0.5,
          )
          .to(
            parts.connectors,
            {
              strokeDashoffset: 0,
              duration: 0.46,
              stagger: 0.055,
              ease: "power2.inOut",
            },
            0.56,
          )
          .to(
            parts.cores,
            {
              opacity: 1,
              scale: 1,
              duration: 0.36,
              ease: "back.out(1.15)",
            },
            0.72,
          )
          .to(
            parts.outputs,
            {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.34,
              ease: "power2.out",
            },
            0.88,
          );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (!hasEnteredRef.current) return;
    animateStageIn();
  }, [displayStage]);

  useLayoutEffect(() => {
    const track = progressTrackRef.current;
    if (!track || typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(() => {
      moveIndicator(selectedStageRef.current, true);
    });
    observer.observe(track);

    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    return () => {
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
      transitionTlRef.current?.kill();
      stageInTlRef.current?.kill();
    };
  }, []);

  const handlePointerEnter = (index: number) => {
    if (!window.matchMedia?.("(hover: hover) and (pointer: fine)")?.matches) {
      return;
    }

    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => transitionTo(index), 60);
  };

  const handlePointerLeave = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
  };

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (index + 1) % stages.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (index - 1 + stages.length) % stages.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = stages.length - 1;
    }

    if (nextIndex === null) return;

    event.preventDefault();
    transitionTo(nextIndex);

    const buttons =
      progressTrackRef.current?.querySelectorAll<HTMLButtonElement>("[data-progress-step]");
    buttons?.[nextIndex]?.focus();
  };

  return (
    <MotionConfig reducedMotion="user">
      <section className={styles.section} ref={sectionRef} aria-labelledby="how-we-build-title">
        <div className={styles.shell}>
          <header className={styles.header}>
            <p className={styles.eyebrow} data-hb-reveal>
              (Our process)
            </p>
            <RevealHeading as="h2" id="how-we-build-title">
              How We Build
            </RevealHeading>
            <p className={styles.intro} data-hb-reveal>
              From discovery to production and beyond, our process turns product direction into
              reliable, scalable solutions across AI, cloud, mobile, ERP, web, and digital growth.
            </p>
          </header>

          <div
            className={styles.progressTrack}
            ref={progressTrackRef}
            role="tablist"
            aria-label="Software development process stages"
          >
            <span className={styles.progressBase} aria-hidden="true" />
            <span className={styles.progressIndicator} ref={indicatorRef} aria-hidden="true" />

            {stages.map((stage, index) => (
              <button
                key={stage.number}
                type="button"
                role="tab"
                aria-selected={index === selectedStage}
                aria-controls="how-we-build-stage"
                id={`how-we-build-tab-${stage.number}`}
                tabIndex={index === selectedStage ? 0 : -1}
                className={`${styles.progressStep} ${
                  index === selectedStage ? styles.progressStepActive : ""
                }`}
                data-progress-step
                onClick={() => transitionTo(index)}
                onMouseEnter={() => handlePointerEnter(index)}
                onMouseLeave={handlePointerLeave}
                onFocus={() => transitionTo(index)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
              >
                <motion.span
                  className={styles.progressMarker}
                  data-progress-marker
                  aria-hidden="true"
                  animate={{
                    scale: index === selectedStage ? 1.22 : 1,
                    transition: { type: "spring", stiffness: 320, damping: 18 },
                  }}
                  whileHover={
                    index === selectedStage
                      ? undefined
                      : { scale: 1.14, transition: { type: "spring", stiffness: 360, damping: 20 } }
                  }
                  whileTap={{ scale: 0.9 }}
                >
                  <span className={styles.progressNumber}>{stage.number}</span>
                </motion.span>
                <span className={styles.progressName}>{stage.shortTitle}</span>
              </button>
            ))}
          </div>

          <div
            className={styles.stageArea}
            id="how-we-build-stage"
            ref={stageAreaRef}
            role="tabpanel"
            aria-labelledby={`how-we-build-tab-${active.number}`}
            aria-live="polite"
            aria-label={`Stage ${active.number}: ${active.title}`}
          >
            <div className={styles.stageIntro} data-stage-copy>
              <div className={styles.stageHeader}>
                <span className={styles.stageNumber} aria-hidden="true">
                  {active.number}
                </span>
                <div className={styles.stageMeta}>
                  <span className={styles.stageCategory}>{active.category}</span>
                  <h3 className={styles.stageTitle}>{active.title}</h3>
                </div>
              </div>

              <p className={styles.stageDescription}>{active.description}</p>
            </div>

            <div className={styles.stageDetails} data-stage-copy>
              <div className={styles.detailGroup}>
                <span className={styles.infoLabel}>Key focus</span>
                <ul className={styles.detailList}>
                  {active.focus.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className={styles.detailGroup}>
                <span className={styles.infoLabel}>Delivers</span>
                <ul className={styles.detailList}>
                  {active.decisions.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={styles.stageOutcome} data-stage-copy>
              <span className={styles.outcomeRule} aria-hidden="true" />
              <div>
                <span className={styles.outcomeLabel}>Stage outcome</span>
                <strong className={styles.outcomeText}>{active.outcome}</strong>
              </div>
            </div>

            <div
              className={styles.stageDiagram}
              ref={diagramWrapRef}
              key={`diagram-${active.number}`}
            >
              <span className={styles.visualIndex} aria-hidden="true">
                {active.number}
              </span>
              <span className={styles.visualHalo} aria-hidden="true" />
              <ActiveDiagram />
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
