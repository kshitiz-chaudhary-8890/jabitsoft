import { describe, expect, it } from "vitest";

import { buildAboutPageSchema, buildHomepageSchema, serializeJsonLd } from "./schema";

describe("serializeJsonLd", () => {
  it("escapes opening angle brackets to keep JSON-LD out of HTML parsing", () => {
    expect(serializeJsonLd({ name: "</script><script>alert(1)</script>" })).toBe(
      '{"name":"\\u003c/script>\\u003cscript>alert(1)\\u003c/script>"}',
    );
  });
});

describe("buildHomepageSchema", () => {
  it("connects the organization, website, webpage and service catalog", () => {
    const schema = buildHomepageSchema({
      name: "JabitSoft",
      legalName: "JabitSoft",
      siteUrl: "https://jabitsoft.com",
      logoUrl: "/logo.png",
      email: "hello@jabitsoft.com",
      description: "Custom software development services.",
      language: "en",
      services: ["Agentic AI Development", "Cloud Consulting"],
    });
    const serialized = serializeJsonLd(schema);

    expect(serialized).toContain('"@type":"Organization"');
    expect(serialized).toContain('"@type":"WebSite"');
    expect(serialized).toContain('"@type":"WebPage"');
    expect(serialized).toContain('"@type":"Service"');
    expect(serialized).toContain("https://jabitsoft.com/#organization");
  });
});

describe("buildAboutPageSchema", () => {
  it("connects the about page, organization, founder and breadcrumb trail", () => {
    const schema = buildAboutPageSchema({
      name: "JabitSoft",
      legalName: "JabitSoft Pvt. Ltd.",
      siteUrl: "https://jabitsoft.com",
      email: "hello@jabitsoft.com",
      description: "A software development company founded in 2007.",
      language: "en",
      founderName: "Baldeep Singh",
      founderImageUrl: "/images/baldeep-singh-founder.webp",
      foundingDate: "2007",
      services: ["Custom Software Development", "ERP Development"],
    });
    const serialized = serializeJsonLd(schema);

    expect(serialized).toContain('"@type":"AboutPage"');
    expect(serialized).toContain('"@type":"Person"');
    expect(serialized).toContain('"@type":"BreadcrumbList"');
    expect(serialized).toContain("Baldeep Singh");
    expect(serialized).toContain("https://jabitsoft.com/about-us#webpage");
  });
});
