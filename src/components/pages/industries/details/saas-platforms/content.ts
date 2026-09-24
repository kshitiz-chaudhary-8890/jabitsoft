import type { IndustryDetailData } from "../types";

export const saasPlatformsContent: IndustryDetailData = {
  label: "SaaS & Platforms",
  slug: "saas-platforms",
  kicker: "Industries — SaaS & Platforms",
  hero: {
    headline: "Build the platform your customers run their business on.",
    lede: "We engineer multi-tenant SaaS products end to end — the product, the billing, the integrations and the cloud foundations that stay dependable while usage compounds.",
    primaryCta: "Map your platform roadmap",
    stats: [
      { value: "Tenancy-first", label: "Isolation designed in from day one" },
      { value: "Billing-native", label: "Metering and entitlements in the codebase" },
      { value: "API-first", label: "Surfaces your customers build on" },
      { value: "Release-safe", label: "Pipelines that ship daily, not carefully" },
    ],
    ticker: [
      "Multi-tenant architecture",
      "Usage metering",
      "Entitlements",
      "SSO & RBAC",
      "Webhooks",
      "Zero-downtime releases",
      "Cost controls",
      "AI copilots",
    ],
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
    title: "Five places every scaling platform breaks.",
    intro:
      "Not generic software pain — the specific failures that appear when real customers, real usage and enterprise expectations arrive at once.",
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
    title: "How Jabisoft helps SaaS & platform teams.",
    intro:
      "We work inside your repositories, against your roadmap — here is exactly what we do for SaaS and platform companies, mapped to the breaks above.",
    items: [
      {
        title: "We make you enterprise-deal ready",
        text: "We build SSO, RBAC, audit trails, and data isolation directly into your product — so procurement passes and stalled demos turn into signed contracts.",
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
        text: "We design per-tenant isolation across your queues, data, and workers — so your biggest customer's peak hour never becomes everyone's outage.",
        tags: ["Tenancy model", "Per-tenant limits", "Load isolation"],
      },
      {
        title: "We make your releases boring",
        text: "We put test automation and zero-downtime pipelines in place — so your team ships daily with confidence instead of shipping weekly with fear.",
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
      "Six applications buyers recognize on a demo call — each shipped to production, each running on real tenant data.",
    items: [
      {
        title: "Copilots your customers talk to",
        text: "We put an assistant inside your product that answers from the tenant's own data and acts only with approval — support load drops while activation rises.",
        points: ["Answers from tenant data", "Approval-gated actions", "Quality tracked by evals"],
      },
      {
        title: "Search that ends the ticket queue",
        text: "We ship semantic, permissions-aware search across records, docs, and history — customers self-serve instead of writing to support.",
        points: ["Respects every permission", "Understands intent, not keywords", "Deflects repeat tickets"],
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
    title: "After Jabisoft, your business runs different.",
    intro:
      "If you work with us, this is what improves. No invented numbers — each outcome is made measurable in the product and reviewed with your team.",
    dimensions: [
      {
        name: "Releases ship daily",
        before: "Every deploy needs a rollback plan",
        text: "Automation carries the repeatable work and tests carry the risk — delivery stops depending on heroics.",
        tag: "Delivery",
      },
      {
        name: "Manual work disappears",
        before: "Queues and reconciliations eat weeks",
        text: "Support and ops hand repetitive work to traceable automation — teams spend time on product, not chores.",
        tag: "Operations",
      },
      {
        name: "Spikes get absorbed",
        before: "One tenant can take everyone down",
        text: "Per-tenant isolation means your biggest customer's peak hour never becomes everyone's outage.",
        tag: "Scale",
      },
      {
        name: "Customers self-serve",
        before: "Support answers the same tickets",
        text: "Answers, onboarding, and upgrades live inside the product — experience compounds into retention.",
        tag: "Experience",
      },
      {
        name: "Decisions run on data",
        before: "Roadmap debates run on opinions",
        text: "Live usage, churn, and expansion signals sit behind every roadmap call your team makes.",
        tag: "Insight",
      },
      {
        name: "Usage turns into revenue",
        before: "Pricing lives in spreadsheets",
        text: "Metering and entitlements in the codebase turn usage into upgrades without an email thread.",
        tag: "Revenue",
      },
    ],
  },
  cta: {
    title: "Your next stage of growth needs a platform ready for it.",
    text: "Share your roadmap, architecture and growth targets. We will help define the safest, highest-value next step.",
    button: "Talk to Our Experts",
    secondaryButton: "Start a Conversation",
  },
};
