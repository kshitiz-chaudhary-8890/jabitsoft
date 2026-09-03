"use client";

// @ts-expect-error The approved Footer remains JavaScript during the parity migration.
import Footer from "@/components/Footer.jsx";

export function SiteFooter() {
  return <Footer />;
}
