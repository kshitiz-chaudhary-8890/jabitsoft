"use client";

import { motion } from "motion/react";
import RevealHeading from "./common/RevealHeading.jsx";

const ease = [0.22, 1, 0.36, 1];

function DecisionVisual() {
  return (
    <div className="wcu-visual wcu-decision" aria-hidden="true">
      <div className="wcu-grid" />
      <div className="wcu-inputs">
        {['Goals', 'Operations', 'Data'].map((label, i) => (
          <motion.span
            key={label}
            className={`wcu-chip wcu-chip-${i + 1}`}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08, ease }}
          >
            <i />{label}
          </motion.span>
        ))}
      </div>

      <svg className="wcu-lines" viewBox="0 0 500 240" preserveAspectRatio="none">
        <path d="M120 58 C190 58 202 120 252 120" />
        <path d="M120 120 C195 120 205 120 252 120" />
        <path d="M120 182 C190 182 202 120 252 120" />
        <path d="M330 120 C380 120 405 120 452 120" />
      </svg>

      <motion.div
        className="wcu-core"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.18, ease }}
      >
        <b>J</b>
        <strong>Decision</strong>
        <small>Business + engineering</small>
      </motion.div>

      <motion.div
        className="wcu-output-card"
        initial={{ opacity: 0, x: 24, rotate: 3 }}
        whileInView={{ opacity: 1, x: 0, rotate: -2 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.25, ease }}
      >
        <small>Direction</small>
        <strong>Clear system plan</strong>
        <div><i /><i /><i /></div>
        <div><i /><i /></div>
      </motion.div>

      <motion.i
        className="wcu-pulse"
        animate={{ left: ['24%', '52%'], top: ['50%', '50%'], opacity: [0, 1, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
}

function ReliabilityVisual() {
  return (
    <div className="wcu-visual wcu-reliability" aria-hidden="true">
      <div className="wcu-grid" />
      <motion.div
        className="wcu-system-card"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease }}
      >
        <div className="wcu-system-head"><span>System foundation</span><b>•••</b></div>
        {['Core', 'Data', 'Workflow'].map((item, i) => (
          <motion.div
            className="wcu-system-row"
            key={item}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.15 + i * 0.08 }}
          >
            <span>{item}</span><b>Ready</b>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="wcu-health"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2, ease }}
      >
        <motion.div
          className="wcu-health-ring"
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        >✓</motion.div>
        <strong>Guardrails active</strong>
        <small>Built for dependable operation</small>
      </motion.div>

      <div className="wcu-status">
        {[0,1,2,3,4].map((n) => (
          <motion.i
            key={n}
            animate={{ opacity: [0.25, 1, 0.25] }}
            transition={{ duration: 1.7, repeat: Infinity, delay: n * 0.16 }}
          />
        ))}
      </div>
    </div>
  );
}

function ContextVisual() {
  const lanes = [
    ['Team', 'Sales', 'Ops'],
    ['Flow', 'Review', 'Action'],
    ['System', 'Data', 'Output'],
  ];

  return (
    <div className="wcu-visual wcu-context" aria-hidden="true">
      <div className="wcu-grid" />
      <div className="wcu-lanes">
        {lanes.map((lane, i) => (
          <motion.div
            className="wcu-lane"
            key={lane[0]}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.42, delay: i * 0.1, ease }}
          >
            <small>{lane[0]}</small>
            <span>{lane[1]}</span>
            <span>{lane[2]}</span>
          </motion.div>
        ))}
      </div>
      <svg className="wcu-context-lines" viewBox="0 0 500 240" preserveAspectRatio="none">
        <path d="M145 103 C180 103 200 103 230 103" />
        <path d="M145 151 C180 151 200 151 230 151" />
        <path d="M292 103 C330 103 347 103 380 103" />
        <path d="M292 151 C330 151 347 151 380 151" />
      </svg>
      <motion.i
        className="wcu-context-signal"
        animate={{ x: [0, 248], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'linear', repeatDelay: 0.5 }}
      />
      <div className="wcu-context-note"><i />Built around how work actually moves</div>
    </div>
  );
}

function EvolutionVisual() {
  return (
    <div className="wcu-visual wcu-evolution" aria-hidden="true">
      <div className="wcu-grid" />
      <div className="wcu-stage"><span>Now</span><span>Next</span></div>
      <div className="wcu-rail"><motion.i animate={{ scaleX: [0.05, 1] }} transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.1, ease }} /></div>
      <div className="wcu-blocks">
        {['Core', 'Module', 'Module', 'Next'].map((label, i) => (
          <motion.div
            key={`${label}-${i}`}
            className={`wcu-block wcu-block-${i}`}
            initial={{ opacity: 0, y: 15, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.09, ease }}
          >{label}</motion.div>
        ))}
      </div>
      <motion.div className="wcu-plus" animate={{ y: [0, -4, 0] }} transition={{ duration: 3, repeat: Infinity }}>+</motion.div>
      <motion.div
        className="wcu-evolve-card"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.48, delay: 0.35, ease }}
      >
        <strong>Extend without starting over</strong>
        <small>Modular foundations leave room for change.</small>
      </motion.div>
    </div>
  );
}

const benefits = [
  {
    title: 'Clear Technology Decisions',
    description: 'We connect business goals, operational realities, and engineering trade-offs so teams can move forward with a clearer system direction.',
    Visual: DecisionVisual,
  },
  {
    title: 'Reliable Foundations by Design',
    description: 'We favor maintainable architecture, sensible guardrails, and dependable system behavior over fragile shortcuts that create problems later.',
    Visual: ReliabilityVisual,
  },
  {
    title: 'Built Around Business Context',
    description: 'Technology should support the way your teams, workflows, and data actually operate — not force the business into a generic template.',
    Visual: ContextVisual,
  },
  {
    title: 'Designed to Evolve',
    description: 'We build foundations that can adapt as products, operations, and priorities change, without making every next step feel like a rebuild.',
    Visual: EvolutionVisual,
  },
];

function BenefitCard({ item, index }) {
  const Visual = item.Visual;
  return (
    <motion.article
      className="wcu-card"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.6, delay: index * 0.07, ease }}
      whileHover={{ y: -4 }}
    >
      <Visual />
      <div className="wcu-copy">
        <span className="wcu-index">0{index + 1}</span>
        <div><h3>{item.title}</h3><p>{item.description}</p></div>
      </div>
    </motion.article>
  );
}

export default function Intro() {
  return (
    <section className="why-choose-jabit shell" id="about" aria-labelledby="why-choose-title">
      <motion.header
        className="wcu-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.56, ease }}
      >
        <p className="wcu-eyebrow">(Why JabitSoft)</p>
        <RevealHeading as="h2" id="why-choose-title" className="wcu-title">
          Why growing teams choose JabitSoft
        </RevealHeading>
        <p className="wcu-subtitle">
          Clear decisions, dependable engineering, and digital systems designed around how your business actually works.
        </p>
      </motion.header>

      <div className="wcu-rows">
        <motion.div className="wcu-row wcu-row-blue" initial={{ opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.16 }} transition={{ duration: 0.68, ease }}>
          <div className="wcu-texture" />
          <BenefitCard item={benefits[0]} index={0} />
          <BenefitCard item={benefits[1]} index={1} />
        </motion.div>
        <motion.div className="wcu-row wcu-row-slate" initial={{ opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.16 }} transition={{ duration: 0.68, delay: 0.08, ease }}>
          <div className="wcu-texture" />
          <BenefitCard item={benefits[2]} index={2} />
          <BenefitCard item={benefits[3]} index={3} />
        </motion.div>
      </div>

      <style>{`
        .why-choose-jabit{--ink:#151922;--muted:#707782;--blue:#0071e3;position:relative;overflow:hidden;padding-block:clamp(88px,9vw,136px);background:#fff;color:var(--ink)}
        .wcu-header{max-width:820px;margin:0 auto clamp(44px,5vw,66px);text-align:center}.wcu-eyebrow{margin:0 0 12px;color:#737986;font-size:12px;font-weight:600}.wcu-title{margin:0;color:var(--ink);font-size:clamp(40px,4.3vw,66px);font-weight:650;line-height:1.04;letter-spacing:-.055em;text-wrap:balance}.wcu-subtitle{max-width:650px;margin:18px auto 0;color:var(--muted);font-size:15px;line-height:1.65;text-wrap:balance}
        .wcu-rows{display:flex;flex-direction:column;gap:30px}.wcu-row{position:relative;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:26px;overflow:hidden;padding:clamp(22px,2.8vw,40px);border:1px solid rgba(21,25,34,.045);border-radius:28px}.wcu-row-blue{background:#eef3ff}.wcu-row-slate{background:#edf4f5}.wcu-texture{position:absolute;inset:0;pointer-events:none;opacity:.42;background-image:repeating-linear-gradient(-45deg,transparent,transparent 15px,rgba(85,105,196,.055) 15px,rgba(85,105,196,.055) 16px)}.wcu-row-slate .wcu-texture{background-image:repeating-linear-gradient(-45deg,transparent,transparent 15px,rgba(43,93,105,.045) 15px,rgba(43,93,105,.045) 16px)}
        .wcu-card{position:relative;z-index:1;display:flex;min-width:0;min-height:420px;flex-direction:column;padding:18px;border:1px solid rgba(21,25,34,.06);border-radius:22px;background:rgba(255,255,255,.96);box-shadow:0 12px 32px rgba(22,31,49,.045);transition:box-shadow .22s ease}.wcu-card:hover{box-shadow:0 18px 42px rgba(22,31,49,.075)}.wcu-visual{position:relative;height:245px;overflow:hidden;margin-bottom:24px;border:1px solid rgba(21,25,34,.045);border-radius:17px;background:linear-gradient(180deg,rgba(255,255,255,.9),rgba(248,250,253,.96))}.wcu-grid{position:absolute;inset:0;opacity:.32;background-image:linear-gradient(rgba(21,25,34,.055) 1px,transparent 1px),linear-gradient(90deg,rgba(21,25,34,.055) 1px,transparent 1px);background-size:28px 28px;mask-image:linear-gradient(to bottom,#000 0%,transparent 100%)}
        .wcu-copy{display:grid;grid-template-columns:38px 1fr;gap:14px;margin-top:auto;padding:2px 4px 4px}.wcu-index{padding-top:4px;color:var(--blue);font-size:11px;font-weight:700;letter-spacing:.08em}.wcu-card h3{margin:0 0 8px;color:var(--ink);font-size:19px;font-weight:650;line-height:1.25;letter-spacing:-.025em}.wcu-card p{margin:0;color:var(--muted);font-size:13px;line-height:1.62}
        .wcu-chip{position:absolute;left:24px;display:flex;min-width:94px;height:34px;align-items:center;gap:8px;padding:0 12px;border:1px solid rgba(21,25,34,.08);border-radius:10px;background:#fff;color:#535b68;font-size:10px;font-weight:600;box-shadow:0 8px 18px rgba(20,30,48,.05)}.wcu-chip i{width:6px;height:6px;border-radius:50%;background:#8ea1b9}.wcu-chip-1{top:40px}.wcu-chip-2{top:103px}.wcu-chip-3{top:166px}.wcu-lines,.wcu-context-lines{position:absolute;inset:0;width:100%;height:100%;fill:none;stroke:rgba(85,105,196,.3);stroke-width:1.5}.wcu-core{position:absolute;left:50%;top:50%;display:grid;width:112px;height:112px;place-items:center;align-content:center;transform:translate(-50%,-50%);border:1px solid rgba(0,113,227,.16);border-radius:50%;background:rgba(255,255,255,.95);box-shadow:0 14px 32px rgba(20,35,60,.08)}.wcu-core>b{display:grid;width:27px;height:27px;margin-bottom:7px;place-items:center;border-radius:8px;background:var(--blue);color:#fff;font-size:12px}.wcu-core strong{font-size:12px}.wcu-core small{margin-top:3px;color:#8a9099;font-size:8px}.wcu-output-card{position:absolute;right:20px;top:58px;width:140px;padding:15px;border:1px solid rgba(0,113,227,.14);border-radius:13px;background:#fff;box-shadow:0 14px 34px rgba(17,31,52,.09)}.wcu-output-card small{display:block;margin-bottom:5px;color:#89909a;font-size:8px;text-transform:uppercase;letter-spacing:.08em}.wcu-output-card strong{display:block;margin-bottom:14px;font-size:11px}.wcu-output-card>div{display:grid;grid-template-columns:1.4fr 1fr .7fr;gap:4px;margin-top:5px}.wcu-output-card>div:last-child{grid-template-columns:1fr .55fr}.wcu-output-card i{height:5px;border-radius:99px;background:#dfe8f6}.wcu-output-card i:first-child{background:#afc9ef}.wcu-pulse{position:absolute;z-index:3;width:7px;height:7px;border-radius:50%;background:var(--blue);box-shadow:0 0 0 5px rgba(0,113,227,.08)}
        .wcu-system-card{position:absolute;left:32px;top:31px;width:58%;padding:16px;border:1px solid rgba(21,25,34,.08);border-radius:14px;background:rgba(255,255,255,.96);box-shadow:0 12px 28px rgba(17,31,52,.06)}.wcu-system-head{display:flex;align-items:center;justify-content:space-between;padding-bottom:12px;border-bottom:1px solid rgba(21,25,34,.07);color:#414854;font-size:10px;font-weight:650}.wcu-system-head b{color:#aeb5be;letter-spacing:2px}.wcu-system-row{display:flex;align-items:center;justify-content:space-between;margin-top:8px;padding:9px 10px;border-radius:9px;background:#f5f7fa;color:#626a76;font-size:9px}.wcu-system-row b{color:#3f8b66;font-size:8px}.wcu-health{position:absolute;right:24px;top:55px;width:145px;padding:17px 13px;text-align:center;border:1px solid rgba(21,25,34,.08);border-radius:14px;background:#fff;box-shadow:0 16px 34px rgba(17,31,52,.09)}.wcu-health-ring{display:grid;width:58px;height:58px;margin:0 auto 10px;place-items:center;border:8px solid #edf6f2;border-radius:50%;color:#38815d;font-size:18px;box-shadow:inset 0 0 0 1px #8ac2a5}.wcu-health strong{display:block;margin-bottom:3px;color:#3e4652;font-size:10px}.wcu-health small{display:block;color:#9399a2;font-size:7.5px;line-height:1.4}.wcu-status{position:absolute;left:45px;bottom:22px;display:flex;gap:6px}.wcu-status i{width:6px;height:6px;border-radius:50%;background:#76b397}
        .wcu-lanes{position:absolute;inset:43px 30px 53px;display:grid;grid-template-columns:repeat(3,1fr);gap:34px}.wcu-lane{position:relative;z-index:2;display:grid;align-content:start;gap:9px;padding:13px;border:1px solid rgba(21,25,34,.07);border-radius:13px;background:rgba(255,255,255,.94);box-shadow:0 10px 24px rgba(17,31,52,.045)}.wcu-lane small{color:#9298a1;font-size:8px;font-weight:650;text-transform:uppercase;letter-spacing:.08em}.wcu-lane span{display:block;padding:8px 9px;border-radius:8px;background:#f4f7f9;color:#535b66;font-size:9px;font-weight:600}.wcu-context-lines{stroke:rgba(61,114,132,.3)}.wcu-context-signal{position:absolute;z-index:4;left:124px;top:116px;width:8px;height:8px;border-radius:50%;background:#4b879a;box-shadow:0 0 0 5px rgba(75,135,154,.1)}.wcu-context-note{position:absolute;left:50%;bottom:17px;display:flex;align-items:center;gap:7px;transform:translateX(-50%);color:#737b85;font-size:8.5px;white-space:nowrap}.wcu-context-note i{width:6px;height:6px;border-radius:50%;background:#4b879a}
        .wcu-stage{position:absolute;left:35px;right:35px;top:27px;display:flex;justify-content:space-between;color:#9399a2;font-size:8px;font-weight:650;text-transform:uppercase;letter-spacing:.08em}.wcu-rail{position:absolute;left:42px;right:42px;top:62px;height:2px;overflow:hidden;border-radius:99px;background:#dce3ea}.wcu-rail i{display:block;width:100%;height:100%;transform-origin:left center;background:linear-gradient(90deg,#7892b4,#0071e3)}.wcu-blocks{position:absolute;left:42px;top:91px;display:grid;grid-template-columns:96px 76px;grid-template-rows:55px 55px;gap:10px}.wcu-block{display:grid;place-items:center;border:1px solid rgba(21,25,34,.08);border-radius:11px;background:#fff;color:#57606b;font-size:9px;font-weight:650;box-shadow:0 8px 20px rgba(17,31,52,.045)}.wcu-block-0{grid-row:span 2;background:#eef4ff;color:#456790}.wcu-block-3{border-style:dashed;background:rgba(255,255,255,.58);color:#7f8791}.wcu-plus{position:absolute;left:213px;top:129px;display:grid;width:28px;height:28px;place-items:center;border-radius:50%;background:var(--blue);color:#fff;font-size:18px;box-shadow:0 10px 20px rgba(0,113,227,.18)}.wcu-evolve-card{position:absolute;right:30px;top:88px;width:42%;padding:17px;border:1px solid rgba(21,25,34,.07);border-radius:13px;background:#fff;box-shadow:0 12px 28px rgba(17,31,52,.055)}.wcu-evolve-card strong{display:block;margin-bottom:7px;color:#434b57;font-size:10px}.wcu-evolve-card small{display:block;color:#8b929c;font-size:8px;line-height:1.5}
        @media(max-width:1024px){.why-choose-jabit{padding-block:96px}.wcu-row{grid-template-columns:1fr}.wcu-card{min-height:400px}.wcu-visual{height:240px}}
        @media(max-width:700px){.why-choose-jabit{padding-block:76px}.wcu-header{margin-bottom:38px}.wcu-title{font-size:clamp(36px,10.2vw,46px)}.wcu-subtitle{margin-top:15px;font-size:14px}.wcu-rows{gap:20px}.wcu-row{gap:16px;padding:14px;border-radius:21px}.wcu-card{min-height:0;padding:13px;border-radius:18px}.wcu-visual{height:220px;margin-bottom:20px;border-radius:14px}.wcu-copy{grid-template-columns:30px 1fr;gap:9px}.wcu-card h3{font-size:17px}.wcu-card p{font-size:12.5px}.wcu-chip{left:12px;min-width:74px;height:30px;padding-inline:9px}.wcu-output-card{right:10px;width:115px}.wcu-core{width:94px;height:94px}.wcu-system-card{left:14px;width:61%}.wcu-health{right:10px;width:124px}.wcu-lanes{inset-inline:14px;gap:12px}.wcu-lane{padding:9px}.wcu-context-signal{left:76px}.wcu-blocks{left:18px;grid-template-columns:78px 62px}.wcu-plus{left:175px}.wcu-evolve-card{right:10px;width:40%}}
        @media(max-width:380px){.why-choose-jabit{padding-block:68px}.wcu-title{font-size:34px}.wcu-visual{height:205px}.wcu-output-card{width:106px;padding:12px}.wcu-context-note{font-size:7.5px}}
        @media(prefers-reduced-motion:reduce){.why-choose-jabit *{animation-duration:.001ms!important;animation-iteration-count:1!important}}
      `}</style>
    </section>
  );
}
