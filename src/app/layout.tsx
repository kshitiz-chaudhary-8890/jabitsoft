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
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var veil=null;function dropVeil(){if(veil&&veil.parentNode)veil.parentNode.removeChild(veil)}var nav=performance.getEntriesByType&&performance.getEntriesByType("navigation");var type=nav&&nav[0]?nav[0].type:"";if(type==="reload"||type==="navigate"){var s=Number(sessionStorage.getItem("jabit-scroll:"+location.pathname));var shouldRestore=Boolean(location.hash)||(Number.isFinite(s)&&s>0);if(shouldRestore){history.scrollRestoration="manual";veil=document.createElement("div");veil.id="jabit-restore-veil";veil.setAttribute("aria-hidden","true");veil.style.cssText="position:fixed;inset:0;background:#ffffff;z-index:2147483647;pointer-events:none";(document.body||document.documentElement).appendChild(veil);if(!location.hash&&s>0){var el=document.documentElement,prev=el.style.scrollBehavior;el.style.scrollBehavior="auto";window.scrollTo(0,s);el.style.scrollBehavior=prev}setTimeout(dropVeil,4000);}}}catch(e){}})();`,
          }}
        />
        <AppProviders>
          <Header />
          {children}
          <SiteFooter />
        </AppProviders>
      </body>
    </html>
  );
}
