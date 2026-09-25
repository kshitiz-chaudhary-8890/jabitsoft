import { SharedCTA } from "@/components/common/SharedCTA/SharedCTA";

import type { IndustryDetailData } from "./types";
import { IndustryHero } from "./sections/IndustryHero";
import { IndustryLandscape } from "./sections/IndustryLandscape";
import { IndustryChallenges } from "./sections/IndustryChallenges";
import { HowWeHelp } from "./sections/HowWeHelp";
import { UseCases } from "./sections/UseCases";
import { BusinessImpact } from "./sections/BusinessImpact";
import { IndustryAdditions } from "./sections/IndustryAdditions";

export function IndustryDetailPage({ data }: { data: IndustryDetailData }) {
  return (
    <main id="main-content">
      <IndustryHero data={data} />
      <IndustryAdditions data={data} placement="early" />
      <IndustryLandscape data={data} />
      <IndustryChallenges data={data} />
      <HowWeHelp data={data} />
      <UseCases data={data} />
      <IndustryAdditions data={data} placement="beforeImpact" />
      <BusinessImpact data={data} />
      <IndustryAdditions data={data} placement="late" />
      <SharedCTA
        headline={data.cta.title}
        lede={data.cta.text}
        primaryLabel={data.cta.button}
        primaryHref="/contact-us"
        secondaryLabel={data.cta.secondaryButton}
        secondaryHref="/contact-us"
        image="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1600&auto=format&fit=crop"
      />
    </main>
  );
}
