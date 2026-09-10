"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useInView,
  useReducedMotion,
} from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./intro.module.css";

type CapabilityId = "ai" | "apps" | "cloud" | "growth";

type Capability = {
  id: CapabilityId;
  label: string;
  detail: string;
  title: string;
  description: string;
  color: string;
  cta: string;
};

const capabilities: Capability[] = [
  {
    id: "ai",
    label: "Agentic AI",
    detail: "Agentic systems",
    title: "AI that moves work forward",
    description:
      "Practical AI agents that reason, use tools, and automate business workflows with clear human oversight.",
    color: "#eaf2ff",
    cta: "AI",
  },
  {
    id: "apps",
    label: "Web & Mobile",
    detail: "Digital products",
    title: "Made for what’s next",
    description:
      "Modern web and mobile experiences designed for real users, reliable delivery, and long-term maintainability.",
    color: "#e8f7f5",
    cta: "products",
  },
  {
    id: "cloud",
    label: "Cloud & ERP",
    detail: "Connected systems",
    title: "One connected business",
    description:
      "Cloud foundations, integrations, and ERP workflows that connect operations, data, and teams into dependable systems.",
    color: "#f0ecff",
    cta: "systems",
  },
  {
    id: "growth",
    label: "SEO & Growth",
    detail: "Digital growth",
    title: "Be found. Be chosen.",
    description:
      "Technical SEO, content, analytics, and campaigns aligned around visibility, qualified traffic, and measurable growth.",
    color: "#eaf7ec",
    cta: "growth",
  },
];

function Icon({
  name,
  size = 18,
}: {
  name:
    | "arrow"
    | "spark"
    | "bot"
    | "check"
    | "globe"
    | "phone"
    | "database"
    | "cloud"
    | "search";
  size?: number;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (name === "arrow") {
    return (
      <svg {...common}>
        <path d="M5 12h13" />
        <path d="m14 7 5 5-5 5" />
      </svg>
    );
  }

  if (name === "spark") {
    return (
      <svg {...common}>
        <path d="m12 3 1.4 4.1L17.5 8.5l-4.1 1.4L12 14l-1.4-4.1-4.1-1.4 4.1-1.4L12 3Z" />
        <path d="m18.5 14 .8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2Z" />
      </svg>
    );
  }

  if (name === "bot") {
    return (
      <svg {...common}>
        <rect x="4" y="7" width="16" height="12" rx="3" />
        <path d="M12 3v4" />
        <path d="M9 12h.01M15 12h.01" />
        <path d="M8 16h8" />
      </svg>
    );
  }

  if (name === "check") {
    return (
      <svg {...common}>
        <path d="m5 12 4 4 10-10" />
      </svg>
    );
  }

  if (name === "globe") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3c3 3 4.5 6 4.5 9S15 18 12 21c-3-3-4.5-6-4.5-9S9 6 12 3Z" />
      </svg>
    );
  }

  if (name === "phone") {
    return (
      <svg {...common}>
        <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
        <path d="M10.5 18.5h3" />
      </svg>
    );
  }

  if (name === "database") {
    return (
      <svg {...common}>
        <ellipse cx="12" cy="5" rx="7" ry="3" />
        <path d="M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5" />
        <path d="M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
      </svg>
    );
  }

  if (name === "cloud") {
    return (
      <svg {...common}>
        <path d="M6.5 18h10.7a3.8 3.8 0 0 0 .4-7.6A5.8 5.8 0 0 0 6.6 8.5 4.8 4.8 0 0 0 6.5 18Z" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <circle cx="11" cy="11" r="6" />
      <path d="m16 16 4 4" />
    </svg>
  );
}

function CapabilityVisual({
  id,
  paused,
}: {
  id: CapabilityId;
  paused: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.15 });

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-running={inView && !paused}
      className={styles.visual}
    >
      {id === "ai" && (
        <div className={styles.workflow}>
          <div className={styles.node}>
            <span className={styles.status} />
            New request
            <Icon name="arrow" size={14} />
          </div>
          <div className={styles.connector} />
          <div className={styles.agent}>
            <Icon name="bot" size={27} />
            <span>
              Jabit AI
              <br />
              <small>Reason. Act. Assist.</small>
            </span>
            <Icon name="spark" size={15} />
          </div>
          <div className={styles.connector} />
          <div className={styles.node}>
            <Icon name="check" size={15} />
            Ready for your review
          </div>
        </div>
      )}

      {id === "apps" && (
        <div className={styles.devices}>
          <div className={styles.browser}>
            <div className={styles.chrome}>
              <i />
              <i />
              <i />
            </div>
            <div className={styles.webContent}>
              <Icon name="globe" size={24} />
              <strong>
                Made for
                <br />
                what’s next.
              </strong>
              <div className={styles.miniButton}>
                Explore <Icon name="arrow" size={10} />
              </div>
              <div className={styles.tiles}>
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>

          <div className={styles.phone}>
            <span className={styles.notch} />
            <Icon name="phone" size={20} />
            <strong>
              Hello,
              <br />
              possibility.
            </strong>
            <div className={styles.phoneTile} />
            <span className={styles.phoneLine} />
          </div>
        </div>
      )}

      {id === "cloud" && (
        <div className={styles.system}>
          <div className={styles.cloud}>
            <Icon name="cloud" size={38} />
            <span>One connected business</span>
          </div>
          <div className={styles.branch} />
          <div className={styles.modules}>
            {["People", "Operations", "Finance"].map((label) => (
              <div key={label}>
                <Icon name="database" size={19} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {id === "growth" && (
        <div className={styles.growth}>
          <div className={styles.search}>
            <Icon name="search" size={15} />
            <span>Your next customer</span>
          </div>

          <div className={styles.chart}>
            {[28, 46, 40, 65, 80, 104].map((height, index) => (
              <span key={index} style={{ height }} />
            ))}
          </div>

          <div className={styles.chartLabel}>
            <span>Be found. Be chosen.</span>
            <Icon name="arrow" size={19} />
          </div>
        </div>
      )}
    </div>
  );
}

export function Intro() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState<"all" | CapabilityId>("all");
  const reduced = useReducedMotion();

  const visible = useMemo(
    () => capabilities.filter((item) => active === "all" || item.id === active),
    [active],
  );

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || reduced) return undefined;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const fill = section.querySelector(`.${styles.headingFill}`);

      if (fill) {
        gsap.fromTo(
          fill,
          { backgroundSize: "100% 100%, 0% 100%" },
          {
            backgroundSize: "100% 100%, 100% 100%",
            ease: "none",
            scrollTrigger: {
              trigger: fill,
              start: "top 92%",
              end: "top 38%",
              scrub: 0.7,
              invalidateOnRefresh: true,
            },
          },
        );
      }

      gsap.fromTo(
        `.${styles.filters} > *`,
        { y: 18, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.48,
          stagger: 0.055,
          ease: "power3.out",
          scrollTrigger: {
            trigger: `.${styles.filters}`,
            start: "top 88%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        `.${styles.footerNote}`,
        { y: 20, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.58,
          ease: "power3.out",
          scrollTrigger: {
            trigger: `.${styles.footerNote}`,
            start: "top 92%",
            once: true,
          },
        },
      );
    }, section);

    return () => context.revert();
  }, [reduced]);

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={sectionRef}
        id="why-jabit"
        className={styles.section}
        aria-labelledby="intro-heading"
      >
        <div className={styles.shell}>
          <motion.header
            className={styles.header}
            initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: reduced ? 0 : 0.66, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.badge}>
              <span>
                <Icon name="spark" size={14} />
              </span>
              The possibilities with Jabit
            </div>

            <h2 id="intro-heading" className={styles.title}>
              <span className={styles.headingFill}>
                Build what moves your business forward
              </span>
            </h2>

            <p className={styles.subtitle}>
              Build something new. Simplify what exists. Reach the people who matter.
              Find the expertise to take your next step.
            </p>
          </motion.header>

          <div className={styles.filters} aria-label="Filter capabilities">
            {[{ id: "all", label: "Explore all" } as const, ...capabilities].map((item) => (
              <button
                type="button"
                key={item.id}
                aria-pressed={active === item.id}
                onClick={() => setActive(item.id)}
                className={`${styles.filterButton} ${
                  active === item.id ? styles.filterButtonActive : ""
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div
            className={
              active === "all"
                ? styles.cardsGrid
                : `${styles.cardsGrid} ${styles.cardsGridFiltered}`
            }
          >
            <AnimatePresence mode="popLayout">
              {visible.map((item, index) => (
                <motion.article
                  key={item.id}
                  layout={!reduced}
                  initial={{
                    opacity: reduced ? 1 : 0,
                    y: reduced ? 0 : 65,
                    scale: reduced ? 1 : 0.985,
                  }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.12 }}
                  exit={{ opacity: 0, scale: reduced ? 1 : 0.97 }}
                  transition={{
                    duration: reduced ? 0 : 0.8,
                    delay: reduced ? 0 : index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                    layout: { duration: 0.35, delay: 0 },
                  }}
                  className={`${styles.card} ${
                    active === "all" && index % 2 === 1 ? styles.cardOffset : ""
                  } ${active !== "all" ? styles.expanded : ""}`}
                  style={{ backgroundColor: item.color }}
                >
                  <CapabilityVisual id={item.id} paused={false} />

                  <div className={styles.cardCopy}>
                    <p className={styles.detail}>{item.detail}</p>
                    <h3>{item.title}</h3>
                    <p className={styles.description}>{item.description}</p>

                    <a href="#contact" className={styles.cta}>
                      Let’s talk {item.cta}
                      <span>
                        <Icon name="arrow" size={15} />
                      </span>
                    </a>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>

          <p className={styles.footerNote}>
            Different capabilities. One connected approach.
          </p>
        </div>
      </section>
    </MotionConfig>
  );
}

export default Intro;
