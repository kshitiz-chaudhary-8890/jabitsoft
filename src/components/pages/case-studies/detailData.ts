import { caseStudies, type CaseStudy } from "./data";

export type CaseStudySection = {
  number: string;
  title: string;
  paragraphs: string[];
  image?: {
    src: string;
    alt: string;
  };
};

export type CaseStudyDetail = CaseStudy & {
  headline: string;
  intro: string;
  metrics: Array<{ value: string; label: string }>;
  timeline: string;
  team: string;
  service: string;
  techStack: string[];
  sections: CaseStudySection[];
  quote: string;
};

function base(slug: string) {
  const study = caseStudies.find((item) => item.slug === slug);
  if (!study) throw new Error(`Missing case study: ${slug}`);
  return study;
}

export const caseStudyDetails: CaseStudyDetail[] = [
  {
    ...base("flowops"),
    headline: "One operational view for faster, calmer decisions across the network",
    intro:
      "FlowOps brought dispatch, capacity, tracking and reporting into one connected platform, giving a distributed operations team the context to act without waiting for another update.",
    metrics: [
      { value: "42%", label: "faster dispatch decisions" },
      { value: "06", label: "workflows brought together" },
      { value: "12", label: "weeks from discovery to launch" },
    ],
    timeline: "12-week product design and engineering engagement",
    team: "Product, design, cloud and data engineering",
    service: "Operations platform",
    techStack: ["Next.js", "Node.js", "PostgreSQL", "AWS", "Realtime APIs"],
    sections: [
      {
        number: "01",
        title: "The challenge",
        paragraphs: [
          "Daily decisions were spread across spreadsheets, calls and disconnected tracking tools. Dispatch teams could see parts of the operation, but never the full picture at the moment a decision had to be made.",
          "The product needed to connect live capacity, route status, ownership and reporting without forcing experienced teams into a rigid process. It also needed a technical foundation that could support new locations and automation later.",
          "That fragmentation created more than an efficiency problem. Teams were making time-sensitive calls from different versions of the truth, while managers only discovered recurring pressure points after the reporting cycle had closed.",
          "The brief was therefore not to add another dashboard. It was to create one dependable operational layer that could make complex information useful at the exact moment work changed.",
        ],
        image: {
          src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1800&q=88",
          alt: "Operational analytics displayed on a large dashboard",
        },
      },
      {
        number: "02",
        title: "What we did",
        paragraphs: [
          "We mapped the operational journey before designing screens. That work exposed where information stalled, which decisions needed live context and where automation would help without removing human control.",
          "The resulting platform combines a live dispatch board, capacity planning, exception handling and management reporting. Reusable modules and API-first integrations let the system grow without rebuilding the core workflow.",
          "Working sessions with dispatchers helped us reduce each view to the information needed for its next decision. Routine states remain quiet; delayed routes, capacity gaps and unresolved ownership move forward visually without creating alert fatigue.",
          "A shared event model keeps the board, reports and customer updates in sync. Instead of copying data between tools, teams now work from the same operational record while role-based permissions protect sensitive information.",
          "We released the platform in controlled stages, running real routes through the new workflow and using operator feedback to tune thresholds, terminology and hand-offs before broader rollout.",
          "The modular design also gave the internal team a repeatable pattern for new locations. They can configure operating rules locally while keeping shared data and reporting consistent across the network.",
          "At the centre of the experience is a live operating board that brings routes, capacity, exceptions and ownership into a single view. It is deliberately designed for scanning: the state of the network is clear in seconds, while deeper evidence remains one step away when an operator needs it.",
          "Capacity planning uses the same shared records as the dispatch view. Teams can test allocation changes against active commitments before publishing them, reducing the back-and-forth that previously happened across calls, messages and separate planning sheets.",
          "Exception handling was treated as a workflow rather than a notification feed. Every issue has an owner, an agreed next action and a visible history, so responsibility stays clear as work moves between shifts or locations.",
          "Management reporting now grows directly from operational activity instead of being assembled again at the end of the week. Leaders can move from a network-level measure to the routes and events behind it without waiting for a separate reconciliation cycle.",
          "The integration layer connects tracking providers, internal systems and customer-facing updates through a consistent API contract. New data sources can be added without changing the way teams work inside the product.",
          "We also designed for imperfect connectivity and incomplete inputs. Clear freshness indicators, recoverable actions and explicit system states help operators understand what the platform knows, what is still syncing and where manual confirmation is required.",
          "Performance testing focused on the moments when the operation is under the most pressure. The board remains responsive as live events arrive, reports are generated in the background and multiple teams act on the same route at once.",
          "Documentation and component patterns were delivered alongside the product so the internal team could extend the system confidently. That shared foundation keeps new workflows visually consistent and technically compatible with the operating model already in place.",
        ],
        image: {
          src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1800&q=88",
          alt: "Laptop showing a business performance dashboard",
        },
      },
      {
        number: "03",
        title: "The outcome",
        paragraphs: [
          "Teams now work from one current operational picture. Dispatch decisions take less time, hand-offs are clearer and leaders can identify pressure points before they become service issues.",
          "The platform also created a dependable base for the next phase: predictive capacity planning, automated exception routing and deeper customer reporting.",
          "Most importantly, the product has become part of the daily operating rhythm. It supports experienced judgement with clearer context instead of asking teams to work around the software.",
          "A single source of operational truth has also made performance conversations more useful. Teams can review the same events, understand why a decision was made and improve the underlying process rather than debating which report is correct.",
          "Dispatchers now begin each shift with a current view of active work, emerging constraints and unresolved exceptions. The time previously spent rebuilding context is available for decisions that protect service quality.",
          "Because ownership and history travel with every exception, hand-offs no longer depend on a separate message or an individual remembering the last conversation. The next operator can see what changed, why it changed and what needs to happen next.",
          "Leaders have also gained an earlier view of systemic issues. Recurring capacity gaps and route patterns surface while there is still time to respond, rather than appearing for the first time in an end-of-period report.",
          "The platform has been adopted without flattening the practical differences between locations. Shared rules create dependable reporting, while configurable workflows allow each operation to retain the decisions that genuinely need local judgement.",
          "With the core workflow established, the roadmap can now move toward prediction and selective automation from a reliable base. Every new capability will inherit the same operating context, audit trail and human controls already used by the team.",
        ],
      },
    ],
    quote:
      "The strongest operational software does not add another dashboard. It removes uncertainty from the decisions teams already make every day.",
  },
  {
    ...base("nexa-ai"),
    headline: "From queued requests to review-ready AI workflows",
    intro:
      "Nexa AI connects business data, internal tools and human approvals in an observable workspace built for real operational work.",
    metrics: [
      { value: "3.4×", label: "faster reporting cycle" },
      { value: "07", label: "connected business tools" },
      { value: "100%", label: "critical actions reviewable" },
    ],
    timeline: "10-week workflow discovery and production build",
    team: "AI, product, integration and platform engineering",
    service: "Agentic AI",
    techStack: ["Python", "LLMs", "Vector DB", "Azure", "Next.js"],
    sections: [
      {
        number: "01",
        title: "The challenge",
        paragraphs: [
          "High-value requests waited in shared queues while teams collected context from several systems, prepared reports and routed decisions for approval. Existing automation handled isolated tasks but could not carry a workflow from intent to reviewed action.",
          "The new system had to reason across business data while staying transparent. Every recommendation needed a source, every tool action needed a trace and sensitive steps needed a clear human approval point.",
          "Different teams had also developed their own templates and routing habits. Any shared solution needed to preserve domain judgement while establishing one reliable way to inspect, approve and measure automated work.",
          "The challenge was as much operational as technical: introduce meaningful autonomy without creating a black box or moving risk further downstream.",
        ],
        image: {
          src: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1800&q=88",
          alt: "Abstract connected artificial intelligence network",
        },
      },
      {
        number: "02",
        title: "What we did",
        paragraphs: [
          "We started with opportunity mapping, selecting workflows where speed mattered and the available data could support a dependable outcome. Each workflow was then broken into reasoning, retrieval, tool-use and approval stages.",
          "We built an orchestration layer with grounded retrieval, structured outputs, action guardrails and complete traces. Operators can see what the system used, why it proposed an action and where a person approved or changed the result.",
          "A common workflow contract separates business policy from model behaviour. Teams can adjust decision rules, required evidence and approval thresholds without rebuilding the orchestration layer.",
          "Retrieval is scoped by role and task, so the system only receives the context it needs. Citations and confidence signals travel with each result, giving reviewers a fast route back to the underlying source.",
          "We added evaluation sets around the most consequential decisions and tested them continuously as prompts, models and connected tools changed. This made quality visible before a workflow reached production.",
          "The interface was designed around exceptions rather than chat. Work arrives as structured, review-ready cases with a clear history, proposed action and explicit place for human judgement.",
        ],
        image: {
          src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1800&q=88",
          alt: "Secure cloud infrastructure in a data centre",
        },
      },
      {
        number: "03",
        title: "The outcome",
        paragraphs: [
          "Routine reporting and triage now move through a consistent workflow instead of a manual queue. Teams receive prepared, evidence-linked work and spend their time reviewing decisions rather than gathering inputs.",
          "Because the platform records every step, the organisation can improve prompts, tools and policies with evidence instead of guesswork.",
          "The same foundation is now being reused for adjacent workflows, allowing the organisation to expand carefully without creating a separate AI stack for every team.",
        ],
      },
    ],
    quote:
      "Useful agentic AI is not the most autonomous system. It is the system a team can understand, review and trust in production.",
  },
  {
    ...base("core-erp"),
    headline: "One connected system for the work behind the business",
    intro:
      "CoreERP replaced disconnected finance, inventory, people and reporting workflows with a modular platform built around ownership and reliable data.",
    metrics: [
      { value: "99.9%", label: "platform availability" },
      { value: "05", label: "core modules connected" },
      { value: "16", label: "weeks to first release" },
    ],
    timeline: "16-week phased ERP implementation",
    team: "Business analysis, product and platform engineering",
    service: "ERP services",
    techStack: ["React", "Node.js", "SQL", "Cloud", "REST APIs"],
    sections: [
      {
        number: "01",
        title: "The challenge",
        paragraphs: [
          "As the business expanded across locations, critical processes accumulated in separate spreadsheets and specialised tools. Teams repeated data entry, reports disagreed and leaders waited for reconciled numbers before acting.",
          "A replacement system had to respect the way each department worked while creating shared definitions, permissions and reporting across the organisation.",
          "Previous attempts to standardise the process had added more forms without resolving ownership. Staff needed a system that reflected real work, including the exceptions that rarely fit a generic ERP flow.",
          "The implementation also had to progress without a disruptive big-bang migration or a long period in which neither the old nor new record could be trusted.",
        ],
        image: {
          src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1800&q=88",
          alt: "Team reviewing business systems and reports together",
        },
      },
      {
        number: "02",
        title: "What we did",
        paragraphs: [
          "We modelled the organisation around shared records and explicit ownership, then released the platform in modules so teams could adopt it without interrupting day-to-day operations.",
          "Finance, inventory, people operations and management reporting now use one permission model and one integration layer. Role-specific workspaces keep each team focused while shared data stays consistent underneath.",
          "Process mapping sessions identified the source of truth for every critical record, who could change it and which downstream teams depended on that change. Those decisions shaped both the data model and the interface.",
          "We introduced migration checks and side-by-side reporting before each module went live. Teams could verify real balances, stock movements and approvals before retiring the corresponding legacy workflow.",
          "Reusable approval, audit and notification services keep behaviour consistent across modules. New workflows inherit those controls instead of rebuilding them in isolation.",
          "A role-based home view gives each person the tasks, exceptions and measures relevant to their day while maintaining a connected operational picture for leadership.",
        ],
        image: {
          src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1800&q=88",
          alt: "Cross-functional team planning a connected business platform",
        },
      },
      {
        number: "03",
        title: "The outcome",
        paragraphs: [
          "Recurring reconciliation work dropped, reporting became available earlier and teams gained a clear record of ownership for operational changes.",
          "The modular architecture gives the business room to add locations, workflows and integrations without turning the ERP into another difficult legacy system.",
          "Teams now spend less time validating the system and more time acting on what it shows, with a rollout model the business can repeat as operations continue to grow.",
        ],
      },
    ],
    quote:
      "An ERP succeeds when the organisation gains one dependable operating language without losing the practical workflows that make each team effective.",
  },
];

export function getCaseStudyDetail(slug: string) {
  return caseStudyDetails.find((study) => study.slug === slug);
}
