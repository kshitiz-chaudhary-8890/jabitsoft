export const headerNavigation = [
  { label: "About", href: "#about" },
  { label: "Portfolio", href: "#works" },
  { label: "Services", href: "#services", hasDropdown: true },
  { label: "Careers", href: "#careers" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact", isAction: true },
] as const;

export const serviceNavigation = [
  {
    label: "Agentic AI Development",
    href: "/services/agentic-ai-development",
    description:
      "Build autonomous AI systems that plan, act, and integrate with real business workflows.",
  },
  {
    label: "Cloud Consulting",
    href: "/services/cloud-consulting",
    description:
      "Design secure, scalable cloud platforms and modernize infrastructure for reliable growth.",
  },
  {
    label: "Mobile Application Development",
    href: "/services/mobile-application-development",
    description:
      "Create high-performance mobile apps with intuitive experiences across iOS and Android.",
  },
  {
    label: "ERP Services",
    href: "/services/erp-services",
    description:
      "Unify core operations with tailored ERP solutions that improve visibility and control.",
  },
  {
    label: "SEO / Digital Marketing",
    href: "/services/seo-digital-marketing",
    description:
      "Grow qualified visibility through technical SEO, content strategy, and measurable campaigns.",
  },
  {
    label: "Website Solutions",
    href: "/services/website-solutions",
    description:
      "Launch fast, accessible websites engineered around your brand and business goals.",
  },
] as const;
