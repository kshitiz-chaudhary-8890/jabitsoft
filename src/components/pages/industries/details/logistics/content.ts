import type { IndustryDetailData } from "../types";

export const logisticsContent: IndustryDetailData = {
  label: "Transportation & Logistics", slug: "logistics", kicker: "Transportation & logistics software",
  hero: {
    headline: "Keep every shipment moving.",
    lede: "From booking and dispatch to fleet management, tracking, delivery, and automation, we build connected logistics software that keeps operations moving from pickup to proof of delivery.",
    primaryCta: "Discuss your logistics project", secondaryCta: "See what we build",
    stats: [
      { value: "Dispatch", label: "Planning & job allocation" },
      { value: "Fleet", label: "Vehicles & driver operations" },
      { value: "Tracking", label: "Shipment visibility" },
      { value: "Integrations", label: "ERP, carriers & logistics systems" },
    ],
    ticker: ["Transportation management", "Dispatch", "Fleet management", "Route planning", "Shipment tracking", "Driver apps", "Warehouse integration", "Proof of delivery", "Logistics automation", "Customer portals", "Analytics"],
  },
  landscape: {
    title: "Logistics runs on coordination.",
    intro: "Every shipment depends on people, vehicles, locations, schedules, inventory, and customers staying connected. When information is fragmented, delays and manual work quickly follow.",
    opportunityTitle: "Better logistics starts with connected operations.",
    forces: [
      { title: "Dispatch complexity", text: "Jobs, drivers, vehicles, locations, time windows, and priorities need to be coordinated continuously." },
      { title: "Limited shipment visibility", text: "Operations teams and customers need reliable status information from pickup through delivery." },
      { title: "Manual processes", text: "Phone calls, spreadsheets, emails, and repeated data entry slow down otherwise straightforward workflows." },
      { title: "Growing delivery expectations", text: "Customers increasingly expect accurate ETAs, real-time updates, and visibility throughout the delivery journey." },
    ],
    opportunities: [
      { title: "Real-time visibility", text: "Give operations teams a clearer view of jobs, vehicles, shipments, and delivery status." },
      { title: "Smarter dispatch", text: "Help teams assign and coordinate work using availability, location, capacity, and operational requirements." },
      { title: "Automated updates", text: "Trigger status changes, notifications, documents, and other routine actions as shipments move through the workflow." },
    ],
  },
  challenges: {
    title: "What creates friction in transportation & logistics.",
    intro: "As shipment volume, customers, drivers, locations, and delivery requirements grow, disconnected systems make operations harder to coordinate.",
    items: [
      { title: "Disconnected dispatch", text: "Jobs, drivers, vehicles, and schedules sit across different tools, making day-to-day planning difficult." },
      { title: "Limited shipment visibility", text: "Teams spend time chasing updates when shipment status and location aren't readily available." },
      { title: "Manual job allocation", text: "Dispatchers repeatedly match jobs, capacity, drivers, vehicles, and delivery requirements by hand." },
      { title: "Inefficient route planning", text: "Poorly coordinated routes can increase travel time, operational effort, and unnecessary mileage." },
      { title: "Delivery exceptions", text: "Delays, failed deliveries, address issues, and other exceptions become difficult to manage without structured workflows." },
    ],
  },
  howWeHelp: {
    title: "How Jabitsoft helps transportation & logistics teams.",
    intro: "We build connected software around the movement of goods—from booking and dispatch to tracking, delivery, and the operational workflows behind them.",
    items: [
      { title: "We connect dispatch operations", text: "Bring jobs, schedules, drivers, vehicles, locations, and delivery requirements into clearer operational workflows." },
      { title: "We build driver applications", text: "Give drivers mobile access to assigned jobs, navigation information, status updates, documents, photos, signatures, and proof of delivery." },
      { title: "We make shipments visible", text: "Build tracking experiences that give internal teams and customers clearer visibility from pickup through delivery." },
      { title: "We automate logistics workflows", text: "Automate job creation, assignment rules, notifications, status updates, documentation, and other repetitive operational processes." },
      { title: "We connect logistics systems", text: "Integrate transportation platforms with ERP, warehouse, ecommerce, mapping, payment, carrier, and supported third-party systems." },
      { title: "We turn operations into usable data", text: "Bring shipment, fleet, driver, customer, and delivery information together for dashboards, reporting, and operational analysis." },
    ],
  },
  useCases: {
    title: "Transportation & logistics software we build.",
    intro: "From operational control platforms to driver and customer experiences, we build software across the transportation and delivery journey.",
    items: [
      { title: "Transportation Management Systems", text: "Manage bookings, jobs, dispatch, shipments, carriers, delivery workflows, and operational information from a connected platform.", points: ["TMS", "Operations", "Dispatch"] },
      { title: "Fleet & Driver Management", text: "Manage drivers, vehicles, availability, assignments, job status, and day-to-day fleet operations.", points: ["Fleet", "Drivers", "Operations"] },
      { title: "Real-Time Shipment Tracking", text: "Give teams and customers visibility into shipment progress, milestones, status changes, and delivery information.", points: ["Tracking", "Visibility", "Customer Experience"] },
      { title: "Dispatch & Route Planning", text: "Help operations teams assign jobs, coordinate resources, plan routes, and respond to changing delivery requirements.", points: ["Dispatch", "Routing", "Planning"] },
      { title: "Driver Mobile Apps", text: "Give drivers the tools they need to receive jobs, update statuses, capture photos and signatures, and complete deliveries from the field.", points: ["Mobile", "Drivers", "POD"] },
      { title: "Customer Logistics Portals", text: "Let customers create bookings, track shipments, access delivery information, manage documents, and review job history.", points: ["Portal", "Self-Service", "Tracking"] },
      { title: "Proof of Delivery", text: "Capture signatures, photos, timestamps, notes, and delivery confirmation digitally and connect them directly to the shipment record.", points: ["POD", "Mobile", "Automation"] },
      { title: "Logistics Integrations", text: "Connect ERP, warehouse systems, ecommerce platforms, maps, payments, carriers, and supported third-party applications.", points: ["APIs", "Integrations", "Connected Systems"] },
    ],
  },
  businessImpact: {
    title: "After Jabitsoft, logistics runs more connected.",
    intro: "When dispatch, drivers, shipments, customers, and operational data work together, teams get clearer visibility and spend less time coordinating work manually.",
    dimensions: [
      { name: "Dispatch gets a clearer view", before: "Jobs scattered across tools", text: "See jobs, assignments, drivers, vehicles, and delivery status through connected operational workflows.", tag: "Dispatch" },
      { name: "Shipments become easier to track", before: "Status updates are hard to find", text: "Give teams and customers clearer visibility into shipment status from pickup through delivery.", tag: "Tracking" },
      { name: "Drivers stay connected", before: "Field updates rely on calls", text: "Mobile workflows keep drivers connected to assignments, updates, documents, and proof-of-delivery processes while in the field.", tag: "Drivers" },
      { name: "Exceptions surface earlier", before: "Issues appear late", text: "Structured statuses and workflows make delays, failed deliveries, and other operational issues easier to identify and manage.", tag: "Exceptions" },
      { name: "Manual coordination decreases", before: "Routine steps stay manual", text: "Automate routine updates, notifications, job actions, documentation, and other repetitive logistics processes.", tag: "Automation" },
      { name: "Operational data becomes useful", before: "Information lives separately", text: "Bring shipment, driver, fleet, customer, and delivery information together for reporting and better operational visibility.", tag: "Data" },
    ],
  },
  cta: {
    title: "Bring us your toughest logistics workflow.",
    text: "Manual dispatch. Disconnected tracking. Driver coordination. Delivery exceptions. Systems that don't talk to each other. Whatever is slowing your operation down, we'll help turn it into software that's easier to manage and ready to scale.",
    button: "Discuss your project", secondaryButton: "Talk to our team",
  },
};
