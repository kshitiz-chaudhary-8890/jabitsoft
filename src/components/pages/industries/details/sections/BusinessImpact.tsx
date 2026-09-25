"use client";

import { useRef } from "react";
import {
  BellRing, Blocks, CalendarDays, ChartNoAxesCombined, ClipboardCheck,
  CreditCard, LayoutDashboard, Link2, MapPinned, PackageCheck, Radar,
  Rocket, Route, Search, Truck, UsersRound, Workflow, type LucideIcon,
} from "lucide-react";

import { useIndustryReveal } from "../useIndustryReveal";
import type { IndustryDetailData } from "../types";
import styles from "./BusinessImpact.module.css";

const impactIcons: Record<string, LucideIcon> = {
  Intake: ClipboardCheck, Scheduling: CalendarDays, Operations: LayoutDashboard,
  "Follow-up": BellRing, Search, Inventory: Blocks, Orders: PackageCheck,
  Channels: Link2, Automation: Workflow, Data: ChartNoAxesCombined,
  Visibility: Radar, Alerts: BellRing, Workflows: Workflow,
  Integrations: Link2, Dispatch: Route, Tracking: MapPinned,
  Drivers: Truck, Exceptions: BellRing, Delivery: Rocket,
  Scale: Blocks, Experience: UsersRound, Insight: ChartNoAxesCombined,
  Billing: CreditCard,
};

export function BusinessImpact({ data }: { data: IndustryDetailData }) {
  const ref = useRef<HTMLElement>(null);
  useIndustryReveal(ref);
  const { businessImpact } = data;

  return (
    <section ref={ref} className={styles.section} aria-labelledby="industry-impact-title">
      <div className={styles.shell}>
        <div className={styles.head}>
          <p data-ind-intro className={styles.eyebrow}>
            Business Impact
          </p>
          <h2 data-ind-intro id="industry-impact-title" className={styles.title}>
            <span className="section-heading-fill">{businessImpact.title}</span>
          </h2>
          <p data-ind-intro className={styles.intro}>
            {businessImpact.intro}
          </p>
        </div>

        <div className={styles.wall}>
          {businessImpact.dimensions.map((dimension, index) => {
            const Icon = impactIcons[dimension.tag ?? ""] ?? ChartNoAxesCombined;
            return (
              <article data-ind-item key={dimension.name} className={styles.line}>
                <span data-ind-rule className={styles.rule} aria-hidden="true" />
                <span className={styles.ghost} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className={styles.content}>
                  {dimension.tag ? <p className={styles.tag}>{dimension.tag}</p> : null}
                  <h3>{dimension.name}</h3>
                  <p className={styles.outcome}>{dimension.text}</p>
                </div>
                <span className={styles.icon} aria-hidden="true">
                  <Icon size={22} strokeWidth={1.75} />
                </span>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
