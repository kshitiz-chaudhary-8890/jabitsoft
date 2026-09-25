import type { IndustryDetailData } from "../types";

export const governmentContent: IndustryDetailData = {
  label: "Government",
  slug: "government",
  kicker: "Industries — Government",
  hero: {
    headline: "Digital public services people can rely on.",
    lede: "We help public-sector teams modernize websites, internal systems, and everyday workflows with accessible, maintainable software built around real service needs.",
    primaryCta: "Plan a digital service",
    stats: [
      { value: "Accessible", label: "Experiences for every resident" },
      { value: "Connected", label: "Systems that share useful data" },
      { value: "Practical", label: "Workflows shaped around teams" },
      { value: "Maintainable", label: "Software built for the long term" },
    ],
    ticker: [
      "Citizen portals",
      "Service applications",
      "Case management",
      "Digital records",
      "Department workflows",
      "Public information",
      "System integration",
      "Accessible websites",
    ],
  },
  landscape: {
    title: "Public services are digital services.",
    intro:
      "Residents expect to find information and complete routine tasks online. Government teams need digital tools that make those services clearer without adding complexity behind the scenes.",
    forces: [
      {
        title: "Rising service expectations",
        text: "People want clear information, straightforward forms, and timely updates across the services they use.",
      },
      {
        title: "Disconnected systems",
        text: "Information spread across departments can make simple requests slow for residents and staff alike.",
      },
      {
        title: "Inclusive access",
        text: "Public-facing services must be understandable and usable by people with different devices, abilities, and levels of digital confidence.",
      },
      {
        title: "Legacy process pressure",
        text: "Paper-based handoffs and aging applications make it harder to adapt services as needs change.",
      },
    ],
    opportunities: [
      {
        title: "Make common tasks easier",
        text: "Bring service information, applications, and status updates into clear digital journeys.",
      },
      {
        title: "Give teams a shared view",
        text: "Connect the tools people already use so requests and records move with less duplicate entry.",
      },
      {
        title: "Improve visibility",
        text: "Use useful reporting to understand demand, identify bottlenecks, and guide service improvements.",
      },
    ],
  },
  challenges: {
    title: "Public-sector technology has to work for everyone.",
    intro:
      "A useful service needs to be clear for residents, workable for staff, and manageable for the organization maintaining it.",
    items: [
      {
        title: "Hard-to-navigate information",
        text: "Residents can struggle to find the right service, eligibility details, or next step across scattered pages and documents.",
      },
      {
        title: "Paper-heavy applications",
        text: "Manual forms and repeated data entry add effort for applicants and create avoidable work for staff.",
      },
      {
        title: "Limited request visibility",
        text: "When updates live in separate inboxes and systems, residents and case workers may not have a clear view of progress.",
      },
      {
        title: "Department silos",
        text: "Different tools and handoff processes make it difficult to coordinate work across teams.",
      },
      {
        title: "Aging digital foundations",
        text: "Older websites and applications can be difficult to update, support, and adapt to new service needs.",
      },
    ],
  },
  howWeHelp: {
    title: "How Jabisoft helps Government.",
    intro:
      "We work with your team to understand the service, improve the digital journey, and build software that fits your operational context.",
    items: [
      {
        title: "We build resident-facing portals",
        text: "We create clear places for residents to find information, submit requests, and follow the next steps in a service.",
        tags: ["Portals", "Service journeys", "Status updates"],
      },
      {
        title: "We modernize public websites",
        text: "We organize content and improve website experiences so essential information is easier to find and maintain.",
        tags: ["Websites", "Content systems", "Accessibility"],
      },
      {
        title: "We digitize team workflows",
        text: "We replace repetitive handoffs with structured processes for routing, reviewing, and resolving service requests.",
        tags: ["Workflow tools", "Case handling", "Approvals"],
      },
      {
        title: "We connect existing systems",
        text: "We integrate applications and data sources where appropriate to reduce duplicate work and improve information flow.",
        tags: ["APIs", "Integrations", "Data flows"],
      },
      {
        title: "We make information more useful",
        text: "We build reporting views that help teams understand service demand, workload, and operational progress.",
        tags: ["Dashboards", "Reporting", "Analytics"],
      },
      {
        title: "We support ongoing improvement",
        text: "We deliver maintainable software and collaborate with your stakeholders as services and requirements evolve.",
        tags: ["Modernization", "Documentation", "Support"],
      },
    ],
  },
  useCases: {
    title: "Digital tools for everyday public services.",
    intro:
      "From the first resident interaction to the work that happens across departments, we build around practical service needs.",
    items: [
      {
        title: "Resident service portal",
        text: "A guided starting point for finding services and completing common tasks.",
        points: ["Service directory", "Online requests", "Clear next steps"],
      },
      {
        title: "Application and permit flows",
        text: "Structured digital applications that help applicants provide the right details and documents.",
        points: ["Guided forms", "Document collection", "Application updates"],
      },
      {
        title: "Case and request management",
        text: "A shared workspace for reviewing, assigning, and tracking incoming service requests.",
        points: ["Team work queues", "Assignment and routing", "Progress history"],
      },
      {
        title: "Public information websites",
        text: "Organized, maintainable websites that make policies, programs, and service details easier to access.",
        points: ["Clear content structure", "Searchable information", "Mobile-friendly pages"],
      },
      {
        title: "Department workflow tools",
        text: "Internal applications that coordinate reviews, approvals, and routine operational tasks.",
        points: ["Configurable steps", "Role-aware work queues", "Notifications"],
      },
      {
        title: "Service performance dashboards",
        text: "Reporting views that bring operational signals together for informed service planning.",
        points: ["Demand trends", "Workload visibility", "Exportable reports"],
      },
    ],
  },
  businessImpact: {
    title: "Better digital services, clearer outcomes.",
    intro:
      "We focus on improvements your team can observe and measure in its own service context—not one-size-fits-all promises.",
    dimensions: [
      {
        name: "Residents find the right service",
        before: "Information spread across pages and documents",
        text: "Clearer content paths help people understand where to go and what to do next.",
        tag: "Access",
      },
      {
        name: "Applications arrive more complete",
        before: "Paper forms and repeated follow-up",
        text: "Guided forms help applicants provide relevant information at the point of submission.",
        tag: "Applications",
      },
      {
        name: "Teams see work in progress",
        before: "Requests tracked across separate inboxes",
        text: "Shared queues give teams a more consistent view of ownership and status.",
        tag: "Operations",
      },
      {
        name: "Handoffs become easier to follow",
        before: "Manual updates between departments",
        text: "Connected workflows make responsibilities and next steps clearer across teams.",
        tag: "Coordination",
      },
      {
        name: "Service information stays useful",
        before: "Outdated or difficult-to-maintain web content",
        text: "A maintainable content experience helps teams keep public information current.",
        tag: "Information",
      },
      {
        name: "Improvements use real signals",
        before: "Limited visibility into service demand",
        text: "Relevant reporting helps teams identify recurring needs and opportunities to improve.",
        tag: "Insight",
      },
    ],
  },
  cta: {
    title: "Make a public service easier to use.",
    text: "Tell us where residents or staff get stuck. We can help map a practical digital improvement and the steps to deliver it.",
    button: "Talk to Our Experts",
    secondaryButton: "Start a Conversation",
  },
};
