import type { Metadata } from "next";

import { ServiceHero } from "@/components/pages/services/landing/ServiceHero/ServiceHero";
import { ServiceOverview } from "@/components/pages/services/landing/ServiceOverview/ServiceOverview";
import { ProblemMap } from "@/components/pages/services/landing/ProblemMap/ProblemMap";
import { DeliveryProcess } from "@/components/pages/services/landing/DeliveryProcess/DeliveryProcess";
import { WhyJabit } from "@/components/pages/services/landing/WhyJabit/WhyJabit";
import { CapabilityStack } from "@/components/pages/services/landing/CapabilityStack/CapabilityStack";
import { ServicesFAQ } from "@/components/pages/services/landing/ServicesFAQ/ServicesFAQ";
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
    </div>
  );
}
