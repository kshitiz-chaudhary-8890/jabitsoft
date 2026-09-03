"use client";

import { useEffect, useRef } from "react";
import { SiX, SiInstagram, SiDribbble } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import jabitLogo from "../assets/jabit-logo.png";

const footerGroups = [
  {
    title: "Services",
    links: [
      ["Agentic AI Development", "#services"],
      ["Cloud Consulting", "#services"],
      ["Mobile App Development", "#services"],
      ["ERP Solutions", "#services"],
      ["Web Development", "#services"],
      ["SEO & Digital Marketing", "#services"],
    ],
  },
  {
    title: "Company",
    links: [
      ["About Us", "#about"],
      ["Recent Works", "#works"],
      ["Our Services", "#services"],
      ["Careers", "#careers"],
      ["Blog", "#blog"],
      ["Contact", "mailto:hello@jabitsoft.com"],
    ],
  },
];

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 18 18" aria-hidden="true">
      <path d="M4 14 14 4M7 4h7v7" />
    </svg>
  );
}

function SocialIcon({ type }) {
  const common = {
    size: 16,
    "aria-hidden": "true",
  };

  if (type === "linkedin") {
    return <FaLinkedin {...common} />;
  }

  if (type === "x") {
    return <SiX {...common} />;
  }

  if (type === "instagram") {
    return <SiInstagram {...common} />;
  }

  return <SiDribbble {...common} />;
}

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return undefined;

    const reduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    )?.matches;

    if (reduced || !("IntersectionObserver" in window)) {
      footer.classList.add("jabit-footer--visible");
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        footer.classList.add("jabit-footer--visible");
        observer.unobserve(footer);
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -6% 0px",
      },
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <footer ref={footerRef} className="jabit-footer" id="contact">
        <section className="jabit-footer__cta" aria-labelledby="footer-cta-title">
          <div className="jabit-footer__cta-orb jabit-footer__cta-orb--one" aria-hidden="true" />
          <div className="jabit-footer__cta-orb jabit-footer__cta-orb--two" aria-hidden="true" />

          <div className="jabit-footer__cta-inner">
            <div className="jabit-footer__cta-left">
              <p className="jabit-footer__eyebrow">(Let’s build what’s next)</p>

              <h2 id="footer-cta-title">
                Have a project in mind?
                <span>Let’s make it scalable.</span>
              </h2>
            </div>

            <div className="jabit-footer__cta-right">
              <p className="jabit-footer__cta-copy">
                From strategy and design to engineering and launch, JabitSoft
                helps teams build software products that are reliable,
                maintainable, and ready to grow.
              </p>

              <div className="jabit-footer__cta-actions">
                <a
                  className="jabit-footer__cta-button"
                  href="mailto:hello@jabitsoft.com"
                >
                  <span>Start a Project</span>
                  <ArrowUpRight />
                </a>

                <a
                  className="jabit-footer__cta-email"
                  href="mailto:hello@jabitsoft.com"
                >
                  hello@jabitsoft.com
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="jabit-footer__body">
          <div className="jabit-footer__card">
            <div className="jabit-footer__top">
              <div className="jabit-footer__brand-block">
                <a className="jabit-footer__brand" href="#top" aria-label="JabitSoft home">
                  <img className="jabit-footer__brand-logo" src={jabitLogo} alt="" />
                </a>

                <p>
                  JabitSoft is a software services company building scalable
                  web platforms, mobile applications, cloud systems, ERP
                  solutions, AI products, and digital growth experiences for
                  businesses worldwide.
                </p>

                <div className="jabit-footer__contact-list">
                  <a href="mailto:hello@jabitsoft.com">
                    <span className="jabit-footer__contact-label">Email</span>
                    <strong>hello@jabitsoft.com</strong>
                  </a>

                  <div>
                    <span className="jabit-footer__contact-label">Phone</span>
                    <strong>+91 XXXXX XXXXX</strong>
                  </div>

                  <div>
                    <span className="jabit-footer__contact-label">Office</span>
                    <strong>New Delhi, India</strong>
                  </div>
                </div>

                <div className="jabit-footer__socials" aria-label="JabitSoft social links">
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                    <SocialIcon type="linkedin" />
                  </a>
                  <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X">
                    <SocialIcon type="x" />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                    <SocialIcon type="instagram" />
                  </a>
                  <a href="https://dribbble.com" target="_blank" rel="noreferrer" aria-label="Dribbble">
                    <SocialIcon type="dribbble" />
                  </a>
                </div>
              </div>

              <div className="jabit-footer__links-grid">
                {footerGroups.map((group) => (
                  <div className="jabit-footer__column" key={group.title}>
                    <h3>{group.title}</h3>

                    <nav aria-label={`${group.title} footer navigation`}>
                      {group.links.map(([label, href]) => {
                        const external = href.startsWith("http");

                        return (
                          <a
                            href={href}
                            key={label}
                            {...(external
                              ? { target: "_blank", rel: "noreferrer" }
                              : {})}
                          >
                            {label}
                          </a>
                        );
                      })}
                    </nav>
                  </div>
                ))}

                <div className="jabit-footer__column jabit-footer__column--contact">
                  <h3>Business</h3>
                  <div className="jabit-footer__business-copy">
                    <p>Have a project, partnership, or support request?</p>
                    <a href="mailto:hello@jabitsoft.com">
                      Talk to our team <ArrowUpRight />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="jabit-footer__divider" />

            <div className="jabit-footer__bottom footer-bottom">
              <span>
                © {new Date().getFullYear()} JabitSoft. All rights reserved.
              </span>

              <div className="jabit-footer__legal">
                <a href="#terms">Terms of Service</a>
                <a href="#privacy">Privacy Policy</a>
              </div>
            </div>
          </div>

          <div className="jabit-footer__wordmark-wrap" aria-hidden="true">
            <div className="jabit-footer__wordmark">JabitSoft<span>.</span></div>
          </div>
        </section>
      </footer>

      <style>{`
        .jabit-footer,
        .jabit-footer * {
          box-sizing: border-box;
        }

        .jabit-footer {
          width: 100%;
          overflow: hidden;
          background: #f5f5f3;
          color: #131313;
          font-family: "Inter", sans-serif;
        }

        .jabit-footer__cta {
          position: relative;
          width: min(1460px, calc(100% - 64px));
          margin: 0 auto;
          padding: 66px 68px;
          overflow: hidden;
          border: 1px solid rgba(19, 19, 19, 0.08);
          border-radius: 34px;
          background:
            linear-gradient(
              135deg,
              rgba(255,255,255,0.96) 0%,
              rgba(248,249,249,0.98) 54%,
              rgba(241,248,252,0.98) 100%
            );
          box-shadow:
            0 24px 70px rgba(0,0,0,0.055),
            inset 0 1px 0 rgba(255,255,255,0.92);
          color: #131313;
          isolation: isolate;
        }

        .jabit-footer__cta-orb {
          position: absolute;
          z-index: -1;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(14px);
          will-change: transform;
        }

        .jabit-footer__cta-orb--one {
          top: -115px;
          right: 10%;
          width: 300px;
          height: 300px;
          background: rgba(0, 170, 255, 0.11);
          animation: jabFooterFloatOne 9s ease-in-out infinite alternate;
        }

        .jabit-footer__cta-orb--two {
          right: -60px;
          bottom: -150px;
          width: 330px;
          height: 330px;
          background: rgba(0, 170, 255, 0.055);
          animation: jabFooterFloatTwo 11s ease-in-out infinite alternate;
        }

        .jabit-footer__cta::after {
          content: "";
          position: absolute;
          z-index: -1;
          inset: 0;
          background:
            radial-gradient(
              circle at 18% 20%,
              rgba(0, 170, 255, 0.05),
              transparent 28%
            ),
            radial-gradient(
              circle at 82% 76%,
              rgba(19, 19, 19, 0.025),
              transparent 30%
            );
          background-size: 120% 120%;
          animation: jabFooterGradientDrift 14s ease-in-out infinite alternate;
          pointer-events: none;
        }

        @keyframes jabFooterFloatOne {
          from {
            transform: translate3d(0, 0, 0) scale(1);
          }
          to {
            transform: translate3d(-34px, 24px, 0) scale(1.08);
          }
        }

        @keyframes jabFooterFloatTwo {
          from {
            transform: translate3d(0, 0, 0) scale(1);
          }
          to {
            transform: translate3d(-46px, -22px, 0) scale(1.06);
          }
        }

        @keyframes jabFooterGradientDrift {
          from {
            background-position: 0% 0%;
          }
          to {
            background-position: 100% 100%;
          }
        }

        .jabit-footer__cta-inner {
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(320px, 0.72fr);
          gap: clamp(70px, 9vw, 150px);
          align-items: end;
          opacity: 0;
          transform: translate3d(0, 44px, 0);
          transition:
            opacity 700ms cubic-bezier(0.16, 1, 0.3, 1),
            transform 900ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .jabit-footer--visible .jabit-footer__cta-inner {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        .jabit-footer__eyebrow {
          margin: 0 0 18px;
          font-family: Inter, "DM Sans", -apple-system, BlinkMacSystemFont, sans-serif;
          font-style: normal;
          font-weight: 500;
          font-size: 15px;
          line-height: 23px;
          color: rgb(92, 92, 92);
        }

        .jabit-footer__cta h2 {
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

        .jabit-footer__cta h2 span {
          display: block;
        }

        .jabit-footer__cta-right {
          padding-bottom: 4px;
        }

        .jabit-footer__cta-copy {
          max-width: 470px;
          margin: 0;
          color: #656565;
          font-family: "Inter", sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 1.7;
        }

        .jabit-footer__cta-actions {
          display: flex;
          margin-top: 28px;
          align-items: center;
          gap: 18px;
          flex-wrap: wrap;
        }

        .jabit-footer__cta-button {
          display: inline-flex;
          min-height: 50px;
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
          box-shadow: 0 10px 24px rgba(0,0,0,0.14);
          transition:
            transform 200ms ease,
            background 200ms ease,
            box-shadow 200ms ease;
        }

        .jabit-footer__cta-button:hover {
          transform: translateY(-2px);
          background: #131313;
          box-shadow: 0 14px 28px rgba(0,0,0,0.18);
        }

        .jabit-footer__cta-button svg {
          width: 15px;
          height: 15px;
          fill: none;
          stroke: currentColor;
          stroke-width: 1.6;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .jabit-footer__cta-email {
          color: #5f5f5f;
          font-family: "Inter", sans-serif;
          font-size: 13px;
          font-weight: 500;
          text-decoration: underline;
          text-underline-offset: 4px;
          transition: color 180ms ease;
        }

        .jabit-footer__cta-email:hover {
          color: #00aaff;
        }

        .jabit-footer__body {
          position: relative;
          padding: 78px 0 0;
          background: #f5f5f3;
        }

        .jabit-footer__card {
          position: relative;
          z-index: 2;
          width: min(1460px, calc(100% - 64px));
          margin: 0 auto;
          padding: 58px 54px 34px;
          border: 1px solid rgba(19, 19, 19, 0.09);
          border-radius: 32px;
          background: rgba(255,255,255,0.86);
          box-shadow:
            0 24px 70px rgba(0,0,0,0.06),
            0 2px 8px rgba(0,0,0,0.025);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          opacity: 0;
          transform: translate3d(0, 58px, 0);
          transition:
            opacity 760ms cubic-bezier(0.16, 1, 0.3, 1) 120ms,
            transform 980ms cubic-bezier(0.16, 1, 0.3, 1) 120ms;
        }

        .jabit-footer--visible .jabit-footer__card {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        .jabit-footer__top {
          display: grid;
          grid-template-columns: minmax(360px, 1.08fr) minmax(540px, 1fr);
          gap: clamp(56px, 7vw, 120px);
          align-items: start;
        }

        .jabit-footer__brand {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          color: #131313;
          text-decoration: none;
        }

        .jabit-footer__brand-logo {
          display: block;
          width: clamp(180px, 18vw, 230px);
          height: auto;
        }

        .jabit-footer__mark {
          position: relative;
          display: inline-flex;
          width: 34px;
          height: 34px;
          align-items: center;
          justify-content: center;
          gap: 2px;
          overflow: hidden;
          border-radius: 9px;
          background: #131313;
          transform: rotate(-1deg);
        }

        .jabit-footer__mark span {
          display: block;
          width: 4px;
          height: 17px;
          border-radius: 999px;
          background: #ffffff;
          transform: skew(-18deg);
        }

        .jabit-footer__mark span:nth-child(2) {
          height: 12px;
        }

        .jabit-footer__mark span:nth-child(3) {
          height: 19px;
        }

        .jabit-footer__brand-name {
          font-family: "Plus Jakarta Sans", "Inter", sans-serif;
          font-size: 20px;
          font-weight: 700;
          letter-spacing: -0.035em;
        }

        .jabit-footer__brand-name > span {
          color: #00aaff;
        }

        .jabit-footer__brand-block > p {
          max-width: 470px;
          margin: 22px 0 0;
          color: #606060;
          font-size: 14px;
          font-weight: 400;
          line-height: 1.65;
        }

        .jabit-footer__contact-list {
          display: grid;
          max-width: 470px;
          margin-top: 28px;
          border-top: 1px solid rgba(19,19,19,0.08);
        }

        .jabit-footer__contact-list > a,
        .jabit-footer__contact-list > div {
          display: grid;
          grid-template-columns: 74px minmax(0, 1fr);
          gap: 18px;
          padding: 12px 0;
          align-items: center;
          border-bottom: 1px solid rgba(19,19,19,0.08);
          color: #131313;
          text-decoration: none;
        }

        .jabit-footer__contact-label {
          color: #8a8a8a;
          font-size: 11px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .jabit-footer__contact-list strong {
          font-size: 13px;
          font-weight: 500;
        }

        .jabit-footer__contact-list a:hover strong {
          color: #00aaff;
        }

        .jabit-footer__socials {
          display: flex;
          gap: 10px;
          margin-top: 22px;
        }

        .jabit-footer__socials a {
          display: grid;
          width: 38px;
          height: 38px;
          place-items: center;
          border: 1px solid rgba(19,19,19,0.10);
          border-radius: 50%;
          background: #ffffff;
          color: #131313;
          transition:
            color 200ms ease,
            border-color 200ms ease,
            background 200ms ease,
            transform 200ms ease;
        }

        .jabit-footer__socials a:hover {
          transform: translateY(-2px);
          border-color: #00aaff;
          background: #e8f8ff;
          color: #00aaff;
        }

        .jabit-footer__socials svg {
          display: block;
          width: 17px;
          height: 17px;
          color: currentColor;
        }

        .jabit-footer__links-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(135px, 1fr));
          gap: 42px 30px;
        }

        .jabit-footer__column h3 {
          margin: 0 0 20px;
          color: #131313;
          font-family: "Inter", sans-serif;
          font-size: 14px;
          font-weight: 600;
        }

        .jabit-footer__column nav {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 14px;
        }

        .jabit-footer__column a {
          position: relative;
          color: #656565;
          font-size: 13px;
          font-weight: 400;
          text-decoration: none;
          transition: color 200ms ease;
        }

        .jabit-footer__column a:hover {
          color: #00aaff;
        }

        .jabit-footer__business-copy p {
          max-width: 180px;
          margin: 0 0 18px;
          color: #6a6a6a;
          font-size: 13px;
          line-height: 1.55;
        }

        .jabit-footer__business-copy > a {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: #131313;
          font-weight: 600;
        }

        .jabit-footer__business-copy svg {
          width: 14px;
          height: 14px;
          fill: none;
          stroke: currentColor;
          stroke-width: 1.6;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .jabit-footer__divider {
          width: 100%;
          height: 1px;
          margin: 42px 0 24px;
          background: rgba(19,19,19,0.08);
        }

        .jabit-footer__bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          color: #6a6a6a;
          font-size: 12px;
          line-height: 1.4;
        }

        .jabit-footer__legal {
          display: flex;
          align-items: center;
          gap: 28px;
        }

        .jabit-footer__legal a {
          color: #5e5e5e;
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: color 180ms ease;
        }

        .jabit-footer__legal a:hover {
          color: #00aaff;
        }

        .jabit-footer__wordmark-wrap {
          position: relative;
          width: 100%;
          height: clamp(200px, 22vw, 360px);
          margin: 30px auto 0;
          overflow: hidden;
          pointer-events: none;
        }

        .jabit-footer__wordmark {
          position: absolute;
          left: 50%;
          bottom: -0.16em;
          transform: translateX(-50%);
          color: rgba(19,19,19,0.07);
          font-family: "Plus Jakarta Sans", "Inter", sans-serif;
          font-style: normal;
          font-weight: 700;
          font-size: clamp(160px, 20vw, 350px);
          line-height: 0.8;
          letter-spacing: -0.08em;
          white-space: nowrap;
          user-select: none;
        }

        .jabit-footer__wordmark span {
          color: #00aaff;
          opacity: 0.8;
        }

        @media (max-width: 1000px) {
          .jabit-footer__cta {
            width: min(940px, calc(100% - 40px));
            padding: 54px 44px;
          }

          .jabit-footer__cta-inner {
            grid-template-columns: 1fr;
            gap: 34px;
          }

          .jabit-footer__body {
            padding-inline: 0;
          }

          .jabit-footer__card {
            width: min(940px, calc(100% - 40px));
            padding: 48px 36px 30px;
          }

          .jabit-footer__top {
            grid-template-columns: 1fr;
            gap: 52px;
          }

          .jabit-footer__links-grid {
            max-width: 760px;
            grid-template-columns: repeat(3, minmax(130px, 1fr));
          }
        }

        @media (max-width: 680px) {
          .jabit-footer__cta {
            width: calc(100% - 24px);
            padding: 40px 24px;
            border-radius: 26px;
          }

          .jabit-footer__cta-inner {
            gap: 28px;
          }

          .jabit-footer__cta h2 {
            font-size: 42px;
            line-height: 46px;
          }

          .jabit-footer__cta-copy {
            font-size: 13px;
          }

          .jabit-footer__cta-actions {
            align-items: flex-start;
            flex-direction: column;
            gap: 14px;
          }

          .jabit-footer__body {
            padding: 48px 0 0;
          }

          .jabit-footer__card {
            width: calc(100% - 24px);
            padding: 34px 22px 26px;
            border-radius: 24px;
          }

          .jabit-footer__links-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 38px 24px;
          }

          .jabit-footer__contact-list > a,
          .jabit-footer__contact-list > div {
            grid-template-columns: 66px minmax(0, 1fr);
          }

          .jabit-footer__bottom {
            align-items: flex-start;
            flex-direction: column;
          }

          .jabit-footer__legal {
            gap: 18px;
            flex-wrap: wrap;
          }

          .jabit-footer__wordmark-wrap {
            height: 150px;
            margin-top: 22px;
          }

          .jabit-footer__wordmark {
            font-size: clamp(110px, 30vw, 180px);
          }
        }

        @media (max-width: 440px) {
          .jabit-footer__cta h2 {
            font-size: 42px;
            line-height: 46px;
          }

          .jabit-footer__links-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .jabit-footer__cta-orb,
          .jabit-footer__cta::after {
            animation: none !important;
          }

          .jabit-footer__cta-inner,
          .jabit-footer__card {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }
      `}</style>
    </>
  );
}
