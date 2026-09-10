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

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduced) return undefined;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => section.classList.add("is-logo-active"),
        onEnterBack: () => section.classList.add("is-logo-active"),
        onLeave: () => section.classList.remove("is-logo-active"),
        onLeaveBack: () => section.classList.remove("is-logo-active"),
      });

      const introTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      introTimeline
        .fromTo(
          ".trust-showcase__proof",
          { y: 28, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.62 },
        )
        .fromTo(
          ".trust-showcase__copy",
          { y: 34, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.72 },
          0.18,
        )
        .fromTo(
          ".trust-showcase__button",
          { y: 24, autoAlpha: 0, scale: 0.975 },
          { y: 0, autoAlpha: 1, scale: 1, duration: 0.58 },
          0.34,
        )
        .fromTo(
          ".trust-showcase__logos-label",
          { y: 18, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.5 },
          0.42,
        )
        .fromTo(
          ".client-logo-item",
          { y: 26, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.54,
            stagger: { each: 0.035, from: "center" },
          },
          0.48,
        );

      gsap.to(".trust-showcase__decor--left", {
        yPercent: -16,
        rotation: 2,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.9,
        },
      });

      gsap.to(".trust-showcase__decor--right", {
        yPercent: 16,
        rotation: -2,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.9,
        },
      });

      const headingFill = section.querySelector(".section-heading-fill");
      if (headingFill) {
        gsap.fromTo(
          headingFill,
          { backgroundSize: "100% 100%, 0% 100%" },
          {
            backgroundSize: "100% 100%, 100% 100%",
            ease: "none",
            scrollTrigger: {
              trigger: headingFill,
              start: "top 92%",
              end: "top 38%",
              scrub: 0.7,
              invalidateOnRefresh: true,
            },
          }
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
      <div className="trust-showcase__decor trust-showcase__decor--left" aria-hidden="true">
        <span />
        <i />
        <i />
        <i />
        <i />
      </div>

      <div className="trust-showcase__decor trust-showcase__decor--right" aria-hidden="true">
        <span />
        <i />
        <i />
        <i />
        <i />
      </div>

      <div className="trust-showcase__inner shell">
        <div className="trust-showcase__proof" aria-label="Trusted by growing teams">
          <div className="trust-showcase__proof-mark" aria-hidden="true">
            <span>J</span>
            <span>+</span>
            <span>↗</span>
          </div>
          <strong>Trusted by growing teams</strong>
          <i aria-hidden="true" />
          <span>Technology built for real business momentum</span>
        </div>

        <header className="trust-showcase__header">
          <h2
            id="client-logos-title"
            className="trust-showcase__title"
            aria-label="Trusted by teams building what's next"
          >
            <span className="section-heading-fill">
              Trusted by teams building what&apos;s next
            </span>
          </h2>

          <p className="trust-showcase__copy">
            We help growing businesses turn complex ideas into reliable digital
            products and systems — with clarity from decision to delivery.
          </p>

          <a className="button button-dark trust-showcase__button" href="#works">
            Explore our work <span aria-hidden="true">→</span>
          </a>
        </header>

        <div className="trust-showcase__logos-block">
          <p className="trust-showcase__logos-label">BRANDS WE WORK WITH</p>

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
                      <img
                        src={logo}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                      />
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
          padding: clamp(86px, 8.6vw, 136px) 0 clamp(58px, 6vw, 92px);
          background: #ffffff;
          color: #151922;
        }

        .trust-showcase__inner {
          position: relative;
          z-index: 2;
        }

        .trust-showcase__proof {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin: 0 auto 22px;
          color: #596170;
          font-size: 13px;
          line-height: 1.3;
          text-align: center;
        }

        .trust-showcase__proof strong {
          color: #343a44;
          font-weight: 650;
        }

        .trust-showcase__proof > i {
          width: 1px;
          height: 22px;
          background: rgba(21, 25, 34, 0.14);
        }

        .trust-showcase__proof-mark {
          display: flex;
          align-items: center;
        }

        .trust-showcase__proof-mark span {
          display: grid;
          width: 28px;
          height: 28px;
          place-items: center;
          margin-left: -6px;
          border: 2px solid #fff;
          border-radius: 50%;
          background: #eef3fb;
          color: #506784;
          font-size: 9px;
          font-weight: 750;
          box-shadow: 0 4px 12px rgba(21, 25, 34, 0.06);
        }

        .trust-showcase__proof-mark span:first-child {
          margin-left: 0;
          background: #e8efff;
          color: #5569c4;
        }

        .trust-showcase__proof-mark span:nth-child(2) {
          background: #f1f4f8;
          color: #58606c;
        }

        .trust-showcase__proof-mark span:nth-child(3) {
          background: #eaf7fb;
          color: #347d98;
        }

        .trust-showcase__header {
          max-width: 760px;
          margin: 0 auto;
          text-align: center;
        }

        .trust-showcase__title {
          max-width: 760px;
          margin: 0 auto;
          color: #151922;
          font-size: clamp(46px, 4.7vw, 72px);
          font-weight: 700;
          line-height: 0.98;
          letter-spacing: -0.055em;
          text-wrap: balance;
        }

        .trust-showcase__copy {
          max-width: 650px;
          margin: 22px auto 0;
          color: #707782;
          font-size: clamp(15px, 1.2vw, 18px);
          line-height: 1.65;
          text-wrap: balance;
        }

        .trust-showcase__button {
          margin-top: 28px;
          text-decoration: none;
        }

        .trust-showcase__button span {
          display: inline-block;
          transition: transform 180ms ease;
        }

        .trust-showcase__button:hover span {
          transform: translateX(3px);
        }

        .trust-showcase__logos-block {
          margin-top: clamp(72px, 7vw, 108px);
        }

        .trust-showcase__logos-label {
          margin: 0 0 24px;
          color: #969da7;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-align: center;
        }

        .trust-showcase .client-logos {
          position: relative;
          display: flex;
          width: 100%;
          height: 68px;
          align-items: center;
          overflow: hidden;
          background: transparent;
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
          animation: trust-logo-flow 34s linear infinite;
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
          gap: clamp(56px, 7vw, 116px);
          padding-inline: clamp(28px, 4vw, 62px);
        }

        .trust-showcase .client-logo-item {
          display: grid;
          width: clamp(108px, 9vw, 150px);
          height: 42px;
          flex-shrink: 0;
          place-items: center;
        }

        .trust-showcase .client-logo-item img {
          display: block;
          width: 100%;
          max-width: 138px;
          max-height: 28px;
          object-fit: contain;
          filter: grayscale(1) contrast(0.92) brightness(0.88);
          opacity: 0.58;
          transition:
            opacity 180ms ease,
            filter 180ms ease,
            transform 180ms ease;
        }

        .trust-showcase__decor {
          position: absolute;
          z-index: 1;
          top: 128px;
          width: 130px;
          height: 230px;
          opacity: 0.32;
          pointer-events: none;
        }

        .trust-showcase__decor--left {
          left: clamp(22px, 8vw, 150px);
          transform: rotate(-7deg);
        }

        .trust-showcase__decor--right {
          right: clamp(22px, 8vw, 150px);
          transform: scaleX(-1) rotate(-7deg);
        }

        .trust-showcase__decor > span {
          position: absolute;
          left: 48%;
          top: 4px;
          width: 1px;
          height: 210px;
          transform: rotate(-17deg);
          transform-origin: top center;
          background: linear-gradient(
            to bottom,
            rgba(85, 105, 196, 0),
            rgba(85, 105, 196, 0.16),
            rgba(85, 105, 196, 0)
          );
        }

        .trust-showcase__decor i {
          position: absolute;
          width: 16px;
          height: 31px;
          border-radius: 100% 0 100% 0;
          background: rgba(85, 105, 196, 0.07);
        }

        .trust-showcase__decor i:nth-of-type(1) {
          left: 42px;
          top: 45px;
          transform: rotate(-24deg);
        }

        .trust-showcase__decor i:nth-of-type(2) {
          left: 61px;
          top: 88px;
          transform: rotate(146deg);
        }

        .trust-showcase__decor i:nth-of-type(3) {
          left: 30px;
          top: 126px;
          transform: rotate(-33deg);
        }

        .trust-showcase__decor i:nth-of-type(4) {
          left: 52px;
          top: 164px;
          transform: rotate(145deg);
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
            opacity: 0.82;
            filter: grayscale(0.25) saturate(0.75);
            transform: translateY(-1px);
          }
        }

        /* Preserve the previously tuned showcase → trust spacing on tablets. */
        @media (max-width: 1180px) and (min-width: 701px) {
          .showcase {
            height: auto !important;
            min-height: 0 !important;
            margin-bottom: 0 !important;
            padding-bottom: 0 !important;
          }

          .showcase-inner {
            position: relative !important;
            top: auto !important;
          }

          .trust-showcase {
            padding-top: clamp(56px, 6vw, 72px);
            padding-bottom: 60px;
          }

          .trust-showcase__title {
            font-size: clamp(44px, 5.6vw, 58px);
          }

          .trust-showcase__copy {
            max-width: 600px;
          }

          .trust-showcase__logos-block {
            margin-top: 68px;
          }

          .trust-showcase__decor {
            top: 110px;
            opacity: 0.22;
            transform: scale(0.86);
          }

          .trust-showcase__decor--left {
            left: 18px;
          }

          .trust-showcase__decor--right {
            right: 18px;
            transform: scaleX(-1) scale(0.86) rotate(-7deg);
          }

          .trust-showcase .client-logo-group {
            gap: clamp(44px, 6vw, 72px);
          }
        }

        @media (max-width: 700px) {
          .trust-showcase {
            padding: 64px 0 46px;
          }

          .trust-showcase__proof {
            flex-wrap: wrap;
            gap: 8px 10px;
            width: calc(100% - 36px);
            margin-bottom: 18px;
            font-size: 11px;
          }

          .trust-showcase__proof > i {
            height: 16px;
          }

          .trust-showcase__proof > span {
            flex-basis: 100%;
          }

          .trust-showcase__proof-mark span {
            width: 24px;
            height: 24px;
            font-size: 8px;
          }

          .trust-showcase__header {
            width: calc(100% - 32px);
          }

          .trust-showcase__title {
            font-size: clamp(36px, 10vw, 44px);
            line-height: 1.02;
            letter-spacing: -0.05em;
          }

          .trust-showcase__copy {
            margin-top: 17px;
            font-size: 14px;
            line-height: 1.6;
          }

          .trust-showcase__button {
            margin-top: 22px;
          }

          .trust-showcase__logos-block {
            margin-top: 54px;
          }

          .trust-showcase__logos-label {
            margin-bottom: 16px;
            font-size: 9.5px;
            letter-spacing: 0.13em;
          }

          .trust-showcase .client-logos {
            height: 58px;
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
            gap: 34px;
            padding-inline: 18px;
          }

          .trust-showcase .client-logo-item {
            width: 94px;
            height: 34px;
          }

          .trust-showcase .client-logo-item img {
            max-width: 92px;
            max-height: 22px;
          }

          .trust-showcase__decor {
            display: none;
          }
        }

        @media (max-width: 380px) {
          .trust-showcase {
            padding-top: 58px;
          }

          .trust-showcase__title {
            font-size: 34px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .trust-showcase .client-logo-track {
            animation: none !important;
          }

          .trust-showcase .client-logo-item img,
          .trust-showcase__button span {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}
