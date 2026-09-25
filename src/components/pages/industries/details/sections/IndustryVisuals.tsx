import {
  Activity, ArrowRight, BellRing, Blocks, Bot, Building2, CalendarDays,
  ChartNoAxesCombined, ClipboardCheck, CreditCard, FileCheck2, HeartPulse,
  LayoutDashboard, Link2, MapPinned, PackageCheck, Radar, Route,
  Search, ShoppingBag, Smartphone, Sparkles, Truck, UserRound, UsersRound,
  Warehouse, Workflow,
  type LucideIcon,
} from "lucide-react";

import styles from "./IndustryVisuals.module.css";

type VisualSpec = { icon: LucideIcon; steps: [string, string, string] };

const spec = (icon: LucideIcon, first: string, second: string, third: string): VisualSpec => ({
  icon,
  steps: [first, second, third],
});

const useCaseSpecs: Record<string, VisualSpec[]> = {
  healthcare: [
    spec(ClipboardCheck, "Patient details", "Digital intake", "Care team"),
    spec(Workflow, "Patient request", "Triage queue", "Assigned team"),
    spec(CalendarDays, "Availability", "Appointment", "Reminder"),
    spec(UserRound, "Patient", "Portal", "Care services"),
    spec(LayoutDashboard, "Clinical activity", "Role-based view", "Next action"),
    spec(Link2, "Healthcare app", "Integration layer", "Existing system"),
  ],
  retail: [
    spec(ShoppingBag, "Product catalogue", "Storefront", "Checkout"),
    spec(Search, "Customer intent", "Search & filters", "Product match"),
    spec(Warehouse, "Stock locations", "Order system", "Fulfilment"),
    spec(UsersRound, "Customer account", "Loyalty", "Self-service"),
    spec(Link2, "Store & POS", "Integration layer", "Ecommerce"),
    spec(Workflow, "Order event", "Automation rule", "Team update"),
  ],
  automation: [
    spec(Bot, "Robot fleet", "Task assignment", "Operator view"),
    spec(Activity, "Robot telemetry", "Live monitoring", "Operator alert"),
    spec(Workflow, "System event", "Workflow rule", "Human action"),
    spec(LayoutDashboard, "Machine status", "Control interface", "Operator"),
    spec(Link2, "Robot & sensor", "Integration layer", "Business system"),
    spec(BellRing, "System event", "Structured alert", "Resolution"),
  ],
  logistics: [
    spec(Blocks, "Booking", "Transport platform", "Delivery"),
    spec(Truck, "Fleet availability", "Driver assignment", "Job status"),
    spec(MapPinned, "Pickup", "Shipment tracking", "Delivery"),
    spec(Route, "Jobs & capacity", "Dispatch plan", "Driver route"),
    spec(Smartphone, "Assigned job", "Driver app", "Field update"),
    spec(UserRound, "Customer booking", "Logistics portal", "Shipment status"),
    spec(FileCheck2, "Delivery", "Photo or signature", "Shipment record"),
    spec(Link2, "Warehouse / ERP", "Integration layer", "Transport platform"),
  ],
  "saas-platforms": [
    spec(Sparkles, "Tenant data", "AI copilot", "Reviewed action"),
    spec(Search, "Records & docs", "Permission-aware search", "Customer answer"),
    spec(UserRound, "Sign-up", "Guided onboarding", "First value"),
    spec(CreditCard, "Product usage", "Plan & billing", "Account update"),
    spec(Workflow, "Product event", "Approval workflow", "Automated task"),
    spec(ChartNoAxesCombined, "Usage signals", "Product insight", "Team action"),
  ],
};

const helpSpecs: Record<string, VisualSpec[]> = {
  healthcare: [
    spec(ClipboardCheck, "People & roles", "Workflow map", "System needs"),
    spec(UsersRound, "Patient", "Clinical team", "Administration"),
    spec(Link2, "New platform", "API layer", "Existing systems"),
    spec(Workflow, "Form or request", "Routing rule", "Team notification"),
    spec(Blocks, "Modular platform", "Integration points", "Future change"),
    spec(HeartPulse, "Launch", "Monitor & support", "Improve"),
  ],
  retail: [
    spec(Search, "Product catalogue", "Search logic", "Discovery"),
    spec(Warehouse, "Sales & stock", "Reorder rule", "Buyer review"),
    spec(ShoppingBag, "Cart", "Payment & order", "Fulfilment"),
    spec(PackageCheck, "Return request", "Return rule", "Resolution"),
    spec(ChartNoAxesCombined, "Sales & inventory", "Data view", "Team decision"),
    spec(Link2, "POS", "Connected APIs", "Retail platform"),
  ],
  automation: [
    spec(Bot, "Robot availability", "Task status", "Operator oversight"),
    spec(Link2, "Machine & sensor", "Supported API", "Business software"),
    spec(LayoutDashboard, "Operational events", "Operator interface", "Response"),
    spec(Workflow, "Event", "Automation rule", "Human handoff"),
    spec(Radar, "Telemetry", "Alert & dashboard", "Diagnosis"),
    spec(Blocks, "Equipment", "Modular integration", "Evolving workflow"),
  ],
  logistics: [
    spec(Route, "Bookings & jobs", "Dispatch plan", "Assigned driver"),
    spec(Smartphone, "Assigned job", "Driver app", "Proof of delivery"),
    spec(MapPinned, "Pickup", "Shipment status", "Delivery"),
    spec(Workflow, "Job status", "Automation rule", "Customer update"),
    spec(Link2, "Transport system", "Integration layer", "ERP & warehouse"),
    spec(ChartNoAxesCombined, "Fleet & shipment", "Reporting view", "Operational insight"),
  ],
  "saas-platforms": [
    spec(Building2, "Organization", "Roles & access", "Audit history"),
    spec(CreditCard, "Usage event", "Metering", "Plan & billing"),
    spec(Sparkles, "Product data", "AI feature", "Review controls"),
    spec(Blocks, "Tenant boundary", "Workload limits", "Platform"),
    spec(Workflow, "Build", "Test & release", "Monitor"),
    spec(Link2, "Existing product", "Service boundary", "Modern platform"),
  ],
};

const domainTitles: Record<string, string> = {
  healthcare: "Care workflow",
  retail: "Connected retail",
  automation: "Robot Operations",
  logistics: "Dispatch Control",
  "saas-platforms": "SaaS platform",
};

function pickSpec(collection: Record<string, VisualSpec[]>, slug: string, index: number): VisualSpec {
  return collection[slug]?.[index] ?? spec(Workflow, "Input", "Connected workflow", "Outcome");
}

export function UseCaseDiagram({ slug, index }: { slug: string; index: number }) {
  const { icon: Icon, steps } = pickSpec(useCaseSpecs, slug, index);
  return (
    <div className={styles.useCaseDiagram} aria-hidden="true">
      <div className={styles.useCaseTop}>
        <span className={styles.useCaseIcon}><Icon size={24} strokeWidth={1.7} /></span>
        <span className={styles.useCaseLabel}>Connected workflow</span>
        <span className={styles.useCaseIndex}>{String(index + 1).padStart(2, "0")}</span>
      </div>
      <div className={styles.useCaseFlow}>
        {steps.map((step, stepIndex) => (
          <div className={styles.useCaseStepGroup} key={step}>
            <span className={`${styles.useCaseStep} ${stepIndex === 1 ? styles.useCaseStepActive : ""}`}>
              {step}
            </span>
            {stepIndex < 2 ? <ArrowRight className={styles.useCaseArrow} size={16} strokeWidth={1.5} /> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export function OperationsDiagram({ slug, index }: { slug: string; index: number }) {
  const { icon: Icon, steps } = pickSpec(helpSpecs, slug, index);
  return (
    <div className={styles.operationsDiagram} aria-hidden="true">
      <div className={styles.operationsTop}>
        <span className={styles.operationsIcon}><Icon size={21} strokeWidth={1.7} /></span>
        <span>
          <small>Workflow view</small>
          <strong>{domainTitles[slug] ?? "Connected operations"}</strong>
        </span>
      </div>
      <div className={styles.operationsSteps}>
        {steps.map((step, stepIndex) => (
          <div className={styles.operationsStep} key={step}>
            <span className={styles.operationsStepIndex}>{String(stepIndex + 1).padStart(2, "0")}</span>
            <span>{step}</span>
            <ArrowRight size={15} strokeWidth={1.5} />
          </div>
        ))}
      </div>
    </div>
  );
}
