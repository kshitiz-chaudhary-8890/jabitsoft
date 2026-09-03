import type { MetadataRoute } from "next";

import { resolveSiteUrl } from "@/lib/seo/metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = resolveSiteUrl();

  return [
    {
      url: siteUrl.href,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
