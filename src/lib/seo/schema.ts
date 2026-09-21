export type JsonLdPrimitive = boolean | number | string | null;

export type JsonLdValue = JsonLdPrimitive | JsonLdValue[] | { [key: string]: JsonLdValue };

export function serializeJsonLd(value: JsonLdValue): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

interface HomepageSchemaInput {
  description: string;
  email: string;
  language: string;
  legalName: string;
  logoUrl: string;
  name: string;
  services: readonly string[];
  siteUrl: string;
}

interface AboutPageSchemaInput {
  description: string;
  email: string;
  founderImageUrl: string;
  founderName: string;
  foundingDate: string;
  language: string;
  legalName: string;
  name: string;
  services: readonly string[];
  siteUrl: string;
}

export function buildHomepageSchema({
  description,
  email,
  language,
  legalName,
  logoUrl,
  name,
  services,
  siteUrl,
}: HomepageSchemaInput): JsonLdValue {
  const origin = new URL(siteUrl).origin;
  const homepage = `${origin}/`;
  const organizationId = `${homepage}#organization`;
  const websiteId = `${homepage}#website`;
  const webpageId = `${homepage}#webpage`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name,
        legalName,
        url: homepage,
        logo: new URL(logoUrl, homepage).href,
        email,
        description,
        areaServed: "Worldwide",
        knowsAbout: [...services],
        contactPoint: {
          "@type": "ContactPoint",
          email,
          contactType: "sales",
          availableLanguage: ["English"],
        },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: homepage,
        name,
        description,
        inLanguage: language,
        publisher: { "@id": organizationId },
      },
      {
        "@type": "WebPage",
        "@id": webpageId,
        url: homepage,
        name: `${name} software development services`,
        description,
        inLanguage: language,
        isPartOf: { "@id": websiteId },
        about: { "@id": organizationId },
        mainEntity: { "@id": organizationId },
      },
      {
        "@type": "ItemList",
        "@id": `${homepage}#services`,
        name: `${name} software development services`,
        itemListElement: services.map((service, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Service",
            name: service,
            provider: { "@id": organizationId },
            areaServed: "Worldwide",
          },
        })),
      },
    ],
  };
}

export function buildAboutPageSchema({
  description,
  email,
  founderImageUrl,
  founderName,
  foundingDate,
  language,
  legalName,
  name,
  services,
  siteUrl,
}: AboutPageSchemaInput): JsonLdValue {
  const homepage = `${new URL(siteUrl).origin}/`;
  const aboutUrl = new URL("about-us", homepage).href;
  const organizationId = `${homepage}#organization`;
  const websiteId = `${homepage}#website`;
  const founderId = `${aboutUrl}#founder`;
  const webpageId = `${aboutUrl}#webpage`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name,
        legalName,
        url: homepage,
        email,
        description,
        foundingDate,
        founder: { "@id": founderId },
        areaServed: "Worldwide",
        knowsAbout: [...services],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Noida",
          addressCountry: "IN",
        },
      },
      {
        "@type": "Person",
        "@id": founderId,
        name: founderName,
        jobTitle: "Founder and CEO",
        image: new URL(founderImageUrl, homepage).href,
        worksFor: { "@id": organizationId },
      },
      {
        "@type": "AboutPage",
        "@id": webpageId,
        url: aboutUrl,
        name: `About ${name}`,
        description,
        inLanguage: language,
        isPartOf: { "@id": websiteId },
        about: { "@id": organizationId },
        mainEntity: { "@id": organizationId },
        breadcrumb: { "@id": `${aboutUrl}#breadcrumb` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${aboutUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: homepage,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "About JabitSoft",
            item: aboutUrl,
          },
        ],
      },
    ],
  };
}
