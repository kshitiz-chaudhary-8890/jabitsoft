import type { IndustryDetailData } from "../types";

export const retailContent: IndustryDetailData = {
  label: "Retail",
  slug: "retail",
  kicker: "Industries — Retail",
  hero: {
    headline: "Sell more with systems that hold up.",
    lede: "We build product search, replenishment tools, and checkout automation inside your repos — you own the code and your team can run it.",
    primaryCta: "Get a build plan",
    stats: [
      { value: "Search-led", label: "Catalog and inventory search" },
      { value: "Stock-aware", label: "Live counts by location" },
      { value: "Checkout-safe", label: "POS and order flow fixes" },
      { value: "In your repos", label: "Your team owns the code" },
    ],
    ticker: [
      "Recommendations",
      "Inventory search",
      "Replenishment",
      "Checkout ops",
      "Returns automation",
      "Demand signals",
      "Order routing",
      "Support automation",
    ],
  },
  landscape: {
    title: "Retail runs on thin margins.",
    intro:
      "Shoppers expect accurate stock and fast checkout across store and online. Most teams run on disconnected tools that slow them down.",
    forces: [
      {
        title: "Omnichannel pressure",
        text: "Customers check stock online and buy in store, or reverse it. Systems must stay in sync across every channel.",
      },
      {
        title: "Inventory volatility",
        text: "Suppliers delay shipments and demand shifts by season and location. Teams need live stock views.",
      },
      {
        title: "Checkout expectations",
        text: "Shoppers abandon carts when checkout lags or payments fail. Flows need fixes without breaking POS.",
      },
      {
        title: "Returns load",
        text: "Online returns drain staff time. Manual inspection and refund steps create backlogs and errors.",
      },
    ],
    opportunities: [
      {
        title: "Search that sells",
        text: "AI search and recommendations help shoppers find the right product faster — on your catalog data.",
      },
      {
        title: "Automation that clears backlogs",
        text: "Automated replenishment, routing, and returns cut manual work so staff serve customers.",
      },
      {
        title: "Data you can act on",
        text: "Clean sales and inventory data shows what to restock and when — planning on signals, not guesses.",
      },
    ],
  },
  challenges: {
    title: "What breaks in retail operations.",
    intro:
      "Retail systems grow by addition and stop working together. These are the problems we see most.",
    items: [
      {
        title: "Disconnected inventory",
        text: "Store, warehouse, and online stock live in separate systems. Staff cannot trust counts.",
      },
      {
        title: "Weak product discovery",
        text: "Basic keyword search misses synonyms, sizes, and attributes. Shoppers leave empty-handed.",
      },
      {
        title: "Manual replenishment",
        text: "Buyers reorder from spreadsheets and gut feel. Winners stock out while slow movers pile up.",
      },
      {
        title: "Fragile checkout flows",
        text: "POS, payments, and order management are patched together. Small changes cause failed payments.",
      },
      {
        title: "Costly returns handling",
        text: "Returns need inspection, restocking, and refunds across systems. Manual steps delay refunds.",
      },
    ],
  },
  howWeHelp: {
    title: "How Jabitsoft helps retail teams.",
    intro:
      "We work in your codebase and ship production software with your team. No slideware, no locked platforms.",
    items: [
      {
        title: "We build AI product search",
        text: "We build search and recommendations on your catalog and order history — plain-language queries that convert.",
        tags: ["Retrieval", "Ranking", "Analytics"],
      },
      {
        title: "We automate replenishment",
        text: "We build reorder logic that reads sales and stock levels — buyers approve instead of building sheets.",
        tags: ["Reorder logic", "Lead times", "Approvals"],
      },
      {
        title: "We fix checkout and orders",
        text: "We repair checkout, payment, and order flows in your stack — cart to fulfillment, cleanly.",
        tags: ["Payment recovery", "Routing", "POS fixes"],
      },
      {
        title: "We automate returns",
        text: "We build return rules, labels, and refund triggers tied to your order system — fewer steps per return.",
        tags: ["Rules engine", "Labels", "Refunds"],
      },
      {
        title: "We ship demand dashboards",
        text: "We pipe sales and inventory data into dashboards managers use — demand by product and location.",
        tags: ["Pipelines", "Dashboards", "Alerts"],
      },
      {
        title: "We modernize retail systems",
        text: "We upgrade POS integrations, inventory services, and APIs without full replatforms.",
        tags: ["Integrations", "APIs", "Zero-freeze"],
      },
    ],
  },
  useCases: {
    title: "Retail software we build.",
    intro: "From the storefront your customers experience to the systems your teams depend on, we build connected software across the retail journey.",
    items: [
      {
        title: "Ecommerce Platforms",
        text: "Modern storefronts with product catalogues, customer accounts, carts, checkout, promotions, payments, and order experiences.",
        points: ["Ecommerce", "Customer Experience", "Checkout"],
      },
      {
        title: "AI-Powered Product Discovery",
        text: "Intelligent search, recommendations, filtering, and merchandising experiences that help customers navigate complex product catalogues.",
        points: ["AI", "Search", "Personalisation"],
      },
      {
        title: "Inventory & Order Management",
        text: "Systems that give teams clearer visibility into inventory, orders, locations, fulfilment, and operational status.",
        points: ["Inventory", "Orders", "Operations"],
      },
      {
        title: "Customer & Loyalty Experiences",
        text: "Customer accounts, order history, preferences, rewards, loyalty workflows, personalised experiences, and self-service functionality.",
        points: ["Customers", "Loyalty", "Personalisation"],
      },
      {
        title: "Retail Integrations",
        text: "Connect ERP, POS, ecommerce, marketplaces, payments, logistics, warehouses, and other supported systems.",
        points: ["APIs", "Integrations", "Connected Commerce"],
      },
      {
        title: "Retail Workflow Automation",
        text: "Automate repetitive processes across orders, inventory, notifications, catalogue management, fulfilment, and internal operations.",
        points: ["Automation", "Workflows", "Operations"],
      },
    ],
  },
  businessImpact: {
    title: "After Jabitsoft, retail runs more connected.",
    intro: "Customer experiences and operational systems work better when the information and workflows behind them are connected.",
    dimensions: [
      {
        name: "Shoppers find products faster",
        before: "Complex catalogues are hard to explore",
        text: "Better search, filtering, recommendations, and navigation make complex catalogues easier to explore.",
        tag: "Search",
      },
      {
        name: "Inventory becomes clearer",
        before: "Stock is scattered across systems",
        text: "Teams get better visibility into stock across locations, systems, warehouses, and sales channels.",
        tag: "Inventory",
      },
      {
        name: "Orders move through clearer workflows",
        before: "Order updates are hard to coordinate",
        text: "Connected processes make order status, fulfilment, exceptions, and updates easier to manage.",
        tag: "Orders",
      },
      {
        name: "Channels work together",
        before: "Channels operate separately",
        text: "Connect ecommerce, marketplaces, stores, and internal systems around more consistent product, inventory, and order information.",
        tag: "Channels",
      },
      {
        name: "Less work stays manual",
        before: "Repetitive tasks slow teams down",
        text: "Automation reduces repetitive tasks across orders, inventory updates, notifications, reconciliation, and administration.",
        tag: "Automation",
      },
      {
        name: "Retail data becomes more useful",
        before: "Information lives in separate tools",
        text: "Bring product, customer, order, and inventory information together to support reporting and operational decisions.",
        tag: "Data",
      },
    ],
  },
  cta: {
    title: "Bring us your messiest retail workflow.",
    text: "We review your repos and ops flow, then propose a build you can run. You keep ownership from day one.",
    button: "Talk to Our Experts",
    secondaryButton: "Start a Conversation",
  },
};
