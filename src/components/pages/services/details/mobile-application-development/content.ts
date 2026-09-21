import type { ServiceDetailData } from "../types";

export const mobileApplicationDevelopmentContent: ServiceDetailData = {
  label: "Mobile Application Development",
  slug: "mobile-application-development",
  eyebrow: "Mobile products",
  headline: "Mobile products people choose to keep using.",
  lede: "We design and build reliable iOS and Android applications with focused user journeys, scalable architecture and production-ready delivery.",
  primaryCta: "Discuss your app",
  proof: [
    { value: "Product-led", label: "Built around real user behaviour" },
    { value: "Native-quality", label: "Fast and familiar interactions" },
    { value: "API-ready", label: "Connected to business systems" },
    { value: "Launch-ready", label: "Store delivery and support included" },
  ],
  problem: {
    title: "A mobile app succeeds only when the whole product works.",
    intro:
      "A polished interface cannot compensate for unclear journeys, unreliable APIs or weak release practices. Strong mobile products align customer needs, platform behaviour and operational reality.",
    items: [
      {
        title: "User journeys carry too much friction",
        text: "Critical actions take too many steps or fail to match the way people use a phone.",
      },
      {
        title: "Platform behaviour feels inconsistent",
        text: "Interactions ignore iOS and Android expectations, making the product feel unfamiliar or unfinished.",
      },
      {
        title: "Backend limitations reach the interface",
        text: "Slow APIs, fragile authentication and inconsistent data create visible product failures.",
      },
      {
        title: "Release cycles become risky",
        text: "Manual testing and unclear store processes turn every update into a high-pressure event.",
      },
    ],
  },
  capabilities: {
    title: "Mobile product delivery from concept to continuous improvement.",
    intro:
      "We connect product strategy, interface design, engineering and release operations so the application works as one coherent product.",
    items: [
      {
        title: "Mobile product strategy",
        text: "Define the audience, critical journeys, release scope and measures that matter.",
      },
      {
        title: "UX and interface design",
        text: "Create accessible flows and interaction patterns shaped for mobile behaviour.",
      },
      {
        title: "iOS and Android engineering",
        text: "Build native or cross-platform applications with maintainable architecture.",
      },
      {
        title: "Backend and API integration",
        text: "Connect identity, payments, content, data and internal business systems.",
      },
      {
        title: "Quality and app operations",
        text: "Automate testing, manage releases, observe production and improve from real usage.",
      },
    ],
  },
  useCases: {
    title: "Mobile experiences built around moments that matter.",
    intro:
      "We focus on products where mobility, immediacy and device capabilities create a clear advantage.",
    items: [
      {
        title: "Customer self-service",
        text: "Give customers a direct way to manage accounts, requests, payments and support.",
      },
      {
        title: "Field and workforce applications",
        text: "Support teams with offline workflows, capture, location and real-time updates.",
      },
      {
        title: "Commerce and marketplaces",
        text: "Build discovery, transaction and account experiences designed for repeat use.",
      },
      {
        title: "Connected product experiences",
        text: "Pair mobile interfaces with devices, subscriptions, data and service operations.",
      },
    ],
  },
  process: {
    title: "A focused path from product decision to store release.",
    intro:
      "We validate the smallest valuable product, prove the riskiest journeys early and build toward a controlled launch.",
    steps: [
      {
        title: "Frame",
        text: "Align users, business goals, critical journeys and technical constraints.",
        output: "Product brief",
      },
      {
        title: "Prototype",
        text: "Test navigation, interaction and product assumptions before full engineering.",
        output: "Validated prototype",
      },
      {
        title: "Engineer",
        text: "Build the application, services and integrations in measurable releases.",
        output: "Working product",
      },
      {
        title: "Validate",
        text: "Test devices, accessibility, performance, security and failure conditions.",
        output: "Release candidate",
      },
      {
        title: "Launch",
        text: "Ship to stores, monitor behaviour and prioritise the next improvements.",
        output: "Live application",
      },
    ],
  },
  technology: {
    title: "A mobile stack selected for product fit and long-term ownership.",
    intro:
      "We choose native or cross-platform delivery based on experience requirements, device capabilities, roadmap and team skills.",
    groups: [
      { label: "Platforms", items: ["iOS", "Android", "Tablet", "Wearable apps"] },
      { label: "Application", items: ["React Native", "Flutter", "Swift", "Kotlin"] },
      { label: "Services", items: ["REST APIs", "GraphQL", "Webhooks", "Realtime data"] },
      {
        label: "Product systems",
        items: ["Authentication", "Payments", "Push notifications", "Analytics"],
      },
      {
        label: "Delivery",
        items: ["Automated testing", "CI/CD pipelines", "Store releases", "Crash monitoring"],
      },
    ],
  },
  readiness: {
    title: "Release confidence across devices, networks and real usage.",
    intro:
      "The application is tested as a complete product, including integrations, degraded networks and store delivery.",
    systemLabel: "Mobile release loop",
    items: [
      {
        marker: "Verify",
        title: "Device and journey coverage",
        text: "Critical flows are tested across supported devices, screen sizes and platform versions.",
      },
      {
        marker: "Protect",
        title: "Secure data handling",
        text: "Identity, storage, transport and permissions follow platform and product requirements.",
      },
      {
        marker: "Observe",
        title: "Production product signals",
        text: "Crash, performance and behaviour data reveal issues and improvement opportunities.",
      },
      {
        marker: "Release",
        title: "Controlled store delivery",
        text: "Signing, review, phased rollout and rollback procedures reduce launch risk.",
      },
    ],
  },
  ownership: {
    title: "A mobile product your team can release and improve.",
    intro:
      "You receive the application, supporting services and the practical assets needed for ongoing product ownership.",
    items: [
      {
        artifact: "Applications",
        title: "Production iOS and Android builds",
        text: "Tested application releases configured for the agreed devices, platforms and environments.",
      },
      {
        artifact: "Product system",
        title: "Source code and integrations",
        text: "Maintainable application code, API connections and environment configuration.",
      },
      {
        artifact: "Delivery",
        title: "Release and quality setup",
        text: "Automated checks, signing guidance, store configuration and deployment workflows.",
      },
      {
        artifact: "Capability transfer",
        title: "Documentation and handover",
        text: "Architecture, operating guidance and walkthroughs for product and engineering teams.",
      },
    ],
  },
  faqs: [
    {
      question: "Should we build native or cross-platform?",
      answer:
        "We decide from experience requirements, device features, roadmap, budget and internal skills. Cross-platform is not automatically the right or wrong choice.",
    },
    {
      question: "Can you work with our existing backend?",
      answer:
        "Yes. We can integrate existing APIs, improve weak interfaces or build the services required by the mobile product.",
    },
    {
      question: "Do you handle App Store and Play Store releases?",
      answer:
        "Yes. We support signing, store configuration, review preparation, phased rollout and release documentation.",
    },
    {
      question: "How do you test across devices?",
      answer:
        "We combine automated checks with targeted testing across representative devices, screen sizes, platform versions and network conditions.",
    },
    {
      question: "Can you improve an existing application?",
      answer:
        "Yes. We can audit experience, architecture, reliability and delivery, then modernise in controlled stages.",
    },
  ],
  cta: {
    title: "Turn the right mobile idea into a dependable product.",
    text: "Share the audience, the core journey and the business outcome. We will help define the right first release.",
    button: "Plan your mobile product",
  },
};
