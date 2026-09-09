"use client"

/**
 * Problems We Solve
 * -----------------------------------------------------------------------------
 * Editorial two-part composition:
 *   01 · Evidence  — the numbers that frame the problem space (clearly labelled
 *                     as directional / illustrative, never as client claims)
 *   02 · Problems  — a numbered ledger of business problems, each mapped to a
 *                     JabitSoft capability. Every row opens the detail modal.
 *
 * The detail modal (overview → signals → response → journey → targets → outcome
 * → relevant service) is the centre of the experience and is preserved in full.
 */

import {
	Fragment,
	useCallback,
	useEffect,
	useId,
	useLayoutEffect,
	useMemo,
	useRef,
	useState,
} from "react"
import { createPortal } from "react-dom"
import {
	MotionConfig,
	animate,
	motion,
	useInView,
	useReducedMotion,
} from "motion/react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import styles from "./ProblemsWeSolve.module.css"

if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger)
}

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]

/* ------------------------------------------------------------------ types -- */

type ServiceKey = "agent" | "cloud" | "mobile" | "erp" | "seo" | "web"

type Metric = {
	value: string
	label: string
	/** 0–100, drives the hairline bar / dial arc only (visual weight, not a claim) */
	fill: number
}

type Problem = {
	id: string
	icon: ServiceKey
	/** technical reference shown in the ledger and modal */
	code: string
	title: string
	service: string
	serviceFull: string
	capability: string
	summary: string
	/** why the problem matters commercially */
	stake: string
	/** headline target metric, also drives the modal dial */
	metric: Metric
	lead: string
	signals: string[]
	response: string[]
	metrics: Metric[]
	metricsNote: string
	/** today → what we build → what you get */
	flow: [string, string, string]
	trend: {
		labels: string[]
		points: number[]
		caption: string
	}
	outcome: string
}

type EvidenceItem = {
	id: string
	topic: string
	value: string
	copy: string
	basis: string
	fill: number
}

/* ------------------------------------------------------------------- data -- */

const EVIDENCE: EvidenceItem[] = [
	{
		id: "e-01",
		topic: "Manual coordination",
		value: "62%",
		copy: "of operational time is lost to repetitive coordination.",
		basis: "Discovery conversations · directional",
		fill: 62,
	},
	{
		id: "e-02",
		topic: "Delivery velocity",
		value: "48%",
		copy: "say delivery slows as systems scale without a clear plan.",
		basis: "Market reading · directional",
		fill: 48,
	},
	{
		id: "e-03",
		topic: "Broken journeys",
		value: "57%",
		copy: "of journeys break where tools, data and touchpoints disconnect.",
		basis: "Survey inputs · directional",
		fill: 57,
	},
]

const PROBLEMS: Problem[] = [
	{
		id: "agentic-ai",
		icon: "agent",
		code: "AI/AGT",
		title: "Operations that only move by hand",
		service: "Agentic AI Development",
		serviceFull: "Agentic AI Development",
		capability:
			"Agent architecture, tool integration, guardrails and human-in-the-loop review.",
		summary:
			"Quotes, approvals, reporting and follow-ups still wait for someone to remember them. The process lives in inboxes and spreadsheets, so throughput is capped by whoever happens to be available.",
		stake:
			"Every manual handoff adds delay, cost and risk exactly where your margin sits — and headcount becomes the only way to grow.",
		metric: {
			value: "3×",
			label: "faster task turnaround",
			fill: 78,
		},
		lead: "Most teams do not lack process — they lack a system that runs it. When routine decisions still need a person to push each step forward, your best people spend the day coordinating instead of deciding.",
		signals: [
			"The same record is re-entered across three or more tools every day.",
			"Approvals stall for days because no one owns the next step.",
			"Weekly reporting is assembled by hand, then only partly trusted.",
			"New volume needs new hires before it needs new software.",
		],
		response: [
			"Map the workflow end to end and separate real decisions from busywork.",
			"Design agents with explicit scope, tool access, guardrails and audit trails.",
			"Connect them to the systems that already hold your data — CRM, ERP, mail, storage.",
			"Keep humans in the loop for exceptions, with a review queue and full traceability.",
		],
		metrics: [
			{ value: "3×", label: "faster task turnaround", fill: 78 },
			{ value: "60%", label: "less manual handling per request", fill: 60 },
			{ value: "24/7", label: "unattended processing window", fill: 92 },
		],
		metricsNote:
			"Illustrative planning targets used to scope the work — baselined against your own numbers before anything is committed.",
		flow: [
			"Manual steps spread across scattered tools",
			"Scoped agents with guardrails and audit trails",
			"Routine work completes without chasing",
		],
		trend: {
			labels: ["M1", "M2", "M3", "M4", "M5", "M6"],
			points: [8, 19, 34, 46, 63, 78],
			caption:
				"Illustrative ramp — share of routine steps running autonomously across a six-month rollout.",
		},
		outcome:
			"Your team stops operating the process and starts supervising it — capacity that grows without a matching rise in headcount.",
	},
	{
		id: "cloud",
		icon: "cloud",
		code: "CLD/INF",
		title: "Infrastructure that fights every release",
		service: "Cloud Consulting",
		serviceFull: "Cloud Consulting & DevOps",
		capability:
			"Architecture review, infrastructure as code, CI/CD automation and cost guardrails.",
		summary:
			"Environments have drifted, deploys are manual and nobody is certain which config is authoritative. Releases get scheduled around risk instead of readiness — and the bill grows faster than usage.",
		stake:
			"Slow, risky releases push every roadmap date out and make cloud spend impossible to forecast, right when you need to scale.",
		metric: {
			value: "70%",
			label: "shorter deploy cycles",
			fill: 70,
		},
		lead: "Platforms rarely fail loudly — they get slow and expensive. Infrastructure grown one urgent decision at a time ends up with hand-tuned servers, unclear ownership and a deployment nobody wants to run on a Friday.",
		signals: [
			"Releases are batched and rehearsed because rollback is unclear.",
			"Staging and production disagree in ways that only surface at launch.",
			"Cloud spend climbs without a matching rise in traffic or revenue.",
			"One or two people are the only ones who can safely deploy.",
		],
		response: [
			"Audit architecture, environments, ownership and spend against the roadmap.",
			"Codify infrastructure so environments are reproducible, not remembered.",
			"Build CI/CD with automated tests, gated releases and instant rollback.",
			"Add observability and cost guardrails so scaling stays a decision.",
		],
		metrics: [
			{ value: "70%", label: "shorter deploy cycles", fill: 70 },
			{ value: "99.9%", label: "uptime target on critical paths", fill: 95 },
			{ value: "35%", label: "cloud spend recovered", fill: 42 },
		],
		metricsNote:
			"Illustrative engineering targets. Real numbers are set after the audit, against your current baseline.",
		flow: [
			"Manual deploys and drifting environments",
			"Codified infrastructure with automated pipelines",
			"Ship on any weekday, roll back in minutes",
		],
		trend: {
			labels: ["M1", "M2", "M3", "M4", "M5", "M6"],
			points: [12, 20, 33, 48, 58, 70],
			caption:
				"Illustrative view — release throughput as automation and test coverage land.",
		},
		outcome:
			"Shipping becomes routine: predictable releases, a platform that scales on purpose, and infrastructure cost you can explain line by line.",
	},
	{
		id: "mobile",
		icon: "mobile",
		code: "MOB/APP",
		title: "Mobile journeys that leak intent",
		service: "Mobile App Development",
		serviceFull: "Mobile Application Development",
		capability:
			"Journey instrumentation, native and cross-platform builds, API and offline hardening.",
		summary:
			"The app works, but the path from install to value is longer than it needs to be. Every extra screen, slow call or unexplained permission quietly removes someone who was ready to buy.",
		stake:
			"Mobile is where most customers meet you first. A broken flow reads as a broken company and silently caps retention.",
		metric: {
			value: "−4",
			label: "steps removed from the core journey",
			fill: 66,
		},
		lead: "Drop-off is rarely one bad screen. It is a sequence — onboarding that asks too early, a form that repeats known data, a network call with no feedback. Each is survivable alone and fatal together.",
		signals: [
			"Installs look healthy, but activation and day-7 retention do not.",
			"Support hears the same three confusions after every release.",
			"Key actions take too many taps, or fail silently on weak networks.",
			"Android and iOS behave differently enough to erode trust.",
		],
		response: [
			"Instrument the real journey and find where intent is lost, screen by screen.",
			"Rebuild the critical path first: onboarding, core action, payment, notifications.",
			"Ship a shared design system with native performance budgets per platform.",
			"Harden APIs, offline behaviour and error states so weak networks stay usable.",
		],
		metrics: [
			{ value: "−4", label: "steps in the core journey", fill: 66 },
			{ value: "2×", label: "activation inside day one", fill: 72 },
			{ value: "<1.5s", label: "to first meaningful screen", fill: 84 },
		],
		metricsNote:
			"Illustrative product targets we design toward, confirmed against your analytics during discovery.",
		flow: [
			"Long journeys and unclear failure states",
			"Rebuilt critical path, instrumented end to end",
			"Users reach value in the first session",
		],
		trend: {
			labels: ["R1", "R2", "R3", "R4", "R5", "R6"],
			points: [22, 29, 38, 47, 55, 61],
			caption:
				"Illustrative view — completion rate of the primary journey across release cycles.",
		},
		outcome:
			"A mobile product where the fastest path is the intended path — measurable activation, fewer support threads and releases guided by evidence.",
	},
	{
		id: "erp",
		icon: "erp",
		code: "ERP/OPS",
		title: "Systems that disagree with each other",
		service: "ERP Services",
		serviceFull: "ERP Implementation & Integration",
		capability:
			"Process modelling, ERP configuration, systems integration and data migration.",
		summary:
			"Finance, inventory, sales and delivery each keep their own version of the truth. Month-end turns into an investigation, and decisions wait for someone to reconcile the numbers.",
		stake:
			"Decisions made on numbers nobody trusts arrive late — and reconciliation work grows faster than the business does.",
		metric: {
			value: "40%",
			label: "faster month-end close",
			fill: 62,
		},
		lead: "Disconnected systems do not just create admin — they create disagreement. When two reports can both be defended, planning slows to the speed of the argument.",
		signals: [
			"The same order exists in three systems with three different states.",
			"Month-end close depends on spreadsheets and specific people.",
			"Stock, cash and pipeline figures are trusted only after manual checks.",
			"Reporting looks backwards because live data is too fragmented to use.",
		],
		response: [
			"Model the real process first — order to cash, procure to pay, plan to deliver.",
			"Configure the ERP around those flows instead of the default template.",
			"Integrate the systems that stay, with one clear owner per data object.",
			"Migrate in stages, run parallel, and train the people who live in it daily.",
		],
		metrics: [
			{ value: "40%", label: "faster month-end close", fill: 62 },
			{ value: "1", label: "source of truth per record", fill: 100 },
			{ value: "90%", label: "reports produced automatically", fill: 88 },
		],
		metricsNote:
			"Illustrative operational targets. Scope, modules and sequencing are agreed after process mapping.",
		flow: [
			"Parallel records and manual reconciliation",
			"Modelled processes on one integrated core",
			"One number, agreed and current",
		],
		trend: {
			labels: ["M1", "M2", "M3", "M4", "M5", "M6"],
			points: [10, 24, 39, 52, 64, 74],
			caption:
				"Illustrative view — share of operational reporting produced without manual reconciliation.",
		},
		outcome:
			"One operational core the whole company can quote from: faster close, cleaner audits and planning that starts from data instead of debate.",
	},
	{
		id: "seo",
		icon: "seo",
		code: "SEO/GRW",
		title: "Demand you never show up for",
		service: "SEO / Digital Marketing",
		serviceFull: "SEO & Digital Marketing",
		capability:
			"Technical SEO, intent mapping, content architecture and pipeline measurement.",
		summary:
			"Buyers are already searching for what you do — and finding competitors. The site has pages, but not the technical health, structure or intent coverage that earns those positions.",
		stake:
			"Search demand is the one channel you do not have to create. Staying invisible means paying for attention your competitors get for free.",
		metric: {
			value: "2×",
			label: "qualified organic traffic",
			fill: 74,
		},
		lead: "Ranking is an engineering problem before it is a content problem. Crawlability, page structure, internal links and speed decide whether good content is ever considered at all.",
		signals: [
			"Branded search works; nobody arrives from problem-led queries.",
			"Several pages compete with each other for the same term.",
			"Slow templates, thin pages and broken canonicals cap every campaign.",
			"Paid spend carries the pipeline because organic contributes almost nothing.",
		],
		response: [
			"Audit technical health, crawl paths, indexation and Core Web Vitals.",
			"Map the buying journey to real query intent, then design the architecture for it.",
			"Build depth on the topics that convert, with internal links that pass authority.",
			"Report on qualified sessions and pipeline, not vanity keyword counts.",
		],
		metrics: [
			{ value: "2×", label: "qualified organic sessions", fill: 74 },
			{ value: "3×", label: "indexed intent coverage", fill: 66 },
			{ value: "−45%", label: "cost per qualified lead", fill: 58 },
		],
		metricsNote:
			"Illustrative growth targets. Search outcomes depend on competition and baseline authority, so we agree them per market.",
		flow: [
			"Invisible on the queries that matter",
			"Technical fixes plus intent-led architecture",
			"Compounding organic pipeline",
		],
		trend: {
			labels: ["M1", "M2", "M3", "M4", "M5", "M6"],
			points: [14, 21, 32, 45, 58, 72],
			caption:
				"Illustrative view — qualified organic sessions as technical and content work compound.",
		},
		outcome:
			"A search presence that compounds: the right pages for the right intent, and a pipeline that no longer stops when ad spend does.",
	},
	{
		id: "web",
		icon: "web",
		code: "WEB/CVR",
		title: "A website that explains but never convinces",
		service: "Website Solutions",
		serviceFull: "Website Design & Development",
		capability:
			"Conversion-focused design, performance engineering and CMS enablement.",
		summary:
			"The site describes the company accurately and still loses the visit. Slow pages, unclear proof and a buried next step turn genuine interest into a tab that gets closed.",
		stake:
			"Every campaign, email and referral points here. Weak conversion quietly taxes everything you spend on demand.",
		metric: {
			value: "25%",
			label: "higher conversion rate",
			fill: 60,
		},
		lead: "Most sites fail on sequence, not aesthetics. A visitor needs to understand the offer, believe it, and find one obvious next step — in that order, within a few seconds.",
		signals: [
			"Traffic is fine; enquiries are not.",
			"Mobile performance scores are low and bounce is high.",
			"Marketing cannot publish a page without a developer.",
			"The strongest proof sits below the fold, or nowhere at all.",
		],
		response: [
			"Rebuild the narrative: problem, capability, proof, next step.",
			"Design a section system marketing can compose, not one-off pages.",
			"Engineer for speed and Core Web Vitals on real devices, not lab scores.",
			"Instrument the funnel and test the few moments that decide the outcome.",
		],
		metrics: [
			{ value: "25%", label: "higher enquiry conversion", fill: 60 },
			{ value: "90+", label: "Lighthouse performance target", fill: 90 },
			{ value: "−50%", label: "time to publish a new page", fill: 70 },
		],
		metricsNote:
			"Illustrative conversion targets used for planning — measured against your current funnel, not presented as past results.",
		flow: [
			"A brochure that describes the company",
			"Narrative, proof and speed engineered together",
			"Visits that turn into conversations",
		],
		trend: {
			labels: ["W2", "W4", "W6", "W8", "W10", "W12"],
			points: [18, 26, 35, 44, 52, 58],
			caption:
				"Illustrative view — enquiry conversion after narrative, performance and testing work.",
		},
		outcome:
			"A site that carries its weight: fast on real devices, clear about value, editable by the team and measured by conversations started.",
	},
]

const DIALOG_STEPS = [
	{ id: "snapshot", label: "Overview" },
	{ id: "diagnosis", label: "Diagnosis" },
	{ id: "journey", label: "Journey" },
	{ id: "impact", label: "Outcome" },
] as const

const PIPE_STATES = ["Today", "What we build", "What you get"] as const

/* ------------------------------------------------------------ svg helpers -- */

const ICON_PATHS: Record<ServiceKey, string[]> = {
	agent: [
		"M12 3.5v2.75M12 17.75v2.75M3.5 12h2.75M17.75 12h2.75",
		"M5.95 5.95 7.9 7.9M16.1 16.1l1.95 1.95M18.05 5.95 16.1 7.9M7.9 16.1l-1.95 1.95",
		"M9 9h6v6H9z",
	],
	cloud: [
		"M7.2 18.25h9.1a3.7 3.7 0 0 0 .45-7.37 5.25 5.25 0 0 0-10.02-1.1A4.05 4.05 0 0 0 7.2 18.25Z",
		"M12 15.8v-5.1",
		"M9.9 12.75 12 10.65l2.1 2.1",
	],
	mobile: [
		"M8.2 3.25h7.6a2 2 0 0 1 2 2v13.5a2 2 0 0 1-2 2H8.2a2 2 0 0 1-2-2V5.25a2 2 0 0 1 2-2Z",
		"M10 6h4",
		"M10.5 17.75h3",
	],
	erp: [
		"M4 5h6v5H4zM14 5h6v5h-6zM4 14h6v5H4zM14 14h6v5h-6z",
		"M10 7.5h4M7 10v4M17 10v4M10 16.5h4",
	],
	seo: [
		"M10.2 4.5a5.7 5.7 0 1 0 0 11.4 5.7 5.7 0 0 0 0-11.4Z",
		"M14.5 14.5 20 20",
		"M7.8 12.6 10 10.4l2 1.8 2.6-3",
	],
	web: [
		"M3.5 5h17v14h-17z",
		"M3.5 8.75h17",
		"M6.2 6.9h.01M8.7 6.9h.01",
		"M9.2 12.1 7.3 14l1.9 1.9M14.8 12.1l1.9 1.9-1.9 1.9M12.9 11.8l-1.8 4.4",
	],
}

function ServiceIcon({ name, size = 17 }: { name: ServiceKey; size?: number }) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={1.55}
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
		>
			{ICON_PATHS[name].map((d) => (
				<path key={d} d={d} />
			))}
		</svg>
	)
}

function ArrowIcon({ size = 16 }: { size?: number }) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={1.7}
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
		>
			<path d="M5 12h13" />
			<path d="m12.5 6 5.5 6-5.5 6" />
		</svg>
	)
}

function CloseIcon({ size = 16 }: { size?: number }) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={1.7}
			strokeLinecap="round"
			aria-hidden="true"
			focusable="false"
		>
			<path d="M6 6l12 12" />
			<path d="M18 6L6 18" />
		</svg>
	)
}

function SparkIcon({ size = 18 }: { size?: number }) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={1.7}
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			focusable="false"
		>
			<path d="M12 3.5l1.9 4.9 4.9 1.9-4.9 1.9L12 17.1l-1.9-4.9-4.9-1.9 4.9-1.9L12 3.5Z" />
			<path d="M18.5 16.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2Z" />
		</svg>
	)
}

const roundSvg = (n: number) => Math.round(n * 100) / 100

/** Catmull-Rom style smoothing, kept gentle so the data stays readable. */
function smoothPath(points: Array<{ x: number; y: number }>) {
	if (points.length < 2) return ""
	let d = `M ${roundSvg(points[0].x)} ${roundSvg(points[0].y)}`
	for (let i = 0; i < points.length - 1; i += 1) {
		const p0 = points[i - 1] ?? points[i]
		const p1 = points[i]
		const p2 = points[i + 1]
		const p3 = points[i + 2] ?? p2
		const t = 0.18
		const c1x = p1.x + (p2.x - p0.x) * t
		const c1y = p1.y + (p2.y - p0.y) * t
		const c2x = p2.x - (p3.x - p1.x) * t
		const c2y = p2.y - (p3.y - p1.y) * t
		d += ` C ${roundSvg(c1x)} ${roundSvg(c1y)}, ${roundSvg(c2x)} ${roundSvg(c2y)}, ${roundSvg(p2.x)} ${roundSvg(p2.y)}`
	}
	return d
}

/* ---------------------------------------------------------------- counter -- */

function Counter({
	value,
	play,
	duration = 1.1,
}: {
	value: string
	play: boolean
	duration?: number
}) {
	const ref = useRef<HTMLSpanElement>(null)
	const reduced = useReducedMotion()
	const parts = useMemo(() => {
		const match = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/)
		if (!match) return null
		return {
			prefix: match[1],
			number: Number(match[2]),
			decimals: match[2].includes(".") ? match[2].split(".")[1].length : 0,
			suffix: match[3],
		}
	}, [value])

	useEffect(() => {
		const el = ref.current
		if (!el || !parts || !play || reduced) return
		const controls = animate(0, parts.number, {
			duration,
			ease: EASE_OUT,
			onUpdate: (latest) => {
				el.textContent = `${parts.prefix}${latest.toFixed(parts.decimals)}${parts.suffix}`
			},
			onComplete: () => {
				el.textContent = value
			},
		})
		return () => {
			controls.stop()
			el.textContent = value
		}
	}, [parts, play, reduced, duration, value])

	/* renders the final value by default — nothing depends on JS to be legible */
	return <span ref={ref}>{value}</span>
}

/* ------------------------------------------------------------------- dial -- */

const DIAL_VIEW = 200
const DIAL_C = DIAL_VIEW / 2
const DIAL_R = 74
const DIAL_TICKS = 48
const DIAL_TICK_IN = 86
const DIAL_TICK_OUT = 94

function SignatureDial({
	value,
	fill,
	play,
}: {
	value: string
	fill: number
	play: boolean
}) {
	const ticks = useMemo(
		() =>
			Array.from({ length: DIAL_TICKS }, (_, i) => {
				const angle = (i / DIAL_TICKS) * Math.PI * 2 - Math.PI / 2
				const major = i % 4 === 0
				const inner = major ? DIAL_TICK_IN - 4 : DIAL_TICK_IN
				return {
					key: i,
					major,
					x1: roundSvg(DIAL_C + Math.cos(angle) * inner),
					y1: roundSvg(DIAL_C + Math.sin(angle) * inner),
					x2: roundSvg(DIAL_C + Math.cos(angle) * DIAL_TICK_OUT),
					y2: roundSvg(DIAL_C + Math.sin(angle) * DIAL_TICK_OUT),
				}
			}),
		[],
	)
	const ratio = Math.max(0, Math.min(1, fill / 100))

	return (
		<div className={styles.dial}>
			<svg
				className={styles.dialSvg}
				viewBox={`0 0 ${DIAL_VIEW} ${DIAL_VIEW}`}
				aria-hidden="true"
				focusable="false"
			>
				<g>
					{ticks.map((tick) => (
						<line
							key={tick.key}
							data-dial-tick=""
							className={`${styles.dialTick} ${tick.major ? styles.dialTickMajor : ""}`}
							x1={tick.x1}
							y1={tick.y1}
							x2={tick.x2}
							y2={tick.y2}
						/>
					))}
				</g>
				<circle
					className={styles.dialTrack}
					cx={DIAL_C}
					cy={DIAL_C}
					r={DIAL_R}
				/>
				<circle
					data-arc=""
					data-arc-target={ratio}
					className={styles.dialArc}
					cx={DIAL_C}
					cy={DIAL_C}
					r={DIAL_R}
					pathLength={1}
					strokeDasharray="1 1"
					style={{
						strokeDashoffset: 1 - ratio,
						transform: `rotate(-90deg)`,
						transformOrigin: "50% 50%",
					}}
				/>
				<circle
					className={styles.dialCore}
					cx={DIAL_C}
					cy={DIAL_C}
					r={DIAL_R - 16}
				/>
			</svg>
			<div className={styles.dialInner}>
				<span className={styles.dialValue}>
					<Counter value={value} play={play} duration={1.2} />
				</span>
			</div>
		</div>
	)
}

/* ---------------------------------------------------------------- journey -- */

function JourneyDiagram({ flow }: { flow: [string, string, string] }) {
	return (
		<div className={styles.pipe}>
			{flow.map((label, i) => (
				<Fragment key={label}>
					<div
						data-pipe-node=""
						className={`${styles.pipeNode} ${i === 2 ? styles.pipeNodeActive : ""}`}
					>
						<span className={styles.pipeState}>{PIPE_STATES[i]}</span>
						<span className={styles.pipeLabel}>{label}</span>
						<span className={styles.pipeIndex}>
							{String(i + 1).padStart(2, "0")}
						</span>
					</div>
					{i < flow.length - 1 ? (
						<div className={styles.pipeLink} aria-hidden="true">
							<svg
								className={styles.pipeLinkSvg}
								viewBox="0 0 100 14"
								preserveAspectRatio="none"
								focusable="false"
							>
								<path className={styles.pipeTrack} d="M0 7 H100" />
								<path
									data-pipe-flow=""
									className={styles.pipeFlow}
									d="M0 7 H100"
								/>
							</svg>
							<span data-pipe-packet="" className={styles.pipePacket} />
						</div>
					) : null}
				</Fragment>
			))}
		</div>
	)
}

/* ------------------------------------------------------------------ chart -- */

const CH_W = 640
const CH_H = 208
const CH_PAD_X = 32
const CH_PAD_T = 26
const CH_PAD_B = 34

function ImpactChart({
	trend,
}: {
	trend: { labels: string[]; points: number[]; caption: string }
}) {
	const uid = useId().replace(/[:]/g, "")
	const areaId = `pws-area-${uid}`
	const lineId = `pws-line-${uid}`

	const geo = useMemo(() => {
		const plotW = CH_W - CH_PAD_X * 2
		const plotH = CH_H - CH_PAD_T - CH_PAD_B
		const count = Math.max(trend.points.length - 1, 1)
		const pts = trend.points.map((v, i) => ({
			x: CH_PAD_X + (i / count) * plotW,
			y: CH_PAD_T + (1 - Math.max(0, Math.min(100, v)) / 100) * plotH,
			value: v,
		}))
		const line = smoothPath(pts)
		const baseline = CH_PAD_T + plotH
		const area = `${line} L ${roundSvg(pts[pts.length - 1].x)} ${baseline} L ${roundSvg(pts[0].x)} ${baseline} Z`
		return { pts, line, area, baseline, plotH }
	}, [trend.points])

	const last = geo.pts[geo.pts.length - 1]

	return (
		<figure className={styles.chart} data-chart="">
			<div className={styles.chartHead}>
				<span className={styles.chartRange}>
					{trend.points[0]}
					<ArrowIcon size={15} />
					<span className={styles.chartRangeEnd}>
						{trend.points[trend.points.length - 1]}
					</span>
				</span>
				<span className={styles.chartScale}>Relative index · 0–100</span>
			</div>
			<svg
				className={styles.chartSvg}
				viewBox={`0 0 ${CH_W} ${CH_H}`}
				role="img"
				aria-label={trend.caption}
			>
				<defs>
					<linearGradient id={areaId} x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stopColor="rgba(69,102,232,0.22)" />
						<stop offset="100%" stopColor="rgba(69,102,232,0)" />
					</linearGradient>
					<linearGradient id={lineId} x1="0" y1="0" x2="1" y2="0">
						<stop offset="0%" stopColor="#7f96f2" />
						<stop offset="100%" stopColor="#3450c7" />
					</linearGradient>
				</defs>

				{[100, 75, 50, 25, 0].map((level) => {
					const y = CH_PAD_T + (1 - level / 100) * geo.plotH
					return (
						<line
							key={level}
							className={`${styles.chartGrid} ${level === 0 ? styles.chartAxis : ""}`}
							x1={CH_PAD_X}
							y1={roundSvg(y)}
							x2={CH_W - CH_PAD_X}
							y2={roundSvg(y)}
						/>
					)
				})}

				<path
					data-chart-area=""
					className={styles.chartArea}
					d={geo.area}
					fill={`url(#${areaId})`}
				/>
				<line
					data-chart-marker=""
					className={styles.chartMarker}
					x1={roundSvg(last.x)}
					y1={roundSvg(last.y)}
					x2={roundSvg(last.x)}
					y2={roundSvg(geo.baseline)}
				/>
				<path
					data-chart-line=""
					className={styles.chartLine}
					d={geo.line}
					stroke={`url(#${lineId})`}
					pathLength={1}
				/>

				{geo.pts.map((point, i) => (
					<circle
						key={`${point.x}-${point.y}`}
						data-chart-dot=""
						className={`${styles.chartDot} ${
							i === geo.pts.length - 1 ? styles.chartDotLast : ""
						}`}
						cx={roundSvg(point.x)}
						cy={roundSvg(point.y)}
						r={i === geo.pts.length - 1 ? 5.4 : 4}
					/>
				))}

				{geo.pts.map((point, i) => (
					<text
						key={trend.labels[i] ?? i}
						className={styles.chartLabel}
						x={roundSvg(point.x)}
						y={CH_H - 10}
						textAnchor="middle"
					>
						{trend.labels[i] ?? ""}
					</text>
				))}
			</svg>
			<figcaption className={styles.chartCaption}>{trend.caption}</figcaption>
		</figure>
	)
}

/* ------------------------------------------------------------- the modal -- */

const pad = (n: number) => String(n).padStart(2, "0")

const FOCUSABLE =
	'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

type ProblemDialogProps = {
	problem: Problem
	index: number
	total: number
	onClose: () => void
	onNavigate: (direction: 1 | -1) => void
}

function ProblemDialog({
	problem,
	index,
	total,
	onClose,
	onNavigate,
}: ProblemDialogProps) {
	const reduced = useReducedMotion()
	const overlayRef = useRef<HTMLDivElement>(null)
	const scrimRef = useRef<HTMLDivElement>(null)
	const dialogRef = useRef<HTMLDivElement>(null)
	const scrollRef = useRef<HTMLDivElement>(null)
	const progressRef = useRef<HTMLSpanElement>(null)
	const closingRef = useRef(false)
	const stepRefs = useRef<Record<string, HTMLElement | null>>({})

	const [activeStep, setActiveStep] = useState<string>(DIALOG_STEPS[0].id)
	const [countersOn, setCountersOn] = useState(false)

	const rawId = useId().replace(/[^a-zA-Z0-9-_]/g, "")
	const dialogId = `pws-dialog-${rawId}`

	const stepRefSetters = useMemo(() => {
		const setters: Record<string, (el: HTMLElement | null) => void> = {}
		DIALOG_STEPS.forEach((step) => {
			setters[step.id] = (el) => {
				stepRefs.current[step.id] = el
			}
		})
		return setters
	}, [])

	/* ---- close (animated) ---- */
	const requestClose = useCallback(() => {
		if (closingRef.current) return
		closingRef.current = true
		const dialog = dialogRef.current
		const scrim = scrimRef.current
		if (reduced || !dialog || !scrim) {
			onClose()
			return
		}
		gsap
			.timeline({ onComplete: onClose })
			.to(dialog, {
				opacity: 0,
				y: 22,
				scale: 0.975,
				duration: 0.26,
				ease: "power2.in",
			})
			.to(scrim, { opacity: 0, duration: 0.22, ease: "power1.in" }, 0.04)
	}, [onClose, reduced])

	/* ---- scroll lock: Lenis-safe, keeps the page at its current position ---- */
	useEffect(() => {
		const { body, documentElement } = document
		const scrollbarWidth = Math.max(
			0,
			window.innerWidth - documentElement.clientWidth,
		)

		const previous = {
			bodyOverflow: body.style.overflow,
			bodyPaddingRight: body.style.paddingRight,
			htmlOverflow: documentElement.style.overflow,
		}

		/*
		 * Do not use `position: fixed` + negative `top` here.
		 * With Lenis that temporarily makes the document report scrollY = 0,
		 * which is why opening the modal can visually jump back to the hero.
		 */
		body.style.overflow = "hidden"
		documentElement.style.overflow = "hidden"

		// Avoid a horizontal layout shift when the browser scrollbar disappears.
		if (scrollbarWidth > 0) {
			const currentPadding =
				Number.parseFloat(window.getComputedStyle(body).paddingRight) || 0
			body.style.paddingRight = `${currentPadding + scrollbarWidth}px`
		}

		return () => {
			body.style.overflow = previous.bodyOverflow
			body.style.paddingRight = previous.bodyPaddingRight
			documentElement.style.overflow = previous.htmlOverflow
		}
	}, [])

	/* ---- entrance ---- */
	useLayoutEffect(() => {
		const dialog = dialogRef.current
		const scrim = scrimRef.current
		if (!dialog || !scrim) return
		if (reduced) {
			gsap.set([scrim, dialog], { opacity: 1, y: 0, scale: 1 })
			return
		}
		const tl = gsap.timeline()
		tl.fromTo(
			scrim,
			{ opacity: 0 },
			{ opacity: 1, duration: 0.38, ease: "power2.out" },
		).fromTo(
			dialog,
			{ opacity: 0, y: 40, scale: 0.955 },
			{ opacity: 1, y: 0, scale: 1, duration: 0.62, ease: "expo.out" },
			0.06,
		)
		return () => {
			tl.kill()
		}
	}, [reduced])

	/* ---- initial focus ---- */
	useEffect(() => {
		const id = window.setTimeout(() => {
			scrollRef.current?.focus({ preventScroll: true })
		}, 60)
		return () => window.clearTimeout(id)
	}, [])

	/* ---- keyboard: escape, prev/next, focus trap ---- */
	useEffect(() => {
		const handleKey = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				event.preventDefault()
				requestClose()
				return
			}
			if (event.key === "ArrowRight") {
				event.preventDefault()
				onNavigate(1)
				return
			}
			if (event.key === "ArrowLeft") {
				event.preventDefault()
				onNavigate(-1)
				return
			}
			if (event.key !== "Tab") return
			const dialog = dialogRef.current
			if (!dialog) return
			const focusables = Array.from(
				dialog.querySelectorAll<HTMLElement>(FOCUSABLE),
			).filter((el) => el.offsetParent !== null)
			if (!focusables.length) return
			const first = focusables[0]
			const last = focusables[focusables.length - 1]
			const active = document.activeElement as HTMLElement | null
			if (event.shiftKey && (active === first || !dialog.contains(active))) {
				event.preventDefault()
				last.focus()
			} else if (!event.shiftKey && active === last) {
				event.preventDefault()
				first.focus()
			}
		}
		document.addEventListener("keydown", handleKey)
		return () => document.removeEventListener("keydown", handleKey)
	}, [onNavigate, requestClose])

	/* ---- per-problem intro choreography ---- */
	useLayoutEffect(() => {
		const root = dialogRef.current
		if (!root) return
		const scroller = scrollRef.current
		if (scroller) scroller.scrollTop = 0
		setActiveStep(DIALOG_STEPS[0].id)
		setCountersOn(false)
		const start = window.setTimeout(() => setCountersOn(true), 220)
		if (reduced) {
			return () => window.clearTimeout(start)
		}
		const ctx = gsap.context(() => {
			const tl = gsap.timeline({ delay: 0.08 })
			tl.fromTo(
				"[data-intro]",
				{ opacity: 0, y: 14 },
				{
					opacity: 1,
					y: 0,
					duration: 0.5,
					ease: "power3.out",
					stagger: 0.07,
				},
			)
				.fromTo(
					"[data-jump]",
					{ opacity: 0, x: -8 },
					{
						opacity: 1,
						x: 0,
						duration: 0.4,
						ease: "power2.out",
						stagger: 0.05,
					},
					0.18,
				)
				.fromTo(
					"[data-dial-tick]",
					{ opacity: 0 },
					{ opacity: 1, duration: 0.3, ease: "none", stagger: 0.012 },
					0.14,
				)

			const arc = root.querySelector<SVGCircleElement>("[data-arc]")
			if (arc) {
				const target = Number(arc.dataset.arcTarget ?? "1")
				tl.fromTo(
					arc,
					{ strokeDashoffset: 1 },
					{
						strokeDashoffset: 1 - target,
						duration: 1.15,
						ease: "power3.out",
					},
					0.2,
				)
			}
		}, root)
		return () => {
			window.clearTimeout(start)
			ctx.revert()
		}
	}, [problem.id, reduced])

	/* ---- per-block reveals inside the modal scroller ---- */
	useEffect(() => {
		const root = dialogRef.current
		const scroller = scrollRef.current
		if (!root || !scroller || reduced) return
		const blocks = Array.from(
			root.querySelectorAll<HTMLElement>("[data-reveal]"),
		)
		if (!blocks.length) return

		const tweens: Array<gsap.core.Tween> = []
		const played = new WeakSet<HTMLElement>()

		const reveal = (block: HTMLElement) => {
			if (played.has(block)) return
			played.add(block)

			tweens.push(
				gsap.fromTo(
					block,
					{ opacity: 0, y: 18 },
					{ opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
				),
			)

			const items = block.querySelectorAll<HTMLElement>("[data-stagger]")
			if (items.length) {
				tweens.push(
					gsap.fromTo(
						items,
						{ opacity: 0, y: 10 },
						{
							opacity: 1,
							y: 0,
							duration: 0.45,
							ease: "power2.out",
							stagger: 0.06,
							delay: 0.1,
						},
					),
				)
			}

			block.querySelectorAll<HTMLElement>("[data-bar]").forEach((bar, i) => {
				const target = Number(bar.dataset.bar ?? "100") / 100
				tweens.push(
					gsap.fromTo(
						bar,
						{ scaleX: 0 },
						{
							scaleX: target,
							duration: 0.95,
							ease: "power3.out",
							delay: 0.18 + i * 0.08,
						},
					),
				)
			})

			const nodes = block.querySelectorAll<HTMLElement>("[data-pipe-node]")
			if (nodes.length) {
				tweens.push(
					gsap.fromTo(
						nodes,
						{ opacity: 0, y: 12 },
						{
							opacity: 1,
							y: 0,
							duration: 0.5,
							ease: "power3.out",
							stagger: 0.12,
						},
					),
				)
				block
					.querySelectorAll<SVGPathElement>("[data-pipe-flow]")
					.forEach((flow) => {
						tweens.push(
							gsap.to(flow, {
								strokeDashoffset: -24,
								duration: 1.6,
								ease: "none",
								repeat: -1,
							}),
						)
					})
				block
					.querySelectorAll<HTMLElement>("[data-pipe-packet]")
					.forEach((packet, i) => {
						tweens.push(
							gsap.fromTo(
								packet,
								{ left: "0%", opacity: 0 },
								{
									left: "100%",
									opacity: 1,
									duration: 1.5,
									ease: "power1.inOut",
									repeat: -1,
									repeatDelay: 0.7,
									delay: 0.4 + i * 0.45,
								},
							),
						)
					})
			}

			const line = block.querySelector<SVGPathElement>("[data-chart-line]")
			if (line) {
				tweens.push(
					gsap.fromTo(
						line,
						{ strokeDasharray: "1 1", strokeDashoffset: 1 },
						{
							strokeDashoffset: 0,
							duration: 1.25,
							ease: "power2.out",
							delay: 0.12,
							clearProps: "strokeDasharray,strokeDashoffset",
						},
					),
				)
			}
			const area = block.querySelector<SVGPathElement>("[data-chart-area]")
			if (area) {
				tweens.push(
					gsap.fromTo(
						area,
						{ opacity: 0 },
						{ opacity: 1, duration: 0.9, ease: "power2.out", delay: 0.35 },
					),
				)
			}
			const dots = block.querySelectorAll<SVGCircleElement>("[data-chart-dot]")
			if (dots.length) {
				tweens.push(
					gsap.fromTo(
						dots,
						{ opacity: 0 },
						{
							opacity: 1,
							duration: 0.28,
							ease: "power2.out",
							stagger: 0.09,
							delay: 0.5,
						},
					),
				)
			}
			const marker = block.querySelector<SVGLineElement>("[data-chart-marker]")
			if (marker) {
				tweens.push(
					gsap.fromTo(
						marker,
						{ opacity: 0 },
						{ opacity: 1, duration: 0.4, ease: "power2.out", delay: 1 },
					),
				)
			}
		}

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						reveal(entry.target as HTMLElement)
						observer.unobserve(entry.target)
					}
				})
			},
			{ root: scroller, threshold: 0.12 },
		)
		blocks.forEach((block) => observer.observe(block))

		return () => {
			observer.disconnect()
			tweens.forEach((tween) => tween.kill())
		}
	}, [problem.id, reduced])

	/* ---- read progress + section spy ---- */
	useEffect(() => {
		const scroller = scrollRef.current
		if (!scroller) return
		const handleScroll = () => {
			const max = scroller.scrollHeight - scroller.clientHeight
			const ratio = max > 0 ? Math.min(1, Math.max(0, scroller.scrollTop / max)) : 0
			if (progressRef.current) {
				progressRef.current.style.transform = `scaleX(${ratio})`
			}
			const probe = scroller.scrollTop + scroller.clientHeight * 0.3
			let current = DIALOG_STEPS[0].id
			DIALOG_STEPS.forEach((step) => {
				const el = stepRefs.current[step.id]
				if (el && el.offsetTop <= probe) current = step.id
			})
			setActiveStep((prev) => (prev === current ? prev : current))
		}
		handleScroll()
		scroller.addEventListener("scroll", handleScroll, { passive: true })
		window.addEventListener("resize", handleScroll)
		return () => {
			scroller.removeEventListener("scroll", handleScroll)
			window.removeEventListener("resize", handleScroll)
		}
	}, [problem.id])

	const goToStep = useCallback(
		(stepId: string) => {
			const scroller = scrollRef.current
			const target = stepRefs.current[stepId]
			if (!scroller || !target) return
			scroller.scrollTo({
				top: Math.max(0, target.offsetTop - 10),
				behavior: reduced ? "auto" : "smooth",
			})
			setActiveStep(stepId)
		},
		[reduced],
	)

	if (typeof document === "undefined") return null

	return createPortal(
		<div
			ref={overlayRef}
			className={styles.overlay}
			role="presentation"
			data-lenis-prevent=""
			onPointerDown={(event) => {
				if (
					event.target === overlayRef.current ||
					event.target === scrimRef.current
				) {
					requestClose()
				}
			}}
		>
			<div ref={scrimRef} className={styles.scrim} aria-hidden="true" />

			<div
				ref={dialogRef}
				className={styles.dialog}
				role="dialog"
				aria-modal="true"
				aria-labelledby={`${dialogId}-title`}
			>
				<div className={styles.dialogTop}>
					<span className={styles.topTag}>
						<span className={styles.topDot} aria-hidden="true" />
						{problem.serviceFull}
					</span>
					<div className={styles.topActions}>
						<span className={styles.topCount}>
							{pad(index + 1)}
							<i> / {pad(total)}</i>
						</span>
						<div className={styles.topNav}>
							<button
								type="button"
								className={`${styles.navBtn} ${styles.navPrev}`}
								onClick={() => onNavigate(-1)}
								aria-label="Previous problem"
							>
								<ArrowIcon size={15} />
							</button>
							<button
								type="button"
								className={styles.navBtn}
								onClick={() => onNavigate(1)}
								aria-label="Next problem"
							>
								<ArrowIcon size={15} />
							</button>
						</div>
						<button
							type="button"
							className={styles.close}
							onClick={requestClose}
							aria-label="Close"
						>
							<CloseIcon />
						</button>
					</div>
					<div className={styles.dialogProgress} aria-hidden="true">
						<span ref={progressRef} className={styles.dialogProgressBar} />
					</div>
				</div>

				<div
					ref={scrollRef}
					className={styles.dialogScroll}
					tabIndex={-1}
					data-lenis-prevent=""
				>
					<div className={styles.dialogGrid}>
						{/* ---------------- sticky rail ---------------- */}
						<div className={styles.rail}>
							<div className={styles.railSticky}>
								<p className={styles.railCode} data-intro="">
									<span aria-hidden="true" />
									{problem.code} · Entry {pad(index + 1)}
								</p>
								<h3
									id={`${dialogId}-title`}
									className={styles.railTitle}
									data-intro=""
								>
									{problem.title}
								</h3>
								<p className={styles.railLead} data-intro="">
									{problem.lead}
								</p>
								<p className={styles.railStake} data-intro="">
									<span className={styles.railStakeLabel}>Why it matters</span>
									{problem.stake}
								</p>
								<div className={styles.railDial} data-intro="">
									<SignatureDial
										value={problem.metric.value}
										fill={problem.metric.fill}
										play={countersOn && !reduced}
									/>
									<p className={styles.railDialLabel}>
										<span className={styles.railDialTag}>
											Headline target · illustrative
										</span>
										{problem.metric.label}
									</p>
								</div>
								<nav className={styles.jump} aria-label="Jump to a section">
									{DIALOG_STEPS.map((step) => (
										<button
											key={step.id}
											type="button"
											data-jump=""
											className={`${styles.jumpBtn} ${
												activeStep === step.id ? styles.jumpBtnActive : ""
											}`}
											onClick={() => goToStep(step.id)}
											aria-current={activeStep === step.id ? "true" : undefined}
										>
											<span className={styles.jumpRule} aria-hidden="true" />
											{step.label}
										</button>
									))}
								</nav>
							</div>
						</div>

						{/* ---------------- body ---------------- */}
						<div className={styles.body}>
							{/* 01 overview + target metrics */}
							<section
								id={`${dialogId}-snapshot`}
								ref={stepRefSetters.snapshot}
								className={styles.block}
								data-reveal=""
								aria-label="Overview"
							>
								<p className={styles.overview} data-stagger="">
									{problem.summary}
								</p>
								<div className={styles.blockHead}>
									<h4 className={styles.blockTitle}>Target metrics</h4>
									<p className={styles.blockNote}>Illustrative · not a client result</p>
								</div>
								<div className={styles.metrics}>
									{problem.metrics.map((metric, i) => (
										<div key={metric.label} className={styles.metric}>
											<span className={styles.metricRank}>T{pad(i + 1)}</span>
											<span className={styles.metricValue}>
												<Counter
													value={metric.value}
													play={countersOn && !reduced}
												/>
											</span>
											<span className={styles.metricLabel}>{metric.label}</span>
											<span className={styles.metricBar} aria-hidden="true">
												<span
													className={styles.metricBarFill}
													data-bar={metric.fill}
													style={{ transform: `scaleX(${metric.fill / 100})` }}
												/>
											</span>
										</div>
									))}
								</div>
								<p className={styles.metricsNote}>{problem.metricsNote}</p>
							</section>

							{/* 02 signals + response */}
							<section
								id={`${dialogId}-diagnosis`}
								ref={stepRefSetters.diagnosis}
								className={styles.block}
								data-reveal=""
								aria-label="Diagnosis"
							>
								<div className={styles.blockHead}>
									<h4 className={styles.blockTitle}>Diagnosis</h4>
									<p className={styles.blockNote}>{problem.code}</p>
								</div>
								<div className={styles.columns}>
									<div className={styles.column}>
										<h5 className={styles.blockTitle}>Signals we hear</h5>
										<ul className={styles.list}>
											{problem.signals.map((signal) => (
												<li
													key={signal}
													className={styles.listItem}
													data-stagger=""
												>
													<span className={styles.bullet} aria-hidden="true" />
													{signal}
												</li>
											))}
										</ul>
									</div>
									<div className={styles.column}>
										<h5 className={styles.blockTitle}>What JabitSoft does</h5>
										<ol className={styles.steps}>
											{problem.response.map((item, i) => (
												<li key={item} className={styles.step} data-stagger="">
													<span className={styles.stepIndex}>{pad(i + 1)}</span>
													<span className={styles.stepText}>{item}</span>
												</li>
											))}
										</ol>
									</div>
								</div>
							</section>

							{/* 03 journey */}
							<section
								id={`${dialogId}-journey`}
								ref={stepRefSetters.journey}
								className={styles.block}
								data-reveal=""
								aria-label="Implementation journey"
							>
								<div className={styles.blockHead}>
									<h4 className={styles.blockTitle}>Implementation journey</h4>
									<p className={styles.blockNote}>
										Today → what we build → what you get
									</p>
								</div>
								<JourneyDiagram flow={problem.flow} />
							</section>

							{/* 04 outcome + service */}
							<section
								id={`${dialogId}-impact`}
								ref={stepRefSetters.impact}
								className={styles.block}
								data-reveal=""
								aria-label="Outcome"
							>
								<div className={styles.blockHead}>
									<h4 className={styles.blockTitle}>Illustrative trajectory</h4>
									<p className={styles.blockNote}>
										Shape of progress, not a promised result
									</p>
								</div>
								<ImpactChart trend={problem.trend} />
								<div className={styles.outcome}>
									<span className={styles.outcomeIcon} aria-hidden="true">
										<SparkIcon />
									</span>
									<p className={styles.outcomeText}>
										<span className={styles.outcomeTag}>Final outcome</span>
										{problem.outcome}
									</p>
								</div>
								<div className={styles.serviceNote}>
									<span className={styles.serviceNoteIcon} aria-hidden="true">
										<ServiceIcon name={problem.icon} size={18} />
									</span>
									<div>
										<span className={styles.serviceNoteLabel}>
											Relevant service
										</span>
										<span className={styles.serviceNoteValue}>
											{problem.serviceFull}
										</span>
										<span className={styles.serviceNoteText}>
											{problem.capability}
										</span>
									</div>
								</div>
							</section>
						</div>
					</div>
				</div>
			</div>
		</div>,
		document.body,
	)
}

/* ---------------------------------------------------------------- section -- */

export default function ProblemsWeSolve() {
	const reduced = useReducedMotion()
	const sectionRef = useRef<HTMLElement>(null)
	const headerRef = useRef<HTMLDivElement>(null)
	const statsRef = useRef<HTMLUListElement>(null)
	const headerInView = useInView(headerRef, { once: true, amount: 0.4 })
	const statsInView = useInView(statsRef, { once: true, amount: 0.25 })
	const [openIndex, setOpenIndex] = useState<number | null>(null)

	/* grey → dark, left to right, scrubbed by scroll (site-wide heading behaviour) */
	useLayoutEffect(() => {
		const root = sectionRef.current
		if (!root) return
		const heading = root.querySelector<HTMLElement>("[data-heading-fill]")
		if (!heading) return
		if (reduced) {
			gsap.set(heading, { backgroundSize: "100% 100%, 100% 100%" })
			return
		}
		const tween = gsap.fromTo(
			heading,
			{ backgroundSize: "100% 100%, 0% 100%" },
			{
				backgroundSize: "100% 100%, 100% 100%",
				ease: "none",
				scrollTrigger: {
					trigger: heading,
					start: "top 92%",
					end: "top 38%",
					scrub: 0.7,
					invalidateOnRefresh: true,
				},
			},
		)
		return () => {
			tween.scrollTrigger?.kill()
			tween.kill()
		}
	}, [reduced])

	/* stat reveals, meter fills and ledger entrance */
	useLayoutEffect(() => {
		const root = sectionRef.current
		if (!root || reduced) return
		const ctx = gsap.context(() => {
			const stats = gsap.utils.toArray<HTMLElement>("[data-stat]")
			if (stats.length) {
				gsap.from(stats, {
					opacity: 0,
					y: 24,
					duration: 0.75,
					ease: "power3.out",
					stagger: 0.12,
					scrollTrigger: { trigger: stats[0], start: "top 88%", once: true },
				})
			}

			gsap.utils.toArray<HTMLElement>("[data-meter]").forEach((meter) => {
				const target = Number(meter.dataset.meter ?? "100") / 100
				gsap.fromTo(
					meter,
					{ scaleX: 0 },
					{
						scaleX: target,
						duration: 1.1,
						ease: "power3.out",
						scrollTrigger: { trigger: meter, start: "top 96%", once: true },
					},
				)
			})

			const entries = gsap.utils.toArray<HTMLElement>("[data-entry]")
			if (entries.length) {
				gsap.from(entries, {
					opacity: 0,
					y: 26,
					duration: 0.7,
					ease: "power3.out",
					stagger: 0.07,
					scrollTrigger: { trigger: entries[0], start: "top 86%", once: true },
				})
			}
		}, root)
		return () => ctx.revert()
	}, [reduced])

	const closeProblem = useCallback(() => setOpenIndex(null), [])
	const navigate = useCallback((direction: 1 | -1) => {
		setOpenIndex((prev) =>
			prev === null
				? prev
				: (prev + direction + PROBLEMS.length) % PROBLEMS.length,
		)
	}, [])

	const activeProblem = openIndex === null ? null : PROBLEMS[openIndex]

	return (
		<MotionConfig reducedMotion="user">
			<section
				ref={sectionRef}
				id="problems"
				className={styles.section}
				aria-labelledby="problems-we-solve-title"
			>
				<div className={styles.inner}>
					{/* ---------------- header ---------------- */}
					<header className={styles.header}>
						<motion.div
							ref={headerRef}
							className={styles.headerText}
							initial={{ opacity: 0, y: 20 }}
							animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
							transition={{ duration: 0.7, ease: EASE_OUT }}
						>
							<p className={styles.eyebrow}>(Problems we solve)</p>
							<h2
								id="problems-we-solve-title"
								className={styles.title}
								data-heading-fill=""
							>
								Friction slows{" "}
								<span className={styles.titleAccent}>growth.</span>
							</h2>
							<p className={styles.subtitle}>
								We remove the bottlenecks that slow teams down — across systems,
								operations and digital journeys.
							</p>
						</motion.div>
					</header>

					{/* ---------------- 01 · evidence ---------------- */}
					<div className={styles.evidence}>
						<div className={styles.evidenceHead}>
							<p className={styles.partLabel}>
								<b>01</b> Evidence
								<span className={styles.partRule} aria-hidden="true" />
								Directional
							</p>
							<div className={styles.evidenceIntro}>
								<p className={styles.evidenceStatement}>
									Three patterns we keep seeing.
								</p>
								<p className={styles.evidenceNote}>
									Illustrative signals, not client benchmarks.
								</p>
							</div>
						</div>

						<div className={styles.evidenceData}>
							<ul ref={statsRef} className={styles.stats}>
								{EVIDENCE.map((item, i) => (
									<li
										key={item.id}
										data-stat=""
										className={styles.stat}
									>
										<span className={styles.statTopic}>{item.topic}</span>
										<span className={styles.statValue}>
											<Counter
												value={item.value}
												play={statsInView && !reduced}
												duration={1.3}
											/>
										</span>
										<span className={styles.statMeter} aria-hidden="true">
											<span
												className={styles.statMeterFill}
												data-meter={item.fill}
												style={{ transform: `scaleX(${item.fill / 100})` }}
											/>
										</span>
										<p className={styles.statCopy}>{item.copy}</p>
										<span className={styles.srOnly}>{item.basis}</span>
									</li>
								))}
							</ul>
						</div>
					</div>

					{/* ---------------- 02 · problem ledger ---------------- */}
					<div className={styles.ledger}>
						<div className={styles.ledgerHead}>
							<div className={styles.ledgerHeadMain}>
								<p className={styles.partLabel}>
									<b>02</b> Problems we solve
									<span className={styles.partRule} aria-hidden="true" />
									{pad(PROBLEMS.length)} entries
								</p>
								<h3 className={styles.ledgerTitle}>
									Six bottlenecks we are built to remove.
								</h3>
							</div>
							<p className={styles.ledgerLead}>
								Each entry is a real business problem mapped to a JabitSoft
								capability. <b>Open an entry</b> for the full diagnosis, the work
								involved, the implementation journey and the metrics we design
								toward.
							</p>
						</div>

						<ul className={styles.entries}>
							{PROBLEMS.map((problem, i) => (
								<li key={problem.id} className={styles.entry}>
									<button
										type="button"
										data-entry=""
										className={styles.entryBtn}
										onClick={() => setOpenIndex(i)}
										aria-haspopup="dialog"
										aria-label={`Open the detailed breakdown: ${problem.title} — ${problem.serviceFull}`}
									>
										<span className={styles.entryIndex}>
											<span className={styles.entryNum}>{pad(i + 1)}</span>
											<span className={styles.entryTick} aria-hidden="true" />
											<span className={styles.entryCode}>{problem.code}</span>
										</span>

										<span className={styles.entryLead}>
											<span className={styles.entryService}>
												<span className={styles.entryServiceIcon}>
													<ServiceIcon name={problem.icon} />
												</span>
												<span className={styles.entryServiceText}>
													{problem.service}
												</span>
											</span>
											<span className={styles.entryTitle}>{problem.title}</span>
											<span className={styles.entrySummary}>
												{problem.summary}
											</span>
										</span>

										<span className={styles.entryWhy}>
											<span className={styles.entryLabel}>Why it matters</span>
											<span className={styles.entryWhyText}>{problem.stake}</span>
											<span className={styles.entryCapability}>
												<b>Capability</b> · {problem.capability}
											</span>
										</span>

										<span className={styles.entryMetric}>
											<span className={styles.entryLabel}>Target</span>
											<span className={styles.entryMetricValue}>
												{problem.metric.value}
											</span>
											<span className={styles.entryMetricLabel}>
												{problem.metric.label}
											</span>
										</span>

										<span className={styles.entryCta}>
											<span className={styles.entryCtaText}>Open breakdown</span>
											<span className={styles.entryCtaIcon} aria-hidden="true">
												<ArrowIcon size={16} />
											</span>
										</span>
									</button>
								</li>
							))}
						</ul>

						<p className={styles.ledgerFoot}>
							<span className={styles.ledgerFootMark} aria-hidden="true">
								†
							</span>
							Target figures in the entries and modals are illustrative planning
							numbers used to scope work — not client-verified outcomes. We
							baseline your own numbers during discovery, then agree targets in
							writing before delivery starts.
						</p>
					</div>
				</div>

				{activeProblem ? (
					<ProblemDialog
						problem={activeProblem}
						index={openIndex ?? 0}
						total={PROBLEMS.length}
						onClose={closeProblem}
						onNavigate={navigate}
					/>
				) : null}
			</section>
		</MotionConfig>
	)
}
