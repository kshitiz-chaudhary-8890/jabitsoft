"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const faqs = [
  {
    question: "What software services does JabitSoft provide?",
    answer:
      "JabitSoft helps businesses design, build, and scale digital products. Our work includes web platforms, custom software, mobile applications, Agentic AI solutions, cloud consulting, ERP systems, product engineering, UI/UX, integrations, and digital growth solutions.",
  },
  {
    question: "How do you start a new software project?",
    answer:
      "We begin by understanding your business goals, users, current systems, technical requirements, and priorities. From there, we define the right scope, architecture, delivery plan, milestones, and team needed to move the project forward clearly.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Project timelines depend on scope and complexity. A focused website or MVP may take a few weeks, while larger applications, ERP systems, AI workflows, or custom platforms can require multiple phases. We establish realistic milestones before development begins.",
  },
  {
    question: "Can JabitSoft improve an existing product or codebase?",
    answer:
      "Yes. We can work with an existing website, application, or software product to add features, improve UI/UX, modernize architecture, resolve technical debt, optimize performance, strengthen integrations, and make the product easier to scale.",
  },
  {
    question: "Do you provide support after the product goes live?",
    answer:
      "Yes. After launch, we can continue supporting the product with maintenance, monitoring, bug fixes, performance improvements, cloud and infrastructure support, security updates, new feature development, and ongoing product enhancements.",
  },
];

function Toggle({ open }) {
  return (
    <span className={`faq-ref__toggle ${open ? "is-open" : ""}`} aria-hidden="true">
      <span />
      <span />
    </span>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(1);
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const itemRefs = useRef([]);
  const answerRefs = useRef([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const reduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    )?.matches;

    gsap.registerPlugin(ScrollTrigger);

    if (reduced) {
      gsap.set([headerRef.current, ...itemRefs.current], {
        clearProps: "all",
        autoAlpha: 1,
        y: 0,
      });
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.set(headerRef.current, {
        autoAlpha: 0,
        y: 36,
      });

      gsap.set(itemRefs.current, {
        autoAlpha: 0,
        y: 34,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          once: true,
        },
      });

      tl.to(headerRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.72,
        ease: "power3.out",
      }).to(
        itemRefs.current,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.62,
          stagger: 0.08,
          ease: "power3.out",
        },
        "-=0.38",
      );
    }, section);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    answerRefs.current.forEach((answer, index) => {
      if (!answer) return;

      const inner = answer.firstElementChild;
      const open = openIndex === index;

      gsap.killTweensOf([answer, inner]);

      if (open) {
        gsap.set(answer, {
          display: "block",
          height: "auto",
        });

        const targetHeight = answer.offsetHeight;

        gsap.fromTo(
          answer,
          { height: 0 },
          {
            height: targetHeight,
            duration: 0.42,
            ease: "power3.out",
            onComplete: () => {
              gsap.set(answer, { height: "auto" });
            },
          },
        );

        gsap.fromTo(
          inner,
          { autoAlpha: 0, y: -8 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.32,
            delay: 0.05,
            ease: "power2.out",
          },
        );
      } else {
        const currentHeight = answer.offsetHeight;

        gsap.set(answer, {
          display: "block",
          height: currentHeight,
          overflow: "hidden",
        });

        gsap.to(inner, {
          autoAlpha: 0,
          y: -6,
          duration: 0.18,
          ease: "power2.in",
        });

        gsap.to(answer, {
          height: 0,
          duration: 0.34,
          ease: "power3.inOut",
          onComplete: () => {
            gsap.set(answer, {
              display: "none",
              overflow: "hidden",
            });
          },
        });
      }
    });
  }, [openIndex]);

  return (
    <>
      <section
        ref={sectionRef}
        className="faq-ref"
        id="faq"
        aria-labelledby="faq-ref-title"
      >
        <div className="faq-ref__shell">
          <header ref={headerRef} className="faq-ref__header">
            <p className="faq-ref__eyebrow">(JabitSoft FAQs)</p>

            <h2 id="faq-ref-title">Software Questions, Answered</h2>

            <p className="faq-ref__subhead">
              Learn how we approach software projects, delivery, existing products,
              and long-term technical support.
            </p>
          </header>

          <div className="faq-ref__list">
            {faqs.map((faq, index) => {
              const open = openIndex === index;

              return (
                <article
                  ref={(node) => {
                    itemRefs.current[index] = node;
                  }}
                  className={`faq-ref__item ${open ? "is-open" : ""}`}
                  key={faq.question}
                >
                  <button
                    type="button"
                    className="faq-ref__question"
                    aria-expanded={open}
                    aria-controls={`faq-ref-answer-${index}`}
                    onClick={() =>
                      setOpenIndex((current) =>
                        current === index ? null : index,
                      )
                    }
                  >
                    <span className="faq-ref__number">{index + 1}</span>

                    <span className="faq-ref__question-text">
                      {faq.question}
                    </span>

                    <Toggle open={open} />
                  </button>

                  <div
                    ref={(node) => {
                      answerRefs.current[index] = node;
                    }}
                    id={`faq-ref-answer-${index}`}
                    className="faq-ref__answer"
                    aria-hidden={!open}
                  >
                    <div>
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="faq-ref__footer-copy">
            <span>Have a project or another question?</span>
            <a href="mailto:hello@jabitsoft.com">hello@jabitsoft.com</a>
          </div>
        </div>
      </section>

      <style>{`
        .faq-ref,
        .faq-ref * {
          box-sizing: border-box;
        }

        .faq-ref {
          --faq-blue: #00aaff;
          width: 100%;
          padding: 88px 0 102px;
          overflow: hidden;
          background:
            linear-gradient(
              180deg,
              #ffffff 0%,
              #fbfbfa 26%,
              #f4f4f2 100%
            );
          color: #131313;
        }

        .faq-ref__shell {
          width: min(1120px, calc(100% - 64px));
          margin: 0 auto;
        }

        .faq-ref__header {
          width: min(760px, 100%);
          margin: 0 auto 48px;
          text-align: center;
        }

        .faq-ref__eyebrow {
          margin: 0 0 12px;
          font-family: Inter, "DM Sans", -apple-system, BlinkMacSystemFont, sans-serif;
          font-style: normal;
          font-weight: 500;
          font-size: 15px;
          line-height: 23px;
          color: rgb(92, 92, 92);
        }

        .faq-ref__header h2 {
          margin: 0;
          font-family: "Plus Jakarta Sans", Inter, sans-serif;
          font-style: normal;
          font-weight: 700;
          font-size: 50px;
          line-height: 54px;
          letter-spacing: normal;
          color: rgb(19, 19, 19);
        }

        .faq-ref__subhead {
          max-width: 560px;
          margin: 14px auto 0;
          color: #747474;
          font-family: Inter, sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 1.65;
        }

        .faq-ref__list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .faq-ref__item {
          overflow: hidden;
          border: 1px solid rgba(19, 19, 19, 0.075);
          border-radius: 22px;
          background: rgba(255, 255, 255, 0.78);
          box-shadow: 0 5px 16px rgba(0, 0, 0, 0.035);
          transition:
            border-color 220ms ease,
            background 220ms ease,
            box-shadow 220ms ease;
        }

        .faq-ref__item.is-open {
          border-color: rgba(0, 170, 255, 0.38);
          background: #ffffff;
          box-shadow:
            0 16px 36px rgba(0, 0, 0, 0.07),
            0 0 0 1px rgba(0, 170, 255, 0.05);
        }

        .faq-ref__question {
          display: grid;
          grid-template-columns: 32px minmax(0, 1fr) 38px;
          width: 100%;
          min-height: 68px;
          padding: 15px 18px;
          align-items: center;
          gap: 14px;
          border: 0;
          background: transparent;
          text-align: left;
          cursor: pointer;
        }

        .faq-ref__number {
          display: grid;
          width: 24px;
          height: 24px;
          place-items: center;
          border-radius: 7px;
          background: rgba(19, 19, 19, 0.045);
          color: #666666;
          font-family: Inter, sans-serif;
          font-size: 10px;
          font-weight: 500;
          transition:
            color 180ms ease,
            background 180ms ease;
        }

        .faq-ref__item.is-open .faq-ref__number {
          background: rgba(0, 170, 255, 0.10);
          color: #008fd8;
        }

        .faq-ref__question-text {
          color: #131313;
          font-family: Inter, sans-serif;
          font-style: normal;
          font-weight: 500;
          font-size: 15px;
          line-height: 23px;
          transition: color 180ms ease;
        }

        .faq-ref__question:hover .faq-ref__question-text {
          color: #008fd8;
        }

        .faq-ref__toggle {
          position: relative;
          display: grid;
          width: 34px;
          height: 34px;
          place-items: center;
          justify-self: end;
          border-radius: 50%;
          background: #131313;
          box-shadow: 0 5px 14px rgba(0, 0, 0, 0.14);
          transition:
            transform 220ms ease,
            background 220ms ease,
            box-shadow 220ms ease;
        }

        .faq-ref__toggle span {
          position: absolute;
          width: 10px;
          height: 1.5px;
          border-radius: 999px;
          background: #ffffff;
          transition:
            transform 220ms ease,
            opacity 180ms ease;
        }

        .faq-ref__toggle span:last-child {
          transform: rotate(90deg);
        }

        .faq-ref__toggle.is-open {
          background: #ffffff;
          box-shadow: inset 0 0 0 1px rgba(19, 19, 19, 0.14);
          transform: rotate(180deg);
        }

        .faq-ref__toggle.is-open span {
          background: #131313;
        }

        .faq-ref__toggle.is-open span:last-child {
          opacity: 0;
          transform: rotate(90deg) scaleX(0);
        }

        .faq-ref__answer {
          display: none;
          height: 0;
          overflow: hidden;
        }

        .faq-ref__answer > div {
          overflow: hidden;
        }

        .faq-ref__answer p {
          max-width: 900px;
          margin: 0;
          padding: 0 70px 24px 64px;
          color: #666666;
          font-family: Inter, sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 1.72;
        }

        .faq-ref__footer-copy {
          display: flex;
          margin-top: 22px;
          justify-content: center;
          gap: 6px;
          color: #858585;
          font-family: Inter, sans-serif;
          font-size: 11px;
          line-height: 1.5;
        }

        .faq-ref__footer-copy a {
          color: #131313;
          font-weight: 500;
          text-decoration: none;
        }

        .faq-ref__footer-copy a:hover {
          color: var(--faq-blue);
        }

        @media (max-width: 680px) {
          .faq-ref {
            padding: 64px 0 76px;
          }

          .faq-ref__shell {
            width: calc(100% - 24px);
          }

          .faq-ref__header {
            margin-bottom: 34px;
          }

          .faq-ref__header h2 {
            font-size: 42px;
            line-height: 46px;
          }

          .faq-ref__subhead {
            font-size: 13px;
          }

          .faq-ref__item {
            border-radius: 18px;
          }

          .faq-ref__question {
            grid-template-columns: 28px minmax(0, 1fr) 34px;
            min-height: 64px;
            padding: 14px 13px;
            gap: 11px;
          }

          .faq-ref__number {
            width: 22px;
            height: 22px;
            border-radius: 6px;
            font-size: 9px;
          }

          .faq-ref__question-text {
            font-size: 14px;
            line-height: 21px;
          }

          .faq-ref__toggle {
            width: 32px;
            height: 32px;
          }

          .faq-ref__answer p {
            padding: 0 46px 20px 52px;
            font-size: 13px;
          }

          .faq-ref__footer-copy {
            align-items: center;
            flex-direction: column;
            gap: 2px;
            text-align: center;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .faq-ref__header,
          .faq-ref__item {
            opacity: 1;
            transform: none;
          }

          .faq-ref__answer {
            transition: none;
          }
        }
      `}</style>
    </>
  );
}
