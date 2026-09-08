import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "./components/Hero.jsx";
import ClientMarquee from "./components/ClientMarquee.jsx";
import DualMarquee from "./components/DualMarquee.jsx";
import Intro from "./components/sections/Intro/intro";
import ServiceCardCarousel from "./components/ServiceCardCarousel.jsx";
import ClientResults from "./components/ClientResults.jsx";
import CompanyStats from "./components/CompanyStats.jsx";
import RecentWorks from "./components/RecentWorks.jsx";
import ServiceDirectory from "./components/ServiceDirectory.jsx";
import ProblemsWeSolve from "./components/sections/ProblemsWeSolve/ProblemsWeSolve";
import HowWeBuild from "./components/sections/HowWeBuild/HowWeBuild";
import FAQ from "./components/FAQ.jsx";
import Footer from "./components/Footer.jsx";
import LatestBlog from "./components/LatestBlog.jsx";
import jabitLogo from "./assets/jabit-logo.png";

const media = {
  founders: [
    "https://framerusercontent.com/images/LdiJIgo7vhBde0WiWHd48uSzxU.png?height=512&width=512",
    "https://framerusercontent.com/images/I9yoNS4RgoWEeRpJDtgEIoLAd4Y.png?height=512&width=512",
    "https://framerusercontent.com/images/G5E86VA7DStEga3pPtCu3nwW1qE.png?height=512&width=512",
  ],
  heroOne: "https://framerusercontent.com/images/luFfRKwjQbMAmBeknRUvUg7XY.svg?width=82&height=64",
  heroTwo:
    "https://framerusercontent.com/images/q6Lt0wxatBudeFMJylqNDhblWfw.png?width=325&height=256",
  heroThree:
    "https://framerusercontent.com/images/SEe6jn6sx24EVdMsr0kTyBN4Ok.png?width=324&height=256",
  heroSoftware:
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=85",
  heroBusiness:
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=500&q=85",
  heroGlobal:
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=500&q=85",
  showcase:
    "https://framerusercontent.com/images/dT5S1njJpyHvznBNeTmMAwfBcqQ.png?height=1604&width=2848",
  testimonial:
    "https://framerusercontent.com/images/nURHcgFo9S6zVF3j0ly85sSmvE.png?height=920&width=1488",
  statNoise:
    "https://framerusercontent.com/images/qDuGmDXhhbdrJsP16G4zNCDX8.png?width=1440&height=1840",
  work: [
    "https://framerusercontent.com/images/x3RMizQqFhQ9G8jF5dqqcbxY8M.png",
    "https://framerusercontent.com/images/MHwFX5PK3mWp7JJNseH8110qdg.png",
    "https://framerusercontent.com/images/jXErNhJ75aLqKEeFiIYT76adrM8.png",
  ],
  workDetail: [
    "https://framerusercontent.com/images/olR1jd1vAg59BKYSorw26ZNxY.png",
    "https://framerusercontent.com/images/QhPkJGJBXS8kPS7IhPj7ZBGZpII.png",
    "https://framerusercontent.com/images/yOPV9nZRSJXmNPqyeWfZSThWAc.png",
  ],
  service: "https://framerusercontent.com/images/L3jNOIvjVNNJ9KYGN7ZewlhM4.png",
  founder: "https://framerusercontent.com/images/cdiudTEW8MSbl2008vSYXSq9ndI.png",
  founderSeal: "https://framerusercontent.com/images/JpJ9ryMkQp811zxkS5X8I8Igdo.png",
  contact: "https://framerusercontent.com/images/1sREGvYWbdhqXmijCOMUIsD7A.png",
  logos: [
    "https://framerusercontent.com/images/3cWSgJFsUVvZeOw9LdQmTOSVFhE.svg?width=58&height=32",
    "https://framerusercontent.com/images/nfabfL1KTOOmw22T9soWodkE5Q.svg?width=127&height=32",
    "https://framerusercontent.com/images/pFmkT2mGzyfTzJsLN2Lr3fdbIk.svg",
    "https://framerusercontent.com/images/oqkjAivG8qVmaPBg07Z4Yst8rwk.svg?width=162&height=32",
    "https://framerusercontent.com/images/nmwtsE1SWD34rSXL3OhLE7CTn0.svg?width=83&height=32",
    "https://framerusercontent.com/images/zhMiNUjAyE25vd6XOETCIwS38.svg?width=131&height=32",
  ],
  templates: [
    "https://framerusercontent.com/images/aR3TKcVMliXQPWIhQTclJhXcTMg.png?scale-down-to=512&width=1600&height=1200",
    "https://framerusercontent.com/images/69auPD1YzLBCNcO5v9D5nks5aS4.png?scale-down-to=512&width=3200&height=2400",
    "https://framerusercontent.com/images/YDnxl1a68JhgSkmG8E0skqnoFM.png?scale-down-to=512&width=1600&height=1200",
    "https://framerusercontent.com/images/bUQhIsAv8wdGMuDZ6cBmNmLqJmc.png?scale-down-to=512&width=1760&height=1320",
  ],
};

const projects = [
  {
    name: "Archin",
    mark: "Archin",
    year: "2025",
    role: "Lead Designer",
    services: ["Website Design", "Product Design", "Branding", "Development"],
    image: media.work[0],
    detail: media.workDetail[0],
    tone: "archin",
    copy: "We’ve helped businesses across industries achieve their goals. Here are some of our selected works.",
  },
  {
    name: "VNTNR",
    mark: "VNTNR",
    year: "2018",
    role: "Logo Designer",
    services: ["Designing", "Branding", "Redesigning", "Development"],
    image: media.work[1],
    detail: media.workDetail[1],
    tone: "vntnr",
    copy: "We’ve partnered with businesses across various industries to help them achieve their goals.",
  },
  {
    name: "Aeorim",
    mark: "Aeorim",
    year: "2023",
    role: "Website Designer",
    services: ["Branding", "Revamp", "Development", "Designing"],
    image: media.work[2],
    detail: media.workDetail[2],
    tone: "aeorim",
    copy: "We’ve collaborated with companies from diverse sectors to turn their visions into reality. Here’s a look at some of our featured work.",
  },
];

function Arrow({ left = false }) {
  return (
    <span className="arrow-icon" aria-hidden="true">
      {left ? "←" : "→"}
    </span>
  );
}

function usePageMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const groups = [
      [".showcase", "showcase-in", 0],
      [".client-logos", "rise", 0],
      [".ribbon-layer", "rise", 0],
      [".intro .script-eyebrow, .service-pills", "rise", 0],
      [".section-title > :not([data-reveal-heading]):not(.section-heading-fill)", "title-rise", 0],
      [".testimonial-grid", "rise", 0],
      [".founder-portrait", "slide-left", 0],
      [".founder-copy", "rise", 0],
      [".faq-item", "rise", 45],
      [".contact-inner > *, .footer-bottom", "rise", 55],
    ];

    const items = groups.flatMap(([selector, motion, stagger]) =>
      [...document.querySelectorAll(selector)].map((element, index) => {
        element.dataset.motion = motion;
        element.style.setProperty("--motion-delay", `${Math.min(index * stagger, 280)}ms`);
        return element;
      }),
    );

    root.classList.add("motion-ready");
    requestAnimationFrame(() => root.classList.add("page-loaded"));

    if (reduced || !("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-inview"));
      return () => root.classList.remove("motion-ready", "page-loaded");
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-inview");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" },
    );

    items.forEach((item) => observer.observe(item));
    return () => {
      observer.disconnect();
      root.classList.remove("motion-ready", "page-loaded");
    };
  }, []);
}

function useProjectStackMotion() {
  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) return undefined;
    const section = document.querySelector(".portfolio");
    const stack = section?.querySelector(".project-stack");
    const cards = [...document.querySelectorAll(".project-card")];
    if (!section || !stack || cards.length < 2) return undefined;

    gsap.registerPlugin(ScrollTrigger);
    section.classList.add("is-scroll-cards-stage");
    stack.classList.add("is-scroll-cards");

    const context = gsap.context(() => {
      cards.forEach((card, index) => {
        gsap.set(card, {
          yPercent: index === 0 ? 0 : 110,
          scale: 1,
          rotation: 0,
          zIndex: index + 1,
          transformOrigin: "50% 50%",
          force3D: true,
        });
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerHeight * (cards.length - 1) * 0.65}`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      cards.slice(1).forEach((card, index) => {
        const currentCard = cards[index];
        const rotation = index % 2 === 0 ? -2 : 2;

        timeline
          .to(
            currentCard,
            {
              scale: 0.92,
              rotation,
              ease: "power2.inOut",
              duration: 1,
            },
            index,
          )
          .to(
            card,
            {
              yPercent: 0,
              ease: "power2.inOut",
              duration: 1,
            },
            index,
          );
      });
    }, section);

    ScrollTrigger.refresh();

    return () => {
      context.revert();
      section.classList.remove("is-scroll-cards-stage");
      stack.classList.remove("is-scroll-cards");
    };
  }, []);
}

function useShowcaseScaleMotion() {
  useEffect(() => {
    const section = document.querySelector(".showcase");
    const imageFrame = section?.querySelector(".showcase-inner");
    if (!section || !imageFrame) return undefined;

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduced) {
      gsap.set(imageFrame, { scale: 1, clearProps: "willChange" });
      return () => gsap.set(imageFrame, { clearProps: "transform,willChange" });
    }

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.fromTo(
        imageFrame,
        { scale: 1, force3D: true },
        {
          scale: () =>
            Math.min(1.55, Math.max(1.08, (window.innerWidth - 24) / section.clientWidth)),
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: section,
            start: "top 92%",
            end: "top 18%",
            scrub: 0.75,
            invalidateOnRefresh: true,
            onEnter: () => gsap.set(imageFrame, { willChange: "transform" }),
            onEnterBack: () => gsap.set(imageFrame, { willChange: "transform" }),
            onLeave: () => gsap.set(imageFrame, { willChange: "auto" }),
            onLeaveBack: () => gsap.set(imageFrame, { willChange: "auto" }),
          },
        },
      );
    }, section);

    return () => context.revert();
  }, []);
}

function useIntroTextMotion() {
  useEffect(() => {
    const section = document.querySelector(".intro");
    const words = gsap.utils.toArray(".intro-scroll-word", section);
    if (!section || !words.length) return undefined;

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduced) {
      gsap.set(words, { color: "#131313" });
      return () => gsap.set(words, { clearProps: "color" });
    }

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.to(words, {
        color: "#131313",
        stagger: 0.08,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 78%",
          end: "bottom 48%",
          scrub: 1,
        },
      });
    }, section);

    return () => context.revert();
  }, []);
}

function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const close = (event) => event.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, []);
  return (
    <>
      <header className="site-nav">
        <a className="logo" href="#top" aria-label="JabitSoft home">
          <img src={jabitLogo} alt="" />
        </a>
        <nav className={open ? "nav-links is-open" : "nav-links"} aria-label="Primary navigation">
          <a href="#works" onClick={() => setOpen(false)}>
            Works
          </a>
          <a href="#services" onClick={() => setOpen(false)}>
            Services
          </a>
          <a href="#about" onClick={() => setOpen(false)}>
            About
          </a>
          <a href="#contact" onClick={() => setOpen(false)}>
            Blog
          </a>
        </nav>
        <a className="button button-dark nav-contact" href="#contact">
          Contact
        </a>
        <button
          className="menu-button"
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
        </button>
      </header>
    </>
  );
}

function Portfolio() {
  return (
    <section className="portfolio shell" id="works" aria-labelledby="works-title">
      <header className="section-title centered">
        <p className="eyebrow">(Why clients love JabitSoft)</p>
        <h2 id="works-title">Recent Works</h2>
      </header>
      <div className="project-stack">
        {projects.map((project, index) => (
          <article
            className={`project-card ${project.tone}`}
            key={project.name}
            style={{ "--project-image": `url(${project.image})` }}
          >
            <img className="project-backdrop" src={project.image} alt="" aria-hidden="true" />
            <div className="project-summary">
              <span className="project-count">0{index + 1} / 03</span>
              <p>{project.copy}</p>
              <strong className="project-wordmark">{project.mark}</strong>
            </div>
            <div className="project-art">
              <img src={project.detail} alt={`${project.name} project presentation mockup`} />
            </div>
            <dl className="project-meta">
              <div>
                <dt>Year</dt>
                <dd>{project.year}</dd>
              </div>
              <div>
                <dt>Role</dt>
                <dd>{project.role}</dd>
              </div>
              <div>
                <dt>Services</dt>
                <dd>
                  {project.services.map((service) => (
                    <span key={service}>{service}</span>
                  ))}
                </dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}

const services = [
  {
    eyebrow: "Agentic AI",
    title: "Agentic AI Development",
    description:
      "Autonomous AI systems that plan, reason, use tools, and execute business workflows with human oversight.",
    tags: ["AI Agents", "LLM Orchestration", "Workflow Automation"],
    leftStatus: "Agentic Systems",
    rightTitle: "AI agents that move work forward.",
    rightDescription:
      "Reasoning, tools and business context connected in reliable workflows designed to automate complex tasks.",
    centerLabel: "AGENT",
    centerIcon: "AI",
    diagramVariant: "ai",
    diagramNodes: {
      left: "LLMs",
      right: "Tools",
      top: "Memory",
      bottom: "Automation",
    },
    rightStatus: "AI Ready",
    rightCta: "Agent Stack",
  },
  {
    eyebrow: "Cloud Consulting",
    title: "Cloud Consulting",
    description:
      "Cloud architecture, migration, optimization, and security designed for resilient and scalable operations.",
    tags: ["AWS / Azure", "Cloud Migration", "DevOps & Security"],
    leftStatus: "Cloud Architecture",
    rightTitle: "Cloud foundations built to scale.",
    rightDescription:
      "Secure infrastructure, optimized workloads and reliable delivery practices working together across the cloud.",
    centerLabel: "CLOUD",
    centerIcon: "☁",
    diagramVariant: "cloud",
    diagramNodes: {
      left: "Compute",
      right: "Storage",
      top: "Security",
      bottom: "DevOps",
    },
    rightStatus: "Cloud Ready",
    rightCta: "Cloud Stack",
  },
  {
    eyebrow: "Mobile Apps",
    title: "Mobile Application Development",
    description:
      "High-performance mobile products built for iOS and Android with polished interfaces and reliable integrations.",
    tags: ["iOS & Android", "React Native", "API Integration"],
    leftStatus: "Mobile Engineering",
    rightTitle: "Mobile experiences built for real users.",
    rightDescription:
      "Native-quality interfaces, reliable APIs and scalable app architecture connected in one seamless mobile experience.",
    centerLabel: "APP",
    centerIcon: "◇",
    diagramVariant: "mobile",
    diagramNodes: {
      left: "iOS",
      right: "Android",
      top: "APIs",
      bottom: "Cross-platform",
    },
    rightStatus: "App Ready",
    rightCta: "Mobile Stack",
  },
  {
    eyebrow: "ERP Systems",
    title: "ERP Services",
    description:
      "Integrated ERP solutions that connect business processes, automate operations, and improve decision-making.",
    tags: ["ERP Integration", "Process Automation", "Data & Reporting"],
    leftStatus: "Business Operations",
    rightTitle: "One system for connected operations.",
    rightDescription:
      "Finance, inventory, people and operations unified through structured workflows and reliable business data.",
    centerLabel: "ERP",
    centerIcon: "▦",
    diagramVariant: "erp",
    diagramNodes: {
      left: "Finance",
      right: "Inventory",
      top: "HR",
      bottom: "Operations",
    },
    rightStatus: "ERP Ready",
    rightCta: "ERP Stack",
  },
  {
    eyebrow: "Digital Growth",
    title: "SEO / Digital Marketing",
    description:
      "Search and digital growth strategies built around visibility, measurable performance, and qualified traffic.",
    tags: ["Technical SEO", "Content Strategy", "Analytics & PPC"],
    leftStatus: "Growth Engineering",
    rightTitle: "Search visibility built for growth.",
    rightDescription:
      "Technical SEO, content, analytics and campaigns aligned around measurable acquisition and long-term discoverability.",
    centerLabel: "GROW",
    centerIcon: "↗",
    diagramVariant: "growth",
    diagramNodes: {
      left: "SEO",
      right: "Content",
      top: "Analytics",
      bottom: "Campaigns",
    },
    rightStatus: "Growth Ready",
    rightCta: "Growth Stack",
  },
  {
    eyebrow: "Web Platforms",
    title: "Website Solutions",
    description:
      "Fast, scalable web products built with modern frameworks, SSR, and clean design systems.",
    tags: ["Next.js & React", "SSR / SSG", "Design Systems"],
    leftStatus: "Modern Web Engineering",
    rightTitle: "The web, engineered for growth.",
    rightDescription:
      "Modern rendering, reusable interfaces and scalable architecture working together in one production-ready platform.",
    centerLabel: "WEB",
    centerIcon: "</>",
    diagramVariant: "web",
    diagramNodes: {
      left: "React",
      right: "SSR / SSG",
      top: "Next.js",
      bottom: "Design Systems",
    },
    rightStatus: "Production Ready",
    rightCta: "Modern Stack",
  },
];

function Services() {
  const stageRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const stage = stageRef.current;
    const cardsWrap = cardsRef.current;
    if (!stage || !cardsWrap) return undefined;

    gsap.registerPlugin(ScrollTrigger);

    const panels = gsap.utils.toArray(".services-step-panel", cardsWrap);
    if (panels.length < 2) return undefined;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 901px)", () => {
      const ctx = gsap.context(() => {
        let cachedMetrics = null;

        const computeMetrics = () => {
          const stageWidth = cardsWrap.clientWidth;
          const previewWidth = gsap.utils.clamp(48, 72, stageWidth * 0.055);
          const gap = gsap.utils.clamp(8, 12, stageWidth * 0.009);
          const activeWidth = Math.max(
            560,
            stageWidth - (panels.length - 1) * (previewWidth + gap),
          );
          return { stageWidth, previewWidth, gap, activeWidth };
        };

        const getMetrics = () => {
          if (!cachedMetrics) cachedMetrics = computeMetrics();
          return cachedMetrics;
        };

        const invalidateMetrics = () => {
          cachedMetrics = null;
        };

        const getPanelState = (activeIndex, panelIndex) => {
          const { previewWidth, gap, activeWidth } = getMetrics();
          const slot = previewWidth + gap;
          const active = panelIndex === activeIndex;

          let x;
          if (panelIndex < activeIndex) {
            x = panelIndex * slot;
          } else if (panelIndex === activeIndex) {
            x = activeIndex * slot;
          } else {
            x = activeIndex * slot + activeWidth + gap + (panelIndex - activeIndex - 1) * slot;
          }

          const inactiveCrop = Math.max(0, activeWidth - previewWidth);

          return {
            x,
            clipPath: active
              ? "inset(0px 0px 0px 0px round 25px)"
              : `inset(0px ${inactiveCrop}px 0px 0px round 25px)`,
            opacity: active ? 1 : 0.58,
            zIndex: active ? 20 : 10 - Math.abs(panelIndex - activeIndex),
          };
        };

        const syncPanelWidths = () => {
          invalidateMetrics();
          const { activeWidth } = getMetrics();
          gsap.set(panels, { width: activeWidth });
        };

        syncPanelWidths();

        gsap.set(panels, {
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          autoAlpha: 1,
          pointerEvents: "none",
          transformOrigin: "0 50%",
          force3D: true,
        });

        gsap.set(panels, {
          x: (index) => getPanelState(0, index).x,
          clipPath: (index) => getPanelState(0, index).clipPath,
          opacity: (index) => getPanelState(0, index).opacity,
          zIndex: (index) => getPanelState(0, index).zIndex,
        });

        gsap.set(panels[0], { pointerEvents: "auto" });

        let activePointerPanel = 0;
        const setActivePointerPanel = (idx) => {
          if (idx === activePointerPanel) return;
          panels[activePointerPanel].style.pointerEvents = "none";
          panels[idx].style.pointerEvents = "auto";
          activePointerPanel = idx;
        };

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: () => `+=${window.innerHeight * (panels.length - 1) * 0.95}`,
            scrub: 0.5,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onRefreshInit: syncPanelWidths,
            onRefresh: () => ScrollTrigger.sort(),
          },
        });

        timeline.to({}, { duration: 0.48 });

        panels.slice(1).forEach((_, index) => {
          const nextActive = index + 1;

          timeline.to({}, { duration: 0.22 });

          timeline.to(panels, {
            x: (panelIndex) => getPanelState(nextActive, panelIndex).x,
            clipPath: (panelIndex) => getPanelState(nextActive, panelIndex).clipPath,
            opacity: (panelIndex) => getPanelState(nextActive, panelIndex).opacity,
            zIndex: (panelIndex) => getPanelState(nextActive, panelIndex).zIndex,
            duration: 1,
            ease: "power3.inOut",
            force3D: true,
            onStart: () => setActivePointerPanel(nextActive),
          });
        });

        timeline.to({}, { duration: 0.58 });

        const refreshFrame = requestAnimationFrame(() => {
          ScrollTrigger.sort();
          ScrollTrigger.refresh();
        });

        return () => cancelAnimationFrame(refreshFrame);
      }, stage);

      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <section className="bg-white" id="services" aria-labelledby="services-title">
      <header className="section-title centered shell pt-6">
        <p className="eyebrow">(Services)</p>
        <RevealHeading id="services-title">What we do</RevealHeading>
        <p className="service-subhead">
          We build robust, scalable systems that power businesses worldwide.
        </p>
      </header>

      <div className="services-step-stage" ref={stageRef}>
        <div className="services-step-viewport shell">
          <div className="services-step-cards" ref={cardsRef}>
            {services.map((service, index) => (
              <div className="services-step-panel" key={service.title}>
                <ServiceCard
                  index={index + 1}
                  total={services.length}
                  enableEntranceAnimation={false}
                  {...service}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        #services {
          position: relative;
          z-index: 2;
          background: #ffffff;
          isolation: isolate;
        }

        .services-step-stage {
          position: relative;
          z-index: 2;
          margin-top: 0;
          padding-top: 82px;
          padding-bottom: 128px;
          overflow: hidden;
          background: #ffffff !important;
          box-shadow: none !important;
          isolation: isolate;
        }

        .services-step-viewport,
        .services-step-viewport.shell {
          width: 100%;
          max-width: none;
          padding-left: clamp(24px, 2.4vw, 44px);
          padding-right: clamp(24px, 2.4vw, 44px);
          overflow: hidden;
          background: transparent !important;
          box-shadow: none !important;
          border: 0 !important;
        }

        .services-step-cards {
          position: relative;
          width: 100%;
          max-width: none;
          height: 500px;
          margin: 0 auto;
          overflow: hidden;
          background: transparent !important;
          box-shadow: none !important;
          border: 0 !important;
          isolation: isolate;
        }

        .services-step-panel {
          height: 100%;
          margin: 0 !important;
          padding: 0 !important;
          overflow: visible;
          background: transparent !important;
          box-shadow: none !important;
          border: 0 !important;
          will-change: transform, opacity;
          transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .services-step-panel > .svc-card {
          width: 100%;
          max-width: none;
          margin: 0;
        }

        @media (max-width: 900px) {
          .services-step-stage {
            margin-top: 40px;
            padding-top: 0;
            padding-bottom: 96px;
            overflow: visible;
            background: transparent !important;
          }

          .services-step-viewport,
          .services-step-viewport.shell {
            overflow: visible;
            background: transparent !important;
          }

          .services-step-cards {
            display: grid;
            height: auto;
            gap: 28px;
            overflow: visible;
          }

          .services-step-panel {
            position: relative !important;
            inset: auto !important;
            width: 100% !important;
            height: auto;
            opacity: 1 !important;
            visibility: visible !important;
            filter: none !important;
            clip-path: none !important;
            transform: none !important;
            pointer-events: auto !important;
          }

          .services-step-panel > .svc-card {
            width: 100%;
            max-width: 1280px;
            margin: 0 auto;
          }
        }
      `}</style>
    </section>
  );
}

function Founder() {
  return (
    <section className="founder-section" aria-labelledby="founder-title">
      <header className="section-title centered">
        <p className="eyebrow">(Intro)</p>
        <h2 id="founder-title">Meet Finton</h2>
      </header>
      <div className="founder-stage shell">
        <div className="founder-portrait">
          <img className="founder-img" src={media.founder} alt="Founder of JabitSoft" />
          <img
            className="founder-seal"
            src={media.founderSeal}
            alt="Award-winning designer since 2020"
          />
        </div>
        <div className="founder-copy">
          <p className="founder-role">The Founder</p>
          <p>
            Franklin is a software architect focused on building robust, scalable systems. He leads
            engineering teams and startups to deliver standout platforms and seamless digital
            experiences. Based in London, he balances technical depth with clarity — and enjoys
            experimenting with distributed systems and cloud-native architectures in his spare time.
          </p>
          <dl className="founder-history">
            <div>
              <dt>Founder at JabitSoft</dt>
              <dd>2024–Now</dd>
            </div>
            <div>
              <dt>Brand Designer at Google</dt>
              <dd>2023–2024</dd>
            </div>
            <div>
              <dt>Web Designer at Shopify</dt>
              <dd>2018–2023</dd>
            </div>
            <div>
              <dt>Junior Designer at Meta</dt>
              <dd>2015–2018</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}

function TemplateWidget() {
  const [templateIndex, setTemplateIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTemplateIndex((prev) => (prev + 1) % media.templates.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <aside className="template-widget" aria-label="Template badge">
      <div className="template-preview-card">
        <img
          src={media.templates[templateIndex]}
          alt="New template preview"
          className="template-card-img"
        />
        <span className="template-badge-label">NEW TEMPLATES</span>
      </div>
    </aside>
  );
}

export default function App({ renderHeader = true, renderFooter = true }) {
  usePageMotion();
  useProjectStackMotion();
  useShowcaseScaleMotion();
  useIntroTextMotion();
  return (
    <>
      {renderHeader ? <Header /> : null}
      <main id="main-content">
        <Hero />
        <ClientMarquee />
        <DualMarquee />
        <Intro />
        <ServiceDirectory />
        <RecentWorks />
        <ClientResults />
        <HowWeBuild />
        <CompanyStats />
        <ProblemsWeSolve />
        <LatestBlog />
        <FAQ />
      </main>
      {renderFooter ? <Footer /> : null}
    </>
  );
}
