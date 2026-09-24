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
    title: "How Jabisoft helps Retail.",
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
    title: "Retail builds we ship.",
    intro:
      "Practical builds for stores, ecommerce, and operations — each lands in your repos with tests and docs.",
    items: [
      {
        title: "Product recommendations",
        text: "Recommendations from your catalog and shopper behavior — on product pages, carts, and email.",
        points: ["Catalog-based ranking", "Cart and PDP widgets", "Merchandising controls"],
      },
      {
        title: "Inventory search",
        text: "AI search across products, variants, and live stock — staff and shoppers see what is where.",
        points: ["Attribute search", "Live stock by location", "Search analytics"],
      },
      {
        title: "Smart replenishment",
        text: "Reorder suggestions from sales velocity and lead time — buyers approve with clear data.",
        points: ["Store-level logic", "Lead-time handling", "Approval workflow"],
      },
      {
        title: "Checkout operations",
        text: "Stable checkout and order routing across POS and online — failures handled, not firefighted.",
        points: ["Failure recovery", "Routing rules", "POS fixes"],
      },
      {
        title: "Returns automation",
        text: "Guided returns with rules for refund, exchange, or restock — labels and status flow automatically.",
        points: ["Rules engine", "Label generation", "Status tracking"],
      },
      {
        title: "Demand signals",
        text: "Sales and search signals grouped by product and region — planners spot shifts early.",
        points: ["Trend views", "Search demand", "Low-stock alerts"],
      },
    ],
  },
  businessImpact: {
    title: "After Jabisoft, retail runs cleaner.",
    intro:
      "No invented numbers — each outcome below is made measurable in the product and reviewed with your team.",
    dimensions: [
      {
        name: "Shoppers find products",
        before: "Basic search and walkaways",
        text: "Search understands intent and shows relevant products. Shoppers find items and check out.",
        tag: "Search",
      },
      {
        name: "Stock counts trusted",
        before: "Counts differ by system",
        text: "Stock syncs across store and online. Staff promise accurate delivery.",
        tag: "Inventory",
      },
      {
        name: "Shelves stay filled",
        before: "Manual sheets and memory",
        text: "Reorder logic flags what to buy by store. Buyers approve with data.",
        tag: "Planning",
      },
      {
        name: "Orders flow cleanly",
        before: "Manual fixes for failures",
        text: "Checkout handles failures with clear retries. Orders reach fulfillment without rework.",
        tag: "Orders",
      },
      {
        name: "Returns resolve faster",
        before: "Queues waiting on inspection",
        text: "Returns follow rules for refund or restock. Customers get faster resolutions.",
        tag: "Service",
      },
      {
        name: "Plans use live data",
        before: "Stale weekly reports",
        text: "Dashboards show live sales and demand. Teams restock and promote on current data.",
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
