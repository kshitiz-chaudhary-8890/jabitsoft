import type { Metadata } from "next";

import { ServiceHero } from "@/components/pages/services/landing/ServiceHero/ServiceHero";
import { ServiceOverview } from "@/components/pages/services/landing/ServiceOverview/ServiceOverview";
import { ProblemMap } from "@/components/pages/services/landing/ProblemMap/ProblemMap";
import { DeliveryProcess } from "@/components/pages/services/landing/DeliveryProcess/DeliveryProcess";
import { WhyJabit } from "@/components/pages/services/landing/WhyJabit/WhyJabit";
import { CapabilityStack } from "@/components/pages/services/landing/CapabilityStack/CapabilityStack";
import { ServicesFAQ } from "@/components/pages/services/landing/ServicesFAQ/ServicesFAQ";
import { SharedCTA } from "@/components/common/SharedCTA/SharedCTA";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Software Development Services",
  description:
    "Explore JabitSoft services across custom software, agentic AI, cloud, mobile applications, ERP systems, websites and digital growth.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Software Development Services | JabitSoft",
    description:
      "Custom software, agentic AI, cloud, mobile, ERP, website and digital growth services from JabitSoft.",
    type: "website",
  },
};

export default function ServicesPage() {
  return (
    <div className={styles.servicesPage}>
      <main id="main-content">
        <ServiceHero />
        <ServiceOverview />
        <ProblemMap />
        <DeliveryProcess />
        <WhyJabit />
        <CapabilityStack />
        <ServicesFAQ />
      </main>
      <SharedCTA
        headline="Need software that holds up?"
        lede="From first scope to after-launch support — one senior team across web, mobile, cloud, AI and ERP."
        primaryLabel="Start a conversation"
        primaryHref="/contact-us"
        secondaryLabel="See our work"
        secondaryHref="/case-studies"
        image="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop"
      />
    </div>
  );
}
