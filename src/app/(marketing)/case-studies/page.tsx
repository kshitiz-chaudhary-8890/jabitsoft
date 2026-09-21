import type { Metadata } from "next";

import { CaseStudiesPage } from "@/components/pages/case-studies/CaseStudiesPage";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Explore software, AI, cloud and business platform projects designed and delivered by JabitSoft.",
  alternates: {
    canonical: "/case-studies",
  },
  openGraph: {
    title: "Case Studies | JabitSoft",
    description:
      "Real software projects, the problems behind them and the measurable progress they created.",
    type: "website",
  },
};

export default function Page() {
  return (
    <main id="main-content">
      <CaseStudiesPage />
    </main>
  );
}
