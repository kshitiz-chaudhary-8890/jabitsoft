"use client";

import { FormEvent, useState } from "react";

import styles from "./ContactForm.module.css";

const services = [
  "Agentic AI Development",
  "Cloud Consulting",
  "Mobile Application Development",
  "ERP Services",
  "SEO / Digital Marketing",
  "Website Solutions",
] as const;

export function ContactForm() {
  const [status, setStatus] = useState("");

  function submitBrief(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    if (data.get("website")) return;

    const subject = String(data.get("subject"));
    const body = [
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Contact number: ${data.get("phone") || "Not provided"}`,
      `Service: ${data.get("service")}`,
      "",
      String(data.get("message")),
    ].join("\n");

    setStatus("Your email app is opening with the brief ready to send.");
    window.location.href = `mailto:info@jabitsoft.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form className={styles.form} onSubmit={submitBrief}>
      <div className={styles.fieldGrid}>
        <Field
          label="Name"
          name="name"
          autoComplete="name"
          placeholder="First and last name"
          required
        />
        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          required
        />
        <Field
          label="Subject"
          name="subject"
          placeholder="What would you like to build?"
          required
        />
        <Field
          label="Contact number"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="Country code and number"
        />
      </div>

      <label className={styles.field}>
        <span>Service you are looking for *</span>
        <select name="service" defaultValue="" required>
          <option value="" disabled>
            Select a service
          </option>
          {services.map((service) => (
            <option key={service}>{service}</option>
          ))}
        </select>
      </label>

      <label className={`${styles.field} ${styles.message}`}>
        <span>Message *</span>
        <textarea
          name="message"
          rows={6}
          minLength={20}
          placeholder="Tell us about the problem, users, current setup and the outcome you need."
          required
        />
      </label>

      <label className={styles.honeypot} aria-hidden="true">
        Website
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>

      <div className={styles.submitRow}>
        <button type="submit" data-site-button data-button-variant="primary">
          Send project brief
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M4 10h11M11 6l4 4-4 4" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </button>
        <p>By sending this brief, you agree that JabitSoft may contact you about this enquiry.</p>
      </div>
      <p className={styles.status} role="status" aria-live="polite">
        {status}
      </p>
    </form>
  );
}

interface FieldProps {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  placeholder: string;
  required?: boolean;
}

function Field({ label, name, type = "text", autoComplete, placeholder, required }: FieldProps) {
  return (
    <label className={styles.field}>
      <span>
        {label}
        {required ? " *" : ""}
      </span>
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        required={required}
      />
    </label>
  );
}
