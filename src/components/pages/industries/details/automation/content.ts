import type { IndustryDetailData } from "../types";

export const automationContent: IndustryDetailData = {
  label: "Robotics & Automation", slug: "automation", kicker: "Robotics & automation software",
  hero: {
    headline: "Run robots and automated operations without guesswork.",
    lede: "From robot management and real-time monitoring to workflow automation and system integrations, we build the software that connects machines, people, and operations.",
    primaryCta: "Discuss your automation project", secondaryCta: "See what we build",
    stats: [
      { value: "Robotics", label: "Robot & fleet management" },
      { value: "Automation", label: "Workflow orchestration" },
      { value: "Monitoring", label: "Real-time status & alerts" },
      { value: "Integrations", label: "Machines, software & APIs" },
    ],
    ticker: ["Robot management", "Workflow automation", "Real-time monitoring", "Fleet control", "System integration", "Telemetry", "Alerts", "Operator dashboards", "Data & analytics", "Remote operations"],
  },
  landscape: {
    title: "Automation depends on connected systems.",
    intro: "Robots, sensors, machines, business applications, and people often operate across different systems. The real challenge is making them communicate, coordinate, and respond as one operation.",
    opportunityTitle: "Connect the physical and digital operation.",
    forces: [
      { title: "Mixed technology", text: "Automation environments often combine hardware, software, sensors, APIs, and legacy systems from different vendors." },
      { title: "Disconnected operations", text: "When systems don't communicate clearly, teams spend more time coordinating tasks and resolving exceptions manually." },
      { title: "Limited visibility", text: "Operators need a reliable view of robot status, tasks, faults, utilisation, and operational performance." },
      { title: "Manual intervention", text: "Automation loses value when routine exceptions, assignments, approvals, and updates still require unnecessary human coordination." },
    ],
    opportunities: [
      { title: "Connected control", text: "Bring robots, machines, workflows, and operational systems into coordinated software experiences." },
      { title: "Real-time visibility", text: "Give operators clearer insight into status, activity, faults, and operational events." },
      { title: "Workflow orchestration", text: "Coordinate tasks, rules, systems, and human actions through structured automation workflows." },
    ],
  },
  challenges: {
    title: "What creates friction in automated operations.",
    intro: "Automation becomes harder to manage when machines, software, workflows, and operational data evolve independently.",
    items: [
      { title: "Disconnected systems", text: "Robots, machines, sensors, and business applications operate separately instead of sharing information through connected workflows." },
      { title: "Noisy alerts", text: "Too many unstructured alerts make it difficult for operators to identify what actually requires attention." },
      { title: "Manual handoffs", text: "Automated processes still depend on people transferring information or triggering the next step manually." },
      { title: "Fragile integrations", text: "Point-to-point connections become difficult to maintain as hardware, applications, and operational requirements change." },
      { title: "Limited operational visibility", text: "Without a unified view, teams struggle to understand robot status, workflow progress, faults, and system performance." },
    ],
  },
  howWeHelp: {
    title: "How Jabitsoft helps robotics & automation teams.",
    intro: "We build the software that connects automated equipment with operators, workflows, data, and the business systems around it.",
    items: [
      { title: "We build robot management platforms", text: "Create software for robot status, assignments, activity, availability, faults, and operational oversight." },
      { title: "We connect machines and software", text: "Integrate robotics and automation systems with supported APIs, business applications, databases, cloud platforms, and operational software." },
      { title: "We build operator interfaces", text: "Give operators clear dashboards and control experiences for monitoring activity, responding to events, and managing workflows." },
      { title: "We automate operational workflows", text: "Coordinate rules, tasks, notifications, approvals, system actions, and human intervention across automated processes." },
      { title: "We make automation observable", text: "Capture operational events and telemetry to support dashboards, alerts, reporting, diagnostics, and performance analysis." },
      { title: "We design for evolving systems", text: "Build modular software and integration layers that can adapt as equipment, workflows, and operational requirements change." },
    ],
  },
  useCases: {
    title: "Robotics & automation software we build.",
    intro: "From robot management and operator interfaces to monitoring and orchestration, we build the software layer around automated operations.",
    items: [
      { title: "Robot & Fleet Management", text: "Manage robot availability, assignments, task status, utilisation, exceptions, and operational activity from a central platform.", points: ["Robotics", "Fleet", "Operations"] },
      { title: "Real-Time Monitoring", text: "Track machine and robot status, operational events, faults, telemetry, and performance through live dashboards.", points: ["Monitoring", "Telemetry", "Alerts"] },
      { title: "Workflow Orchestration", text: "Coordinate automated tasks, business rules, system actions, and human intervention across complex workflows.", points: ["Automation", "Workflows", "Rules"] },
      { title: "Operator Control Interfaces", text: "Build intuitive interfaces that help operators monitor systems, manage tasks, review events, and respond to exceptions.", points: ["UX", "Control", "Operations"] },
      { title: "Automation Integrations", text: "Connect robotics platforms, machines, sensors, databases, cloud services, ERP, and other supported systems.", points: ["APIs", "Integration", "Connected Systems"] },
      { title: "Alerts & Exception Management", text: "Turn system events into structured alerts, escalation workflows, assignments, and resolution processes.", points: ["Alerts", "Exceptions", "Automation"] },
    ],
  },
  businessImpact: {
    title: "After Jabitsoft, automation becomes easier to operate.",
    intro: "Connected software gives teams clearer visibility into robots, workflows, exceptions, and the systems keeping automated operations moving.",
    dimensions: [
      { name: "System status becomes visible", before: "Status spread across tools", text: "Give teams a clearer view of robot, machine, task, and workflow status from connected interfaces.", tag: "Visibility" },
      { name: "Exceptions get attention faster", before: "Unstructured alerts", text: "Structured alerts help operators identify, assign, and respond to issues that actually require intervention.", tag: "Alerts" },
      { name: "Workflows stay connected", before: "Disconnected process steps", text: "Coordinate automated processes with the people and business systems required to complete them.", tag: "Workflows" },
      { name: "Manual handoffs decrease", before: "Repetitive coordination", text: "Replace repetitive coordination and system updates with structured automated workflows.", tag: "Automation" },
      { name: "Integrations become easier to manage", before: "Fragile point-to-point connections", text: "Use clearer integration layers to connect automation systems with the software surrounding them.", tag: "Integrations" },
      { name: "Operational data becomes useful", before: "Events without context", text: "Turn events, telemetry, task history, and system activity into dashboards, reporting, and operational insight.", tag: "Data" },
    ],
  },
  cta: {
    title: "Bring us your toughest automation challenge.",
    text: "Disconnected robots. Manual handoffs. Limited visibility. Fragile integrations. Too many systems to monitor. We'll help turn the complexity around your automation into software that's easier to operate and evolve.",
    button: "Discuss your project", secondaryButton: "Talk to our team",
  },
};
