import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const reviews = [
  {
    company: "Lumora Labs",
    service: "Web Platform",
    metric: "3.4×",
    metricLabel: "faster release cycles",
    quote:
      "The team translated a messy product brief into a platform that feels simple, fast, and genuinely built for scale. Communication stayed clear from kickoff through launch.",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=85",
    rating: 5,
    logo: "LL",
    logoVariant: "orb",
  },
  {
    company: "Northpeak Systems",
    service: "Cloud Consulting",
    metric: "42%",
    metricLabel: "lower infrastructure cost",
    quote:
      "We came in with performance issues and an expensive cloud setup. The architecture was cleaned up without slowing delivery, and the team gave us a setup our engineers could actually maintain.",
    rating: 5,
    logo: "NP",
    logoVariant: "frame",
  },
  {
    company: "Asteron Mobility",
    service: "Mobile App",
    quote:
      "Every screen felt considered. The app shipped smoothly, the handoff was clean, and the final product finally matched the quality we wanted our brand to represent.",
    rating: 5,
    logo: "AM",
    logoVariant: "pill",
  },
  {
    company: "Vertex Retail",
    service: "ERP Integration",
    quote:
      "They understood the operational side, not just the interface. Our inventory, reporting, and internal workflows now feel like one connected system instead of separate tools.",
    rating: 5,
    logo: "VR",
    logoVariant: "split",
  },
  {
    company: "Novexa Studio",
    service: "Website Development",
    quote:
      "The redesign gave us a much stronger digital presence without making the site feel over-designed. It is faster, clearer, and far easier for our team to manage.",
    rating: 5,
    logo: "NX",
    logoVariant: "diamond",
  },
  {
    company: "Crestline Finance",
    service: "Product Engineering",
    quote:
      "The strongest part was the technical judgment. They challenged weak ideas early, explained tradeoffs clearly, and kept the build moving without unnecessary complexity.",
    rating: 5,
    logo: "CF",
    logoVariant: "bars",
  },
  {
    company: "Orbitly",
    service: "Agentic AI",
    quote:
      "What started as an automation experiment became a reliable internal workflow. The agent architecture is practical, measurable, and much easier for our team to supervise.",
    rating: 5,
    logo: "OR",
    logoVariant: "orbit",
  },
  {
    company: "Morrow Health",
    service: "Cloud & Security",
    quote:
      "They brought structure to a project that had too many moving parts. Security, deployment, and monitoring were handled with the same level of care as the product itself.",
    rating: 5,
    logo: "MH",
    logoVariant: "cross",
  },
  {
    company: "Kite & Co.",
    service: "SEO & Growth",
    quote:
      "The work was refreshingly grounded in data. We stopped chasing random tactics and finally had a clear technical SEO and content plan tied to actual business goals.",
    rating: 5,
    logo: "KC",
    logoVariant: "kite",
  },
  {
    company: "Blueforge",
    service: "Digital Product",
    quote:
      "From the first workshop to final QA, the process felt deliberate. The result is cleaner, faster, and more polished than anything we had before.",
    rating: 5,
    logo: "BF",
    logoVariant: "grid",
  },
];

function LogoMark({ text, variant = "orb" }) {
  return (
    <span className={`cr-logo cr-logo-${variant}`} aria-hidden="true">
      <span>{text}</span>
    </span>
  );
}

function StarRating({ count = 5 }) {
  return (
    <div className="cr-stars" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => (
        <span
          className={`cr-star ${index < count ? "is-filled" : ""}`}
          aria-hidden="true"
          key={index}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function CompanyFooter({ item }) {
  return (
    <footer className="cr-company">
      <LogoMark text={item.logo} variant={item.logoVariant} />
      <div>
        <strong>{item.company}</strong>
        <span>{item.service}</span>
      </div>
    </footer>
  );
}

function RailCard({ item }) {
  return (
    <article className="cr-card cr-rail-card">
      <div className="cr-rail-rating-row">
        <StarRating count={item.rating} />
        <strong>{Number(item.rating).toFixed(1)}</strong>
      </div>
      <blockquote>“{item.quote}”</blockquote>
      <CompanyFooter item={item} />
    </article>
  );
}

export default function ClientResults() {
  const sectionRef = useRef(null);

  const [reducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      !!window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches,
  );

  const featured = reviews[0];
  const primary = reviews[1];
  const compact = reviews.slice(2, 4);
  const railReviews = useMemo(() => reviews.slice(4), []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    gsap.registerPlugin(ScrollTrigger);

    const reduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    )?.matches;

    if (reduced) return undefined;

    // Registry of per-mount cleanup callbacks (listeners, observers, clone
    // removal) so every resource created below is torn down on unmount and on
    // React StrictMode remount. Declared at the effect scope so the returned
    // cleanup function can always reach it.
    const cleanups = [];

    const ctx = gsap.context(() => {
      const headingChildren = gsap.utils.toArray(".cr-heading > *").filter(
        (el) => el.tagName !== "H2",
      );
      const cards = gsap.utils.toArray(".cr-card").filter(
        (el) => !el.classList.contains("cr-rail-card"),
      );
      const stars = gsap.utils.toArray(".cr-star");
      const logos = gsap.utils.toArray(".cr-logo");
      const metricValues = gsap.utils.toArray(".cr-metric strong");
      const image = section.querySelector(".cr-featured-media img");

      gsap.set(headingChildren, { y: 44, opacity: 0 });
      gsap.set(cards, {
        y: 44,
        opacity: 0,
        scale: 0.985,
        transformOrigin: "50% 50%",
      });
      gsap.set(stars, { opacity: 0, scale: 0.72 });
      gsap.set(logos, { opacity: 0, scale: 0.88 });
      gsap.set(metricValues, { y: 28, opacity: 0 });

      if (image) {
        const strength =
          window.innerWidth >= 1024 ? 1 : window.innerWidth >= 640 ? 0.75 : 0.5;
        gsap.set(image, { scale: 1 + 0.12 * strength });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
          once: true,
          invalidateOnRefresh: true,
        },
        defaults: { ease: "power3.out" },
      });

      tl.to(headingChildren, {
        y: 0,
        opacity: 1,
        duration: 0.62,
        stagger: 0.075,
      })
        .to(
          cards,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.72,
            stagger: 0.07,
          },
          "-=0.25",
        )
        .to(
          stars,
          {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            stagger: 0.014,
            ease: "power3.out",
          },
          "-=0.48",
        )
        .to(
          logos,
          {
            opacity: 1,
            scale: 1,
            duration: 0.42,
            stagger: 0.035,
            ease: "power4.out",
          },
          "-=0.4",
        )
        .to(
          metricValues,
          {
            y: 0,
            opacity: 1,
            duration: 0.42,
            stagger: 0.08,
          },
          "-=0.45",
        );

      if (image) {
        tl.to(
          image,
          {
            scale: 1,
            duration: 1.1,
            ease: "power2.out",
          },
          "-=0.8",
        );

        gsap.fromTo(
          image,
          { yPercent: -3.5 },
          {
            yPercent: 3.5,
            ease: "none",
            scrollTrigger: {
              trigger: ".cr-featured-media",
              start: "top bottom",
              end: "bottom top",
              scrub: 0.9,
              invalidateOnRefresh: true,
            },
          },
        );
      }

      // ——— Rail: seamless right-to-left marquee ———
      const rail = section.querySelector(".cr-rail");
      const track = rail?.querySelector(".cr-rail-track");
      const halfA = rail?.querySelector(".cr-rail-half-a");
      const halfB = rail?.querySelector(".cr-rail-half-b");

      if (rail && track && halfA && halfB) {
        // Entrance fade for the whole rail.
        gsap.fromTo(
          rail,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".cr-rail-wrap",
              start: "top 86%",
              once: true,
            },
          },
        );

        // Make each half wide enough to span the viewport so there is never a
        // blank gap. The two halves are always cloned together, preserving a
        // symmetric, seam-free loop. Generated clones are tagged so they can be
        // removed before any rebuild or on unmount, preventing accumulation.
        const CLONE_ATTR = "data-cr-clone";

        const removeClones = () => {
          [halfA, halfB].forEach((half) => {
            half
              .querySelectorAll(`[${CLONE_ATTR}]`)
              .forEach((node) => node.remove());
          });
        };

        const ensureWidth = () => {
          // Drop any clones from a previous run before rebuilding so repeated
          // resize / refresh cycles cannot keep adding duplicate cards.
          removeClones();
          const container = section.querySelector(".cr-rail");
          const needed = Math.max(
            window.innerWidth,
            container?.clientWidth ?? 0,
          );
          let guard = 0;
          while (halfA.scrollWidth < needed && guard < 14) {
            Array.from(halfA.children).forEach((card) => {
              const clone = card.cloneNode(true);
              clone.setAttribute(CLONE_ATTR, "true");
              clone.setAttribute("aria-hidden", "true");
              halfA.appendChild(clone);
            });
            Array.from(halfB.children).forEach((card) => {
              const clone = card.cloneNode(true);
              clone.setAttribute(CLONE_ATTR, "true");
              clone.setAttribute("aria-hidden", "true");
              halfB.appendChild(clone);
            });
            guard += 1;
          }
        };
        ensureWidth();

        const halfWidth = () => halfA.offsetWidth;

        const marquee = gsap.to(track, {
          x: () => -halfWidth(),
          duration: () => halfWidth() / 72,
          ease: "none",
          repeat: -1,
          paused: true,
        });

        // Start/pause the marquee only when its rail actually enters/leaves
        // the viewport. Created paused, so it never runs off-screen on load.
        ScrollTrigger.create({
          trigger: ".cr-rail-wrap",
          start: "top bottom",
          end: "bottom top",
          onEnter: () => marquee.play(),
          onEnterBack: () => marquee.play(),
          onLeave: () => marquee.pause(),
          onLeaveBack: () => marquee.pause(),
        });

        // Slow to a near-stop on hover, resume smoothly on leave.
        const railHoverSlow = () => {
          gsap.to(marquee, {
            timeScale: 0.12,
            duration: 0.5,
            ease: "power2.out",
            overwrite: true,
          });
        };
        const railHoverFast = () => {
          gsap.to(marquee, {
            timeScale: 1,
            duration: 0.6,
            ease: "power2.out",
            overwrite: true,
          });
        };
        rail.addEventListener("mouseenter", railHoverSlow);
        rail.addEventListener("mouseleave", railHoverFast);

        // Recompute width and speed when the container resizes.
        if (typeof ResizeObserver !== "undefined") {
          const resizer = new ResizeObserver(() => {
            ensureWidth();
            marquee.invalidate();
          });
          resizer.observe(rail);

          cleanups.push(() => resizer.disconnect());
        }

        cleanups.push(() => {
          rail.removeEventListener("mouseenter", railHoverSlow);
          rail.removeEventListener("mouseleave", railHoverFast);
          removeClones();
        });
      }

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
      cleanups.forEach((cleanup) => {
        if (typeof cleanup === "function") cleanup();
      });
      ctx?.revert();
    };
  }, []);

  return (
    <section
      className="client-results"
      ref={sectionRef}
      aria-labelledby="client-results-title"
    >
      <div className="cr-shell">
        <header className="cr-heading">
          <p className="cr-eyebrow">(Client Results)</p>
          <h2 id="client-results-title" data-reveal-heading>
            <span className="section-heading-fill">
              Proof, not promises.
            </span>
          </h2>
          <p className="cr-subhead">
            A collection of client feedback across product engineering,
            platforms, cloud, mobile, ERP, AI and digital growth.
          </p>
        </header>

        <div className="cr-grid">
          <article className="cr-card cr-card-featured">
            <div className="cr-metric-row">
              <div className="cr-metric">
                <strong>{featured.metric}</strong>
                <span>{featured.metricLabel}</span>
              </div>
              <span className="cr-card-type">Featured story</span>
            </div>

            <StarRating count={featured.rating} />

            <div className="cr-featured-media">
              <img
                src={featured.image}
                alt={`${featured.company} team collaborating on its ${featured.service.toLowerCase()} project`}
                width="1400"
                height="933"
                loading="lazy"
                decoding="async"
              />
              <span className="cr-media-tag">{featured.service}</span>
            </div>

            <blockquote>“{featured.quote}”</blockquote>
            <CompanyFooter item={featured} />
          </article>

          <div className="cr-right">
            <article className="cr-card cr-card-primary">
              <div className="cr-metric-row">
                <div className="cr-metric">
                  <strong>{primary.metric}</strong>
                  <span>{primary.metricLabel}</span>
                </div>
                <span className="cr-card-type">Client review</span>
              </div>

              <StarRating count={primary.rating} />
              <blockquote>“{primary.quote}”</blockquote>
              <CompanyFooter item={primary} />
            </article>

            <div className="cr-small-grid">
              {compact.map((item) => (
                <article className="cr-card cr-card-small" key={item.company}>
                  <StarRating count={item.rating} />
                  <blockquote>“{item.quote}”</blockquote>
                  <CompanyFooter item={item} />
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="cr-rail-wrap">
          <div className="cr-rail-layout">
            <aside className="cr-rail-intro" aria-label="More client notes">
              <div>
                <span className="cr-rail-kicker">More client notes</span>
                <h3>More teams.<br />Same standard.</h3>
              </div>

              <p>
                Additional feedback across product engineering, cloud, mobile,
                ERP, AI and digital growth.
              </p>

              <div className="cr-rail-proof" aria-hidden="true">
                <div className="cr-rail-proof-stack">
                  {railReviews.slice(0, 3).map((item) => (
                    <span key={item.company}>{item.logo}</span>
                  ))}
                </div>
                <small>Selected client feedback</small>
              </div>
            </aside>

            <div className={`cr-rail${reducedMotion ? " cr-rail--static" : ""}`}>
              <div className="cr-rail-track">
                <div className="cr-rail-half cr-rail-half-a">
                  {railReviews.map((item) => (
                    <RailCard
                      key={item.company}
                      item={item}
                    />
                  ))}
                </div>

                {!reducedMotion && (
                  <div className="cr-rail-half cr-rail-half-b" aria-hidden="true">
                    {railReviews.map((item) => (
                      <RailCard
                        key={item.company}
                        item={item}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .client-results,
        .client-results * {
          box-sizing: border-box;
        }

        .client-results {
          position: relative;
          padding: clamp(92px, 9vw, 150px) 0;
          overflow: hidden;
          background: #ffffff;
          color: var(--ink);
        }

        .cr-shell {
          width: min(1440px, calc(100% - clamp(28px, 4vw, 72px)));
          margin: 0 auto;
        }

        .cr-heading {
          max-width: 780px;
          margin: 0 auto clamp(46px, 5vw, 74px);
          text-align: center;
        }

        .cr-eyebrow {
          margin: 0 0 14px;
          font-family: Inter, "DM Sans", -apple-system, BlinkMacSystemFont, sans-serif;
          font-style: normal;
          font-weight: 500;
          font-size: 15px;
          line-height: 23px;
          color: rgb(92, 92, 92);
        }

        .cr-heading h2 {
          margin: 0;
          font-family: "Plus Jakarta Sans", Inter, sans-serif;
          font-style: normal;
          font-weight: 700;
          font-size: 50px;
          line-height: 54px;
          letter-spacing: normal;
          color: rgb(19, 19, 19);
        }

        .cr-subhead {
          max-width: 620px;
          margin: 20px auto 0;
          font-size: 16px;
          line-height: 1.62;
          color: rgba(17,17,17,.54);
        }

        .cr-grid {
          display: grid;
          grid-template-columns: minmax(0,.93fr) minmax(0,1.07fr);
          gap: 16px;
          align-items: stretch;
        }

        .cr-right {
          display: grid;
          grid-template-rows: minmax(0,1fr) auto;
          gap: 16px;
          min-width: 0;
        }

        .cr-small-grid {
          display: grid;
          grid-template-columns: repeat(2,minmax(0,1fr));
          gap: 16px;
        }

        .cr-card {
          position: relative;
          display: flex;
          flex-direction: column;
          min-width: 0;
          padding: clamp(26px,2.45vw,38px);
          overflow: hidden;
          border: 1px solid rgba(17,17,17,.055);
          border-radius: 22px;
          background: #ffffff;
          box-shadow: none;
        }

        .cr-card::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0;
          background:
            radial-gradient(circle at 82% 8%, rgba(132,233,91,.10), transparent 32%);
          transition: opacity 350ms ease;
        }

        .cr-card-featured {
          min-height: 650px;
        }

        .cr-card-primary {
          min-height: 320px;
        }

        .cr-card-small {
          min-height: 282px;
        }

        .cr-metric-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 28px;
        }

        .cr-metric {
          display: flex;
          align-items: baseline;
          gap: 10px;
          min-width: 0;
        }

        .cr-metric strong {
          font-size: clamp(27px,2.4vw,36px);
          line-height: 1;
          font-weight: 650;
          letter-spacing: -.045em;
          color: #111111;
        }

        .cr-metric span {
          max-width: 180px;
          font-size: 12px;
          line-height: 1.35;
          color: rgba(17,17,17,.5);
        }

        .cr-card-type {
          flex: 0 0 auto;
          padding-top: 5px;
          font-size: 10px;
          color: rgba(17,17,17,.35);
          text-transform: uppercase;
          letter-spacing: .08em;
        }

        .cr-stars {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 4px;
          margin-bottom: 25px;
        }

        .cr-star {
          display: inline-block;
          font-size: 15px;
          line-height: 1;
          color: rgba(17,17,17,.14);
          transform-origin: 50% 50%;
        }

        .cr-star.is-filled {
          color: #111111;
        }

        .cr-featured-media {
          position: relative;
          height: clamp(250px,24vw,340px);
          margin: 4px 0 28px;
          overflow: hidden;
          border-radius: 15px;
          background: #e9e9e6;
        }

        .cr-featured-media img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform-origin: 50% 50%;
          transition: transform 650ms cubic-bezier(.2,.7,.2,1);
        }

        .cr-media-tag {
          position: absolute;
          left: 14px;
          bottom: 14px;
          display: inline-flex;
          align-items: center;
          min-height: 30px;
          padding: 7px 11px;
          border-radius: 999px;
          background: rgba(255,255,255,.91);
          backdrop-filter: blur(10px);
          font-size: 10px;
          font-weight: 500;
          color: #171717;
        }

        .cr-card blockquote {
          position: relative;
          z-index: 1;
          margin: 0;
          font-size: 15px;
          line-height: 1.6;
          font-weight: 400;
          letter-spacing: -.01em;
          color: rgba(17,17,17,.65);
        }

        .cr-card-primary blockquote {
          max-width: 760px;
          font-size: 16px;
        }

        .cr-card-small blockquote {
          font-size: 14px;
        }

        .cr-company {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: auto;
          padding-top: 30px;
        }

        .cr-company > div {
          min-width: 0;
        }

        .cr-company strong,
        .cr-company span {
          display: block;
        }

        .cr-company strong {
          font-size: 13px;
          line-height: 1.2;
          font-weight: 600;
          color: #171717;
        }

        .cr-company span {
          margin-top: 3px;
          font-size: 11px;
          line-height: 1.3;
          color: rgba(17,17,17,.45);
        }

        .cr-logo {
          position: relative;
          flex: 0 0 auto;
          display: grid;
          place-items: center;
          width: 44px;
          height: 44px;
          overflow: hidden;
          border: 1px solid rgba(17,17,17,.08);
          background: #f4f4f1;
          color: #111111;
        }

        .cr-logo span {
          position: relative;
          z-index: 2;
          margin: 0;
          font-size: 10px;
          line-height: 1;
          font-weight: 700;
          letter-spacing: -.03em;
          color: inherit;
        }

        .cr-logo-orb {
          border-radius: 50%;
          background:
            radial-gradient(circle at 32% 30%, #a5f26b 0 13%, transparent 14%),
            #171717;
          color: #ffffff;
        }

        .cr-logo-frame {
          border-radius: 12px;
          box-shadow: inset 0 0 0 5px #171717;
          background: #ffffff;
        }

        .cr-logo-pill {
          border-radius: 999px;
          background: #171717;
          color: #ffffff;
        }

        .cr-logo-split {
          border-radius: 50%;
          background: linear-gradient(90deg,#171717 0 50%,#a5f26b 50% 100%);
          color: #ffffff;
        }

        .cr-logo-diamond {
          border-radius: 12px;
          background: #171717;
          color: #ffffff;
        }

        .cr-logo-diamond::before {
          content: "";
          position: absolute;
          width: 17px;
          height: 17px;
          border: 1px solid #a5f26b;
          transform: rotate(45deg);
        }

        .cr-logo-bars {
          border-radius: 12px;
          background:
            linear-gradient(90deg,transparent 0 22%,#171717 22% 31%,transparent 31% 43%,#171717 43% 52%,transparent 52% 64%,#a5f26b 64% 73%,transparent 73%);
        }

        .cr-logo-orbit {
          border-radius: 50%;
          background: #171717;
          color: #ffffff;
        }

        .cr-logo-orbit::before {
          content: "";
          position: absolute;
          width: 29px;
          height: 15px;
          border: 1px solid #a5f26b;
          border-radius: 50%;
          transform: rotate(-30deg);
        }

        .cr-logo-cross {
          border-radius: 12px;
          background:
            linear-gradient(#171717,#171717) center/7px 28px no-repeat,
            linear-gradient(90deg,#171717,#171717) center/28px 7px no-repeat,
            #f5f5f2;
        }

        .cr-logo-kite {
          border-radius: 12px;
          background: #171717;
          color: #ffffff;
        }

        .cr-logo-kite::before {
          content: "";
          position: absolute;
          width: 20px;
          height: 20px;
          border: 1px solid #a5f26b;
          transform: rotate(45deg);
        }

        .cr-logo-grid {
          border-radius: 12px;
          background:
            linear-gradient(90deg,rgba(17,17,17,.92) 1px,transparent 1px),
            linear-gradient(rgba(17,17,17,.92) 1px,transparent 1px),
            #a5f26b;
          background-size: 10px 10px;
        }

        .cr-rail-wrap {
          margin-top: clamp(64px, 7vw, 104px);
        }

        .cr-rail-layout {
          display: grid;
          grid-template-columns: 330px minmax(0, 1fr);
          gap: 24px;
          align-items: stretch;
        }

        .cr-rail-intro {
          position: relative;
          z-index: 2;
          display: flex;
          min-height: 336px;
          flex-direction: column;
          justify-content: space-between;
          padding: 34px;
          overflow: hidden;
          border-radius: 26px;
          background:
            radial-gradient(circle at 88% 12%, rgba(0,113,227,.24), transparent 30%),
            #151922;
          color: #ffffff;
        }

        .cr-rail-intro::after {
          content: "";
          position: absolute;
          right: -72px;
          bottom: -96px;
          width: 210px;
          height: 210px;
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 50%;
          box-shadow:
            0 0 0 32px rgba(255,255,255,.025),
            0 0 0 66px rgba(255,255,255,.018);
          pointer-events: none;
        }

        .cr-rail-kicker {
          display: block;
          margin-bottom: 16px;
          font-family: Inter, "DM Sans", -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: 11px;
          font-weight: 650;
          line-height: 1.2;
          text-transform: uppercase;
          letter-spacing: .12em;
          color: rgba(255,255,255,.54);
        }

        .cr-rail-intro h3 {
          position: relative;
          z-index: 1;
          margin: 0;
          font-family: "Plus Jakarta Sans", Inter, sans-serif;
          font-size: clamp(31px, 2.7vw, 42px);
          line-height: 1.02;
          font-weight: 650;
          letter-spacing: -.05em;
          color: #ffffff;
        }

        .cr-rail-intro > p {
          position: relative;
          z-index: 1;
          max-width: 24ch;
          margin: 34px 0 0;
          font-family: Inter, "DM Sans", -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: 13px;
          line-height: 1.65;
          color: rgba(255,255,255,.62);
        }

        .cr-rail-proof {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 11px;
          margin-top: 28px;
        }

        .cr-rail-proof-stack {
          display: flex;
          align-items: center;
        }

        .cr-rail-proof-stack span {
          display: grid;
          width: 34px;
          height: 34px;
          place-items: center;
          margin-left: -8px;
          border: 2px solid #151922;
          border-radius: 50%;
          background: #f5f7fa;
          color: #151922;
          font-family: Inter, sans-serif;
          font-size: 8px;
          font-weight: 750;
          letter-spacing: -.02em;
        }

        .cr-rail-proof-stack span:first-child {
          margin-left: 0;
          background: #eaf2ff;
          color: #456790;
        }

        .cr-rail-proof-stack span:nth-child(2) {
          background: #eef1f5;
        }

        .cr-rail-proof-stack span:nth-child(3) {
          background: #edf6f8;
          color: #3f7482;
        }

        .cr-rail-proof small {
          max-width: 90px;
          font-family: Inter, sans-serif;
          font-size: 10px;
          line-height: 1.35;
          color: rgba(255,255,255,.54);
        }

        .cr-rail {
          position: relative;
          min-width: 0;
          overflow: hidden;
          padding-bottom: 2px;
          border-radius: 26px;
          mask-image: linear-gradient(
            to right,
            #000 0,
            #000 calc(100% - 70px),
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to right,
            #000 0,
            #000 calc(100% - 70px),
            transparent 100%
          );
        }

        .cr-rail--static {
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
          overscroll-behavior-inline: contain;
          mask-image: none;
          -webkit-mask-image: none;
        }

        .cr-rail--static::-webkit-scrollbar {
          display: none;
        }

        .cr-rail-track {
          display: flex;
          width: max-content;
          height: 100%;
          gap: 0;
          will-change: transform;
        }

        .cr-rail-half {
          display: flex;
          align-items: stretch;
          gap: 18px;
          padding-right: 18px;
          flex: 0 0 auto;
        }

        .cr-rail--static .cr-rail-half {
          padding-right: 0;
        }

        .cr-rail-card {
          flex: 0 0 clamp(330px, 30vw, 390px);
          min-height: 336px;
          padding: 28px;
          border-color: rgba(21,25,34,.065);
          border-radius: 24px;
          background: #ffffff;
          scroll-snap-align: start;
        }

        .cr-rail-rating-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 26px;
        }

        .cr-rail-rating-row .cr-stars {
          margin-bottom: 0;
          gap: 3px;
        }

        .cr-rail-rating-row .cr-star {
          font-size: 14px;
        }

        .cr-rail-rating-row .cr-star.is-filled {
          color: #0071e3;
        }

        .cr-rail-rating-row > strong {
          font-family: Inter, sans-serif;
          font-size: 18px;
          line-height: 1;
          font-weight: 700;
          letter-spacing: -.035em;
          color: #151922;
        }

        .cr-rail-card blockquote {
          font-family: Inter, "DM Sans", -apple-system, BlinkMacSystemFont, sans-serif;
          font-size: 16px;
          line-height: 1.55;
          letter-spacing: -.015em;
          color: rgba(21,25,34,.72);
        }

        .cr-rail-card .cr-company {
          padding-top: 38px;
        }

        .cr-rail-card .cr-logo {
          border-color: rgba(21,25,34,.08);
          background: #f2f5f8;
        }

        @media (hover:hover) and (pointer:fine) {
          .cr-card {
            transition:
              transform 350ms ease,
              border-color 350ms ease;
          }

          .cr-card:hover {
            transform: translateY(-3px);
            border-color: rgba(17,17,17,.1);
          }

          .cr-card:hover::after {
            opacity: 1;
          }

          .cr-rail-card:hover {
            border-color: rgba(0,113,227,.12);
            background: #f3f7ff;
          }

          .cr-rail-card:hover::after {
            opacity: 0;
          }

          .cr-card-featured:hover .cr-featured-media img {
            transform: scale(1.035);
          }
        }

        @media (max-width: 980px) {
          .cr-grid {
            grid-template-columns: 1fr;
          }

          .cr-card-featured,
          .cr-card-primary,
          .cr-card-small {
            min-height: auto;
          }

          .cr-rail-layout {
            grid-template-columns: 290px minmax(0, 1fr);
          }

          .cr-rail-intro {
            min-height: 320px;
            padding: 28px;
          }

          .cr-rail-card {
            flex-basis: min(68vw,380px);
            min-height: 320px;
          }
        }

        @media (max-width: 680px) {
          .client-results {
            padding: 78px 0;
          }

          .cr-shell {
            width: min(100% - 24px,1440px);
          }

          .cr-heading {
            margin-bottom: 38px;
          }

          .cr-heading h2 {
            font-size: 42px;
            line-height: 46px;
          }

          .cr-small-grid {
            grid-template-columns: 1fr;
          }

          .cr-card {
            padding: 24px;
            border-radius: 18px;
          }

          .cr-metric-row {
            margin-bottom: 22px;
          }

          .cr-featured-media {
            height: 235px;
          }

          .cr-rail-layout {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .cr-rail-intro {
            min-height: 280px;
            padding: 26px;
            border-radius: 22px;
          }

          .cr-rail-intro h3 {
            font-size: 34px;
          }

          .cr-rail-intro > p {
            max-width: 34ch;
            margin-top: 24px;
          }

          .cr-rail {
            width: calc(100vw - 24px);
            margin-left: 0;
            border-radius: 22px;
            mask-image: linear-gradient(
              to right,
              #000 0,
              #000 calc(100% - 36px),
              transparent 100%
            );
            -webkit-mask-image: linear-gradient(
              to right,
              #000 0,
              #000 calc(100% - 36px),
              transparent 100%
            );
          }

          .cr-rail-half {
            gap: 14px;
            padding-right: 14px;
          }

          .cr-rail-card {
            flex-basis: min(84vw,340px);
            min-height: 290px;
            padding: 24px;
            border-radius: 20px;
          }

          .cr-rail-card blockquote {
            font-size: 14px;
          }
        }
      `}</style>
    </section>
  );
}
