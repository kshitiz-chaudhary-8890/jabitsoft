"use client";

import { useLayoutEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { MapPin, Shield, Clock, ArrowUpRight, Star } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal, RevealGroup } from "@/components/motion/reveal";
const unusedPlaceholderReviews = [
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

const featuredTestimonials = [
  { name: "Koala Living", service: "ERP Services · Custom Software Development", quote: "Partnering with Jabit Soft has been transformative. Their expertise in ERP and POS delivered a seamless, efficient system that elevated our operations. Exceptional service, timely delivery, and a true game-changer for our business!" },
  { name: "Turnpoint Technologies", service: "Website Solutions · SEO / Digital Marketing", quote: "We were striving to establish our digital footprint, and found a trusted partner in Jabit Soft. Their expertise, prompt delivery, and collaborative approach transformed our website, boosted visibility, and enhanced customer experience. A successful project that sets the stage for future growth." },
  { name: "Indian Ocean Naval Symposium (IONS)", service: "Website Solutions", quote: "Jabit Soft delivered an outstanding redevelopment of the IONS website. Their creativity, deep understanding of our requirements, and seamless execution resulted in a modern, engaging platform. The process was efficient, collaborative, and the final outcome exceeded expectations, a remarkable transformation for our digital presence." },
  { name: "Move My Stuff", service: "Custom Software Development", quote: "Jabit Soft transformed our operations with a customized software solution. Administrative efficiency improved by 60%, customer interaction quality doubled, and issue resolution time dropped significantly. Their expertise and commitment delivered a system that truly empowers our business." },
  { name: "Sparky Warehouse", service: "Website Solutions", quote: "Jabit Soft transformed our business with a cutting-edge e-commerce website. They expertly displayed our top-notch products worldwide, boosting Sparky Warehouse’s reputation as a leading innovator in the industry. Great teamwork and excellent outcomes!" },
  { name: "Defence Colony Club", service: "Website Solutions", quote: "We’re thrilled with Jabit Soft’s work on our Defence Colony Club website. Their team is a dream to work with. They are professional, creative, and always responsive. Highly impressed with the final work." },
  { name: "Hummer X Limousines", service: "SEO / Digital Marketing", quote: "Jabit Soft’s SEO service for our Hummer X Limousines website was outstanding. Their expertise dramatically boosted our online visibility, driving a surge in relevant traffic and measurable business growth. Truly a partner we highly recommend." },
  { name: "Sparky Warehouse", service: "SEO / Digital Marketing", quote: "Jabit Soft transformed our business visibility through strategic SEO and digital marketing. Their expertise showcased our products worldwide, elevating Sparky Warehouse’s reputation as an industry innovator. Exceptional teamwork, timely execution, and measurable outcomes made this collaboration a true success." },
  { name: "Car Lelo", service: "ERP Services · Billing & Invoice Software", quote: "Jabit Soft exceeded expectations in implementing our CRM and loan panel. Their team displayed exceptional expertise, delivering a seamless integration that significantly improved our business processes. Thanks Team!" },
  { name: "Used Cars", service: "Website Solutions", quote: "We are really happy with Jabit Soft’s work. The website they developed for Used Cars is amazing, we are now getting more and more customers. Exceptional service, transforming our platform into the ultimate destination for pre-owned vehicle seekers. Amazing Work!" },
  { name: "Dr. Bhim Rao Ambedkar College", service: "Website Solutions", quote: "Impressed with Jabit Soft’s proficiency in developing our website. Amazing work I received from Jabit Soft’s team. Exceptional service; would gladly recommend." },
  { name: "Delhi Arthritis and Rheumatology Clinic", service: "Website Solutions", quote: "Jabit Soft did an awesome job creating our clinic website. They really understood what we wanted and made it easy for patients. Super friendly team, highly recommended for any website needs!" },
  { name: "Dr. Lalit Duggal", service: "Website Solutions", quote: "I am extremely pleased with Jabit Soft’s implementation of Dr. Lalit Duggal’s vision. Their team’s expertise, attention to detail, and timely delivery. Highly recommend their services!" },
  { name: "Dr. Rajat Chopra", service: "Website Solutions", quote: "I was thoroughly impressed with Jabit Soft’s work on my website. They were attentive, creative, and delivered a site that’s not only sleek but also user-friendly. Highly recommend their expertise and professionalism!" },
  { name: "Kohli Ads", service: "Website Solutions", quote: "Glad to work with Jabit Soft as they developed my website and it works very well. Thanks, Team." },
  { name: "Property Club", service: "Website Solutions", quote: "Jabit Soft fulfilled all my requirements which we needed in our Property Club website. Their team’s expertise and attention to detail transformed our vision into a user-friendly, visually stunning platform." },
  { name: "Sanjivni Rheumatology & Infertility Center", service: "Website Solutions", quote: "Jabit Soft truly brought our vision to life. Their dedication, innovative approach, and responsiveness made the collaboration a pleasure. Exceptional results; highly recommend their web development expertise." },
];

const testimonialImages = {
  "Sparky Warehouse": "https://ik.imagekit.io/5bwd4hel7/Homepage/testimonial/Sparky.jpg",
  "Used Cars": "https://ik.imagekit.io/5bwd4hel7/Homepage/testimonial/Used%20Carss.jpg",
  "Indian Ocean Naval Symposium (IONS)": "https://ik.imagekit.io/5bwd4hel7/Homepage/testimonial/IONSS.jpg",
  "Property Club": "https://ik.imagekit.io/5bwd4hel7/Homepage/testimonial/Property%20CLub.jpg",
  "Delhi Arthritis and Rheumatology Clinic": "https://ik.imagekit.io/5bwd4hel7/Homepage/testimonial/DARC.jpg",
  "Move My Stuff": "https://ik.imagekit.io/5bwd4hel7/Homepage/testimonial/Move%20my%20stuff.jpg",
  "Kohli Ads": "https://ik.imagekit.io/5bwd4hel7/Homepage/testimonial/Kohli%20Ads.jpg",
  "Dr. Bhim Rao Ambedkar College": "https://ik.imagekit.io/5bwd4hel7/Homepage/testimonial/BR%20Ambedakar%20cllg.jpg",
  "Koala Living": "https://ik.imagekit.io/5bwd4hel7/Homepage/testimonial/Koala%20Livingg.jpg",
  "Car Lelo": "https://ik.imagekit.io/5bwd4hel7/Homepage/testimonial/Car%20Lelo.jpg",
  "Dr. Lalit Duggal": "https://ik.imagekit.io/5bwd4hel7/Homepage/testimonial/Dr.%20Lalit.jpg",
  "Dr. Rajat Chopra": "https://ik.imagekit.io/5bwd4hel7/Homepage/testimonial/Dr.%20Rajat%20Chopra.jpg",
  "Hummer X Limousines": "https://ik.imagekit.io/5bwd4hel7/Homepage/testimonial/HummerX.jpg",
  "Turnpoint Technologies": "https://ik.imagekit.io/5bwd4hel7/Homepage/testimonial/Turnpoint.jpg",
};

const marqueeReviews = featuredTestimonials
  .filter(({ name }) => name !== "Koala Living")
  .map(({ name, service, quote }) => ({ name, context: service, quote, image: testimonialImages[name] }));

const features = [
  { icon: MapPin, label: "Solutions shaped around your workflow" },
  { icon: Shield, label: "Clear, collaborative delivery" },
  { icon: Clock, label: "Support beyond launch" },
];

export default function ClientResults() {
  const sectionRef = useRef(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = section?.querySelector(".section-heading-fill");
    if (!section || !heading) return undefined;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) return undefined;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.fromTo(
        heading,
        { backgroundSize: "0% 100%, 100% 100%" },
        {
          backgroundSize: "100% 100%, 100% 100%",
          ease: "none",
          scrollTrigger: {
            trigger: heading,
            start: "top 94%",
            end: "top 36%",
            scrub: 0.65,
            invalidateOnRefresh: true,
          },
        },
      );
    }, section);

    const refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(refreshFrame);
      context.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="ts-section" aria-labelledby="client-results-title">
      <div className="ts-wrap">
        {/* ---------- Header row ---------- */}
        <header className="cr-heading ts-header">
          <div className="ts-header-left">
            <Reveal as="p" data-cr-intro className="cr-eyebrow">
              Client Results
            </Reveal>
            <h2 id="client-results-title" className="ts-title">
              <span className="section-heading-fill">What clients say about our work</span>
            </h2>
          </div>
          <Reveal as="p" data-cr-intro className="cr-subhead ts-lede" delay={0.16}>
            Every product we ship is built on trust, clarity, and long-term support — in the words
            of the teams we build with.
          </Reveal>
        </header>

        {/* ---------- Three-column grid ---------- */}
        <RevealGroup className="ts-grid" delay={0.16}>
          {/* Left — stats / CTA card */}
          <div className="ts-stats">
            <div className="ts-stats-intro">
              <span className="ts-card-eyebrow">How we work</span>
              <h3 className="ts-card-heading">Built around your business—not a template.</h3>
              <p className="ts-card-copy">
                We bring practical engineering and dependable support together to turn complex workflows into software your team can rely on.
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
              <p className="ts-cta-kicker">Have an idea in mind?</p>
              <p className="ts-cta-title">Let&rsquo;s make it work.</p>
              <div className="ts-cta-buttons">
                <a className="ts-cta-pill" href="mailto:hello@jabitsoft.com?subject=New%20Project" data-site-button data-button-variant="primary">
                  Talk to our team
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
              alt="Client team collaborating on a project"
              referrerPolicy="no-referrer"
              loading="lazy"
              decoding="async"
            />
            <div className="ts-photo-veil" />
            <div className="ts-photo-caption">
              <p className="ts-photo-quote">
                “Partnering with Jabit Soft has been transformative. Their expertise in ERP and POS delivered a seamless, efficient system that elevated our operations. Exceptional service, timely delivery, and a true game-changer for our business!”
              </p>
              <p className="ts-photo-attribution">— Koala Living · ERP Services &amp; Custom Software Development</p>
            </div>
          </div>

          {/* Right — vertical marquee */}
          <div className="ts-marquee" aria-label="More client reviews">
            <div
              className="ts-track"
              style={reduced ? undefined : { animation: "marquee-up 75s linear infinite" }}
            >
              {[...marqueeReviews, ...marqueeReviews].map((review, index) => (
                <article className="ts-review-card" key={`${review.name}-${index}`}>
                  <div className="ts-review-stars" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star key={i} size={12} className="ts-star" />
                    ))}
                  </div>
                  <blockquote>{review.quote}</blockquote>
                  <footer>
                    {review.image ? (
                      <img className="ts-review-avatar" src={review.image} alt="" loading="lazy" decoding="async" />
                    ) : (
                      <span className="ts-review-avatar" aria-hidden="true">{review.name.slice(0, 1)}</span>
                    )}
                    <div>
                      <strong>{review.name}</strong>
                      <span>{review.context}</span>
                    </div>
                  </footer>
                </article>
              ))}
            </div>
          </div>
        </RevealGroup>
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

        .ts-stats-intro {
          margin-bottom: 28px;
        }

        .ts-card-eyebrow {
          color: #718873;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .ts-card-heading {
          margin: 12px 0 14px;
          color: #141414;
          font-family: var(--font-plus-jakarta-sans), "Plus Jakarta Sans", sans-serif;
          font-size: clamp(25px, 2vw, 30px);
          font-weight: 650;
          letter-spacing: -0.045em;
          line-height: 1.12;
        }

        .ts-card-copy {
          margin: 0;
          color: #67716d;
          font-size: 14px;
          font-weight: 400;
          line-height: 1.6;
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
          font-size: clamp(15px, 1.35vw, 17px);
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

        .ts-marquee:hover .ts-track,
        .ts-marquee:focus-within .ts-track {
          animation-play-state: paused !important;
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
          color: #67716d;
          font-size: 14px;
          font-weight: 400;
          line-height: 1.6;
          text-wrap: pretty;
        }

        .ts-review-card footer {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: auto;
          padding-top: 12px;
          border-top: 1px solid #f1f1f1;
        }

        .ts-review-avatar {
          display: grid;
          flex: 0 0 auto;
          width: 40px;
          height: 40px;
          place-items: center;
          border-radius: 50%;
          background: #f1f3f1;
          color: #4f5f53;
          font-size: 14px;
          font-weight: 650;
        }

        img.ts-review-avatar {
          display: block;
          object-fit: cover;
        }

        .ts-review-card footer strong {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #141414;
        }

        .ts-review-card footer span {
          display: block;
          margin-top: 3px;
          color: #898888;
          font-size: 12px;
          font-weight: 500;
          line-height: 1.4;
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

        }

        @media (prefers-reduced-motion: reduce) {
          .ts-track {
            animation: none !important;
          }

          .ts-featured-quote { animation: none; }

          .ts-photo img {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
