"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RevealHeading from "./common/RevealHeading.jsx";

const projects = [
  {
    name: "FlowOps",
    category: "Operations Platform",
    year: "2026",
    intro:
      "A real-time operations platform built to give teams one clear view of dispatch, capacity, tracking, and reporting.",
    build:
      "We redesigned the operational workflow around faster decision-making, connected live data sources, and reusable modules that can scale as new teams and locations are added.",
    outcome:
      "The result is a calmer operational workspace with fewer hand-offs, faster dispatch decisions, and a cleaner foundation for future automation.",
    impact: "42%",
    impactLabel: "faster dispatch",
    delivery: "12 weeks",
    stack: ["Next.js", "Node.js", "PostgreSQL", "AWS"],
    capabilities: ["Product Engineering", "Cloud", "Analytics", "Integrations"],
    tone: "rw-blue",
    visual: "operations",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1400&q=88",
  },
  {
    name: "Nexa AI",
    category: "AI Automation",
    year: "2026",
    intro:
      "An agentic AI workspace that connects business data, internal tools, and approval workflows while keeping humans in control.",
    build:
      "The platform combines reasoning, retrieval, tool execution, review states, and audit trails in one workflow so teams can automate repetitive work without losing visibility.",
    outcome:
      "Teams get faster reporting and task completion while maintaining traceability, approval controls, and a reliable path from AI output to business action.",
    impact: "3.4×",
    impactLabel: "faster reporting",
    delivery: "10 weeks",
    stack: ["LLMs", "Python", "Vector DB", "Azure"],
    capabilities: ["Agentic AI", "Automation", "Data", "Workflow Design"],
    tone: "rw-dark",
    visual: "ai",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1400&q=88",
  },
  {
    name: "CoreERP",
    category: "Business Systems",
    year: "2025",
    intro:
      "A modular ERP system connecting finance, inventory, people, reporting, and day-to-day operations across distributed teams.",
    build:
      "We structured the product around reusable business modules, role-based permissions, live reporting, and API-first integrations so the system can evolve without becoming difficult to maintain.",
    outcome:
      "Core operations now run through one connected platform with clearer ownership, more reliable data, and significantly less dependency on disconnected spreadsheets and manual reporting.",
    impact: "99.9%",
    impactLabel: "platform uptime",
    delivery: "16 weeks",
    stack: ["React", "APIs", "SQL", "Cloud"],
    capabilities: ["ERP", "Integrations", "Reporting", "DevOps"],
    tone: "rw-slate",
    visual: "erp",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=88",
  },
];

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true">
      <path d="M4 14 14 4M7 4h7v7" />
    </svg>
  );
}

function ProjectVisual({ project }) {
  return (
    <div className={`rw-visual rw-visual--${project.visual}`}>
      <div className="rw-visual__image-frame">
        <img src={project.image} alt={`${project.name} project visual`} loading="lazy" />
        <div className="rw-visual__shade" />

        <div className="rw-visual__top">
          <span>{project.category}</span>
          <b>{project.year}</b>
        </div>

        {project.visual === "operations" && (
          <div className="rw-visual__overlay rw-visual__overlay--ops">
            <div className="rw-visual__panel">
              <small>Live operations</small>
              <strong>86 active workflows</strong>
              <span>Dispatch · Capacity · Tracking</span>
            </div>
            <div className="rw-visual__mini-grid">
              <i><b>97.8%</b><span>Success</span></i>
              <i><b>12.8%</b><span>Faster</span></i>
            </div>
          </div>
        )}

        {project.visual === "ai" && (
          <div className="rw-visual__overlay rw-visual__overlay--ai">
            <div className="rw-ai-flow">
              <span className="rw-ai-node rw-ai-node--main">AI Agent</span>
              <span className="rw-ai-node rw-ai-node--a">Data</span>
              <span className="rw-ai-node rw-ai-node--b">Tools</span>
              <span className="rw-ai-node rw-ai-node--c">Review</span>
              <i className="rw-ai-edge rw-ai-edge--a" />
              <i className="rw-ai-edge rw-ai-edge--b" />
              <i className="rw-ai-edge rw-ai-edge--c" />
            </div>
            <div className="rw-visual__panel">
              <small>Automation layer</small>
              <strong>Human-approved AI workflows</strong>
              <span>Reason · Execute · Review</span>
            </div>
          </div>
        )}

        {project.visual === "erp" && (
          <div className="rw-visual__overlay rw-visual__overlay--erp">
            <div className="rw-erp-modules">
              <span>Finance</span>
              <span>Inventory</span>
              <span>People</span>
              <span>Reports</span>
            </div>
            <div className="rw-visual__panel">
              <small>Connected business system</small>
              <strong>One source of truth</strong>
              <span>Role-based · API-first · Scalable</span>
            </div>
          </div>
        )}
      </div>

      <div className="rw-visual__caption">
        <span>Selected product view</span>
        <span>{project.name} / JabitSoft</span>
      </div>
    </div>
  );
}

export default function RecentWorks() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const stackRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const stack = stackRef.current;

    if (!section || !stage || !stack) return undefined;

    const cards = gsap.utils.toArray(".recent-work-card", stack);
    if (cards.length < 2) return undefined;

    const reduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    )?.matches;

    if (reduced) return undefined;

    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add("(min-width: 681px)", () => {
      const ctx = gsap.context(() => {
        gsap.set(cards, {
          yPercent: (index) => (index === 0 ? 0 : 104),
          scale: 1,
          rotation: 0,
          autoAlpha: 1,
          zIndex: (index) => index + 1,
          transformOrigin: "50% 50%",
          force3D: true,
          willChange: "transform",
        });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: () =>
              `+=${window.innerHeight * (cards.length - 1) * 0.72}`,
            scrub: 0.55,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1.2,
            invalidateOnRefresh: true,
            fastScrollEnd: true,
          },
        });

        // Small hold so the first card sits cleanly in the viewport
        // before the next project begins moving over it.
        timeline.to({}, { duration: 0.22 });

        cards.slice(1).forEach((card, index) => {
          const currentCard = cards[index];
          const rotation = index % 2 === 0 ? -0.8 : 0.8;

          timeline
            .to(
              currentCard,
              {
                scale: 0.965,
                rotation,
                ease: "none",
                duration: 1,
              },
              index + 0.22,
            )
            .to(
              card,
              {
                yPercent: 0,
                ease: "none",
                duration: 1,
              },
              index + 0.22,
            );
        });

        timeline.to({}, { duration: 0.22 });

        const refreshFrame = requestAnimationFrame(() => {
          ScrollTrigger.sort();
          ScrollTrigger.refresh();
        });

        return () => cancelAnimationFrame(refreshFrame);
      }, stage);

      return () => ctx.revert();
    });

    return () => {
      mm.revert();
      gsap.set(cards, { clearProps: "willChange" });
    };
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="recent-works"
        id="works"
        aria-labelledby="recent-works-title"
      >
        <header className="section-title centered recent-works__head">
          <p className="recent-works__eyebrow">(Selected software projects)</p>
          <RevealHeading id="recent-works-title">Recent Works</RevealHeading>
          <p className="recent-works__subhead">
            A closer look at the platforms, products, and business systems we
            design and engineer for growing teams.
          </p>
        </header>

        <div ref={stageRef} className="recent-works__pin-stage">
          <div ref={stackRef} className="recent-works__stack">
            {projects.map((project, index) => (
            <article
              className={`recent-work-card ${project.tone}`}
              key={project.name}
            >
              <div className="rw-card__ambient" aria-hidden="true" />

              <div className="rw-card__content">
                <div className="rw-card__top">
                  <span className="rw-card__count">
                    0{index + 1} / 0{projects.length}
                  </span>

                  <span className="rw-card__category">{project.category}</span>

                  <span className="rw-card__year">
                    <small>Year</small>
                    {project.year}
                  </span>
                </div>

                <div className="rw-card__main">
                  <div className="rw-card__copy">
                    <h3>{project.name}</h3>
                    <p className="rw-card__intro">{project.intro}</p>

                    <div className="rw-card__story">
                      <div>
                        <span>What we built</span>
                        <p>{project.build}</p>
                      </div>

                      <div>
                        <span>Outcome</span>
                        <p>{project.outcome}</p>
                      </div>
                    </div>

                    <div className="rw-card__capabilities">
                      <span className="rw-card__label">Capabilities</span>
                      <div>
                        {project.capabilities.map((item) => (
                          <b key={item}>{item}</b>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="rw-card__visual-wrap">
                    <ProjectVisual project={project} />
                  </div>
                </div>

                <div className="rw-card__footer">
                  <div className="rw-card__metric">
                    <span>Impact</span>
                    <strong>{project.impact}</strong>
                    <small>{project.impactLabel}</small>
                  </div>

                  <div className="rw-card__metric">
                    <span>Delivery</span>
                    <strong>{project.delivery}</strong>
                    <small>from discovery to launch</small>
                  </div>

                  <div className="rw-card__tech">
                    <span>Tech stack</span>
                    <div>
                      {project.stack.map((item) => (
                        <b key={item}>{item}</b>
                      ))}
                    </div>
                  </div>

                  <a className="rw-card__link" href="#contact">
                    View case study
                    <ArrowUpRight />
                  </a>
                </div>
              </div>
            </article>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .recent-works,
        .recent-works * {
          box-sizing: border-box;
        }

        .recent-works {
          position: relative;
          width: 100%;
          padding: 86px 0 70px;
          overflow: visible;
          background: #ffffff;
          color: #131313;
          isolation: isolate;
        }

        .recent-works__head {
          position: relative;
          z-index: 3;
          width: min(920px, calc(100% - 48px));
          margin: 0 auto 28px;
        }

        .recent-works__eyebrow {
          margin: 0 0 12px;
          font-family: Inter, "DM Sans", -apple-system, BlinkMacSystemFont,
            sans-serif;
          font-style: normal;
          font-weight: 500;
          font-size: 15px;
          line-height: 23px;
          color: rgb(92, 92, 92);
        }

        .recent-works__head h2 {
          margin: 0;
          font-family: "Plus Jakarta Sans", Inter, sans-serif;
          font-style: normal;
          font-weight: 700;
          font-size: 50px;
          line-height: 54px;
          letter-spacing: normal;
          color: rgb(19, 19, 19);
        }

        .recent-works__subhead {
          max-width: 650px;
          margin: 14px auto 0;
          font-family: Inter, sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 1.65;
          color: #707070;
        }

        .recent-works__pin-stage {
          position: relative;
          display: grid;
          width: 100%;
          height: 100svh;
          min-height: 700px;
          place-items: center;
          overflow: hidden;
        }


        .recent-works__pin-stage {
          transform: translateZ(0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .recent-works__stack {
          transform: translateZ(0);
        }

        .recent-work-card {
          pointer-events: none;
        }

        .recent-work-card:last-child,
        .recent-work-card a,
        .recent-work-card button {
          pointer-events: auto;
        }

        .recent-works__stack {
          position: relative;
          z-index: 2;
          display: grid;
          width: min(1280px, calc(100% - 64px));
          height: min(68svh, 680px);
          max-height: calc(100svh - 120px);
          min-height: 560px;
          margin: 0 auto;
          overflow: visible;
          isolation: isolate;
        }

        .recent-works .recent-work-card {
          position: relative;
          contain: paint;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          inset: auto;
          grid-area: 1 / 1;
          display: block;
          width: 100%;
          height: 100%;
          min-height: 0;
          max-height: none;
          aspect-ratio: auto;
          margin: 0;
          padding: 0;
          gap: 0;
          align-items: stretch;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 34px;
          box-shadow:
            0 20px 42px rgba(0, 0, 0, 0.13),
            0 4px 12px rgba(0, 0, 0, 0.06);
          transform: translate3d(0, 0, 0);
          transform-origin: 50% 50%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          isolation: isolate;
        }

        .recent-work-card.rw-blue {
          background:
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(180deg, rgba(255,255,255,0.02) 1px, transparent 1px),
            radial-gradient(circle at 82% 18%, rgba(0,170,255,0.22), transparent 30%),
            linear-gradient(135deg, #111b22 0%, #172731 56%, #1d3440 100%);
          background-size: 44px 44px, 44px 44px, auto, auto;
          color: #ffffff;
        }

        .recent-work-card.rw-dark {
          background:
            radial-gradient(circle at 78% 18%, rgba(49,101,255,0.22), transparent 28%),
            linear-gradient(135deg, #0f1216 0%, #161b21 55%, #10151a 100%);
          color: #ffffff;
        }

        .recent-work-card.rw-slate {
          background:
            linear-gradient(145deg, rgba(255,255,255,0.025), transparent 42%),
            radial-gradient(circle at 80% 20%, rgba(0,170,255,0.16), transparent 31%),
            linear-gradient(135deg, #18232a 0%, #263943 55%, #1d2c34 100%);
          color: #ffffff;
        }

        .rw-card__ambient {
          position: absolute;
          z-index: -1;
          top: -180px;
          right: -100px;
          width: 520px;
          height: 520px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(0, 170, 255, 0.10) 0%,
            rgba(0, 170, 255, 0.035) 48%,
            transparent 72%
          );
          filter: none;
          pointer-events: none;
        }

        .rw-card__content {
          display: grid;
          grid-template-rows: auto minmax(0, 1fr) auto;
          width: 100%;
          height: 100%;
          padding: 28px 34px 26px;
        }

        .rw-card__top {
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 14px;
        }

        .rw-card__count {
          color: rgba(255, 255, 255, 0.57);
          font-family: Inter, sans-serif;
          font-size: 12px;
          font-weight: 600;
        }

        .rw-card__category {
          display: inline-flex;
          width: max-content;
          min-height: 31px;
          padding: 0 12px;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.13);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.07);
          color: rgba(255, 255, 255, 0.82);
          font-family: Inter, sans-serif;
          font-size: 10px;
          font-weight: 500;
        }

        .rw-card__year {
          display: flex;
          justify-self: end;
          align-items: center;
          gap: 9px;
          color: rgba(255, 255, 255, 0.9);
          font-family: Inter, sans-serif;
          font-size: 12px;
          font-weight: 600;
        }

        .rw-card__year small {
          color: rgba(255, 255, 255, 0.42);
          font-size: 9px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .rw-card__main {
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(410px, 0.85fr);
          gap: clamp(46px, 5vw, 82px);
          min-height: 0;
          padding: 30px 0 26px;
          align-items: center;
        }

        .rw-card__copy {
          min-width: 0;
        }

        .rw-card__copy h3 {
          margin: 0;
          color: #ffffff;
          font-family: "Plus Jakarta Sans", Inter, sans-serif;
          font-size: clamp(50px, 4.4vw, 66px);
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.045em;
        }

        .rw-card__intro {
          max-width: 640px;
          margin: 18px 0 0;
          color: rgba(255, 255, 255, 0.76);
          font-family: Inter, sans-serif;
          font-size: 15px;
          font-weight: 400;
          line-height: 1.72;
        }

        .rw-card__story {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          max-width: 720px;
          margin-top: 22px;
          gap: 24px;
        }

        .rw-card__story > div {
          padding-top: 15px;
          border-top: 1px solid rgba(255, 255, 255, 0.11);
        }

        .rw-card__story span,
        .rw-card__label,
        .rw-card__metric > span,
        .rw-card__tech > span {
          display: block;
          color: rgba(255, 255, 255, 0.43);
          font-family: Inter, sans-serif;
          font-size: 9px;
          font-weight: 600;
          line-height: 1.3;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .rw-card__story p {
          margin: 9px 0 0;
          color: rgba(255, 255, 255, 0.63);
          font-family: Inter, sans-serif;
          font-size: 13px;
          line-height: 1.62;
        }

        .rw-card__capabilities {
          margin-top: 24px;
        }

        .rw-card__capabilities > div {
          display: flex;
          margin-top: 10px;
          gap: 8px;
          flex-wrap: wrap;
        }

        .rw-card__capabilities b,
        .rw-card__tech b {
          display: inline-flex;
          min-height: 29px;
          padding: 0 10px;
          align-items: center;
          border: 1px solid rgba(255, 255, 255, 0.11);
          border-radius: 999px;
          color: rgba(255, 255, 255, 0.74);
          font-family: Inter, sans-serif;
          font-size: 10px;
          font-weight: 500;
        }

        .rw-card__visual-wrap {
          display: grid;
          min-width: 0;
          align-self: stretch;
          place-items: center;
        }

        .rw-visual {
          width: 100%;
          max-width: 500px;
          transition: transform 420ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        @media (hover: hover) and (pointer: fine) {
          .recent-work-card:hover .rw-visual {
            transform: translateY(-2px);
          }
        }

        .rw-visual {
          width: 100%;
          max-width: 520px;
          transition: transform 380ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        @media (hover: hover) and (pointer: fine) {
          .recent-work-card:hover .rw-visual {
            transform: translateY(-2px);
          }
        }

        .rw-visual__image-frame {
          position: relative;
          height: 390px;
          overflow: hidden;
          border-radius: 20px;
          background: #101418;
          box-shadow: 0 16px 34px rgba(0, 0, 0, 0.2);
        }

        .rw-visual__image-frame > img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.01);
        }

        .rw-visual--ai .rw-visual__image-frame > img {
          object-position: center;
        }

        .rw-visual--erp .rw-visual__image-frame > img {
          object-position: center 48%;
        }

        .rw-visual__shade {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              180deg,
              rgba(7, 11, 15, 0.08) 0%,
              rgba(7, 11, 15, 0.18) 42%,
              rgba(7, 11, 15, 0.78) 100%
            );
          pointer-events: none;
        }

        .rw-visual--ai .rw-visual__shade {
          background:
            linear-gradient(
              180deg,
              rgba(4, 8, 18, 0.12) 0%,
              rgba(4, 8, 18, 0.30) 42%,
              rgba(4, 8, 18, 0.86) 100%
            );
        }

        .rw-visual__top {
          position: absolute;
          z-index: 2;
          top: 16px;
          right: 16px;
          left: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .rw-visual__top span,
        .rw-visual__top b {
          display: inline-flex;
          min-height: 28px;
          padding: 0 10px;
          align-items: center;
          border: 1px solid rgba(255, 255, 255, 0.22);
          border-radius: 999px;
          background: rgba(9, 14, 19, 0.58);
          color: #ffffff;
          font-family: Inter, sans-serif;
          font-size: 9px;
          font-weight: 600;
        }

        .rw-visual__overlay {
          position: absolute;
          z-index: 2;
          right: 18px;
          bottom: 18px;
          left: 18px;
        }

        .rw-visual__panel {
          max-width: 320px;
          padding: 16px 17px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 15px;
          background: rgba(11, 16, 21, 0.88);
          color: #ffffff;
        }

        .rw-visual__panel small {
          display: block;
          color: rgba(255, 255, 255, 0.48);
          font-family: Inter, sans-serif;
          font-size: 8px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .rw-visual__panel strong {
          display: block;
          margin-top: 6px;
          font-family: "Plus Jakarta Sans", Inter, sans-serif;
          font-size: 16px;
          font-weight: 700;
          line-height: 1.25;
          letter-spacing: -0.025em;
        }

        .rw-visual__panel > span {
          display: block;
          margin-top: 6px;
          color: rgba(255, 255, 255, 0.57);
          font-family: Inter, sans-serif;
          font-size: 9px;
        }

        .rw-visual__overlay--ops {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 12px;
        }

        .rw-visual__mini-grid {
          display: grid;
          width: 126px;
          gap: 7px;
        }

        .rw-visual__mini-grid i {
          display: block;
          padding: 9px 10px;
          border: 1px solid rgba(255, 255, 255, 0.13);
          border-radius: 11px;
          background: rgba(11, 16, 21, 0.88);
          font-style: normal;
        }

        .rw-visual__mini-grid b {
          display: block;
          color: #ffffff;
          font-family: "Plus Jakarta Sans", Inter, sans-serif;
          font-size: 14px;
        }

        .rw-visual__mini-grid span {
          display: block;
          margin-top: 2px;
          color: rgba(255, 255, 255, 0.48);
          font-family: Inter, sans-serif;
          font-size: 8px;
        }

        .rw-visual__overlay--ai {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }

        .rw-ai-flow {
          position: relative;
          width: 210px;
          height: 96px;
          margin-left: auto;
        }

        .rw-ai-node {
          position: absolute;
          z-index: 2;
          display: grid;
          min-width: 52px;
          height: 26px;
          padding: 0 8px;
          place-items: center;
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 8px;
          background: rgba(9, 14, 22, 0.86);
          color: rgba(255, 255, 255, 0.76);
          font-family: Inter, sans-serif;
          font-size: 8px;
          font-weight: 600;
        }

        .rw-ai-node--main {
          top: 34px;
          left: 50%;
          min-width: 70px;
          transform: translateX(-50%);
          border-color: rgba(0, 170, 255, 0.50);
          background: #0c6f9d;
          color: #ffffff;
        }

        .rw-ai-node--a {
          top: 0;
          left: 2px;
        }

        .rw-ai-node--b {
          top: 0;
          right: 2px;
        }

        .rw-ai-node--c {
          right: 50%;
          bottom: 0;
          transform: translateX(50%);
        }

        .rw-ai-edge {
          position: absolute;
          z-index: 1;
          width: 1px;
          background: rgba(255, 255, 255, 0.28);
          transform-origin: top;
        }

        .rw-ai-edge--a {
          top: 23px;
          left: 33%;
          height: 34px;
          transform: rotate(-48deg);
        }

        .rw-ai-edge--b {
          top: 23px;
          right: 32%;
          height: 34px;
          transform: rotate(48deg);
        }

        .rw-ai-edge--c {
          top: 58px;
          left: 50%;
          height: 24px;
        }

        .rw-erp-modules {
          display: flex;
          margin-bottom: 12px;
          gap: 7px;
          flex-wrap: wrap;
        }

        .rw-erp-modules span {
          display: inline-flex;
          min-height: 27px;
          padding: 0 9px;
          align-items: center;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.90);
          color: #1b252b;
          font-family: Inter, sans-serif;
          font-size: 8px;
          font-weight: 600;
        }

        .rw-visual__caption {
          display: flex;
          margin-top: 10px;
          justify-content: space-between;
          gap: 16px;
          color: rgba(255, 255, 255, 0.34);
          font-family: Inter, sans-serif;
          font-size: 8px;
          text-transform: uppercase;
          letter-spacing: 0.07em;
        }

        .rw-card__footer {
          display: grid;
          grid-template-columns: 0.78fr 0.92fr 1.5fr auto;
          min-height: 88px;
          padding-top: 18px;
          align-items: end;
          gap: 30px;
          border-top: 1px solid rgba(255, 255, 255, 0.11);
        }

        .rw-card__metric strong {
          display: block;
          margin-top: 6px;
          color: #ffffff;
          font-family: "Plus Jakarta Sans", Inter, sans-serif;
          font-size: 24px;
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.04em;
        }

        .rw-card__metric small {
          display: block;
          margin-top: 5px;
          color: rgba(255, 255, 255, 0.48);
          font-family: Inter, sans-serif;
          font-size: 9px;
        }

        .rw-card__tech > div {
          display: flex;
          margin-top: 9px;
          gap: 6px;
          flex-wrap: wrap;
        }

        .rw-card__link {
          display: inline-flex;
          min-height: 44px;
          padding: 0 16px;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.08);
          color: #ffffff;
          font-family: Inter, sans-serif;
          font-size: 11px;
          font-weight: 600;
          text-decoration: none;
          transition:
            background 180ms ease,
            transform 180ms ease;
        }

        .rw-card__link:hover {
          transform: translateY(-2px);
          background: rgba(255, 255, 255, 0.13);
        }

        .rw-card__link svg {
          width: 14px;
          height: 14px;
          fill: none;
          stroke: currentColor;
          stroke-width: 1.6;
          stroke-linecap: round;
          stroke-linejoin: round;
        }


        @media (min-width: 681px) and (max-height: 850px) {
          .rw-visual__image-frame {
            height: 315px;
          }


          .recent-works {
            padding-top: 62px;
          }

          .recent-works__head {
            margin-bottom: 14px;
          }

          .recent-works__subhead {
            margin-top: 9px;
          }

          .recent-works__pin-stage {
            min-height: 620px;
          }

          .recent-works__stack {
            height: calc(100svh - 92px);
            min-height: 540px;
            max-height: 620px;
          }

          .rw-card__content {
            padding: 24px 30px 22px;
          }

          .rw-card__main {
            padding: 22px 0 18px;
          }

          .rw-card__copy h3 {
            font-size: clamp(44px, 4vw, 58px);
          }

          .rw-card__intro {
            margin-top: 12px;
            font-size: 13px;
            line-height: 1.58;
          }

          .rw-card__story {
            margin-top: 16px;
            gap: 18px;
          }

          .rw-card__story p {
            margin-top: 6px;
            font-size: 11px;
            line-height: 1.5;
          }

          .rw-card__capabilities {
            margin-top: 14px;
          }

          .rw-card__footer {
            min-height: 76px;
            padding-top: 14px;
          }

          .rw-window__body {
            min-height: 260px;
          }
        }

        @media (max-width: 1050px) {
          .recent-works__pin-stage {
            min-height: 720px;
          }

          .recent-works__stack {
            width: min(860px, calc(100% - 40px));
            height: min(72svh, 720px);
            min-height: 620px;
            margin: 0 auto;
          }

          .recent-works .recent-work-card {
            height: 100%;
            min-height: 0;
            max-height: none;
            aspect-ratio: auto;
          }

          .rw-card__main {
            grid-template-columns: 1fr;
            gap: 28px;
            padding-top: 30px;
          }

          .rw-card__visual-wrap {
            place-items: start center;
          }

          .rw-visual {
            max-width: 610px;
          }

          .rw-card__story {
            max-width: none;
          }

          .rw-card__footer {
            grid-template-columns: repeat(3, 1fr);
          }

          .rw-card__link {
            display: none;
          }
        }

        @media (max-width: 680px) {
          .recent-works {
            padding: 64px 0 82px;
          }

          .recent-works__pin-stage {
            display: block;
            height: auto;
            min-height: 0;
            overflow: visible;
          }

          .recent-works__head h2 {
            font-size: 42px;
            line-height: 46px;
          }

          .recent-works__subhead {
            padding-inline: 8px;
            font-size: 13px;
          }

          .recent-works__stack {
            display: flex;
            width: calc(100% - 24px);
            height: auto;
            min-height: 0;
            margin: 34px auto 0;
            flex-direction: column;
            gap: 24px;
          }

          .recent-works .recent-work-card {
            grid-area: auto;
            height: auto;
            min-height: 760px;
            max-height: none;
            aspect-ratio: auto;
            transform: none !important;
          }

          .rw-card__content {
            padding: 22px 20px;
          }

          .rw-card__top {
            grid-template-columns: 1fr auto;
          }

          .rw-card__category {
            grid-column: 1 / -1;
            grid-row: 2;
            width: max-content;
            margin-top: 8px;
          }

          .rw-card__year {
            grid-column: 2;
            grid-row: 1;
          }

          .rw-card__main {
            padding: 26px 0 24px;
          }

          .rw-card__copy h3 {
            font-size: 42px;
          }

          .rw-card__intro {
            font-size: 13px;
          }

          .rw-card__story {
            grid-template-columns: 1fr;
            margin-top: 22px;
            gap: 16px;
          }

          .rw-card__story p {
            font-size: 11px;
          }

          .rw-card__capabilities {
            margin-top: 18px;
          }

          .rw-visual {
            max-width: 470px;
          }

          .rw-visual__image-frame {
            height: 300px;
          }


          .rw-card__footer {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 18px;
          }

          .rw-card__tech {
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 450px) {
          .recent-works__stack {
            min-height: 0;
          }

          .rw-card__copy h3 {
            font-size: 38px;
          }

          .rw-card__capabilities b,
          .rw-card__tech b {
            min-height: 27px;
            padding-inline: 8px;
            font-size: 9px;
          }

          .rw-card__metric strong {
            font-size: 21px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .recent-works {
            display: block;
            min-height: auto;
            padding: 64px 0 90px;
            overflow: visible;
          }

          .recent-works__stack {
            display: flex;
            height: auto;
            min-height: 0;
            flex-direction: column;
            gap: 24px;
          }

          .recent-works .recent-work-card {
            height: auto;
            min-height: 680px;
          }
        }

      `}</style>
    </>
  );
}
