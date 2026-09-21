import type { ServiceDetailData } from "../types";

export const agenticAIContent: ServiceDetailData = {
  label: "Agentic AI Development",
  slug: "agentic-ai-development",
  eyebrow: "AI systems",
  headline: "AI that plans, acts and moves work forward.",
  lede: "We design dependable AI agents that understand context, coordinate tools and complete multi-step work with the right human oversight.",
  primaryCta: "Discuss your workflow",
  proof: [
    { value: "Workflow-first", label: "Designed around real operations" },
    { value: "Human-in-loop", label: "Oversight where risk matters" },
    { value: "Stack-ready", label: "Connected to existing systems" },
    { value: "Client-owned", label: "Clear handover and documentation" },
  ],
  problem: {
    title: "The real bottleneck is work between the tools.",
    intro:
      "Teams lose time interpreting requests, finding context, moving information and chasing the next action. Traditional automation handles fixed rules; agentic systems help when the work changes from case to case.",
    items: [
      {
        title: "Decisions wait in queues",
        text: "Routine classification, prioritisation and routing still depend on people who should be handling higher-value judgement.",
      },
      {
        title: "Knowledge stays fragmented",
        text: "The right answer exists across documents, messages and systems, but it is difficult to retrieve at the moment of action.",
      },
      {
        title: "Handoffs break momentum",
        text: "Work stalls while teams copy data, request approvals and remember which system needs updating next.",
      },
      {
        title: "Rigid automation reaches its limit",
        text: "Rule-based scripts work for predictable inputs, then fail when context, exceptions or priorities change.",
      },
    ],
  },
  capabilities: {
    title: "What we design, build and operate.",
    intro:
      "A complete agentic system - from selecting the right workflow to production monitoring - built around measurable business value.",
    items: [
      {
        title: "Agent opportunity mapping",
        text: "Identify the workflows where autonomy can remove meaningful cost, delay or inconsistency.",
      },
      {
        title: "Knowledge and retrieval",
        text: "Ground agents in approved documents, business data and evidence your team can inspect.",
      },
      {
        title: "Agent orchestration",
        text: "Coordinate specialised agents, tools and approvals across a complete business process.",
      },
      {
        title: "Systems integration",
        text: "Connect agents to CRM, ERP, data platforms, documents and internal APIs.",
      },
      {
        title: "Evaluation and AgentOps",
        text: "Measure quality, trace decisions, monitor production behaviour and improve safely over time.",
      },
    ],
  },
  useCases: {
    title: "Where agents create practical value.",
    intro:
      "The best use cases combine repeated decisions, multiple information sources and clear boundaries for action.",
    items: [
      {
        title: "Request triage and routing",
        text: "Understand incoming requests, gather the right context and send each case to the right owner.",
      },
      {
        title: "Research and synthesis",
        text: "Search across approved sources and produce decision-ready briefs with traceable evidence.",
      },
      {
        title: "Document-heavy operations",
        text: "Extract, validate and move information across contracts, forms, claims and correspondence.",
      },
      {
        title: "Customer and employee support",
        text: "Resolve common requests end to end and escalate exceptions with a complete history.",
      },
    ],
  },
  process: {
    title: "A controlled path from opportunity to production.",
    intro:
      "We begin with one valuable workflow, prove it against real conditions and expand only after the system earns trust.",
    steps: [
      {
        title: "Discover",
        text: "Map the workflow, decisions, data, users and failure cost.",
        output: "Opportunity brief",
      },
      {
        title: "Define",
        text: "Set the agent boundary, success measures, permissions and human checkpoints.",
        output: "System blueprint",
      },
      {
        title: "Prototype",
        text: "Test a working slice against real documents, tools and edge cases.",
        output: "Validated proof",
      },
      {
        title: "Productionise",
        text: "Build integrations, evaluation, observability and operational controls.",
        output: "Working release",
      },
      {
        title: "Improve",
        text: "Review outcomes, tune performance and expand the next valuable capability.",
        output: "Measured roadmap",
      },
    ],
  },
  technology: {
    title: "Technology chosen around the system, not the trend.",
    intro:
      "We remain provider-flexible and select models, orchestration and infrastructure based on accuracy, security, cost and your existing stack.",
    groups: [
      { label: "Models", items: ["OpenAI", "Anthropic", "Google Gemini", "Open-source models"] },
      { label: "Orchestration", items: ["OpenAI Agents", "LangGraph", "LangChain", "CrewAI"] },
      {
        label: "Knowledge",
        items: ["RAG pipelines", "Vector databases", "Re-ranking", "Structured data"],
      },
      {
        label: "Production safeguards",
        items: ["Evaluation suites", "Tracing", "Role-based access", "Human approvals"],
      },
      { label: "Integration", items: ["REST APIs", "Webhooks", "CRM and ERP", "Cloud platforms"] },
    ],
  },
  readiness: {
    title: "Autonomy with the controls production demands.",
    intro:
      "Every agent is designed with observable decisions, measurable quality and clear boundaries around what it can do alone.",
    systemLabel: "Production control loop",
    items: [
      {
        marker: "Measure",
        title: "Evaluation baseline",
        text: "A repeatable test suite measures answer quality, tool use and task completion before release and after every meaningful change.",
      },
      {
        marker: "Constrain",
        title: "Guardrails and permissions",
        text: "Role-based access, tool constraints and policy checks limit each agent to approved data and actions.",
      },
      {
        marker: "Observe",
        title: "Traceable operation",
        text: "Traces, logs and reviewable evidence make important decisions and production behaviour visible to your team.",
      },
      {
        marker: "Approve",
        title: "Human control",
        text: "High-risk or ambiguous actions pause for approval with the relevant context already attached.",
      },
    ],
  },
  ownership: {
    title: "A working system your team can run, inspect and improve.",
    intro:
      "Delivery ends with operational clarity, useful documentation and a team equipped to own the next decision—not a black box that depends on us.",
    items: [
      {
        artifact: "Working system",
        title: "Production-ready workflows",
        text: "Deployed agent flows, integrations and approval paths configured around the agreed operating boundary.",
      },
      {
        artifact: "Control layer",
        title: "Evaluation and governance pack",
        text: "Test cases, quality measures, permission rules and escalation logic your team can review and evolve.",
      },
      {
        artifact: "Documentation",
        title: "Architecture and runbooks",
        text: "Clear system maps, operating guidance and response procedures for day-to-day ownership.",
      },
      {
        artifact: "Capability transfer",
        title: "Team enablement and handover",
        text: "Practical walkthroughs and knowledge transfer for the people who will operate, support and extend the system.",
      },
    ],
  },
  faqs: [
    {
      question: "Which workflow should we start with?",
      answer:
        "Start with a repeated workflow that consumes meaningful time, has accessible data and allows a clear success measure. We assess value, feasibility and risk before recommending the first release.",
    },
    {
      question: "How long does a first release take?",
      answer:
        "A focused prototype can often be tested in weeks. Production timing depends on integrations, data readiness, security controls and the reliability threshold required for the workflow.",
    },
    {
      question: "Will it integrate with our current systems?",
      answer:
        "Yes. Agents can connect with CRMs, ERPs, document stores, data platforms and internal APIs. Integration and permissions are part of the system design, not an afterthought.",
    },
    {
      question: "How do you control incorrect actions?",
      answer:
        "We limit permissions, ground decisions in approved data, test against known cases and insert human approval wherever the cost of an incorrect action is meaningful.",
    },
    {
      question: "Who owns the solution after launch?",
      answer:
        "You do. We provide documentation, handover and operating guidance, with optional ongoing monitoring and improvement support.",
    },
  ],
  cta: {
    title: "Start with the workflow that costs you the most.",
    text: "Share the process, the bottleneck and the outcome you need. We will help determine whether an agent is the right answer and what a safe first release should include.",
    button: "Talk to our team",
  },
};
