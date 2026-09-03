import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Header } from "@/components/layout/Header/Header";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { AppProviders } from "@/components/providers/AppProviders";
import { rootMetadata } from "@/lib/seo/metadata";

import { caveat, dmSans, inter, plusJakartaSans } from "./fonts";
import "./globals.css";

export const metadata: Metadata = rootMetadata;

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const fontVariables = [
    inter.variable,
    dmSans.variable,
    plusJakartaSans.variable,
    caveat.variable,
  ].join(" ");

  return (
    <html lang="en" className={fontVariables}>
      <body>
        <AppProviders>
          <Header />
          {children}
          <SiteFooter />
        </AppProviders>
      </body>
    </html>
  );
}
