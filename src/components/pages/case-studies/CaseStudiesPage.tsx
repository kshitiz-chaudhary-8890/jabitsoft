"use client";

import { useRef } from "react";

import { SharedCTA } from "@/components/common/SharedCTA/SharedCTA";
import { CaseStudiesHero } from "./CaseStudiesHero/CaseStudiesHero";
import styles from "./CaseStudiesPage.module.css";
import { CaseStudyList } from "./CaseStudyList/CaseStudyList";
import { useCaseStudiesMotion } from "./useCaseStudiesMotion";

export function CaseStudiesPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  useCaseStudiesMotion(rootRef);

  return (
    <div className={styles.page} ref={rootRef} data-case-studies-page>
      <CaseStudiesHero />
      <CaseStudyList />
      <SharedCTA
        headline="See one that looks like your project?"
        lede="Talk to the team that ships these systems — clear scope, senior engineers, support after launch."
        primaryLabel="Start a conversation"
        primaryHref="/contact-us"
        secondaryLabel="Explore our services"
        secondaryHref="/services"
        image="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop"
      />
    </div>
  );
}
