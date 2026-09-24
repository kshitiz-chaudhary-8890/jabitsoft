export type IndustryChallenge = { title: string; text: string };

export type IndustryHelpItem = { title: string; text: string; tags?: string[] };

export type IndustryUseCase = { title: string; text: string; points?: string[] };

export type IndustryImpactDimension = { name: string; before: string; text: string; tag?: string };

export type IndustryDetailData = {
  label: string;
  slug: string;
  kicker: string;
  hero: {
    headline: string;
    lede: string;
    primaryCta: string;
    stats: { value: string; label: string }[];
    ticker: string[];
  };
  landscape: {
    title: string;
    intro: string;
    forces: { title: string; text: string }[];
    opportunities: { title: string; text: string }[];
  };
  challenges: {
    title: string;
    intro: string;
    items: IndustryChallenge[];
  };
  howWeHelp: {
    title: string;
    intro: string;
    items: IndustryHelpItem[];
  };
  useCases: {
    title: string;
    intro: string;
    items: IndustryUseCase[];
  };
  businessImpact: {
    title: string;
    intro: string;
    dimensions: IndustryImpactDimension[];
  };
  cta: {
    title: string;
    text: string;
    button: string;
    secondaryButton: string;
  };
};
