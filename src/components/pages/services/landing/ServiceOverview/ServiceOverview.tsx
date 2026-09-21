"use client";

import Link from "next/link";

import { serviceNavigation } from "@/data/navigation";

import { ServiceArrow } from "../ServiceArrow";
import { serviceDetails } from "../servicesContent";
import { useServiceReveal } from "../useServiceReveal";
import styles from "../ServicesBody/ServicesBody.module.css";

export function ServiceOverview() {
  const ref = useServiceReveal<HTMLElement>();

  return (
    <section ref={ref} id="what-we-build" className={`${styles.body} ${styles.services}`} aria-labelledby="services-index-title">
      <div className={styles.shell}>
        <header className={styles.sectionHeader} data-reveal-group>
          <p className={styles.kicker} data-reveal>What we do</p>
          <h2 id="services-index-title" data-reveal><span className="section-heading-fill">Six disciplines.<br />One delivery team.</span></h2>
          <p className={styles.intro} data-reveal>
            Choose a focused engagement or bring us a problem that crosses boundaries. We connect the
            product, engineering and growth decisions needed to move it forward.
          </p>
        </header>

        <div className={styles.serviceIndex} data-reveal-group>
          {serviceDetails.map((service, index) => (
            <Link className={styles.serviceRow} href={serviceNavigation[index].href} key={service.label} data-reveal>
              <span className={styles.serviceNumber}>{String(index + 1).padStart(2, "0")}</span>
              <span className={styles.serviceIdentity}>
                <span className={styles.serviceCode}>{service.code}</span>
                <strong>{service.label}</strong>
              </span>
              <span className={styles.serviceOutcome}>{service.outcome}</span>
              <span className={styles.serviceCapabilities}>
                {service.capabilities.map((capability) => <span key={capability}>{capability}</span>)}
              </span>
              <span className={styles.serviceArrow}><ServiceArrow /></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
