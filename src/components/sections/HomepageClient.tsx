"use client";

// @ts-expect-error The approved Vite source intentionally remains JavaScript and runnable.
import LegacyHomepage from "@/App.jsx";

export function HomepageClient() {
  return <LegacyHomepage renderHeader={false} renderFooter={false} />;
}
