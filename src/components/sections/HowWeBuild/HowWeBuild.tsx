"use client";

import { type KeyboardEvent, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import RevealHeading from "../../common/RevealHeading.jsx";
import styles from "./HowWeBuild.module.css";

const stages = [
  {
    number: "01",
    title: "Understand",
    category: "Discovery & alignment",
    description: "We begin every custom software development project by understanding your business goals, users, workflows, and technical constraints.",
    bullets: ["Business and product discovery", "User research and workflow mapping", "A focused software project scope"],
    reviewTitle: "A shared view of the problem",
    reviewCopy: "Research and working sessions turn assumptions into a clear brief, aligned priorities, and measurable outcomes.",
    building: ["Stakeholder and user discovery", "Current workflow mapping", "Opportunity and risk definition"],
    ready: "The team agrees on what success means and what the first release needs to achieve.",
    diagram: ["Business goals", "User needs", "Existing systems", "Clear scope"],
  },
  {
    number: "02",
    title: "Architect",
    category: "Solution design",
    description: "Our software architects turn validated requirements into a practical product experience, system design, and delivery blueprint.",
    bullets: ["UX and product architecture", "Data, APIs, cloud, and integrations", "A clear engineering roadmap"],
    reviewTitle: "The solution takes shape",
    reviewCopy: "Every important product, data, infrastructure, and integration decision is made visible before delivery begins.",
    building: ["Experience flows and interface direction", "System and integration architecture", "Delivery plan and milestones"],
    ready: "A buildable blueprint connects the business need to the right technical approach.",
    diagram: ["Experience", "Data & APIs", "Cloud", "Blueprint"],
  },
  {
    number: "03",
    title: "Build",
    category: "Engineering & execution",
    description: "Product designers and software engineers build in focused iterations with clear milestones, continuous feedback, and rigorous testing.",
    bullets: ["Web and mobile product engineering", "Backend systems and API integrations", "Tested, production-ready software"],
    reviewTitle: "Current iteration",
    reviewCopy: "Build 03 brings the core product experience and platform services together as one testable release.",
    building: ["Responsive product experience", "APIs and system integrations", "Automated quality checks"],
    ready: "A working increment is ready for your team to review, use, and improve with us.",
    diagram: ["Design", "Frontend", "Backend", "Working build"],
  },
  {
    number: "04",
    title: "Launch",
    category: "Production release",
    description: "We deploy secure, high-performance software with the cloud infrastructure, monitoring, and support needed for a confident launch.",
    bullets: ["Cloud deployment and release readiness", "Performance, security, and SEO checks", "A measured, supported rollout"],
    reviewTitle: "Ready for real users",
    reviewCopy: "Environments, monitoring, analytics, performance, and operational handover are checked as one release plan.",
    building: ["Production deployment", "Monitoring and analytics", "Release and support readiness"],
    ready: "The product launches with a stable foundation and a team prepared to operate it.",
    diagram: ["Validate", "Deploy", "Monitor", "Production"],
  },
  {
    number: "05",
    title: "Scale & improve",
    category: "Growth & optimisation",
    description: "After launch, product analytics and real user behaviour guide continuous improvements to experience, reliability, and business impact.",
    bullets: ["Product and UX optimisation", "Cloud performance and reliability", "A prioritised growth roadmap"],
    reviewTitle: "Learning from real usage",
    reviewCopy: "Product signals and business outcomes show us where the next round of effort will create the most value.",
    building: ["Experience improvements", "Performance optimisation", "The next delivery roadmap"],
    ready: "A living improvement plan keeps the product useful, resilient, and ready to grow.",
    diagram: ["Observe", "Learn", "Improve", "Next iteration"],
  },
] as const;

function StageDiagram({ labels, number }: { labels: readonly string[]; number: string }) {
  if (number === "01") {
    return (
      <svg className={styles.stageDiagram} viewBox="0 0 720 330" aria-label="Discovery inputs converge into a clear scope">
        <g className={styles.flowLines}><path d="M158 70C238 70 245 145 312 157" /><path d="M158 165H312" /><path d="M158 260C238 260 245 185 312 173" /><path d="M408 165H555" /></g>
        {[70, 165, 260].map((y, index) => <g className={styles.floatNode} key={y}><circle cx="112" cy={y} r="46" /><text x="112" y={y + 4}>{labels[index]}</text></g>)}
        <g className={styles.coreNode}><circle cx="360" cy="165" r="55" /><circle cx="360" cy="165" r="42" /><text x="360" y="160">Shared</text><text x="360" y="177">direction</text></g>
        <g className={styles.outputNode}><rect x="555" y="126" width="132" height="78" rx="18" /><circle className={styles.pulseDot} cx="568" cy="165" r="5" /><text x="621" y="160">Outcome</text><text x="621" y="178">{labels[3]}</text></g>
      </svg>
    );
  }

  if (number === "02") {
    const modules = [{ x: 64, y: 48, label: labels[0] }, { x: 496, y: 48, label: labels[1] }, { x: 64, y: 226, label: labels[2] }, { x: 496, y: 226, label: "Security" }];
    return (
      <svg className={styles.stageDiagram} viewBox="0 0 720 330" aria-label="Architecture modules connect into one solution blueprint">
        <g className={styles.flowLines}><path d="M184 80L296 137" /><path d="M536 80L424 137" /><path d="M184 258L296 193" /><path d="M536 258L424 193" /></g>
        {modules.map((module, index) => <g className={styles.floatNode} key={module.label} style={{ animationDelay: `${index * -0.7}s` }}><rect x={module.x} y={module.y} width="120" height="64" rx="16" /><text x={module.x + 60} y={module.y + 36}>{module.label}</text></g>)}
        <g className={styles.coreNode}><rect x="296" y="112" width="128" height="106" rx="26" /><text x="360" y="158">Solution</text><text x="360" y="177">architecture</text></g>
        <g className={styles.outputNode}><rect x="300" y="270" width="120" height="44" rx="14" /><circle className={styles.pulseDot} cx="314" cy="292" r="4" /><text x="360" y="296">{labels[3]}</text></g>
      </svg>
    );
  }

  if (number === "03") {
    return (
      <svg className={styles.stageDiagram} viewBox="0 0 720 330" aria-label="Design, engineering, and quality move through a delivery pipeline">
        <g className={styles.pipelineLine}><path d="M105 166H615" /></g>
        {labels.slice(0, 3).map((label, index) => { const x = 42 + index * 178; return <g className={styles.pipelineNode} key={label} style={{ animationDelay: `${index * 0.25}s` }}><rect x={x} y="121" width="132" height="90" rx="18" /><text x={x + 66} y="158">0{index + 1}</text><text x={x + 66} y="181">{label}</text></g>; })}
        <g className={styles.outputNode}><rect x="574" y="112" width="120" height="108" rx="22" /><circle className={styles.pulseDot} cx="634" cy="133" r="5" /><text x="634" y="169">Tested</text><text x="634" y="188">{labels[3]}</text></g>
      </svg>
    );
  }

  if (number === "04") {
    return (
      <svg className={styles.stageDiagram} viewBox="0 0 720 330" aria-label="A validated release moves through deployment and monitoring into production">
        <g className={styles.releasePath}><path d="M70 242C170 242 164 166 266 166S360 88 462 88H650" /></g>
        {[[100,242,labels[0]],[286,166,labels[1]],[476,88,labels[2]]].map(([x,y,label], index) => <g className={styles.releaseNode} key={String(label)} style={{ animationDelay: `${index * 0.3}s` }}><circle cx={Number(x)} cy={Number(y)} r="38" /><text x={Number(x)} y={Number(y) + 4}>{label}</text></g>)}
        <g className={styles.outputNode}><rect x="574" y="56" width="120" height="64" rx="18" /><circle className={styles.pulseDot} cx="588" cy="88" r="5" /><text x="634" y="92">{labels[3]}</text></g>
      </svg>
    );
  }

  return (
    <svg className={styles.stageDiagram} viewBox="0 0 720 330" aria-label="A continuous loop turns observation and learning into the next iteration">
      <g className={styles.loopLine}><path d="M360 48C490 48 566 98 566 165S490 282 360 282 154 232 154 165 230 48 360 48" /></g>
      {[[360,48,labels[0]],[566,165,labels[1]],[360,282,labels[2]],[154,165,"Scale"]].map(([x,y,label], index) => <g className={styles.loopNode} key={String(label)} style={{ animationDelay: `${index * -0.6}s` }}><circle cx={Number(x)} cy={Number(y)} r="40" /><text x={Number(x)} y={Number(y) + 4}>{label}</text></g>)}
      <g className={styles.coreNode}><circle cx="360" cy="165" r="56" /><text x="360" y="160">Continuous</text><text x="360" y="178">improvement</text></g>
      <g className={styles.outputNode}><rect x="300" y="142" width="120" height="46" rx="14" /><circle className={styles.pulseDot} cx="314" cy="165" r="4" /><text x="360" y="169">{labels[3]}</text></g>
    </svg>
  );
}

export default function HowWeBuild() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [previewTab, setPreviewTab] = useState<"details" | "visual">("visual");
  const active = stages[activeIndex];

  const handlePreviewTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();

    const nextTab = event.key === "Home"
      ? "details"
      : event.key === "End"
        ? "visual"
        : previewTab === "details" ? "visual" : "details";

    setPreviewTab(nextTab);
    requestAnimationFrame(() => document.getElementById(`how-we-build-${nextTab}-tab`)?.focus());
  };

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.from("[data-build-reveal]", {
        scrollTrigger: { trigger: section, start: "top 78%", once: true },
        opacity: 0,
        y: 24,
        duration: 0.75,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, section);

    return () => context.revert();
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="how-we-build"
        className={styles.section}
        ref={sectionRef}
        aria-labelledby="how-we-build-title"
      >
        <div className={styles.shell}>
          <header className={styles.header} data-build-reveal>
            <p className={styles.eyebrow}>(Software development process)</p>
            <RevealHeading as="h2" id="how-we-build-title">How We Build Reliable Software</RevealHeading>
            <p className={styles.intro}>
              From product discovery and UX design to software engineering, cloud deployment, and
              ongoing optimisation, we turn complex business needs into reliable digital products.
            </p>
          </header>

          <div className={styles.workspace} data-build-reveal>
            <div className={styles.accordion}>
              {stages.map((stage, index) => {
                const isActive = index === activeIndex;

                return (
                  <motion.article
                    layout
                    key={stage.number}
                    className={`${styles.item} ${isActive ? styles.activeItem : ""}`}
                    transition={{ layout: { duration: 0.38, ease: [0.16, 1, 0.3, 1] } }}
                  >
                    <button
                      type="button"
                      className={styles.trigger}
                      onClick={() => setActiveIndex(index)}
                      aria-expanded={isActive}
                      aria-controls={`how-we-build-${stage.number}`}
                    >
                      <span className={styles.number}>{stage.number}</span>
                      <span className={styles.title}>{stage.title}</span>
                      <span className={styles.toggle} aria-hidden="true">{isActive ? "×" : "+"}</span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          id={`how-we-build-${stage.number}`}
                          className={styles.body}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <div className={styles.bodyInner}>
                            <span
                              className={styles.progress}
                              aria-hidden="true"
                              onAnimationEnd={() => setActiveIndex((index + 1) % stages.length)}
                            />
                            <p className={styles.category}>{stage.category}</p>
                            <p className={styles.description}>{stage.description}</p>
                            <ul className={styles.bullets}>
                              {stage.bullets.map((bullet) => (
                                <li key={bullet}><span aria-hidden="true">✓</span>{bullet}</li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.article>
                );
              })}
            </div>

            <div className={styles.preview} aria-live="polite">
              <div className={styles.toolbar}>
                <div className={styles.toolbarLinks} role="tablist" aria-label="Stage workspace">
                  <button
                    type="button"
                    role="tab"
                    id="how-we-build-details-tab"
                    aria-controls="how-we-build-details"
                    aria-selected={previewTab === "details"}
                    tabIndex={previewTab === "details" ? 0 : -1}
                    className={previewTab === "details" ? styles.activeTab : ""}
                    onClick={() => setPreviewTab("details")}
                    onKeyDown={handlePreviewTabKeyDown}
                  >
                    Stage details
                  </button>
                  <button
                    type="button"
                    role="tab"
                    id="how-we-build-visual-tab"
                    aria-controls="how-we-build-visual"
                    aria-selected={previewTab === "visual"}
                    tabIndex={previewTab === "visual" ? 0 : -1}
                    className={previewTab === "visual" ? styles.activeTab : ""}
                    onClick={() => setPreviewTab("visual")}
                    onKeyDown={handlePreviewTabKeyDown}
                  >
                    Visual flow
                  </button>
                </div>
              </div>

              <AnimatePresence mode="wait" initial={false}>
                {previewTab === "visual" ? (
                  <motion.article
                    className={styles.visualReview}
                    key={`visual-${active.number}`}
                    role="tabpanel"
                    id="how-we-build-visual"
                    aria-labelledby="how-we-build-visual-tab"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.24 }}
                  >
                    <div className={styles.reviewHeading}>
                      <div><span>Customer platform · Stage {active.number}</span><h3>{active.reviewTitle}</h3></div>
                      <span className={styles.phaseBadge}>{active.title}</span>
                    </div>
                    <StageDiagram labels={active.diagram} number={active.number} />
                    <div className={styles.reviewFooter}>
                      <div><span>Current focus</span><p>{active.reviewCopy}</p></div>
                      <strong>{active.ready}</strong>
                    </div>
                  </motion.article>
                ) : (
                  <motion.article
                    className={styles.document}
                    key={`details-${active.number}`}
                    role="tabpanel"
                    id="how-we-build-details"
                    aria-labelledby="how-we-build-details-tab"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.24 }}
                  >
                    <div className={styles.documentMeta}>
                      <p><span>Project:</span> Customer platform</p>
                      <p><span>Stage:</span> {active.title} {active.number}</p>
                      <span className={styles.phaseBadge}>{active.title}</span>
                    </div>
                    <div className={styles.documentSection}>
                      <h3>{active.reviewTitle}</h3>
                      <p>{active.reviewCopy}</p>
                    </div>
                    <div className={styles.documentSection}>
                      <h3>What we are working on</h3>
                      <ul>{active.building.map((item) => <li key={item}>{item}</li>)}</ul>
                    </div>
                    <div className={styles.documentSection}>
                      <h3>Ready for review</h3>
                      <p>{active.ready}</p>
                    </div>
                  </motion.article>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
