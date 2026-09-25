"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { blogArticles, getBlogImage } from "@/data/blog";
import { RevealGroup } from "@/components/motion/reveal";

const posts = blogArticles.map((article) => ({
  ...article,
  image: getBlogImage(article),
  href: `/blogs/${article.slug}`,
}));

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true">
      <path d="M4 14 14 4M7 4h7v7" />
    </svg>
  );
}

export default function LatestBlog() {
  const sectionRef = useRef(null);
  const visiblePosts = posts.slice(0, 3);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduced) return undefined;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const header = section.querySelector(".latest-blog__header");

      const entrance = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
          once: true,
          invalidateOnRefresh: true,
        },
        defaults: { ease: "power4.out" },
      });

      if (header) {
        entrance.fromTo(header, { autoAlpha: 0, y: 34 }, { autoAlpha: 1, y: 0, duration: 0.66 });
      }

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
        className="latest-blog"
        id="blog"
        aria-labelledby="latest-blog-title"
      >
        <div className="latest-blog__shell">
          <header className="latest-blog__header">
            <div className="latest-blog__heading">
              <p className="latest-blog__eyebrow">Latest Blog</p>
              <h2 id="latest-blog-title" data-reveal-heading>
                <span className="section-heading-fill">
                  Ideas for building better digital products.
                </span>
              </h2>
            </div>

            <div className="latest-blog__header-side">
              <p>
                Practical notes on software, product engineering, AI, cloud, growth, and the
                technology behind modern businesses.
              </p>

              <a
                className="latest-blog__view-all"
                href="/blogs"
                data-site-button
                data-button-variant="secondary"
              >
                View all blogs
                <ArrowUpRight />
              </a>
            </div>
          </header>

          <RevealGroup
            className={`latest-blog__grid ${
              visiblePosts.length === 1 ? "latest-blog__grid--single" : ""
            }`}
          >
            {visiblePosts.map((post, index) => (
              <article
                className="latest-blog__card"
                key={post.title}
                style={{ "--blog-delay": `${index * 120}ms` }}
              >
                <a className="latest-blog__image-wrap" href={post.href}>
                  <div className="latest-blog__image-media">
                    <img
                      src={post.image}
                      alt={`${post.title} article cover`}
                      width="1400"
                      height="933"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <span className="latest-blog__category">{post.category}</span>

                  <span className="latest-blog__card-arrow">
                    <ArrowUpRight />
                  </span>
                </a>

                <div className="latest-blog__meta">
                  <span>{post.date}</span>
                  <span className="latest-blog__meta-dot" />
                  <span>{post.readTime}</span>
                </div>

                <h3>
                  <a href={post.href}>{post.title}</a>
                </h3>

                <p className="latest-blog__excerpt">{post.excerpt}</p>
              </article>
            ))}
          </RevealGroup>
        </div>
      </section>

      <style>{`
        .latest-blog,
        .latest-blog * {
          box-sizing: border-box;
        }

        .latest-blog {
          --blog-blue: var(--brand-accent);
          position: relative;
          width: 100%;
          margin-top: -1px;
          padding: 54px 0 118px;
          overflow: hidden;
          background: #ffffff;
          color: var(--ink);
        }

        .latest-blog__shell {
          width: min(1460px, calc(100% - 64px));
          margin: 0 auto;
        }

        .latest-blog__header {
          display: grid;
          grid-template-columns: minmax(0, 1.35fr) minmax(320px, 0.65fr);
          gap: clamp(54px, 8vw, 140px);
          align-items: end;
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        .latest-blog__eyebrow {
          margin: 0 0 20px;
          font-family: Inter, "DM Sans", -apple-system, BlinkMacSystemFont, sans-serif;
          font-style: normal;
          font-weight: 500;
          font-size: 15px;
          line-height: 23px;
          color: rgb(92, 92, 92);
        }

        .latest-blog__heading h2 {
          max-width: 760px;
          margin: 0;
          font-family: "Plus Jakarta Sans", Inter, sans-serif;
          font-style: normal;
          font-weight: 700;
          font-size: 50px;
          line-height: 54px;
          letter-spacing: normal;
          color: rgb(19, 19, 19);
        }

        .latest-blog__header-side {
          padding-bottom: 5px;
        }

        .latest-blog__header-side > p {
          max-width: 430px;
          margin: 0;
          color: #686868;
          font-family: "Inter", sans-serif;
          font-size: 14px;
          line-height: 1.7;
        }

        .latest-blog__view-all {
          display: inline-flex;
          min-height: 50px;
          margin-top: 24px;
          padding: 0 22px;
          align-items: center;
          justify-content: center;
          gap: 9px;
          border-radius: 999px;
          background: #1f1f1f;
          color: #ffffff;
          font-family: "Inter", sans-serif;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.16);
          transition:
            transform 200ms ease,
            background 200ms ease,
            box-shadow 200ms ease;
        }

        .latest-blog__view-all svg,
        .latest-blog__card-arrow svg {
          width: 14px;
          height: 14px;
          fill: none;
          stroke: currentColor;
          stroke-width: 1.6;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .latest-blog__view-all:hover {
          transform: translateY(-2px);
          background: #131313;
          color: #ffffff;
          box-shadow: 0 14px 28px rgba(0, 0, 0, 0.20);
        }

        .latest-blog__grid {
          display: grid;
          margin-top: 76px;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: clamp(18px, 2vw, 30px);
        }

        .latest-blog__card {
          min-width: 0;
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        .latest-blog__image-wrap {
          position: relative;
          display: block;
          width: 100%;
          height: 370px;
          overflow: hidden;
          border-radius: 26px;
          background: #e8e8e8;
        }

        .latest-blog__image-media {
          position: absolute;
          inset: 0;
          overflow: hidden;
          border-radius: inherit;
        }

        .latest-blog__image-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.002);
          transition: transform 650ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .latest-blog__card:hover .latest-blog__image-wrap img {
          transform: scale(1.045);
        }

        .latest-blog__image-wrap::after {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              180deg,
              rgba(0,0,0,0.02) 35%,
              rgba(0,0,0,0.18) 100%
            );
          pointer-events: none;
        }

        .latest-blog__category {
          position: absolute;
          z-index: 2;
          top: 16px;
          left: 16px;
          display: inline-flex;
          min-height: 31px;
          padding: 0 12px;
          align-items: center;
          border: 1px solid rgba(255,255,255,0.32);
          border-radius: 999px;
          background: rgba(255,255,255,0.88);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          color: #131313;
          font-family: "Inter", sans-serif;
          font-size: 11px;
          font-weight: 600;
        }

        .latest-blog__card-arrow {
          position: absolute;
          z-index: 2;
          right: 16px;
          bottom: 16px;
          display: grid;
          width: 42px;
          height: 42px;
          place-items: center;
          border-radius: 50%;
          background: rgba(255,255,255,0.92);
          color: #131313;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          transition:
            color 220ms ease,
            background 220ms ease,
            transform 220ms ease;
        }

        .latest-blog__card:hover .latest-blog__card-arrow {
          transform: rotate(7deg);
          background: var(--blog-blue);
          color: #ffffff;
        }

        .latest-blog__meta {
          display: flex;
          margin-top: 18px;
          align-items: center;
          gap: 9px;
          color: #858585;
          font-family: "Inter", sans-serif;
          font-size: 11px;
          font-weight: 500;
        }

        .latest-blog__meta-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #b1b1b1;
        }

        .latest-blog__card h3 {
          margin: 12px 0 0;
          font-family: "Plus Jakarta Sans", "Inter", sans-serif;
          font-size: clamp(21px, 1.55vw, 27px);
          font-weight: 700;
          line-height: 1.18;
          letter-spacing: 0.02em;
          word-spacing: 0.02em;
        }

        .latest-blog__card h3 a {
          color: #131313;
          text-decoration: none;
          transition: color 180ms ease;
        }

        .latest-blog__card:hover h3 a {
          color: #008fd8;
        }

        .latest-blog__excerpt {
          max-width: 520px;
          margin: 12px 0 0;
          color: #707070;
          font-family: "Inter", sans-serif;
          font-size: 13px;
          line-height: 1.65;
        }

        @media (max-width: 1050px) {
          .latest-blog {
            padding: 46px 0 96px;
          }

          .latest-blog__header {
            grid-template-columns: 1fr;
            gap: 28px;
          }

          .latest-blog__header-side {
            max-width: 620px;
          }

          .latest-blog__grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            margin-top: 58px;
          }

        }

        @media (max-width: 680px) {
          .latest-blog {
            padding: 40px 0 78px;
          }

          .latest-blog__shell {
            width: calc(100% - 24px);
          }

          .latest-blog__heading h2 {
            font-size: 42px;
            line-height: 46px;
          }

          .latest-blog__grid {
            grid-template-columns: 1fr;
            margin-top: 42px;
          }

          .latest-blog__image-wrap {
            height: 330px;
            border-radius: 22px;
          }

          .latest-blog__card h3 {
            font-size: 22px;
          }
        }

        @media (max-width: 430px) {
          .latest-blog__image-wrap {
            height: 285px;
          }

        }

        @media (prefers-reduced-motion: reduce) {
          .latest-blog__header,
          .latest-blog__filters,
          .latest-blog__card {
            opacity: 1;
            transform: none;
            transition: none;
          }

          .latest-blog__image-wrap img {
            transition: none;
          }
        }
      `}</style>
    </>
  );
}
