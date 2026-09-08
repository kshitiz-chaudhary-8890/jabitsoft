import { Fragment, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";

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

export function Hero({ media }) {
  const heroRef = useRef(null);

  useLayoutEffect(() => {
    const hero = heroRef.current;
    if (!hero) return undefined;

    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    const nav = document.querySelector(".site-nav");
    const chars = hero.querySelectorAll(".hero-reveal-char");
    const inlineImages = hero.querySelectorAll(".inline-image");
    const founderProof = hero.querySelector(".founder-proof");
    const copy = hero.querySelector(".hero-reference-copy");
    const cta = hero.querySelector(".hero-reference-cta");

    if (reducedMotion) {
      gsap.set([nav, chars, inlineImages, founderProof, copy, cta], {
        clearProps: "all",
      });
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.set(nav, {
        opacity: 0,
        y: -14,
      });

      gsap.set(chars, {
        opacity: 0,
        x: 11,
        y: 6,
        filter: "blur(9px)",
        force3D: true,
      });

      gsap.set(inlineImages, {
        opacity: 0,
        y: 9,
        scale: 0.84,
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
          ease: "power3.out",
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
            x: 0,
            y: 0,
            filter: "blur(0px)",
            duration: 0.62,
            stagger: {
              each: 0.022,
              from: "start",
            },
            clearProps: "filter",
          },
          0.22,
        )
        .to(
          inlineImages,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.54,
            stagger: 0.22,
          },
          0.72,
        )
        .to(
          founderProof,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
          },
          1.48,
        )
        .to(
          copy,
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
          },
          1.82,
        )
        .to(
          cta,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
          },
          2.02,
        );
    }, hero);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        className="hero hero-reference"
        id="top"
        aria-labelledby="hero-title"
        ref={heroRef}
      >
        <div className="hero-aurora" aria-hidden="true">
          <div className="hero-aurora__layer" />
        </div>

        <div className="shader-frame" aria-hidden="true" />

        <div className="founder-proof">
          <span className="avatar-stack" aria-hidden="true">
            {media.founders.map((src) => (
              <img src={src} alt="" key={src} />
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
              <img src={media.heroSoftware} alt="" />
            </span>{" "}
            <HeroAnimatedText text="Build" />
          </span>

          <span className="hero-line" aria-hidden="true">
            <HeroAnimatedText text="Reliable" />{" "}
            <span className="inline-image hero-image-wide">
              <img src={media.heroBusiness} alt="" />
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
              <img src={media.heroGlobal} alt="" />
            </span>{" "}
            <HeroAnimatedText text="Worldwide" />
          </span>
        </h1>

        <p className="hero-reference-copy">
          Our engineers build web platforms and cloud systems
          <br className="hero-copy-break" /> that support business growth.
        </p>

        <a className="button button-dark hero-reference-cta" href="#contact">
          View Plans {"→"}
        </a>

        <style>{`
          /*
           * Hero-only Aurora background.
           * It is deliberately CSS-only so no second animation library or
           * additional scroll system is introduced.
           */
          .hero-reference {
            position: relative;
            isolation: isolate;
            overflow: hidden;
          }

          .hero-aurora {
            position: absolute;
            inset: 0;
            z-index: 0;
            overflow: hidden;
            pointer-events: none;
          }

          .hero-aurora__layer {
            position: absolute;
            inset: -18%;
            opacity: 0.4;
            filter: blur(19px) saturate(112%);
            transform: translate3d(0, 0, 0);
            will-change: background-position;
            background-image:
              repeating-linear-gradient(
                100deg,
                rgba(255, 255, 255, 0.94) 0%,
                rgba(255, 255, 255, 0.94) 7%,
                transparent 10%,
                transparent 12%,
                rgba(255, 255, 255, 0.94) 16%
              ),
              repeating-linear-gradient(
                100deg,
                rgba(59, 130, 246, 0.72) 10%,
                rgba(165, 180, 252, 0.64) 15%,
                rgba(147, 197, 253, 0.72) 20%,
                rgba(221, 214, 254, 0.56) 25%,
                rgba(96, 165, 250, 0.72) 30%
              );
            background-size: 300% 200%, 200% 100%;
            background-position: 50% 50%, 50% 50%;
            -webkit-mask-image: radial-gradient(
              ellipse at 82% 8%,
              #000 8%,
              rgba(0, 0, 0, 0.9) 25%,
              rgba(0, 0, 0, 0.5) 49%,
              transparent 73%
            );
            mask-image: radial-gradient(
              ellipse at 82% 8%,
              #000 8%,
              rgba(0, 0, 0, 0.9) 25%,
              rgba(0, 0, 0, 0.5) 49%,
              transparent 73%
            );
            animation: hero-aurora-drift 60s linear infinite;
          }

          .hero-aurora__layer::after {
            content: "";
            position: absolute;
            inset: 0;
            opacity: 0.58;
            background-image:
              repeating-linear-gradient(
                100deg,
                rgba(255, 255, 255, 0.96) 0%,
                rgba(255, 255, 255, 0.96) 7%,
                transparent 10%,
                transparent 12%,
                rgba(255, 255, 255, 0.96) 16%
              ),
              repeating-linear-gradient(
                100deg,
                rgba(37, 99, 235, 0.44) 10%,
                rgba(129, 140, 248, 0.38) 15%,
                rgba(96, 165, 250, 0.44) 20%,
                rgba(196, 181, 253, 0.34) 25%,
                rgba(59, 130, 246, 0.4) 30%
              );
            background-size: 200% 100%, 200% 100%;
            background-position: 50% 50%, 50% 50%;
            mix-blend-mode: multiply;
            animation: hero-aurora-drift 60s linear infinite reverse;
          }

          .hero-reference > .shader-frame {
            z-index: 1;
          }

          .hero-reference > .founder-proof,
          .hero-reference > h1,
          .hero-reference > .hero-reference-copy,
          .hero-reference > .hero-reference-cta {
            position: relative;
            z-index: 2;
          }

          .hero-reveal-word {
            display: inline-block;
            white-space: nowrap;
          }

          .hero-reveal-char {
            display: inline-block;
            will-change: transform, opacity, filter;
          }

          @keyframes hero-aurora-drift {
            from {
              background-position: 50% 50%, 50% 50%;
            }
            to {
              background-position: 350% 50%, 350% 50%;
            }
          }

          @media (max-width: 768px) {
            .hero-aurora__layer {
              inset: -10%;
              opacity: 0.28;
              filter: blur(22px) saturate(104%);
              -webkit-mask-image: radial-gradient(
                ellipse at 74% 8%,
                #000 8%,
                rgba(0, 0, 0, 0.72) 36%,
                transparent 75%
              );
              mask-image: radial-gradient(
                ellipse at 74% 8%,
                #000 8%,
                rgba(0, 0, 0, 0.72) 36%,
                transparent 75%
              );
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .hero-aurora__layer,
            .hero-aurora__layer::after {
              animation: none !important;
            }

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
          <img src={media.showcase} alt="A showcase of selected JabitSoft projects" />
        </div>
      </section>
    </>
  );
}