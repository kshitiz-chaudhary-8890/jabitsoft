import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const services = [
  {
    number: "01",
    title: "Agentic AI Development",
    count: "04",
    description:
      "Autonomous AI systems that plan, reason, use tools, and execute business workflows with human oversight.",
  },
  {
    number: "02",
    title: "Cloud Consulting",
    count: "05",
    description:
      "Cloud architecture, migration, optimization, and security designed for resilient and scalable operations.",
  },
  {
    number: "03",
    title: "Mobile Application Development",
    count: "04",
    description:
      "High-performance mobile products built for iOS and Android with polished interfaces and reliable integrations.",
  },
  {
    number: "04",
    title: "ERP Services",
    count: "03",
    description:
      "Integrated ERP solutions that connect business processes, automate operations, and improve decision-making.",
  },
  {
    number: "05",
    title: "SEO / Digital Marketing",
    count: "06",
    description:
      "Search and digital growth strategies built around visibility, measurable performance, and qualified traffic.",
  },
  {
    number: "06",
    title: "Website Solutions",
    count: "05",
    description:
      "Fast, scalable web products built with modern frameworks, SSR, and clean design systems.",
  },
];

export default function ServiceDirectory() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduced) return undefined;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
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

      const eyebrow = section.querySelector(".service-directory__eyebrow");
      if (eyebrow) {
        gsap.fromTo(
          eyebrow,
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 86%",
              once: true,
            },
          }
        );
      }

      const intro = section.querySelector(".service-directory__intro");
      if (intro) {
        gsap.fromTo(
          intro,
          { autoAlpha: 0, y: 32 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            delay: 0.14,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 82%",
              once: true,
            },
          }
        );
      }

      const list = section.querySelector(".service-directory__list");
      const rows = list
        ? gsap.utils.toArray(".service-directory__row", list)
        : [];

      if (rows.length) {
        gsap.fromTo(
          rows,
          { autoAlpha: 0, y: 45 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: list,
              start: "top 88%",
              once: true,
            },
          }
        );

        gsap.fromTo(
          gsap.utils.toArray(".service-directory__divider", list),
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: list,
              start: "top 88%",
              once: true,
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="service-directory"
      aria-labelledby="service-directory-title"
    >
      <div className="service-directory__inner">
        <header className="service-directory__header">
          <p className="service-directory__eyebrow">(Services)</p>

          <h2 id="service-directory-title" data-reveal-heading>
            <span className="section-heading-fill">
              What we can build for you
            </span>
          </h2>

          <p className="service-directory__intro">
            From AI and cloud systems to mobile apps and modern web platforms,
            we build reliable digital products for growing businesses.
          </p>
        </header>

        <div className="service-directory__list">
          {services.map((service) => (
            <article
              className="service-directory__row"
              key={service.title}
              tabIndex={0}
            >
              <div className="service-directory__hover-bg" aria-hidden="true" />

              <span className="service-directory__divider" aria-hidden="true" />
              <div className="service-directory__title-wrap">
                <span className="service-directory__number">
                  {service.number}
                </span>

                <h3>{service.title}</h3>

                <sup>({service.count})</sup>
              </div>

              <p className="service-directory__description">
                {service.description}
              </p>
<span className="service-directory__arrow" aria-hidden="true">
                ↗
              </span>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .service-directory,
        .service-directory * {
          box-sizing: border-box;
        }

        .service-directory {
          --service-blue: #0071e3;
          --diagram-accent: #4da3ff;
          position: relative;
          width: 100%;
          padding: clamp(56px, 5.5vw, 84px) 0 clamp(84px, 7vw, 112px);
          overflow: clip;
          background: #ffffff;
          color: #131313;
          font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        .service-directory__inner {
          width: min(1320px, calc(100% - 64px));
          margin: 0 auto;
        }

        .service-directory__header {
          width: 100%;
          margin: 0 0 clamp(42px, 4vw, 56px);
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(320px, .62fr);
          column-gap: clamp(42px, 7vw, 110px);
          row-gap: 14px;
          align-items: end;
          text-align: left;
        }

        .service-directory__eyebrow {
          grid-column: 1 / -1;
          margin: 0;
          font-family: Inter, "DM Sans", -apple-system, BlinkMacSystemFont, sans-serif;
          font-style: normal;
          font-weight: 500;
          font-size: 15px;
          line-height: 23px;
          letter-spacing: normal;
          text-transform: none;
          color: rgb(92, 92, 92);
        }

        .service-directory__header h2 {
          margin: 0;
          max-width: 760px;
          font-family: "Plus Jakarta Sans", Inter, sans-serif;
          font-style: normal;
          font-weight: 700;
          font-size: 50px;
          line-height: 54px;
          letter-spacing: normal;
          color: rgb(19, 19, 19);
          text-wrap: balance;
        }

        .service-directory__intro {
          width: min(520px, 100%);
          margin: 0;
          padding: 0 0 4px;
          font-family: Inter, "DM Sans", -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: 16px;
          line-height: 1.62;
          font-weight: 400;
          color: rgba(17, 17, 17, .54);
        }

        .service-directory__list {
          position: relative;
          border-top: 1px solid rgba(21, 25, 34, .14);
        }

        .service-directory__row {
          position: relative;
          z-index: 1;
          min-height: 148px;
          display: grid;
          grid-template-columns: minmax(430px, 1.08fr) minmax(300px, .72fr) 58px;
          gap: clamp(28px, 4.4vw, 72px);
          align-items: center;
          padding: 30px 16px;
          overflow: hidden;
          outline: none;
          isolation: isolate;
        }

        .service-directory__divider {
          position: absolute;
          z-index: 2;
          right: 0;
          bottom: 0;
          left: 0;
          height: 1px;
          background: rgba(21, 25, 34, .11);
          transform: scaleX(0);
          transform-origin: left center;
          will-change: transform;
          pointer-events: none;
        }

        /*
         * Reference-style hover wipe:
         * a black layer starts at scaleY(0) and opens from the row center.
         * Only transform is animated, keeping the interaction lightweight.
         */
        .service-directory__hover-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background: #000000;
          transform: scaleY(0);
          transform-origin: 50% 50%;
          transition: transform 440ms cubic-bezier(.22, 1, .36, 1);
          will-change: transform;
        }

        .service-directory__title-wrap,
        .service-directory__description,
        .service-directory__arrow {
          position: relative;
          z-index: 1;
        }

        .service-directory__row:focus-visible {
          border-color: rgba(0, 0, 0, .9);
        }

        .service-directory__row:focus-visible .service-directory__hover-bg {
          transform: scaleY(1);
        }

        .service-directory__title-wrap {
          min-width: 0;
          display: grid;
          grid-template-columns: 42px minmax(0, 1fr);
          column-gap: 18px;
          align-items: center;
        }

        .service-directory__number {
          display: grid;
          width: 38px;
          height: 38px;
          place-items: center;
          border: 1px solid rgba(21, 25, 34, .1);
          border-radius: 50%;
          font-size: 10px;
          line-height: 1;
          font-weight: 700;
          color: #7f8792;
          background: #fff;
          font-variant-numeric: tabular-nums;
          transition:
            color 220ms ease,
            border-color 220ms ease,
            background-color 220ms ease,
            transform 320ms cubic-bezier(.22, 1, .36, 1);
        }

        .service-directory__title-wrap h3 {
          min-width: 0;
          margin: 0;
          font-family: "Plus Jakarta Sans", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          font-size: clamp(26px, 2.1vw, 34px);
          line-height: 1.04;
          font-weight: 560;
          letter-spacing: -0.05em;
          color: #151922;
          transition:
            color 220ms ease,
            transform 360ms cubic-bezier(.22, 1, .36, 1);
        }

        .service-directory__title-wrap sup {
          display: none;
        }

        .service-directory__description {
          width: min(470px, 100%);
          margin: 0;
          font-size: 14px;
          line-height: 1.62;
          font-weight: 400;
          color: #7d848e;
          transition: color 220ms ease;
        }

        .service-directory__arrow {
          justify-self: end;
          display: grid;
          place-items: center;
          width: 48px;
          height: 48px;
          border: 1px solid rgba(21, 25, 34, .12);
          border-radius: 50%;
          font-size: 20px;
          line-height: 1;
          color: #232933;
          background: #fff;
          transition:
            color 220ms ease,
            border-color 220ms ease,
            background-color 220ms ease,
            transform 360ms cubic-bezier(.22, 1, .36, 1);
        }

        .service-directory__row:focus-visible .service-directory__number {
          color: #fff;
          border-color: rgba(255,255,255,.32);
          background: rgba(255,255,255,.08);
          transform: scale(.96);
        }

        .service-directory__row:focus-visible .service-directory__title-wrap h3 {
          color: #fff;
          transform: translateX(4px);
        }

        .service-directory__row:focus-visible .service-directory__description {
          color: rgba(255,255,255,.68);
        }

        .service-directory__row:focus-visible .service-directory__arrow {
          color: #fff;
          border-color: rgba(255,255,255,.32);
          background: rgba(255,255,255,.08);
          transform: rotate(8deg);
        }

        @media (hover: hover) and (pointer: fine) {
          .service-directory__row:hover {
            border-color: rgba(0, 0, 0, .9);
          }

          .service-directory__row:hover .service-directory__hover-bg {
            transform: scaleY(1);
          }

          .service-directory__row:hover .service-directory__number {
            color: #fff;
            border-color: rgba(255,255,255,.32);
            background: rgba(255,255,255,.08);
            transform: scale(.96);
          }

          .service-directory__row:hover .service-directory__title-wrap h3 {
            color: #fff;
            transform: translateX(4px);
          }

          .service-directory__row:hover .service-directory__description {
            color: rgba(255,255,255,.68);
          }

          .service-directory__row:hover .service-directory__arrow {
            color: #fff;
            border-color: rgba(255,255,255,.32);
            background: rgba(255,255,255,.08);
            transform: rotate(8deg);
          }
        }

        @media (max-width: 1080px) {
          .service-directory__header {
            grid-template-columns: minmax(0, 1fr) minmax(280px, .55fr);
            column-gap: 44px;
            row-gap: 12px;
          }

          .service-directory__row {
            grid-template-columns: minmax(360px, 1fr) minmax(230px, .58fr) 50px;
            gap: 28px;
          }
}

        @media (max-width: 900px) {
          .service-directory {
            padding: 48px 0 80px;
          }

          .service-directory__inner {
            width: min(100% - 56px, 1320px);
          }

          .service-directory__header {
            grid-template-columns: minmax(0, 1fr) minmax(250px, .72fr);
            column-gap: 34px;
            row-gap: 12px;
            margin-bottom: 42px;
            align-items: end;
          }

          .service-directory__eyebrow {
            grid-column: 1 / -1;
            margin: 0;
          }

          .service-directory__header h2 {
            font-size: 44px;
            line-height: 48px;
          }

          .service-directory__intro {
            width: 100%;
            max-width: 420px;
            font-size: 14.5px;
            line-height: 1.62;
          }

          .service-directory__row {
            min-height: 128px;
            grid-template-columns: minmax(0, 1fr) 46px;
            gap: 20px;
            padding-inline: 8px;
          }

          .service-directory__description {
            grid-column: 1;
            width: min(620px, 92%);
            margin-top: -6px;
          }

          .service-directory__arrow {
            grid-column: 2;
            grid-row: 1 / span 2;
          }
}

        @media (max-width: 640px) {
          .service-directory {
            padding: 54px 0 72px;
          }

          .service-directory__inner {
            width: min(100% - 40px, 1320px);
          }

          .service-directory__header {
            grid-template-columns: 1fr;
            gap: 10px;
            text-align: left;
            margin-bottom: 38px;
          }

          .service-directory__eyebrow {
            grid-column: auto;
            margin: 0 0 2px;
            font-size: 14px;
            line-height: 22px;
          }

          .service-directory__header h2 {
            font-size: 42px;
            line-height: 46px;
            letter-spacing: normal;
          }

          .service-directory__intro {
            width: 100%;
            max-width: 520px;
            margin: 0;
            padding: 0;
            font-size: 14px;
            line-height: 1.62;
          }

          .service-directory__row {
            min-height: 116px;
            padding: 22px 0;
          }

          .service-directory__title-wrap {
            grid-template-columns: 32px minmax(0, 1fr);
            column-gap: 10px;
          }

          .service-directory__number {
            width: 30px;
            height: 30px;
          }

          .service-directory__title-wrap h3 {
            font-size: 24px;
            line-height: 1.08;
          }

          .service-directory__description {
            width: 100%;
            font-size: 12.5px;
          }

          .service-directory__arrow {
            width: 38px;
            height: 38px;
            font-size: 17px;
          }
        }

        @media (max-width: 420px) {
          .service-directory__header h2 {
            font-size: 38px;
            line-height: 42px;
          }

          .service-directory__header {
            gap: 9px;
            margin-bottom: 36px;
          }

          .service-directory__row {
            min-height: 112px;
            padding-block: 20px;
          }

          .service-directory__title-wrap h3 {
            font-size: 20px;
          }
        }

        @media (max-width: 350px) {
          .service-directory__header h2 {
            font-size: 35px;
            line-height: 39px;
          }

          .service-directory__inner {
            width: min(100% - 32px, 1320px);
          }

          .service-directory__title-wrap {
            grid-template-columns: 28px minmax(0, 1fr);
            column-gap: 8px;
          }

          .service-directory__number {
            width: 28px;
            height: 28px;
            font-size: 9px;
          }

          .service-directory__title-wrap h3 {
            font-size: 22px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .service-directory__hover-bg,
          .service-directory__number,
          .service-directory__title-wrap h3,
          .service-directory__description,
          .service-directory__arrow {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}
