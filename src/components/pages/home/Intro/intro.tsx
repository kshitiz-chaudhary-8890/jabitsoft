"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "@/components/motion/reveal";

type CapabilityId = "ai" | "apps" | "cloud" | "growth";

type Capability = {
  id: CapabilityId;
  label: string;
  detail: string;
  title: string;
  description: string;
  cta: string;
  href: string;
};

const capabilities: Capability[] = [
  {
    id: "ai",
    label: "Agentic AI",
    detail: "Workflow automation",
    title: "Automate repeatable work with AI",
    description:
      "We connect AI agents to your tools and processes to handle defined tasks, with people in control at every step.",
    cta: "Explore AI services",
    href: "/services/agentic-ai-development",
  },
  {
    id: "apps",
    label: "Web & Mobile",
    detail: "Digital products",
    title: "Launch products people can rely on",
    description:
      "We design and build web and mobile products around real user needs, dependable engineering, and room to grow.",
    cta: "Explore web & mobile",
    href: "/services/website-solutions",
  },
  {
    id: "cloud",
    label: "Cloud & ERP",
    detail: "Connected operations",
    title: "Make your business systems work together",
    description:
      "Connect cloud platforms, ERP, and business data to reduce manual handoffs and give teams a clearer view of operations.",
    cta: "Explore cloud & ERP",
    href: "/services/erp-services",
  },
  {
    id: "growth",
    label: "SEO & Growth",
    detail: "Search visibility",
    title: "Help the right customers find you",
    description:
      "Technical SEO, useful content, and performance campaigns that bring qualified visitors to your business.",
    cta: "Explore SEO & growth",
    href: "/services/seo-digital-marketing",
  },
];

function ArrowIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h13" />
      <path d="m14 7 5 5-5 5" />
    </svg>
  );
}

export default function Intro() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<CapabilityId | "all">("all");
  const reduced = useReducedMotion();

  const visible =
    active === "all" ? capabilities : capabilities.filter((item) => item.id === active);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!reduced) {
        const intro = section.querySelectorAll("[data-ij-intro]");
        gsap.set(intro, { autoAlpha: 0, y: 28 });
        gsap
          .timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: { trigger: section, start: "top 82%", once: true },
          })
          .to(intro, { autoAlpha: 1, y: 0, duration: 0.62, stagger: 0.08 }, 0);
      }

      const headingFill = section.querySelector(".section-heading-fill");
      if (headingFill && !reduced) {
        gsap.fromTo(
          headingFill,
          { backgroundSize: "0% 100%, 100% 100%" },
          {
            backgroundSize: "100% 100%, 100% 100%",
            ease: "none",
            scrollTrigger: {
              trigger: headingFill,
              start: "top 96%",
              end: "top 30%",
              scrub: 0.7,
              invalidateOnRefresh: true,
            },
          },
        );
      }
    }, section);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={sectionRef} id="why-jabit" className="ij-section" aria-labelledby="intro-heading">
      <div className="ij-shell">
        <header className="ij-header">
          <p data-ij-intro className="cr-eyebrow">
            What you can build with JabitSoft
          </p>
          <h2 id="intro-heading" data-ij-intro>
            <span className="section-heading-fill">Build, connect and grow with technology that works</span>
          </h2>
          <p data-ij-intro className="cr-subhead ij-lede">
            From AI automation and digital products to connected systems and search growth, we help
            you plan and deliver the next step for your business.
          </p>
        </header>

        <Reveal className="ij-filters" aria-label="Filter capabilities">
          {[{ id: "all", label: "Explore all" } as const, ...capabilities].map((item) => (
            <button
              type="button"
              key={item.id}
              aria-pressed={active === item.id}
              onClick={() => setActive(item.id)}
              className={`ij-filter${active === item.id ? " ij-filter-active" : ""}`}
            >
              {item.label}
            </button>
          ))}
        </Reveal>

        <div className="ij-grid">
          <AnimatePresence mode="popLayout">
            {visible.map((item) => (
              <motion.article
                key={item.id}
                layout={!reduced}
                initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                exit={{ opacity: 0, scale: reduced ? 1 : 0.97 }}
                transition={{
                  duration: reduced ? 0 : 0.6,
                  ease: [0.22, 1, 0.36, 1],
                  layout: { duration: 0.35, delay: 0 },
                }}
                className="ij-card"
              >
                <span className="ij-card-num" aria-hidden="true">
                  {String(capabilities.indexOf(item) + 1).padStart(2, "0")}
                </span>

                <div className="ij-card-top">
                  <span className="ij-card-label">{item.label}</span>
                  <span className="ij-card-detail">{item.detail}</span>
                </div>

                <h3 className="ij-card-title">{item.title}</h3>
                <p className="ij-card-copy">{item.description}</p>

                <a href={item.href} className="ij-card-cta" data-site-button data-button-variant="primary">
                  {item.cta}
                  <ArrowIcon />
                </a>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        <Reveal as="p" className="ij-footnote">
          Different capabilities. One connected approach.
        </Reveal>
      </div>

      <style>{`
        .ij-section {
          width: 100%;
          padding: clamp(96px, 10vw, 160px) clamp(20px, 5vw, 80px);
          background: #ffffff;
          color: #141414;
          font-family: var(--font-inter), Inter, -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .ij-shell {
          width: var(--home-shell-width, min(1360px, calc(100% - 64px)));
          margin: 0 auto;
        }

        /* ---------- Header — About-page editorial split ---------- */

        .ij-header {
          display: grid;
          grid-template-columns: minmax(0, 7fr) minmax(0, 4fr);
          gap: 24px clamp(40px, 6vw, 96px);
          align-items: end;
          margin-bottom: clamp(40px, 4.5vw, 60px);
        }

        .ij-header .cr-eyebrow {
          grid-column: 1 / -1;
        }

        .ij-header h2 {
          margin: 0;
          text-wrap: balance;
        }

        .ij-lede {
          max-width: 40ch;
          margin: 0 0 0.4em;
          padding-bottom: 0.2em;
          text-wrap: pretty;
        }

        /* ---------- Filters ---------- */

        .ij-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: clamp(32px, 3.5vw, 48px);
        }

        .ij-filter {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 44px;
          padding: 0 24px;
          border: 1px solid rgba(17, 17, 17, 0.14);
          border-radius: var(--radius-pill, 999px);
          background: #ffffff;
          color: rgba(17, 17, 17, 0.66);
          font-family: inherit;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: -0.01em;
          cursor: pointer;
          box-shadow: 0 1px 2px rgba(17, 17, 17, 0.03);
          transition:
            background 0.25s ease,
            color 0.25s ease,
            border-color 0.25s ease,
            transform 0.25s ease,
            box-shadow 0.25s ease;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }

        .ij-filter:hover {
          border-color: rgba(17, 17, 17, 0.34);
          color: #141414;
          transform: translateY(-1px);
          box-shadow: 0 8px 20px -10px rgba(17, 17, 17, 0.2);
        }

        .ij-filter:active {
          transform: scale(0.96);
        }

        .ij-filter:focus-visible {
          outline: 2px solid #141414;
          outline-offset: 3px;
        }

        .ij-filter-active {
          border-color: #141414;
          background: #141414;
          color: #ffffff;
          box-shadow: 0 6px 18px -8px rgba(17, 17, 17, 0.4);
        }

        .ij-filter-active:hover {
          color: #ffffff;
          transform: translateY(-1px);
        }

        /* ---------- Capability cards ---------- */

        .ij-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px;
        }

        .ij-card {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 12px;
          min-width: 0;
          padding: clamp(26px, 2.4vw, 36px);
          border: 1px solid rgba(17, 17, 17, 0.09);
          border-radius: 22px;
          background: #ffffff;
          box-shadow: 0 1px 2px rgba(17, 17, 17, 0.03);
          transition:
            transform 0.3s ease,
            border-color 0.3s ease,
            box-shadow 0.3s ease;
        }

        /* Ghost index numeral — the card's visual anchor. */
        .ij-card-num {
          position: absolute;
          top: 14px;
          right: 22px;
          font-family: var(--font-plus-jakarta-sans), "Plus Jakarta Sans", sans-serif;
          font-size: clamp(48px, 4.4vw, 68px);
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.04em;
          color: rgba(17, 17, 17, 0.07);
          font-variant-numeric: tabular-nums;
          transition: color 0.3s ease;
        }

        .ij-card:hover .ij-card-num {
          color: rgba(17, 17, 17, 0.16);
        }

        .ij-card-top {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .ij-card-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #141414;
        }

        .ij-card-detail {
          display: inline-flex;
          align-items: center;
          padding: 4px 11px;
          border: 1px solid rgba(17, 17, 17, 0.12);
          border-radius: 999px;
          background: #fafaf9;
          font-size: 11.5px;
          font-weight: 500;
          color: rgba(17, 17, 17, 0.55);
          white-space: nowrap;
        }

        .ij-card-title {
          margin: 6px 0 0;
          max-width: 18ch;
          font-family: var(--font-plus-jakarta-sans), "Plus Jakarta Sans", sans-serif;
          font-size: clamp(23px, 2.1vw, 30px);
          font-weight: 600;
          letter-spacing: -0.024em;
          line-height: 1.15;
          color: #141414;
        }

        .ij-card-copy {
          max-width: 44ch;
          margin: 0 0 8px;
          font-size: 15.5px;
          line-height: 1.62;
          color: #67716d;
          text-wrap: pretty;
        }

        .ij-card-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          align-self: flex-start;
          min-height: 42px;
          margin-top: auto;
          padding: 0 22px;
          border-radius: var(--radius-pill, 999px);
          background: #141414;
          color: #ffffff;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: -0.01em;
          text-decoration: none;
          white-space: nowrap;
          box-shadow: 0 1px 2px rgba(17, 17, 17, 0.12);
          transition:
            background 0.25s ease,
            transform 0.25s ease,
            box-shadow 0.25s ease;
        }

        .ij-card-cta svg {
          transition: transform 0.25s ease;
        }

        .ij-card-cta:hover {
          background: #000000;
          box-shadow: 0 10px 24px -12px rgba(17, 17, 17, 0.45);
        }

        .ij-card-cta:hover svg {
          transform: translateX(3px);
        }

        .ij-card-cta:active {
          transform: scale(0.96);
        }

        .ij-card-cta:focus-visible {
          outline: 2px solid #141414;
          outline-offset: 3px;
        }

        /* ---------- Footnote ---------- */

        .ij-footnote {
          margin: clamp(36px, 4vw, 52px) 0 0;
          font-size: 14px;
          color: rgba(17, 17, 17, 0.45);
          text-align: center;
        }

        /* ---------- Responsive ---------- */

        @media (max-width: 900px) {
          .ij-header {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .ij-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 680px) {
          .ij-section {
            padding: 78px 0;
          }

          .ij-shell {
            width: 100%;
          }

          .ij-filters {
            gap: 8px;
          }

          .ij-filter {
            min-height: 38px;
            padding: 0 16px;
            font-size: 13px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ij-section [data-ij-intro] {
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}
