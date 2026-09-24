import type { IndustryDetailData } from "../types";

export const healthcareContent: IndustryDetailData = {
  label: "Healthcare",
  slug: "healthcare",
  kicker: "Industries — Healthcare",
  hero: {
    headline: "Clinical software that holds up in production.",
    lede: "We build patient-facing apps, clinical tools, and back-office automation inside your repos — integrated with your EHR and your security controls.",
    primaryCta: "Map your roadmap",
    stats: [
      { value: "HIPAA-aware", label: "Least-privilege access by design" },
      { value: "EHR-integrated", label: "HL7 and FHIR connections" },
      { value: "Audit-ready", label: "Clear logs and change history" },
      { value: "In your repos", label: "Your team owns the code" },
    ],
    ticker: [
      "Patient intake",
      "Triage assist",
      "Appointment automation",
      "Records search",
      "Claims processing",
      "Care reminders",
      "EHR integration",
      "Referral routing",
    ],
  },
  landscape: {
    title: "Care runs on software now.",
    intro:
      "Health systems are digitizing intake, scheduling, and follow-up. Payers and providers both need cleaner data and tighter operations.",
    forces: [
      {
        title: "Digital front doors",
        text: "Patients expect online intake, scheduling, and messaging — tied directly to the record, not floating beside it.",
      },
      {
        title: "Interoperability pressure",
        text: "FHIR APIs and payer rules push data sharing forward. Systems must exchange records without manual re-entry.",
      },
      {
        title: "Staff capacity gaps",
        text: "Front-desk and billing teams carry heavy repetitive work. Automation now covers intake, reminders, and routing.",
      },
      {
        title: "Tighter documentation needs",
        text: "Audits and prior auth demand complete records. Teams need search and summaries they can trust.",
      },
    ],
    opportunities: [
      {
        title: "Remove intake bottlenecks",
        text: "Digital forms, insurance checks, and pre-visit prep cut waiting-room paperwork.",
      },
      {
        title: "Connect the record",
        text: "FHIR integrations sync scheduling, clinical, and billing data — no more copying between systems.",
      },
      {
        title: "Automate follow-up",
        text: "Reminders, recalls, and care plans run on schedule while staff workload stays flat.",
      },
    ],
  },
  challenges: {
    title: "Healthcare breaks generic software.",
    intro:
      "Clinical workflows carry consent, safety, and billing rules that off-the-shelf tools miss.",
    items: [
      {
        title: "Fragmented patient records",
        text: "Data lives across EHR modules, faxes, and portals — staff hunt for history before every visit.",
      },
      {
        title: "No-show schedules",
        text: "Manual booking and reminder calls leave gaps. Slots go empty while waitlists grow.",
      },
      {
        title: "Triage overload",
        text: "Nurses field high message and call volumes. Urgent cases compete with routine requests.",
      },
      {
        title: "Claims rework",
        text: "Missing codes, eligibility errors, and denials stall payment. Billing reworks the same claims.",
      },
      {
        title: "Consent and access risk",
        text: "Role-based access and audit trails are mandatory. Generic apps rarely enforce them correctly.",
      },
    ],
  },
  howWeHelp: {
    title: "How Jabisoft helps Healthcare.",
    intro:
      "We design, build, and ship inside your repos and your cloud — your team reviews every pull request and keeps full ownership.",
    items: [
      {
        title: "We build AI search over records",
        text: "We connect notes, labs, and documents to fast retrieval — staff find history without digging.",
        tags: ["Copilots", "Retrieval", "EHR data"],
      },
      {
        title: "We engineer patient apps",
        text: "We build portals, intake flows, and messaging in your stack — auth, roles, and audit logging included.",
        tags: ["Portals", "RBAC", "APIs"],
      },
      {
        title: "We automate scheduling work",
        text: "We automate reminders, rescheduling, and waitlist backfill — the schedule stays full with less phone time.",
        tags: ["Reminders", "Backfill", "Messaging"],
      },
      {
        title: "We run regulated cloud setups",
        text: "We set up isolated environments, backups, and access controls that pass security review.",
        tags: ["Isolation", "Backups", "Access controls"],
      },
      {
        title: "We clean clinical data flows",
        text: "We build pipelines for HL7 and FHIR feeds, claims, and quality measures — one trusted source for reports.",
        tags: ["FHIR", "Pipelines", "Quality measures"],
      },
      {
        title: "We modernize legacy tools",
        text: "We replace fax-era workflows and fragile scripts with maintained services — without disrupting clinic hours.",
        tags: ["Migration", "Integrations", "Support"],
      },
    ],
  },
  useCases: {
    title: "What we build for care teams.",
    intro:
      "Practical systems for intake, scheduling, records, and billing — each shipped in your environment.",
    items: [
      {
        title: "Digital patient intake",
        text: "Intake with insurance capture and consent — charts arrive complete before the visit.",
        points: ["Online forms and ID capture", "Eligibility checks", "EHR write-back"],
      },
      {
        title: "Triage assist queues",
        text: "Message sorting and urgency signals for nursing teams — urgent requests surface first.",
        points: ["Urgency routing", "Summary drafts", "Escalation rules"],
      },
      {
        title: "Appointment automation",
        text: "Reminders, confirmations, and self-rescheduling — gaps fill from the waitlist automatically.",
        points: ["SMS and email reminders", "Self-serve rescheduling", "Waitlist backfill"],
      },
      {
        title: "Records search",
        text: "Search across notes, PDFs, and scans with citations — staff verify answers in the source chart.",
        points: ["Unified clinical search", "Source citations", "Role-based access"],
      },
      {
        title: "Claims processing",
        text: "Scrubbing, coding support, and denial tracking — billing sees what needs fixing before submission.",
        points: ["Eligibility verification", "Code checks", "Denial worklists"],
      },
      {
        title: "Care reminders",
        text: "Recall and care-plan outreach tied to due dates — patients get nudges until they act.",
        points: ["Preventive recall lists", "Care-plan messaging", "Outcome tracking"],
      },
    ],
  },
  businessImpact: {
    title: "After Jabisoft, clinics run calmer.",
    intro:
      "No invented numbers — each outcome below is made measurable in the product and reviewed with your team.",
    dimensions: [
      {
        name: "Intake moves faster",
        before: "Clipboard paperwork and re-entry",
        text: "Patients complete intake before arrival. The front desk starts visits with verified data.",
        tag: "Intake",
      },
      {
        name: "Schedules stay full",
        before: "No-shows and empty slots",
        text: "Automated reminders and backfill keep slots covered. Staff manage exceptions only.",
        tag: "Scheduling",
      },
      {
        name: "Triage finds order",
        before: "Mixed urgent and routine inbox",
        text: "Routed queues show urgency and context. Teams respond to the right cases first.",
        tag: "Triage",
      },
      {
        name: "Records answer questions",
        before: "Chart hunting across systems",
        text: "One search returns history with sources. Staff act without chasing files.",
        tag: "Records",
      },
      {
        name: "Claims go out clean",
        before: "Denials and rework loops",
        text: "Pre-submit checks catch errors early. Billing works a clear queue.",
        tag: "Billing",
      },
      {
        name: "Follow-up happens",
        before: "Missed recalls and gaps",
        text: "Outreach runs on due dates automatically. More patients close the loop.",
        tag: "Care",
      },
    ],
  },
  cta: {
    title: "Fix one clinical workflow this quarter.",
    text: "Bring us your intake bottleneck, scheduling gap, or records mess. We scope it, build it in your repos, and hand over clean code.",
    button: "Talk to Our Experts",
    secondaryButton: "Start a Conversation",
  },
};
