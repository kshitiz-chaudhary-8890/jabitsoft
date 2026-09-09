"use client";

// @ts-expect-error The approved Footer remains JavaScript during the parity migration.
import Footer from "@/components/layout/Footer/Footer";

export function SiteFooter() {
  return <Footer />;
}
