import type { MetadataRoute } from "next";

import { resolveSiteUrl } from "@/lib/seo/metadata";
import { serviceNavigation } from "@/data/navigation";
import { blogArticles } from "@/data/blog";
import { caseStudyDetails } from "@/components/pages/case-studies/detailData";
import { industryPages } from "@/components/pages/industries/details";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = resolveSiteUrl();

  return [
    {
      url: siteUrl.href,
    },
    {
      url: new URL("about-us", siteUrl).href,
    },
    {
      url: new URL("services", siteUrl).href,
    },
    {
      url: new URL("case-studies", siteUrl).href,
    },
    {
      url: new URL("blogs", siteUrl).href,
    },
    {
      url: new URL("contact-us", siteUrl).href,
    },
    ...caseStudyDetails.map((study) => ({
      url: new URL(`case-studies/${study.slug}`, siteUrl).href,
    })),
    ...blogArticles.map((article) => ({
      url: new URL(`blogs/${article.slug}`, siteUrl).href,
    })),
    ...serviceNavigation.map((service) => ({
      url: new URL(service.href.replace(/^\//, ""), siteUrl).href,
    })),
    ...Object.keys(industryPages).map((slug) => ({
      url: new URL(`industries/${slug}`, siteUrl).href,
    })),
  ];
}
