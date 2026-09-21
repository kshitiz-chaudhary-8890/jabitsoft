import Link from "next/link";

import styles from "../CaseStudiesPage.module.css";

export function CaseStudiesCTA() {
  return (
    <section className={styles.cta} aria-labelledby="case-studies-cta-title">
      <div className={styles.shell}>
        <div className={styles.ctaInner}>
          <h2 id="case-studies-cta-title" data-cs-reveal>
            <span className="section-heading-fill">
              See one that looks like your project? Two ways from here.
            </span>
          </h2>
          <p data-cs-reveal>
            Talk to the team that ships these systems, or explore our services first. No
            pressure—just a practical conversation.
          </p>
          <div className={styles.ctaActions} data-cs-reveal>
            <Link className={styles.ctaPrimary} href="/#contact" data-site-button data-button-variant="primary">
              Start a conversation
            </Link>
            <Link className={styles.ctaSecondary} href="/services" data-site-button data-button-variant="secondary">
              Explore our services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
