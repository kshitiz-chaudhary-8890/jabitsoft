import type { Metadata } from "next";

import jabitFavicon from "@/assets/jabit-favicon.png";
import { company } from "@/data/company";

const ALLOWED_PROTOCOLS = new Set(["http:", "https:"]);

export function resolveSiteUrl(value = process.env.NEXT_PUBLIC_SITE_URL): URL {
  try {
    const url = new URL(value ?? company.siteUrl);

    return ALLOWED_PROTOCOLS.has(url.protocol) ? url : new URL(company.siteUrl);
  } catch {
    return new URL(company.siteUrl);
  }
}

export const rootMetadata: Metadata = {
  metadataBase: resolveSiteUrl(),
  applicationName: company.name,
  title: {
    default: company.title,
    template: `%s | ${company.name}`,
  },
  description: company.description,
  authors: [{ name: company.name, url: "/" }],
  creator: company.name,
  publisher: company.name,
  category: "technology",
  keywords: [
    "software development company",
    "custom software development",
    "agentic AI development",
    "cloud consulting",
    "mobile app development",
    "ERP development",
    "website development",
    "technical SEO",
  ],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [{ url: jabitFavicon.src, type: "image/png" }],
    shortcut: [{ url: jabitFavicon.src, type: "image/png" }],
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: company.locale,
    url: "/",
    siteName: company.name,
    title: company.title,
    description: company.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "JabitSoft software development company",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: company.title,
    description: company.description,
    images: [
      {
        url: "/opengraph-image",
        alt: "JabitSoft software development company",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};
