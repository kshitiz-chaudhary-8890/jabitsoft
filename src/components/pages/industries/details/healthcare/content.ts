import type { IndustryDetailData } from "../types";

export const healthcareContent: IndustryDetailData = {
  label: "Healthcare", slug: "healthcare", kicker: "Healthcare software development",
  hero: {
    headline: "Clinical software that works where care happens.",
    lede: "From patient portals and appointment systems to clinical workflows and connected platforms, we build healthcare software designed around the people who use it every day.",
    primaryCta: "Discuss your healthcare project", secondaryCta: "See what we build",
    stats: [
      { value: "Portals", label: "Patient-facing experiences" },
      { value: "Workflows", label: "Clinical and administrative systems" },
      { value: "Scheduling", label: "Appointments and availability" },
      { value: "Integrations", label: "Connected healthcare platforms" },
    ],
    ticker: ["Patient portals", "Clinical workflows", "Appointment systems", "Integrations", "Automation", "Healthcare platforms"],
  },
  whatWeBuild: {
    title: "Software built around the way care works.",
    intro: "Healthcare teams don't need another disconnected tool. We design and engineer systems around patients, clinicians, administrators, and the workflows connecting them.",
    items: [
      { title: "Patient Portals", text: "Give patients one place to manage appointments, information, forms, communication, and services." },
      { title: "Clinical Workflow Systems", text: "Turn complex clinical and administrative processes into structured, easier-to-manage digital workflows." },
      { title: "Appointment & Scheduling Platforms", text: "Build scheduling experiences around providers, locations, services, availability, and patient needs." },
      { title: "Healthcare Operations Platforms", text: "Connect day-to-day administrative and operational workflows through purpose-built software." },
      { title: "System Integrations", text: "Connect healthcare applications with existing systems and approved third-party services through APIs and integration layers." },
      { title: "Workflow Automation", text: "Reduce repetitive administrative work with rules, notifications, task automation, and AI-assisted workflows where appropriate." },
    ],
  },
  landscape: {
    title: "Care runs on software now.",
    intro: "Every appointment, handoff, record, notification, and follow-up can depend on the systems behind it. When those systems create friction, both staff and patients feel it.",
    opportunityTitle: "Better software should remove friction.",
    forces: [
      { title: "Digital front door", text: "Patients increasingly interact with providers through digital touchpoints before and after a visit." },
      { title: "Interoperability pressure", text: "Healthcare workflows often span multiple applications, teams, and data sources." },
      { title: "Staff capacity gaps", text: "Administrative work consumes time that teams could spend on higher-value tasks." },
      { title: "Growing patient expectations", text: "People expect healthcare technology to feel as intuitive as the digital services they use elsewhere." },
    ],
    opportunities: [
      { title: "Connect the workflow", text: "Bring fragmented steps into clearer, structured processes." },
      { title: "Reduce repetitive work", text: "Automate routine administrative actions where appropriate." },
      { title: "Keep people informed", text: "Use notifications, status visibility, and clear handoffs to improve coordination." },
    ],
  },
  challenges: {
    title: "Healthcare workflows don't fit generic software.",
    intro: "Healthcare combines complex workflows, multiple roles, sensitive information, and operational dependencies. Software has to account for that complexity from the beginning.",
    items: [
      { title: "Fragmented patient records", text: "Important information can sit across different applications and workflows, making a complete view difficult." },
      { title: "Scheduling complexity", text: "Providers, services, locations, availability, and patient requirements make healthcare scheduling more than a simple calendar." },
      { title: "Critical handoffs", text: "A missed task or unclear transition between teams can disrupt the entire workflow." },
      { title: "Different roles, different needs", text: "Clinicians, administrators, managers, and patients need different information and permissions." },
      { title: "Privacy and access requirements", text: "Healthcare systems need carefully designed authentication, permissions, auditability, and data handling based on project requirements." },
    ],
  },
  howWeHelp: {
    title: "How Jabitsoft helps healthcare teams.",
    intro: "We design and engineer healthcare software around real workflows—not generic templates that teams have to work around.",
    items: [
      { title: "We understand the workflow first", text: "Before building, we map users, processes, handoffs, dependencies, and existing systems." },
      { title: "We design around different roles", text: "Patients, clinicians, administrators, and managers get experiences designed around what they actually need to do." },
      { title: "We connect existing systems", text: "Where appropriate, APIs and integrations help new software work with the technology already in place." },
      { title: "We automate repetitive processes", text: "Notifications, routing, status updates, forms, and administrative tasks can be automated to reduce manual effort." },
      { title: "We build for long-term change", text: "Architecture is designed so products can evolve as workflows, integrations, and business requirements change." },
      { title: "We stay beyond launch", text: "We can continue improving, maintaining, and extending the platform as requirements evolve." },
    ],
  },
  useCases: {
    title: "What we build for care teams.",
    intro: "From patient-facing experiences to the systems behind them, we build connected software around healthcare operations.",
    items: [
      { title: "Digital Patient Intake", text: "Forms, patient information, document collection, consent workflows, and pre-visit processes.", points: ["Patient Experience", "Forms", "Workflows"] },
      { title: "Triage & Task Queues", text: "Structured queues that help teams route requests, assign work, manage priorities, and track status.", points: ["Workflow", "Routing", "Operations"] },
      { title: "Appointment Automation", text: "Scheduling, reminders, confirmations, rescheduling, availability, and follow-up workflows.", points: ["Scheduling", "Automation", "Notifications"] },
      { title: "Patient Portals", text: "A central digital experience for appointments, information, forms, requests, and communication." },
      { title: "Clinical Dashboards", text: "Role-based views that surface relevant tasks, activity, status, and operational information." },
      { title: "Healthcare Integrations", text: "APIs and integration services that connect applications and reduce disconnected workflows." },
    ],
  },
  developmentProcess: {
    title: "From clinical workflow to working software.",
    intro: "Healthcare software starts with understanding the process—not choosing the technology.",
    steps: [
      { title: "Discover", text: "Understand users, workflows, existing systems, constraints, and project requirements." },
      { title: "Map", text: "Document journeys, roles, permissions, handoffs, data flows, and integrations." },
      { title: "Design", text: "Create interfaces and system architecture around real operational scenarios." },
      { title: "Build", text: "Develop the platform in focused, testable iterations with regular stakeholder feedback." },
      { title: "Integrate & Validate", text: "Connect required systems and validate workflows, permissions, edge cases, and expected behavior." },
      { title: "Launch & Improve", text: "Deploy, monitor, support, and continue evolving the product as requirements change." },
    ],
  },
  businessImpact: {
    title: "Better software. Less operational friction.",
    intro: "When systems match the way teams actually work, everyday healthcare operations become easier to manage.",
    dimensions: [
      { name: "Intake becomes structured", before: "Disconnected intake steps", text: "Move patient information from disconnected steps into clearer digital workflows.", tag: "Intake" },
      { name: "Scheduling becomes easier to manage", before: "Scattered appointment updates", text: "Bring availability, appointments, confirmations, changes, and reminders into connected processes.", tag: "Scheduling" },
      { name: "Teams know what needs attention", before: "Unclear outstanding work", text: "Queues, statuses, assignments, and notifications provide clearer visibility into outstanding work.", tag: "Operations" },
      { name: "Follow-up becomes systematic", before: "Manual reminders and memory", text: "Use defined workflows and automation to reduce reliance on manual reminders and individual memory.", tag: "Follow-up" },
    ],
  },
  integrations: {
    title: "Built to work with the systems around it.",
    intro: "Healthcare software rarely operates alone. We design integration layers and APIs that help platforms exchange information with the systems and services required by the workflow.",
    items: ["Practice Management Systems", "Scheduling Systems", "Patient Portals", "Communication Services", "Payment Platforms", "Identity & Authentication", "Reporting & Analytics", "Third-party APIs"],
  },
  faq: {
    title: "Healthcare software development questions.",
    items: [
      { question: "Can Jabitsoft build a healthcare platform from scratch?", answer: "Yes. We can work from early product definition through UX, architecture, development, integrations, deployment, and ongoing improvement." },
      { question: "Can you modernise an existing healthcare system?", answer: "Yes. Depending on the existing architecture, we can redesign interfaces, replace workflows, introduce new services, develop integrations, or progressively modernise parts of the platform." },
      { question: "Can you integrate with our existing systems?", answer: "Integration requirements are assessed during discovery. Where supported interfaces or APIs are available, we can design integrations around the required workflow and data exchange." },
      { question: "Do you build patient-facing applications?", answer: "Yes. This can include patient portals, appointment experiences, intake workflows, forms, notifications, and other digital patient interactions." },
      { question: "Can you automate healthcare workflows?", answer: "Yes. Appropriate administrative workflows can use automation for routing, notifications, status changes, task creation, document processing, and similar repetitive processes." },
      { question: "How do you approach security and privacy?", answer: "Security, access control, data handling, audit requirements, hosting, and applicable regulatory requirements should be defined for each project and incorporated into the architecture and development process." },
    ],
  },
  cta: {
    title: "Fix the workflow that's slowing your team down.",
    text: "Whether you're replacing a manual process, connecting existing systems, or building a new healthcare platform, let's start with the workflow that needs to work better.",
    button: "Discuss your project", secondaryButton: "Talk to our team",
  },
};
