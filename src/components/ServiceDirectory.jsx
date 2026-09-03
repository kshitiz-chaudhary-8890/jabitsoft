import RevealHeading from "./common/RevealHeading.jsx";

const services = [
  {
    number: "01",
    title: "Agentic AI Development",
    count: "04",
    description:
      "Autonomous AI systems that plan, reason, use tools, and execute business workflows with human oversight.",
    variant: "ai",
  },
  {
    number: "02",
    title: "Cloud Consulting",
    count: "05",
    description:
      "Cloud architecture, migration, optimization, and security designed for resilient and scalable operations.",
    variant: "cloud",
  },
  {
    number: "03",
    title: "Mobile Application Development",
    count: "04",
    description:
      "High-performance mobile products built for iOS and Android with polished interfaces and reliable integrations.",
    variant: "mobile",
  },
  {
    number: "04",
    title: "ERP Services",
    count: "03",
    description:
      "Integrated ERP solutions that connect business processes, automate operations, and improve decision-making.",
    variant: "erp",
  },
  {
    number: "05",
    title: "SEO / Digital Marketing",
    count: "06",
    description:
      "Search and digital growth strategies built around visibility, measurable performance, and qualified traffic.",
    variant: "growth",
  },
  {
    number: "06",
    title: "Website Solutions",
    count: "05",
    description:
      "Fast, scalable web products built with modern frameworks, SSR, and clean design systems.",
    variant: "web",
  },
];

export default function ServiceDirectory() {
  return (
    <section
      className="service-directory"
      aria-labelledby="service-directory-title"
    >
      <div className="service-directory__inner">
        <header className="service-directory__header">
          <p className="service-directory__eyebrow">(Services)</p>

          <RevealHeading id="service-directory-title">
            What we can build for you
          </RevealHeading>

          <p className="service-directory__intro">
            From AI and cloud systems to mobile apps and modern web platforms,
            we build reliable digital products for growing businesses.
          </p>
        </header>

        <div className="service-directory__list">
          {services.map((service) => (
            <article
              className="service-directory__row"
              key={service.title}
              tabIndex={0}
            >
              <div className="service-directory__title-wrap">
                <span className="service-directory__number">
                  {service.number}
                </span>

                <h3>{service.title}</h3>

                <sup>({service.count})</sup>
              </div>

              <p className="service-directory__description">
                {service.description}
              </p>

              <div
                className="service-directory__preview"
                aria-hidden="true"
              >
                <div className="service-directory__diagram-shell">
                  <ServiceHoverDiagram variant={service.variant} />
                </div>
              </div>

              <span className="service-directory__arrow" aria-hidden="true">
                ↗
              </span>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .service-directory,
        .service-directory * {
          box-sizing: border-box;
        }

        .service-directory {
          --service-blue: rgb(0, 153, 255);
          --diagram-accent: #a4f66f;
          position: relative;
          width: 100%;
          padding: clamp(88px, 8vw, 132px) 0 clamp(92px, 8vw, 126px);
          overflow: clip;
          background: #ffffff;
          color: #131313;
          font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        .service-directory__inner {
          width: min(1320px, calc(100% - 64px));
          margin: 0 auto;
        }

        .service-directory__header {
          width: min(760px, 100%);
          margin: 0 auto clamp(62px, 6vw, 92px);
          text-align: center;
        }

        .service-directory__eyebrow {
          margin: 0 0 12px;
          font: 500 15px/23px Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          color: rgb(92, 92, 92);
        }

        .service-directory__header h2 {
          margin: 0;
          font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          font-size: clamp(44px, 4.5vw, 64px);
          line-height: 1.03;
          font-weight: 600;
          letter-spacing: -0.045em;
          color: #131313;
        }

        .service-directory__intro {
          width: min(620px, 100%);
          margin: 20px auto 0;
          font: 400 15px/1.65 Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          color: #737373;
        }

        .service-directory__list {
          position: relative;
          border-top: 1px solid #dedede;
        }

        .service-directory__row {
          position: relative;
          z-index: 1;
          min-height: 132px;
          display: grid;
          grid-template-columns: minmax(360px, 0.9fr) minmax(280px, 0.72fr) 54px;
          gap: clamp(26px, 4vw, 64px);
          align-items: center;
          padding: 26px 4px;
          border-bottom: 1px solid #dedede;
          outline: none;
        }

        .service-directory__row:hover,
        .service-directory__row:focus-visible {
          z-index: 20;
          border-color: #cfcfcf;
        }

        .service-directory__title-wrap {
          min-width: 0;
          display: flex;
          align-items: baseline;
          gap: 12px;
        }

        .service-directory__number {
          flex: 0 0 auto;
          min-width: 28px;
          font-size: 12px;
          line-height: 1;
          font-weight: 500;
          color: #9a9a9a;
          font-variant-numeric: tabular-nums;
          transition: color 240ms ease;
        }

        .service-directory__title-wrap h3 {
          min-width: 0;
          margin: 0;
          font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          font-size: clamp(28px, 2.5vw, 38px);
          line-height: 1.08;
          font-weight: 500;
          letter-spacing: -0.04em;
          color: #1a1a1a;
          transition:
            color 240ms ease,
            transform 240ms ease;
        }

        .service-directory__title-wrap sup {
          align-self: flex-start;
          margin-top: 3px;
          font-size: 10px;
          line-height: 1;
          font-weight: 500;
          color: #8e8e8e;
        }

        .service-directory__description {
          width: min(430px, 100%);
          margin: 0;
          font-size: 13px;
          line-height: 1.55;
          font-weight: 400;
          color: #898989;
          transition:
            color 240ms ease,
            opacity 240ms ease;
        }

        .service-directory__arrow {
          justify-self: end;
          display: grid;
          place-items: center;
          width: 42px;
          height: 42px;
          border: 1px solid #dedede;
          border-radius: 50%;
          font-size: 19px;
          line-height: 1;
          color: #242424;
          background: #fff;
          transition:
            color 240ms ease,
            border-color 240ms ease,
            background-color 240ms ease,
            transform 240ms ease;
        }

        .service-directory__row:hover .service-directory__number,
        .service-directory__row:focus-visible .service-directory__number {
          color: var(--service-blue);
        }

        .service-directory__row:hover .service-directory__title-wrap h3,
        .service-directory__row:focus-visible .service-directory__title-wrap h3 {
          transform: translateX(3px);
          color: #0f0f0f;
        }

        .service-directory__row:hover .service-directory__description,
        .service-directory__row:focus-visible .service-directory__description {
          color: #5f5f5f;
        }

        .service-directory__row:hover .service-directory__arrow,
        .service-directory__row:focus-visible .service-directory__arrow {
          color: #fff;
          border-color: var(--service-blue);
          background: var(--service-blue);
          transform: rotate(8deg);
        }

        /* Hover diagram: always mounted, hidden until row hover/focus. */
        .service-directory__preview {
          position: absolute;
          top: 50%;
          right: clamp(82px, 8.6vw, 132px);
          z-index: 30;
          width: clamp(320px, 29vw, 420px);
          height: 204px;
          pointer-events: none;
          opacity: 0;
          visibility: hidden;
          transform: translate3d(0, calc(-50% + 18px), 0) scale(0.94) rotate(-1.4deg);
          transform-origin: 54% 55%;
          transition:
            opacity 220ms ease,
            visibility 220ms ease,
            transform 360ms cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .service-directory__row:hover .service-directory__preview,
        .service-directory__row:focus-visible .service-directory__preview {
          opacity: 1;
          visibility: visible;
          transform: translate3d(0, -50%, 0) scale(1) rotate(-1.4deg);
        }

        .service-directory__diagram-shell {
          width: 100%;
          height: 100%;
          overflow: hidden;
          border: 6px solid #fff;
          border-radius: 18px;
          background: #0d0d0d;
          box-shadow:
            0 24px 65px rgba(0, 0, 0, 0.18),
            0 5px 16px rgba(0, 0, 0, 0.09);
        }

        /* ---------------- Shared hover diagram styles ---------------- */

        .sd-diagram {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          border-radius: 12px;
          background:
            radial-gradient(circle at 84% 8%, rgba(255,255,255,.05), transparent 28%),
            linear-gradient(145deg, #1c1c1c 0%, #101010 55%, #080808 100%);
          color: #fff;
        }

        .sd-grid {
          position: absolute;
          inset: 0;
          opacity: .34;
          background-image:
            linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px);
          background-size: 24px 24px;
          -webkit-mask-image: radial-gradient(circle at center, #000 20%, transparent 78%);
          mask-image: radial-gradient(circle at center, #000 20%, transparent 78%);
        }

        .sd-accent {
          color: var(--diagram-accent);
        }

        /* AI */
        .sd-ai-lines {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        .sd-ai-lines path {
          fill: none;
          stroke: rgba(164,246,111,.24);
          stroke-width: 1.3;
          vector-effect: non-scaling-stroke;
          stroke-dasharray: 5 8;
        }

        .sd-ai-core {
          position: absolute;
          left: 50%;
          top: 53%;
          width: 84px;
          height: 84px;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          border: 1px solid rgba(164,246,111,.28);
          background: rgba(14,18,12,.94);
          box-shadow:
            0 0 0 10px rgba(164,246,111,.025),
            0 0 34px rgba(164,246,111,.08);
          z-index: 3;
        }

        .sd-ai-core-icon {
          display: grid;
          place-items: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--diagram-accent);
          color: #101010;
          font-size: 10px;
          font-weight: 800;
        }

        .sd-ai-core strong {
          margin-top: 6px;
          font-size: 10px;
        }

        .sd-ai-core small {
          margin-top: 1px;
          font-size: 7px;
          color: rgba(255,255,255,.38);
        }

        .sd-ai-chip {
          position: absolute;
          width: 86px;
          padding: 8px 9px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,.08);
          background: rgba(18,18,18,.95);
          display: grid;
          grid-template-columns: 22px 1fr;
          column-gap: 6px;
          z-index: 4;
        }

        .sd-ai-chip > span {
          grid-row: 1 / span 2;
          display: grid;
          place-items: center;
          width: 22px;
          height: 22px;
          border-radius: 7px;
          background: rgba(164,246,111,.08);
          color: var(--diagram-accent);
          font-size: 7px;
          font-weight: 700;
        }

        .sd-ai-chip strong {
          font-size: 8px;
          color: rgba(255,255,255,.82);
        }

        .sd-ai-chip small {
          margin-top: 1px;
          font-size: 6px;
          color: rgba(255,255,255,.34);
        }

        .sd-ai-memory { left: 8%; top: 12%; }
        .sd-ai-tools { right: 8%; top: 12%; }
        .sd-ai-llm { left: 8%; bottom: 11%; }
        .sd-ai-flow { right: 8%; bottom: 11%; }

        .sd-pulse {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--diagram-accent);
          box-shadow: 0 0 14px rgba(164,246,111,.65);
          z-index: 5;
        }

        .sd-pulse-a { left: 28%; top: 48%; }
        .sd-pulse-b { right: 25%; bottom: 29%; opacity: .6; }

        /* Cloud */
        .sd-cloud-top {
          position: absolute;
          left: 50%;
          top: 16px;
          transform: translateX(-50%);
          min-width: 194px;
          padding: 9px 12px;
          display: flex;
          align-items: center;
          gap: 10px;
          border: 1px solid rgba(164,246,111,.16);
          border-radius: 14px;
          background: rgba(20,24,18,.9);
          z-index: 3;
        }

        .sd-cloud-icon {
          display: grid;
          place-items: center;
          width: 30px;
          height: 30px;
          border-radius: 10px;
          background: rgba(164,246,111,.1);
          color: var(--diagram-accent);
          font-size: 17px;
        }

        .sd-cloud-top strong,
        .sd-cloud-top small {
          display: block;
        }

        .sd-cloud-top strong {
          font-size: 10px;
        }

        .sd-cloud-top small {
          margin-top: 2px;
          font-size: 7px;
          color: rgba(255,255,255,.35);
        }

        .sd-cloud-lines {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        .sd-cloud-lines path {
          fill: none;
          stroke: rgba(164,246,111,.2);
          stroke-width: 1.2;
          stroke-dasharray: 4 7;
        }

        .sd-cloud-nodes {
          position: absolute;
          left: 18px;
          right: 18px;
          bottom: 17px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 9px;
          z-index: 3;
        }

        .sd-cloud-node {
          min-width: 0;
          padding: 10px 9px;
          border: 1px solid rgba(255,255,255,.06);
          border-radius: 12px;
          background: rgba(255,255,255,.018);
        }

        .sd-cloud-node span {
          display: block;
          width: 16px;
          height: 4px;
          margin-bottom: 7px;
          border-radius: 999px;
          background: var(--diagram-accent);
          opacity: .65;
        }

        .sd-cloud-node strong {
          display: block;
          font-size: 8px;
        }

        .sd-cloud-node small {
          display: block;
          margin-top: 2px;
          font-size: 6px;
          color: rgba(255,255,255,.3);
        }

        /* Mobile */
        .sd-phone {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 91px;
          height: 166px;
          transform: translate(-50%, -50%) rotate(-.6deg);
          border: 1px solid rgba(255,255,255,.13);
          border-radius: 20px;
          background: #080808;
          padding: 5px;
          box-shadow: 0 20px 40px rgba(0,0,0,.28);
          z-index: 3;
        }

        .sd-phone-screen {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          border-radius: 15px;
          padding: 17px 8px 9px;
          background:
            radial-gradient(circle at 70% 8%, rgba(164,246,111,.11), transparent 34%),
            #121212;
        }

        .sd-phone-notch {
          position: absolute;
          top: 6px;
          left: 50%;
          width: 28px;
          height: 5px;
          transform: translateX(-50%);
          border-radius: 999px;
          background: rgba(255,255,255,.12);
        }

        .sd-mobile-greeting {
          font-size: 7px;
          color: rgba(255,255,255,.38);
        }

        .sd-mobile-greeting strong {
          display: block;
          margin-top: 3px;
          font-size: 10px;
          color: #fff;
        }

        .sd-mobile-hero {
          margin-top: 10px;
          padding: 9px 7px;
          border: 1px solid rgba(164,246,111,.12);
          border-radius: 10px;
          background: rgba(164,246,111,.035);
        }

        .sd-mobile-hero span {
          display: block;
          width: 18px;
          height: 18px;
          border-radius: 6px;
          background: var(--diagram-accent);
          opacity: .9;
        }

        .sd-mobile-hero i {
          display: block;
          width: 70%;
          height: 5px;
          margin-top: 7px;
          border-radius: 99px;
          background: rgba(255,255,255,.1);
        }

        .sd-mobile-nav {
          position: absolute;
          left: 8px;
          right: 8px;
          bottom: 8px;
          display: flex;
          justify-content: space-between;
        }

        .sd-mobile-nav i {
          width: 13px;
          height: 4px;
          border-radius: 99px;
          background: rgba(255,255,255,.08);
        }

        .sd-mobile-nav i.active {
          background: var(--diagram-accent);
        }

        .sd-mobile-badge {
          position: absolute;
          padding: 8px 10px;
          border: 1px solid rgba(255,255,255,.07);
          border-radius: 11px;
          background: rgba(17,17,17,.95);
          z-index: 2;
        }

        .sd-mobile-badge strong {
          display: block;
          font-size: 8px;
        }

        .sd-mobile-badge small {
          display: block;
          margin-top: 2px;
          font-size: 6px;
          color: rgba(255,255,255,.3);
        }

        .sd-mobile-ios { left: 11%; top: 28%; }
        .sd-mobile-android { right: 10%; bottom: 25%; }

        /* ERP */
        .sd-erp-window {
          position: absolute;
          inset: 14px;
          display: grid;
          grid-template-columns: 54px 1fr;
          grid-template-rows: 30px 1fr;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,.07);
          border-radius: 14px;
          background: rgba(255,255,255,.012);
        }

        .sd-erp-topbar {
          grid-column: 1 / -1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 10px;
          border-bottom: 1px solid rgba(255,255,255,.05);
        }

        .sd-erp-topbar strong {
          font-size: 8px;
        }

        .sd-erp-topbar span {
          width: 36px;
          height: 8px;
          border-radius: 99px;
          background: rgba(164,246,111,.08);
        }

        .sd-erp-sidebar {
          padding: 10px;
          display: grid;
          align-content: start;
          gap: 8px;
          border-right: 1px solid rgba(255,255,255,.05);
        }

        .sd-erp-sidebar i {
          height: 6px;
          border-radius: 99px;
          background: rgba(255,255,255,.06);
        }

        .sd-erp-sidebar i.active {
          background: var(--diagram-accent);
        }

        .sd-erp-content {
          padding: 10px;
          display: grid;
          grid-template-columns: 1.05fr .95fr;
          gap: 8px;
        }

        .sd-erp-chart {
          min-height: 80px;
          display: flex;
          align-items: end;
          gap: 7px;
          padding: 12px 10px 8px;
          border: 1px solid rgba(255,255,255,.05);
          border-radius: 10px;
          background: rgba(255,255,255,.012);
        }

        .sd-erp-chart span {
          flex: 1;
          border-radius: 5px 5px 2px 2px;
          background: linear-gradient(180deg, var(--diagram-accent), rgba(164,246,111,.16));
        }

        .sd-erp-chart span:nth-child(1) { height: 28%; }
        .sd-erp-chart span:nth-child(2) { height: 52%; }
        .sd-erp-chart span:nth-child(3) { height: 38%; }
        .sd-erp-chart span:nth-child(4) { height: 74%; }
        .sd-erp-chart span:nth-child(5) { height: 60%; }

        .sd-erp-modules {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 7px;
        }

        .sd-erp-modules div {
          padding: 8px;
          border: 1px solid rgba(255,255,255,.05);
          border-radius: 9px;
          background: rgba(255,255,255,.012);
        }

        .sd-erp-modules b {
          display: block;
          font-size: 7px;
          color: var(--diagram-accent);
        }

        .sd-erp-modules small {
          display: block;
          margin-top: 3px;
          font-size: 6px;
          color: rgba(255,255,255,.28);
        }

        /* Growth / SEO */
        .sd-seo-toolbar {
          position: absolute;
          left: 14px;
          right: 14px;
          top: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .sd-seo-toolbar small,
        .sd-seo-toolbar strong {
          display: block;
        }

        .sd-seo-toolbar small {
          font-size: 6px;
          letter-spacing: .1em;
          color: rgba(255,255,255,.28);
        }

        .sd-seo-toolbar strong {
          margin-top: 2px;
          font-size: 9px;
        }

        .sd-seo-toolbar > span {
          padding: 5px 7px;
          border: 1px solid rgba(255,255,255,.06);
          border-radius: 999px;
          font-size: 6px;
          color: rgba(255,255,255,.4);
        }

        .sd-seo-kpis {
          position: absolute;
          left: 14px;
          right: 14px;
          top: 49px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 7px;
        }

        .sd-seo-kpis div {
          padding: 7px 8px;
          border: 1px solid rgba(255,255,255,.05);
          border-radius: 9px;
          background: rgba(255,255,255,.014);
        }

        .sd-seo-kpis small,
        .sd-seo-kpis strong,
        .sd-seo-kpis em {
          display: block;
        }

        .sd-seo-kpis small {
          font-size: 6px;
          color: rgba(255,255,255,.25);
        }

        .sd-seo-kpis strong {
          margin-top: 2px;
          font-size: 9px;
        }

        .sd-seo-kpis em {
          margin-top: 1px;
          font-size: 6px;
          font-style: normal;
          color: var(--diagram-accent);
        }

        .sd-seo-chart {
          position: absolute;
          left: 16px;
          right: 16px;
          bottom: 18px;
          height: 76px;
          border-left: 1px solid rgba(255,255,255,.05);
          border-bottom: 1px solid rgba(255,255,255,.05);
        }

        .sd-seo-chart::before,
        .sd-seo-chart::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          height: 1px;
          background: rgba(255,255,255,.035);
        }

        .sd-seo-chart::before { top: 33%; }
        .sd-seo-chart::after { top: 66%; }

        .sd-seo-chart svg {
          position: absolute;
          inset: 6px 0 0;
          width: 100%;
          height: calc(100% - 6px);
          overflow: visible;
        }

        .sd-seo-chart polyline {
          fill: none;
          stroke: var(--diagram-accent);
          stroke-width: 2.2;
          stroke-dasharray: 900;
          stroke-dashoffset: 900;
          vector-effect: non-scaling-stroke;
          filter: drop-shadow(0 0 7px rgba(164,246,111,.24));
        }

        .sd-seo-dot {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--diagram-accent);
          box-shadow: 0 0 12px rgba(164,246,111,.55);
        }

        .sd-seo-dot-one { left: 29%; bottom: 42%; }
        .sd-seo-dot-two { left: 61%; bottom: 67%; }
        .sd-seo-dot-three { right: 5%; top: 3%; }

        /* Web */
        .sd-browser {
          position: absolute;
          inset: 13px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,.08);
          border-radius: 14px;
          background: rgba(255,255,255,.012);
        }

        .sd-browser-top {
          height: 30px;
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 0 9px;
          border-bottom: 1px solid rgba(255,255,255,.05);
        }

        .sd-browser-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,.14);
        }

        .sd-address {
          flex: 1;
          height: 17px;
          margin-left: 5px;
          display: grid;
          place-items: center;
          border: 1px solid rgba(255,255,255,.05);
          border-radius: 999px;
          background: rgba(255,255,255,.018);
          font-size: 6px;
          color: rgba(255,255,255,.27);
        }

        .sd-browser-body {
          display: grid;
          grid-template-columns: 44px 1fr;
          height: calc(100% - 30px);
        }

        .sd-web-sidebar {
          padding: 10px;
          display: grid;
          align-content: start;
          gap: 8px;
          border-right: 1px solid rgba(255,255,255,.05);
        }

        .sd-web-sidebar i {
          height: 6px;
          border-radius: 999px;
          background: rgba(255,255,255,.065);
        }

        .sd-web-sidebar i.active {
          background: var(--diagram-accent);
        }

        .sd-web-content {
          padding: 10px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr auto;
          gap: 8px;
        }

        .sd-web-code,
        .sd-web-preview {
          border: 1px solid rgba(255,255,255,.05);
          border-radius: 10px;
          background: rgba(255,255,255,.012);
        }

        .sd-web-code {
          padding: 12px;
        }

        .sd-code-line {
          height: 5px;
          margin-bottom: 7px;
          border-radius: 99px;
          background: linear-gradient(90deg, rgba(164,246,111,.42), rgba(255,255,255,.06));
        }

        .sd-code-line:nth-child(1) { width: 80%; }
        .sd-code-line:nth-child(2) { width: 55%; }
        .sd-code-line:nth-child(3) { width: 70%; }
        .sd-code-line:nth-child(4) { width: 45%; }

        .sd-web-preview {
          padding: 11px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .sd-web-preview span {
          align-self: flex-start;
          padding: 4px 6px;
          border-radius: 999px;
          background: rgba(164,246,111,.07);
          color: var(--diagram-accent);
          font-size: 6px;
        }

        .sd-web-preview strong {
          margin-top: 7px;
          font-size: 9px;
        }

        .sd-web-preview small {
          margin-top: 2px;
          font-size: 6px;
          color: rgba(255,255,255,.28);
        }

        .sd-web-bottom {
          grid-column: 1 / -1;
          display: flex;
          gap: 6px;
        }

        .sd-web-bottom span {
          flex: 1;
          padding: 5px 6px;
          border: 1px solid rgba(255,255,255,.05);
          border-radius: 7px;
          font-size: 6px;
          color: rgba(255,255,255,.3);
          text-align: center;
        }

        /* Same subtle animated language used in the original ServiceCard diagrams. */
        @media (prefers-reduced-motion: no-preference) {
          .sd-ai-core {
            animation: sdAiCore 3.2s ease-in-out infinite;
          }

          .sd-ai-lines path,
          .sd-cloud-lines path {
            animation: sdFlow 5s linear infinite;
          }

          .sd-ai-memory { animation: sdFloatA 4.4s ease-in-out infinite; }
          .sd-ai-tools { animation: sdFloatB 4.8s ease-in-out infinite .25s; }
          .sd-ai-llm { animation: sdFloatB 4.3s ease-in-out infinite .5s; }
          .sd-ai-flow { animation: sdFloatA 4.9s ease-in-out infinite .75s; }

          .sd-pulse-a { animation: sdPulse 1.8s ease-in-out infinite; }
          .sd-pulse-b { animation: sdPulse 2.1s ease-in-out infinite .4s; }

          .sd-cloud-top {
            animation: sdCloudBob 4s ease-in-out infinite;
          }

          .sd-cloud-node {
            animation: sdServerBlink 3.3s ease-in-out infinite;
          }

          .sd-cloud-node:nth-child(2) { animation-delay: .35s; }
          .sd-cloud-node:nth-child(3) { animation-delay: .7s; }

          .sd-phone {
            animation: sdPhoneFloat 4s ease-in-out infinite;
          }

          .sd-mobile-hero span,
          .sd-mobile-nav i.active {
            animation: sdSoftGlow 2.2s ease-in-out infinite;
          }

          .sd-mobile-ios { animation: sdFloatA 4.5s ease-in-out infinite; }
          .sd-mobile-android { animation: sdFloatB 4.7s ease-in-out infinite .35s; }

          .sd-erp-topbar span,
          .sd-erp-sidebar i.active {
            animation: sdSoftGlow 2s ease-in-out infinite;
          }

          .sd-erp-chart span {
            transform-origin: center bottom;
            animation: sdBar 3.4s ease-in-out infinite;
          }

          .sd-erp-chart span:nth-child(2) { animation-delay: .18s; }
          .sd-erp-chart span:nth-child(3) { animation-delay: .36s; }
          .sd-erp-chart span:nth-child(4) { animation-delay: .54s; }
          .sd-erp-chart span:nth-child(5) { animation-delay: .72s; }

          .sd-erp-modules div {
            animation: sdModule 3.8s ease-in-out infinite;
          }

          .sd-erp-modules div:nth-child(2) { animation-delay: .3s; }
          .sd-erp-modules div:nth-child(3) { animation-delay: .6s; }
          .sd-erp-modules div:nth-child(4) { animation-delay: .9s; }

          .sd-seo-chart polyline {
            animation: sdChartDraw 4.8s ease-in-out infinite;
          }

          .sd-seo-dot-one { animation: sdPulse 2s ease-in-out infinite; }
          .sd-seo-dot-two { animation: sdPulse 2s ease-in-out infinite .4s; }
          .sd-seo-dot-three { animation: sdPulse 2s ease-in-out infinite .8s; }

          .sd-seo-kpis em {
            animation: sdSoftGlow 2.6s ease-in-out infinite;
          }

          .sd-code-line {
            animation: sdCode 3.4s ease-in-out infinite;
          }

          .sd-code-line:nth-child(2) { animation-delay: .22s; }
          .sd-code-line:nth-child(3) { animation-delay: .44s; }
          .sd-code-line:nth-child(4) { animation-delay: .66s; }

          .sd-web-preview {
            animation: sdPreviewFloat 4.4s ease-in-out infinite;
          }

          .sd-web-sidebar i.active,
          .sd-web-preview span {
            animation: sdSoftGlow 2.2s ease-in-out infinite;
          }

          @keyframes sdAiCore {
            0%, 100% { transform: translate(-50%, -50%) scale(1); }
            50% { transform: translate(-50%, -50%) scale(1.035); }
          }

          @keyframes sdFlow {
            to { stroke-dashoffset: -52; }
          }

          @keyframes sdFloatA {
            0%, 100% { transform: translate3d(0, 0, 0); }
            50% { transform: translate3d(0, -4px, 0); }
          }

          @keyframes sdFloatB {
            0%, 100% { transform: translate3d(0, 0, 0); }
            50% { transform: translate3d(0, 4px, 0); }
          }

          @keyframes sdPulse {
            0%, 100% { opacity: .45; transform: scale(.85); }
            50% { opacity: 1; transform: scale(1.25); }
          }

          @keyframes sdCloudBob {
            0%, 100% { transform: translate3d(-50%, 0, 0); }
            50% { transform: translate3d(-50%, -5px, 0); }
          }

          @keyframes sdServerBlink {
            0%, 100% {
              border-color: rgba(255,255,255,.06);
              background: rgba(255,255,255,.018);
            }
            50% {
              border-color: rgba(164,246,111,.22);
              background: rgba(164,246,111,.035);
            }
          }

          @keyframes sdPhoneFloat {
            0%, 100% { transform: translate(-50%, -50%) rotate(-.6deg); }
            50% { transform: translate(-50%, calc(-50% - 5px)) rotate(.6deg); }
          }

          @keyframes sdSoftGlow {
            0%, 100% {
              opacity: .7;
              filter: drop-shadow(0 0 0 rgba(164,246,111,0));
            }
            50% {
              opacity: 1;
              filter: drop-shadow(0 0 7px rgba(164,246,111,.32));
            }
          }

          @keyframes sdBar {
            0%, 100% { transform: scaleY(.94); opacity: .72; }
            50% { transform: scaleY(1.03); opacity: 1; }
          }

          @keyframes sdModule {
            0%, 100% {
              border-color: rgba(255,255,255,.05);
              transform: translate3d(0, 0, 0);
            }
            50% {
              border-color: rgba(164,246,111,.15);
              transform: translate3d(0, -2px, 0);
            }
          }

          @keyframes sdChartDraw {
            0% { stroke-dashoffset: 900; opacity: .3; }
            35%, 70% { stroke-dashoffset: 0; opacity: 1; }
            100% { stroke-dashoffset: -900; opacity: .3; }
          }

          @keyframes sdCode {
            0%, 100% {
              opacity: .5;
              transform: scaleX(.96);
              transform-origin: left center;
            }
            50% {
              opacity: 1;
              transform: scaleX(1);
              transform-origin: left center;
            }
          }

          @keyframes sdPreviewFloat {
            0%, 100% { transform: translate3d(0, 0, 0); }
            50% { transform: translate3d(0, -4px, 0); }
          }
        }

        @media (max-width: 1080px) {
          .service-directory__row {
            grid-template-columns: minmax(330px, 1fr) minmax(230px, .62fr) 48px;
            gap: 28px;
          }

          .service-directory__preview {
            right: 70px;
            width: 320px;
            height: 184px;
          }
        }

        @media (max-width: 900px) {
          .service-directory {
            padding: 82px 0 88px;
          }

          .service-directory__inner {
            width: min(100% - 40px, 1320px);
          }

          .service-directory__header {
            margin-bottom: 54px;
          }

          .service-directory__row {
            min-height: 122px;
            grid-template-columns: minmax(0, 1fr) 44px;
            gap: 20px;
          }

          .service-directory__description {
            grid-column: 1;
            width: min(620px, 92%);
            margin-top: -6px;
          }

          .service-directory__arrow {
            grid-column: 2;
            grid-row: 1 / span 2;
          }

          .service-directory__preview {
            display: none;
          }
        }

        @media (max-width: 640px) {
          .service-directory {
            padding: 66px 0 72px;
          }

          .service-directory__inner {
            width: min(100% - 28px, 1320px);
          }

          .service-directory__header {
            text-align: left;
            margin-bottom: 44px;
          }

          .service-directory__header h2 {
            font-size: 40px;
            line-height: 1.06;
          }

          .service-directory__intro {
            margin-left: 0;
            font-size: 14px;
          }

          .service-directory__row {
            min-height: 116px;
            padding: 22px 0;
          }

          .service-directory__title-wrap {
            gap: 8px;
            flex-wrap: wrap;
          }

          .service-directory__number {
            min-width: 24px;
          }

          .service-directory__title-wrap h3 {
            font-size: 25px;
          }

          .service-directory__description {
            width: 100%;
            font-size: 12.5px;
          }

          .service-directory__arrow {
            width: 38px;
            height: 38px;
            font-size: 17px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .service-directory__number,
          .service-directory__title-wrap h3,
          .service-directory__description,
          .service-directory__arrow,
          .service-directory__preview {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}

function ServiceHoverDiagram({ variant }) {
  switch (variant) {
    case "ai":
      return <AiDiagram />;
    case "cloud":
      return <CloudDiagram />;
    case "mobile":
      return <MobileDiagram />;
    case "erp":
      return <ErpDiagram />;
    case "growth":
      return <GrowthDiagram />;
    case "web":
    default:
      return <WebDiagram />;
  }
}

function AiDiagram() {
  return (
    <div className="sd-diagram">
      <div className="sd-grid" />

      <svg className="sd-ai-lines" viewBox="0 0 400 200" preserveAspectRatio="none">
        <path d="M200 106 C152 72 126 58 90 42" />
        <path d="M200 106 C248 72 274 58 310 42" />
        <path d="M200 106 C153 137 126 151 90 161" />
        <path d="M200 106 C247 137 274 151 310 161" />
      </svg>

      <div className="sd-ai-chip sd-ai-memory">
        <span>M</span>
        <strong>Memory</strong>
        <small>Context</small>
      </div>

      <div className="sd-ai-chip sd-ai-tools">
        <span>T</span>
        <strong>Tools</strong>
        <small>Actions</small>
      </div>

      <div className="sd-ai-chip sd-ai-llm">
        <span>LLM</span>
        <strong>Reasoning</strong>
        <small>Models</small>
      </div>

      <div className="sd-ai-chip sd-ai-flow">
        <span>↗</span>
        <strong>Workflow</strong>
        <small>Automation</small>
      </div>

      <div className="sd-ai-core">
        <span className="sd-ai-core-icon">AI</span>
        <strong>AGENT</strong>
        <small>orchestrator</small>
      </div>

      <i className="sd-pulse sd-pulse-a" />
      <i className="sd-pulse sd-pulse-b" />
    </div>
  );
}

function CloudDiagram() {
  return (
    <div className="sd-diagram">
      <div className="sd-grid" />

      <svg className="sd-cloud-lines" viewBox="0 0 400 200" preserveAspectRatio="none">
        <path d="M200 65 C170 93 122 104 84 140" />
        <path d="M200 65 C200 93 200 110 200 140" />
        <path d="M200 65 C230 93 278 104 316 140" />
      </svg>

      <div className="sd-cloud-top">
        <span className="sd-cloud-icon">☁</span>
        <div>
          <strong>Cloud Infrastructure</strong>
          <small>Multi-region · secure · scalable</small>
        </div>
      </div>

      <div className="sd-cloud-nodes">
        <div className="sd-cloud-node">
          <span />
          <strong>Compute</strong>
          <small>Auto scaling</small>
        </div>
        <div className="sd-cloud-node">
          <span />
          <strong>Storage</strong>
          <small>Distributed</small>
        </div>
        <div className="sd-cloud-node">
          <span />
          <strong>DevOps</strong>
          <small>Continuous</small>
        </div>
      </div>
    </div>
  );
}

function MobileDiagram() {
  return (
    <div className="sd-diagram">
      <div className="sd-grid" />

      <div className="sd-mobile-badge sd-mobile-ios">
        <strong>iOS</strong>
        <small>Native quality</small>
      </div>

      <div className="sd-mobile-badge sd-mobile-android">
        <strong>Android</strong>
        <small>Cross-platform</small>
      </div>

      <div className="sd-phone">
        <div className="sd-phone-screen">
          <span className="sd-phone-notch" />

          <div className="sd-mobile-greeting">
            Welcome back
            <strong>Your workspace</strong>
          </div>

          <div className="sd-mobile-hero">
            <span />
            <i />
          </div>

          <div className="sd-mobile-nav">
            <i className="active" />
            <i />
            <i />
            <i />
          </div>
        </div>
      </div>
    </div>
  );
}

function ErpDiagram() {
  return (
    <div className="sd-diagram">
      <div className="sd-grid" />

      <div className="sd-erp-window">
        <div className="sd-erp-topbar">
          <strong>ERP Operations</strong>
          <span />
        </div>

        <aside className="sd-erp-sidebar">
          <i className="active" />
          <i />
          <i />
          <i />
          <i />
        </aside>

        <main className="sd-erp-content">
          <div className="sd-erp-chart">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>

          <div className="sd-erp-modules">
            <div>
              <b>Finance</b>
              <small>Live data</small>
            </div>
            <div>
              <b>Inventory</b>
              <small>Connected</small>
            </div>
            <div>
              <b>HR</b>
              <small>Automated</small>
            </div>
            <div>
              <b>Ops</b>
              <small>Unified</small>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function GrowthDiagram() {
  return (
    <div className="sd-diagram">
      <div className="sd-grid" />

      <div className="sd-seo-toolbar">
        <div>
          <small>GROWTH OVERVIEW</small>
          <strong>Organic performance</strong>
        </div>
        <span>LIVE</span>
      </div>

      <div className="sd-seo-kpis">
        <div>
          <small>Traffic</small>
          <strong>128K</strong>
          <em>+34%</em>
        </div>
        <div>
          <small>Leads</small>
          <strong>4.8K</strong>
          <em>+21%</em>
        </div>
        <div>
          <small>Rankings</small>
          <strong>186</strong>
          <em>+42%</em>
        </div>
      </div>

      <div className="sd-seo-chart">
        <svg viewBox="0 0 320 100" preserveAspectRatio="none">
          <polyline points="0,88 35,79 66,82 102,63 138,68 176,43 211,48 248,26 284,31 320,8" />
        </svg>
        <i className="sd-seo-dot sd-seo-dot-one" />
        <i className="sd-seo-dot sd-seo-dot-two" />
        <i className="sd-seo-dot sd-seo-dot-three" />
      </div>
    </div>
  );
}

function WebDiagram() {
  return (
    <div className="sd-diagram">
      <div className="sd-grid" />

      <div className="sd-browser">
        <div className="sd-browser-top">
          <i className="sd-browser-dot" />
          <i className="sd-browser-dot" />
          <i className="sd-browser-dot" />
          <div className="sd-address">jabitsoft.com</div>
        </div>

        <div className="sd-browser-body">
          <aside className="sd-web-sidebar">
            <i className="active" />
            <i />
            <i />
            <i />
          </aside>

          <main className="sd-web-content">
            <div className="sd-web-code">
              <div className="sd-code-line" />
              <div className="sd-code-line" />
              <div className="sd-code-line" />
              <div className="sd-code-line" />
            </div>

            <div className="sd-web-preview">
              <span>Next.js</span>
              <strong>Production UI</strong>
              <small>fast · scalable · reusable</small>
            </div>

            <div className="sd-web-bottom">
              <span>SSR / SSG</span>
              <span>Design System</span>
              <span>API</span>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
