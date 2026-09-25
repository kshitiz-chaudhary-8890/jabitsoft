"use client";

import { useEffect, useRef } from "react";

import { useHomeHeroReveal } from "./useHomeHeroReveal";

const LINES = ["Software that", "moves business", "forward."];

const LINKS = [
  ["Web Development", "/services"],
  ["Mobile Apps", "/services"],
  ["Cloud", "/services"],
  ["AI Solutions", "/services"],
  ["ERP", "/services"],
];

// Matches the <link rel="preload"> in src/app/page.tsx.
// Optimized via ImageKit: 98MB orig -> ~6.7MB (w-1280, q-60) for fast hero load.
const VIDEO_SRC =
  "https://ik.imagekit.io/5bwd4hel7/Homepage/hero%20section/41117e3d-f711-49d4-b209-da87ac4bd99e.mp4?tr=q-60,w-1280,f-mp4";

function Arrow() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export default function Hero() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const shellRef = useRef(null);
  useHomeHeroReveal(sectionRef, shellRef);

  useEffect(() => {
    const video = bgRef.current;
    if (!video) return undefined;

    const preference = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!preference) return undefined;

    const syncPlayback = () => {
      if (preference.matches) {
        video.pause();
      } else {
        video.play().catch(() => {});
      }
    };

    syncPlayback();
    preference.addEventListener?.("change", syncPlayback);
    return () => preference.removeEventListener?.("change", syncPlayback);
  }, []);

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
      if (y < h * 1.2) {
        if (bgRef.current)
          bgRef.current.style.transform = `translate3d(0, ${y * 0.28}px, 0) scale(1.12)`;
        if (shellRef.current) {
          shellRef.current.style.transform = `translate3d(0, ${y * -0.1}px, 0)`;
          shellRef.current.style.opacity = String(Math.max(0, 1 - y / (h * 0.85)));
        }
      } else if (shellRef.current) {
        shellRef.current.style.opacity = "0";
      }
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
    <>
      <section ref={sectionRef} className="jabit-hero" aria-labelledby="home-hero-title">
        <video
          ref={bgRef}
          className="jabit-hero__video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source
            src={VIDEO_SRC}
            type="video/mp4"
          />
        </video>
        <div className="jabit-hero__bg" aria-hidden="true" />
        <div ref={shellRef} className="jabit-hero__shell">
          <div className="jabit-hero__eyebrows">
            <span className="jabit-hero__rise">
              <span className="jabit-hero__rise-inner">
                <p className="jabit-hero__eyebrow-left">Custom software, delivered end to end</p>
              </span>
            </span>
            <span className="jabit-hero__rise">
              <span className="jabit-hero__rise-inner">
                <p className="jabit-hero__eyebrow-right">
                  JabitSoft designs, builds and supports web, mobile, cloud, AI and ERP systems
                  for businesses worldwide.
                </p>
              </span>
            </span>
          </div>

          <div className="jabit-hero__main">
            <h1 id="home-hero-title" className="jabit-hero__display">
              {LINES.map((line) => (
                <span key={line} className="jabit-hero__line">
                  <span className="jabit-hero__rise-inner">{line}</span>
                </span>
              ))}
            </h1>
            <div className="jabit-hero__side">
              <span className="jabit-hero__rise">
                <span className="jabit-hero__rise-inner">
                  <p className="jabit-hero__sub">
                    Design, build, launch and support — everything your product needs, all
                    under one roof.
                  </p>
                </span>
              </span>
              <div className="jabit-hero__actions">
                <span className="jabit-hero__rise">
                  <span className="jabit-hero__rise-inner">
                    <a
                      href="/case-studies"
                      className="jabit-hero__ghost"
                      data-site-button
                      data-button-variant="secondary"
                      data-button-theme="dark"
                    >
                      See our work
                      <Arrow />
                    </a>
                  </span>
                </span>
                <span className="jabit-hero__rise">
                  <span className="jabit-hero__rise-inner">
                    <a
                      href="/contact-us"
                      className="jabit-hero__white"
                      data-site-button
                      data-button-variant="primary"
                      data-button-theme="dark"
                    >
                      Start a conversation
                      <Arrow />
                    </a>
                  </span>
                </span>
              </div>
            </div>
          </div>

          <nav className="jabit-hero__strip" aria-label="Services">
            {LINKS.map(([label, href]) => (
              <span key={label} className="jabit-hero__rise">
                <span className="jabit-hero__rise-inner">
                  <a href={href}>
                    {label}
                    <Arrow />
                  </a>
                </span>
              </span>
            ))}
          </nav>
        </div>
      </section>

      <style>{`
        .jabit-hero,
        .jabit-hero * {
          box-sizing: border-box;
        }

        .jabit-hero {
          position: relative;
          display: flex;
          min-height: max(640px, 100svh);
          overflow: hidden;
          transform-origin: center top;
          flex-direction: column;
          justify-content: flex-end;
          background: #05070c;
          color: #ffffff;
          font-family: var(--font-inter), Inter, sans-serif;
          isolation: isolate;
        }

        .jabit-hero__video {
          position: absolute;
          inset: 0;
          z-index: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .jabit-hero__bg {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(
            180deg,
            rgba(2, 6, 12, 0.18) 0%,
            rgba(2, 6, 12, 0.06) 32%,
            rgba(2, 6, 12, 0.46) 68%,
            rgba(2, 6, 12, 0.78) 100%
          );
          pointer-events: none;
        }

        .jabit-hero__shell {
          position: relative;
          z-index: 2;
          width: var(--home-shell-width, min(1360px, calc(100% - 64px)));
          margin: 0 auto;
          padding-top: clamp(120px, 14vh, 170px);
        }

        .jabit-hero__eyebrows {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: 32px;
          align-items: start;
        }

        .jabit-hero__eyebrow-left,
        .jabit-hero__eyebrow-right {
          margin: 0;
          font-family: var(--type-font-body);
          font-size: var(--type-body-size);
          font-style: italic;
          line-height: var(--type-body-leading);
          color: rgba(255, 255, 255, 0.85);
        }

        .jabit-hero__eyebrow-right {
          max-width: 460px;
          margin-left: auto;
          text-align: right;
        }

        .jabit-hero__main {
          display: grid;
          grid-template-columns: minmax(0, 1.25fr) minmax(300px, 0.75fr);
          gap: clamp(40px, 6vw, 110px);
          align-items: end;
          margin-top: clamp(28px, 4vh, 54px);
        }

        .jabit-hero__display {
          margin: 0;
          font-family: var(--font-oswald), "Arial Narrow", sans-serif;
          font-size: clamp(44px, 5.5vw, 80px);
          font-weight: 500;
          line-height: 1.05;
          letter-spacing: -0.01em;
          text-transform: uppercase;
          text-wrap: balance;
          color: #ffffff;
        }

        .jabit-hero__line {
          display: block;
          overflow: hidden;
          padding-bottom: 0.06em;
          margin-bottom: -0.06em;
        }

        .jabit-hero__line > span {
          display: block;
          will-change: transform;
        }

        /* Masked rise pieces — same cascade as the About hero. */
        .jabit-hero__rise {
          display: block;
          overflow: hidden;
        }

        .jabit-hero__rise-inner {
          display: block;
          will-change: transform;
        }

        .jabit-hero__side {
          padding-bottom: 12px;
        }

        .jabit-hero__sub {
          margin: 0;
          font-family: var(--type-font-supporting);
          font-size: clamp(22px, 2vw, 30px);
          font-weight: 500;
          line-height: 1.3;
          letter-spacing: -0.01em;
          color: #ffffff;
          text-wrap: pretty;
        }

        .jabit-hero__actions {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          margin-top: 30px;
        }

        .jabit-hero__ghost svg,
        .jabit-hero__white svg {
          width: 16px;
          height: 16px;
        }

        .jabit-hero__ghost path,
        .jabit-hero__white path {
          stroke: currentColor;
          stroke-width: 1.8;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .jabit-hero__strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          margin-top: clamp(48px, 7vh, 90px);
          padding: 26px 0 30px;
          border-top: 1px solid rgba(255, 255, 255, 0.16);
        }

        .jabit-hero__strip a {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.85);
          font-family: var(--type-font-body);
          font-size: var(--type-body-size);
          font-weight: 500;
          text-decoration: none;
          transition: color 200ms ease;
        }

        .jabit-hero__strip a:hover {
          color: #ffffff;
        }

        .jabit-hero__strip svg {
          width: 14px;
          height: 14px;
        }

        .jabit-hero__strip path {
          stroke: currentColor;
          stroke-width: 1.8;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        /* Button masks get breathing room so hover lift never clips. */
        .jabit-hero__actions > .jabit-hero__rise {
          padding: 4px 2px;
          margin: -4px -2px;
        }

        @media (max-width: 980px) {
          .jabit-hero__main {
            grid-template-columns: 1fr;
            align-items: start;
            gap: 30px;
          }

          .jabit-hero__eyebrow-right {
            margin-left: 0;
            text-align: left;
          }

          .jabit-hero__display {
            font-size: clamp(56px, 13vw, 96px);
          }

          .jabit-hero__strip {
            flex-wrap: wrap;
            justify-content: flex-start;
            gap: 14px 28px;
          }
        }

        @media (max-width: 640px) {
          .jabit-hero {
            min-height: auto;
            justify-content: flex-start;
          }

          .jabit-hero__shell {
            width: calc(100% - 40px);
            padding-top: 200px;
          }

          .jabit-hero__eyebrows {
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .jabit-hero__eyebrow-left,
          .jabit-hero__eyebrow-right {
            font-size: 14px;
          }

          .jabit-hero__main {
            gap: 24px;
            margin-top: 28px;
          }

          .jabit-hero__display {
            font-size: clamp(42px, 12.5vw, 56px);
            line-height: 1.0;
          }

          .jabit-hero__side {
            padding-bottom: 0;
          }

          .jabit-hero__sub {
            margin-top: 20px;
            font-size: 18px;
          }

          .jabit-hero__actions {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
            margin-top: 26px;
          }

          .jabit-hero__ghost,
          .jabit-hero__white {
            justify-content: center;
            min-height: 54px;
            font-size: 15px;
          }

          .jabit-hero__ghost {
            background: rgba(255, 255, 255, 0.06);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
          }

          .jabit-hero__strip {
            flex-wrap: nowrap;
            gap: 26px;
            margin-top: 34px;
            padding: 20px 0 26px;
            overflow-x: auto;
            scrollbar-width: none;
          }

          .jabit-hero__strip::-webkit-scrollbar {
            display: none;
          }

          .jabit-hero__strip > .jabit-hero__rise {
            flex-shrink: 0;
          }

          .jabit-hero__strip a {
            font-size: 13px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .jabit-hero__ghost:hover,
          .jabit-hero__white:hover {
            translate: none;
          }
        }
      `}</style>
    </>
  );
}
