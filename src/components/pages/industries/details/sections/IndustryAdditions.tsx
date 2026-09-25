"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  BarChart3, Blocks, Building2, CalendarDays, CreditCard, HeartPulse,
  KeyRound, LayoutDashboard, Link2, MessageCircle, Plug, Sparkles,
  UserRound, Workflow, type LucideIcon,
} from "lucide-react";
import type { IndustryDetailData } from "../types";
import { useIndustryReveal } from "../useIndustryReveal";
import styles from "./IndustryAdditions.module.css";

const buildIcons: Record<string, LucideIcon[]> = {
  healthcare: [UserRound, HeartPulse, CalendarDays, LayoutDashboard, Link2, Workflow],
  "saas-platforms": [Blocks, Building2, LayoutDashboard, CreditCard, Link2, Sparkles],
};

const connectionIcons: LucideIcon[] = [Building2, CalendarDays, UserRound, MessageCircle, CreditCard, KeyRound, BarChart3, Plug];

function WhatWeBuild({ data }: { data: IndustryDetailData }) {
  const ref = useRef<HTMLElement>(null);
  useIndustryReveal(ref);
  const section = data.whatWeBuild;
  if (!section) return null;

  return (
    <section
      ref={ref}
      id="what-we-build"
      className={`${styles.section} ${styles.buildSection}`}
      aria-labelledby="industry-build-title"
    >
      <div className={styles.shell}>
        <header className={styles.buildHead}>
          <h2 data-ind-intro id="industry-build-title" className={styles.title}>
            <span className="section-heading-fill">{section.title}</span>
          </h2>
          <p data-ind-intro className={styles.intro}>
            {section.intro}
          </p>
        </header>
        <div className={styles.productCanvas}>
          <div className={styles.productVisual}>
            {data.slug === "saas-platforms" ? (
              <Image
                src="/images/saas-data-center.png"
                alt="Server racks and structured cabling in a data centre"
                fill
                sizes="(max-width: 900px) 100vw, 42vw"
                className={styles.productImage}
              />
            ) : (
              <div className={styles.careVisual} aria-hidden="true">
                <span className={styles.careVisualLabel}>CARE WORKFLOW</span>
                <strong>Connected from intake to follow-up.</strong>
                <div className={styles.careVisualFlow}>
                  {[
                    { icon: UserRound, label: "Patient portal" },
                    { icon: CalendarDays, label: "Appointment" },
                    { icon: HeartPulse, label: "Clinical workflow" },
                    { icon: LayoutDashboard, label: "Operations" },
                  ].map(({ icon: Icon, label }) => (
                    <span key={label}><Icon size={18} strokeWidth={1.7} />{label}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className={styles.capabilityMatrix}>
            {section.items.map((item, index) => {
              const Icon = buildIcons[data.slug]?.[index] ?? Blocks;
              return <article data-ind-item key={item.title} className={styles.capabilityItem}>
                <span className={styles.capabilityNumber}>
                  {String(index + 1).padStart(2, "0")}
                  <Icon className={styles.capabilityIcon} size={19} strokeWidth={1.6} aria-hidden="true" />
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function DevelopmentProcess({ data }: { data: IndustryDetailData }) {
  const ref = useRef<HTMLElement>(null);
  useIndustryReveal(ref);
  const section = data.developmentProcess;
  if (!section) return null;

  return (
    <section
      ref={ref}
      className={`${styles.section} ${styles.processSection}`}
      aria-labelledby="industry-process-title"
    >
      <div className={styles.shell}>
        <header className={styles.head}>
          <p data-ind-intro className={styles.eyebrow}>
            How we work
          </p>
          <h2 data-ind-intro id="industry-process-title" className={styles.title}>
            <span className="section-heading-fill">{section.title}</span>
          </h2>
          <p data-ind-intro className={styles.intro}>
            {section.intro}
          </p>
        </header>
        <ol className={styles.processGrid}>
          {section.steps.map((step, index) => (
            <li data-ind-item key={step.title} className={styles.processStep}>
              <span className={styles.processNo}>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function ConnectionSection({
  data,
  kind,
}: {
  data: IndustryDetailData;
  kind: "integrations" | "technology";
}) {
  const ref = useRef<HTMLElement>(null);
  useIndustryReveal(ref);
  const section = data[kind];
  if (!section) return null;
  const headingId = `industry-${kind}-title`;
  const eyebrow = kind === "technology" ? "Technology & integrations" : "Connected systems";

  if (kind === "technology" && data.technology?.groups?.length) {
    return (
      <section
        ref={ref}
        className={`${styles.section} ${styles.stackSection}`}
        aria-labelledby={headingId}
      >
        <div className={styles.shell}>
          <header className={styles.stackHead}>
            <div>
              <p data-ind-intro className={styles.eyebrow}>
                {eyebrow}
              </p>
              <h2 data-ind-intro id={headingId} className={styles.title}>
                <span className="section-heading-fill">{section.title}</span>
              </h2>
            </div>
            <p data-ind-intro className={styles.intro}>
              {section.intro}
            </p>
          </header>
          <div
            className={styles.stackWall}
            role="list"
            aria-label="Technology capabilities by layer"
          >
            {data.technology.groups.map((group, index) => (
              <div data-ind-item className={styles.stackColumn} role="listitem" key={group.label}>
                <span className={styles.stackIndex}>{String(index + 1).padStart(2, "0")} / 03</span>
                <h3>{group.label}</h3>
                <ul className={styles.stackTechnologyList}>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className={`${styles.section} ${styles.connectionSection}`}
      aria-labelledby={headingId}
    >
      <div className={styles.shell}>
        <div className={styles.connectionLayout}>
          <header className={styles.head}>
            <p data-ind-intro className={styles.eyebrow}>
              {eyebrow}
            </p>
            <h2 data-ind-intro id={headingId} className={styles.title}>
              <span className="section-heading-fill">{section.title}</span>
            </h2>
            <p data-ind-intro className={styles.intro}>
              {section.intro}
            </p>
          </header>
          <div data-ind-item className={styles.connectionDiagram}>
            <div className={styles.hub}>
              <span className={styles.hubPulse} aria-hidden="true" />
              {data.label}
            </div>
            <ul className={styles.connectionNodes}>
              {section.items.map((item, index) => {
                const Icon = connectionIcons[index % connectionIcons.length];
                return <li key={item} data-ind-item>
                  <span className={styles.nodeLine} aria-hidden="true" />
                  <Icon size={15} strokeWidth={1.7} aria-hidden="true" />
                  {item}
                </li>;
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function FrequentlyAskedQuestions({ data }: { data: IndustryDetailData }) {
  const ref = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  useIndustryReveal(ref);
  const section = data.faq;
  if (!section) return null;

  return (
    <section
      ref={ref}
      className={`${styles.section} ${styles.faqSection}`}
      aria-labelledby="industry-faq-title"
    >
      <div className={`${styles.shell} ${styles.faqShell}`}>
        <header className={styles.faqHead}>
          <p data-ind-intro className={styles.faqEyebrow}>
            (JabitSoft FAQs)
          </p>
          <h2 data-ind-intro id="industry-faq-title" className={styles.faqTitle}>
            <span className="section-heading-fill">{section.title}</span>
          </h2>
          {section.intro ? <p data-ind-intro className={styles.faqIntro}>{section.intro}</p> : null}
        </header>
        <div className={styles.faqList}>
          {section.items.map((item, index) => {
            const open = openIndex === index;
            const answerId = `industry-faq-answer-${index}`;
            return (
              <article
                data-ind-item
                key={item.question}
                className={`${styles.faqItem} ${open ? styles.faqItemOpen : ""}`}
              >
                <button
                  type="button"
                  className={styles.faqQuestion}
                  aria-expanded={open}
                  aria-controls={answerId}
                  onClick={() => setOpenIndex(open ? null : index)}
                >
                  <span className={styles.faqNumber}>{index + 1}</span>
                  <span className={styles.faqQuestionText}>{item.question}</span>
                  <span className={styles.faqToggle} aria-hidden="true">
                    <span />
                    <span />
                  </span>
                </button>
                <div id={answerId} className={styles.faqAnswer} aria-hidden={!open}>
                  <div className={styles.faqAnswerInner}>
                    <p>{item.answer}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <p className={styles.faqFooter}>
          Have a project or another question? <a href="mailto:hello@jabitsoft.com">hello@jabitsoft.com</a>
        </p>
      </div>
    </section>
  );
}

export function IndustryAdditions({
  data,
  placement,
}: {
  data: IndustryDetailData;
  placement: "early" | "beforeImpact" | "late";
}) {
  if (placement === "early") return <WhatWeBuild data={data} />;
  if (placement === "beforeImpact") return <DevelopmentProcess data={data} />;

  return (
    <>
      <ConnectionSection data={data} kind="integrations" />
      <ConnectionSection data={data} kind="technology" />
      <FrequentlyAskedQuestions data={data} />
    </>
  );
}
