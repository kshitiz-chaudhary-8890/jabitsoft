export type CaseStudy = {
  slug: string;
  name: string;
  category: string;
  location: string;
  summary: string;
  outcome: string;
  image: string;
  imageAlt: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "flowops",
    name: "FlowOps",
    category: "Operations platform",
    location: "Global",
    summary:
      "A real-time operations platform designed to bring dispatch, capacity, tracking and reporting into one calm workspace.",
    outcome:
      "Faster decisions across distributed teams, with fewer hand-offs and a foundation ready for automation.",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1400&q=88",
    imageAlt: "Product team collaborating around a digital operations workspace",
  },
  {
    slug: "nexa-ai",
    name: "Nexa AI",
    category: "Agentic AI",
    location: "United States",
    summary:
      "An AI operations workspace connecting business data, internal tools and approval workflows while keeping people in control.",
    outcome:
      "Traceable automation moved repetitive reporting from a manual queue into a review-ready workflow.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1400&q=88",
    imageAlt: "Abstract artificial intelligence system visualization",
  },
  {
    slug: "core-erp",
    name: "CoreERP",
    category: "Business systems",
    location: "India",
    summary:
      "A modular ERP connecting finance, inventory, people and reporting across a growing multi-location business.",
    outcome:
      "One reliable operational view replaced disconnected spreadsheets and recurring manual reconciliation.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=88",
    imageAlt: "Business intelligence dashboard with operational analytics",
  },
];
