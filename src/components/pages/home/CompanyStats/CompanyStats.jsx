"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RevealGroup } from "@/components/motion/reveal";

const stats = [
  {
    label: "Projects Delivered",
    value: 26,
    suffix: "+",
    title: "Built around the way teams work",
    description:
      "From web platforms and apps to ERP and cloud, each project starts with the way your team works.",
    image:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1400&q=84",
  },
  {
    label: "Client Satisfaction",
    value: 98,
    suffix: "%",
    title: "A smoother path from kickoff to launch",
    description:
      "Clear communication, practical decisions and dependable delivery shape every stage of collaboration.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=84",
  },
  {
    label: "Core Service Areas",
    value: 6,
    suffix: "",
    title: "Six capabilities, one delivery team",
    description:
      "Agentic AI, cloud consulting, mobile apps, ERP systems, web platforms and digital growth—all connected under one team.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=84",
  },
];

export default function CompanyStats() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    gsap.registerPlugin(ScrollTrigger);

    const reduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    )?.matches;

    const metricEls = gsap.utils.toArray(
      ".company-stats-clean__metric strong",
      section,
    );

    if (reduced) {
      metricEls.forEach((el) => {
        const end = Number(el.dataset.statValue || 0);
        const suffix = el.dataset.statSuffix || "";
        el.textContent = `${end}${suffix}`;
      });
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".company-stats-clean__intro",
        { autoAlpha: 0, y: 44, scale: 0.985 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.72,
          ease: "power4.out",
          stagger: 0.09,
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            once: true,
            invalidateOnRefresh: true,
          },
        },
      );

      metricEls.forEach((el) => {
        const end = Number(el.dataset.statValue || 0);
        const suffix = el.dataset.statSuffix || "";
        const proxy = { val: 0 };

        el.textContent = `0${suffix}`;

        gsap.to(proxy, {
          val: end,
          duration: 0.9,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = `${Math.round(proxy.val)}${suffix}`;
          },
          scrollTrigger: {
            trigger: el.closest(".company-stats-clean__card") || section,
            start: "top 84%",
            once: true,
            invalidateOnRefresh: true,
          },
        });
      });

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

      const headingFill = section.querySelector(".section-heading-fill");
      if (headingFill) {
        gsap.fromTo(
          headingFill,
          { backgroundSize: "0% 100%, 100% 100%" },
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
          },
        );
      }
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

              <h2 id="company-stats-clean-title" data-reveal-heading>
                <span className="section-heading-fill">
                  The experience behind software that moves business forward.
                </span>
              </h2>

              <p className="company-stats-clean__copy">
                From product strategy and design to engineering, launch and ongoing support, we help teams turn complex needs into reliable digital products.
              </p>

              <div className="company-stats-clean__capabilities">
                <div className="company-stats-clean__capability">
                  <span className="company-stats-clean__capability-dot" />
                  <div>
                    <strong>Product & Experience</strong>
                    <p>Shape products, UX and interfaces around real customer needs.</p>
                  </div>
                </div>

                <div className="company-stats-clean__capability">
                  <span className="company-stats-clean__capability-dot" />
                  <div>
                    <strong>Engineering & Scale</strong>
                    <p>Connect web, mobile, cloud and ERP into systems ready to evolve.</p>
                  </div>
                </div>

                <div className="company-stats-clean__capability">
                  <span className="company-stats-clean__capability-dot" />
                  <div>
                    <strong>Support & Improvement</strong>
                    <p>Keep products reliable with ongoing maintenance and thoughtful iteration.</p>
                  </div>
                </div>

                <div className="company-stats-clean__capability">
                  <span className="company-stats-clean__capability-dot" />
                  <div>
                    <strong>Performance & Growth</strong>
                    <p>Improve speed, SEO and analytics in line with business priorities.</p>
                  </div>
                </div>
              </div>

              <a className="company-stats-clean__link" href="#works" data-site-button data-button-variant="primary">
                Explore our work <span aria-hidden="true">↗</span>
              </a>
            </div>

          </div>

          <RevealGroup className="company-stats-clean__cards">
            <article
              className="company-stats-clean__card company-stats-clean__card--featured"
              data-company-stats-reveal
            >
              <img
                className="company-stats-clean__card-bg"
                src={stats[0].image}
                alt=""
                aria-hidden="true"
                width="1400"
                height="933"
                loading="lazy"
                decoding="async"
              />
              <span className="company-stats-clean__card-shade" aria-hidden="true" />

              <div className="company-stats-clean__card-label">
                <span aria-hidden="true">▰</span>
                {stats[0].label}
              </div>

              <div className="company-stats-clean__metric">
                <strong
                  data-stat-value={stats[0].value}
                  data-stat-suffix={stats[0].suffix}
                >
                  0{stats[0].suffix}
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
                    width="1200"
                    height="800"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="company-stats-clean__card-shade" aria-hidden="true" />

                  <div className="company-stats-clean__card-label">
                    <span aria-hidden="true">▰</span>
                    {stat.label}
                  </div>

                  <div className="company-stats-clean__metric">
                    <strong
                      data-stat-value={stat.value}
                      data-stat-suffix={stat.suffix}
                    >
                      0{stat.suffix}
                    </strong>
                    <h3>{stat.title}</h3>
                    <p>{stat.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </RevealGroup>
        </div>
      </section>

      <style>{`
        .company-stats-clean,
        .company-stats-clean * {
          box-sizing: border-box;
        }

        .company-stats-clean {
          width: 100%;
          padding: 96px 0 56px;
          background: #ffffff;
          color: var(--ink);
        }

        .company-stats-clean__shell {
          display: grid;
          grid-template-columns: minmax(320px, 0.78fr) minmax(0, 1.22fr);
          width: min(1360px, calc(100% - 64px));
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
          background: var(--paper-light);
          color: var(--ink-secondary);
          font-family: Inter, sans-serif;
          font-size: 12px;
          font-weight: 500;
          line-height: 1;
        }

        .company-stats-clean__badge span {
          color: var(--brand-accent);
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
          font-variant-numeric: tabular-nums;
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
            padding: 64px 0 40px;
          }

          .company-stats-clean__shell {
            width: calc(100% - 28px);
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
