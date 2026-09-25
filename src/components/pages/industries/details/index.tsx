import type { IndustryDetailData } from "./types";
import { IndustryDetailPage } from "./IndustryDetailPage";
import { saasPlatformsContent } from "./saas-platforms/content";
import { healthcareContent } from "./healthcare/content";
import { fintechContent } from "./fintech/content";
import { retailContent } from "./retail/content";
import { manufacturingContent } from "./manufacturing/content";
import { automationContent } from "./automation/content";
import { logisticsContent } from "./logistics/content";
import { governmentContent } from "./government/content";

export type IndustryPage = {
  data: IndustryDetailData;
};

export const industryPages: Record<string, IndustryPage> = {
  "saas-platforms": { data: saasPlatformsContent },
  healthcare: { data: healthcareContent },
  fintech: { data: fintechContent },
  retail: { data: retailContent },
  manufacturing: { data: manufacturingContent },
  automation: { data: automationContent },
  logistics: { data: logisticsContent },
  government: { data: governmentContent },
};

export { IndustryDetailPage };

export function getIndustryPage(slug: string): IndustryPage | null {
  return industryPages[slug] ?? null;
}
