"use client";
import { useRef } from "react";
import { useAboutReveal } from "../useAboutReveal";
import styles from "./TrackRecord.module.css";

const evidence=[
  {label:"Business systems",title:"ERP and connected operations",body:"Systems shaped around day-to-day workflows, shared data and dependable business processes.",tags:["ERP","Operations","Data"]},
  {label:"Digital products",title:"Web and mobile platforms",body:"Customer-facing products designed and engineered as maintainable, scalable software—not short-lived campaigns.",tags:["Web","Mobile","Product"]},
  {label:"Modern engineering",title:"Cloud and applied AI",body:"Cloud foundations and practical AI capabilities connected to the business context they are expected to support.",tags:["Cloud","AI","Engineering"]},
  {label:"Delivery practice",title:"From strategy through launch",body:"Product thinking, experience design, engineering and improvement carried by one collaborative delivery team.",tags:["Strategy","Design","Delivery"]},
];
export function TrackRecord(){const ref=useRef<HTMLElement>(null);useAboutReveal(ref);return <section ref={ref} className={styles.section} aria-labelledby="track-title"><div className={styles.shell}><header className={styles.intro}><p data-about-intro className={styles.eyebrow}>(Track Record)</p><h2 data-about-intro id="track-title"><span className="section-heading-fill">Experience That Shows Up in the Work.</span></h2><p data-about-intro className={styles.description}>Across business systems, digital products and custom software, JabitSoft has worked on technology where reliability, context and long-term usefulness matter.</p></header><div className={styles.ledger}>{evidence.map((item,i)=><article data-about-item key={item.title}><span data-about-rule className={styles.rule}/><div className={styles.index}><span>0{i+1}</span><p>{item.label}</p></div><div className={styles.body}><h3>{item.title}</h3><p>{item.body}</p></div><ul>{item.tags.map(tag=><li key={tag}>{tag}</li>)}</ul></article>)}</div></div></section>}
