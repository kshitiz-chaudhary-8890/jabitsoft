import type { Metadata } from "next";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa6";
import { SiBehance, SiInstagram, SiX } from "react-icons/si";

import { ContactForm } from "@/components/pages/contact/ContactForm";
import { ContactHero } from "@/components/pages/contact/ContactHero/ContactHero";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact JabitSoft about software development, AI, cloud, mobile, ERP, website and digital marketing projects.",
  alternates: { canonical: "/contact-us" },
  openGraph: {
    title: "Contact JabitSoft",
    description: "Share the product idea or business system challenge you want to solve.",
    type: "website",
    url: "/contact-us",
  },
};

export default function ContactUsPage() {
  return (
    <main id="main-content" className={styles.page}>
      <ContactHero />

      <section className={styles.briefSection} aria-labelledby="brief-title">
        <div className={styles.briefShell}>
          <header className={styles.briefHeader}>
            <div>
              <p className={styles.kicker}>Project brief</p>
              <h2 id="brief-title">Start with what you know.</h2>
            </div>
            <p>
              No polished specification needed. A few useful details are enough for a productive
              first conversation.
            </p>
          </header>
          <ContactForm />
        </div>
      </section>

      <section className={styles.contactDetails} aria-labelledby="details-title">
        <div className={styles.detailsIntro}>
          <p className={styles.kicker}>Reach us directly</p>
          <h2 id="details-title">Two offices. One delivery team.</h2>
          <p>Monday to Friday, 9:00 am–6:00 pm. Saturday and Sunday closed.</p>
          <div className={styles.socials} aria-label="JabitSoft social links">
            <a
              href="https://www.facebook.com/jabitsoft"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF aria-hidden="true" />
            </a>
            <a href="https://twitter.com/jabitsoft" target="_blank" rel="noreferrer" aria-label="X">
              <SiX aria-hidden="true" />
            </a>
            <a
              href="https://www.instagram.com/jabitsoftofficial/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <SiInstagram aria-hidden="true" />
            </a>
            <a
              href="https://in.linkedin.com/company/jabit-soft"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn aria-hidden="true" />
            </a>
            <a
              href="https://www.behance.net/jabitsoft"
              target="_blank"
              rel="noreferrer"
              aria-label="Behance"
            >
              <SiBehance aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className={styles.detailsList}>
          <a href="mailto:info@jabitsoft.com">
            <span>Email</span>
            <strong>info@jabitsoft.com</strong>
            <Arrow />
          </a>
          <a href="tel:+919091006600">
            <span>Phone</span>
            <strong>+91 9091006600</strong>
            <Arrow />
          </a>
          <a href="https://maps.app.goo.gl/HToXh1CiDk6EMyNe9" target="_blank" rel="noreferrer">
            <span>Head office</span>
            <strong>
              Tower A, Stellar IT Park, Office 3, 6th Floor, Sector 62, Noida, Uttar Pradesh 201309
            </strong>
            <Arrow />
          </a>
          <a href="https://maps.app.goo.gl/dEU7yQS3yqio5n8i6" target="_blank" rel="noreferrer">
            <span>Branch office</span>
            <strong>
              Office 514, 5th Floor, Jyoti Shikhar Building, District Centre, Janakpuri, New Delhi
              110058
            </strong>
            <Arrow />
          </a>
        </div>
      </section>
    </main>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 16 16 4M7 4h9v9" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
