import type { IndustryDetailData } from "../types";

export const saasPlatformsContent: IndustryDetailData = {
  label: "SaaS & Platforms",
  slug: "saas-platforms",
  kicker: "SaaS & platform software development",
  hero: {
    headline: "Build the platform your customers run their business on.",
    lede: "We engineer multi-tenant SaaS products end to end — the product, the billing, the integrations and the cloud foundations that stay dependable while usage compounds.",
    primaryCta: "Map your platform roadmap",
    secondaryCta: "See what we build",
    stats: [
      { value: "Tenancy-first", label: "Isolation designed in from day one" },
      { value: "Billing-native", label: "Metering and entitlements in the codebase" },
      { value: "API-first", label: "Surfaces your customers build on" },
      { value: "Release-ready", label: "Tested delivery pipelines" },
    ],
    ticker: ["Multi-tenant SaaS", "Product engineering", "Cloud", "Integrations", "AI", "DevOps"],
  },
  landscape: {
    title: "The SaaS playbook is being rewritten.",
    intro:
      "AI is resetting what buyers expect a product to do, while budgets now reward efficiency over headcount growth. Platforms that adapt will compound; the ones that wait will be swapped out at renewal.",
    forces: [
      {
        title: "AI resets the baseline",
        text: "Assistants, automation and reporting are expected inside the product now — not sold as an add-on later.",
      },
      {
        title: "Efficiency gets funded",
        text: "Renewals and funding rounds favour platforms that improve margins while they scale.",
      },
      {
        title: "Trust decides renewals",
        text: "Once customers run the business on your platform, security posture and data handling decide who stays.",
      },
      {
        title: "Integration depth wins shortlists",
        text: "Buyers keep the platforms that connect cleanly to the stack they already run — the API layer is now a sales decision.",
      },
    ],
    opportunities: [
      {
        title: "Ship AI-native before the next renewal",
        text: "Put intelligence into the workflows customers already run, with evaluation and guardrails from the first release.",
      },
      {
        title: "Make unit economics a product decision",
        text: "Metering, cost controls and pricing built into the platform — visible to the team and owned by it.",
      },
      {
        title: "Claim the platform-of-record position",
        text: "Reliability, isolation and audit posture that lets enterprise buyers sign without a fight.",
      },
    ],
  },
  challenges: {
    title: "Where scaling SaaS platforms break.",
    intro: "As usage and customer expectations grow, product architecture, security, billing, integrations, and delivery all need to keep up.",
    items: [
      {
        title: "One tenant's peak becomes everyone's outage",
        text: "Shared queues, databases and workers with no isolation let a single customer's spike drag the whole platform down.",
      },
      {
        title: "Enterprise deals die in the security review",
        text: "Missing SSO, RBAC, audit trails and data isolation stop procurement cold after a perfect demo.",
      },
      {
        title: "Pricing plans the product cannot meter",
        text: "Usage and entitlements live outside the codebase, so the commercial model your roadmap needs stays theoretical.",
      },
      {
        title: "Customers find failures before your monitoring does",
        text: "Integrations and background jobs fail silently until a support ticket becomes your alerting system.",
      },
      {
        title: "Releases ship weekly because they cannot ship safely",
        text: "Every deploy needs a rollback plan and a shared screen, so delivery speed is capped by fear, not by scope.",
      },
    ],
  },
  howWeHelp: {
    title: "How Jabitsoft helps SaaS & platform teams.",
    intro:
      "We work inside your repositories, against your roadmap — here is exactly what we do for SaaS and platform companies, mapped to the breaks above.",
    items: [
      {
        title: "We make you enterprise-deal ready",
        text: "We build SSO, RBAC, audit trails, and data isolation around your product requirements, helping teams prepare for enterprise security reviews.",
        tags: ["SSO / RBAC", "Audit trails", "Data isolation"],
      },
      {
        title: "We turn your usage into revenue",
        text: "We wire metering, entitlements, and plan logic into your codebase — so you can launch usage-based pricing without disrupting existing customers.",
        tags: ["Usage metering", "Entitlements", "Plan modelling"],
      },
      {
        title: "We embed the AI your buyers expect",
        text: "We ship copilots, intelligent search, and workflow automation inside the product your customers already use — with evals and guardrails from day one.",
        tags: ["Copilots", "Retrieval pipelines", "Evals + guardrails"],
      },
      {
        title: "We stop one tenant breaking everyone",
        text: "We design tenant-aware limits across queues, data, and workers to reduce the risk that one customer's usage affects others.",
        tags: ["Tenancy model", "Per-tenant limits", "Load isolation"],
      },
      {
        title: "We make your releases boring",
        text: "We build automated tests and release pipelines that help teams deploy changes with more confidence and clearer rollback options.",
        tags: ["Test automation", "Zero-downtime releases", "Release pipelines"],
      },
      {
        title: "We modernize without freezing you",
        text: "We extract your monolith into clean services and add enterprise readiness along the way — your roadmap keeps shipping while the foundation gets replaced.",
        tags: ["Monolith extraction", "SSO / RBAC", "Zero-freeze migration"],
      },
    ],
  },
  useCases: {
    title: "What we put inside SaaS products.",
    intro:
      "Practical product capabilities for customer workflows, platform operations, and growth.",
    items: [
      {
        title: "Copilots your customers talk to",
        text: "We put an assistant inside your product that answers from the tenant's own data and acts only with approval — support load drops while activation rises.",
        points: ["Answers from tenant data", "Approval-gated actions", "Quality tracked by evals"],
      },
      {
        title: "Search that ends the ticket queue",
        text: "We ship semantic, permissions-aware search across records, docs, and history — customers self-serve instead of writing to support.",
        points: [
          "Respects every permission",
          "Understands intent, not keywords",
          "Deflects repeat tickets",
        ],
      },
      {
        title: "Onboarding that needs no calls",
        text: "We build self-serve signup with guided first-runs and usage-triggered nudges — new tenants reach first value entirely on their own.",
        points: ["Signup in minutes", "Guided first value", "Nudges from real usage"],
      },
      {
        title: "Billing that upgrades itself",
        text: "We meter usage live and put plan changes inside the product — expansion happens at 2am without an email thread.",
        points: ["Live usage meters", "In-product upgrades", "Automatic dunning"],
      },
      {
        title: "Automations humans stay in charge of",
        text: "We connect your product to event-driven jobs and approval chains — machines carry the volume, people keep the decisions.",
        points: ["Event-driven jobs", "Human approval gates", "Every run audited"],
      },
      {
        title: "A radar for churn and expansion",
        text: "We surface risk flags and next-best actions from usage data, where your team already works — renewals stop being surprises.",
        points: ["Churn-risk flags", "Next-best actions", "Renewal forecasts"],
      },
    ],
  },
  businessImpact: {
    title: "A platform that is easier to run and improve.",
    intro:
      "These are the practical changes the right product architecture and workflows can enable. The measures depend on your product and users.",
    dimensions: [
      {
        name: "Delivery becomes more predictable",
        before: "Every release needs manual coordination",
        text: "Automated tests and clear release steps help teams deploy and recover with more confidence.",
        tag: "Delivery",
      },
      {
        name: "Tenant boundaries become clearer",
        before: "Shared workloads affect other customers",
        text: "Tenant-aware architecture helps teams manage access, workloads, and data boundaries as usage grows.",
        tag: "Scale",
      },
      {
        name: "Customers can do more themselves",
        before: "Routine tasks depend on support",
        text: "Clear onboarding, search, and account tools make common tasks easier to complete in the product.",
        tag: "Experience",
      },
      {
        name: "Usage informs product decisions",
        before: "Limited visibility into adoption",
        text: "Product and operational data can show where customers engage, get stuck, and need a better workflow.",
        tag: "Insight",
      },
    ],
  },
  cta: {
    title: "Your next stage of growth needs a platform ready for it.",
    text: "Share your roadmap, architecture and growth targets. We will help define the safest, highest-value next step.",
    button: "Talk to Our Experts",
    secondaryButton: "Start a Conversation",
  },
  whatWeBuild: {
    title: "What we build for SaaS companies.",
    intro:
      "From a first release to an established platform, we develop the product and the systems that support its growth.",
    coreLabel: "SaaS platform",
    items: [
      {
        title: "SaaS Product Development",
        text: "From MVPs to mature multi-tenant platforms, we design and build the product around its users and business model.",
        tags: ["Product engineering", "MVPs", "Platforms"],
      },
      {
        title: "Multi-tenant Architecture",
        text: "Architecture designed around organizations, users, roles, permissions, and data isolation.",
        tags: ["Organizations", "Roles", "Data isolation"],
      },
      {
        title: "Customer & Admin Portals",
        text: "Dashboards, onboarding, account management, permissions, and internal operations in one product experience.",
        tags: ["Onboarding", "Dashboards", "Accounts"],
      },
      {
        title: "Subscriptions & Billing",
        text: "Plans, subscriptions, usage, invoicing, upgrades, and billing integrations shaped to your commercial model.",
        tags: ["Plans", "Usage", "Billing"],
      },
      {
        title: "API & Integrations",
        text: "Connect your product with the applications, data, and workflows your customers already use.",
        tags: ["APIs", "Webhooks", "Integrations"],
      },
      {
        title: "AI-powered SaaS Features",
        text: "Agents, copilots, intelligent search, and AI-assisted workflows where they solve a clear product problem.",
        tags: ["AI agents", "Search", "Automation"],
      },
    ],
  },
  developmentProcess: {
    title: "From idea to a platform ready to scale.",
    intro:
      "A clear delivery path keeps product decisions, engineering work, and customer feedback connected.",
    steps: [
      { title: "Discover", text: "Understand the product, users, workflows, and business model." },
      {
        title: "Design",
        text: "Define UX, architecture, integrations, and technical foundations.",
      },
      { title: "Build", text: "Develop the product in focused, testable iterations." },
      { title: "Launch", text: "Deploy, monitor, test, and prepare the platform for real users." },
      {
        title: "Scale",
        text: "Improve performance, automate operations, and evolve the product as usage grows.",
      },
    ],
  },
  technology: {
    title: "Built on technology made to last.",
    intro:
      "We choose the stack around your product's requirements and existing systems, with room for integration and future change.",
    items: [
      "React & Next.js",
      "Node.js",
      "AWS & Azure",
      "Docker & containers",
      "REST APIs & webhooks",
      "AI & LLM integrations",
      "CI/CD pipelines",
      "Data architecture",
    ],
    groups: [
      { label: "Product", items: ["React & Next.js", "Node.js", "AI & LLM integrations"] },
      { label: "Platform", items: ["Data architecture", "REST APIs & webhooks"] },
      { label: "Delivery", items: ["AWS & Azure", "Docker & containers", "CI/CD pipelines"] },
    ],
  },
  faq: {
    title: "SaaS development questions.",
    items: [
      {
        question: "Can you build a SaaS product from scratch?",
        answer:
          "Yes. We can help define the product, design the experience and architecture, build the platform, integrate the services it needs, and support its launch.",
      },
      {
        question: "Can you modernize an existing SaaS platform?",
        answer:
          "Yes. We can assess the current product, identify the highest-impact changes, and modernize interfaces, workflows, architecture, and integrations in planned stages.",
      },
      {
        question: "Do you work with multi-tenant architectures?",
        answer:
          "Yes. We design around organizations, users, roles, permissions, and data boundaries, based on the product's requirements and scale.",
      },
      {
        question: "Can you integrate AI into an existing SaaS product?",
        answer:
          "Yes. We start with a specific user workflow, then assess the data, permissions, model behavior, and review controls needed to make the feature useful.",
      },
      {
        question: "Can you handle third-party integrations and APIs?",
        answer:
          "Yes. We design and build APIs, webhooks, and integrations with supported third-party systems, with attention to data flow, errors, and ongoing maintenance.",
      },
      {
        question: "Do you provide ongoing development after launch?",
        answer:
          "Yes. We can continue improving the product, adding features, refining performance, and supporting the platform as requirements change.",
      },
    ],
  },
};
