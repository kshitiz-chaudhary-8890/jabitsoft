"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const logos = [
  "https://framerusercontent.com/images/3cWSgJFsUVvZeOw9LdQmTOSVFhE.svg?width=58&height=32",
  "https://framerusercontent.com/images/nfabfL1KTOOmw22T9soWodkE5Q.svg?width=127&height=32",
  "https://framerusercontent.com/images/pFmkT2mGzyfTzJsLN2Lr3fdbIk.svg",
  "https://framerusercontent.com/images/oqkjAivG8qVmaPBg07Z4Yst8rwk.svg?width=162&height=32",
  "https://framerusercontent.com/images/nmwtsE1SWD34rSXL3OhLE7CTn0.svg?width=83&height=32",
  "https://framerusercontent.com/images/zhMiNUjAyE25vd6XOETCIwS38.svg?width=131&height=32",
];

export default function ClientMarquee() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    gsap.registerPlugin(ScrollTrigger);

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    const ctx = gsap.context(() => {
      // Marquee runs only while the section is in view (perf).
      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => section.classList.add("is-logo-active"),
        onEnterBack: () => section.classList.add("is-logo-active"),
        onLeave: () => section.classList.remove("is-logo-active"),
        onLeaveBack: () => section.classList.remove("is-logo-active"),
      });

      if (!reduced) {
        const intro = section.querySelectorAll("[data-cm-intro]");
        gsap.set(intro, { autoAlpha: 0, y: 26 });
        gsap
          .timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: { trigger: section, start: "top 84%", once: true },
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

    return () => {
      section.classList.remove("is-logo-active");
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="client-logos-section trust-showcase"
      aria-labelledby="client-logos-title"
    >
      <div className="trust-showcase__inner shell">
        <header className="trust-showcase__header">
          <p data-cm-intro className="cr-eyebrow">
            Trusted by growing teams
          </p>
          <h2 id="client-logos-title" data-cm-intro>
            <span className="section-heading-fill">
              Trusted by teams building what&rsquo;s next
            </span>
          </h2>
          <p data-cm-intro className="cr-subhead trust-showcase__copy">
            We help growing businesses turn complex ideas into reliable digital products and systems
            — with clarity from decision to delivery.
          </p>
        </header>

        <div className="trust-showcase__logos-block" data-cm-intro>
          <div className="client-logos" aria-label="Selected client logos">
            <div className="client-logo-track">
              {[0, 1].map((group) => (
                <div
                  className="client-logo-group"
                  aria-hidden={group === 1 ? "true" : undefined}
                  key={group}
                >
                  {logos.map((logo, index) => (
                    <div className="client-logo-item" key={`${group}-${index}`}>
                      <img src={logo} alt="" aria-hidden="true" loading="lazy" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .trust-showcase {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          padding: clamp(120px, 12vw, 184px) 0 clamp(88px, 8vw, 136px);
          background: #ffffff;
          color: #141414;
        }

        .trust-showcase__inner {
          position: relative;
          z-index: 2;
        }

        /* Header — About-page editorial pattern: eyebrow full-width,
           heading left, copy right aligned to the baseline. Typography via
           global site rules (.cr-eyebrow, #client-logos-title, .cr-subhead). */
        .trust-showcase__header {
          display: grid;
          grid-template-columns: minmax(0, 7fr) minmax(0, 4fr);
          gap: 32px clamp(40px, 6vw, 96px);
          align-items: end;
          margin: 0 auto;
        }

        /* Open the rhythm above the heading (global eyebrow margin is 14px). */
        #main-content .trust-showcase__header .cr-eyebrow {
          margin-bottom: 30px !important;
        }

        .trust-showcase__header .cr-eyebrow {
          grid-column: 1 / -1;
        }

        .trust-showcase__header h2 {
          text-wrap: balance;
        }

        .trust-showcase__copy {
          max-width: 40ch;
          margin: 0 0 0.4em;
          padding-bottom: 0.2em;
          text-wrap: pretty;
        }

        /* ---------- Logo marquee ---------- */

        .trust-showcase__logos-block {
          margin-top: clamp(80px, 8.5vw, 128px);
        }

        .trust-showcase .client-logos {
          position: relative;
          display: flex;
          width: 100%;
          height: 96px;
          align-items: center;
          overflow: hidden;
          border-top: 1px solid rgba(17, 17, 17, 0.08);
          border-bottom: 1px solid rgba(17, 17, 17, 0.08);
          mask-image: linear-gradient(
            to right,
            transparent 0,
            #000 clamp(42px, 7vw, 110px),
            #000 calc(100% - clamp(42px, 7vw, 110px)),
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0,
            #000 clamp(42px, 7vw, 110px),
            #000 calc(100% - clamp(42px, 7vw, 110px)),
            transparent 100%
          );
        }

        .trust-showcase .client-logo-track {
          display: flex;
          width: max-content;
          align-items: center;
          animation: trust-logo-flow 30s linear infinite;
          animation-play-state: paused;
          will-change: transform;
        }

        .trust-showcase.is-logo-active .client-logo-track {
          animation-play-state: running;
        }

        .trust-showcase .client-logo-group {
          display: flex;
          flex-shrink: 0;
          align-items: center;
          gap: clamp(56px, 6vw, 104px);
          padding-inline: clamp(28px, 4vw, 52px);
        }

        .trust-showcase .client-logo-item {
          display: grid;
          width: clamp(128px, 10vw, 176px);
          height: 56px;
          flex-shrink: 0;
          place-items: center;
        }

        .trust-showcase .client-logo-item img {
          display: block;
          width: 100%;
          max-width: 156px;
          max-height: 38px;
          object-fit: contain;
          filter: grayscale(1) contrast(0.95) brightness(0.82);
          opacity: 0.72;
          transition:
            opacity 200ms ease,
            filter 200ms ease;
        }

        @keyframes trust-logo-flow {
          from {
            transform: translate3d(0, 0, 0);
          }
          to {
            transform: translate3d(-50%, 0, 0);
          }
        }

        @media (hover: hover) and (pointer: fine) {
          .trust-showcase .client-logos:hover .client-logo-track {
            animation-play-state: paused;
          }

          .trust-showcase .client-logo-item:hover img {
            opacity: 0.9;
            filter: grayscale(0.1) saturate(0.9);
          }
        }

        /* ---------- Responsive ---------- */

        @media (max-width: 700px) {
          .trust-showcase {
            padding: 64px 0 46px;
          }

          .trust-showcase__header {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .trust-showcase__copy {
            margin: 0;
          }

          .trust-showcase__logos-block {
            margin-top: 40px;
          }

          .trust-showcase .client-logos {
            height: 72px;
            mask-image: linear-gradient(
              to right,
              transparent 0,
              #000 22px,
              #000 calc(100% - 22px),
              transparent 100%
            );
            -webkit-mask-image: linear-gradient(
              to right,
              transparent 0,
              #000 22px,
              #000 calc(100% - 22px),
              transparent 100%
            );
          }

          .trust-showcase .client-logo-group {
            gap: 40px;
            padding-inline: 20px;
          }

          .trust-showcase .client-logo-item {
            width: 108px;
            height: 44px;
          }

          .trust-showcase .client-logo-item img {
            max-width: 100px;
            max-height: 28px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .trust-showcase .client-logo-track {
            animation: none !important;
          }

          .trust-showcase .section-heading-fill {
            color: inherit;
            background-image: none;
          }

          .trust-showcase [data-cm-intro] {
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}
