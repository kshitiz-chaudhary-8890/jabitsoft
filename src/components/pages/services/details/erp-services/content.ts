import type { ServiceDetailData } from "../types";

export const erpServicesContent: ServiceDetailData = {
  label: "ERP Services",
  slug: "erp-services",
  eyebrow: "Core operations",
  headline: "One operational system built around your business.",
  lede: "We design, implement and improve ERP solutions that connect processes, data and teams without forcing the business into a rigid template.",
  primaryCta: "Discuss your ERP needs",
  proof: [
    { value: "Process-led", label: "Configured around real operations" },
    { value: "Integrated", label: "Connected across business systems" },
    { value: "Data-trusted", label: "Clear ownership and reporting" },
    { value: "Adoption-ready", label: "Users prepared for the change" },
  ],
  problem: {
    title: "Disconnected operations create work no one should repeat.",
    intro:
      "When finance, inventory, sales and delivery run in separate systems, teams spend time reconciling data instead of improving the business. ERP should simplify that operating reality.",
    items: [
      {
        title: "Teams work from different numbers",
        text: "Duplicated records and inconsistent definitions make reporting slow and difficult to trust.",
      },
      {
        title: "Manual handoffs create delays",
        text: "Approvals, updates and reconciliations move through spreadsheets, messages and individual memory.",
      },
      {
        title: "Legacy systems resist change",
        text: "Fragile customisations and undocumented dependencies make every improvement risky.",
      },
      {
        title: "ERP adoption remains low",
        text: "Poorly matched workflows push users back to offline workarounds and duplicate tools.",
      },
    ],
  },
  capabilities: {
    title: "ERP delivery that connects technology with operational change.",
    intro:
      "We map the business first, then configure the platform, integrations, data and rollout around measurable operating outcomes.",
    items: [
      {
        title: "ERP strategy and selection",
        text: "Define requirements, evaluate platforms and establish a realistic transformation roadmap.",
      },
      {
        title: "Implementation and configuration",
        text: "Configure modules and workflows around approved business processes and controls.",
      },
      {
        title: "Integration engineering",
        text: "Connect CRM, commerce, finance, logistics, data and specialist operational systems.",
      },
      {
        title: "Data migration and reporting",
        text: "Clean, map and validate business data while building useful operational reporting.",
      },
      {
        title: "Adoption and continuous improvement",
        text: "Prepare users, support rollout and improve the system from real operational feedback.",
      },
    ],
  },
  useCases: {
    title: "Where connected ERP operations create the most value.",
    intro:
      "The strongest programmes remove duplicate work and give teams one dependable view across a complete process.",
    items: [
      {
        title: "Finance and order management",
        text: "Connect quotation, order, invoicing, payment and financial reporting in one controlled flow.",
      },
      {
        title: "Inventory and supply chain",
        text: "Improve purchasing, stock visibility, fulfilment and supplier coordination.",
      },
      {
        title: "Manufacturing and field operations",
        text: "Plan resources, capture work and connect delivery activity with cost and performance.",
      },
      {
        title: "Multi-entity reporting",
        text: "Standardise core data while supporting the controls and reporting needs of each business unit.",
      },
    ],
  },
  process: {
    title: "A staged ERP programme with operational control.",
    intro:
      "We align scope with business readiness, validate critical processes early and roll out in manageable phases.",
    steps: [
      {
        title: "Discover",
        text: "Map processes, systems, data, controls, users and current failure points.",
        output: "Operating blueprint",
      },
      {
        title: "Design",
        text: "Define the target process, platform configuration and integration model.",
        output: "Solution design",
      },
      {
        title: "Configure",
        text: "Build modules, workflows, roles, reports and interfaces in testable releases.",
        output: "Configured system",
      },
      {
        title: "Validate",
        text: "Migrate representative data and test end-to-end business scenarios with users.",
        output: "Go-live readiness",
      },
      {
        title: "Adopt",
        text: "Launch in controlled phases, support teams and prioritise operational improvements.",
        output: "Working ERP",
      },
    ],
  },
  technology: {
    title: "ERP technology selected for fit, integration and ownership.",
    intro:
      "We work with established platforms and custom services where they create a clearer, more maintainable operating system.",
    groups: [
      { label: "ERP platforms", items: ["Odoo ERP", "Microsoft Dynamics", "SAP", "Oracle ERP"] },
      {
        label: "Business domains",
        items: ["Finance", "CRM and ERP", "Inventory", "People operations"],
      },
      {
        label: "Integration",
        items: ["REST APIs", "Webhooks", "Commerce systems", "Data platforms"],
      },
      {
        label: "Data",
        items: ["Structured data", "Data migration", "Operational reporting", "Master data"],
      },
      {
        label: "Controls",
        items: ["Role-based access", "Approval workflows", "Audit history", "Cloud hosting"],
      },
    ],
  },
  readiness: {
    title: "A go-live plan built around business continuity.",
    intro:
      "The system is validated with real scenarios, representative data and the people who will use it every day.",
    systemLabel: "ERP assurance loop",
    items: [
      {
        marker: "Reconcile",
        title: "Validated business data",
        text: "Migration rules, balances and key records are reconciled before production cutover.",
      },
      {
        marker: "Control",
        title: "Roles and approvals",
        text: "Permissions, segregation and approval paths match the agreed operating controls.",
      },
      {
        marker: "Rehearse",
        title: "End-to-end process testing",
        text: "Users test complete scenarios, exceptions and reporting before launch.",
      },
      {
        marker: "Support",
        title: "Adoption and response plan",
        text: "Training, cutover support and issue ownership are established for the launch period.",
      },
    ],
  },
  ownership: {
    title: "An ERP system your teams understand and control.",
    intro:
      "You receive the configured platform, migration assets and operational knowledge required to run and improve it.",
    items: [
      {
        artifact: "Business system",
        title: "Configured ERP environment",
        text: "Production modules, workflows, roles and reports aligned with the approved operating model.",
      },
      {
        artifact: "Integration layer",
        title: "Connected business applications",
        text: "Documented interfaces, schedules and monitoring across the surrounding system landscape.",
      },
      {
        artifact: "Data assets",
        title: "Migration and reporting pack",
        text: "Mappings, validation evidence, core reports and data ownership guidance.",
      },
      {
        artifact: "Capability transfer",
        title: "User and administrator enablement",
        text: "Role-based training, operating documentation and handover for internal owners.",
      },
    ],
  },
  faqs: [
    {
      question: "Can you improve our existing ERP instead of replacing it?",
      answer:
        "Yes. We assess platform fit, customisations, integrations, data and adoption before recommending optimisation, staged modernisation or replacement.",
    },
    {
      question: "How do you choose an ERP platform?",
      answer:
        "We compare process fit, integration needs, extensibility, operating cost, vendor ecosystem and your team's ability to own the system.",
    },
    {
      question: "Can you migrate legacy data?",
      answer:
        "Yes. We profile, clean, map, rehearse and reconcile data, with clear rules for what should and should not move.",
    },
    {
      question: "How do you reduce go-live risk?",
      answer:
        "We use staged scope, representative testing, cutover rehearsals, rollback planning and direct support for business-critical teams.",
    },
    {
      question: "Do you provide ongoing ERP support?",
      answer:
        "Yes. We can support operations and improvements after launch, while keeping your internal team in control of priorities and ownership.",
    },
  ],
  cta: {
    title: "Connect the processes your business depends on.",
    text: "Share the systems, manual work and reporting gaps slowing your teams down. We will help define a practical ERP path.",
    button: "Plan your ERP programme",
  },
};
