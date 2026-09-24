import type { IndustryDetailData } from "../types";

export const manufacturingContent: IndustryDetailData = {
  label: "Manufacturing",
  slug: "manufacturing",
  kicker: "Industries — Manufacturing",
  hero: {
    headline: "Keep lines running on clear data.",
    lede: "We build production tracking, quality inspection, and maintenance tools inside your repos — alongside your plant systems.",
    primaryCta: "Get a build plan",
    stats: [
      { value: "Line-visible", label: "Live production tracking" },
      { value: "Quality-assisted", label: "Visual inspection support" },
      { value: "Failure-aware", label: "Early warning signals" },
      { value: "In your repos", label: "Your team owns the code" },
    ],
    ticker: [
      "Production tracking",
      "Quality inspection",
      "Predictive maintenance",
      "Inventory control",
      "Order scheduling",
      "Downtime alerts",
      "Work instructions",
      "Scrap reduction",
    ],
  },
  landscape: {
    title: "Plants run on uptime.",
    intro:
      "Orders shift, machines age, and parts arrive late. Most plants still track this in paper logs and disconnected systems.",
    forces: [
      {
        title: "Aging equipment",
        text: "Machines fail without warning and stop lines. Teams need early signals from sensor and maintenance logs.",
      },
      {
        title: "Labor gaps",
        text: "Experienced operators retire and new staff need guidance. Plants need clear instructions and alerts.",
      },
      {
        title: "Supply disruption",
        text: "Late parts and material swaps force rescheduling. Planners need live inventory and order views.",
      },
      {
        title: "Quality pressure",
        text: "Customers reject defects and require traceability. Manual inspection misses issues and slows throughput.",
      },
    ],
    opportunities: [
      {
        title: "Floor visibility",
        text: "Live tracking of orders, stations, and downtime shows where work stands — action on facts, not walkarounds.",
      },
      {
        title: "Inspection support",
        text: "Vision models flag defects at the station for human review — earlier catches, less rework.",
      },
      {
        title: "Planned maintenance",
        text: "Sensor and log data points to machines needing attention — service before lines stop.",
      },
    ],
  },
  challenges: {
    title: "What breaks on the plant floor.",
    intro:
      "Manufacturers lose time to blind spots between machines, people, and systems.",
    items: [
      {
        title: "No live production view",
        text: "Order status lives on whiteboards and shift reports. Bottlenecks surface after orders slip.",
      },
      {
        title: "Manual quality checks",
        text: "Operators inspect by eye under time pressure. Defects pass through into scrap or rejects.",
      },
      {
        title: "Unplanned downtime",
        text: "Machines stop without warning and maintenance scrambles. Lines sit idle during diagnosis.",
      },
      {
        title: "Parts shortages",
        text: "Material levels tracked by hand or stale ERP data. Jobs start without full kits and stall mid-run.",
      },
      {
        title: "Rigid scheduling",
        text: "Schedules live in spreadsheets that break on changeovers. Rush orders mean manual replanning.",
      },
    ],
  },
  howWeHelp: {
    title: "How Jabisoft helps Manufacturing.",
    intro:
      "We build in your repos and integrate with your MES, ERP, and shop systems — everything maintainable by your engineers.",
    items: [
      {
        title: "We track production live",
        text: "We build order and station tracking on your shop data — status, WIP, and blockers in one view.",
        tags: ["Tracking", "Dashboards", "Alerts"],
      },
      {
        title: "We add vision inspection",
        text: "We build camera inspection helpers trained on your defect types — flags at the station for fast review.",
        tags: ["Vision models", "Review queues", "Traceability"],
      },
      {
        title: "We catch machine issues early",
        text: "We read sensor and maintenance logs for warning signs — alerts before failures stop lines.",
        tags: ["Signal monitoring", "Work queues", "History views"],
      },
      {
        title: "We control parts flow",
        text: "We build inventory and kitting tools linked to jobs and BOMs — shortages visible before launch.",
        tags: ["Kitting", "Low-stock alerts", "Job links"],
      },
      {
        title: "We connect plant systems",
        text: "We integrate MES, ERP, and shop devices through clean APIs — data flows without manual entry.",
        tags: ["APIs", "Integrations", "Cloud"],
      },
      {
        title: "We modernize legacy apps",
        text: "We upgrade plant dashboards and reporting without ripping out core systems — uptime preserved.",
        tags: ["Migration", "Dashboards", "Support"],
      },
    ],
  },
  useCases: {
    title: "Manufacturing builds we ship.",
    intro:
      "Builds for supervisors, operators, and planners — fitted to your equipment and your stack.",
    items: [
      {
        title: "Production tracking",
        text: "Live views of orders, stations, and output by shift — bottlenecks handled during the shift.",
        points: ["Order and station status", "Shift output views", "Bottleneck alerts"],
      },
      {
        title: "Quality inspection",
        text: "Vision support flagging surface and assembly defects — clear pass and fail queues for inspectors.",
        points: ["Defect image review", "Camera integration", "Traceability logs"],
      },
      {
        title: "Predictive maintenance",
        text: "Warning signals from vibration, temperature, and log patterns — prioritized work lists.",
        points: ["Signal monitoring", "Work queue", "Failure history"],
      },
      {
        title: "Inventory control",
        text: "Parts and material tracking linked to jobs — shortages visible before jobs launch.",
        points: ["Job-linked views", "Low-stock warnings", "Kitting checklists"],
      },
      {
        title: "Order scheduling",
        text: "Scheduling that respects changeovers and capacity — fast adjustments when orders change.",
        points: ["Capacity planning", "Changeover handling", "Change log"],
      },
      {
        title: "Downtime alerts",
        text: "Stoppage detection with floor-entered reason codes — cause and duration in real time.",
        points: ["Stoppage detection", "Reason codes", "Downtime reports"],
      },
    ],
  },
  businessImpact: {
    title: "After Jabisoft, the floor runs on facts.",
    intro:
      "No invented numbers — each outcome below is made measurable in the product and reviewed with your team.",
    dimensions: [
      {
        name: "Status stays visible",
        before: "Shift notes and walkarounds",
        text: "Live boards show orders and station states. Supervisors direct work with current data.",
        tag: "Tracking",
      },
      {
        name: "Defects get caught",
        before: "Manual checks miss issues",
        text: "Inspection support flags suspect parts at the station — before shipment, not after.",
        tag: "Quality",
      },
      {
        name: "Service beats breakdowns",
        before: "No-warning stoppages",
        text: "Early signals trigger planned service. Maintenance fixes machines on schedule.",
        tag: "Uptime",
      },
      {
        name: "Jobs start complete",
        before: "Mid-run parts stalls",
        text: "Parts views tie inventory to open jobs. Handlers kit complete jobs on time.",
        tag: "Materials",
      },
      {
        name: "Plans survive rush orders",
        before: "Spreadsheet replanning",
        text: "Schedulers adjust capacity and changeovers fast — and publish workable updates.",
        tag: "Planning",
      },
      {
        name: "Stops get answered",
        before: "Idle waits for information",
        text: "Alerts show stoppage cause and location. Teams respond with clear assignments.",
        tag: "Response",
      },
    ],
  },
  cta: {
    title: "Bring us your toughest line problem.",
    text: "We study your workflow and systems, then build the fix in your repos. Your team owns the result.",
    button: "Talk to Our Experts",
    secondaryButton: "Start a Conversation",
  },
};
