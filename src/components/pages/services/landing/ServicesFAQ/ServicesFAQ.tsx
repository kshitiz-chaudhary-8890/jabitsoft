"use client";

import { useState } from "react";

import { faqs } from "../servicesContent";
import { useServiceReveal } from "../useServiceReveal";
import styles from "../ServicesBody/ServicesBody.module.css";

export function ServicesFAQ() {
  const ref = useServiceReveal<HTMLElement>();
  const [openIndex, setOpenIndex] = useState<number | null>(1);

  return (
    <section ref={ref} className={`${styles.body} ${styles.faq}`} aria-labelledby="faq-title">
      <div className={styles.faqShell}>
        <div className={styles.faqHeading} data-reveal-group>
          <p className={styles.faqEyebrow} data-reveal>(JabitSoft Services FAQs)</p>
          <h2 id="faq-title" data-reveal><span className="section-heading-fill">Useful Answers Before We Talk</span></h2>
          <p className={styles.faqSubhead} data-reveal>
            A few practical details about how we scope, deliver and support software work.
          </p>
        </div>
        <div className={styles.faqList} data-reveal-group>
          {faqs.map(([question, answer], index) => {
            const open = openIndex === index;
            return (
              <article className={`${styles.faqItem}${open ? ` ${styles.faqItemOpen}` : ""}`} key={question} data-reveal>
                <button
                  type="button"
                  className={styles.faqQuestion}
                  aria-expanded={open}
                  aria-controls={`services-faq-answer-${index}`}
                  onClick={() => setOpenIndex((current) => current === index ? null : index)}
                >
                  <span className={styles.faqNumber}>{index + 1}</span>
                  <span className={styles.faqQuestionText}>{question}</span>
                  <span className={`${styles.faqToggle}${open ? ` ${styles.faqToggleOpen}` : ""}`} aria-hidden="true">
                    <i /><i />
                  </span>
                </button>
                <div id={`services-faq-answer-${index}`} className={styles.faqAnswer} aria-hidden={!open}>
                  <div><p>{answer}</p></div>
                </div>
              </article>
            );
          })}
        </div>
        <p className={styles.faqFooter}>Have another question? <a href="mailto:hello@jabitsoft.com">hello@jabitsoft.com</a></p>
      </div>
    </section>
  );
}
