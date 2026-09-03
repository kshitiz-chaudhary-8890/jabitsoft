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
  title: {
    default: company.title,
    template: `%s | ${company.name}`,
  },
  description: company.description,
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
  },
  twitter: {
    card: "summary_large_image",
    title: company.title,
    description: company.description,
  },
};
