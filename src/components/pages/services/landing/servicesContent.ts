export const serviceDetails = [
  {
    label: "Agentic AI Development",
    code: "AI systems",
    outcome: "Turn complex, repetitive decisions into reliable assisted workflows.",
    capabilities: ["AI agents", "Knowledge systems", "Workflow automation"],
  },
  {
    label: "Cloud Consulting",
    code: "Infrastructure",
    outcome: "Build a secure foundation that stays resilient as the business grows.",
    capabilities: ["Cloud architecture", "Migration", "DevOps and reliability"],
  },
  {
    label: "Mobile Application Development",
    code: "Mobile products",
    outcome: "Create focused mobile experiences people can depend on every day.",
    capabilities: ["Product strategy", "iOS and Android", "Ongoing improvement"],
  },
  {
    label: "ERP Services",
    code: "Core operations",
    outcome: "Connect teams, processes and reporting around one dependable system.",
    capabilities: ["Tailored ERP", "System integration", "Operational reporting"],
  },
  {
    label: "SEO / Digital Marketing",
    code: "Digital growth",
    outcome: "Make the right business easier to discover, understand and choose.",
    capabilities: ["Technical SEO", "Content systems", "Campaign measurement"],
  },
  {
    label: "Website Solutions",
    code: "Web platforms",
    outcome: "Ship fast, accessible websites built around real business goals.",
    capabilities: ["UX and engineering", "Web applications", "Performance"],
  },
] as const;

export const problems = [
  ["Manual work is slowing the team", "Automation, AI and connected workflows"],
  ["Legacy systems cannot keep up", "Cloud modernization and platform engineering"],
  ["Business data lives in silos", "ERP, integrations and clearer reporting"],
  ["Customers struggle to engage", "Mobile and web product experiences"],
  ["Good work is difficult to discover", "Technical SEO and measurable growth"],
] as const;

export const stages = [
  ["Discover", "We learn the operation, the people using it and the constraint worth solving.", "Shared brief"],
  ["Define", "We shape a useful first release, clear measures and a practical delivery plan.", "Release plan"],
  ["Design", "Flows, interfaces and architecture are resolved together—not in separate rooms.", "Tested direction"],
  ["Build", "Small releases, visible progress and frequent decisions keep the work grounded.", "Working releases"],
  ["Improve", "After launch, we measure what changed and strengthen what matters next.", "Measured roadmap"],
] as const;

export const faqs = [
  ["Can you improve an existing product?", "Yes. We can audit, stabilize and extend an existing system, or plan a careful modernization without interrupting the business around it."],
  ["Do you work with internal technology teams?", "Yes. We can lead a complete delivery or work alongside your product, engineering and operations teams with clear ownership on both sides."],
  ["How is a project scoped?", "We start with the business objective and current constraints, then define the smallest useful release. Scope, assumptions and decision points are made visible before delivery begins."],
  ["What happens after launch?", "We support handover, monitoring and ongoing improvement. The engagement can continue as a focused product partnership or close with documented ownership transferred to your team."],
] as const;
