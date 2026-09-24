import type { IndustryDetailData } from "../types";

export const automationContent: IndustryDetailData = {
  label: "Automation",
  slug: "automation",
  kicker: "Industries — Automation",
  hero: {
    headline: "Run cells and fleets without guesswork.",
    lede: "We build software that connects robots, sensors, and operators — live status, clear alerts, and code in your repos.",
    primaryCta: "Get a build plan",
    stats: [
      { value: "Live view", label: "Cell and fleet status" },
      { value: "Traceable", label: "Sensor-to-action logs" },
      { value: "Maintainable", label: "Documented code, your repos" },
      { value: "Supported", label: "Handover and runbooks" },
    ],
    ticker: [
      "PLC integration",
      "Robot fleets",
      "Sensor pipelines",
      "Vision inspection",
      "Status dashboards",
      "Work triggers",
      "Downtime alerting",
      "Audit logs",
    ],
  },
  landscape: {
    title: "Automation shops run mixed systems.",
    intro:
      "Plants combine new robots with old controllers, separate dashboards, and manual checks. Software has to tie them together.",
    forces: [
      {
        title: "Mixed fleets",
        text: "Different robot brands, controllers, and vintages run side by side. Integration work never stops.",
      },
      {
        title: "Sensor overload",
        text: "Cells stream temperature, vibration, and cycle data. Operators need signals, not raw feeds.",
      },
      {
        title: "Labor gaps",
        text: "Fewer technicians cover more cells. Dashboards and alerts have to carry more of the load.",
      },
      {
        title: "Audit pressure",
        text: "Customers and regulators ask for traceable actions. Logs must show what happened and when.",
      },
    ],
    opportunities: [
      {
        title: "Connect the cell",
        text: "Link PLCs, robots, and sensors into one operational view — action from a single screen.",
      },
      {
        title: "Catch defects early",
        text: "Vision and sensor checks at the station stop bad parts before they move downstream.",
      },
      {
        title: "Standardize response",
        text: "Turn tribal fixes into defined workflows — every shift follows the same downtime playbook.",
      },
    ],
  },
  challenges: {
    title: "What slows automation teams.",
    intro:
      "Most delays come from disconnected tools and unclear ownership, not hardware.",
    items: [
      {
        title: "Blind cells",
        text: "Status lives on local HMIs or vendor tools. Supervisors cannot see the full floor at once.",
      },
      {
        title: "Noisy alerts",
        text: "Sensors fire too many unranked warnings. Technicians ignore them or chase the wrong fault.",
      },
      {
        title: "Manual handoffs",
        text: "Downtime, maintenance, and quality updates move by radio and paper. Actions get lost between shifts.",
      },
      {
        title: "Fragile integrations",
        text: "One-off scripts connect robots and databases. Small changes break the whole chain.",
      },
      {
        title: "No defect trace",
        text: "Vision results and rework notes sit apart. Teams cannot prove what was checked.",
      },
    ],
  },
  howWeHelp: {
    title: "How Jabisoft helps Automation.",
    intro:
      "We build in your repos alongside your controls and ops teams. You keep the code, docs, and integrations.",
    items: [
      {
        title: "We build fleet software",
        text: "We build fleet dashboards, job controls, and operator views matched to your floor — run daily by your team.",
        tags: ["Dashboards", "Job controls", "Operator views"],
      },
      {
        title: "We pipe sensor data",
        text: "We ingest PLC, SCADA, and sensor streams into clean stores — reliable inputs for alerts.",
        tags: ["Ingestion", "Clean stores", "Alert inputs"],
      },
      {
        title: "We tool vision inspection",
        text: "We build capture, review, and disposition apps around your cameras — quality clears parts faster.",
        tags: ["Capture", "Review queues", "Disposition"],
      },
      {
        title: "We encode workflows",
        text: "We turn downtime, maintenance, and escalation steps into working software — one process every shift.",
        tags: ["Playbooks", "Task queues", "Escalations"],
      },
      {
        title: "We set up cloud and edge",
        text: "We set up cloud services, edge gateways, and access controls — a clear system your IT manages.",
        tags: ["Gateways", "Access controls", "Cloud"],
      },
      {
        title: "We replace fragile scripts",
        text: "We swap one-off scripts for tested services with docs — change integrations without fear.",
        tags: ["Tested services", "Docs", "Support"],
      },
    ],
  },
  useCases: {
    title: "Automation builds we ship.",
    intro:
      "Practical systems for floors running robots, sensors, and manual stations.",
    items: [
      {
        title: "Robot fleet dashboards",
        text: "One view for robot state, jobs, and faults across cells — assign work and clear stops.",
        points: ["Fleet status and queue", "Faults with context", "Role-based views"],
      },
      {
        title: "Sensor monitoring",
        text: "PLC and sensor streams feeding thresholds and trends — drift spotted before lines stop.",
        points: ["Thresholds and trends", "Ranked routing", "History search"],
      },
      {
        title: "Workflow orchestration",
        text: "Downtime and maintenance steps as defined tasks — handoffs with owner, time, and notes.",
        points: ["Downtime playbooks", "Task queues", "Handover records"],
      },
      {
        title: "Vision inspection",
        text: "Operators review images, accept or reject, log reasons — quality keeps a complete record.",
        points: ["Image review queue", "Accept and reject reasons", "History export"],
      },
      {
        title: "Downtime response",
        text: "Stops page the right technician with machine context — response and resolution logged.",
        points: ["Stop detection", "Context attached", "Resolution log"],
      },
      {
        title: "Performance analytics",
        text: "Cycle counts, stops, and rework feeding simple reports — standups run on facts.",
        points: ["Cycle summaries", "Rework tracking", "Cell comparison"],
      },
    ],
  },
  businessImpact: {
    title: "After Jabisoft, floors share one picture.",
    intro:
      "No invented numbers — each outcome below is made measurable in the product and reviewed with your team.",
    dimensions: [
      {
        name: "Cells stay visible",
        before: "Status in separate vendor tools",
        text: "Teams see cells, robots, and jobs in one dashboard — no more tool-hopping.",
        tag: "Visibility",
      },
      {
        name: "Stops get owners",
        before: "Downtime by radio and memory",
        text: "Stops route to the right owner with context attached — response starts immediately.",
        tag: "Response",
      },
      {
        name: "Quality stays linked",
        before: "Notes apart from parts",
        text: "Vision reviews and dispositions stay linked to each lot — proof on demand.",
        tag: "Quality",
      },
      {
        name: "Crews work queues",
        before: "Shift-dependent tasks",
        text: "Maintenance works defined queues with clear ownership — nothing depends on who is on.",
        tag: "Reliability",
      },
      {
        name: "Systems stay extensible",
        before: "Scripts break on change",
        text: "Services use tested interfaces your team extends — integrations stop being fragile.",
        tag: "Engineering",
      },
      {
        name: "Knowledge stays yours",
        before: "Vendors hold code and know-how",
        text: "Your repos hold the code, docs, and runbooks — independence by default.",
        tag: "Ownership",
      },
    ],
  },
  cta: {
    title: "Show us your floor and your stack.",
    text: "We review your cells, robots, and current tools, then propose a build in your repos — with the engineers who will ship it.",
    button: "Talk to Our Experts",
    secondaryButton: "Start a Conversation",
  },
};
