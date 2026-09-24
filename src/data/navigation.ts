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
    href: "/industries/saas-platforms",
    description: "Products, integrations, and cloud foundations built to scale.",
  },
  {
    label: "Healthcare",
    href: "/industries/healthcare",
    description: "Dependable patient, operations, and data systems for care teams.",
  },
  {
    label: "Government",
    href: "/services?industry=government",
    description: "Secure, accessible digital services for public-sector teams and citizens.",
  },
  {
    label: "Retail",
    href: "/industries/retail",
    description: "Search, inventory, and checkout systems that hold up in season.",
  },
  {
    label: "Manufacturing & Logistics",
    href: "/industries/manufacturing",
    description: "Production, dispatch, and tracking systems for operations teams.",
  },
  {
    label: "Robotics & Automation",
    href: "/industries/automation",
    description: "Software that connects robots, sensors, and workflows into dependable automation.",
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
