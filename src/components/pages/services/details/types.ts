export type ServiceUseCase = { title: string; text: string };

export type ServiceCapability = { title: string; text: string };

export type ServiceProcessStep = { title: string; text: string; output: string };

export type ServiceTechnologyGroup = { label: string; items: string[] };

export type ServiceReadinessItem = { marker: string; title: string; text: string };

export type ServiceOwnershipItem = { artifact: string; title: string; text: string };

export type ServiceFAQ = { question: string; answer: string };

export type ServiceDetailData = {
  label: string;
  slug: string;
  eyebrow: string;
  headline: string;
  lede: string;
  primaryCta: string;
  proof: { value: string; label: string }[];
  problem: { title: string; intro: string; items: { title: string; text: string }[] };
  capabilities: { title: string; intro: string; items: ServiceCapability[] };
  useCases: { title: string; intro: string; items: ServiceUseCase[] };
  process: { title: string; intro: string; steps: ServiceProcessStep[] };
  technology: { title: string; intro: string; groups: ServiceTechnologyGroup[] };
  readiness: {
    title: string;
    intro: string;
    systemLabel: string;
    items: ServiceReadinessItem[];
  };
  ownership: { title: string; intro: string; items: ServiceOwnershipItem[] };
  faqs: ServiceFAQ[];
  cta: { title: string; text: string; button: string };
};
