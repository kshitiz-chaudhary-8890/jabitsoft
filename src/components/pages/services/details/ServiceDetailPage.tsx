"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Activity,
  Boxes,
  Braces,
  BrainCircuit,
  Cloud,
  Database,
  GitBranch,
  KeyRound,
  Route,
  ScanSearch,
  ShieldCheck,
  Smartphone,
  UserRoundCheck,
  Webhook,
  Workflow,
} from "lucide-react";
import { BsOpenai } from "react-icons/bs";
import { SiAnthropic, SiCrewai, SiGooglegemini, SiLangchain } from "react-icons/si";

import { useServiceReveal } from "../landing/useServiceReveal";
import { ServiceArrow } from "../landing/ServiceArrow";
import { ServiceHeroVisual } from "./ServiceHeroVisual";
import type { ServiceDetailData } from "./types";
import styles from "./ServiceDetailPage.module.css";

function SectionHeading({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <header className={styles.sectionHeading} data-reveal data-motion-heading>
      <div className={styles.sectionKicker} data-motion-heading-kicker>
        <p>{eyebrow}</p>
      </div>
      <h2>
        <span className="section-heading-fill">{title}</span>
      </h2>
      <div className={styles.headingRule} data-motion-heading-rule />
      <div className={styles.headingIntro} data-motion-heading-intro>
        {intro}
      </div>
    </header>
  );
}

function AnimatedButtonText({ children }: { children: string }) {
  return (
    <span className={styles.buttonTextClip}>
      <span>{children}</span>
      <span aria-hidden="true">{children}</span>
    </span>
  );
}

function TechnologyIcon({ name }: { name: string }) {
  const technology = name.toLowerCase();

  if (name.includes("OpenAI")) return <BsOpenai />;
  if (name === "Anthropic") return <SiAnthropic />;
  if (name === "Google Gemini") return <SiGooglegemini />;
  if (name === "LangChain") return <SiLangchain />;
  if (name === "CrewAI") return <SiCrewai />;
  if (name === "LangGraph") return <GitBranch />;
  if (name.includes("Open-source")) return <Boxes />;
  if (name.includes("RAG")) return <ScanSearch />;
  if (name.includes("Vector")) return <Database />;
  if (name.includes("Re-ranking")) return <Activity />;
  if (name.includes("Structured")) return <Braces />;
  if (name.includes("Evaluation")) return <ShieldCheck />;
  if (name === "Tracing") return <Route />;
  if (name.includes("Role-based")) return <KeyRound />;
  if (name.includes("Human")) return <UserRoundCheck />;
  if (name.includes("Webhooks")) return <Webhook />;
  if (
    technology.includes("cloud") ||
    technology.includes("aws") ||
    technology.includes("azure") ||
    technology.includes("serverless")
  )
    return <Cloud />;
  if (name.includes("CRM") || name.includes("ERP")) return <Workflow />;
  if (
    technology.includes("ios") ||
    technology.includes("android") ||
    technology.includes("mobile") ||
    technology.includes("tablet") ||
    technology.includes("wearable") ||
    technology.includes("react native") ||
    technology.includes("flutter") ||
    technology.includes("swift") ||
    technology.includes("kotlin")
  )
    return <Smartphone />;
  if (
    technology.includes("search") ||
    technology.includes("keyword") ||
    technology.includes("semrush") ||
    technology.includes("ahrefs") ||
    technology.includes("seo")
  )
    return <ScanSearch />;
  if (
    technology.includes("analytics") ||
    technology.includes("monitoring") ||
    technology.includes("dashboard") ||
    technology.includes("campaign") ||
    technology.includes("ads") ||
    technology.includes("retargeting") ||
    technology.includes("experiment") ||
    technology.includes("performance")
  )
    return <Activity />;
  if (
    technology.includes("api") ||
    technology.includes("graphql") ||
    technology.includes("terraform") ||
    technology.includes("infrastructure") ||
    technology.includes("typescript") ||
    technology.includes("node.js") ||
    technology.includes("next.js") ||
    technology === "react"
  )
    return <Braces />;
  if (
    technology.includes("kubernetes") ||
    technology.includes("docker") ||
    technology.includes("container") ||
    technology.includes("shopify") ||
    technology.includes("product system")
  )
    return <Boxes />;
  if (
    technology.includes("ci/cd") ||
    technology.includes("gitops") ||
    technology.includes("release") ||
    technology.includes("testing")
  )
    return <GitBranch />;
  if (
    technology.includes("auth") ||
    technology.includes("identity") ||
    technology.includes("permission") ||
    technology.includes("approval")
  )
    return <KeyRound />;
  if (
    technology.includes("data") ||
    technology.includes("finance") ||
    technology.includes("inventory") ||
    technology.includes("reporting")
  )
    return <Database />;
  if (
    technology.includes("content") ||
    technology.includes("cms") ||
    technology.includes("editorial") ||
    technology.includes("wordpress") ||
    technology.includes("design system")
  )
    return <Braces />;
  return <BrainCircuit />;
}

export function ServiceDetailPage({ data }: { data: ServiceDetailData }) {
  const pageRef = useServiceReveal<HTMLElement>();
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return undefined;

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.setAttribute("data-visible", "true");
        }),
      { threshold: 0.04, rootMargin: "0px 0px 12% 0px" },
    );

    page
      .querySelectorAll("[data-reveal]:not([data-motion-row]):not([data-motion-card])")
      .forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [pageRef]);

  return (
    <main ref={pageRef} className={styles.page}>
      <section className={styles.hero} aria-labelledby="service-title" data-motion-hero>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <div className={styles.heroKicker} data-motion-hero-copy>
              <p className={styles.eyebrow}>{data.label}</p>
            </div>
            <h1 id="service-title" aria-label={data.headline}>
              {data.headline.split(" ").map((word, index, words) => (
                <span className={styles.heroWord} key={`${word}-${index}`} aria-hidden="true">
                  <span data-motion-hero-word>{word}</span>
                  {index < words.length - 1 ? "\u00a0" : null}
                </span>
              ))}
            </h1>
            <div className={styles.heroBottom} data-motion-hero-copy>
              <p className={styles.lede}>{data.lede}</p>
              <div className={styles.heroActions}>
                <Link href="/#contact" className={styles.primaryButton} data-site-button data-button-variant="primary">
                  <AnimatedButtonText>{data.primaryCta}</AnimatedButtonText>
                  <ServiceArrow />
                </Link>
                <Link href="/services/" className={styles.secondaryLink} data-site-button data-button-variant="secondary">
                  <AnimatedButtonText>Explore all services</AnimatedButtonText>
                  <ServiceArrow />
                </Link>
              </div>
            </div>
          </div>
          <ServiceHeroVisual data={data} />
        </div>
      </section>

      <section className={styles.proof} aria-label="Service assurances" data-motion-proof>
        <header className={styles.proofIntro} data-motion-proof-item>
          <span>How we build</span>
          <h2>Built around the workflow. Ready for real operations.</h2>
          <p>Clear controls, practical integration and ownership from the start.</p>
        </header>
        <div className={styles.proofList}>
          {data.proof.map((item) => (
            <article key={item.label} data-motion-proof-item>
              <span aria-hidden="true" />
              <div>
                <strong>{item.value}</strong>
                <p>{item.label}</p>
              </div>
              <i aria-hidden="true">↗</i>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.problem}>
        <div className={styles.shell}>
          <SectionHeading
            eyebrow="The business problem"
            title={data.problem.title}
            intro={data.problem.intro}
          />
          <div className={styles.problemList}>
            {data.problem.items.map((item, index) => (
              <article key={item.title} data-reveal data-motion-row>
                <span>0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.capabilities}>
        <div className={styles.shell}>
          <SectionHeading
            eyebrow="Capabilities"
            title={data.capabilities.title}
            intro={data.capabilities.intro}
          />
          <div className={styles.capabilityGrid}>
            {data.capabilities.items.map((item, index) => (
              <article key={item.title} data-reveal data-motion-row>
                <span className={styles.capabilityIndex}>0{index + 1}</span>
                <div className={styles.capabilityTitle}>
                  <small>Capability</small>
                  <h3>{item.title}</h3>
                </div>
                <p>{item.text}</p>
                <i className={styles.capabilityArrow} aria-hidden="true">
                  ↗
                </i>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.useCases}>
        <div className={styles.shell}>
          <SectionHeading
            eyebrow="Use cases"
            title={data.useCases.title}
            intro={data.useCases.intro}
          />
          <div className={styles.useCaseList}>
            {data.useCases.items.map((item, index) => (
              <article key={item.title} data-reveal data-motion-row>
                <span>0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <i aria-hidden="true">↗</i>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.process}>
        <div className={styles.shell}>
          <SectionHeading
            eyebrow="Delivery process"
            title={data.process.title}
            intro={data.process.intro}
          />
          <div className={styles.processTrack}>
            {data.process.steps.map((step, index) => (
              <article key={step.title} data-reveal data-motion-card>
                <div className={styles.stepTop}>
                  <span>0{index + 1}</span>
                  <i />
                </div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                <small>Output / {step.output}</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.technology}>
        <div className={styles.shell}>
          <SectionHeading
            eyebrow="Technology"
            title={data.technology.title}
            intro={data.technology.intro}
          />
          <div className={styles.techGroups}>
            {data.technology.groups.map((group) => (
              <article key={group.label} data-reveal data-motion-row>
                <h3>{group.label}</h3>
                <div>
                  {group.items.map((item) => (
                    <span key={item}>
                      <i aria-hidden="true">
                        <TechnologyIcon name={item} />
                      </i>
                      <b>{item}</b>
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.readiness}>
        <div className={styles.shell}>
          <SectionHeading
            eyebrow="Production readiness"
            title={data.readiness.title}
            intro={data.readiness.intro}
          />
          <div className={styles.readinessBoard} data-reveal>
            <div className={styles.readinessBoardHeader}>
              <span>{data.readiness.systemLabel}</span>
              <strong>Built in, not bolted on.</strong>
              <small>
                <i /> Continuous assurance
              </small>
            </div>
            <div className={styles.readinessPhases}>
              {["Before release", "In production"].map((phase, phaseIndex) => (
                <div className={styles.readinessPhase} key={phase}>
                  <header>
                    <span>0{phaseIndex + 1}</span>
                    <h3>{phase}</h3>
                  </header>
                  {data.readiness.items.slice(phaseIndex * 2, phaseIndex * 2 + 2).map((item) => (
                    <article key={item.title}>
                      <small>{item.marker}</small>
                      <h4>{item.title}</h4>
                      <p>{item.text}</p>
                    </article>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.ownership}>
        <div className={styles.shell}>
          <SectionHeading
            eyebrow="What your team owns"
            title={data.ownership.title}
            intro={data.ownership.intro}
          />
          <div className={styles.ownershipLedger}>
            <div className={styles.ledgerHeader} aria-hidden="true">
              <span>Delivery artifact</span>
              <span>What it gives you</span>
              <span>Ownership</span>
            </div>
            {data.ownership.items.map((item, index) => (
              <article key={item.title} data-reveal>
                <span className={styles.ledgerIndex}>0{index + 1}</span>
                <div>
                  <small>{item.artifact}</small>
                  <h3>{item.title}</h3>
                </div>
                <p>{item.text}</p>
                <strong>
                  <i aria-hidden="true">✓</i>
                  Yours from day one
                </strong>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.faq}>
        <div className={styles.shell}>
          <SectionHeading
            eyebrow="Questions"
            title="What teams usually ask before we start."
            intro="Clear answers on scope, ownership, safety and delivery."
          />
          <div className={styles.faqList}>
            {data.faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <article key={faq.question} className={isOpen ? styles.faqOpen : ""}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                  >
                    <span>0{index + 1}</span>
                    <strong>{faq.question}</strong>
                    <i aria-hidden="true">{isOpen ? "−" : "+"}</i>
                  </button>
                  <div className={styles.answer}>
                    <p>{faq.answer}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.ctaGrid} aria-hidden="true" />
        <div className={styles.shell}>
          <header className={styles.ctaHeader} data-reveal>
            <p>(Let&apos;s Build)</p>
            <h2>
              <span className="section-heading-fill">{data.cta.title}</span>
            </h2>
            <p className={styles.ctaText}>{data.cta.text}</p>
          </header>
          <div className={styles.ctaActions} data-reveal>
            <Link className={styles.ctaPrimary} href="/#contact" data-site-button data-button-variant="primary">
              <AnimatedButtonText>{data.cta.button}</AnimatedButtonText>
              <ServiceArrow />
            </Link>
            <Link className={styles.ctaSecondary} href="/services/" data-site-button data-button-variant="secondary">
              <AnimatedButtonText>Explore our services</AnimatedButtonText>
            </Link>
          </div>
          <div className={styles.ctaBridge} data-reveal aria-hidden="true">
            <svg viewBox="0 0 1200 40" preserveAspectRatio="none">
              <path d="M0 20 C 300 4, 600 36, 900 20 C 1050 12, 1150 24, 1200 20" />
            </svg>
            <span>JabitSoft · Software that moves the business forward</span>
          </div>
        </div>
      </section>
    </main>
  );
}
