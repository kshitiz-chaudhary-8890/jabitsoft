import type { IndustryDetailData } from "../types";

export const fintechContent: IndustryDetailData = {
  label: "FinTech",
  slug: "fintech",
  kicker: "Industries — FinTech",
  hero: {
    headline: "Money software that passes review.",
    lede: "We build onboarding, payments, and compliance systems inside your repos — ledgers, audit trails, and bank-grade controls included.",
    primaryCta: "Map your roadmap",
    stats: [
      { value: "Audit-ready", label: "Full logs for every action" },
      { value: "Ledger-safe", label: "Double-entry transaction logic" },
      { value: "KYC-ready", label: "Identity and document flows" },
      { value: "In your repos", label: "Your team owns the code" },
    ],
    ticker: [
      "KYC onboarding",
      "Fraud signals",
      "Reconciliation",
      "Payment ops",
      "Credit insights",
      "Compliance reporting",
      "Ledger design",
      "Risk rules",
    ],
  },
  landscape: {
    title: "Money movement needs proof.",
    intro:
      "Fintechs compete on onboarding speed and operational trust. Regulators expect controls, logs, and clear reporting.",
    forces: [
      {
        title: "Instant onboarding expectations",
        text: "Users abandon slow KYC and funding steps. Firms need fast identity checks with clear fallbacks.",
      },
      {
        title: "Real-time payments",
        text: "Same-day and instant rails change settlement timing. Operations must track status across providers.",
      },
      {
        title: "Fraud pressure",
        text: "Synthetic identities and mule activity target new accounts. Teams need signals before funds move.",
      },
      {
        title: "Reporting scrutiny",
        text: "Auditors and partners ask for transaction trails. Data must reconcile end to end.",
      },
    ],
    opportunities: [
      {
        title: "Onboard in minutes",
        text: "Guided KYC with document checks and review queues — good users pass fast, risky ones route to review.",
      },
      {
        title: "Automate money ops",
        text: "Reconciliation and exception queues replace spreadsheets. Finance closes books with confidence.",
      },
      {
        title: "Productize compliance",
        text: "Rules, limits, and reports ship as code. Audits pull evidence without fire drills.",
      },
    ],
  },
  challenges: {
    title: "Fintech punishes sloppy systems.",
    intro:
      "Balances, identities, and filings must line up. Small gaps become losses or findings.",
    items: [
      {
        title: "Slow KYC drop-off",
        text: "Document uploads stall and verifications fail silently. Applicants leave before approval.",
      },
      {
        title: "Fraud after approval",
        text: "Accounts look clean at signup, then show mule patterns. Teams catch it after payouts.",
      },
      {
        title: "Broken reconciliation",
        text: "Processor reports, ledger entries, and bank statements disagree. Finance hunts differences at month end.",
      },
      {
        title: "Payment exceptions",
        text: "Returns, holds, and failed payouts pile in ops queues. Status updates lag behind provider webhooks.",
      },
      {
        title: "Compliance evidence gaps",
        text: "Transaction monitoring and filings lack clear trails. Audit prep turns into manual exports.",
      },
    ],
  },
  howWeHelp: {
    title: "How Jabisoft helps FinTech.",
    intro:
      "We build payment and compliance systems in your stack and your cloud — tested ledger logic your auditors can follow.",
    items: [
      {
        title: "We add risk-aware AI",
        text: "We score applications and transactions for review priority — analysts see reasons, not black boxes.",
        tags: ["Risk scoring", "Review queues", "Guardrails"],
      },
      {
        title: "We engineer ledger systems",
        text: "We build double-entry ledgers, wallets, and payout flows — every movement balances and traces.",
        tags: ["Ledgers", "Wallets", "APIs"],
      },
      {
        title: "We automate ops queues",
        text: "We automate KYC routing, payment retries, and exception handling — ops clears queues instead of chasing status.",
        tags: ["Workflows", "Retries", "Webhooks"],
      },
      {
        title: "We harden payment cloud",
        text: "We set up isolated VPCs, secrets handling, and key rotation — rails run with guarded deploys.",
        tags: ["Isolation", "Secrets", "Guarded deploys"],
      },
      {
        title: "We reconcile your data",
        text: "We build pipelines that match ledger, processor, and bank feeds — breaks surface daily with owners assigned.",
        tags: ["Matching", "Break detection", "Reporting"],
      },
      {
        title: "We modernize core flows",
        text: "We replace brittle cron jobs and spreadsheets with maintained services — without stopping payouts.",
        tags: ["Migration", "Zero-downtime", "Support"],
      },
    ],
  },
  useCases: {
    title: "What we build for money teams.",
    intro:
      "Onboarding, fraud, ledger, and reporting systems that reconcile — built for ops, finance, and compliance.",
    items: [
      {
        title: "KYC onboarding",
        text: "Identity verification with document capture and review tools — approvals move fast with full history.",
        points: ["Document and liveness checks", "Sanctions screening", "Review workbench"],
      },
      {
        title: "Fraud signals",
        text: "Velocity, device, and network signals tied to accounts — rules route risky activity to analysts.",
        points: ["Risk rules engine", "Case queue", "Block and hold controls"],
      },
      {
        title: "Reconciliation",
        text: "Daily matching of ledger, processor, and bank data — breaks show amounts, sources, and owners.",
        points: ["Multi-source matching", "Break aging", "Close reports"],
      },
      {
        title: "Credit insights",
        text: "Cash-flow and repayment views for underwriting support — analysts see one consistent picture.",
        points: ["Bank data aggregation", "Affordability summaries", "Decision trail"],
      },
      {
        title: "Payment ops",
        text: "Payout orchestration, retries, and status tracking — support always knows where money is.",
        points: ["Multi-rail routing", "Status tracking", "Returns handling"],
      },
      {
        title: "Compliance reporting",
        text: "Monitoring logs, limits, and exportable reports — filings draw from reconciled data.",
        points: ["Monitoring logs", "Limit alerts", "Auditor exports"],
      },
    ],
  },
  businessImpact: {
    title: "After Jabisoft, money ops reconcile.",
    intro:
      "No invented numbers — each outcome below is made measurable in the product and reviewed with your team.",
    dimensions: [
      {
        name: "Onboarding completes",
        before: "Stalled KYC and drop-off",
        text: "Guided flows and review queues move applicants through. Support sees exactly where checks stand.",
        tag: "KYC",
      },
      {
        name: "Fraud gets flagged early",
        before: "Losses found after payout",
        text: "Signals and rules route risky accounts to review. Analysts act before funds leave.",
        tag: "Risk",
      },
      {
        name: "Books close cleanly",
        before: "Spreadsheet reconciliation",
        text: "Daily matching ties ledger to bank and processor. Finance closes with matched records.",
        tag: "Finance",
      },
      {
        name: "Payouts stay visible",
        before: "Unknown payment status",
        text: "Tracking shows provider status and retries. Support gives clear answers.",
        tag: "Payments",
      },
      {
        name: "Credit calls get context",
        before: "Scattered applicant data",
        text: "Unified cash-flow and repayment views support decisions. Every call keeps its trail.",
        tag: "Credit",
      },
      {
        name: "Audits pull fast",
        before: "Manual exports and gaps",
        text: "Logs and reports come from one reconciled source. Compliance answers requests directly.",
        tag: "Compliance",
      },
    ],
  },
  cta: {
    title: "Fix one money workflow this quarter.",
    text: "Bring us your KYC drop-off, reconciliation backlog, or payment exceptions. We scope it, build it in your repos, and hand over tested code.",
    button: "Talk to Our Experts",
    secondaryButton: "Start a Conversation",
  },
};
