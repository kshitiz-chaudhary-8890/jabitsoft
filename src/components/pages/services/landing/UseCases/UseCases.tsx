"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./UseCases.module.css";

const useCases = [
  {
    id: "support",
    category: "Customer Operations",
    title: "Autonomous Support Resolution",
    description: "Agents that resolve Tier-1 and Tier-2 tickets end-to-end—reading context, querying knowledge bases, taking actions in CRM, and escalating only when policy requires human sign-off.",
    outcomes: ["Resolve repetitive requests end to end", "Escalate policy-sensitive cases", "Keep the service record current"],
    systems: ["Zendesk", "Salesforce", "Knowledge Base", "Slack"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    color: "#0f6a4e",
  },
  {
    id: "sales",
    category: "Revenue Operations",
    title: "Intelligent Deal Orchestration",
    description: "Agents that monitor pipeline health, draft personalized outreach, prepare meeting briefs from CRM + email + calls, and surface risks before they become surprises.",
    outcomes: ["Prepare context before each conversation", "Surface pipeline risks earlier", "Keep follow-up work moving"],
    systems: ["Salesforce", "HubSpot", "Gong", "Outreach", "LinkedIn"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    color: "#0f6a4e",
  },
  {
    id: "finance",
    category: "Finance & Compliance",
    title: "Automated Reconciliation & Close",
    description: "Agents that match transactions across ERP, bank feeds, and sub-ledgers, flag anomalies with evidence packages, and draft journal entries for reviewer approval.",
    outcomes: ["Match routine transactions", "Package exceptions with evidence", "Keep reviewers in control"],
    systems: ["NetSuite", "SAP", "QuickBooks", "Stripe", "Bank APIs"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M12 8v8" />
        <path d="M8 12h8" />
      </svg>
    ),
    color: "#0f6a4e",
  },
  {
    id: "hr",
    category: "People Operations",
    title: "Employee Lifecycle Automation",
    description: "Agents that orchestrate onboarding across HRIS, IT provisioning, and learning systems, handle policy questions, and manage offboarding with compliance checklists.",
    outcomes: ["Coordinate onboarding tasks", "Answer policy questions with context", "Track every required handoff"],
    systems: ["Workday", "BambooHR", "Okta", "Google Workspace", "Slack"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    color: "#0f6a4e",
  },
  {
    id: "supply",
    category: "Supply Chain",
    title: "Procurement & Inventory Intelligence",
    description: "Agents that monitor supplier risk, auto-generate POs from demand signals, negotiate routine orders, and maintain optimal safety stock across warehouses.",
    outcomes: ["Monitor supplier and stock signals", "Prepare routine purchase actions", "Escalate material exceptions"],
    systems: ["SAP Ariba", "Coupa", "Oracle", "EDI", "Carrier APIs"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <path d="M3 6h18" />
        <path d="M16 10a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h4z" />
      </svg>
    ),
    color: "#0f6a4e",
  },
  {
    id: "product",
    category: "Product & Engineering",
    title: "Code Review & Release Automation",
    description: "Agents that review PRs for security, style, and architecture, run contextual tests, generate release notes, and manage staged rollouts with automatic rollback on anomaly.",
    outcomes: ["Review changes against team standards", "Run contextual verification", "Support controlled release decisions"],
    systems: ["GitHub", "GitLab", "Jira", "Datadog", "Vercel", "K8s"],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    color: "#0f6a4e",
  },
];

export function UseCases() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = ref.current;
    if (!section) return undefined;
    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduced) return undefined;

    const ctx = gsap.context(() => {
      const eyebrow = section.querySelector(`.${styles.eyebrow}`);
      const heading = section.querySelector(`.${styles.heading}`);
      const headingFill = section.querySelector(`.${styles.headingFill}`);
      const description = section.querySelector(`.${styles.description}`);
      const tabs = section.querySelectorAll(`.${styles.tab}`);
      const panels = section.querySelectorAll(`.${styles.panel}`);
      const panelContents = section.querySelectorAll(`.${styles.panelContent}`);

      gsap.set([eyebrow, heading, description], { opacity: 0, y: 28 });
      gsap.set(tabs, { opacity: 0, y: 20, scale: 0.95 });
      gsap.set(panels, { opacity: 0, y: 30, scale: 0.97 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
        defaults: { ease: "power4.out" },
      });

      tl.to(eyebrow, { opacity: 1, y: 0, duration: 0.5 }, 0)
        .to(heading, { opacity: 1, y: 0, duration: 0.6 }, 0.08)
        .to(description, { opacity: 1, y: 0, duration: 0.55 }, 0.16)
        .to(tabs, { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.05, ease: "back.out(1.3)" }, 0.25)
        .to(panels, { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.06 }, 0.35);

      if (headingFill) {
        gsap.fromTo(
          headingFill,
          { backgroundSize: "100% 100%, 0% 100%" },
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
          }
        );
      }

      // Tab interaction
      tabs.forEach((tab, index) => {
        tab.addEventListener("click", () => {
          tabs.forEach((t, i) => {
            t.classList.toggle(styles.tabActive, i === index);
            t.setAttribute("aria-selected", String(i === index));
          });
          panels.forEach((p, i) => {
            p.classList.toggle(styles.panelActive, i === index);
            p.setAttribute("aria-hidden", String(i !== index));
          });
          if (panelContents[index]) {
            gsap.fromTo(
              panelContents[index].querySelectorAll(`.${styles.detailItem}, .${styles.outcomeItem}, .${styles.systemTag}`),
              { opacity: 0, y: 16 },
              { opacity: 1, y: 0, duration: 0.4, stagger: 0.04, ease: "power3.out" }
            );
          }
        });
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className={styles.section} aria-labelledby="use-cases-title">
      <div className={styles.container}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>(Use Cases)</p>
          <h2 id="use-cases-title" className={styles.heading}>
            <span className={styles.headingFill}>Where agentic AI creates practical leverage</span>
          </h2>
          <p className={styles.description}>
            Representative operational scenarios showing how connected agents can plan, use tools,
            complete work and involve people at the right moments.
          </p>
        </header>

        <div className={styles.tabsWrapper} role="tablist" aria-label="Use case categories">
          {useCases.map((uc, index) => (
            <button
              key={uc.id}
              className={`${styles.tab} ${index === 0 ? styles.tabActive : ""}`}
              role="tab"
              aria-selected={index === 0}
              aria-controls={`panel-${uc.id}`}
              id={`tab-${uc.id}`}
              style={{ "--tabColor": uc.color } as React.CSSProperties}
            >
              <span className={styles.tabIcon}>{uc.icon}</span>
              <span className={styles.tabLabel}>{uc.title}</span>
              <span className={styles.tabCategory}>{uc.category}</span>
            </button>
          ))}
        </div>

        <div className={styles.panelsWrapper}>
          {useCases.map((uc, index) => (
            <div
              key={uc.id}
              id={`panel-${uc.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${uc.id}`}
              className={`${styles.panel} ${index === 0 ? styles.panelActive : ""}`}
              aria-hidden={index !== 0}
              style={{ "--panelColor": uc.color } as React.CSSProperties}
            >
              <div className={styles.panelContent}>
                <div className={styles.panelHeader}>
                  <div className={styles.panelIcon} style={{ "--iconColor": uc.color } as React.CSSProperties}>
                    {uc.icon}
                  </div>
                  <div>
                    <h3 className={styles.panelTitle}>{uc.title}</h3>
                    <p className={styles.panelCategory}>{uc.category}</p>
                  </div>
                </div>

                <p className={styles.panelDescription}>{uc.description}</p>

                <div className={styles.panelSections}>
                  <div className={styles.section}>
                    <h4 className={styles.sectionTitle}>Operational Outcomes</h4>
                    <ul className={styles.outcomes}>
                      {uc.outcomes.map((outcome) => (
                        <li key={outcome} className={styles.outcomeItem}>
                          <span className={styles.outcomeDot} style={{ "--dotColor": uc.color } as React.CSSProperties} aria-hidden="true" />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.section}>
                    <h4 className={styles.sectionTitle}>Typical Connected Systems</h4>
                    <div className={styles.systems}>
                      {uc.systems.map((system) => (
                        <span key={system} className={styles.systemTag} style={{ "--tagColor": uc.color } as React.CSSProperties}>
                          {system}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className={styles.note}>
          These patterns compose. A support agent that escalates to sales. A finance agent that triggers procurement.
          The platform connects them.
        </p>
      </div>
    </section>
  );
}
