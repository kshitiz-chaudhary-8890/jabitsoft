export const blogCategories = [
  "All",
  "App Development",
  "Cloud Consulting",
  "Digital Marketing",
  "ERP",
  "Software Development",
  "Technology",
  "Web Development",
] as const;

export type BlogCategory = (typeof blogCategories)[number];

export type BlogArticle = {
  slug: string;
  title: string;
  excerpt: string;
  category: Exclude<BlogCategory, "All">;
  date: string;
  readTime: string;
  code: string;
  tone: "blue" | "ink" | "sky" | "violet" | "mint" | "orange" | "slate";
};

const blogImages: Record<BlogArticle["tone"], string> = {
  blue: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1400&q=88",
  ink: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=88",
  sky: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1400&q=88",
  violet:
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=88",
  mint: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1400&q=88",
  orange:
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=88",
  slate:
    "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1400&q=88",
};

export const blogArticles: BlogArticle[] = [
  {
    slug: "native-or-cross-platform-app",
    title: "Native or cross-platform? A practical decision framework for your next app",
    excerpt:
      "Compare performance, delivery speed, team skills and long-term maintenance before choosing your mobile stack.",
    category: "App Development",
    date: "18 Sep 2026",
    readTime: "8 min read",
    code: "APP / 01",
    tone: "blue",
  },
  {
    slug: "cloud-cost-review",
    title: "What a useful cloud cost review should uncover in the first two weeks",
    excerpt:
      "A focused audit can surface idle resources, fragile architecture and the decisions that make future bills unpredictable.",
    category: "Cloud Consulting",
    date: "15 Sep 2026",
    readTime: "7 min read",
    code: "CLD / 02",
    tone: "sky",
  },
  {
    slug: "erp-modernisation-without-disruption",
    title: "How to modernise an ERP without bringing daily operations to a halt",
    excerpt:
      "A phased approach to data, integrations and user adoption that keeps the business moving while the system changes.",
    category: "ERP",
    date: "11 Sep 2026",
    readTime: "10 min read",
    code: "ERP / 03",
    tone: "ink",
  },
  {
    slug: "technical-seo-foundations",
    title: "Technical SEO foundations that matter before you publish more content",
    excerpt:
      "Fix crawl paths, page experience and information architecture so every new page has a stronger chance to perform.",
    category: "Digital Marketing",
    date: "8 Sep 2026",
    readTime: "6 min read",
    code: "MKT / 04",
    tone: "orange",
  },
  {
    slug: "software-discovery-sprint",
    title: "The software discovery sprint: what to decide before development starts",
    excerpt:
      "Turn uncertain requirements into priorities, system boundaries and a delivery plan your team can actually use.",
    category: "Software Development",
    date: "4 Sep 2026",
    readTime: "9 min read",
    code: "SWE / 05",
    tone: "violet",
  },
  {
    slug: "ai-agents-real-workflows",
    title: "Where AI agents fit into real business workflows—and where they do not",
    excerpt:
      "A grounded way to evaluate autonomy, human review and system access before putting an agent into production.",
    category: "Technology",
    date: "29 Aug 2026",
    readTime: "8 min read",
    code: "TEC / 06",
    tone: "mint",
  },
  {
    slug: "website-rebuild-signals",
    title: "Seven signals your website needs a rebuild, not another round of patches",
    excerpt:
      "Know when slow pages, brittle content workflows and inaccessible interfaces have become a structural problem.",
    category: "Web Development",
    date: "24 Aug 2026",
    readTime: "6 min read",
    code: "WEB / 07",
    tone: "slate",
  },
  {
    slug: "mobile-release-checklist",
    title: "A release-readiness checklist for customer-facing mobile applications",
    excerpt:
      "Validate observability, edge cases, store requirements and support ownership before the first production release.",
    category: "App Development",
    date: "19 Aug 2026",
    readTime: "7 min read",
    code: "APP / 08",
    tone: "sky",
  },
  {
    slug: "cloud-migration-sequence",
    title: "Sequence your cloud migration around risk, not around the org chart",
    excerpt:
      "Use dependencies, blast radius and rollback paths to decide what moves first and what should wait.",
    category: "Cloud Consulting",
    date: "14 Aug 2026",
    readTime: "9 min read",
    code: "CLD / 09",
    tone: "blue",
  },
];

export function getBlogArticle(slug: string) {
  return blogArticles.find((article) => article.slug === slug);
}

export function getBlogImage(article: BlogArticle) {
  return blogImages[article.tone];
}
