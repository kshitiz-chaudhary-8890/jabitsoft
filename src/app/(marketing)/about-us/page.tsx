import type { Metadata } from "next";

import { CompanyLens } from "@/components/sections/about/CompanyLens/CompanyLens";
import { AboutHero } from "@/components/sections/about/AboutHero/AboutHero";
import page from "./about-us.module.css";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn how JabitSoft thinks about software, AI, engineering and the systems that help growing businesses operate and scale.",
  alternates: {
    canonical: "/about-us",
  },
};

export default function AboutUsPage() {
  return (
    <div className={page.aboutPage}>
      <main id="main-content">
        <AboutHero />
        <CompanyLens />
      </main>
    </div>
  );
}
