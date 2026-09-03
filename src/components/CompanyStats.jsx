"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RevealHeading from "./common/RevealHeading.jsx";

const stats = [
  {
    label: "Projects Delivered",
    value: 26,
    suffix: "+",
    title: "Products built for real business needs",
    description:
      "Web platforms, mobile apps, ERP systems, cloud solutions and AI-led products delivered for teams that needed reliable execution and room to scale.",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1400&q=84",
  },
  {
    label: "Client Satisfaction",
    value: 98,
    suffix: "%",
    title: "Partnerships built on clarity",
    description:
      "Clear communication, practical decisions and dependable delivery keep projects moving from first discussion through launch and support.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=84",
  },
  {
    label: "Core Service Areas",
    value: 6,
    suffix: "",
    title: "One technology partner, six capabilities",
    description:
      "Agentic AI, cloud consulting, mobile apps, ERP systems, web platforms and digital growth brought together under one delivery team.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=84",
  },
];

function CountUp({ end, suffix = "", run }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!run) return undefined;

    let frame;
    let start;

    const tick = (time) => {
      if (!start) start = time;
      const progress = Math.min((time - start) / 1200, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(end * eased));

      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [end, run]);

  return (
    <>
      {value}
      {suffix}
    </>
  );
}

export default function CompanyStats() {
  const sectionRef = useRef(null);
  const [runCounts, setRunCounts] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setRunCounts(true);
        observer.disconnect();
      },
      { threshold: 0.28 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    gsap.registerPlugin(ScrollTrigger);

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-company-stats-reveal]",
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.72,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            once: true,
          },
        },
      );

      const cards = gsap.utils.toArray(".company-stats-clean__card", section);

      cards.forEach((card) => {
        const image = card.querySelector(".company-stats-clean__card-bg");
        if (!image) return;

        gsap.fromTo(
          image,
          {
            scale: 1.22,
          },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 92%",
              end: "top 52%",
              scrub: 0.75,
            },
          },
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="company-stats-clean"
        aria-labelledby="company-stats-clean-title"
      >
        <div className="company-stats-clean__shell">
          <div className="company-stats-clean__intro" data-company-stats-reveal>
            <div className="company-stats-clean__intro-top">
              <p className="company-stats-clean__badge">
                <span aria-hidden="true">▰</span>
                JabitSoft in numbers
              </p>

              <RevealHeading id="company-stats-clean-title">
                Software built around real business outcomes.
              </RevealHeading>

              <p className="company-stats-clean__copy">
                We combine product thinking, design and engineering to build
                digital systems that solve operational problems, improve customer
                experiences and create a stronger foundation for growth.
              </p>

              <div className="company-stats-clean__capabilities">
                <div className="company-stats-clean__capability">
                  <span className="company-stats-clean__capability-dot" />
                  <div>
                    <strong>Product & Experience</strong>
                    <p>Strategy, UX and interfaces designed around real user needs.</p>
                  </div>
                </div>

                <div className="company-stats-clean__capability">
                  <span className="company-stats-clean__capability-dot" />
                  <div>
                    <strong>Engineering & Scale</strong>
                    <p>Web, mobile, cloud, ERP and AI systems built to grow reliably.</p>
                  </div>
                </div>

                <div className="company-stats-clean__capability">
                  <span className="company-stats-clean__capability-dot" />
                  <div>
                    <strong>Support & Improvement</strong>
                    <p>Ongoing optimization, maintenance and product evolution after launch.</p>
                  </div>
                </div>

                <div className="company-stats-clean__capability">
                  <span className="company-stats-clean__capability-dot" />
                  <div>
                    <strong>Performance & Growth</strong>
                    <p>Speed, SEO, analytics and continuous improvements focused on measurable business growth.</p>
                  </div>
                </div>
              </div>

              <a className="company-stats-clean__link" href="#works">
                Explore our work <span aria-hidden="true">↗</span>
              </a>
            </div>

          </div>

          <div className="company-stats-clean__cards">
            <article
              className="company-stats-clean__card company-stats-clean__card--featured"
              data-company-stats-reveal
            >
              <img
                className="company-stats-clean__card-bg"
                src={stats[0].image}
                alt=""
                aria-hidden="true"
              />
              <span className="company-stats-clean__card-shade" aria-hidden="true" />

              <div className="company-stats-clean__card-label">
                <span aria-hidden="true">▰</span>
                {stats[0].label}
              </div>

              <div className="company-stats-clean__metric">
                <strong>
                  <CountUp
                    end={stats[0].value}
                    suffix={stats[0].suffix}
                    run={runCounts}
                  />
                </strong>
                <h3>{stats[0].title}</h3>
                <p>{stats[0].description}</p>
              </div>
            </article>

            <div className="company-stats-clean__small-grid">
              {stats.slice(1).map((stat) => (
                <article
                  className="company-stats-clean__card"
                  data-company-stats-reveal
                  key={stat.label}
                >
                  <img
                    className="company-stats-clean__card-bg"
                    src={stat.image}
                    alt=""
                    aria-hidden="true"
                  />
                  <span className="company-stats-clean__card-shade" aria-hidden="true" />

                  <div className="company-stats-clean__card-label">
                    <span aria-hidden="true">▰</span>
                    {stat.label}
                  </div>

                  <div className="company-stats-clean__metric">
                    <strong>
                      <CountUp
                        end={stat.value}
                        suffix={stat.suffix}
                        run={runCounts}
                      />
                    </strong>
                    <h3>{stat.title}</h3>
                    <p>{stat.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .company-stats-clean,
        .company-stats-clean * {
          box-sizing: border-box;
        }

        .company-stats-clean {
          width: 100%;
          padding: 96px 0 118px;
          background: #ffffff;
          color: #131313;
        }

        .company-stats-clean__shell {
          display: grid;
          grid-template-columns: minmax(320px, 0.78fr) minmax(0, 1.22fr);
          width: min(1420px, calc(100% - 64px));
          margin: 0 auto;
          gap: clamp(64px, 7vw, 120px);
          align-items: stretch;
        }

        .company-stats-clean__intro {
          display: flex;
          min-height: 610px;
          flex-direction: column;
          justify-content: flex-start;
          padding: 10px 0 8px;
        }

        .company-stats-clean__badge {
          display: inline-flex;
          width: fit-content;
          min-height: 30px;
          margin: 0 0 18px;
          padding: 0 10px;
          align-items: center;
          gap: 7px;
          border-radius: 999px;
          background: #f5f5f3;
          color: #5c5c5c;
          font-family: Inter, sans-serif;
          font-size: 12px;
          font-weight: 500;
          line-height: 1;
        }

        .company-stats-clean__badge span {
          color: #00aaff;
          font-size: 10px;
        }

        .company-stats-clean__intro h2 {
          max-width: 520px;
          margin: 0;
          font-family: "Plus Jakarta Sans", Inter, sans-serif;
          font-style: normal;
          font-weight: 700;
          font-size: 50px;
          line-height: 54px;
          letter-spacing: normal;
          color: rgb(19, 19, 19);
        }

        .company-stats-clean__copy {
          max-width: 460px;
          margin: 24px 0 0;
          color: #737373;
          font-family: Inter, sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 1.72;
        }

        .company-stats-clean__capabilities {
          display: grid;
          gap: 22px;
          max-width: 490px;
          margin-top: 32px;
        }

        .company-stats-clean__capability {
          display: grid;
          grid-template-columns: 12px minmax(0, 1fr);
          gap: 12px;
          align-items: start;
          padding-top: 0;
          border-top: 0;
        }

        .company-stats-clean__capability-dot {
          width: 8px;
          height: 8px;
          margin-top: 6px;
          border-radius: 50%;
          background: #00aaff;
          box-shadow: 0 0 0 5px rgba(0, 170, 255, 0.08);
        }

        .company-stats-clean__capability strong {
          display: block;
          margin-bottom: 4px;
          color: #131313;
          font-family: "Plus Jakarta Sans", Inter, sans-serif;
          font-size: 14px;
          font-weight: 600;
          line-height: 1.3;
        }

        .company-stats-clean__capability p {
          margin: 0;
          color: #777777;
          font-family: Inter, sans-serif;
          font-size: 12.5px;
          line-height: 1.55;
        }

        .company-stats-clean__link {
          display: inline-flex;
          width: fit-content;
          min-height: 50px;
          margin-top: 28px;
          padding: 0 22px;
          align-items: center;
          justify-content: center;
          gap: 9px;
          border-radius: 999px;
          background: #1f1f1f;
          color: #ffffff;
          font-family: Inter, sans-serif;
          font-size: 14px;
          font-weight: 600;
          line-height: 1;
          text-decoration: none;
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.16);
          transition:
            transform 200ms ease,
            background 200ms ease,
            box-shadow 200ms ease,
            gap 200ms ease;
        }

        .company-stats-clean__link:hover {
          transform: translateY(-2px);
          gap: 11px;
          background: #131313;
          color: #ffffff;
          box-shadow: 0 14px 28px rgba(0, 0, 0, 0.20);
        }





        .company-stats-clean__cards {
          display: grid;
          grid-template-rows: 1fr 1fr;
          min-height: 610px;
          gap: 12px;
        }

        .company-stats-clean__small-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }

        .company-stats-clean__card {
          position: relative;
          display: flex;
          min-width: 0;
          padding: 30px 32px;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 30px;
          background: rgba(0, 0, 0, 0);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
          isolation: isolate;
          transition:
            transform 220ms ease,
            border-color 220ms ease,
            box-shadow 220ms ease;
        }

        .company-stats-clean__card::after {
          content: "";
          position: absolute;
          inset: 1px;
          z-index: 0;
          pointer-events: none;
          border-radius: 29px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.15),
            inset 0 -1px 0 rgba(0, 0, 0, 0.08);
        }

        .company-stats-clean__card:hover {
          transform: translateY(-3px);
          border-color: rgba(255, 255, 255, 0.28);
          box-shadow: 0 12px 38px rgba(0, 0, 0, 0.14);
        }

        .company-stats-clean__card-bg {
          position: absolute;
          inset: 0;
          z-index: -2;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.22);
          transform-origin: center center;
          will-change: transform;
        }

        .company-stats-clean__card-shade {
          position: absolute;
          inset: 0;
          z-index: -1;
          background:
            linear-gradient(
              180deg,
              rgba(0, 0, 0, 0.08) 0%,
              rgba(0, 0, 0, 0.28) 48%,
              rgba(0, 0, 0, 0.66) 100%
            ),
            rgba(0, 0, 0, 0.08);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
          backdrop-filter: blur(7.2px);
          -webkit-backdrop-filter: blur(7.2px);
        }

        .company-stats-clean__card--featured .company-stats-clean__card-shade {
          background:
            linear-gradient(
              180deg,
              rgba(0, 0, 0, 0.04) 0%,
              rgba(0, 0, 0, 0.20) 45%,
              rgba(0, 0, 0, 0.62) 100%
            ),
            rgba(0, 0, 0, 0.06);
        }

        .company-stats-clean__card--featured {
          min-height: 300px;
        }

        .company-stats-clean__card-label {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.82);
          font-family: Inter, sans-serif;
          font-size: 13px;
          font-weight: 500;
          line-height: 1.4;
        }

        .company-stats-clean__card-label span {
          color: #00aaff;
          font-size: 11px;
        }

        .company-stats-clean__metric {
          position: relative;
          z-index: 2;
          margin-top: 48px;
        }

        .company-stats-clean__metric strong {
          display: block;
          margin-bottom: 10px;
          font-family: "Plus Jakarta Sans", Inter, sans-serif;
          font-size: clamp(58px, 6vw, 88px);
          font-weight: 600;
          line-height: 0.94;
          letter-spacing: -0.055em;
          color: #ffffff;
        }

        .company-stats-clean__small-grid .company-stats-clean__metric strong {
          font-size: clamp(52px, 5vw, 72px);
        }

        .company-stats-clean__metric h3 {
          max-width: 480px;
          margin: 0 0 10px;
          color: #ffffff;
          font-family: "Plus Jakarta Sans", Inter, sans-serif;
          font-size: 20px;
          font-weight: 600;
          line-height: 1.2;
          letter-spacing: -0.02em;
        }

        .company-stats-clean__metric p {
          max-width: 480px;
          margin: 0;
          color: rgba(255, 255, 255, 0.68);
          font-family: Inter, sans-serif;
          font-size: 13px;
          font-weight: 400;
          line-height: 1.55;
        }

        @media (prefers-reduced-motion: reduce) {
          .company-stats-clean__card-bg {
            transform: scale(1);
            will-change: auto;
          }
        }

        @media (max-width: 1000px) {
          .company-stats-clean__shell {
            grid-template-columns: 1fr;
            gap: 48px;
          }

          .company-stats-clean__intro {
            min-height: 0;
          }

        }

        @media (max-width: 680px) {
          .company-stats-clean {
            padding: 64px 0 82px;
          }

          .company-stats-clean__shell {
            width: calc(100% - 24px);
            gap: 38px;
          }

          .company-stats-clean__intro h2 {
            font-size: 42px;
            line-height: 46px;
          }

          .company-stats-clean__copy {
            font-size: 13px;
          }

          .company-stats-clean__capabilities {
            margin-top: 26px;
            gap: 18px;
          }

          .company-stats-clean__capability {
            padding-top: 0;
          }

          .company-stats-clean__capability p {
            font-size: 12px;
          }

          .company-stats-clean__cards {
            display: flex;
            min-height: 0;
            flex-direction: column;
          }

          .company-stats-clean__small-grid {
            grid-template-columns: 1fr;
          }

          .company-stats-clean__card {
            min-height: 230px;
            padding: 24px;
            border-radius: 24px;
          }

          .company-stats-clean__card--featured {
            min-height: 250px;
          }

          .company-stats-clean__metric {
            margin-top: 42px;
          }

          .company-stats-clean__metric strong,
          .company-stats-clean__small-grid .company-stats-clean__metric strong {
            font-size: 58px;
          }
        }
      `}</style>
    </>
  );
}
