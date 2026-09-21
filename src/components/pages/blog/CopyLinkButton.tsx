"use client";

import { useState } from "react";

import styles from "./BlogArticlePage.module.css";

export function CopyLinkButton() {
  const [label, setLabel] = useState("Copy link");

  async function copyLink() {
    await navigator.clipboard.writeText(window.location.href);
    setLabel("Link copied");
    window.setTimeout(() => setLabel("Copy link"), 1800);
  }

  return (
    <button className={styles.copyLink} type="button" onClick={copyLink}>
      <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path
          d="M7.5 12.5 12.5 7.5M6.1 14.7l-1 .9a3.2 3.2 0 0 1-4.5-4.5l3-3a3.2 3.2 0 0 1 4.5 0M13.9 5.3l1-.9a3.2 3.2 0 1 1 4.5 4.5l-3 3a3.2 3.2 0 0 1-4.5 0"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      {label}
    </button>
  );
}
