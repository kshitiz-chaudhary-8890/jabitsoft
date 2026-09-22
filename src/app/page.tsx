import { HomepageClient } from "@/components/pages/home/HomepageClient";
import { SharedCTA } from "@/components/common/SharedCTA/SharedCTA";
import { SiteLoader } from "@/components/common/SiteLoader/SiteLoader";
import jabitLogo from "@/assets/jabit-logo.png";
import { company } from "@/data/company";
import { buildHomepageSchema, serializeJsonLd } from "@/lib/seo/schema";

export default function HomePage() {
  const schema = buildHomepageSchema({ ...company, logoUrl: jabitLogo.src });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
      />
      <SiteLoader />
      <HomepageClient />
      <SharedCTA
        headline="Have something worth building well?"
        lede="Tell us what needs to work better — we'll reply in one business day with clear next steps."
        primaryLabel="Start a conversation"
        primaryHref="/contact-us"
        secondaryLabel="See our work"
        secondaryHref="/case-studies"
        image="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop"
      />
    </>
  );
}
