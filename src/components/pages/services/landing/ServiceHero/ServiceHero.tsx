"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

import { useServiceHeroReveal } from "./useServiceHeroReveal";

const HillsBackground = dynamic(() => import("@/components/three/HillsBackground/HillsBackground"), {
  ssr: false,
});

const SCOPE_WORDS = [
  "AI systems.",
  "Cloud platforms.",
  "Mobile products.",
  "Core operations.",
  "Digital growth.",
  "Web platforms.",
];

const FACTS = ["Six service lines", "One accountable team", "Design to deployment"];

function Arrow() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function ServiceHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const [scopeIndex, setScopeIndex] = useState(0);
  useServiceHeroReveal(sectionRef, shellRef);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const timer = window.setInterval(() => {
      setScopeIndex((index) => (index + 1) % SCOPE_WORDS.length);
    }, 2600);
    return () => window.clearInterval(timer);
  }, []);

  // Scroll shrink — pure function of scrollY: scales down while scrolling
  // down and restores while scrolling back up. No parallax.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return undefined;

    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const h = section.offsetHeight;
      const p = Math.min(1, y / h);
      section.style.transform = `scale(${1 - 0.06 * p})`;
      section.style.borderRadius = `${p * 28}px`;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={sectionRef} id="top" className="jabit-sehero" aria-labelledby="service-title">
      <div className="jabit-sehero__bg" aria-hidden="true">
        <HillsBackground />
      </div>
      <div className="jabit-sehero__shade" aria-hidden="true" />

      <div ref={shellRef} className="jabit-sehero__shell">
        <div className="jabit-sehero__eyebrows">
          <span className="jabit-sehero__rise">
            <span className="jabit-sehero__rise-inner">
              <p className="jabit-sehero__eyebrow-left">Our Services</p>
            </span>
          </span>
          <span className="jabit-sehero__rise">
            <span className="jabit-sehero__rise-inner">
              <p className="jabit-sehero__eyebrow-right">
                Custom software, agentic AI, cloud, mobile apps, ERP, websites and
                digital growth.
              </p>
            </span>
          </span>
        </div>

        <div className="jabit-sehero__main">
          <h1 id="service-title" className="jabit-sehero__display">
            <span className="jabit-sehero__line">
              <span className="jabit-sehero__rise-inner">Built for</span>
            </span>
            <span className="jabit-sehero__line">
              <span className="jabit-sehero__rise-inner">
                <span className="jabit-sehero__swap" key={scopeIndex}>
                  {SCOPE_WORDS[scopeIndex]}
                </span>
              </span>
            </span>
            <span className="jabit-sehero__line">
              <span className="jabit-sehero__rise-inner">Engineered around </span>
            </span>
            <span className="jabit-sehero__line">
              <span className="jabit-sehero__rise-inner">your business.</span>
            </span>
          </h1>
          <div className="jabit-sehero__side">
            <span className="jabit-sehero__rise">
              <span className="jabit-sehero__rise-inner">
                <p className="jabit-sehero__sub">
                  We pair product thinking, design and engineering to the way your business
                  actually runs. One accountable team, no hand-offs.
                </p>
              </span>
            </span>
            <div className="jabit-sehero__actions">
              <span className="jabit-sehero__rise">
                <span className="jabit-sehero__rise-inner">
                  <Link
                    href="#what-we-build"
                    data-site-button
                    data-button-variant="primary"
                  >
                    Explore what we build
                    <Arrow />
                  </Link>
                </span>
              </span>
              <span className="jabit-sehero__rise">
                <span className="jabit-sehero__rise-inner">
                  <Link
                    href="mailto:hello@jabitsoft.com?subject=New%20Project"
                    data-site-button
                    data-button-variant="secondary"
                  >
                    Talk to us
                    <Arrow />
                  </Link>
                </span>
              </span>
            </div>
          </div>
        </div>

        <ul className="jabit-sehero__strip" aria-label="Delivery facts">
          {FACTS.map((fact) => (
            <li key={fact} className="jabit-sehero__fact">
              <span className="jabit-sehero__rise">
                <span className="jabit-sehero__rise-inner">{fact}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        .jabit-sehero,
        .jabit-sehero * {
          box-sizing: border-box;
        }

        .jabit-sehero {
          position: relative;
          display: flex;
          min-height: 100vh;
          min-height: 100svh;
          overflow: hidden;
          transform-origin: center top;
          flex-direction: column;
          justify-content: center;
          background: #ffffff;
          color: #0c0f16;
          font-family: var(--font-inter), Inter, sans-serif;
          isolation: isolate;
        }

        .jabit-sehero__bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }

        .jabit-sehero__shade {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
        }

        .jabit-sehero__shell {
          position: relative;
          z-index: 2;
          width: var(--home-shell-width, min(1360px, calc(100% - 64px)));
          margin: 0 auto;
          padding-top: 112px;
          padding-bottom: 40px;
        }

        .jabit-sehero__eyebrows {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: 32px;
          align-items: start;
        }

        .jabit-sehero__eyebrow-left,
        .jabit-sehero__eyebrow-right {
          margin: 0;
          font-family: var(--font-inter), Inter, sans-serif;
          font-size: 12px;
          font-weight: 600;
          font-style: normal;
          line-height: 1.6;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--about-eyebrow-color, #0d5d45);
        }

        .jabit-sehero__eyebrow-right {
          max-width: 460px;
          margin-left: auto;
          text-align: right;
        }

        .jabit-sehero__main {
          display: grid;
          grid-template-columns: minmax(0, 1.25fr) minmax(300px, 0.75fr);
          gap: clamp(32px, 4vw, 80px);
          align-items: end;
          margin-top: clamp(20px, 3vh, 36px);
        }

        .jabit-sehero__display {
          margin: 0;
          font-family: var(--font-oswald), "Arial Narrow", sans-serif;
          font-size: clamp(48px, 5.5vw, 80px);
          font-weight: 500;
          line-height: 1.05;
          letter-spacing: -0.01em;
          text-transform: uppercase;
          text-wrap: balance;
          color: #0c0f16;
        }

        .jabit-sehero__line {
          display: block;
          overflow: hidden;
          padding-bottom: 0.08em;
          margin-bottom: -0.08em;
        }

        .jabit-sehero__line > span {
          display: block;
          will-change: transform;
        }

        /* Masked rise pieces — same cascade as home/about heroes. */
        .jabit-sehero__rise {
          display: block;
          overflow: hidden;
        }

        .jabit-sehero__rise-inner {
          display: block;
          will-change: transform;
        }

        .jabit-sehero__swap {
          display: inline-block;
          animation: jabitSeheroSwap 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform, opacity;
        }

        @keyframes jabitSeheroSwap {
          from {
            opacity: 0;
            transform: translateY(55%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .jabit-sehero__side {
          padding-bottom: 12px;
        }

        .jabit-sehero__sub {
          margin: 0;
          font-family: var(--type-font-supporting);
          font-size: clamp(22px, 2vw, 30px);
          font-weight: 500;
          line-height: 1.3;
          letter-spacing: -0.01em;
          color: #0c0f16;
          text-wrap: pretty;
        }

        .jabit-sehero__actions {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          margin-top: 30px;
        }

        .jabit-sehero__actions svg {
          width: 16px;
          height: 16px;
        }

        .jabit-sehero__actions path {
          stroke: currentColor;
          stroke-width: 1.8;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        /* Flat hero buttons — no resting or hover shadows. */
        .jabit-sehero [data-site-button][data-button-variant="primary"],
        .jabit-sehero [data-site-button][data-button-variant="primary"]:hover,
        .jabit-sehero [data-site-button][data-button-variant="secondary"],
        .jabit-sehero [data-site-button][data-button-variant="secondary"]:hover {
          box-shadow: none !important;
        }

        /* Button masks get breathing room so hover lift never clips. */
        .jabit-sehero__actions > .jabit-sehero__rise {
          padding: 4px 2px;
          margin: -4px -2px;
        }

        .jabit-sehero__strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          margin: clamp(32px, 5vh, 64px) 0 0;
          padding: 24px 0 8px;
          border-top: 1px solid rgba(12, 15, 22, 0.14);
          list-style: none;
        }

        .jabit-sehero__fact {
          color: rgba(12, 15, 22, 0.72);
          font-family: var(--type-font-body);
          font-size: var(--type-body-size);
          font-weight: 500;
          white-space: nowrap;
        }

        /* ---------- Responsive: small laptop ---------- */
        @media (max-width: 1280px) {
          .jabit-sehero__shell {
            padding-top: 104px;
          }

          .jabit-sehero__main {
            gap: clamp(32px, 4vw, 64px);
          }
        }

        /* ---------- Responsive: tablet (stack to one column) ---------- */
        @media (max-width: 1024px) {
          .jabit-sehero__shell {
            padding-top: 112px;
          }

          .jabit-sehero__eyebrows {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .jabit-sehero__eyebrow-right {
            max-width: 60ch;
            margin-left: 0;
            text-align: left;
          }

          .jabit-sehero__main {
            grid-template-columns: 1fr;
            align-items: start;
            gap: 28px;
          }

          .jabit-sehero__display {
            font-size: clamp(46px, 7vw, 76px);
          }

          .jabit-sehero__sub {
            font-size: clamp(19px, 2.4vw, 24px);
          }

          .jabit-sehero__side {
            padding-bottom: 0;
          }

          .jabit-sehero__actions {
            flex-direction: row;
            flex-wrap: nowrap;
            gap: 12px;
          }

          .jabit-sehero__actions > .jabit-sehero__rise {
            flex: 0 0 auto;
          }

          .jabit-sehero__actions [data-site-button] {
            width: auto;
            white-space: nowrap;
          }

          .jabit-sehero__strip {
            flex-wrap: wrap;
            justify-content: flex-start;
            gap: 14px 28px;
          }
        }

        /* ---------- Responsive: large phones / small tablets ---------- */
        @media (max-width: 768px) {
          .jabit-sehero__shell {
            padding-top: 108px;
          }

          .jabit-sehero__main {
            gap: 24px;
            margin-top: 24px;
          }

          .jabit-sehero__display {
            font-size: clamp(42px, 9vw, 64px);
          }

          .jabit-sehero__sub {
            font-size: 19px;
          }
        }

        /* ---------- Responsive: phones ---------- */
        @media (max-width: 640px) {
          .jabit-sehero {
            justify-content: center;
            min-height: 75vh;
            min-height: 75svh;
          }

          .jabit-sehero__shell {
            width: calc(100% - 40px);
            padding-top: 80px;
            padding-bottom: 44px;
          }

          .jabit-sehero__eyebrows {
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .jabit-sehero__eyebrow-left,
          .jabit-sehero__eyebrow-right {
            font-size: 12px;
          }

          .jabit-sehero__main {
            gap: 24px;
            margin-top: 32px;
          }

          .jabit-sehero__display {
            font-size: clamp(36px, 10vw, 46px);
            line-height: 1.1;
          }

          .jabit-sehero__side {
            padding-bottom: 0;
          }

          .jabit-sehero__sub {
            margin-top: 16px;
            font-size: 17px;
          }

          .jabit-sehero__actions {
            flex-direction: row;
            flex-wrap: nowrap;
            align-items: stretch;
            gap: 10px;
            margin-top: 28px;
          }

          .jabit-sehero__actions > .jabit-sehero__rise {
            flex: 1 1 0;
            min-width: 0;
          }

          .jabit-sehero__actions [data-site-button] {
            width: 100%;
            justify-content: center;
            min-height: 50px;
            padding-inline: 14px !important;
            font-size: 14px;
            white-space: normal;
          }

          .jabit-sehero__strip {
            gap: 12px 20px;
            margin-top: 34px;
            padding: 20px 0 26px;
          }

          .jabit-sehero__fact {
            font-size: 13px;
            white-space: normal;
          }
        }

        /* ---------- Responsive: small phones (320–380px) ---------- */
        @media (max-width: 380px) {
          .jabit-sehero {
            justify-content: center;
          }

          .jabit-sehero__shell {
            width: calc(100% - 28px);
            padding-top: 76px;
          }

          .jabit-sehero__main {
            gap: 20px;
            margin-top: 20px;
          }

          .jabit-sehero__display {
            font-size: clamp(32px, 10vw, 42px);
          }

          .jabit-sehero__sub {
            font-size: 16px;
          }

          .jabit-sehero__actions {
            gap: 8px;
            margin-top: 20px;
          }

          .jabit-sehero__actions [data-site-button] {
            min-height: 48px;
            padding-inline: 12px !important;
            font-size: 13px;
          }
        }

        /* ---------- Responsive: short landscape screens ---------- */
        @media (max-height: 520px) and (orientation: landscape) {
          .jabit-sehero {
            min-height: auto;
          }

          .jabit-sehero__shell {
            padding-top: 88px;
            padding-bottom: 28px;
          }

          .jabit-sehero__main {
            gap: 18px;
            margin-top: 16px;
          }

          .jabit-sehero__display {
            font-size: clamp(32px, 6vh, 44px);
          }

          .jabit-sehero__sub {
            font-size: 16px;
          }

          .jabit-sehero__actions {
            margin-top: 18px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .jabit-sehero__swap {
            animation: none;
          }

          .jabit-sehero__line > span {
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}
