"use client";

import { useEffect, useRef } from "react";

const posts = [
  {
    title: "Building Scalable Web Platforms with Next.js",
    excerpt:
      "A practical look at architecture, performance, rendering, and design systems for modern production-ready web products.",
    category: "Web Development",
    date: "28 Aug 2026",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1400&q=88",
  },
  {
    title: "Where Agentic AI Actually Creates Business Value",
    excerpt:
      "How AI agents can connect reasoning, tools, memory, and workflows without turning automation into unnecessary complexity.",
    category: "AI & Automation",
    date: "22 Aug 2026",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=88",
  },
  {
    title: "Designing Mobile Apps People Keep Using",
    excerpt:
      "The product, UX, performance, and engineering decisions that help mobile experiences feel fast, useful, and dependable.",
    category: "Mobile Apps",
    date: "16 Aug 2026",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=88",
  },
  {
    title: "A Better Cloud Migration Plan for Growing Teams",
    excerpt:
      "What to review before migration, where teams lose time, and how to build a secure cloud foundation that scales with the business.",
    category: "Cloud",
    date: "10 Aug 2026",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=88",
  },
  {
    title: "Technical SEO Changes That Improve Real Performance",
    excerpt:
      "A focused guide to site architecture, Core Web Vitals, crawlability, content structure, and measurable organic growth.",
    category: "SEO",
    date: "03 Aug 2026",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=88",
  },
  {
    title: "When Your Business Is Ready for a Custom ERP",
    excerpt:
      "How to identify fragmented workflows, reporting bottlenecks, and operational problems that justify a connected ERP system.",
    category: "ERP",
    date: "27 Jul 2026",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=88",
  },
];



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

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const reduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    )?.matches;

    if (reduced || !("IntersectionObserver" in window)) {
      section.classList.add("latest-blog--visible");
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        section.classList.add("latest-blog--visible");
        observer.unobserve(section);
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    observer.observe(section);
    return () => observer.disconnect();
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
              <p className="latest-blog__eyebrow">(Latest Blog)</p>
              <h2 id="latest-blog-title">
                Ideas for building better digital products.
              </h2>
            </div>

            <div className="latest-blog__header-side">
              <p>
                Practical notes on software, product engineering, AI, cloud,
                growth, and the technology behind modern businesses.
              </p>

              <a className="latest-blog__view-all" href="#blog">
                View all articles
                <ArrowUpRight />
              </a>
            </div>
          </header>

          <div
            className={`latest-blog__grid ${
              visiblePosts.length === 1 ? "latest-blog__grid--single" : ""
            }`}
          >
            {visiblePosts.map((post, index) => (
              <article
                className="latest-blog__card"
                key={post.title}
                style={{ "--blog-delay": `${index * 90}ms` }}
              >
                <a className="latest-blog__image-wrap" href="#blog">
                  <img src={post.image} alt="" loading="lazy" />
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
                  <a href="#blog">{post.title}</a>
                </h3>

                <p className="latest-blog__excerpt">{post.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .latest-blog,
        .latest-blog * {
          box-sizing: border-box;
        }

        .latest-blog {
          --blog-blue: #00aaff;
          position: relative;
          width: 100%;
          margin-top: -1px;
          padding: 54px 0 118px;
          overflow: hidden;
          background:
            linear-gradient(
              180deg,
              #ffffff 0%,
              #ffffff 12%,
              #fafaf8 34%,
              #f7f7f5 100%
            );
          color: #131313;
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
          opacity: 0;
          transform: translate3d(0, 42px, 0);
          transition:
            opacity 700ms cubic-bezier(0.16, 1, 0.3, 1),
            transform 900ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .latest-blog--visible .latest-blog__header {
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
          opacity: 0;
          transform: translate3d(0, 46px, 0);
          transition:
            opacity 600ms cubic-bezier(0.16, 1, 0.3, 1) var(--blog-delay),
            transform 820ms cubic-bezier(0.16, 1, 0.3, 1) var(--blog-delay);
        }

        .latest-blog--visible .latest-blog__card {
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
          letter-spacing: -0.035em;
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
