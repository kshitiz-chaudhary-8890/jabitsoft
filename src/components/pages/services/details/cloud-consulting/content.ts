import type { ServiceDetailData } from "../types";

export const cloudConsultingContent: ServiceDetailData = {
  label: "Cloud Consulting",
  slug: "cloud-consulting",
  eyebrow: "Cloud platforms",
  headline: "Cloud foundations built for reliable growth.",
  lede: "We design, migrate and improve cloud platforms that give teams stronger security, predictable delivery and room to scale.",
  primaryCta: "Discuss your cloud roadmap",
  proof: [
    { value: "Architecture-first", label: "Decisions tied to workload needs" },
    { value: "Security-built-in", label: "Controls designed from day one" },
    { value: "Cost-aware", label: "Capacity aligned with real demand" },
    { value: "Team-ready", label: "Runbooks and knowledge transfer included" },
  ],
  problem: {
    title: "Cloud complexity grows faster than operational confidence.",
    intro:
      "As products and teams expand, fragmented infrastructure creates slower releases, unclear costs and avoidable risk. A dependable cloud platform gives engineering a consistent way to build and operate.",
    items: [
      {
        title: "Infrastructure decisions stay reactive",
        text: "Teams add services under delivery pressure without a shared architecture or operating model.",
      },
      {
        title: "Cloud costs lack clear ownership",
        text: "Unused resources, inconsistent tagging and oversized workloads make spend difficult to explain or control.",
      },
      {
        title: "Releases depend on manual steps",
        text: "Environment drift and hand-built deployments slow delivery and increase production risk.",
      },
      {
        title: "Security arrives too late",
        text: "Permissions, secrets and compliance checks are added after systems are already difficult to change.",
      },
    ],
  },
  capabilities: {
    title: "A cloud platform designed around how your teams operate.",
    intro:
      "From the first architecture decision to day-two operations, we connect infrastructure, delivery and governance into one practical system.",
    items: [
      {
        title: "Cloud strategy and architecture",
        text: "Define the target platform, service boundaries, resilience model and practical migration path.",
      },
      {
        title: "Migration and modernisation",
        text: "Move workloads safely while improving architecture, deployment and operational visibility.",
      },
      {
        title: "Platform engineering",
        text: "Create reusable environments, delivery pipelines and paved roads for product teams.",
      },
      {
        title: "Cloud security",
        text: "Build identity, network, secrets and policy controls into the platform foundation.",
      },
      {
        title: "Reliability and FinOps",
        text: "Improve observability, recovery, capacity and cost accountability across production workloads.",
      },
    ],
  },
  useCases: {
    title: "Where cloud consulting creates practical leverage.",
    intro:
      "We focus on transitions and platform decisions where reliability, speed and cost need to improve together.",
    items: [
      {
        title: "Data centre to cloud migration",
        text: "Assess dependencies, sequence workloads and move with controlled risk and measurable checkpoints.",
      },
      {
        title: "Cloud-native product platforms",
        text: "Build scalable foundations for APIs, applications, data and asynchronous workloads.",
      },
      {
        title: "DevOps modernisation",
        text: "Standardise environments and automate build, test, release and rollback workflows.",
      },
      {
        title: "Reliability and cost recovery",
        text: "Stabilise fragile systems while reducing waste and clarifying operational ownership.",
      },
    ],
  },
  process: {
    title: "A controlled path from cloud assessment to operation.",
    intro:
      "We establish the current state, agree the target architecture and deliver in stages that protect business continuity.",
    steps: [
      {
        title: "Assess",
        text: "Review workloads, dependencies, security, delivery practices and cost signals.",
        output: "Cloud assessment",
      },
      {
        title: "Architect",
        text: "Define the landing zone, platform patterns, controls and migration sequence.",
        output: "Target blueprint",
      },
      {
        title: "Pilot",
        text: "Prove the platform with a representative workload and real operating conditions.",
        output: "Validated foundation",
      },
      {
        title: "Migrate",
        text: "Move services in controlled waves with testing, rollback and business checkpoints.",
        output: "Production workloads",
      },
      {
        title: "Optimise",
        text: "Improve reliability, delivery speed, security posture and cloud economics.",
        output: "Operating roadmap",
      },
    ],
  },
  technology: {
    title: "Cloud tooling selected around your workloads and team.",
    intro:
      "We work across major providers and use portable automation where it improves control, repeatability and long-term ownership.",
    groups: [
      {
        label: "Cloud providers",
        items: ["AWS Cloud", "Microsoft Azure", "Google Cloud", "Hybrid cloud"],
      },
      {
        label: "Containers",
        items: ["Kubernetes", "Docker", "Managed containers", "Serverless compute"],
      },
      {
        label: "Infrastructure",
        items: ["Terraform", "Infrastructure as code", "GitOps", "Configuration management"],
      },
      {
        label: "Delivery",
        items: ["CI/CD pipelines", "Automated testing", "Release controls", "Artifact management"],
      },
      {
        label: "Operations",
        items: ["Cloud monitoring", "Tracing", "Incident response", "Cost management"],
      },
    ],
  },
  readiness: {
    title: "Production readiness built into the platform foundation.",
    intro:
      "Every workload is supported by clear controls, measurable reliability and an operating model your team can follow.",
    systemLabel: "Cloud operating loop",
    items: [
      {
        marker: "Secure",
        title: "Identity and policy baseline",
        text: "Access, network boundaries, secrets and policy checks are defined before production traffic arrives.",
      },
      {
        marker: "Validate",
        title: "Release confidence",
        text: "Automated checks and repeatable environments reduce drift between development and production.",
      },
      {
        marker: "Observe",
        title: "Service visibility",
        text: "Logs, metrics, traces and service objectives make health and performance visible.",
      },
      {
        marker: "Recover",
        title: "Resilience planning",
        text: "Backups, recovery targets, rollback paths and incident ownership are tested and documented.",
      },
    ],
  },
  ownership: {
    title: "A cloud platform your team can operate and evolve.",
    intro:
      "Delivery includes the infrastructure, controls and practical documentation required for confident internal ownership.",
    items: [
      {
        artifact: "Cloud foundation",
        title: "Production-ready environments",
        text: "Configured accounts, networks, identity and platform services aligned with the agreed architecture.",
      },
      {
        artifact: "Automation",
        title: "Infrastructure and delivery code",
        text: "Version-controlled infrastructure, pipelines and reusable deployment patterns.",
      },
      {
        artifact: "Operations",
        title: "Monitoring and response runbooks",
        text: "Dashboards, alerts, recovery procedures and operational responsibilities.",
      },
      {
        artifact: "Capability transfer",
        title: "Team enablement and handover",
        text: "Working sessions and documentation for the people who will run and extend the platform.",
      },
    ],
  },
  faqs: [
    {
      question: "Which cloud provider should we use?",
      answer:
        "We assess workload needs, existing skills, compliance, commercial constraints and service fit before recommending a provider or hybrid approach.",
    },
    {
      question: "Can you migrate without major downtime?",
      answer:
        "Yes. We plan migrations in controlled waves with rehearsals, data validation, rollback paths and business-approved maintenance windows where required.",
    },
    {
      question: "Can you improve an existing cloud platform?",
      answer:
        "Yes. We can audit architecture, security, reliability, delivery and cost, then prioritise changes by operational impact.",
    },
    {
      question: "How do you control cloud costs?",
      answer:
        "We combine tagging, budgets, capacity reviews, workload optimisation and clear service ownership rather than relying on one-time cost cuts.",
    },
    {
      question: "Who operates the platform after launch?",
      answer:
        "Your team owns it. We provide code, documentation and enablement, with optional ongoing reliability and optimisation support.",
    },
  ],
  cta: {
    title: "Build the cloud foundation your next stage needs.",
    text: "Share your current architecture, delivery constraints and growth plans. We will help define the safest, most valuable next step.",
    button: "Plan your cloud roadmap",
  },
};
