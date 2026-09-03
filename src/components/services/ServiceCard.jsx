import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ServiceCard = ({
  index = 1,
  total = 6,
  eyebrow = "Web Platforms",
  title = "Website Solutions",
  description = "Fast, scalable web products built with modern frameworks, SSR, and clean design systems.",
  tags = ["Next.js & React", "SSR / SSG", "Design Systems"],
  leftStatus = "Modern Web Engineering",
  rightTitle = "The web, engineered for growth.",
  rightDescription = "Modern rendering, reusable interfaces and scalable architecture working together in one production-ready platform.",
  centerLabel = "WEB",
  centerIcon = "</>",
  diagramVariant = "web",
  diagramNodes = {
    left: "React",
    right: "SSR / SSG",
    top: "Next.js",
    bottom: "Design Systems",
  },
  rightStatus = "Production Ready",
  rightCta = "Modern Stack",
  enableEntranceAnimation = true,
}) => {
  const pad = (value) => String(value).padStart(2, "0");
  const cardRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current || !enableEntranceAnimation) return undefined;

    gsap.registerPlugin(ScrollTrigger);

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      gsap.set(cardRef.current.querySelectorAll("[data-svc-animate]"), {
        clearProps: "all",
      });
      return undefined;
    }

    const ctx = gsap.context(() => {
      const frame = cardRef.current.querySelector(".svc-frame");
      const left = cardRef.current.querySelector(".svc-left");
      const right = cardRef.current.querySelector(".svc-right");

      const leftTop = cardRef.current.querySelector(".svc-left-top");
      const title = cardRef.current.querySelector(".svc-title");
      const description = cardRef.current.querySelector(".svc-description");
      const tags = cardRef.current.querySelectorAll(".svc-tag");
      const darkPill = cardRef.current.querySelector(".svc-dark-pill");

      const rightTitleEl = cardRef.current.querySelector(".svc-right-copy h4");
      const rightDescriptionEl = cardRef.current.querySelector(".svc-right-copy p");
      const diagram = cardRef.current.querySelector(".svc-diagram");
      const diagramParts = cardRef.current.querySelectorAll(".svc-diagram-part");

      gsap.set(frame, {
        opacity: 0,
        y: 60,
        scale: 0.975,
        transformOrigin: "50% 50%",
      });

      gsap.set([left, right], { opacity: 0, y: 24 });
      gsap.set([leftTop, title, description, darkPill], {
        y: 18,
        opacity: 0,
      });
      gsap.set(tags, {
        y: 14,
        opacity: 0,
        scale: 0.96,
      });
      gsap.set([rightTitleEl, rightDescriptionEl], {
        y: 18,
        opacity: 0,
      });
      gsap.set(diagram, {
        opacity: 0,
        scale: 0.97,
        transformOrigin: "50% 50%",
      });
      gsap.set(diagramParts, {
        opacity: 0,
        y: 8,
        scale: 0.96,
        transformOrigin: "50% 50%",
      });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 82%",
          once: true,
        },
      });

      tl.to(frame, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.72,
      })
        .to([left, right], {
          opacity: 1,
          y: 0,
          duration: 0.54,
          stagger: 0.06,
        }, "-=0.42")
        .to(leftTop, { y: 0, opacity: 1, duration: 0.32 }, "-=0.36")
        .to(title, { y: 0, opacity: 1, duration: 0.42 }, "-=0.22")
        .to(description, { y: 0, opacity: 1, duration: 0.4 }, "-=0.28")
        .to(tags, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.3,
          stagger: 0.05,
        }, "-=0.16")
        .to(darkPill, { y: 0, opacity: 1, duration: 0.34 }, "-=0.12")
        .to([rightTitleEl, rightDescriptionEl], {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.06,
        }, "-=0.72")
        .to(diagram, {
          opacity: 1,
          scale: 1,
          duration: 0.48,
        }, "-=0.18")
        .to(diagramParts, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.36,
          stagger: 0.04,
        }, "-=0.26");
    }, cardRef);

    return () => ctx.revert();
  }, [enableEntranceAnimation]);

  return (
    <>
      <article className="svc-card" ref={cardRef}>
        <div className="svc-frame">
          <div className="svc-grid">
            <section className="svc-left">
              <div className="svc-left-top">
                <span className="svc-eyebrow">{eyebrow}</span>
                <span className="svc-index">
                  {pad(index)} / {pad(total)}
                </span>
              </div>

              <div className="svc-copy">
                <h3 className="svc-title">{title}</h3>
                <p className="svc-description">{description}</p>
              </div>

              <div className="svc-left-bottom">
                <div className="svc-tags">
                  {tags.map((tag) => (
                    <span className="svc-tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="svc-dark-pill">
                  <span className="svc-dark-pill-dot" />
                  {leftStatus}
                </div>
              </div>
            </section>

            <section className="svc-right">
              <div className="svc-right-copy">
                <h4>{rightTitle}</h4>
                <p>{rightDescription}</p>
              </div>

              <div className="svc-visual">
                <ServiceDiagram
                  variant={diagramVariant}
                  centerLabel={centerLabel}
                  centerIcon={centerIcon}
                  nodes={diagramNodes}
                />
              </div>
            </section>
          </div>
        </div>
      </article>

      <style>{`
        .svc-card,
        .svc-card * {
          box-sizing: border-box;
        }

        .svc-card {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          font-family: inherit;
        }

        .svc-frame {
          width: 100%;
          padding: 0;
          border-radius: 25px;
          background: transparent;
          box-shadow: none;
        }

        .svc-grid {
          display: grid;
          grid-template-columns: 0.88fr 1.12fr;
          gap: 12px;
          height: 500px;
        }

        .svc-left,
        .svc-right {
          min-width: 0;
          height: 100%;
          border-radius: 25px;
        }

        .svc-left {
          display: flex;
          flex-direction: column;
          padding: 40px 42px;
          background: #efefed;
          border: 1px solid rgba(17, 17, 17, 0.08);
        }

        .svc-left-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 24px;
        }

        .svc-eyebrow,
        .svc-index {
          font-size: 14px !important;
          line-height: 1.2 !important;
          font-weight: 500;
          color: rgba(17, 17, 17, 0.38);
          letter-spacing: -0.02em;
        }

        .svc-index {
          font-size: 12px !important;
          letter-spacing: 0.08em;
          white-space: nowrap;
        }

        .svc-copy {
          margin-top: 10px;
        }

        .svc-title {
          margin: 0 !important;
          max-width: 430px;
          font-size: 44px !important;
          line-height: 0.98 !important;
          font-weight: 600 !important;
          letter-spacing: -0.055em !important;
          color: #111 !important;
        }

        .svc-description {
          margin: 28px 0 0 !important;
          max-width: 430px;
          font-size: 16px !important;
          line-height: 1.55 !important;
          font-weight: 400 !important;
          letter-spacing: -0.015em !important;
          color: rgba(17, 17, 17, 0.58) !important;
        }

        .svc-left-bottom {
          margin-top: auto;
        }

        .svc-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .svc-tag {
          display: inline-flex;
          align-items: center;
          min-height: 34px;
          padding: 7px 14px;
          border: 1px solid rgba(17, 17, 17, 0.14);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.72);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
          font-size: 12px !important;
          line-height: 1 !important;
          font-weight: 500;
          color: rgba(17, 17, 17, 0.78);
          white-space: nowrap;
        }

        .svc-dark-pill {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          margin-top: 18px;
          min-height: 40px;
          padding: 9px 15px;
          border-radius: 999px;
          background: #191919;
          box-shadow: 0 7px 18px rgba(0, 0, 0, 0.16);
          font-size: 12px !important;
          line-height: 1 !important;
          font-weight: 500;
          color: #fff;
        }

        .svc-dark-pill-dot {
          width: 9px;
          height: 9px;
          border: 1px solid #a4f66f;
          border-radius: 50%;
          box-shadow: 0 0 0 3px rgba(164, 246, 111, 0.08);
        }

        .svc-right {
          position: relative;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          padding: 40px 42px 28px;
          background:
            radial-gradient(circle at 86% 6%, rgba(255,255,255,.045), transparent 27%),
            linear-gradient(145deg, #1d1d1d 0%, #121212 52%, #090909 100%);
          border: 1px solid rgba(255, 255, 255, 0.05);
          color: #fff;
        }

        .svc-right-copy {
          position: relative;
          z-index: 2;
        }

        .svc-right-copy h4 {
          margin: 0 !important;
          max-width: 540px;
          font-size: 28px !important;
          line-height: 1.08 !important;
          font-weight: 500 !important;
          letter-spacing: -0.04em !important;
          color: #fff !important;
        }

        .svc-right-copy p {
          margin: 12px 0 0 !important;
          max-width: 555px;
          font-size: 14px !important;
          line-height: 1.55 !important;
          font-weight: 400 !important;
          letter-spacing: -0.01em !important;
          color: rgba(255, 255, 255, 0.48) !important;
        }

        .svc-visual {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          flex: 1;
          margin-top: 24px;
          min-height: 0;
        }

        .svc-diagram {
          position: relative;
          width: 100%;
          height: 272px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(0, 0, 0, 0.08);
        }

        .svc-grid-bg {
          position: absolute;
          inset: 0;
          opacity: 0.46;
          background-image:
            linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        .svc-line {
          position: absolute;
          background: rgba(255, 255, 255, 0.09);
        }

        .svc-line-h {
          height: 1px;
        }

        .svc-line-v {
          width: 1px;
        }

        .svc-node {
          position: absolute;
          z-index: 4;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 36px;
          padding: 7px 14px;
          border: 1px solid rgba(255,255,255,.09);
          border-radius: 999px;
          background: #151515;
          font-size: 11px !important;
          line-height: 1 !important;
          font-weight: 500;
          color: rgba(255,255,255,.58);
          white-space: nowrap;
          backdrop-filter: blur(6px);
        }

        .svc-ring {
          position: absolute;
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 50%;
        }

        .svc-center-box {
          position: absolute;
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(164, 246, 111, 0.2);
          background: rgba(21,25,21,.92);
          box-shadow: 0 0 35px rgba(164,246,111,.05);
        }

        .svc-center-icon {
          display: grid;
          place-items: center;
          color: #a4f66f;
        }

        .svc-center-text {
          margin-top: 7px;
          font-size: 10px !important;
          line-height: 1 !important;
          font-weight: 600;
          letter-spacing: .16em;
          color: rgba(255,255,255,.68);
        }

        .svc-dot-green,
        .svc-dot-gray {
          position: absolute;
          border-radius: 50%;
        }

        .svc-dot-green {
          width: 10px;
          height: 10px;
          background: #a4f66f;
          box-shadow: 0 0 16px rgba(164,246,111,.65);
        }

        .svc-dot-gray {
          width: 7px;
          height: 7px;
          background: rgba(255,255,255,.32);
        }

        .svc-phone {
          position: absolute;
          z-index: 3;
          left: 50%;
          top: 50%;
          width: 96px;
          height: 168px;
          transform: translate(-50%, -50%);
          border-radius: 28px;
          border: 1px solid rgba(255,255,255,.12);
          background: linear-gradient(180deg, rgba(20,20,20,.94), rgba(13,13,13,.98));
          box-shadow: inset 0 0 0 1px rgba(255,255,255,.03);
        }

        .svc-phone-notch {
          position: absolute;
          left: 50%;
          top: 10px;
          width: 34px;
          height: 4px;
          transform: translateX(-50%);
          border-radius: 999px;
          background: rgba(255,255,255,.12);
        }

        .svc-phone-ui {
          position: absolute;
          left: 16px;
          right: 16px;
          bottom: 18px;
          top: 26px;
          border-radius: 18px;
          border: 1px solid rgba(164,246,111,.16);
          background: radial-gradient(circle at 50% 28%, rgba(164,246,111,.08), transparent 40%);
          display: grid;
          place-items: center;
        }

        .svc-module {
          position: absolute;
          z-index: 3;
          border: 1px solid rgba(255,255,255,.08);
          background: rgba(20,20,20,.88);
          border-radius: 16px;
          display: grid;
          place-items: center;
          color: rgba(255,255,255,.58);
          font-size: 11px !important;
          font-weight: 500;
          letter-spacing: -0.01em;
          padding: 8px 10px;
        }

        .svc-chart {
          position: absolute;
          inset: 24px 26px 24px 26px;
        }

        .svc-chart-bars {
          position: absolute;
          left: 18px;
          bottom: 16px;
          display: flex;
          align-items: flex-end;
          gap: 12px;
        }

        .svc-chart-bar {
          width: 16px;
          border-radius: 8px 8px 3px 3px;
          background: linear-gradient(180deg, rgba(164,246,111,.75), rgba(164,246,111,.18));
          box-shadow: 0 0 18px rgba(164,246,111,.12);
        }

        .svc-chart-line {
          position: absolute;
          left: 64px;
          right: 30px;
          bottom: 50px;
          height: 0;
          border-top: 2px solid rgba(164,246,111,.72);
          transform-origin: left center;
        }

        .svc-axis-fade {
          position: absolute;
          left: 18px;
          right: 18px;
          bottom: 16px;
          height: 1px;
          background: rgba(255,255,255,.08);
        }

        .svc-browser {
          position: absolute;
          inset: 20px 26px 20px 26px;
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 18px;
          background: rgba(255,255,255,.018);
        }

        .svc-browser-top {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          height: 36px;
          border-bottom: 1px solid rgba(255,255,255,.06);
        }

        .svc-browser-top::before,
        .svc-browser-top::after {
          content: "";
          position: absolute;
          top: 14px;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: rgba(255,255,255,.16);
        }

        .svc-browser-top::before {
          left: 14px;
          box-shadow: 14px 0 0 rgba(255,255,255,.16), 28px 0 0 rgba(255,255,255,.16);
        }

        .svc-browser-pill {
          position: absolute;
          left: 66px;
          right: 18px;
          top: 9px;
          height: 18px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,.06);
          background: rgba(255,255,255,.02);
        }

        .svc-browser-layout {
          position: absolute;
          left: 18px;
          right: 18px;
          top: 56px;
          bottom: 18px;
          display: grid;
          grid-template-columns: 72px 1fr;
          gap: 14px;
        }

        .svc-browser-side,
        .svc-browser-main {
          border: 1px solid rgba(255,255,255,.05);
          border-radius: 14px;
          background: rgba(255,255,255,.014);
        }

        .svc-browser-main {
          position: relative;
        }

        .svc-browser-card {
          position: absolute;
          inset: 18px;
          border: 1px solid rgba(164,246,111,.14);
          border-radius: 16px;
          background: radial-gradient(circle at 50% 25%, rgba(164,246,111,.08), rgba(164,246,111,.01) 58%);
        }

        .svc-footer {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          margin-top: 22px;
        }

        .svc-secured,
        .svc-stack {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          min-height: 40px;
          padding: 9px 15px;
          border-radius: 999px;
          font-size: 12px !important;
          line-height: 1 !important;
          font-weight: 500;
          white-space: nowrap;
        }

        .svc-secured {
          background: #172112;
          box-shadow: inset 0 0 0 1px rgba(164,246,111,.08);
          color: #cfff9f;
        }

        .svc-check {
          display: grid;
          place-items: center;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #a4f66f;
          font-size: 9px !important;
          font-weight: 700;
          color: #111;
        }

        .svc-stack {
          border: 1px solid rgba(255,255,255,.1);
          background: rgba(255,255,255,.94);
          color: #171717;
        }


        /* ---------- UNIQUE SERVICE VISUALS ---------- */

        .svc-ai-diagram,
        .svc-cloud-diagram,
        .svc-mobile-diagram,
        .svc-seo-diagram {
          background:
            radial-gradient(circle at 50% 50%, rgba(164,246,111,.035), transparent 35%),
            #0d0d0d;
        }

        .svc-ai-lines,
        .svc-cloud-links,
        .svc-mobile-links {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        .svc-ai-lines path,
        .svc-cloud-links path,
        .svc-mobile-links path {
          fill: none;
          stroke: rgba(164,246,111,.16);
          stroke-width: 1.2;
          stroke-dasharray: 4 7;
        }

        .svc-ai-core {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 122px;
          height: 122px;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          border: 1px solid rgba(164,246,111,.25);
          background:
            radial-gradient(circle, rgba(164,246,111,.12), rgba(164,246,111,.02) 62%),
            #111;
          box-shadow: 0 0 40px rgba(164,246,111,.06);
          z-index: 2;
        }

        .svc-ai-core-icon {
          display: grid;
          place-items: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #a4f66f;
          color: #111;
          font-size: 12px;
          font-weight: 700;
        }

        .svc-ai-core strong {
          margin-top: 8px;
          font-size: 13px;
          color: #fff;
        }

        .svc-ai-core small {
          margin-top: 2px;
          font-size: 10px;
          color: rgba(255,255,255,.38);
        }

        .svc-ai-chip {
          position: absolute;
          width: 110px;
          padding: 11px 12px;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,.08);
          background: rgba(18,18,18,.95);
          display: grid;
          grid-template-columns: 28px 1fr;
          column-gap: 8px;
          z-index: 3;
        }

        .svc-ai-chip > span {
          grid-row: 1 / span 2;
          display: grid;
          place-items: center;
          width: 28px;
          height: 28px;
          border-radius: 9px;
          background: rgba(164,246,111,.08);
          color: #a4f66f;
          font-size: 9px;
        }

        .svc-ai-chip strong {
          font-size: 11px;
          color: rgba(255,255,255,.78);
        }

        .svc-ai-chip small {
          margin-top: 2px;
          font-size: 9px;
          color: rgba(255,255,255,.34);
        }

        .ai-memory { left: 15%; top: 12%; }
        .ai-tools { right: 13%; top: 12%; }
        .ai-llm { left: 13%; bottom: 12%; }
        .ai-workflow { right: 12%; bottom: 12%; }
        .ai-human { left: 50%; top: 5%; transform: translateX(-50%); }

        .svc-ai-pulse {
          position: absolute;
          border-radius: 50%;
          background: #a4f66f;
          box-shadow: 0 0 16px rgba(164,246,111,.7);
        }

        .pulse-a { width: 7px; height: 7px; left: 28%; top: 48%; }
        .pulse-b { width: 5px; height: 5px; right: 26%; bottom: 31%; opacity: .5; }

        .svc-cloud-top {
          position: absolute;
          left: 50%;
          top: 18px;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 220px;
          padding: 10px 14px;
          border-radius: 18px;
          border: 1px solid rgba(164,246,111,.16);
          background: rgba(20,24,18,.88);
          z-index: 2;
        }

        .svc-cloud-icon {
          display: grid;
          place-items: center;
          width: 42px;
          height: 42px;
          border-radius: 14px;
          background: rgba(164,246,111,.08);
          color: #a4f66f;
          font-size: 20px;
        }

        .svc-cloud-top strong,
        .svc-cloud-region strong {
          display: block;
          font-size: 12px;
          color: rgba(255,255,255,.82);
        }

        .svc-cloud-top small {
          display: block;
          margin-top: 3px;
          font-size: 9px;
          color: rgba(255,255,255,.34);
        }

        .svc-cloud-region {
          position: absolute;
          top: 112px;
          width: 190px;
          height: 92px;
          padding: 12px 14px;
          border-radius: 18px;
          border: 1px solid rgba(255,255,255,.08);
          background: rgba(17,17,17,.92);
          z-index: 2;
        }

        .svc-cloud-region > span {
          font-size: 9px;
          color: rgba(255,255,255,.34);
          letter-spacing: .12em;
        }

        .svc-cloud-region > small {
          display: block;
          margin-top: 8px;
          font-size: 9px;
          color: rgba(255,255,255,.34);
        }

        .region-one { left: 10%; }
        .region-two { right: 10%; }

        .svc-cloud-server-row {
          display: flex;
          gap: 8px;
          margin-top: 10px;
        }

        .svc-cloud-server-row i {
          width: 44px;
          height: 18px;
          border-radius: 6px;
          border: 1px solid rgba(164,246,111,.12);
          background: linear-gradient(90deg, rgba(164,246,111,.08), rgba(255,255,255,.02));
        }

        .svc-cloud-bottom {
          position: absolute;
          left: 50%;
          bottom: 14px;
          transform: translateX(-50%);
          width: 76%;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          z-index: 2;
        }

        .svc-cloud-bottom div {
          padding: 8px 10px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,.06);
          background: rgba(255,255,255,.018);
          text-align: center;
        }

        .svc-cloud-bottom strong {
          display: block;
          font-size: 11px;
          color: #a4f66f;
        }

        .svc-cloud-bottom small {
          display: block;
          margin-top: 2px;
          font-size: 8px;
          color: rgba(255,255,255,.32);
        }

        .svc-mobile-diagram {
          overflow: hidden;
        }

        .svc-mobile-phone {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 118px;
          height: 216px;
          transform: translate(-50%, -50%);
          border: 1px solid rgba(255,255,255,.12);
          border-radius: 32px;
          background: #111;
          box-shadow: 0 0 0 5px rgba(255,255,255,.015);
          z-index: 3;
        }

        .svc-mobile-speaker {
          position: absolute;
          left: 50%;
          top: 10px;
          width: 36px;
          height: 4px;
          transform: translateX(-50%);
          border-radius: 999px;
          background: rgba(255,255,255,.12);
        }

        .svc-mobile-screen {
          position: absolute;
          inset: 20px 8px 8px;
          border-radius: 24px;
          overflow: hidden;
          background:
            radial-gradient(circle at 50% 15%, rgba(164,246,111,.08), transparent 36%),
            #0e0e0e;
        }

        .svc-mobile-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 12px 8px;
          border-bottom: 1px solid rgba(255,255,255,.05);
        }

        .svc-mobile-header span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,.18);
        }

        .svc-mobile-header b {
          font-size: 9px;
          color: rgba(255,255,255,.65);
        }

        .svc-mobile-hero-card {
          margin: 10px;
          padding: 10px;
          border-radius: 14px;
          background: rgba(164,246,111,.06);
          border: 1px solid rgba(164,246,111,.12);
        }

        .svc-mobile-hero-card small {
          display: block;
          font-size: 7px;
          color: rgba(255,255,255,.28);
        }

        .svc-mobile-hero-card strong {
          display: block;
          margin-top: 4px;
          font-size: 17px;
          color: #fff;
        }

        .svc-mobile-hero-card span {
          display: block;
          margin-top: 4px;
          font-size: 8px;
          color: #a4f66f;
        }

        .svc-mobile-list {
          display: grid;
          gap: 7px;
          padding: 0 10px;
        }

        .svc-mobile-list i {
          height: 22px;
          border-radius: 8px;
          background: rgba(255,255,255,.035);
          border: 1px solid rgba(255,255,255,.04);
        }

        .svc-mobile-nav {
          position: absolute;
          left: 10px;
          right: 10px;
          bottom: 8px;
          display: flex;
          justify-content: space-around;
        }

        .svc-mobile-nav span {
          width: 8px;
          height: 8px;
          border-radius: 3px;
          background: rgba(255,255,255,.12);
        }

        .svc-mobile-nav .active {
          background: #a4f66f;
        }

        .svc-mobile-badge {
          position: absolute;
          width: 116px;
          padding: 11px 12px;
          border-radius: 16px;
          background: rgba(17,17,17,.94);
          border: 1px solid rgba(255,255,255,.08);
          z-index: 2;
        }

        .svc-mobile-badge strong {
          display: block;
          font-size: 11px;
          color: rgba(255,255,255,.75);
        }

        .svc-mobile-badge small {
          display: block;
          margin-top: 3px;
          font-size: 8px;
          color: rgba(255,255,255,.32);
        }

        .badge-ios { left: 10%; top: 24%; }
        .badge-android { right: 10%; top: 24%; }
        .badge-api { left: 50%; bottom: 8%; transform: translateX(-50%); text-align: center; }

        .svc-erp-diagram {
          display: grid;
          grid-template-columns: 64px 1fr;
          background: #0d0d0d;
          border-color: rgba(255,255,255,.08);
        }

        .svc-erp-sidebar {
          border-right: 1px solid rgba(255,255,255,.06);
          padding: 14px 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        .svc-erp-logo {
          display: grid;
          place-items: center;
          width: 36px;
          height: 36px;
          border-radius: 12px;
          background: rgba(164,246,111,.08);
          color: #a4f66f;
          font-size: 10px;
          font-weight: 700;
        }

        .svc-erp-sidebar i {
          width: 28px;
          height: 8px;
          border-radius: 999px;
          background: rgba(255,255,255,.08);
        }

        .svc-erp-sidebar i.active {
          background: #a4f66f;
          box-shadow: 0 0 14px rgba(164,246,111,.22);
        }

        .svc-erp-main {
          padding: 16px 18px;
        }

        .svc-erp-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .svc-erp-topbar small {
          display: block;
          font-size: 8px;
          color: rgba(255,255,255,.28);
          letter-spacing: .12em;
        }

        .svc-erp-topbar strong {
          display: block;
          margin-top: 3px;
          font-size: 13px;
          color: rgba(255,255,255,.8);
        }

        .svc-erp-topbar > span {
          padding: 6px 9px;
          border-radius: 999px;
          background: rgba(164,246,111,.07);
          color: #a4f66f;
          font-size: 8px;
        }

        .svc-erp-stats {
          margin-top: 14px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }

        .svc-erp-stats div {
          padding: 10px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,.05);
          background: rgba(255,255,255,.018);
        }

        .svc-erp-stats small,
        .svc-erp-stats strong,
        .svc-erp-stats em {
          display: block;
        }

        .svc-erp-stats small {
          font-size: 8px;
          color: rgba(255,255,255,.28);
        }

        .svc-erp-stats strong {
          margin-top: 4px;
          font-size: 13px;
          color: #fff;
        }

        .svc-erp-stats em {
          margin-top: 3px;
          font-size: 8px;
          color: #a4f66f;
          font-style: normal;
        }

        .svc-erp-content {
          margin-top: 12px;
          display: grid;
          grid-template-columns: 1.25fr .75fr;
          gap: 10px;
        }

        .svc-erp-chart {
          height: 104px;
          padding: 16px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,.05);
          display: flex;
          align-items: flex-end;
          gap: 10px;
        }

        .svc-erp-chart span {
          flex: 1;
          border-radius: 5px 5px 2px 2px;
          background: linear-gradient(180deg, rgba(164,246,111,.6), rgba(164,246,111,.12));
        }

        .svc-erp-chart span:nth-child(1) { height: 35%; }
        .svc-erp-chart span:nth-child(2) { height: 62%; }
        .svc-erp-chart span:nth-child(3) { height: 48%; }
        .svc-erp-chart span:nth-child(4) { height: 82%; }
        .svc-erp-chart span:nth-child(5) { height: 68%; }

        .svc-erp-modules {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
        }

        .svc-erp-modules div {
          padding: 9px 8px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,.05);
          background: rgba(255,255,255,.018);
        }

        .svc-erp-modules b {
          display: block;
          font-size: 9px;
          color: #a4f66f;
        }

        .svc-erp-modules small {
          display: block;
          margin-top: 3px;
          font-size: 7px;
          color: rgba(255,255,255,.28);
        }

        .svc-seo-toolbar {
          position: absolute;
          left: 18px;
          right: 18px;
          top: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .svc-seo-toolbar small {
          display: block;
          font-size: 8px;
          color: rgba(255,255,255,.28);
          letter-spacing: .12em;
        }

        .svc-seo-toolbar strong {
          display: block;
          margin-top: 3px;
          font-size: 13px;
          color: rgba(255,255,255,.8);
        }

        .svc-seo-toolbar > span {
          padding: 6px 9px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,.06);
          font-size: 8px;
          color: rgba(255,255,255,.4);
        }

        .svc-seo-kpis {
          position: absolute;
          left: 18px;
          right: 18px;
          top: 66px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }

        .svc-seo-kpis div {
          padding: 9px 10px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,.05);
          background: rgba(255,255,255,.018);
        }

        .svc-seo-kpis small,
        .svc-seo-kpis strong,
        .svc-seo-kpis em {
          display: block;
        }

        .svc-seo-kpis small {
          font-size: 8px;
          color: rgba(255,255,255,.26);
        }

        .svc-seo-kpis strong {
          margin-top: 3px;
          font-size: 13px;
          color: #fff;
        }

        .svc-seo-kpis em {
          margin-top: 2px;
          font-size: 8px;
          color: #a4f66f;
          font-style: normal;
        }

        .svc-seo-chart {
          position: absolute;
          left: 18px;
          right: 18px;
          bottom: 42px;
          height: 112px;
          border-left: 1px solid rgba(255,255,255,.05);
          border-bottom: 1px solid rgba(255,255,255,.05);
        }

        .svc-seo-chart svg {
          position: absolute;
          inset: 8px 0 0 0;
          width: 100%;
          height: calc(100% - 8px);
          overflow: visible;
        }

        .svc-seo-chart polyline {
          fill: none;
          stroke: #a4f66f;
          stroke-width: 2.3;
          vector-effect: non-scaling-stroke;
          filter: drop-shadow(0 0 8px rgba(164,246,111,.25));
        }

        .seo-grid-line {
          position: absolute;
          left: 0;
          right: 0;
          height: 1px;
          background: rgba(255,255,255,.04);
        }

        .line-1 { top: 25%; }
        .line-2 { top: 50%; }
        .line-3 { top: 75%; }

        .seo-dot {
          position: absolute;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #a4f66f;
          box-shadow: 0 0 14px rgba(164,246,111,.55);
        }

        .dot-1 { left: 27%; bottom: 45%; }
        .dot-2 { left: 61%; bottom: 68%; }
        .dot-3 { right: 5%; top: 4%; }

        .svc-seo-labels {
          position: absolute;
          left: 18px;
          right: 18px;
          bottom: 10px;
          display: flex;
          gap: 8px;
        }

        .svc-seo-labels span {
          padding: 5px 8px;
          border-radius: 999px;
          background: rgba(255,255,255,.025);
          border: 1px solid rgba(255,255,255,.05);
          font-size: 8px;
          color: rgba(255,255,255,.32);
        }

        .svc-web-diagram {
          background: #0d0d0d;
          padding: 18px;
        }

        .svc-browser-window {
          position: absolute;
          inset: 18px;
          border-radius: 18px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,.08);
          background: rgba(255,255,255,.015);
        }

        .svc-web-browser-top {
          height: 38px;
          padding: 0 12px;
          display: flex;
          align-items: center;
          gap: 7px;
          border-bottom: 1px solid rgba(255,255,255,.06);
        }

        .svc-web-browser-top > span {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: rgba(255,255,255,.16);
        }

        .svc-web-address {
          margin-left: 8px;
          flex: 1;
          height: 21px;
          display: grid;
          place-items: center;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,.05);
          background: rgba(255,255,255,.018);
          font-size: 8px;
          color: rgba(255,255,255,.26);
        }

        .svc-web-browser-body {
          display: grid;
          grid-template-columns: 56px 1fr;
          height: calc(100% - 38px);
        }

        .svc-web-browser-body aside {
          padding: 14px;
          border-right: 1px solid rgba(255,255,255,.05);
          display: grid;
          align-content: start;
          gap: 10px;
        }

        .svc-web-browser-body aside i {
          height: 8px;
          border-radius: 999px;
          background: rgba(255,255,255,.07);
        }

        .svc-web-browser-body aside i.active {
          background: #a4f66f;
        }

        .svc-web-browser-body main {
          padding: 14px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr auto;
          gap: 10px;
        }

        .svc-web-code-card,
        .svc-web-preview-card {
          border: 1px solid rgba(255,255,255,.05);
          border-radius: 14px;
          background: rgba(255,255,255,.016);
        }

        .svc-web-code-card {
          padding: 16px;
        }

        .svc-web-code-line {
          height: 7px;
          margin-bottom: 9px;
          border-radius: 999px;
          background: linear-gradient(90deg, rgba(164,246,111,.42), rgba(255,255,255,.06));
        }

        .svc-web-code-line.w80 { width: 80%; }
        .svc-web-code-line.w55 { width: 55%; }
        .svc-web-code-line.w70 { width: 70%; }
        .svc-web-code-line.w45 { width: 45%; }

        .svc-web-preview-card {
          padding: 14px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .svc-web-preview-pill {
          align-self: flex-start;
          padding: 5px 8px;
          border-radius: 999px;
          background: rgba(164,246,111,.07);
          color: #a4f66f;
          font-size: 8px;
        }

        .svc-web-preview-card strong {
          margin-top: 10px;
          font-size: 13px;
          color: #fff;
        }

        .svc-web-preview-card small {
          margin-top: 3px;
          font-size: 8px;
          color: rgba(255,255,255,.28);
        }

        .svc-web-bottom-row {
          grid-column: 1 / -1;
          display: flex;
          gap: 8px;
        }

        .svc-web-bottom-row span {
          flex: 1;
          padding: 7px 8px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,.05);
          background: rgba(255,255,255,.015);
          font-size: 8px;
          color: rgba(255,255,255,.34);
          text-align: center;
        }


        /* ---------- SUBTLE DIAGRAM MOTION ----------
           Only transform / opacity / stroke-dashoffset are animated so the
           locked ServiceCard layout is never changed. */
        @media (prefers-reduced-motion: no-preference) {
          /* Agentic AI */
          .svc-ai-core {
            animation: svcAiCorePulse 3.2s ease-in-out infinite;
            will-change: transform;
          }

          .svc-ai-lines path {
            stroke-dasharray: 5 8;
            animation: svcFlowDash 5s linear infinite;
          }

          .svc-ai-chip {
            will-change: transform;
          }

          .ai-memory { animation: svcFloatA 4.4s ease-in-out infinite; }
          .ai-tools { animation: svcFloatB 4.8s ease-in-out infinite .25s; }
          .ai-llm { animation: svcFloatB 4.3s ease-in-out infinite .5s; }
          .ai-workflow { animation: svcFloatA 4.9s ease-in-out infinite .75s; }
          .ai-human { animation: svcFloatCenter 4.6s ease-in-out infinite .35s; }

          .pulse-a {
            animation: svcDotPulse 1.8s ease-in-out infinite;
          }

          .pulse-b {
            animation: svcDotPulse 2.1s ease-in-out infinite .45s;
          }

          /* Cloud */
          .svc-cloud-top {
            animation: svcCloudBob 4.2s ease-in-out infinite;
            will-change: transform;
          }

          .svc-cloud-links path {
            stroke-dasharray: 5 9;
            animation: svcFlowDash 5.5s linear infinite;
          }

          .region-one {
            animation: svcFloatA 5s ease-in-out infinite;
          }

          .region-two {
            animation: svcFloatB 5.4s ease-in-out infinite .4s;
          }

          .svc-cloud-server-row i:nth-child(1) {
            animation: svcServerBlink 2.4s ease-in-out infinite;
          }

          .svc-cloud-server-row i:nth-child(2) {
            animation: svcServerBlink 2.4s ease-in-out infinite .35s;
          }

          .svc-cloud-server-row i:nth-child(3) {
            animation: svcServerBlink 2.4s ease-in-out infinite .7s;
          }

          /* Mobile */
          .svc-mobile-phone {
            animation: svcPhoneFloat 4.5s ease-in-out infinite;
            transform-origin: 50% 50%;
            will-change: transform;
          }

          .svc-mobile-links path {
            stroke-dasharray: 5 8;
            animation: svcFlowDash 5s linear infinite;
          }

          .badge-ios {
            animation: svcFloatA 4.7s ease-in-out infinite;
          }

          .badge-android {
            animation: svcFloatB 4.9s ease-in-out infinite .3s;
          }

          .badge-api {
            animation: svcFloatCenter 4.6s ease-in-out infinite .55s;
          }

          .svc-mobile-hero-card span {
            animation: svcSoftGlow 2.2s ease-in-out infinite;
          }

          .svc-mobile-nav .active {
            animation: svcSoftGlow 2.2s ease-in-out infinite .3s;
          }

          /* ERP */
          .svc-erp-topbar > span {
            animation: svcLivePulse 1.9s ease-in-out infinite;
          }

          .svc-erp-sidebar i.active {
            animation: svcSoftGlow 2s ease-in-out infinite;
          }

          .svc-erp-chart span {
            transform-origin: center bottom;
            animation: svcBarBreath 3.4s ease-in-out infinite;
          }

          .svc-erp-chart span:nth-child(2) { animation-delay: .18s; }
          .svc-erp-chart span:nth-child(3) { animation-delay: .36s; }
          .svc-erp-chart span:nth-child(4) { animation-delay: .54s; }
          .svc-erp-chart span:nth-child(5) { animation-delay: .72s; }

          .svc-erp-modules div:nth-child(1) {
            animation: svcModulePulse 3.8s ease-in-out infinite;
          }

          .svc-erp-modules div:nth-child(2) {
            animation: svcModulePulse 3.8s ease-in-out infinite .4s;
          }

          .svc-erp-modules div:nth-child(3) {
            animation: svcModulePulse 3.8s ease-in-out infinite .8s;
          }

          .svc-erp-modules div:nth-child(4) {
            animation: svcModulePulse 3.8s ease-in-out infinite 1.2s;
          }

          /* SEO / Growth */
          .svc-seo-chart polyline {
            stroke-dasharray: 900;
            stroke-dashoffset: 900;
            animation: svcChartDraw 4.8s ease-in-out infinite;
          }

          .svc-seo-chart .dot-1 {
            animation: svcDotPulse 2s ease-in-out infinite;
          }

          .svc-seo-chart .dot-2 {
            animation: svcDotPulse 2s ease-in-out infinite .45s;
          }

          .svc-seo-chart .dot-3 {
            animation: svcDotPulse 2s ease-in-out infinite .9s;
          }

          .svc-seo-kpis em {
            animation: svcSoftGlow 2.6s ease-in-out infinite;
          }

          /* Website */
          .svc-web-code-line {
            position: relative;
            overflow: hidden;
            animation: svcCodeBreath 3.4s ease-in-out infinite;
          }

          .svc-web-code-line:nth-child(2) { animation-delay: .22s; }
          .svc-web-code-line:nth-child(3) { animation-delay: .44s; }
          .svc-web-code-line:nth-child(4) { animation-delay: .66s; }

          .svc-web-preview-pill {
            animation: svcSoftGlow 2.3s ease-in-out infinite;
          }

          .svc-web-browser-body aside i.active {
            animation: svcSoftGlow 2.1s ease-in-out infinite .25s;
          }

          .svc-web-preview-card {
            animation: svcPreviewFloat 4.4s ease-in-out infinite;
            will-change: transform;
          }

          @keyframes svcAiCorePulse {
            0%, 100% {
              transform: translate(-50%, -50%) scale(1);
              box-shadow: 0 0 36px rgba(164,246,111,.05);
            }
            50% {
              transform: translate(-50%, -50%) scale(1.035);
              box-shadow: 0 0 52px rgba(164,246,111,.10);
            }
          }

          @keyframes svcFlowDash {
            to { stroke-dashoffset: -52; }
          }

          @keyframes svcFloatA {
            0%, 100% { transform: translate3d(0, 0, 0); }
            50% { transform: translate3d(0, -5px, 0); }
          }

          @keyframes svcFloatB {
            0%, 100% { transform: translate3d(0, 0, 0); }
            50% { transform: translate3d(0, 5px, 0); }
          }

          @keyframes svcFloatCenter {
            0%, 100% { transform: translate3d(-50%, 0, 0); }
            50% { transform: translate3d(-50%, -5px, 0); }
          }

          @keyframes svcDotPulse {
            0%, 100% {
              opacity: .45;
              transform: scale(.78);
              box-shadow: 0 0 10px rgba(164,246,111,.35);
            }
            50% {
              opacity: 1;
              transform: scale(1.35);
              box-shadow: 0 0 20px rgba(164,246,111,.75);
            }
          }

          @keyframes svcCloudBob {
            0%, 100% { transform: translate3d(-50%, 0, 0); }
            50% { transform: translate3d(-50%, -5px, 0); }
          }

          @keyframes svcServerBlink {
            0%, 100% {
              border-color: rgba(164,246,111,.10);
              background: linear-gradient(90deg, rgba(164,246,111,.05), rgba(255,255,255,.02));
            }
            50% {
              border-color: rgba(164,246,111,.30);
              background: linear-gradient(90deg, rgba(164,246,111,.15), rgba(255,255,255,.025));
            }
          }

          @keyframes svcPhoneFloat {
            0%, 100% {
              transform: translate(-50%, -50%) rotate(-.6deg);
            }
            50% {
              transform: translate(-50%, calc(-50% - 6px)) rotate(.6deg);
            }
          }

          @keyframes svcSoftGlow {
            0%, 100% {
              opacity: .7;
              filter: drop-shadow(0 0 0 rgba(164,246,111,0));
            }
            50% {
              opacity: 1;
              filter: drop-shadow(0 0 7px rgba(164,246,111,.38));
            }
          }

          @keyframes svcLivePulse {
            0%, 100% {
              background: rgba(164,246,111,.07);
              box-shadow: 0 0 0 rgba(164,246,111,0);
            }
            50% {
              background: rgba(164,246,111,.14);
              box-shadow: 0 0 14px rgba(164,246,111,.10);
            }
          }

          @keyframes svcBarBreath {
            0%, 100% { transform: scaleY(.94); opacity: .72; }
            50% { transform: scaleY(1.03); opacity: 1; }
          }

          @keyframes svcModulePulse {
            0%, 100% {
              border-color: rgba(255,255,255,.05);
              transform: translate3d(0, 0, 0);
            }
            50% {
              border-color: rgba(164,246,111,.15);
              transform: translate3d(0, -2px, 0);
            }
          }

          @keyframes svcChartDraw {
            0% {
              stroke-dashoffset: 900;
              opacity: .3;
            }
            35%, 70% {
              stroke-dashoffset: 0;
              opacity: 1;
            }
            100% {
              stroke-dashoffset: -900;
              opacity: .3;
            }
          }

          @keyframes svcCodeBreath {
            0%, 100% {
              opacity: .5;
              transform: scaleX(.96);
              transform-origin: left center;
            }
            50% {
              opacity: 1;
              transform: scaleX(1);
              transform-origin: left center;
            }
          }

          @keyframes svcPreviewFloat {
            0%, 100% { transform: translate3d(0, 0, 0); }
            50% { transform: translate3d(0, -4px, 0); }
          }
        }

        @media (max-width: 900px) {
          .svc-grid {
            grid-template-columns: 1fr;
            height: auto;
          }

          .svc-left,
          .svc-right {
            height: auto;
            min-height: 470px;
          }

          .svc-diagram {
            height: 250px;
          }
        }

        @media (max-width: 640px) {
          .svc-frame {
            padding: 0;
            border-radius: 22px;
          }

          .svc-grid {
            gap: 8px;
          }

          .svc-left,
          .svc-right {
            min-height: 430px;
            padding: 28px 24px;
            border-radius: 22px;
          }

          .svc-title {
            font-size: 38px !important;
          }

          .svc-description {
            font-size: 15px !important;
          }

          .svc-right-copy h4 {
            font-size: 25px !important;
          }

          .svc-diagram {
            height: 220px;
          }

          .svc-footer {
            flex-wrap: wrap;
          }

          .svc-phone {
            width: 84px;
            height: 148px;
          }
        }
      `}</style>
    </>
  );
};

export default ServiceCard;

function ServiceDiagram({
  variant = "web",
  centerLabel = "WEB",
  centerIcon = "</>",
  nodes = {},
}) {
  switch (variant) {
    case "ai":
      return <AiAgentDiagram />;
    case "cloud":
      return <CloudInfraDiagram />;
    case "mobile":
      return <MobileAppDiagram />;
    case "erp":
      return <ErpDashboardDiagram />;
    case "growth":
      return <SeoGrowthDiagram />;
    case "web":
    default:
      return <WebBrowserDiagram />;
  }
}

function AiAgentDiagram() {
  return (
    <div className="svc-diagram svc-ai-diagram">
      <div className="svc-grid-bg" />

      <svg className="svc-ai-lines" viewBox="0 0 700 260" preserveAspectRatio="none" aria-hidden="true">
        <path d="M350 130 L170 70" />
        <path d="M350 130 L165 190" />
        <path d="M350 130 L530 65" />
        <path d="M350 130 L540 192" />
        <path d="M350 130 L350 34" />
      </svg>

      <div className="svc-ai-core">
        <span className="svc-ai-core-icon">AI</span>
        <strong>Agent</strong>
        <small>Reason + Act</small>
      </div>

      <div className="svc-ai-chip ai-memory">
        <span>01</span>
        <strong>Memory</strong>
        <small>Context</small>
      </div>

      <div className="svc-ai-chip ai-tools">
        <span>02</span>
        <strong>Tools</strong>
        <small>Actions</small>
      </div>

      <div className="svc-ai-chip ai-llm">
        <span>03</span>
        <strong>LLM</strong>
        <small>Reasoning</small>
      </div>

      <div className="svc-ai-chip ai-workflow">
        <span>04</span>
        <strong>Workflow</strong>
        <small>Execute</small>
      </div>

      <div className="svc-ai-chip ai-human">
        <span>05</span>
        <strong>Human</strong>
        <small>Oversight</small>
      </div>

      <span className="svc-ai-pulse pulse-a" />
      <span className="svc-ai-pulse pulse-b" />
    </div>
  );
}

function CloudInfraDiagram() {
  return (
    <div className="svc-diagram svc-cloud-diagram">
      <div className="svc-grid-bg" />

      <div className="svc-cloud-top">
        <span className="svc-cloud-icon">☁</span>
        <div>
          <strong>Cloud Platform</strong>
          <small>Multi-region infrastructure</small>
        </div>
      </div>

      <div className="svc-cloud-region region-one">
        <span>REGION 01</span>
        <div className="svc-cloud-server-row">
          <i />
          <i />
          <i />
        </div>
        <small>Compute Cluster</small>
      </div>

      <div className="svc-cloud-region region-two">
        <span>REGION 02</span>
        <div className="svc-cloud-server-row">
          <i />
          <i />
          <i />
        </div>
        <small>Failover Cluster</small>
      </div>

      <div className="svc-cloud-bottom">
        <div><strong>99.99%</strong><small>Availability</small></div>
        <div><strong>Auto</strong><small>Scaling</small></div>
        <div><strong>24/7</strong><small>Monitoring</small></div>
      </div>

      <svg className="svc-cloud-links" viewBox="0 0 700 260" preserveAspectRatio="none" aria-hidden="true">
        <path d="M350 72 L205 138" />
        <path d="M350 72 L495 138" />
        <path d="M205 186 L350 218" />
        <path d="M495 186 L350 218" />
      </svg>
    </div>
  );
}

function MobileAppDiagram() {
  return (
    <div className="svc-diagram svc-mobile-diagram">
      <div className="svc-grid-bg" />

      <div className="svc-mobile-phone">
        <div className="svc-mobile-speaker" />
        <div className="svc-mobile-screen">
          <div className="svc-mobile-header">
            <span />
            <b>App</b>
            <span />
          </div>

          <div className="svc-mobile-hero-card">
            <small>ACTIVE USERS</small>
            <strong>24.8K</strong>
            <span>+18.6%</span>
          </div>

          <div className="svc-mobile-list">
            <i />
            <i />
            <i />
          </div>

          <div className="svc-mobile-nav">
            <span />
            <span className="active" />
            <span />
          </div>
        </div>
      </div>

      <div className="svc-mobile-badge badge-ios">
        <strong>iOS</strong>
        <small>Native UX</small>
      </div>

      <div className="svc-mobile-badge badge-android">
        <strong>Android</strong>
        <small>Native UX</small>
      </div>

      <div className="svc-mobile-badge badge-api">
        <strong>API</strong>
        <small>Connected</small>
      </div>

      <svg className="svc-mobile-links" viewBox="0 0 700 260" preserveAspectRatio="none" aria-hidden="true">
        <path d="M145 74 L286 105" />
        <path d="M555 74 L414 105" />
        <path d="M350 226 L350 198" />
      </svg>
    </div>
  );
}

function ErpDashboardDiagram() {
  return (
    <div className="svc-diagram svc-erp-diagram">
      <div className="svc-erp-sidebar">
        <span className="svc-erp-logo">ERP</span>
        <i className="active" />
        <i />
        <i />
        <i />
      </div>

      <div className="svc-erp-main">
        <div className="svc-erp-topbar">
          <div>
            <small>OPERATIONS</small>
            <strong>Business Overview</strong>
          </div>
          <span>Live</span>
        </div>

        <div className="svc-erp-stats">
          <div><small>Revenue</small><strong>$2.8M</strong><em>+12%</em></div>
          <div><small>Orders</small><strong>1,284</strong><em>+8%</em></div>
          <div><small>Inventory</small><strong>86%</strong><em>Stable</em></div>
        </div>

        <div className="svc-erp-content">
          <div className="svc-erp-chart">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>

          <div className="svc-erp-modules">
            <div><b>FIN</b><small>Finance</small></div>
            <div><b>HR</b><small>People</small></div>
            <div><b>INV</b><small>Inventory</small></div>
            <div><b>OPS</b><small>Operations</small></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SeoGrowthDiagram() {
  return (
    <div className="svc-diagram svc-seo-diagram">
      <div className="svc-grid-bg" />

      <div className="svc-seo-toolbar">
        <div>
          <small>ORGANIC PERFORMANCE</small>
          <strong>Growth Analytics</strong>
        </div>
        <span>Last 90 days</span>
      </div>

      <div className="svc-seo-kpis">
        <div><small>Traffic</small><strong>184K</strong><em>+31%</em></div>
        <div><small>Keywords</small><strong>2,948</strong><em>+22%</em></div>
        <div><small>CTR</small><strong>6.8%</strong><em>+1.4%</em></div>
      </div>

      <div className="svc-seo-chart">
        <span className="seo-grid-line line-1" />
        <span className="seo-grid-line line-2" />
        <span className="seo-grid-line line-3" />

        <svg viewBox="0 0 600 130" preserveAspectRatio="none" aria-hidden="true">
          <polyline
            points="0,118 55,108 105,112 160,86 215,92 265,66 320,74 375,42 430,52 485,24 540,34 600,8"
          />
        </svg>

        <span className="seo-dot dot-1" />
        <span className="seo-dot dot-2" />
        <span className="seo-dot dot-3" />
      </div>

      <div className="svc-seo-labels">
        <span>SEO</span>
        <span>Content</span>
        <span>PPC</span>
        <span>Analytics</span>
      </div>
    </div>
  );
}

function WebBrowserDiagram() {
  return (
    <div className="svc-diagram svc-web-diagram">
      <div className="svc-browser-window">
        <div className="svc-web-browser-top">
          <span /><span /><span />
          <div className="svc-web-address">jabitsoft.com</div>
        </div>

        <div className="svc-web-browser-body">
          <aside>
            <i className="active" />
            <i />
            <i />
            <i />
          </aside>

          <main>
            <div className="svc-web-code-card">
              <div className="svc-web-code-line w80" />
              <div className="svc-web-code-line w55" />
              <div className="svc-web-code-line w70" />
              <div className="svc-web-code-line w45" />
            </div>

            <div className="svc-web-preview-card">
              <span className="svc-web-preview-pill">Next.js</span>
              <strong>SSR / SSG</strong>
              <small>Fast rendering</small>
            </div>

            <div className="svc-web-bottom-row">
              <span>React</span>
              <span>Design System</span>
              <span>API</span>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
