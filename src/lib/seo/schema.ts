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
