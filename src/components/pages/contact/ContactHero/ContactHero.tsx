"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

import { useContactHeroReveal } from "./useContactHeroReveal";

const HillsBackground = dynamic(() => import("@/components/three/HillsBackground/HillsBackground"), {
  ssr: false,
});

const RESPONSE_STEPS = [
  ["Reply", "Within one business day"],
  ["First call", "A focused 30-minute conversation"],
  ["Before work", "Scope and next steps in writing"],
] as const;

function Arrow() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function ContactHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  useContactHeroReveal(sectionRef, shellRef);

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
    <section ref={sectionRef} id="top" className="jabit-cohero" aria-labelledby="contact-title">
      <div className="jabit-cohero__bg" aria-hidden="true">
        <HillsBackground />
      </div>
      <div className="jabit-cohero__shade" aria-hidden="true" />

      <div ref={shellRef} className="jabit-cohero__shell">
        <div className="jabit-cohero__eyebrows">
          <span className="jabit-cohero__rise">
            <span className="jabit-cohero__rise-inner">
              <p className="jabit-cohero__eyebrow-left">Contact JabitSoft</p>
            </span>
          </span>
          <span className="jabit-cohero__rise">
            <span className="jabit-cohero__rise-inner">
              <p className="jabit-cohero__eyebrow-right">India · Worldwide — replies within one business day.</p>
            </span>
          </span>
        </div>

        <div className="jabit-cohero__main">
          <h1 id="contact-title" className="jabit-cohero__display">
            <span className="jabit-cohero__line">
              <span className="jabit-cohero__rise-inner">Tell us what needs</span>
            </span>
            <span className="jabit-cohero__line">
              <span className="jabit-cohero__rise-inner">to work better.</span>
            </span>
          </h1>
          <div className="jabit-cohero__side">
            <span className="jabit-cohero__rise">
              <span className="jabit-cohero__rise-inner">
                <p className="jabit-cohero__sub">
                  Bring us the rough idea, the stubborn system, or the next product you need
                  to ship — we turn it into a clear, buildable plan.
                </p>
              </span>
            </span>
            <div className="jabit-cohero__actions">
              <span className="jabit-cohero__rise">
                <span className="jabit-cohero__rise-inner">
                  <a
                    href="#brief-title"
                    data-site-button
                    data-button-variant="primary"
                  >
                    Start your project brief
                    <Arrow />
                  </a>
                </span>
              </span>
              <span className="jabit-cohero__rise">
                <span className="jabit-cohero__rise-inner">
                  <a
                    href="mailto:info@jabitsoft.com?subject=New%20Project"
                    data-site-button
                    data-button-variant="secondary"
                  >
                    Talk to us
                    <Arrow />
                  </a>
                </span>
              </span>
            </div>
          </div>
        </div>

        <ol className="jabit-cohero__strip" aria-label="What happens next">
          {RESPONSE_STEPS.map(([label, value], index) => (
            <li key={label} className="jabit-cohero__step">
              <span className="jabit-cohero__rise">
                <span className="jabit-cohero__rise-inner">
                  <span className="jabit-cohero__stepnum">{String(index + 1).padStart(2, "0")}</span>
                  <span className="jabit-cohero__steptext">
                    <strong>{label}</strong>
                    <small>{value}</small>
                  </span>
                </span>
              </span>
            </li>
          ))}
        </ol>
      </div>

      <style>{`
        .jabit-cohero,
        .jabit-cohero * {
          box-sizing: border-box;
        }

        .jabit-cohero {
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

        .jabit-cohero__bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }

        .jabit-cohero__shade {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
        }

        .jabit-cohero__shell {
          position: relative;
          z-index: 2;
          width: var(--home-shell-width, min(1360px, calc(100% - 64px)));
          margin: 0 auto;
          padding-top: 112px;
          padding-bottom: 40px;
        }

        .jabit-cohero__eyebrows {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: 32px;
          align-items: start;
        }

        .jabit-cohero__eyebrow-left,
        .jabit-cohero__eyebrow-right {
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

        .jabit-cohero__eyebrow-right {
          max-width: 460px;
          margin-left: auto;
          text-align: right;
        }

        .jabit-cohero__main {
          display: grid;
          grid-template-columns: minmax(0, 1.25fr) minmax(300px, 0.75fr);
          gap: clamp(32px, 4vw, 80px);
          align-items: end;
          margin-top: clamp(20px, 3vh, 36px);
        }

        .jabit-cohero__display {
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

        .jabit-cohero__line {
          display: block;
          overflow: hidden;
          padding-bottom: 0.08em;
          margin-bottom: -0.08em;
        }

        .jabit-cohero__line > span {
          display: block;
          will-change: transform;
        }

        /* Masked rise pieces — same cascade as other heroes. */
        .jabit-cohero__rise {
          display: block;
          overflow: hidden;
        }

        .jabit-cohero__rise-inner {
          display: block;
          will-change: transform;
        }

        .jabit-cohero__side {
          padding-bottom: 12px;
        }

        .jabit-cohero__sub {
          margin: 0;
          font-family: var(--type-font-supporting);
          font-size: clamp(22px, 2vw, 30px);
          font-weight: 500;
          line-height: 1.3;
          letter-spacing: -0.01em;
          color: #0c0f16;
          text-wrap: pretty;
        }

        .jabit-cohero__actions {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          margin-top: 30px;
        }

        .jabit-cohero__actions svg {
          width: 16px;
          height: 16px;
        }

        .jabit-cohero__actions path {
          stroke: currentColor;
          stroke-width: 1.8;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        /* Flat hero buttons — no resting or hover shadows. */
        .jabit-cohero [data-site-button][data-button-variant="primary"],
        .jabit-cohero [data-site-button][data-button-variant="primary"]:hover,
        .jabit-cohero [data-site-button][data-button-variant="secondary"],
        .jabit-cohero [data-site-button][data-button-variant="secondary"]:hover {
          box-shadow: none !important;
        }

        /* Button masks get breathing room so hover lift never clips. */
        .jabit-cohero__actions > .jabit-cohero__rise {
          padding: 4px 2px;
          margin: -4px -2px;
        }

        .jabit-cohero__strip {
          display: flex;
          align-items: stretch;
          justify-content: space-between;
          gap: 24px;
          margin: clamp(32px, 5vh, 64px) 0 0;
          padding: 24px 0 8px;
          border-top: 1px solid rgba(12, 15, 22, 0.14);
          list-style: none;
        }

        .jabit-cohero__step {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }

        .jabit-cohero__step .jabit-cohero__rise-inner {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }

        .jabit-cohero__stepnum {
          font-family: var(--font-oswald), "Arial Narrow", sans-serif;
          font-size: 22px;
          font-weight: 500;
          line-height: 1;
          color: #0c0f16;
          font-variant-numeric: tabular-nums;
        }

        .jabit-cohero__steptext {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .jabit-cohero__steptext strong {
          font-size: 15px;
          font-weight: 600;
          letter-spacing: -0.01em;
          color: #0c0f16;
        }

        .jabit-cohero__steptext small {
          font-size: 13.5px;
          line-height: 1.5;
          color: rgba(12, 15, 22, 0.62);
        }

        /* ---------- Responsive: small laptop ---------- */
        @media (max-width: 1280px) {
          .jabit-cohero__shell {
            padding-top: 104px;
          }

          .jabit-cohero__main {
            gap: clamp(32px, 4vw, 64px);
          }
        }

        /* ---------- Responsive: tablet (stack to one column) ---------- */
        @media (max-width: 1024px) {
          .jabit-cohero__shell {
            padding-top: 112px;
          }

          .jabit-cohero__eyebrows {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .jabit-cohero__eyebrow-right {
            max-width: 60ch;
            margin-left: 0;
            text-align: left;
          }

          .jabit-cohero__main {
            grid-template-columns: 1fr;
            align-items: start;
            gap: 28px;
          }

          .jabit-cohero__display {
            font-size: clamp(46px, 7vw, 76px);
          }

          .jabit-cohero__sub {
            font-size: clamp(19px, 2.4vw, 24px);
          }

          .jabit-cohero__side {
            padding-bottom: 0;
          }

          .jabit-cohero__actions {
            flex-direction: row;
            flex-wrap: nowrap;
            gap: 12px;
          }

          .jabit-cohero__actions > .jabit-cohero__rise {
            flex: 0 0 auto;
          }

          .jabit-cohero__actions [data-site-button] {
            width: auto;
            white-space: nowrap;
          }

          .jabit-cohero__strip {
            flex-wrap: wrap;
            justify-content: flex-start;
            gap: 20px 32px;
          }
        }

        /* ---------- Responsive: large phones / small tablets ---------- */
        @media (max-width: 768px) {
          .jabit-cohero__shell {
            padding-top: 108px;
          }

          .jabit-cohero__main {
            gap: 24px;
            margin-top: 24px;
          }

          .jabit-cohero__display {
            font-size: clamp(42px, 9vw, 64px);
          }

          .jabit-cohero__sub {
            font-size: 19px;
          }
        }

        /* ---------- Responsive: phones ---------- */
        @media (max-width: 640px) {
          .jabit-cohero {
            justify-content: center;
            min-height: 75vh;
            min-height: 75svh;
          }

          .jabit-cohero__shell {
            width: calc(100% - 40px);
            padding-top: 80px;
            padding-bottom: 44px;
          }

          .jabit-cohero__eyebrows {
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .jabit-cohero__eyebrow-left,
          .jabit-cohero__eyebrow-right {
            font-size: 12px;
          }

          .jabit-cohero__main {
            gap: 24px;
            margin-top: 32px;
          }

          .jabit-cohero__display {
            font-size: clamp(36px, 10vw, 46px);
            line-height: 1.1;
          }

          .jabit-cohero__side {
            padding-bottom: 0;
          }

          .jabit-cohero__sub {
            margin-top: 16px;
            font-size: 17px;
          }

          .jabit-cohero__actions {
            flex-direction: row;
            flex-wrap: nowrap;
            align-items: stretch;
            gap: 10px;
            margin-top: 28px;
          }

          .jabit-cohero__actions > .jabit-cohero__rise {
            flex: 1 1 0;
            min-width: 0;
          }

          .jabit-cohero__actions [data-site-button] {
            width: 100%;
            justify-content: center;
            min-height: 50px;
            padding-inline: 14px !important;
            font-size: 14px;
            white-space: normal;
          }

          .jabit-cohero__strip {
            flex-direction: column;
            gap: 16px;
            margin-top: 34px;
            padding: 20px 0 8px;
          }
        }

        /* ---------- Responsive: small phones (320–380px) ---------- */
        @media (max-width: 380px) {
          .jabit-cohero {
            justify-content: center;
          }

          .jabit-cohero__shell {
            width: calc(100% - 28px);
            padding-top: 76px;
          }

          .jabit-cohero__main {
            gap: 20px;
            margin-top: 20px;
          }

          .jabit-cohero__display {
            font-size: clamp(32px, 10vw, 42px);
          }

          .jabit-cohero__sub {
            font-size: 16px;
          }

          .jabit-cohero__actions {
            gap: 8px;
            margin-top: 20px;
          }

          .jabit-cohero__actions [data-site-button] {
            min-height: 48px;
            padding-inline: 12px !important;
            font-size: 13px;
          }
        }

        /* ---------- Responsive: short landscape screens ---------- */
        @media (max-height: 520px) and (orientation: landscape) {
          .jabit-cohero {
            min-height: auto;
          }

          .jabit-cohero__shell {
            padding-top: 88px;
            padding-bottom: 28px;
          }

          .jabit-cohero__main {
            gap: 18px;
            margin-top: 16px;
          }

          .jabit-cohero__display {
            font-size: clamp(32px, 6vh, 44px);
          }

          .jabit-cohero__sub {
            font-size: 16px;
          }

          .jabit-cohero__actions {
            margin-top: 18px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .jabit-cohero__line > span {
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}
