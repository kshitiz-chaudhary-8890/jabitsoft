import type { CSSProperties, ReactNode } from "react";

import type { ServiceDetailData } from "./types";
import styles from "./ServiceDetailPage.module.css";

type VisualProps = { data: ServiceDetailData };

function VisualFrame({
  data,
  title,
  footer,
  children,
}: VisualProps & { title: string; footer: string[]; children: ReactNode }) {
  return (
    <div
      className={styles.systemMap}
      aria-label={`${data.label} delivery blueprint`}
      data-motion-system-map
    >
      <div className={styles.mapHeader}>
        <span>{title}</span>
        <span className={styles.status}>
          <i />
          System online
        </span>
      </div>
      {children}
      <div className={styles.mapFooter}>
        {footer.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </div>
  );
}

function AgenticVisual({ data }: VisualProps) {
  const nodes = data.process.steps.slice(0, 3);

  return (
    <VisualFrame
      data={data}
      title="Delivery blueprint"
      footer={["Strategy-led", "Production-ready", "Client-owned"]}
    >
      <div className={styles.mapBody}>
        <div className={styles.mapAxis}>
          <span>Input</span>
          <span>Decision</span>
          <span>Action</span>
        </div>
        <div className={styles.flowLine}>
          <i />
          <i />
          <i />
        </div>
        {nodes.map((step, index) => (
          <div
            className={`${styles.mapNode} ${styles[`mapNode${index + 1}`]}`}
            key={step.title}
            data-motion-map-node
          >
            <small>0{index + 1}</small>
            <strong>{step.title}</strong>
            <em>{step.output}</em>
          </div>
        ))}
        <div className={styles.mapPulse}>
          <span>JS</span>
          <small>Human checkpoint</small>
        </div>
      </div>
    </VisualFrame>
  );
}

function CloudVisual({ data }: VisualProps) {
  const nodes = ["Workloads", "Data", "Delivery", "Security"];

  return (
    <VisualFrame
      data={data}
      title="Cloud topology"
      footer={["Multi-region", "Policy-controlled", "Observable"]}
    >
      <div className={`${styles.mapBody} ${styles.cloudVisual}`}>
        <div className={styles.cloudRing} aria-hidden="true" />
        <div className={styles.cloudCore} data-motion-map-node>
          <small>Platform core</small>
          <strong>Secure landing zone</strong>
          <em>Healthy</em>
        </div>
        {nodes.map((node, index) => (
          <div
            className={`${styles.cloudNode} ${styles[`cloudNode${index + 1}`]}`}
            key={node}
            data-motion-map-node
          >
            <i />
            <span>{node}</span>
          </div>
        ))}
        <span className={styles.cloudPacket} aria-hidden="true" />
      </div>
    </VisualFrame>
  );
}

function MobileVisual({ data }: VisualProps) {
  return (
    <VisualFrame
      data={data}
      title="Mobile product system"
      footer={["iOS + Android", "API-connected", "Release-ready"]}
    >
      <div className={`${styles.mapBody} ${styles.mobileVisual}`}>
        <div className={styles.phoneFrame} data-motion-map-node>
          <div className={styles.phoneTop}>
            <i />
            <span />
          </div>
          <div className={styles.phoneHero}>
            <small>Today</small>
            <strong>One clear action.</strong>
          </div>
          <div className={styles.phoneRows}>
            <i />
            <i />
            <i />
          </div>
          <div className={styles.phoneNav}>
            <span />
            <span />
            <span />
          </div>
        </div>
        <div className={`${styles.mobileSignal} ${styles.mobileSignal1}`} data-motion-map-node>
          <small>Identity</small>
          <strong>Verified</strong>
        </div>
        <div className={`${styles.mobileSignal} ${styles.mobileSignal2}`} data-motion-map-node>
          <small>API</small>
          <strong>42 ms</strong>
        </div>
        <div className={`${styles.mobileSignal} ${styles.mobileSignal3}`} data-motion-map-node>
          <small>Release</small>
          <strong>Ready</strong>
        </div>
        <div className={styles.mobileSync} aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
      </div>
    </VisualFrame>
  );
}

function ErpVisual({ data }: VisualProps) {
  const modules = ["Finance", "Inventory", "Sales", "Operations"];

  return (
    <VisualFrame
      data={data}
      title="Connected operations"
      footer={["One data model", "Controlled workflows", "Live reporting"]}
    >
      <div className={`${styles.mapBody} ${styles.erpVisual}`}>
        <div className={styles.erpHub} data-motion-map-node>
          <small>System of record</small>
          <strong>ERP Core</strong>
          <em>Synced</em>
        </div>
        {modules.map((module, index) => (
          <div
            className={`${styles.erpModule} ${styles[`erpModule${index + 1}`]}`}
            key={module}
            data-motion-map-node
          >
            <small>0{index + 1}</small>
            <strong>{module}</strong>
            <i />
          </div>
        ))}
        <div className={styles.erpPulse} aria-hidden="true" />
      </div>
    </VisualFrame>
  );
}

function GrowthVisual({ data }: VisualProps) {
  return (
    <VisualFrame
      data={data}
      title="Growth signal"
      footer={["Search demand", "Qualified traffic", "Measured action"]}
    >
      <div className={`${styles.mapBody} ${styles.growthVisual}`}>
        <div className={styles.searchField} data-motion-map-node>
          <i />
          <span>high-intent demand</span>
          <b>↗</b>
        </div>
        <div className={styles.growthMetric} data-motion-map-node>
          <small>Qualified visibility</small>
          <strong>+38.4%</strong>
          <span>compounding</span>
        </div>
        <div className={styles.growthChart} data-motion-map-node aria-label="Upward growth chart">
          {[34, 48, 44, 63, 72, 88].map((height, index) => (
            <i
              key={height}
              style={
                {
                  "--bar-height": `${height}%`,
                  "--bar-delay": `${index * 0.12}s`,
                } as CSSProperties
              }
            />
          ))}
          <span className={styles.growthLine} />
        </div>
        <div className={styles.growthLabels}>
          <span>Discover</span>
          <span>Understand</span>
          <span>Convert</span>
        </div>
      </div>
    </VisualFrame>
  );
}

function WebsiteVisual({ data }: VisualProps) {
  return (
    <VisualFrame
      data={data}
      title="Web platform"
      footer={["Responsive", "Accessible", "Performance-led"]}
    >
      <div className={`${styles.mapBody} ${styles.websiteVisual}`}>
        <div className={styles.browserFrame} data-motion-map-node>
          <div className={styles.browserBar}>
            <i />
            <i />
            <i />
            <span>jabitsoft.com</span>
          </div>
          <div className={styles.browserCanvas}>
            <header>
              <span />
              <b />
            </header>
            <main>
              <div>
                <small>Clear message</small>
                <strong>Built to move people.</strong>
                <i />
              </div>
              <aside>
                <span />
                <span />
                <span />
              </aside>
            </main>
            <footer>
              <span />
              <span />
              <span />
            </footer>
          </div>
        </div>
        <div className={styles.webScore} data-motion-map-node>
          <small>Performance</small>
          <strong>98</strong>
          <i />
        </div>
        <div className={styles.webComponents} data-motion-map-node>
          <small>Design system</small>
          <span>
            <i />
            <i />
            <i />
          </span>
        </div>
      </div>
    </VisualFrame>
  );
}

export function ServiceHeroVisual({ data }: VisualProps) {
  switch (data.slug) {
    case "cloud-consulting":
      return <CloudVisual data={data} />;
    case "mobile-application-development":
      return <MobileVisual data={data} />;
    case "erp-services":
      return <ErpVisual data={data} />;
    case "seo-digital-marketing":
      return <GrowthVisual data={data} />;
    case "website-solutions":
      return <WebsiteVisual data={data} />;
    default:
      return <AgenticVisual data={data} />;
  }
}
