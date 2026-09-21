import type { ServiceDetailData } from "./types";
import { agenticAIContent } from "./agentic-ai-development/content";
import { cloudConsultingContent } from "./cloud-consulting/content";
import { erpServicesContent } from "./erp-services/content";
import { mobileApplicationDevelopmentContent } from "./mobile-application-development/content";
import { seoDigitalMarketingContent } from "./seo-digital-marketing/content";
import { ServiceDetailPage } from "./ServiceDetailPage";
import { websiteSolutionsContent } from "./website-solutions/content";

export type ServicePage = {
  data: ServiceDetailData;
};

export const servicePages: Record<string, ServicePage> = {
  "agentic-ai-development": { data: agenticAIContent },
  "cloud-consulting": { data: cloudConsultingContent },
  "mobile-application-development": { data: mobileApplicationDevelopmentContent },
  "erp-services": { data: erpServicesContent },
  "seo-digital-marketing": { data: seoDigitalMarketingContent },
  "website-solutions": { data: websiteSolutionsContent },
};

export { ServiceDetailPage };

export function getServicePage(slug: string): ServicePage | null {
  return servicePages[slug] ?? null;
}
