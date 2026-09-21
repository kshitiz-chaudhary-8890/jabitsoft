import { HomepageClient } from "@/components/pages/home/HomepageClient";
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
      <HomepageClient />
    </>
  );
}
