import type { IndustryDetailData } from "../types";

export const logisticsContent: IndustryDetailData = {
  label: "Logistics",
  slug: "logistics",
  kicker: "Industries — Logistics",
  hero: {
    headline: "Move loads with clear dispatch control.",
    lede: "We build dispatch, tracking, and billing software for carriers and brokers — every load, driver, and invoice in one place.",
    primaryCta: "Get a build plan",
    stats: [
      { value: "Live view", label: "Load and driver tracking" },
      { value: "Connected", label: "TMS and telematics links" },
      { value: "Auditable", label: "Rate-to-invoice trail" },
      { value: "In your repos", label: "Your team owns the code" },
    ],
    ticker: [
      "Dispatch boards",
      "Route planning",
      "Driver messaging",
      "GPS tracking",
      "Warehouse tasks",
      "Proof-of-delivery",
      "Rate automation",
      "Delay alerts",
    ],
  },
  landscape: {
    title: "Logistics runs on thin margins.",
    intro:
      "Brokers and carriers juggle phones, spreadsheets, TMS tools, and driver apps. Small misses turn into detention, claims, and late invoices.",
    forces: [
      {
        title: "Fragmented tools",
        text: "Quotes, dispatch, tracking, and billing live in different systems. Staff retype the same load data.",
      },
      {
        title: "Driver communication load",
        text: "Dispatchers chase updates by phone and text. Check calls eat the day.",
      },
      {
        title: "Visibility demands",
        text: "Shippers expect live ETAs and delivery proof. Manual updates no longer satisfy them.",
      },
      {
        title: "Billing leakage",
        text: "Accessorials and rate changes get missed. Invoices go out late or short.",
      },
    ],
    opportunities: [
      {
        title: "Unify the load lifecycle",
        text: "Connect quote, dispatch, track, and invoice around one load record — no retyping.",
      },
      {
        title: "Automate check-ins",
        text: "Pull GPS and milestone events into customer updates — dispatchers handle exceptions only.",
      },
      {
        title: "Clean up billing",
        text: "Tie rates, PODs, and accessorials to invoicing — faster billing, fewer disputes.",
      },
    ],
  },
  challenges: {
    title: "What slows logistics teams.",
    intro:
      "Most cost comes from manual coordination and missing proof, not trucks.",
    items: [
      {
        title: "Manual dispatch",
        text: "Loads get assigned by phone and spreadsheet. Coverage takes too long and errors slip in.",
      },
      {
        title: "Blind shipments",
        text: "Tracking links sit outside the TMS. Dispatchers cannot answer location without calling.",
      },
      {
        title: "Warehouse disconnects",
        text: "Dock appointments and tasks run apart from dispatch. Drivers wait and slots slip.",
      },
      {
        title: "Missing PODs",
        text: "Delivery photos and signatures arrive late or incomplete. Billing and claims stall.",
      },
      {
        title: "Rate confusion",
        text: "Contract rates, spot quotes, and accessorials live apart. Invoices need rework.",
      },
    ],
  },
  howWeHelp: {
    title: "How Jabisoft helps Logistics.",
    intro:
      "We build in your repos and connect your TMS, telematics, and accounting tools — software your team uses daily.",
    items: [
      {
        title: "We build dispatch software",
        text: "We build boards, assignment flows, and route views around your operation — faster coverage per load.",
        tags: ["Boards", "Assignments", "Routing"],
      },
      {
        title: "We integrate tracking",
        text: "We connect GPS, ELD, and carrier feeds into live load views — status without check calls.",
        tags: ["GPS feeds", "Live ETAs", "Milestones"],
      },
      {
        title: "We build driver apps",
        text: "We build simple mobile flows for check-in, tasks, and POD capture — steps completed on time.",
        tags: ["Mobile flows", "POD capture", "Tasks"],
      },
      {
        title: "We automate billing",
        text: "We link rates, accessorials, and PODs to invoice generation — finance bills cleanly.",
        tags: ["Rate rules", "Draft invoices", "Disputes"],
      },
      {
        title: "We model delay signals",
        text: "We model ETA, dwell, and delay signals from your data — action before customers complain.",
        tags: ["ETA models", "Dwell alerts", "Escalations"],
      },
      {
        title: "We clean up legacy",
        text: "We replace spreadsheets and one-off scripts with maintained services — one system for staff.",
        tags: ["Migration", "Clean data", "Support"],
      },
    ],
  },
  useCases: {
    title: "Logistics builds we ship.",
    intro:
      "Systems that cover the load from quote to cash.",
    items: [
      {
        title: "Dispatch and routing",
        text: "Open loads, drivers, and capacity in one board — assignments and updates flow to drivers.",
        points: ["Load board", "Driver messaging", "Appointment view"],
      },
      {
        title: "Fleet tracking",
        text: "GPS and milestone events feeding live maps and ETAs — exceptions surface for action.",
        points: ["Live map and ETA", "Milestone feed", "Exception queue"],
      },
      {
        title: "Warehouse ops",
        text: "Dock slots, inbound tasks, and staging linked to loads — faster driver turns.",
        points: ["Slot scheduling", "Tasks by door", "Dwell view"],
      },
      {
        title: "Proof-of-delivery",
        text: "Signatures, photos, and notes captured at delivery — billing without chasing paperwork.",
        points: ["Photo capture", "Load-linked POD", "Claim packets"],
      },
      {
        title: "Rate and invoice automation",
        text: "Rates, fuel tables, and accessorials generating draft invoices — finance reviews and sends.",
        points: ["Rate rules", "Draft invoices", "Dispute notes"],
      },
      {
        title: "Delay alerts",
        text: "Late arrivals, long dwells, and missed milestones triggering alerts — proactive customer updates.",
        points: ["Delay rules", "Status templates", "Escalations"],
      },
    ],
  },
  businessImpact: {
    title: "After Jabisoft, every load has one record.",
    intro:
      "No invented numbers — each outcome below is made measurable in the product and reviewed with your team.",
    dimensions: [
      {
        name: "Coverage gets faster",
        before: "Calls and sheets per load",
        text: "Teams assign and confirm loads from a shared board — fewer touches per load.",
        tag: "Speed",
      },
      {
        name: "Status stays live",
        before: "Driver check calls",
        text: "Staff and customers see live location and milestones — answers without calling.",
        tag: "Service",
      },
      {
        name: "Turns get shorter",
        before: "Docks and dispatch apart",
        text: "Docks and drivers coordinate around linked slots — less waiting at doors.",
        tag: "Turn time",
      },
      {
        name: "Proof arrives complete",
        before: "Late or partial PODs",
        text: "Photos and signatures attach at delivery — billing and claims move immediately.",
        tag: "Proof",
      },
      {
        name: "Invoices go out right",
        before: "Rework on rates",
        text: "Invoices generate from the load record with support attached — cash flow steadies.",
        tag: "Billing",
      },
      {
        name: "Knowledge stays yours",
        before: "Vendor-held know-how",
        text: "Your repos hold the code, integrations, and docs — independence by default.",
        tag: "Ownership",
      },
    ],
  },
  cta: {
    title: "Show us a lane and your tools.",
    text: "We map your dispatch, tracking, and billing flow, then propose a build in your repos — with the engineers who will ship it.",
    button: "Talk to Our Experts",
    secondaryButton: "Start a Conversation",
  },
};
