"use client";

import { useRef } from "react";

import { CaseStudiesCTA } from "./CaseStudiesCTA/CaseStudiesCTA";
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
      <CaseStudiesCTA />
    </div>
  );
}
