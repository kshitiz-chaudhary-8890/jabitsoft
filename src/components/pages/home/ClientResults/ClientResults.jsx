"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";
import { MapPin, Shield, Clock, ArrowUpRight, Star } from "lucide-react";
import RevealHeading from "@/components/common/RevealHeading";
const marqueeReviews = [
  {
    name: "Ananya S.",
    context: "Lumora Labs · Web Platform",
    avatar: "https://i.pravatar.cc/150?u=ananya",
    quote:
      "Every screen felt considered. The app shipped smoothly, the handoff was clean, and the final product finally matched our brand.",
  },
  {
    name: "Rohit M.",
    context: "Northpeak Systems · Cloud Consulting",
    avatar: "https://i.pravatar.cc/150?u=rohit",
    quote:
      "The architecture was cleaned up without slowing delivery — we ended up with a setup our engineers can actually maintain.",
  },
  {
    name: "Priya D.",
    context: "Vertex Retail · ERP Integration",
    avatar: "https://i.pravatar.cc/150?u=priya",
    quote:
      "Inventory, reporting, and internal workflows now feel like one connected system instead of separate tools.",
  },
];

const features = [
  { icon: MapPin, label: "Noida-born, delivering worldwide" },
  { icon: Shield, label: "Defense, Navy & Air Force-grade trust" },
  { icon: Clock, label: "Long-term partnerships since 2007" },
];

export default function ClientResults() {
  const reduced = useReducedMotion();

  return (
    <section className="ts-section" aria-labelledby="client-results-title">
      <div className="ts-wrap">
        {/* ---------- Header row ---------- */}
        <header className="cr-heading ts-header">
          <div className="ts-header-left">
            <p data-cr-intro className="cr-eyebrow">
              Client Results
            </p>
            <h2 id="client-results-title">
              <RevealHeading as="span">What clients say about our work</RevealHeading>
            </h2>
          </div>
          <p data-cr-intro className="cr-subhead ts-lede">
            Every product we ship is built on trust, clarity, and long-term support — in the words
            of the teams we build with.
          </p>
        </header>

        {/* ---------- Three-column grid ---------- */}
        <div className="ts-grid">
          {/* Left — stats / CTA card */}
          <div className="ts-stats">
            <div className="ts-rating-row">
              <div className="ts-rating">
                <strong>5.0</strong>
                <span>/5</span>
              </div>
              <p className="ts-rating-note">
                Based on <strong>50+ verified</strong>
                <br />
                client reviews
              </p>
            </div>

            <ul className="ts-features">
              {features.map(({ icon: Icon, label }) => (
                <li key={label}>
                  <Icon size={16} className="ts-feature-icon" />
                  <span>{label}</span>
                </li>
              ))}
            </ul>

            <div className="ts-cta">
              <p className="ts-cta-kicker">Ready to start your project?</p>
              <p className="ts-cta-title">Let&rsquo;s build it!</p>
              <div className="ts-cta-buttons">
                <a className="ts-cta-pill" href="mailto:hello@jabitsoft.com?subject=New%20Project" data-site-button data-button-variant="primary">
                  Start a project
                </a>
                <a
                  className="ts-cta-round"
                  href="mailto:hello@jabitsoft.com?subject=New%20Project"
                  aria-label="Start a project"
                >
                  <ArrowUpRight size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Center — photo card with quote overlay */}
          <div className="ts-photo">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200"
              alt="Lumora Labs team collaborating on their web platform project"
              referrerPolicy="no-referrer"
              loading="lazy"
              decoding="async"
            />
            <div className="ts-photo-veil" />
            <div className="ts-photo-caption">
              <p className="ts-photo-quote">
                &ldquo;We expected an agency — we found a team that treats the product like their
                own.&rdquo;
              </p>
              <p className="ts-photo-attribution">— Lumora Labs, Web Platform</p>
            </div>
          </div>

          {/* Right — vertical marquee */}
          <div className="ts-marquee" aria-label="More client reviews">
            <div
              className="ts-track"
              style={reduced ? undefined : { animation: "marquee-up 30s linear infinite" }}
            >
              {[...marqueeReviews, ...marqueeReviews].map((review, index) => (
                <article className="ts-review-card" key={`${review.name}-${index}`}>
                  <div className="ts-review-stars" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} size={12} className="ts-star" />
                    ))}
                  </div>
                  <blockquote>{`“${review.quote}”`}</blockquote>
                  <footer>
                    <img
                      src={review.avatar}
                      alt=""
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                    />
                    <div>
                      <strong>{`— ${review.name}`}</strong>
                      <span>{review.context}</span>
                    </div>
                  </footer>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee-up {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }

        .ts-section {
          width: 100%;
          padding: clamp(88px, 9vw, 120px) clamp(20px, 5vw, 80px);
          background: #ffffff;
          color: #141414;
          font-family: var(--font-inter), Inter, -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .ts-section ::selection {
          background: #141414;
          color: #ffffff;
        }

        .ts-wrap {
          max-width: 1280px;
          margin: 0 auto;
        }

        /* ---------- Header row ---------- */

        .ts-header {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-start;
          gap: 24px;
        }

        .ts-header-left {
          max-width: 600px;
        }

        /* Typography (eyebrow, h2, subhead) comes from the global site rules:
           green eyebrow (.cr-eyebrow), Cal Sans h2 (#client-results-title),
           Inter subhead (.cr-subhead) — same as About/Services pages. */

        .ts-lede {
          max-width: 300px;
          margin: 0;
        }

        /* ---------- Grid ---------- */

        .ts-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
          align-items: stretch;
        }

        /* ---------- Left — stats / CTA card ---------- */

        .ts-stats {
          display: flex;
          flex-direction: column;
          min-height: 480px;
          padding: 32px;
          border: 1px solid #f1f1f1;
          border-radius: 32px;
          background: #f8f8f8;
        }

        .ts-rating-row {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 28px;
        }

        .ts-rating {
          display: flex;
          align-items: baseline;
          gap: 2px;
        }

        .ts-rating strong {
          font-size: 48px;
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.02em;
          color: #111110;
        }

        .ts-rating span {
          font-size: 16px;
          font-weight: 400;
          color: #898888;
        }

        .ts-rating-note {
          margin: 0;
          padding-top: 6px;
          font-size: 13px;
          font-weight: 500;
          line-height: 1.3;
          color: #555455;
        }

        .ts-rating-note strong {
          color: #111110;
        }

        .ts-features {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin: 0 0 32px;
          padding: 0;
          list-style: none;
        }

        .ts-features li {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .ts-feature-icon {
          flex: 0 0 auto;
          color: #555455;
        }

        .ts-features span {
          font-size: 15px;
          font-weight: 500;
          letter-spacing: -0.01em;
          color: #67716d;
        }

        .ts-cta {
          margin-top: auto;
          padding-top: 24px;
          border-top: 1px solid #eeefee;
        }

        .ts-cta-kicker {
          margin: 0 0 2px;
          font-size: 15px;
          font-weight: 400;
          color: #67716d;
        }

        .ts-cta-title {
          margin: 0 0 18px;
          font-family: var(--font-plus-jakarta-sans), "Plus Jakarta Sans", sans-serif;
          font-size: 17px;
          font-weight: 600;
          letter-spacing: -0.02em;
          color: #141414;
        }

        .ts-cta-buttons {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .ts-cta-pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 44px;
          padding: 0 28px;
          border-radius: var(--radius-pill, 999px);
          background: #111110;
          color: #ffffff;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          white-space: nowrap;
          box-shadow: 0 1px 2px rgba(17, 17, 17, 0.12);
          transition:
            background 0.25s ease,
            transform 0.15s ease;
        }

        .ts-cta-pill:hover {
          background: #000000;
        }

        .ts-cta-pill:active {
          transform: scale(0.95);
        }

        .ts-cta-round {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #111110;
          color: #ffffff;
          box-shadow: 0 1px 2px rgba(17, 17, 17, 0.12);
          transition:
            background 0.3s ease,
            transform 0.3s ease;
        }

        .ts-cta-buttons:hover .ts-cta-round {
          transform: translateX(-2px);
        }

        .ts-cta-round:active {
          transform: scale(0.95);
        }

        /* ---------- Center — photo card ---------- */

        .ts-photo {
          position: relative;
          display: flex;
          width: 100%;
          min-height: 480px;
          overflow: hidden;
          border-radius: 32px;
          box-shadow: 0 1px 2px rgba(17, 17, 17, 0.08);
        }

        .ts-photo img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 1s ease;
        }

        .ts-photo:hover img {
          transform: scale(1.05);
        }

        .ts-photo-veil {
          position: absolute;
          inset: 0;
          height: 100%;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.4) 34%, transparent 60%);
          pointer-events: none;
        }

        .ts-photo-caption {
          position: absolute;
          bottom: 32px;
          left: 32px;
          right: 32px;
          color: #ffffff;
        }

        .ts-photo-quote {
          margin: 0 0 12px;
          font-size: clamp(17px, 1.6vw, 20px);
          font-weight: 500;
          line-height: 1.4;
        }

        .ts-photo-attribution {
          margin: 0;
          font-size: 14px;
          font-weight: 400;
          letter-spacing: 0.02em;
          color: rgba(255, 255, 255, 0.75);
        }

        /* ---------- Right — vertical marquee ---------- */

        .ts-marquee {
          position: relative;
          min-height: 480px;
          overflow: hidden;
          border: 1px solid #f1f1f1;
          border-radius: 32px;
          background: rgba(248, 248, 248, 0.3);
        }

        .ts-track {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding: 8px;
        }

        .ts-review-card {
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
          padding: 24px;
          border: 1px solid #f1f1f1;
          border-radius: 24px;
          background: #ffffff;
          box-shadow: 0 1px 2px rgba(17, 17, 17, 0.04);
        }

        .ts-review-stars {
          display: flex;
          gap: 2px;
          margin-bottom: 12px;
        }

        .ts-star {
          color: #111110;
          fill: #111110;
        }

        .ts-review-card blockquote {
          margin: 0 0 16px;
          font-size: 14px;
          font-weight: 400;
          line-height: 1.6;
          color: #67716d;
          text-wrap: pretty;
        }

        .ts-review-card footer {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: auto;
        }

        .ts-review-card footer img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
          box-shadow: 0 1px 2px rgba(17, 17, 17, 0.1);
        }

        .ts-review-card footer strong {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #141414;
        }

        .ts-review-card footer span {
          display: block;
          margin-top: 1px;
          font-size: 12px;
          font-weight: 500;
          color: #898888;
        }

        /* ---------- Responsive ---------- */

        @media (min-width: 768px) {
          .ts-section {
            padding-inline: 48px;
          }

          .ts-header {
            flex-direction: row;
            align-items: flex-end;
          }

          .ts-lede {
            text-align: right;
          }

          .ts-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .ts-marquee {
            grid-column: span 2;
          }
        }

        @media (min-width: 1024px) {
          .ts-section {
            padding-inline: 80px;
          }

          .ts-grid {
            grid-template-columns: repeat(3, 1fr);
          }

          .ts-stats,
          .ts-photo,
          .ts-marquee {
            height: 560px;
            min-height: 560px;
          }

          .ts-marquee {
            grid-column: auto;
          }

          .ts-track {
            height: 100%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ts-track {
            animation: none !important;
          }

          .ts-photo img {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
