"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

import { caseStudies } from "../data";
import { useCaseStudiesHeroReveal } from "./useCaseStudiesHeroReveal";

function Arrow() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function CaseStudiesHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  useCaseStudiesHeroReveal(sectionRef, shellRef);
  const featuredStudy = caseStudies[0];

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
    <section ref={sectionRef} id="top" className="jabit-cshero" aria-labelledby="case-studies-title">
      <div ref={shellRef} className="jabit-cshero__shell">
        <div className="jabit-cshero__eyebrows">
          <span className="jabit-cshero__rise">
            <span className="jabit-cshero__rise-inner">
              <p className="jabit-cshero__eyebrow-left">Case Studies</p>
            </span>
          </span>
          <span className="jabit-cshero__rise">
            <span className="jabit-cshero__rise-inner">
              <p className="jabit-cshero__eyebrow-right">Selected studies · 2026 — real builds, real outcomes.</p>
            </span>
          </span>
        </div>

        <div className="jabit-cshero__main">
          <h1 id="case-studies-title" className="jabit-cshero__display" aria-label="Real products, measurable progress">
            <span className="jabit-cshero__line">
              <span className="jabit-cshero__rise-inner">Real products,</span>
            </span>
            <span className="jabit-cshero__line">
              <span className="jabit-cshero__rise-inner">measurable progress.</span>
            </span>
          </h1>
          <div className="jabit-cshero__side">
            <span className="jabit-cshero__rise">
              <span className="jabit-cshero__rise-inner">
                <p className="jabit-cshero__sub">
                  A closer look at the platforms and systems we design and engineer — and
                  the outcomes they create.
                </p>
              </span>
            </span>
            <div className="jabit-cshero__actions">
              <span className="jabit-cshero__rise">
                <span className="jabit-cshero__rise-inner">
                  <a
                    href="#selected-case-studies"
                    data-site-button
                    data-button-variant="primary"
                  >
                    Explore the work
                    <Arrow />
                  </a>
                </span>
              </span>
            </div>
          </div>
        </div>

        <span className="jabit-cshero__cardmask">
          <span className="jabit-cshero__rise-inner">
            <Link
              className="jabit-cshero__card"
              href={`/case-studies/${featuredStudy.slug}`}
            >
              <Image
                className="jabit-cshero__cardimage"
                src={featuredStudy.image}
                alt={featuredStudy.imageAlt}
                fill
                priority
                sizes="(max-width: 700px) 100vw, 90vw"
              />
              <span className="jabit-cshero__cardshade" aria-hidden="true" />

              <div className="jabit-cshero__cardtopline">
                <span className="jabit-cshero__cardbadge">
                  <i aria-hidden="true" />
                  Featured case study
                </span>
                <div className="jabit-cshero__cardtags" aria-hidden="true">
                  <span>Product engineering</span>
                  <span>Systems design</span>
                </div>
              </div>

              <div className="jabit-cshero__cardfooter">
                <div className="jabit-cshero__cardident">
                  <span>{featuredStudy.category}</span>
                  <strong>{featuredStudy.name}</strong>
                </div>
                <p className="jabit-cshero__cardoutcome">{featuredStudy.outcome}</p>
                <span className="jabit-cshero__cardarrow" aria-hidden="true">
                  <svg viewBox="0 0 16 16" fill="none">
                    <path
                      d="M4.5 11.5 11.5 4.5M11.5 4.5H5.75M11.5 4.5v5.75"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </Link>
          </span>
        </span>
      </div>

      <style>{`
        .jabit-cshero,
        .jabit-cshero * {
          box-sizing: border-box;
        }

        .jabit-cshero {
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

        .jabit-cshero__shell {
          position: relative;
          z-index: 2;
          width: var(--home-shell-width, min(1360px, calc(100% - 64px)));
          margin: 0 auto;
          padding-top: 112px;
          padding-bottom: 40px;
        }

        .jabit-cshero__eyebrows {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: 32px;
          align-items: start;
        }

        .jabit-cshero__eyebrow-left,
        .jabit-cshero__eyebrow-right {
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

        .jabit-cshero__eyebrow-right {
          max-width: 460px;
          margin-left: auto;
          text-align: right;
        }

        .jabit-cshero__main {
          display: grid;
          grid-template-columns: minmax(0, 1.25fr) minmax(300px, 0.75fr);
          gap: clamp(32px, 4vw, 80px);
          align-items: end;
          margin-top: clamp(20px, 3vh, 36px);
        }

        .jabit-cshero__display {
          margin: 0;
          font-family: var(--font-oswald), "Arial Narrow", sans-serif;
          font-size: clamp(44px, 5vw, 72px);
          font-weight: 500;
          line-height: 1.05;
          letter-spacing: -0.01em;
          text-transform: uppercase;
          text-wrap: balance;
          color: #0c0f16;
        }

        .jabit-cshero__line {
          display: block;
          overflow: hidden;
          padding-bottom: 0.08em;
          margin-bottom: -0.08em;
        }

        .jabit-cshero__line > span {
          display: block;
          will-change: transform;
        }

        /* Masked rise pieces — same cascade as other heroes. */
        .jabit-cshero__rise {
          display: block;
          overflow: hidden;
        }

        .jabit-cshero__rise-inner {
          display: block;
          will-change: transform;
        }

        .jabit-cshero__side {
          padding-bottom: 12px;
        }

        .jabit-cshero__sub {
          margin: 0;
          font-family: var(--type-font-supporting);
          font-size: clamp(22px, 2vw, 30px);
          font-weight: 500;
          line-height: 1.3;
          letter-spacing: -0.01em;
          color: #0c0f16;
          text-wrap: pretty;
        }

        .jabit-cshero__actions {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          margin-top: 30px;
        }

        .jabit-cshero__actions svg {
          width: 16px;
          height: 16px;
        }

        .jabit-cshero__actions path {
          stroke: currentColor;
          stroke-width: 1.8;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        /* Flat hero buttons — no resting or hover shadows. */
        .jabit-cshero [data-site-button][data-button-variant="primary"],
        .jabit-cshero [data-site-button][data-button-variant="primary"]:hover,
        .jabit-cshero [data-site-button][data-button-variant="secondary"],
        .jabit-cshero [data-site-button][data-button-variant="secondary"]:hover {
          box-shadow: none !important;
        }

        /* Button masks get breathing room so hover lift never clips. */
        .jabit-cshero__actions > .jabit-cshero__rise {
          padding: 4px 2px;
          margin: -4px -2px;
        }

        /* Featured card — same design, mask-wrapped for the cascade. */
        .jabit-cshero__cardmask {
          display: block;
          overflow: hidden;
          border-radius: 16px;
          margin-top: clamp(40px, 5vh, 64px);
        }

        .jabit-cshero__card {
          position: relative;
          display: block;
          aspect-ratio: 2.4 / 1;
          overflow: hidden;
          border-radius: 16px;
          background: #17201d;
          color: #fff;
          text-decoration: none;
          isolation: isolate;
        }

        .jabit-cshero__cardimage {
          object-fit: cover;
          transition: transform 700ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .jabit-cshero__cardshade {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgb(7 12 10 / 52%),
            rgb(7 12 10 / 10%) 42%,
            rgb(7 12 10 / 66%)
          );
          pointer-events: none;
        }

        .jabit-cshero__card::after {
          position: absolute;
          inset: 0;
          z-index: 2;
          content: "";
          border: 1px solid rgb(255 255 255 / 14%);
          border-radius: inherit;
          pointer-events: none;
        }

        .jabit-cshero__cardtopline,
        .jabit-cshero__cardfooter {
          position: absolute;
          z-index: 1;
          right: clamp(18px, 2.4vw, 32px);
          left: clamp(18px, 2.4vw, 32px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          color: #fff;
        }

        .jabit-cshero__cardtopline {
          top: clamp(16px, 2vw, 26px);
        }

        .jabit-cshero__cardbadge {
          display: inline-flex;
          padding: 9px 14px 9px 12px;
          align-items: center;
          gap: 9px;
          border: 1px solid rgb(255 255 255 / 22%);
          border-radius: 999px;
          background: rgb(10 15 13 / 34%);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          color: #fff;
          font-size: 10px;
          font-weight: 650;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .jabit-cshero__cardbadge i {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--signal, #4566e8);
          box-shadow: 0 0 0 3px rgb(69 102 232 / 28%);
        }

        .jabit-cshero__cardtags {
          display: flex;
          align-items: center;
          color: rgb(255 255 255 / 72%);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .jabit-cshero__cardtags span + span::before {
          margin: 0 12px;
          content: "/";
          color: rgb(255 255 255 / 36%);
        }

        .jabit-cshero__cardfooter {
          bottom: clamp(16px, 2.2vw, 28px);
          align-items: flex-end;
        }

        .jabit-cshero__cardident span {
          display: inline-flex;
          padding: 5px 8px;
          background: rgb(255 255 255 / 14%);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border-radius: 4px;
          color: rgb(255 255 255 / 88%);
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .jabit-cshero__cardident strong {
          display: block;
          margin-top: 10px;
          font-family: var(--font-plus-jakarta-sans), sans-serif;
          font-size: clamp(24px, 2.6vw, 38px);
          font-weight: 600;
          line-height: 1.02;
          letter-spacing: -0.02em;
          text-shadow: 0 2px 24px rgb(7 12 10 / 40%);
        }

        .jabit-cshero__cardoutcome {
          max-width: 380px;
          margin: 0 28px 6px auto;
          padding-right: 16px;
          border-right: 1px solid rgb(255 255 255 / 24%);
          color: rgb(255 255 255 / 82%);
          font-size: 13px;
          line-height: 1.55;
          text-align: right;
          text-wrap: pretty;
        }

        .jabit-cshero__cardarrow {
          display: grid;
          width: 48px;
          height: 48px;
          flex-shrink: 0;
          place-items: center;
          border: 1px solid rgb(255 255 255 / 40%);
          border-radius: 50%;
          background: rgb(10 15 13 / 30%);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          transition:
            transform 260ms var(--ease, cubic-bezier(0.16, 1, 0.3, 1)),
            background 260ms ease,
            border-color 260ms ease;
        }

        .jabit-cshero__cardarrow svg {
          width: 17px;
          height: 17px;
        }

        .jabit-cshero__card:hover .jabit-cshero__cardimage {
          transform: scale(1.035);
        }

        .jabit-cshero__card:hover .jabit-cshero__cardarrow,
        .jabit-cshero__card:focus-visible .jabit-cshero__cardarrow {
          background: var(--signal, #4566e8);
          border-color: transparent;
          transform: translate(2px, -2px);
        }

        /* ---------- Responsive: small laptop ---------- */
        @media (max-width: 1280px) {
          .jabit-cshero__shell {
            padding-top: 104px;
          }

          .jabit-cshero__main {
            gap: clamp(32px, 4vw, 64px);
          }
        }

        /* ---------- Responsive: tablet (stack to one column) ---------- */
        @media (max-width: 1024px) {
          .jabit-cshero__shell {
            padding-top: 112px;
          }

          .jabit-cshero__eyebrows {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .jabit-cshero__eyebrow-right {
            max-width: 60ch;
            margin-left: 0;
            text-align: left;
          }

          .jabit-cshero__main {
            grid-template-columns: 1fr;
            align-items: start;
            gap: 28px;
          }

          .jabit-cshero__display {
            font-size: clamp(42px, 6.5vw, 64px);
          }

          .jabit-cshero__sub {
            font-size: clamp(19px, 2.4vw, 24px);
          }

          .jabit-cshero__side {
            padding-bottom: 0;
          }

          .jabit-cshero__actions {
            flex-direction: row;
            flex-wrap: nowrap;
            gap: 12px;
          }

          .jabit-cshero__actions > .jabit-cshero__rise {
            flex: 0 0 auto;
          }

          .jabit-cshero__actions [data-site-button] {
            width: auto;
            white-space: nowrap;
          }

          .jabit-cshero__card {
            aspect-ratio: 16 / 10;
          }

          .jabit-cshero__cardoutcome {
            display: none;
          }
        }

        /* ---------- Responsive: large phones / small tablets ---------- */
        @media (max-width: 768px) {
          .jabit-cshero__shell {
            padding-top: 108px;
          }

          .jabit-cshero__main {
            gap: 24px;
            margin-top: 24px;
          }

          .jabit-cshero__display {
            font-size: clamp(38px, 8vw, 56px);
          }

          .jabit-cshero__sub {
            font-size: 19px;
          }
        }

        /* ---------- Responsive: phones ---------- */
        @media (max-width: 640px) {
          .jabit-cshero {
            justify-content: flex-start;
            min-height: auto;
          }

          .jabit-cshero__shell {
            width: calc(100% - 40px);
            padding-top: 104px;
            padding-bottom: 40px;
          }

          .jabit-cshero__eyebrows {
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .jabit-cshero__eyebrow-left,
          .jabit-cshero__eyebrow-right {
            font-size: 12px;
          }

          .jabit-cshero__main {
            gap: 24px;
            margin-top: 24px;
          }

          .jabit-cshero__display {
            font-size: clamp(30px, 8.5vw, 40px);
            line-height: 1.1;
          }

          .jabit-cshero__side {
            padding-bottom: 0;
          }

          .jabit-cshero__sub {
            margin-top: 16px;
            font-size: 17px;
          }

          .jabit-cshero__actions {
            flex-direction: row;
            flex-wrap: wrap;
            align-items: center;
            gap: 10px;
            margin-top: 24px;
          }

          .jabit-cshero__actions > .jabit-cshero__rise {
            flex: 0 0 auto;
            min-width: 0;
          }

          .jabit-cshero__actions [data-site-button] {
            width: auto;
            justify-content: center;
            min-height: 50px;
            padding-inline: 22px !important;
            font-size: 14px;
            white-space: nowrap;
          }

          .jabit-cshero__cardmask {
            margin-top: 28px;
          }

          .jabit-cshero__card {
            aspect-ratio: 4 / 5;
          }

          .jabit-cshero__cardtags {
            display: none;
          }

          .jabit-cshero__cardoutcome {
            display: none;
          }

          .jabit-cshero__cardfooter {
            flex-wrap: wrap;
          }
        }

        /* ---------- Responsive: small phones (320–380px) ---------- */
        @media (max-width: 380px) {
          .jabit-cshero__shell {
            width: calc(100% - 28px);
            padding-top: 96px;
          }

          .jabit-cshero__main {
            gap: 20px;
            margin-top: 20px;
          }

          .jabit-cshero__display {
            font-size: clamp(28px, 8.5vw, 36px);
          }

          .jabit-cshero__sub {
            font-size: 16px;
          }

          .jabit-cshero__actions {
            gap: 8px;
            margin-top: 20px;
          }

          .jabit-cshero__actions [data-site-button] {
            min-height: 48px;
            padding-inline: 12px !important;
            font-size: 13px;
          }
        }

        /* ---------- Responsive: short landscape screens ---------- */
        @media (max-height: 520px) and (orientation: landscape) {
          .jabit-cshero {
            min-height: auto;
          }

          .jabit-cshero__shell {
            padding-top: 88px;
            padding-bottom: 28px;
          }

          .jabit-cshero__main {
            gap: 18px;
            margin-top: 16px;
          }

          .jabit-cshero__display {
            font-size: clamp(32px, 6vh, 44px);
          }

          .jabit-cshero__sub {
            font-size: 16px;
          }

          .jabit-cshero__actions {
            margin-top: 18px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .jabit-cshero__line > span {
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}
