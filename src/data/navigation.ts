export const headerNavigation = [
  { label: "About", href: "/about-us" },
  { label: "Industries", href: "/services", menu: "industries" },
  { label: "Services", href: "/services", menu: "services" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blogs" },
  { label: "Contact Us", href: "/contact-us", isAction: true },
] as const;

export const industryNavigation = [
  {
    label: "SaaS & Platforms",
    href: "/services?industry=saas",
    description: "Products, integrations, and cloud foundations built to scale.",
  },
  {
    label: "Healthcare",
    href: "/services?industry=healthcare",
    description: "Dependable patient, operations, and data systems for care teams.",
  },
  {
    label: "Fintech & Payments",
    href: "/services?industry=fintech",
    description: "Secure platforms for transactions, reporting, and customer trust.",
  },
  {
    label: "Manufacturing & Logistics",
    href: "/services?industry=operations",
    description: "Connected workflows that make complex operations visible and efficient.",
  },
] as const;

export const serviceNavigation = [
  {
    label: "Agentic AI Development",
    href: "/services/agentic-ai-development/",
    description:
      "Build autonomous AI systems that plan, act, and integrate with real business workflows.",
  },
  {
    label: "Cloud Consulting",
    href: "/services/cloud-consulting/",
    description:
      "Design secure, scalable cloud platforms and modernize infrastructure for reliable growth.",
  },
  {
    label: "Mobile Application Development",
    href: "/services/mobile-application-development/",
    description:
      "Create high-performance mobile apps with intuitive experiences across iOS and Android.",
  },
  {
    label: "ERP Services",
    href: "/services/erp-services/",
    description:
      "Unify core operations with tailored ERP solutions that improve visibility and control.",
  },
  {
    label: "SEO / Digital Marketing",
    href: "/services/seo-digital-marketing/",
    description:
      "Grow qualified visibility through technical SEO, content strategy, and measurable campaigns.",
  },
  {
    label: "Website Solutions",
    href: "/services/website-solutions/",
    description:
      "Launch fast, accessible websites engineered around your brand and business goals.",
  },
] as const;
