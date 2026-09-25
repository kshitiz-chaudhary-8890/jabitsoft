import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Header } from "@/components/layout/Header/Header";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ScrollRestore } from "@/components/common/ScrollRestore";
import { AppProviders } from "@/components/providers/AppProviders";
import { rootMetadata } from "@/lib/seo/metadata";

import { anton, inter, oswald, plusJakartaSans } from "./fonts";
import "./globals.css";

export const metadata: Metadata = rootMetadata;

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const fontVariables = [inter.variable, plusJakartaSans.variable, anton.variable, oswald.variable].join(
    " ",
  );

  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var k="jabit-loader-seen",d=new Date(),t=d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");if(localStorage.getItem(k)===t||document.cookie.split(";").some(function(c){return c.trim()===k+"="+t})){document.documentElement.classList.add("jl-seen")}}catch(e){}`,
          }}
        />
        <AppProviders>
          <ScrollRestore />
          <Header />
          {children}
          <SiteFooter />
        </AppProviders>
      </body>
    </html>
  );
}
