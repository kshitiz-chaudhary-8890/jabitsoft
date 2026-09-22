import type { Metadata } from "next";

import { company } from "@/data/company";
import { buildAboutPageSchema, serializeJsonLd } from "@/lib/seo/schema";
import { AboutHero } from "@/components/pages/about/AboutHero/AboutHero";
import { CompanyLens } from "@/components/pages/about/CompanyLens/CompanyLens";
import { OurStory } from "@/components/pages/about/OurStory/OurStory";
import { Leadership } from "@/components/pages/about/Leadership/Leadership";
import { OurTeam } from "@/components/pages/about/OurTeam/OurTeam";
import { TeamShowcase } from "@/components/pages/about/TeamShowcase/TeamShowcase";
import { OfficeGallery } from "@/components/pages/about/OfficeGallery/OfficeGallery";
import { Culture } from "@/components/pages/about/Culture/Culture";
import { AboutCTA } from "@/components/pages/about/AboutCTA/AboutCTA";
import page from "./about-us.module.css";

const title = "About JabitSoft | Software Development Company Since 2007";
const description =
  "Meet JabitSoft, a Noida software development company founded in 2007. Explore our leadership, engineering approach, values and long-term delivery model.";

export const metadata: Metadata = {
  title: {
    absolute: title,
  },
  description,
  keywords: [
    "about JabitSoft",
    "software development company Noida",
    "custom software development company",
    "ERP development company",
    "web and mobile app development",
    "AI and cloud development company",
  ],
  alternates: {
    canonical: "/about-us",
  },
  openGraph: {
    title,
    description,
    type: "website",
    url: "/about-us",
    siteName: company.name,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "About JabitSoft software development company",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/opengraph-image"],
  },
};

export default function AboutUsPage() {
  const schema = buildAboutPageSchema({
    ...company,
    legalName: "JabitSoft Pvt. Ltd.",
    description,
    founderName: "Baldeep Singh",
    founderImageUrl: "/images/baldeep-singh-founder.webp",
    foundingDate: "2007",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }}
      />
      <div className={page.aboutPage} data-about-page>
        <main id="main-content">
          <AboutHero />
          <OurStory />
          <Leadership />
          <OurTeam />
          <TeamShowcase />
          <CompanyLens />
          <OfficeGallery />
          <Culture />
          <AboutCTA />
        </main>
      </div>
    </>
  );
}
