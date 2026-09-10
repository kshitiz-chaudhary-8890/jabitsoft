"use client";

import { Fragment, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HillsBackground from "../../../three/HillsBackground/HillsBackground.jsx";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const media = {
  founders: [
    "https://framerusercontent.com/images/LdiJIgo7vhBde0WiWHd48uSzxU.png?height=512&width=512",
    "https://framerusercontent.com/images/I9yoNS4RgoWEeRpJDtgEIoLAd4Y.png?height=512&width=512",
    "https://framerusercontent.com/images/G5E86VA7DStEga3pPtCu3nwW1qE.png?height=512&width=512",
  ],
  heroSoftware:
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=85",
  heroBusiness:
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=500&q=85",
  heroGlobal:
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=500&q=85",
  showcase:
    "https://framerusercontent.com/images/dT5S1njJpyHvznBNeTmMAwfBcqQ.png?height=1604&width=2848",
};

function Arrow({ left = false }) {
  return (
    <span className="arrow-icon" aria-hidden="true">
      {left ? "←" : "→"}
    </span>
  );
}

function HeroAnimatedText({ text }) {
  const words = text.split(" ");

  return words.map((word, wordIndex) => (
    <Fragment key={`${word}-${wordIndex}`}>
      <span className="hero-reveal-word">
        {Array.from(word).map((char, charIndex) => (
          <span className="hero-reveal-char" key={`${wordIndex}-${charIndex}`}>
            {char}
          </span>
        ))}
      </span>
      {wordIndex < words.length - 1 ? " " : null}
    </Fragment>
  ));
}

export default function Hero() {
  const heroRef = useRef(null);

  useLayoutEffect(() => {
    const hero = heroRef.current;
    if (!hero) return undefined;

    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    const nav = document.querySelector(".site-nav");
    const chars = hero.querySelectorAll(".hero-reveal-char");
    const inlineImages = hero.querySelectorAll(".inline-image");
    const founderProof = hero.querySelector(".founder-proof");
    const headline = hero.querySelector("h1");
    const copy = hero.querySelector(".hero-reference-copy");
    const cta = hero.querySelector(".hero-reference-cta");
    const hills = hero.querySelector(".hero-hills-layer");

    if (reducedMotion) {
      gsap.set([nav, chars, inlineImages, founderProof, copy, cta], {
        clearProps: "all",
      });
      return undefined;
    }

    const ctx = gsap.context(() => {
      /*
       * Page-load entrance only.
       * No ScrollTrigger / pin / scrub is used here.
       * The timings are intentionally a little slower so the reveal feels
       * closer to the supplied reference instead of rushing through the hero.
       */
      gsap.set(nav, {
        opacity: 0,
        y: -14,
      });

      gsap.set(chars, {
        opacity: 0,
        yPercent: 118,
        rotateX: -24,
        transformOrigin: "50% 100%",
        force3D: true,
      });

      gsap.set(inlineImages, {
        opacity: 0,
        yPercent: 32,
        scale: 0.72,
        clipPath: "inset(48% 48% 48% 48% round 999px)",
        transformOrigin: "50% 50%",
        force3D: true,
      });

      gsap.set(founderProof, {
        opacity: 0,
        y: 12,
      });

      gsap.set(copy, {
        opacity: 0,
        y: 17,
      });

      gsap.set(cta, {
        opacity: 0,
        y: 14,
        scale: 0.98,
        transformOrigin: "50% 50%",
      });

      const tl = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      tl.to(
        nav,
        {
          opacity: 1,
          y: 0,
          duration: 0.68,
        },
        0.05,
      )
        .to(
          chars,
          {
            opacity: 1,
            yPercent: 0,
            rotateX: 0,
            duration: 0.78,
            stagger: {
              each: 0.014,
              from: "start",
            },
            clearProps: "transform",
          },
          0.18,
        )
        .to(
          inlineImages,
          {
            opacity: 1,
            yPercent: 0,
            scale: 1,
            clipPath: "inset(0% 0% 0% 0% round 999px)",
            duration: 0.72,
            stagger: 0.16,
            clearProps: "clipPath",
          },
          0.48,
        )
        .to(
          founderProof,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
          },
          0.9,
        )
        .to(
          copy,
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
          },
          1.04,
        )
        .to(
          cta,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
          },
          1.16,
        );

      gsap
        .timeline({
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 0.85,
            invalidateOnRefresh: true,
          },
          defaults: { ease: "none" },
        })
        .to(hills, { yPercent: 5, scale: 1.065 }, 0)
        .to(headline, { yPercent: -7, opacity: 0.28 }, 0)
        .to(founderProof, { yPercent: -20, opacity: 0 }, 0)
        .to(copy, { yPercent: -14, opacity: 0 }, 0)
        .to(cta, { yPercent: -18, opacity: 0 }, 0);
    }, hero);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section className="hero hero-reference" id="top" aria-labelledby="hero-title" ref={heroRef}>
        <HillsBackground />

        <div className="founder-proof">
          <span className="avatar-stack" aria-hidden="true">
            {media.founders.map((src) => (
              <img src={src} alt="" width="512" height="512" decoding="async" key={src} />
            ))}
          </span>
          <span>Trusted by founders.</span>
        </div>

        <h1
          id="hero-title"
          aria-label="Our Engineers Build Reliable Software for Growing Businesses Worldwide"
        >
          <span className="hero-line" aria-hidden="true">
            <b>
              <HeroAnimatedText text="Our Engineers" />
            </b>{" "}
            <span className="inline-image hero-image-round">
              <img src={media.heroSoftware} alt="" width="400" height="400" decoding="async" />
            </span>{" "}
            <HeroAnimatedText text="Build" />
          </span>

          <span className="hero-line" aria-hidden="true">
            <HeroAnimatedText text="Reliable" />{" "}
            <span className="inline-image hero-image-wide">
              <img src={media.heroBusiness} alt="" width="500" height="320" decoding="async" />
            </span>{" "}
            <em>
              <HeroAnimatedText text="Software" />
            </em>{" "}
            <b>
              <HeroAnimatedText text="for" />
            </b>
          </span>

          <span className="hero-line" aria-hidden="true">
            <HeroAnimatedText text="Growing Businesses" />{" "}
            <span className="inline-image hero-image-wide">
              <img src={media.heroGlobal} alt="" width="500" height="320" decoding="async" />
            </span>{" "}
            <HeroAnimatedText text="Worldwide" />
          </span>
        </h1>

        <p className="hero-reference-copy">
          Our engineers build web platforms and cloud systems
          <br className="hero-copy-break" /> that support business growth.
        </p>

        <a className="button button-dark hero-reference-cta" href="#contact">
          View Plans <Arrow />
        </a>

        <style>{`
          /* Responsive hills-aware Hero composition. Existing font/content/GSAP stay intact. */
          .hero-reference {
            position: relative;
            isolation: isolate;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 100%;
            min-height: clamp(640px, calc(100svh - 96px), 820px);
            padding: clamp(64px, 8vh, 96px) clamp(20px, 4vw, 72px) clamp(52px, 6vh, 72px);
            box-sizing: border-box;
            text-align: center;
          }

          .hero-reference > .hero-hills-layer {
            position: absolute;
            inset: 0;
            z-index: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
          }

          .hero-reference > .founder-proof,
          .hero-reference > h1,
          .hero-reference > .hero-reference-copy,
          .hero-reference > .hero-reference-cta {
            position: relative;
            z-index: 2;
            margin-left: auto;
            margin-right: auto;
          }

          .hero-reference .founder-proof {
            width: fit-content;
            max-width: 100%;
            margin-top: 0;
            margin-bottom: clamp(26px, 3.4vh, 36px);
            padding: 8px 13px 8px 9px;
            border: 1px solid rgba(21, 25, 31, 0.08);
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.74);
            box-shadow: 0 8px 28px rgba(20, 26, 38, 0.055);
            -webkit-backdrop-filter: blur(10px);
            backdrop-filter: blur(10px);
            color: rgba(32, 38, 47, 0.72);
          }

          .hero-reference .founder-proof .avatar-stack img {
            border-color: rgba(255, 255, 255, 0.94);
            box-shadow: 0 2px 8px rgba(17, 24, 39, 0.08);
          }

          /* Smaller, more controlled headline so the full composition stays centered. */
          .hero-reference h1 {
            width: min(1120px, 100%);
            max-width: 1120px;
            margin-top: 0;
            margin-bottom: 0;
            color: #171a1f;
            font-size: clamp(48px, 4.15vw, 68px);
            line-height: 1.035;
            letter-spacing: -0.025em;
            text-wrap: balance;
            text-align: center;
            text-shadow: 0 1px 12px rgba(255, 255, 255, 0.74);
          }

          .hero-reference .hero-line {
            display: block;
            width: 100%;
            white-space: nowrap;
            text-align: center;
          }

          .hero-reference .hero-line b {
            color: #555d68;
            font-weight: 400;
          }

          .hero-reference h1 em {
            color: #4d5fa8;
            font-style: normal;
            font-weight: 400;
          }

          .hero-reference .inline-image {
            width: clamp(66px, 4.8vw, 82px);
            height: clamp(52px, 3.9vw, 66px);
            margin-inline: 4px;
            vertical-align: -0.13em;
            border: 1px solid rgba(255, 255, 255, 0.92);
            box-shadow: 0 7px 22px rgba(23, 31, 43, 0.09);
          }

          .hero-reference .hero-image-round {
            width: clamp(54px, 4vw, 66px);
            height: clamp(54px, 4vw, 66px);
          }

          .hero-reference > .hero-reference-copy {
            width: min(610px, 100%);
            max-width: 610px;
            margin-top: clamp(24px, 3.2vh, 30px);
            margin-bottom: clamp(24px, 3vh, 30px);
            color: #555d68;
            font-size: clamp(16px, 1.05vw, 18px);
            line-height: 1.5;
            letter-spacing: -0.01em;
            text-align: center;
            text-shadow: 0 1px 10px rgba(255, 255, 255, 0.92);
          }

          .hero-reference > .hero-reference-cta {
            min-width: 160px;
            min-height: 50px;
            border: 1px solid rgba(255, 255, 255, 0.18);
            border-radius: 999px;
            background: rgba(23, 27, 34, 0.96);
            box-shadow: 0 12px 30px rgba(17, 24, 39, 0.15);
            -webkit-backdrop-filter: blur(8px);
            backdrop-filter: blur(8px);
          }

          .hero-reference > .hero-reference-cta:hover {
            transform: translateY(-1px);
            box-shadow: 0 16px 36px rgba(17, 24, 39, 0.19);
          }

          .hero-reveal-word {
            display: inline-block;
            overflow: hidden;
            vertical-align: bottom;
            white-space: nowrap;
          }

          .hero-reveal-char {
            display: inline-block;
            will-change: transform, opacity;
            backface-visibility: hidden;
          }

          /* Large laptop / small desktop */
          @media (max-width: 1280px) {
            .hero-reference {
              min-height: clamp(620px, calc(100svh - 92px), 780px);
              padding-inline: clamp(32px, 4vw, 52px);
            }

            .hero-reference h1 {
              width: min(1000px, 100%);
              font-size: clamp(46px, 4.75vw, 60px);
            }
          }

          /* Tablet */
          @media (max-width: 1024px) {
            .hero-reference {
              min-height: calc(100svh - 88px);
              padding: clamp(58px, 7vh, 76px) clamp(26px, 3.4vw, 36px) clamp(48px, 6vh, 62px);
            }

            .hero-reference h1 {
              width: min(900px, 100%);
              font-size: clamp(42px, 5.35vw, 54px);
              line-height: 1.05;
              letter-spacing: -0.022em;
            }

            .hero-reference .founder-proof {
              margin-bottom: 28px;
            }

            .hero-reference > .hero-reference-copy {
              width: min(560px, 100%);
              margin-top: 25px;
              margin-bottom: 26px;
              font-size: 16.5px;
            }

            .hero-reference .inline-image {
              width: clamp(58px, 6.3vw, 70px);
              height: clamp(46px, 5vw, 56px);
            }

            .hero-reference .hero-image-round {
              width: clamp(48px, 5.5vw, 56px);
              height: clamp(48px, 5.5vw, 56px);
            }
          }

          /* Narrow tablet */
          @media (max-width: 820px) {
            .hero-reference {
              padding-inline: 24px;
            }

            .hero-reference h1 {
              width: min(740px, 100%);
              font-size: clamp(40px, 5.8vw, 47px);
            }
          }

          /* Mobile */
          @media (max-width: 700px) {
            .hero-reference {
              min-height: calc(100svh - 76px);
              padding: clamp(48px, 7vh, 64px) 20px clamp(42px, 6vh, 54px);
            }

            .hero-reference .founder-proof {
              margin-bottom: 24px;
              padding: 7px 11px 7px 8px;
              font-size: 13px;
            }

            .hero-reference h1 {
              width: min(560px, 100%);
              font-size: clamp(34px, 9.2vw, 44px);
              line-height: 1.065;
              letter-spacing: -0.02em;
              text-shadow: 0 1px 10px rgba(255, 255, 255, 0.84);
            }

            .hero-reference .hero-line {
              white-space: normal;
            }

            .hero-reference .inline-image {
              width: 1.12em;
              height: 0.82em;
              margin-inline: 2px;
              vertical-align: -0.12em;
            }

            .hero-reference .hero-image-round {
              width: 0.84em;
              height: 0.84em;
            }

            .hero-reference > .hero-reference-copy {
              width: min(430px, 100%);
              margin-top: 23px;
              margin-bottom: 25px;
              padding-inline: 2px;
              font-size: 15px;
              line-height: 1.5;
            }

            .hero-reference > .hero-reference-cta {
              min-width: 150px;
              min-height: 48px;
              font-size: 14px;
            }
          }

          @media (max-width: 430px) {
            .hero-reference {
              padding-inline: 18px;
            }

            .hero-reference h1 {
              width: 100%;
              font-size: clamp(31px, 8.6vw, 37px);
              line-height: 1.075;
            }

            .hero-reference .founder-proof {
              margin-bottom: 22px;
            }

            .hero-reference > .hero-reference-copy {
              font-size: 14.5px;
            }
          }

          @media (max-width: 360px) {
            .hero-reference {
              padding-inline: 16px;
            }

            .hero-reference h1 {
              font-size: 30px;
              line-height: 1.08;
            }

            .hero-reference > .hero-reference-copy {
              font-size: 14px;
            }
          }

          /* Short-height devices: keep the composition centered without wasting a screen. */
          @media (max-height: 680px) {
            .hero-reference {
              min-height: calc(100svh - 72px);
              padding-top: 42px;
              padding-bottom: 38px;
            }

            .hero-reference .founder-proof {
              margin-bottom: 20px;
            }

            .hero-reference > .hero-reference-copy {
              margin-top: 20px;
              margin-bottom: 21px;
            }
          }

          /* Mobile spacing refinement: keep the composition balanced while letting
             the showcase follow the CTA naturally instead of reserving empty viewport height. */
          @media (max-width: 700px) {
            .hero-reference {
              min-height: 0;
              padding: clamp(72px, 12svh, 108px) 20px 32px;
              justify-content: flex-start;
            }

            .hero-reference .founder-proof {
              gap: 8px;
              margin-top: 0;
              margin-bottom: 18px;
              padding: 6px 10px 6px 7px;
              font-size: 12px;
              line-height: 1.2;
            }

            .hero-reference .founder-proof .avatar-stack img {
              width: 28px;
              height: 28px;
              margin-left: -7px;
              border-width: 1.5px;
            }

            .hero-reference h1 {
              width: min(100%, 560px);
              font-size: clamp(32px, 8.9vw, 42px);
              line-height: 1.045;
              letter-spacing: -0.024em;
            }

            .hero-reference .hero-line {
              max-width: 100%;
              white-space: normal;
            }

            .hero-reference .inline-image {
              width: 1.02em;
              height: 0.72em;
              margin-inline: 1px;
              vertical-align: -0.08em;
            }

            .hero-reference .hero-image-round {
              width: 0.76em;
              height: 0.76em;
            }

            .hero-reference > .hero-reference-copy {
              width: min(34ch, 100%);
              margin-top: 18px;
              margin-bottom: 20px;
              padding-inline: 0;
              font-size: 14px;
              line-height: 1.42;
            }

            .hero-reference > .hero-reference-cta {
              min-width: 142px;
              min-height: 46px;
              padding-inline: 20px;
              font-size: 13px;
            }
          }

          @media (max-width: 430px) {
            .hero-reference {
              min-height: 0;
              padding: clamp(74px, 12.5svh, 106px) 16px 30px;
            }

            .hero-reference .founder-proof {
              margin-bottom: 17px;
              font-size: 11.5px;
            }

            .hero-reference .founder-proof .avatar-stack img {
              width: 27px;
              height: 27px;
            }

            .hero-reference h1 {
              width: 100%;
              max-width: 390px;
              font-size: clamp(30px, 8.35vw, 34px);
              line-height: 1.05;
              letter-spacing: -0.026em;
            }

            .hero-reference > .hero-reference-copy {
              width: min(32ch, 100%);
              margin-top: 17px;
              margin-bottom: 19px;
              font-size: 13.5px;
              line-height: 1.4;
            }
          }

          @media (max-width: 360px) {
            .hero-reference {
              min-height: 0;
              padding: clamp(62px, 10.5svh, 88px) 15px 28px;
            }

            .hero-reference .founder-proof {
              margin-bottom: 15px;
              padding: 5px 9px 5px 6px;
              font-size: 11px;
            }

            .hero-reference .founder-proof .avatar-stack img {
              width: 25px;
              height: 25px;
              margin-left: -6px;
            }

            .hero-reference h1 {
              max-width: 340px;
              font-size: 29px;
              line-height: 1.045;
            }

            .hero-reference > .hero-reference-copy {
              width: min(31ch, 100%);
              margin-top: 15px;
              margin-bottom: 17px;
              font-size: 13px;
              line-height: 1.38;
            }

            .hero-reference > .hero-reference-cta {
              min-width: 136px;
              min-height: 44px;
              font-size: 12.5px;
            }
          }

          @media (max-width: 340px) {
            .hero-reference h1 {
              font-size: 27.5px;
            }
          }

          /* Short phones need tighter vertical rhythm without clipping the CTA. */
          @media (max-width: 700px) and (max-height: 680px) {
            .hero-reference {
              min-height: 0;
              padding-top: clamp(46px, 8svh, 62px);
              padding-bottom: 24px;
            }

            .hero-reference .founder-proof {
              margin-bottom: 14px;
            }

            .hero-reference > .hero-reference-copy {
              margin-top: 14px;
              margin-bottom: 16px;
            }
          }

          /* Tablet/mobile showcase spacing fix.
             Desktop keeps the sticky scale story. Tablet/mobile use natural flow so
             the old +42vh showcase spacer cannot create a huge blank area. */
          @media (max-width: 1024px) {
            .showcase {
              height: auto !important;
              min-height: 0 !important;
              margin-top: 12px;
              margin-bottom: 0 !important;
              padding-bottom: 0 !important;
            }

            .showcase-inner {
              position: relative !important;
              top: auto !important;
              min-height: 0 !important;
            }
          }

          @media (max-width: 700px) {
            .showcase {
              margin-top: 8px;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .hero-reveal-char,
            .hero-reference .inline-image,
            .hero-reference .founder-proof,
            .hero-reference-copy,
            .hero-reference-cta {
              opacity: 1 !important;
              transform: none !important;
              filter: none !important;
            }
          }
        `}</style>
      </section>

      <section
        className="showcase shell"
        aria-label="Selected design showcase"
        data-scroll-scale="gsap"
      >
        <div className="showcase-inner">
          <img
            src={media.showcase}
            alt="Selected web, mobile and software projects delivered by JabitSoft"
            width="2848"
            height="1604"
            loading="lazy"
            decoding="async"
          />
        </div>
      </section>
    </>
  );
}
