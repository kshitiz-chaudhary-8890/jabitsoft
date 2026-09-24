"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

import { useAboutHeroReveal } from "./useAboutHeroReveal";

const HillsBackground = dynamic(
  () => import("../../../three/HillsBackground/HillsBackground.jsx"),
  { ssr: false },
);

const LINES = ["Your product", "deserves a team", "that stays."];

function Arrow() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  useAboutHeroReveal(sectionRef, shellRef);

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
    <section ref={sectionRef} id="top" className="jabit-abhero" aria-labelledby="about-title">
      <div className="jabit-abhero__bg" aria-hidden="true">
        <HillsBackground />
      </div>
      <div className="jabit-abhero__shade" aria-hidden="true" />

      <div ref={shellRef} className="jabit-abhero__shell">
        <div className="jabit-abhero__eyebrows">
          <span className="jabit-abhero__rise">
            <span className="jabit-abhero__rise-inner">
              <p className="jabit-abhero__eyebrow-left">About JabitSoft</p>
            </span>
          </span>
          <span className="jabit-abhero__rise">
            <span className="jabit-abhero__rise-inner">
              <p className="jabit-abhero__eyebrow-right">
                A Noida-based crew of designers, engineers and problem-solvers.
              </p>
            </span>
          </span>
        </div>

        <div className="jabit-abhero__main">
          <h1 id="about-title" className="jabit-abhero__display" aria-label="Your product deserves a team that stays">
            {LINES.map((line, i) => (
              <span key={line} className="jabit-abhero__line">
                <span className="jabit-abhero__rise-inner" style={{ "--d": `${i * 110}ms` } as React.CSSProperties}>{line}</span>
              </span>
            ))}
          </h1>
          <div className="jabit-abhero__side">
            <span className="jabit-abhero__rise">
              <span className="jabit-abhero__rise-inner">
                <p className="jabit-abhero__sub">
                  Designers, engineers and problem-solvers who care how your business
                  runs — meet us below.
                </p>
              </span>
            </span>
            <div className="jabit-abhero__actions">
              <span className="jabit-abhero__rise">
                <span className="jabit-abhero__rise-inner">
                  <Link
                    href="#team-showcase"
                    className="jabit-abhero__ghost"
                    data-site-button
                    data-button-variant="secondary"
                  >
                    Meet the crew
                    <Arrow />
                  </Link>
                </span>
              </span>
              <span className="jabit-abhero__rise">
                <span className="jabit-abhero__rise-inner">
                  <Link
                    href="/contact-us"
                    className="jabit-abhero__white"
                    data-site-button
                    data-button-variant="primary"
                  >
                    Start a project
                    <Arrow />
                  </Link>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .jabit-abhero,
        .jabit-abhero * {
          box-sizing: border-box;
        }

        .jabit-abhero {
          position: relative;
          display: flex;
          min-height: 100vh;
          min-height: 100svh;
          overflow: hidden;
          transform-origin: center top;
          flex-direction: column;
          justify-content: flex-start;
          background: #ffffff;
          color: #0c0f16;
          font-family: var(--font-inter), Inter, sans-serif;
          isolation: isolate;
        }

        .jabit-abhero__bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }

        .jabit-abhero__shade {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
        }

        .jabit-abhero__shell {
          position: relative;
          z-index: 2;
          width: var(--home-shell-width, min(1360px, calc(100% - 64px)));
          margin: 0 auto;
          padding-top: 136px;
          padding-bottom: 32px;
        }

        .jabit-abhero__eyebrows {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: 32px;
          align-items: start;
        }

        .jabit-abhero__eyebrow-left,
        .jabit-abhero__eyebrow-right {
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

        .jabit-abhero__eyebrow-right {
          max-width: 460px;
          margin-left: auto;
          text-align: right;
        }

        .jabit-abhero__main {
          display: grid;
          grid-template-columns: minmax(0, 1.25fr) minmax(300px, 0.75fr);
          gap: clamp(32px, 4vw, 80px);
          align-items: end;
          margin-top: clamp(20px, 3vh, 36px);
        }

        .jabit-abhero__display {
          margin: clamp(26px, 3.6vw, 46px) 0 0;
          max-width: 920px;
          font-family: var(--font-oswald), "Arial Narrow", sans-serif;
          font-size: clamp(44px, 5vw, 72px);
          font-weight: 500;
          line-height: 1.05;
          letter-spacing: -0.01em;
          text-transform: uppercase;
          text-wrap: balance;
          color: #0c0f16;
        }

        .jabit-abhero__line {
          display: block;
          overflow: hidden;
          padding-bottom: 0.08em;
          margin-bottom: -0.08em;
        }

        .jabit-abhero__line > span {
          display: block;
          will-change: transform;
        }

        /* Masked rise pieces — Minati-style translate_y cascade. */
        .jabit-abhero__rise {
          display: block;
          overflow: hidden;
        }

        .jabit-abhero__rise-inner {
          display: block;
          will-change: transform;
        }

        .jabit-abhero__side {
          padding-bottom: 6px;
          text-align: right;
        }

        .jabit-abhero__sub {
          margin: 0;
          font-family: var(--type-font-supporting);
          font-size: clamp(22px, 2vw, 30px);
          font-weight: 500;
          line-height: 1.3;
          letter-spacing: -0.01em;
          color: #0c0f16;
          text-align: right;
          text-wrap: pretty;
        }

        .jabit-abhero__actions {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-end;
          gap: 14px;
          margin-top: 30px;
        }

        .jabit-abhero__actions svg {
          width: 16px;
          height: 16px;
        }

        .jabit-abhero__actions path {
          stroke: currentColor;
          stroke-width: 1.8;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        /* Flat hero buttons — no resting or hover shadows. */
        .jabit-abhero [data-site-button][data-button-variant="primary"],
        .jabit-abhero [data-site-button][data-button-variant="primary"]:hover,
        .jabit-abhero [data-site-button][data-button-variant="secondary"],
        .jabit-abhero [data-site-button][data-button-variant="secondary"]:hover {
          box-shadow: none !important;
        }

        /* Button masks get breathing room so hover lift / focus rings never clip. */
        .jabit-abhero__actions > .jabit-abhero__rise {
          padding: 4px 2px;
          margin: -4px -2px;
        }

        /* ---------- Responsive: small laptop ---------- */
        @media (max-width: 1280px) {
          .jabit-abhero__shell {
            padding-top: 124px;
          }

          .jabit-abhero__main {
            gap: clamp(32px, 4vw, 64px);
          }
        }

        /* ---------- Responsive: tablet (stack to one column) ---------- */
        @media (max-width: 1024px) {
          .jabit-abhero__shell {
            padding-top: 112px;
          }

          .jabit-abhero__eyebrows {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .jabit-abhero__eyebrow-right {
            max-width: 60ch;
            margin-left: 0;
            text-align: left;
          }

          .jabit-abhero__main {
            grid-template-columns: 1fr;
            align-items: start;
            gap: 28px;
          }

          .jabit-abhero__display {
            font-size: clamp(46px, 7vw, 76px);
          }

          .jabit-abhero__sub {
            font-size: clamp(19px, 2.4vw, 24px);
          }

          .jabit-abhero__side {
            padding-bottom: 0;
          }

          .jabit-abhero__actions {
            flex-direction: row;
            flex-wrap: nowrap;
            gap: 12px;
          }

          .jabit-abhero__actions > .jabit-abhero__rise {
            flex: 0 0 auto;
          }

          .jabit-abhero__actions [data-site-button] {
            width: auto;
            white-space: nowrap;
          }
        }

        /* ---------- Responsive: large phones / small tablets ---------- */
        @media (max-width: 768px) {
          .jabit-abhero__shell {
            padding-top: 108px;
          }

          .jabit-abhero__main {
            gap: 24px;
            margin-top: 24px;
          }

          .jabit-abhero__display {
            font-size: clamp(42px, 9vw, 64px);
          }

          .jabit-abhero__sub {
            font-size: 19px;
          }
        }

        /* ---------- Responsive: phones ---------- */
        @media (max-width: 640px) {
          .jabit-abhero {
            justify-content: center;
            min-height: 75vh;
            min-height: 75svh;
          }

          .jabit-abhero__shell {
            width: calc(100% - 40px);
            padding-top: 80px;
            padding-bottom: 44px;
          }

          .jabit-abhero__eyebrows {
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .jabit-abhero__eyebrow-left,
          .jabit-abhero__eyebrow-right {
            font-size: 12px;
          }

          .jabit-abhero__main {
            gap: 24px;
            margin-top: 32px;
          }

          .jabit-abhero__display {
            font-size: clamp(36px, 10vw, 46px);
            line-height: 1.1;
          }

          .jabit-abhero__side {
            padding-bottom: 0;
          }

          .jabit-abhero__sub {
            margin-top: 16px;
            font-size: 17px;
          }

          .jabit-abhero__actions {
            flex-direction: row;
            flex-wrap: nowrap;
            align-items: stretch;
            gap: 10px;
            margin-top: 28px;
          }

          .jabit-abhero__actions > .jabit-abhero__rise {
            flex: 1 1 0;
            min-width: 0;
          }

          .jabit-abhero__actions [data-site-button] {
            width: 100%;
            justify-content: center;
            min-height: 50px;
            padding-inline: 14px !important;
            font-size: 14px;
            white-space: normal;
          }
        }

        /* ---------- Responsive: small phones (320–380px) ---------- */
        @media (max-width: 380px) {
          .jabit-abhero {
            justify-content: center;
          }

          .jabit-abhero__shell {
            width: calc(100% - 28px);
            padding-top: 76px;
          }

          .jabit-abhero__main {
            gap: 20px;
            margin-top: 20px;
          }

          .jabit-abhero__display {
            font-size: clamp(32px, 10vw, 42px);
          }

          .jabit-abhero__sub {
            font-size: 16px;
          }

          .jabit-abhero__actions {
            gap: 8px;
            margin-top: 20px;
          }

          .jabit-abhero__actions [data-site-button] {
            min-height: 48px;
            padding-inline: 12px !important;
            font-size: 13px;
          }
        }

        /* ---------- Responsive: short landscape screens ---------- */
        @media (max-height: 520px) and (orientation: landscape) {
          .jabit-abhero {
            min-height: auto;
          }

          .jabit-abhero__shell {
            padding-top: 88px;
            padding-bottom: 28px;
          }

          .jabit-abhero__main {
            gap: 18px;
            margin-top: 16px;
          }

          .jabit-abhero__display {
            font-size: clamp(32px, 6vh, 44px);
          }

          .jabit-abhero__sub {
            font-size: 16px;
          }

          .jabit-abhero__actions {
            margin-top: 18px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .jabit-abhero__line > span {
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}
