"use client"

import {
	Fragment,
	useCallback,
	useEffect,
	useId,
	useLayoutEffect,
	useRef,
	useState,
	type ReactNode,
} from "react"
import { createPortal } from "react-dom"
import {
	AnimatePresence,
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

/* ------------------------------------------------------------------ *
 * data
 * ------------------------------------------------------------------ */

type IconKey = "agent" | "cloud" | "mobile" | "erp" | "seo" | "web"

type Problem = {
	id: string
	icon: IconKey
	/** problem headline shown in the card + diagram core */
	title: string
	/** compact service label (card) */
	service: string
	/** full service name (dialog) */
	serviceFull: string
	summary: string
	metric: { value: string; label: string }
	lead: string
	signals: string[]
	response: string[]
	metrics: { value: string; label: string; fill: number }[]
	flow: [string, string, string]
	trend: { points: number[]; labels: string[]; caption: string }
	outcome: string
}

const PROBLEMS: Problem[] = [
	{
		id: "agentic-ai",
		icon: "agent",
		title: "Manual operations",
		service: "Agentic AI Development",
		serviceFull: "Agentic AI Development",
		summary:
			"Approvals, research and follow-ups still move by hand, so output is capped by available hours.",
		metric: { value: "3\u00d7", label: "faster task turnaround" },
		lead: "Your team is the integration layer. Every approval, lookup and follow-up waits for a person to move it, so throughput is capped by headcount instead of demand.",
		signals: [
			"Work stalls in inboxes and spreadsheets between systems",
			"Specialists spend the day on copy-paste coordination",
			"No reliable trail of how a decision was actually made",
			"Volume spikes need hiring, not configuration",
		],
		response: [
			"Map high-volume workflows and isolate the agent-safe steps",
			"Build tool-connected agents with access to your real systems",
			"Add human review gates and full traceability on every run",
			"Ship in stages, proving accuracy before widening scope",
		],
		metrics: [
			{ value: "62%", label: "Of hours lost to repetitive coordination", fill: 62 },
			{ value: "44%", label: "Workflow steps that need no human", fill: 44 },
			{ value: "3\u00d7", label: "Task turnaround after automation", fill: 78 },
		],
		flow: ["Manual handoffs", "Agent + tool layer", "Reviewed output"],
		trend: {
			points: [8, 19, 34, 46, 63, 78],
			labels: ["M1", "M2", "M3", "M4", "M5", "M6"],
			caption: "Share of workflow steps running autonomously, first six months.",
		},
		outcome:
			"The same team ships materially more work \u2014 with a written record behind every automated decision.",
	},
	{
		id: "cloud",
		icon: "cloud",
		title: "Fragile infrastructure",
		service: "Cloud Consulting",
		serviceFull: "Cloud Consulting",
		summary:
			"Releases are risky and cost drifts because the cloud foundation grew without an architecture.",
		metric: { value: "70%", label: "shorter deploy cycles" },
		lead: "The platform grew feature by feature. Now releases are tense, spend drifts and scaling is a fire drill instead of a setting.",
		signals: [
			"Deploys are manual, risky and scheduled around quiet hours",
			"Cloud cost grows faster than usage, with no clear owner",
			"Environments drift, so staging never predicts production",
			"One region, one instance, no tested recovery path",
		],
		response: [
			"Audit architecture, spend and delivery pipeline in one pass",
			"Codify infrastructure and standardise every environment",
			"Automate CI/CD with rollbacks and observability built in",
			"Right-size and autoscale against real traffic patterns",
		],
		metrics: [
			{ value: "70%", label: "Shorter deploy cycle after pipeline work", fill: 70 },
			{ value: "31%", label: "Typical cloud spend recovered", fill: 31 },
			{ value: "99.9%", label: "Availability target we design for", fill: 92 },
		],
		flow: ["Manual releases", "Codified platform", "Safe daily delivery"],
		trend: {
			points: [12, 20, 33, 48, 58, 70],
			labels: ["W2", "W4", "W6", "W8", "W10", "W12"],
			caption: "Deployment frequency index across a twelve-week modernization.",
		},
		outcome:
			"Infrastructure that scales on purpose, ships daily and costs what it should.",
	},
	{
		id: "mobile",
		icon: "mobile",
		title: "Leaky mobile journeys",
		service: "Mobile App Development",
		serviceFull: "Mobile Application Development",
		summary:
			"Users drop off mid-flow \u2014 slow screens, brittle APIs and navigation nobody can predict.",
		metric: { value: "\u22124 steps", label: "per core journey" },
		lead: "People install the app, then leave mid-task. Slow screens, brittle APIs and unclear navigation quietly send your users back to the browser.",
		signals: [
			"Drop-off concentrated on two or three key screens",
			"Cold start and list rendering lag on mid-range devices",
			"Offline and weak-network states are unhandled",
			"Feature parity gaps between iOS and Android",
		],
		response: [
			"Instrument the funnel and find exactly where intent dies",
			"Rebuild core journeys with fewer steps and clearer state",
			"Harden the API layer with caching, retries and offline queues",
			"Ship one codebase where it fits, native where it matters",
		],
		metrics: [
			{ value: "\u22124", label: "Steps removed from the primary journey", fill: 64 },
			{ value: "1.8s", label: "Target time to first useful screen", fill: 74 },
			{ value: "38%", label: "Lift in task completion after redesign", fill: 38 },
		],
		flow: ["Confused flow", "Rebuilt journey", "Completed task"],
		trend: {
			points: [22, 29, 38, 47, 55, 61],
			labels: ["M1", "M2", "M3", "M4", "M5", "M6"],
			caption: "Task completion rate on the primary mobile journey.",
		},
		outcome:
			"A mobile product people finish tasks in \u2014 on the devices they actually own.",
	},
	{
		id: "erp",
		icon: "erp",
		title: "Disconnected systems",
		service: "ERP Services",
		serviceFull: "ERP Services",
		summary:
			"Finance, inventory and delivery live in separate tools, so every report is rebuilt by hand.",
		metric: { value: "40%", label: "faster month-end close" },
		lead: "Finance, inventory, delivery and support each hold a version of the truth \u2014 so every report is rebuilt by hand and fully trusted by nobody.",
		signals: [
			"The same record is re-entered in three different tools",
			"Month-end close depends on one person's spreadsheet",
			"Stock, invoices and delivery status disagree",
			"Decisions wait days for a number people believe",
		],
		response: [
			"Model the real process before configuring any module",
			"Implement ERP around one source of truth per entity",
			"Integrate the systems you keep, retire the ones you don't",
			"Roll out by function with training and parallel-run checks",
		],
		metrics: [
			{ value: "40%", label: "Faster month-end close", fill: 40 },
			{ value: "1", label: "Source of truth per business entity", fill: 88 },
			{ value: "5h", label: "Manual reporting removed each week", fill: 56 },
		],
		flow: ["Siloed tools", "Connected ERP", "One live report"],
		trend: {
			points: [10, 24, 39, 52, 64, 74],
			labels: ["P1", "P2", "P3", "P4", "P5", "P6"],
			caption: "Share of business processes running on connected data.",
		},
		outcome:
			"One dependable operating picture \u2014 planned, sold and reported from the same numbers.",
	},
	{
		id: "seo",
		icon: "seo",
		title: "Invisible in search",
		service: "SEO / Digital Marketing",
		serviceFull: "SEO / Digital Marketing",
		summary:
			"Demand exists, but weak technical SEO hands high-intent queries to competitors.",
		metric: { value: "2\u00d7", label: "qualified organic traffic" },
		lead: "Demand for what you sell already exists. Weak technical foundations and thin content hand those high-intent queries to your competitors.",
		signals: [
			"Crawl, indexing and Core Web Vitals issues suppress pages",
			"Content targets vocabulary buyers never search for",
			"No mapped path from query to conversion",
			"Spend reported in clicks instead of pipeline",
		],
		response: [
			"Fix crawlability, speed, schema and internal linking first",
			"Build a keyword-to-intent map across the full funnel",
			"Publish content that answers real evaluation questions",
			"Report qualified pipeline, not vanity traffic",
		],
		metrics: [
			{ value: "2\u00d7", label: "Qualified organic traffic in two quarters", fill: 72 },
			{ value: "3.1\u00d7", label: "More indexed pages earning impressions", fill: 64 },
			{ value: "\u221228%", label: "Cost per qualified lead", fill: 44 },
		],
		flow: ["Invisible pages", "Technical + content fix", "High-intent traffic"],
		trend: {
			points: [14, 21, 32, 45, 58, 72],
			labels: ["M1", "M2", "M3", "M4", "M5", "M6"],
			caption: "Qualified organic sessions index over two quarters.",
		},
		outcome:
			"Search that compounds \u2014 measurable pipeline instead of impressions.",
	},
	{
		id: "web",
		icon: "web",
		title: "Passive website",
		service: "Website Solutions",
		serviceFull: "Website Solutions",
		summary:
			"The site explains the company but never converts \u2014 slow, generic and hard to navigate.",
		metric: { value: "25%", label: "higher conversion rate" },
		lead: "The site describes the company but never persuades. Slow pages, generic structure and unclear next steps leak the traffic you already paid for.",
		signals: [
			"Healthy traffic, weak enquiry rate",
			"Key pages fail performance and accessibility checks",
			"Message hierarchy buries the actual offer",
			"Every content change needs a developer",
		],
		response: [
			"Rebuild the narrative around one clear decision per page",
			"Design a fast, accessible, conversion-focused system",
			"Move copy into a CMS the marketing team owns",
			"Test structure and messaging against real behaviour",
		],
		metrics: [
			{ value: "25%", label: "Higher conversion rate after rebuild", fill: 25 },
			{ value: "95+", label: "Lighthouse performance target", fill: 95 },
			{ value: "WCAG AA", label: "Accessibility baseline we build to", fill: 82 },
		],
		flow: ["Passive brochure", "Conversion-focused build", "Qualified enquiry"],
		trend: {
			points: [18, 26, 35, 44, 52, 58],
			labels: ["W1", "W3", "W5", "W7", "W9", "W11"],
			caption: "Enquiry conversion index after launch.",
		},
		outcome:
			"A website that carries its weight: fast, accessible and built to convert.",
	},
]

const EVIDENCE = [
	{
		value: "62%",
		copy: "Of operational hours go to repetitive coordination that software should already be handling.",
		source: "From user interviews",
	},
	{
		value: "48%",
		copy: "Of growth-stage teams ship slower every quarter because infrastructure scaled without a strategy.",
		source: "From market research",
	},
	{
		value: "57%",
		copy: "Of customer journeys break where apps, data and digital touchpoints stay disconnected.",
		source: "From survey",
	},
]

/* ------------------------------------------------------------------ *
 * geometry
 * ------------------------------------------------------------------ */

const roundSvg = (value: number) => Math.round(value * 10000) / 10000

const VIEW = 560
const C = 280
const R_ORBIT = 176
const NODE_R = 24
const TICKS = 96
const TICK_IN = 200
const TICK_OUT = 226
const TICK_OUT_MAJ = 236
const R_PROG = 248
const R_HAIR = 268
const R_EXIT = 276
const PROG_LEN = roundSvg(2 * Math.PI * R_PROG)
const STEP = 360 / PROBLEMS.length
const CYCLE = 5.2
const WIRE_ANGLES = [200, 180, 160]
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]

const polar = (r: number, deg: number) => {
	const a = (deg * Math.PI) / 180
	return {
		x: roundSvg(C + r * Math.cos(a)),
		y: roundSvg(C + r * Math.sin(a)),
	}
}

/** rounded H -> V -> H connector, so wires read like a circuit board */
function elbow(
	x0: number,
	y0: number,
	x1: number,
	y1: number,
	split: number,
): string {
	const dx = x1 - x0
	const dy = y1 - y0
	const mx = x0 + dx * split
	const dirX = Math.sign(dx) || 1
	const dirY = Math.sign(dy) || 1
	const r = Math.min(16, Math.abs(dy) / 2, Math.abs(mx - x0), Math.abs(x1 - mx))
	if (!Number.isFinite(r) || r < 1) {
		return `M ${x0.toFixed(1)} ${y0.toFixed(1)} L ${x1.toFixed(1)} ${y1.toFixed(1)}`
	}
	return (
		`M ${x0.toFixed(1)} ${y0.toFixed(1)}` +
		` H ${(mx - dirX * r).toFixed(1)}` +
		` Q ${mx.toFixed(1)} ${y0.toFixed(1)} ${mx.toFixed(1)} ${(y0 + dirY * r).toFixed(1)}` +
		` V ${(y1 - dirY * r).toFixed(1)}` +
		` Q ${mx.toFixed(1)} ${y1.toFixed(1)} ${(mx + dirX * r).toFixed(1)} ${y1.toFixed(1)}` +
		` H ${x1.toFixed(1)}`
	)
}

/* ------------------------------------------------------------------ *
 * icons
 * ------------------------------------------------------------------ */

const ICON_PATHS: Record<IconKey, ReactNode> = {
	agent: (
		<>
			<path d="M12 3.5v3M12 17.5v3M3.5 12h3M17.5 12h3" />
			<path d="m6.2 6.2 2.1 2.1M15.7 15.7l2.1 2.1M17.8 6.2l-2.1 2.1M8.3 15.7l-2.1 2.1" />
			<circle cx="12" cy="12" r="3.35" />
			<circle cx="12" cy="12" r="1.05" fill="currentColor" stroke="none" />
		</>
	),
	cloud: (
		<>
			<path d="M7.2 18h9.3a3.5 3.5 0 0 0 .2-7 5.2 5.2 0 0 0-9.9-.7A3.8 3.8 0 0 0 7.2 18Z" />
			<path d="M9.2 14.2h5.6M12 11.5v5.2" />
		</>
	),
	mobile: (
		<>
			<rect x="7.2" y="2.8" width="9.6" height="18.4" rx="2.35" />
			<path d="M10.2 5.8h3.6M10.1 17.8h3.8" />
			<circle cx="12" cy="19.1" r=".45" fill="currentColor" stroke="none" />
		</>
	),
	erp: (
		<>
			<rect x="3.6" y="4" width="6.4" height="6.1" rx="1.45" />
			<rect x="14" y="4" width="6.4" height="6.1" rx="1.45" />
			<rect x="3.6" y="13.9" width="6.4" height="6.1" rx="1.45" />
			<rect x="14" y="13.9" width="6.4" height="6.1" rx="1.45" />
			<path d="M10 7.05h4M6.8 10.1v3.8M17.2 10.1v3.8M10 16.95h4" />
		</>
	),
	seo: (
		<>
			<circle cx="10.6" cy="10.6" r="5.8" />
			<path d="m15 15 4.4 4.4M8.1 12.8V10M10.6 12.8V8.4M13.1 12.8v-1.9" />
		</>
	),
	web: (
		<>
			<rect x="3" y="4.2" width="18" height="15.6" rx="2.35" />
			<path d="M3 8.6h18M6 6.4h.01M8.5 6.4h.01M11 6.4h.01" />
			<path d="M7 12.2h4.2M7 15.3h7.8" />
		</>
	),
}

function ServiceIcon({ name, size = 18 }: { name: IconKey; size?: number }) {
	return (
		<svg
			viewBox="0 0 24 24"
			width={size}
			height={size}
			fill="none"
			stroke="currentColor"
			strokeWidth={1.6}
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			{ICON_PATHS[name]}
		</svg>
	)
}

function ArrowIcon({ size = 14 }: { size?: number }) {
	return (
		<svg
			viewBox="0 0 16 16"
			width={size}
			height={size}
			fill="none"
			stroke="currentColor"
			strokeWidth={1.7}
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			<path d="M2.8 8h10.4" />
			<path d="m9.4 4.2 3.8 3.8-3.8 3.8" />
		</svg>
	)
}

function CloseIcon() {
	return (
		<svg
			viewBox="0 0 16 16"
			width={15}
			height={15}
			fill="none"
			stroke="currentColor"
			strokeWidth={1.8}
			strokeLinecap="round"
			aria-hidden="true"
		>
			<path d="m4 4 8 8M12 4l-8 8" />
		</svg>
	)
}

function SparkIcon() {
	return (
		<svg
			viewBox="0 0 24 24"
			width={19}
			height={19}
			fill="none"
			stroke="currentColor"
			strokeWidth={1.6}
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			<path d="M12 3.5l1.9 4.7 4.7 1.8-4.7 1.9L12 16.6l-1.9-4.7L5.4 10l4.7-1.8z" />
			<path d="M18.5 16.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z" />
		</svg>
	)
}

/* ------------------------------------------------------------------ *
 * small pieces
 * ------------------------------------------------------------------ */

function Counter({
	value,
	play,
	duration = 1.4,
}: {
	value: string
	play: boolean
	duration?: number
}) {
	const [display, setDisplay] = useState(value)

	useEffect(() => {
		const match = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/)
		if (!play || !match) {
			setDisplay(value)
			return
		}
		const [, prefix, digits, suffix] = match
		const target = Number.parseFloat(digits)
		const decimals = digits.includes(".") ? digits.split(".")[1].length : 0
		const controls = animate(0, target, {
			duration,
			ease: EASE_OUT,
			onUpdate: (v) => setDisplay(`${prefix}${v.toFixed(decimals)}${suffix}`),
		})
		return () => controls.stop()
	}, [value, play, duration])

	return <>{display}</>
}

/* ------------------------------------------------------------------ *
 * dialog — geometry, helpers, sub-diagrams
 * ------------------------------------------------------------------ */

const DIALOG_STEPS = [
	{ id: "snapshot", label: "Snapshot" },
	{ id: "diagnosis", label: "Diagnosis" },
	{ id: "journey", label: "Journey" },
	{ id: "impact", label: "Impact" },
] as const

type DialogStepId = (typeof DIALOG_STEPS)[number]["id"]

const PIPE_STATES = ["Today", "What we build", "What you get"]

/* dial geometry (rail signature diagram) */
const DIAL_VIEW = 200
const DIAL_C = 100
const DIAL_R = 74
const DIAL_LEN = roundSvg(2 * Math.PI * DIAL_R)
const DIAL_TICKS = 48
const DIAL_TICK_IN = 86
const DIAL_TICK_OUT = 94

/* chart geometry */
const CH_W = 640
const CH_H = 208
const CH_PAD_X = 30
const CH_PAD_T = 30
const CH_PAD_B = 36

/** cardinal spline through the points, so the trend reads as a curve */
function smoothPath(pts: { x: number; y: number }[], tension = 0.2): string {
	if (pts.length === 0) return ""
	if (pts.length === 1) return `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`
	let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`
	for (let i = 0; i < pts.length - 1; i += 1) {
		const p0 = pts[i - 1] ?? pts[i]
		const p1 = pts[i]
		const p2 = pts[i + 1]
		const p3 = pts[i + 2] ?? p2
		const c1x = p1.x + (p2.x - p0.x) * tension
		const c1y = p1.y + (p2.y - p0.y) * tension
		const c2x = p2.x - (p3.x - p1.x) * tension
		const c2y = p2.y - (p3.y - p1.y) * tension
		d +=
			` C ${c1x.toFixed(1)} ${c1y.toFixed(1)},` +
			` ${c2x.toFixed(1)} ${c2y.toFixed(1)},` +
			` ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`
	}
	return d
}

/* ---- rail signature: ticked progress dial ---- */

function SignatureDial({
	value,
	fill,
}: {
	value: string
	fill: number
}) {
	const clamped = Math.max(0, Math.min(100, fill))
	return (
		<div className={styles.dial}>
			<svg
				className={styles.dialSvg}
				viewBox={`0 0 ${DIAL_VIEW} ${DIAL_VIEW}`}
				aria-hidden="true"
			>
				<g data-dial-ticks>
					{Array.from({ length: DIAL_TICKS }, (_, i) => {
						const deg = (360 / DIAL_TICKS) * i
						const rad = (deg * Math.PI) / 180
						const major = i % 6 === 0
						const out = major ? DIAL_TICK_OUT + 4 : DIAL_TICK_OUT
						const x1 = roundSvg(DIAL_C + DIAL_TICK_IN * Math.cos(rad))
						const y1 = roundSvg(DIAL_C + DIAL_TICK_IN * Math.sin(rad))
						const x2 = roundSvg(DIAL_C + out * Math.cos(rad))
						const y2 = roundSvg(DIAL_C + out * Math.sin(rad))
						return (
							<line
								key={`dial-tick-${i}`}
								className={`${styles.dialTick} ${major ? styles.dialTickMajor : ""}`}
								x1={x1}
								y1={y1}
								x2={x2}
								y2={y2}
							/>
						)
					})}
				</g>
				<circle className={styles.dialTrack} cx={DIAL_C} cy={DIAL_C} r={DIAL_R} />
				<circle
					className={styles.dialArc}
					data-dial-arc={clamped}
					cx={DIAL_C}
					cy={DIAL_C}
					r={DIAL_R}
					transform={`rotate(-90 ${DIAL_C} ${DIAL_C})`}
					strokeDasharray={DIAL_LEN}
					strokeDashoffset={DIAL_LEN * (1 - clamped / 100)}
				/>
				<circle className={styles.dialCore} cx={DIAL_C} cy={DIAL_C} r={54} />
			</svg>
			<span className={styles.dialInner}>
				<span className={styles.dialValue} data-count={value}>
					{value}
				</span>
			</span>
		</div>
	)
}

/* ---- journey diagram: today → build → outcome ---- */

function JourneyDiagram({ flow }: { flow: [string, string, string] }) {
	return (
		<div className={styles.pipe} role="list">
			{flow.map((step, index) => (
				<Fragment key={step}>
					<div
						role="listitem"
						data-pipe-node
						className={`${styles.pipeNode} ${
							index === flow.length - 1 ? styles.pipeNodeActive : ""
						}`}
					>
						<span className={styles.pipeState}>{PIPE_STATES[index]}</span>
						<span className={styles.pipeLabel}>{step}</span>
						<span className={styles.pipeIndex}>
							{String(index + 1).padStart(2, "0")}
						</span>
					</div>
					{index < flow.length - 1 ? (
						<span className={styles.pipeLink} aria-hidden="true">
							<svg
								className={styles.pipeLinkSvg}
								viewBox="0 0 120 12"
								preserveAspectRatio="none"
							>
								<path className={styles.pipeTrack} d="M 1 6 H 119" />
								<path className={styles.pipeFlow} data-pipe-flow d="M 1 6 H 119" />
							</svg>
							<span className={styles.pipePacket} data-pipe-packet />
						</span>
					) : null}
				</Fragment>
			))}
		</div>
	)
}

/* ---- impact chart: gradient area + drawn curve ---- */

function ImpactChart({
	points,
	labels,
	caption,
}: {
	points: number[]
	labels: string[]
	caption: string
}) {
	const uid = useId().replace(/[^a-zA-Z0-9-]/g, "")
	const max = Math.max(...points)
	const min = Math.min(...points)
	const span = Math.max(1, max - min)
	const plotH = CH_H - CH_PAD_T - CH_PAD_B
	const baseline = CH_H - CH_PAD_B

	const coords = points.map((p, i) => ({
		x: CH_PAD_X + (i * (CH_W - CH_PAD_X * 2)) / Math.max(1, points.length - 1),
		y: CH_PAD_T + (1 - (p - min) / span) * plotH,
		v: p,
	}))
	const line = smoothPath(coords)
	const last = coords[coords.length - 1]
	const first = coords[0]
	const area = `${line} L ${last.x.toFixed(1)} ${baseline} L ${first.x.toFixed(1)} ${baseline} Z`

	return (
		<figure className={styles.chart}>
			<figcaption className={styles.chartHead}>
				<span className={styles.chartRange}>
					<b>{points[0]}</b>
					<ArrowIcon size={13} />
					<b className={styles.chartRangeEnd}>{points[points.length - 1]}</b>
				</span>
				<span className={styles.chartScale}>index · {labels[0]}–{labels[labels.length - 1]}</span>
			</figcaption>

			<svg
				className={styles.chartSvg}
				viewBox={`0 0 ${CH_W} ${CH_H}`}
				role="img"
				aria-label={caption}
			>
				<defs>
					<linearGradient id={`fill-${uid}`} x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stopColor="var(--pws-accent)" stopOpacity="0.26" />
						<stop offset="100%" stopColor="var(--pws-accent)" stopOpacity="0" />
					</linearGradient>
					<linearGradient id={`stroke-${uid}`} x1="0" y1="0" x2="1" y2="0">
						<stop offset="0%" stopColor="var(--pws-accent-deep)" />
						<stop offset="100%" stopColor="var(--pws-accent)" />
					</linearGradient>
					<clipPath id={`clip-${uid}`}>
						<rect data-chart-clip x="0" y="0" width={CH_W} height={CH_H} />
					</clipPath>
				</defs>

				{[0, 1, 2, 3].map((i) => {
					const y = CH_PAD_T + (i * plotH) / 3
					return (
						<line
							key={`grid-${i}`}
							className={`${styles.chartGrid} ${i === 3 ? styles.chartAxis : ""}`}
							x1={CH_PAD_X - 8}
							x2={CH_W - CH_PAD_X + 8}
							y1={y}
							y2={y}
						/>
					)
				})}

				<g clipPath={`url(#clip-${uid})`}>
					<path className={styles.chartArea} d={area} fill={`url(#fill-${uid})`} />
					<path
						className={styles.chartLine}
						d={line}
						stroke={`url(#stroke-${uid})`}
					/>
				</g>

				<line
					className={styles.chartMarker}
					data-chart-marker
					x1={last.x}
					x2={last.x}
					y1={last.y}
					y2={baseline}
				/>

				{coords.map((c, i) => (
					<circle
						key={`dot-${i}`}
						data-chart-dot
						className={`${styles.chartDot} ${
							i === coords.length - 1 ? styles.chartDotLast : ""
						}`}
						cx={c.x}
						cy={c.y}
						r={i === coords.length - 1 ? 5 : 3.6}
					/>
				))}

				{coords.map((c, i) => (
					<text
						key={`label-${i}`}
						className={styles.chartLabel}
						x={c.x}
						y={CH_H - 12}
						textAnchor="middle"
					>
						{labels[i]}
					</text>
				))}
			</svg>

			<p className={styles.chartCaption}>{caption}</p>
		</figure>
	)
}

/* ------------------------------------------------------------------ *
 * dialog
 * ------------------------------------------------------------------ */

function ProblemDialog({
	problem,
	index,
	total,
	onClose,
	onSelect,
}: {
	problem: Problem
	index: number
	total: number
	onClose: () => void
	onSelect: (next: number) => void
}) {
	const titleId = useId()
	const reduced = useReducedMotion()

	const overlayRef = useRef<HTMLDivElement | null>(null)
	const scrimRef = useRef<HTMLDivElement | null>(null)
	const dialogRef = useRef<HTMLDivElement | null>(null)
	const scrollRef = useRef<HTMLDivElement | null>(null)
	const contentRef = useRef<HTMLDivElement | null>(null)
	const progressRef = useRef<HTMLSpanElement | null>(null)
	const closeRef = useRef<HTMLButtonElement | null>(null)
	const pressTargetRef = useRef<EventTarget | null>(null)
	const closingRef = useRef(false)

	const [step, setStep] = useState<DialogStepId>("snapshot")

	/* ---- animated close, then unmount ---- */
	const requestClose = useCallback(() => {
		if (closingRef.current) return
		closingRef.current = true
		if (reduced || !dialogRef.current) {
			onClose()
			return
		}
		gsap
			.timeline({ onComplete: onClose })
			.to(dialogRef.current, {
				opacity: 0,
				y: 20,
				scale: 0.975,
				duration: 0.3,
				ease: "power2.in",
			})
			.to(scrimRef.current, { opacity: 0, duration: 0.28 }, 0.04)
	}, [onClose, reduced])

	/* ---- scroll lock that survives iOS + smooth-scroll wrappers ---- */
	useEffect(() => {
		const doc = document.documentElement
		const body = document.body
		const offsetY = window.scrollY || doc.scrollTop || 0
		const barWidth = window.innerWidth - doc.clientWidth
		const previous = {
			position: body.style.position,
			top: body.style.top,
			left: body.style.left,
			right: body.style.right,
			width: body.style.width,
			overflow: body.style.overflow,
			paddingRight: body.style.paddingRight,
			scrollBehavior: doc.style.scrollBehavior,
		}

		doc.style.scrollBehavior = "auto"
		body.style.position = "fixed"
		body.style.top = `-${offsetY}px`
		body.style.left = "0"
		body.style.right = "0"
		body.style.width = "100%"
		body.style.overflow = "hidden"
		if (barWidth > 0) body.style.paddingRight = `${barWidth}px`

		return () => {
			body.style.position = previous.position
			body.style.top = previous.top
			body.style.left = previous.left
			body.style.right = previous.right
			body.style.width = previous.width
			body.style.overflow = previous.overflow
			body.style.paddingRight = previous.paddingRight
			window.scrollTo(0, offsetY)
			doc.style.scrollBehavior = previous.scrollBehavior
		}
	}, [])

	/* ---- focus trap + keyboard ---- */
	useEffect(() => {
		const previouslyFocused = document.activeElement as HTMLElement | null
		const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 60)

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				event.stopPropagation()
				event.preventDefault()
				requestClose()
				return
			}
			if (event.key === "ArrowRight" && total > 1) {
				event.preventDefault()
				onSelect((index + 1) % total)
				return
			}
			if (event.key === "ArrowLeft" && total > 1) {
				event.preventDefault()
				onSelect((index - 1 + total) % total)
				return
			}
			if (event.key !== "Tab" || !dialogRef.current) return
			const focusable = Array.from(
				dialogRef.current.querySelectorAll<HTMLElement>(
					'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
				),
			).filter((element) => !element.hasAttribute("disabled"))
			if (focusable.length === 0) return
			const first = focusable[0]
			const last = focusable[focusable.length - 1]
			if (event.shiftKey && document.activeElement === first) {
				event.preventDefault()
				last.focus()
			} else if (!event.shiftKey && document.activeElement === last) {
				event.preventDefault()
				first.focus()
			}
		}

		window.addEventListener("keydown", onKeyDown)
		return () => {
			window.clearTimeout(focusTimer)
			window.removeEventListener("keydown", onKeyDown)
			previouslyFocused?.focus?.()
		}
	}, [requestClose, onSelect, index, total])

	/* ---- entrance (runs once per open) ---- */
	useLayoutEffect(() => {
		const dialog = dialogRef.current
		const scrim = scrimRef.current
		if (!dialog || !scrim) return
		if (reduced) {
			gsap.set([scrim, dialog], { opacity: 1, clearProps: "transform,filter" })
			return
		}

		const ctx = gsap.context(() => {
			gsap
				.timeline()
				.fromTo(scrim, { opacity: 0 }, { opacity: 1, duration: 0.42, ease: "power2.out" })
				.fromTo(
					dialog,
					{ opacity: 0, y: 40, scale: 0.955 },
					{ opacity: 1, y: 0, scale: 1, duration: 0.78, ease: "expo.out" },
					0.04,
				)
		})
		return () => ctx.revert()
	}, [reduced])

	/* ---- content choreography, re-runs when the problem changes ---- */
	useLayoutEffect(() => {
		const root = dialogRef.current
		const scroller = scrollRef.current
		const content = contentRef.current
		if (!root || !scroller || !content) return

		scroller.scrollTop = 0
		setStep("snapshot")

		const counters = gsap.utils.toArray<HTMLElement>("[data-count]", root)
		const runCounter = (el: HTMLElement, delay: number) => {
			const raw = el.dataset.count ?? el.textContent ?? ""
			const match = raw.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/)
			if (!match) return null
			const [, prefix, digits, suffix] = match
			const target = Number.parseFloat(digits)
			const decimals = digits.includes(".") ? digits.split(".")[1].length : 0
			const proxy = { v: 0 }
			el.textContent = `${prefix}${(0).toFixed(decimals)}${suffix}`
			return gsap.to(proxy, {
				v: target,
				duration: 1.15,
				delay,
				ease: "power2.out",
				onUpdate: () => {
					el.textContent = `${prefix}${proxy.v.toFixed(decimals)}${suffix}`
				},
			})
		}

		if (reduced) {
			counters.forEach((el) => {
				el.textContent = el.dataset.count ?? el.textContent
			})
			return
		}

		const ctx = gsap.context(() => {
			const pick = <T extends Element>(selector: string) =>
				gsap.utils.toArray<T>(selector, root)
			const st = (trigger: Element, start = "top 88%") => ({
				scroller,
				trigger,
				start,
				once: true,
			})

			/* header + rail intro */
			gsap
				.timeline({ defaults: { ease: "power3.out" } })
				.fromTo(
					pick("[data-intro]"),
					{ opacity: 0, y: 18 },
					{ opacity: 1, y: 0, duration: 0.62, stagger: 0.06 },
					0.08,
				)
				.fromTo(
					pick("[data-jump]"),
					{ opacity: 0, y: 10 },
					{ opacity: 1, y: 0, duration: 0.4, stagger: 0.04 },
					0.3,
				)

			/* dial: ticks bloom, arc sweeps */
			gsap.fromTo(
				pick("[data-dial-ticks] line"),
				{ opacity: 0 },
				{ opacity: 1, duration: 0.5, stagger: { each: 0.012, from: "start" }, delay: 0.2 },
			)
			pick<SVGCircleElement>("[data-dial-arc]").forEach((arc) => {
				const pct = Number(arc.dataset.dialArc ?? 0)
				gsap.fromTo(
					arc,
					{ strokeDashoffset: DIAL_LEN },
					{
						strokeDashoffset: DIAL_LEN * (1 - pct / 100),
						duration: 1.5,
						ease: "power3.inOut",
						delay: 0.24,
					},
				)
			})

			/* section reveals, driven by the modal's own scroller */
			pick<HTMLElement>("[data-reveal]").forEach((block, i) => {
				gsap.fromTo(
					block,
					{ opacity: 0, y: 26 },
					{
						opacity: 1,
						y: 0,
						duration: 0.66,
						ease: "power3.out",
						delay: i === 0 ? 0.16 : 0,
						scrollTrigger: st(block, "top 92%"),
					},
				)
				const rows = gsap.utils.toArray<HTMLElement>("[data-stagger]", block)
				if (rows.length) {
					gsap.fromTo(
						rows,
						{ opacity: 0, y: 14 },
						{
							opacity: 1,
							y: 0,
							duration: 0.5,
							ease: "power2.out",
							stagger: 0.07,
							delay: i === 0 ? 0.26 : 0.08,
							scrollTrigger: st(block, "top 90%"),
						},
					)
				}
			})

			/* metric bars */
			pick<HTMLElement>("[data-bar]").forEach((bar) => {
				const pct = Number(bar.dataset.bar ?? 0)
				gsap.fromTo(
					bar,
					{ scaleX: 0 },
					{
						scaleX: Math.max(0, Math.min(100, pct)) / 100,
						transformOrigin: "0% 50%",
						duration: 1.05,
						ease: "power3.out",
						delay: 0.2,
						scrollTrigger: st(bar, "top 96%"),
					},
				)
			})

			/* counters */
			counters.forEach((el) => {
				const tween = runCounter(el, 0)
				if (!tween) return
				tween.pause()
				ScrollTrigger.create({
					scroller,
					trigger: el,
					start: "top 96%",
					once: true,
					onEnter: () => tween.play(),
				})
			})

			/* journey diagram */
			const nodes = pick<HTMLElement>("[data-pipe-node]")
			if (nodes.length) {
				gsap.fromTo(
					nodes,
					{ opacity: 0, y: 18, scale: 0.94 },
					{
						opacity: 1,
						y: 0,
						scale: 1,
						duration: 0.6,
						ease: "back.out(1.7)",
						stagger: 0.12,
						scrollTrigger: st(nodes[0], "top 92%"),
					},
				)
			}
			const flows = pick<SVGPathElement>("[data-pipe-flow]")
			if (flows.length) {
				gsap.to(flows, {
					strokeDashoffset: -28,
					duration: 1.1,
					ease: "none",
					repeat: -1,
				})
			}
			pick<HTMLElement>("[data-pipe-packet]").forEach((packet, i) => {
				gsap
					.timeline({ repeat: -1, delay: i * 0.55 })
					.fromTo(
						packet,
						{ left: "0%", opacity: 0 },
						{ opacity: 1, duration: 0.24, ease: "power1.out" },
					)
					.to(packet, { left: "100%", duration: 1.7, ease: "none" }, 0)
					.to(packet, { opacity: 0, duration: 0.3 }, 1.4)
			})

			/* chart draw */
			const charts = pick<HTMLElement>("[data-chart]")
			charts.forEach((chart) => {
				const clip = chart.querySelector<SVGRectElement>("[data-chart-clip]")
				const dots = gsap.utils.toArray<SVGCircleElement>("[data-chart-dot]", chart)
				const marker = chart.querySelector<SVGLineElement>("[data-chart-marker]")
				const tl = gsap.timeline({
					paused: true,
					defaults: { ease: "power3.out" },
				})
				if (clip) {
					tl.fromTo(
						clip,
						{ attr: { width: 0 } },
						{ attr: { width: CH_W }, duration: 1.35, ease: "power2.inOut" },
						0,
					)
				}
				if (dots.length) {
					tl.fromTo(
						dots,
						{ scale: 0, transformOrigin: "50% 50%" },
						{ scale: 1, duration: 0.42, ease: "back.out(2.6)", stagger: 0.11 },
						0.25,
					)
				}
				if (marker) {
					tl.fromTo(marker, { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0.95)
				}
				ScrollTrigger.create({
					scroller,
					trigger: chart,
					start: "top 90%",
					once: true,
					onEnter: () => tl.play(),
				})
			})

			/* read-progress bar */
			const bar = progressRef.current
			if (bar && scroller.scrollHeight - scroller.clientHeight > 16) {
				gsap.fromTo(
					bar,
					{ scaleX: 0 },
					{
						scaleX: 1,
						ease: "none",
						transformOrigin: "0% 50%",
						scrollTrigger: {
							scroller,
							trigger: content,
							start: "top top",
							end: "bottom bottom",
							scrub: 0.35,
						},
					},
				)
			}

			/* scroll spy for the jump rail */
			DIALOG_STEPS.forEach(({ id }) => {
				const target = content.querySelector<HTMLElement>(`[data-step="${id}"]`)
				if (!target) return
				ScrollTrigger.create({
					scroller,
					trigger: target,
					start: "top 42%",
					end: "bottom 42%",
					onToggle: (self) => {
						if (self.isActive) setStep(id)
					},
				})
			})

			/*
			 * the open animation scales the dialog, so measurements taken
			 * during it are slightly off — re-measure only our own triggers
			 * once the entrance has settled.
			 */
			gsap.delayedCall(0.95, () => {
				ScrollTrigger.getAll().forEach((instance) => {
					if (instance.scroller === scroller) instance.refresh()
				})
			})
		}, root)

		return () => ctx.revert()
	}, [problem.id, reduced])

	const goToStep = useCallback((id: DialogStepId) => {
		const scroller = scrollRef.current
		const content = contentRef.current
		if (!scroller || !content) return
		const target = content.querySelector<HTMLElement>(`[data-step="${id}"]`)
		if (!target) return
		const top =
			target.getBoundingClientRect().top -
			scroller.getBoundingClientRect().top +
			scroller.scrollTop -
			14
		scroller.scrollTo({ top, behavior: "smooth" })
		setStep(id)
	}, [])

	const headline = problem.metrics[0]

	if (typeof document === "undefined") return null

	return createPortal(
		<div
			className={styles.overlay}
			ref={overlayRef}
			onPointerDown={(event) => {
				pressTargetRef.current = event.target
			}}
			onClick={(event) => {
				if (
					event.target === event.currentTarget &&
					pressTargetRef.current === event.currentTarget
				) {
					requestClose()
				}
			}}
		>
			<div className={styles.scrim} ref={scrimRef} aria-hidden="true" />

			<div
				ref={dialogRef}
				className={styles.dialog}
				role="dialog"
				aria-modal="true"
				aria-labelledby={titleId}
			>
				<div className={styles.dialogTop}>
					<span className={styles.topTag} data-intro>
						<span className={styles.topDot} />
						{problem.serviceFull}
					</span>

					<div className={styles.topActions}>
						<span className={styles.topCount} data-intro>
							{String(index + 1).padStart(2, "0")}
							<i>/{String(total).padStart(2, "0")}</i>
						</span>
						<span className={styles.topNav}>
							<button
								type="button"
								className={`${styles.navBtn} ${styles.navPrev}`}
								onClick={() => onSelect((index - 1 + total) % total)}
								aria-label="Previous problem"
							>
								<ArrowIcon size={13} />
							</button>
							<button
								type="button"
								className={styles.navBtn}
								onClick={() => onSelect((index + 1) % total)}
								aria-label="Next problem"
							>
								<ArrowIcon size={13} />
							</button>
						</span>
						<button
							ref={closeRef}
							type="button"
							className={styles.close}
							onClick={requestClose}
							aria-label="Close details"
						>
							<CloseIcon />
						</button>
					</div>

					<span className={styles.dialogProgress} aria-hidden="true">
						<span className={styles.dialogProgressBar} ref={progressRef} />
					</span>
				</div>

				<div
					className={styles.dialogScroll}
					ref={scrollRef}
					data-lenis-prevent
					tabIndex={-1}
				>
					<div className={styles.dialogGrid} ref={contentRef}>
						<aside className={styles.rail}>
							<div className={styles.railSticky}>
								<h3 className={styles.railTitle} id={titleId} data-intro>
									{problem.title}
								</h3>
								<p className={styles.railLead} data-intro>
									{problem.lead}
								</p>

								<div className={styles.railDial} data-intro>
									<SignatureDial
										value={headline.value}
										fill={headline.fill}
									/>
									<p className={styles.railDialLabel}>{headline.label}</p>
								</div>

								<nav className={styles.jump} aria-label="Sections">
									{DIALOG_STEPS.map(({ id, label }) => (
										<button
											key={id}
											type="button"
											data-jump
											className={`${styles.jumpBtn} ${
												step === id ? styles.jumpBtnActive : ""
											}`}
											onClick={() => goToStep(id)}
											aria-current={step === id}
										>
											<span className={styles.jumpRule} />
											{label}
										</button>
									))}
								</nav>
							</div>
						</aside>

						<div className={styles.body}>
							<section className={styles.block} data-step="snapshot" data-reveal>
								<p className={styles.blockTitle}>What the data shows</p>
								<div className={styles.metrics}>
									{problem.metrics.map((metric, i) => (
										<div className={styles.metric} key={metric.label} data-stagger>
											<span className={styles.metricRank}>
												{String(i + 1).padStart(2, "0")}
											</span>
											<span className={styles.metricValue} data-count={metric.value}>
												{metric.value}
											</span>
											<span className={styles.metricLabel}>{metric.label}</span>
											<span className={styles.metricBar}>
												<span
													className={styles.metricBarFill}
													data-bar={metric.fill}
													style={{
														transform: `scaleX(${
															Math.max(0, Math.min(100, metric.fill)) / 100
														})`,
													}}
												/>
											</span>
										</div>
									))}
								</div>
							</section>

							<section className={styles.block} data-step="diagnosis" data-reveal>
								<div className={styles.columns}>
									<div className={styles.column}>
										<p className={styles.blockTitle}>Signals we hear</p>
										<ul className={styles.list}>
											{problem.signals.map((signal) => (
												<li className={styles.listItem} key={signal} data-stagger>
													<span className={styles.bullet} />
													<span>{signal}</span>
												</li>
											))}
										</ul>
									</div>

									<div className={styles.column}>
										<p className={styles.blockTitle}>How we solve it</p>
										<ol className={styles.steps}>
											{problem.response.map((item, i) => (
												<li className={styles.step} key={item} data-stagger>
													<span className={styles.stepIndex}>
														{String(i + 1).padStart(2, "0")}
													</span>
													<span className={styles.stepText}>{item}</span>
												</li>
											))}
										</ol>
									</div>
								</div>
							</section>

							<section className={styles.block} data-step="journey" data-reveal>
								<p className={styles.blockTitle}>The journey we run</p>
								<JourneyDiagram flow={problem.flow} />
							</section>

							<section className={styles.block} data-step="impact" data-reveal>
								<p className={styles.blockTitle}>Measured impact</p>
								<div data-chart>
									<ImpactChart
										points={problem.trend.points}
										labels={problem.trend.labels}
										caption={problem.trend.caption}
									/>
								</div>

								<div className={styles.outcome}>
									<span className={styles.outcomeIcon}>
										<SparkIcon />
									</span>
									<div>
										<span className={styles.outcomeTag}>Outcome</span>
										<p className={styles.outcomeText}>{problem.outcome}</p>
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

/* ------------------------------------------------------------------ *
 * section
 * ------------------------------------------------------------------ */

export default function ProblemsWeSolve() {
	const reduced = useReducedMotion()

	const sectionRef = useRef<HTMLElement | null>(null)
	const stageRef = useRef<HTMLDivElement | null>(null)
	const hubRef = useRef<HTMLDivElement | null>(null)
	const hubSvgRef = useRef<SVGSVGElement | null>(null)
	const layerRef = useRef<SVGSVGElement | null>(null)
	const coreCardRef = useRef<HTMLButtonElement | null>(null)
	const tickGroupRef = useRef<SVGGElement | null>(null)
	const orbitRingRef = useRef<SVGCircleElement | null>(null)
	const cometRef = useRef<SVGGElement | null>(null)
	const anchorPulseRef = useRef<SVGCircleElement | null>(null)
	const progressRef = useRef<SVGCircleElement | null>(null)
	const nodeRefs = useRef<Array<SVGGElement | null>>([])
	const cardRefs = useRef<Array<HTMLButtonElement | null>>([])
	const railRefs = useRef<Array<HTMLSpanElement | null>>([])
	const wirePathRefs = useRef<Array<SVGPathElement | null>>([])
	const wireCapRefs = useRef<Array<SVGCircleElement | null>>([])
	const livePathRef = useRef<SVGPathElement | null>(null)
	const flowPathRef = useRef<SVGPathElement | null>(null)
	const liveCapRef = useRef<SVGCircleElement | null>(null)
	const cycleRef = useRef<gsap.core.Tween | null>(null)
	const ambientTweensRef = useRef<gsap.core.Tween[]>([])
	const flowTweenRef = useRef<gsap.core.Tween | null>(null)
	const angleRef = useRef(0)

	const [active, setActive] = useState(0)
	const [openIndex, setOpenIndex] = useState<number | null>(null)
	const [held, setHeld] = useState(false)
	const [wired, setWired] = useState(false)

	const inView = useInView(sectionRef, { amount: 0.28 })
	const paused = !inView || held || openIndex !== null || Boolean(reduced)

	/* ---- website heading fill: faded -> dark on scroll ---- */
	useLayoutEffect(() => {
		const root = sectionRef.current
		if (!root) return

		const heading = root.querySelector<HTMLElement>("[data-heading-fill]")
		if (!heading) return

		if (reduced) {
			gsap.set(heading, { backgroundSize: "100% 100%, 100% 100%" })
			return
		}

		const ctx = gsap.context(() => {
			gsap.fromTo(
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
		}, root)

		return () => ctx.revert()
	}, [reduced])

	/* ---- orbit node placement ---- */
	const layoutNodes = useCallback((base: number) => {
		nodeRefs.current.forEach((node, index) => {
			if (!node) return
			const point = polar(R_ORBIT, base - index * STEP)
			gsap.set(node, { x: point.x, y: point.y })
		})
	}, [])

	/* ---- clockwise 360-degree snap to the active service ---- */
	useEffect(() => {
		const current = angleRef.current
		const delta = (((active * STEP - current) % 360) + 360) % 360
		const target = current + delta

		if (reduced || delta === 0) {
			angleRef.current = target
			layoutNodes(target)
			return
		}

		const proxy = { value: current }
		const tween = gsap.to(proxy, {
			value: target,
			duration: 1.15,
			ease: "power3.inOut",
			onUpdate: () => {
				angleRef.current = proxy.value
				layoutNodes(proxy.value)
			},
		})
		return () => {
			tween.kill()
		}
	}, [active, reduced, layoutNodes])

	/* ---- continuous rotation + scroll entrance ---- */
	useEffect(() => {
		const root = sectionRef.current
		if (!root) return
		layoutNodes(angleRef.current)
		if (reduced) return

		const ambient: gsap.core.Tween[] = []

		const ctx = gsap.context(() => {
			if (tickGroupRef.current) {
				ambient.push(
					gsap.to(tickGroupRef.current, {
						rotation: 360,
						duration: 62,
						ease: "none",
						repeat: -1,
						svgOrigin: `${C} ${C}`,
					}),
				)
			}
			if (orbitRingRef.current) {
				ambient.push(
					gsap.to(orbitRingRef.current, {
						rotation: -360,
						duration: 95,
						ease: "none",
						repeat: -1,
						svgOrigin: `${C} ${C}`,
					}),
				)
			}
			if (cometRef.current) {
				ambient.push(
					gsap.to(cometRef.current, {
						rotation: 360,
						duration: 15,
						ease: "none",
						repeat: -1,
						svgOrigin: `${C} ${C}`,
					}),
				)
			}
			if (anchorPulseRef.current) {
				ambient.push(
					gsap.to(anchorPulseRef.current, {
						scale: 1.16,
						opacity: 0.22,
						duration: 1.5,
						ease: "sine.inOut",
						repeat: -1,
						yoyo: true,
						svgOrigin: `${C + R_ORBIT} ${C}`,
					}),
				)
			}

			ambientTweensRef.current = ambient

			const timeline = gsap.timeline({
				scrollTrigger: { trigger: root, start: "top 78%", once: true },
			})
			if (hubSvgRef.current) {
				timeline.from(
					hubSvgRef.current,
					{ opacity: 0, scale: 0.92, duration: 1.1, ease: "power3.out", svgOrigin: `${C} ${C}` },
					0,
				)
			}
			timeline.from(
				`.${styles.tick}`,
				{ opacity: 0, duration: 0.5, stagger: { each: 0.006, from: "random" } },
				0.1,
			)
			if (coreCardRef.current) {
				timeline.from(
					coreCardRef.current,
					{ opacity: 0, scale: 0.86, duration: 0.75, ease: "power3.out" },
					0.2,
				)
			}
			const nodes = nodeRefs.current.filter(Boolean) as SVGGElement[]
			if (nodes.length) {
				timeline.from(
					nodes,
					{
						opacity: 0,
						scale: 0.4,
						duration: 0.6,
						ease: "back.out(2)",
						stagger: 0.07,
						transformOrigin: "50% 50%",
					},
					0.3,
				)
			}
		}, root)

		return () => {
			ambientTweensRef.current = []
			ctx.revert()
		}
	}, [reduced, layoutNodes])

	useEffect(() => {
		const shouldPause = !inView || openIndex !== null
		ambientTweensRef.current.forEach((tween) => {
			if (shouldPause) tween.pause()
			else tween.resume()
		})
	}, [inView, openIndex])

	/* ---- progress ring drives the auto-advance ---- */
	useEffect(() => {
		const arc = progressRef.current
		if (!arc) return
		gsap.set(arc, { strokeDasharray: PROG_LEN, strokeDashoffset: PROG_LEN })
		if (reduced) return

		const tween = gsap.to(arc, {
			strokeDashoffset: 0,
			duration: CYCLE,
			ease: "none",
			paused: true,
			onComplete: () => setActive((current) => (current + 1) % PROBLEMS.length),
		})
		cycleRef.current = tween
		return () => {
			tween.kill()
			cycleRef.current = null
		}
	}, [active, reduced])

	useEffect(() => {
		const tween = cycleRef.current
		if (!tween) return
		if (paused) tween.pause()
		else tween.play()
	}, [paused, active])

	/* ---- wire layer (desktop only) ---- */
	useEffect(() => {
		const query = window.matchMedia("(min-width: 1181px)")
		const apply = () => setWired(query.matches)
		apply()
		query.addEventListener("change", apply)
		return () => query.removeEventListener("change", apply)
	}, [])

	const drawWires = useCallback(() => {
		const stage = stageRef.current
		const hub = hubRef.current
		const layer = layerRef.current
		if (!stage || !hub || !layer) return

		const stageRect = stage.getBoundingClientRect()
		const hubRect = hub.getBoundingClientRect()
		if (!stageRect.width || !hubRect.width) return
		layer.setAttribute("viewBox", `0 0 ${stageRect.width} ${stageRect.height}`)

		const scale = hubRect.width / VIEW
		const toStage = (x: number, y: number) => ({
			x: hubRect.left - stageRect.left + x * scale,
			y: hubRect.top - stageRect.top + y * scale,
		})

		WIRE_ANGLES.forEach((angle, index) => {
			const dot = railRefs.current[index]
			const path = wirePathRefs.current[index]
			const cap = wireCapRefs.current[index]
			if (!dot || !path || !cap) return
			const dotRect = dot.getBoundingClientRect()
			const point = polar(R_HAIR + 4, angle)
			const end = toStage(point.x, point.y)
			path.setAttribute(
				"d",
				elbow(
					dotRect.left - stageRect.left + dotRect.width / 2,
					dotRect.top - stageRect.top + dotRect.height / 2,
					end.x,
					end.y,
					0.56,
				),
			)
			cap.setAttribute("cx", end.x.toFixed(1))
			cap.setAttribute("cy", end.y.toFixed(1))
		})

		const card = cardRefs.current[active]
		const live = livePathRef.current
		const flow = flowPathRef.current
		const cap = liveCapRef.current
		if (!card || !live || !flow || !cap) return
		const cardRect = card.getBoundingClientRect()
		const start = toStage(C + R_EXIT, C)
		const endX = cardRect.left - stageRect.left - 7
		const endY = cardRect.top - stageRect.top + Math.min(37, cardRect.height / 2)
		const path = elbow(start.x, start.y, endX, endY, 0.46)
		live.setAttribute("d", path)
		flow.setAttribute("d", path)
		cap.setAttribute("cx", endX.toFixed(1))
		cap.setAttribute("cy", endY.toFixed(1))
	}, [active])

	useEffect(() => {
		if (!wired) return

		let frame = 0
		const scheduleDraw = () => {
			cancelAnimationFrame(frame)
			frame = requestAnimationFrame(drawWires)
		}

		scheduleDraw()

		const observer = new ResizeObserver(scheduleDraw)
		const observed = [
			stageRef.current,
			hubRef.current,
			...cardRefs.current,
			...railRefs.current,
		].filter(Boolean) as Element[]

		observed.forEach((element) => observer.observe(element))
		window.addEventListener("resize", scheduleDraw, { passive: true })

		return () => {
			cancelAnimationFrame(frame)
			observer.disconnect()
			window.removeEventListener("resize", scheduleDraw)
		}
	}, [wired, drawWires])

	useEffect(() => {
		if (!wired || reduced) return
		const flow = flowPathRef.current
		if (!flow) return

		const tween = gsap.fromTo(
			flow,
			{ strokeDashoffset: 0 },
			{ strokeDashoffset: -16, duration: 0.9, ease: "none", repeat: -1 },
		)
		flowTweenRef.current = tween

		return () => {
			tween.kill()
			if (flowTweenRef.current === tween) flowTweenRef.current = null
		}
	}, [wired, reduced])

	useEffect(() => {
		const tween = flowTweenRef.current
		if (!tween) return
		if (!inView || openIndex !== null) tween.pause()
		else tween.resume()
	}, [inView, openIndex, wired])

	const select = useCallback((index: number) => {
		setActive(index)
	}, [])

	const activeProblem = PROBLEMS[active]
	const openProblem = openIndex === null ? null : PROBLEMS[openIndex]

	return (
		<MotionConfig reducedMotion="user">
			<section
				id="problems"
				ref={sectionRef}
				className={styles.section}
				aria-labelledby="problems-we-solve-title"
			>
				<div className={styles.inner}>
					<header className={styles.header}>
						<motion.div
							className={styles.headerText}
							initial={{ opacity: 0, y: 22 }}
							animate={inView ? { opacity: 1, y: 0 } : undefined}
							transition={{ duration: 0.7, ease: EASE_OUT }}
						>
							<p className={styles.eyebrow}>(Problems we solve)</p>
							<h2 className={styles.title} id="problems-we-solve-title" data-heading-fill="">
								We solve the bottlenecks that{" "}
								<span className={styles.titleAccent}>
									slow growth.
								</span>
							</h2>
							<p className={styles.subtitle}>
								JabitSoft turns operational friction, disconnected systems and weak digital journeys
								into scalable software, automation and growth systems.
							</p>
						</motion.div>

					</header>

					<div className={styles.stage} ref={stageRef}>
						{wired ? (
							<svg className={styles.linkLayer} ref={layerRef} aria-hidden="true">
								{WIRE_ANGLES.map((angle, index) => (
									<g key={`wire-${angle}`}>
										<path
											className={styles.link}
											ref={(element) => {
												wirePathRefs.current[index] = element
											}}
										/>
										<circle
											className={styles.linkCap}
											r={2.6}
											opacity={0.55}
											ref={(element) => {
												wireCapRefs.current[index] = element
											}}
										/>
									</g>
								))}
								<path className={styles.linkLive} ref={livePathRef} />
								<path className={styles.linkFlow} ref={flowPathRef} />
								<circle className={styles.linkCap} r={3.2} ref={liveCapRef} />
							</svg>
						) : null}

						<div className={styles.evidence}>
							{EVIDENCE.map((item, index) => (
								<motion.div
									className={styles.stat}
									key={item.source}
									initial={{ opacity: 0, y: 20 }}
									animate={inView ? { opacity: 1, y: 0 } : undefined}
									transition={{ duration: 0.6, delay: 0.1 * index, ease: EASE_OUT }}
								>
									<span
										className={styles.railDot}
										ref={(element) => {
											railRefs.current[index] = element
										}}
									/>
									<div className={styles.statText}>
										<span className={styles.statValue}>
											<Counter value={item.value} play={inView} />
										</span>
										<p className={styles.statCopy}>{item.copy}</p>
										<span className={styles.statSource}>
											<span className={styles.statSourceDot} />
											{item.source}
										</span>
									</div>
								</motion.div>
							))}
						</div>

						<div className={styles.hubCol}>
							<div
								className={styles.hub}
								ref={hubRef}
								onMouseEnter={() => setHeld(true)}
								onMouseLeave={() => setHeld(false)}
							>
								<div className={styles.glow} />

								<svg
									className={styles.hubSvg}
									ref={hubSvgRef}
									viewBox={`0 0 ${VIEW} ${VIEW}`}
									aria-hidden="true"
								>
									<circle className={styles.hairline} cx={C} cy={C} r={R_HAIR} />
									<circle
										className={styles.hairline}
										cx={C}
										cy={C}
										r={R_ORBIT - NODE_R - 12}
										opacity={0.7}
									/>
									<circle
										className={styles.orbitRing}
										ref={orbitRingRef}
										cx={C}
										cy={C}
										r={R_ORBIT}
									/>

									<g ref={tickGroupRef}>
										{Array.from({ length: TICKS }, (_, index) => {
											const deg = (360 / TICKS) * index
											const major = index % 8 === 0
											const from = polar(TICK_IN, deg)
											const to = polar(major ? TICK_OUT_MAJ : TICK_OUT, deg)
											return (
												<line
													key={`tick-${index}`}
													className={`${styles.tick} ${major ? styles.tickMajor : ""}`}
													x1={from.x}
													y1={from.y}
													x2={to.x}
													y2={to.y}
												/>
											)
										})}
									</g>

									<circle className={styles.progressTrack} cx={C} cy={C} r={R_PROG} />
									<circle
										className={styles.progressArc}
										ref={progressRef}
										cx={C}
										cy={C}
										r={R_PROG}
										transform={`rotate(-90 ${C} ${C})`}
										strokeDasharray={PROG_LEN}
										strokeDashoffset={PROG_LEN}
									/>

									<g ref={cometRef}>
										<circle className={styles.comet} cx={C + R_HAIR} cy={C} r={3} />
									</g>

									<circle
										className={styles.anchorPulse}
										ref={anchorPulseRef}
										cx={C + R_ORBIT}
										cy={C}
										r={38}
									/>
									<circle
										className={styles.anchor}
										cx={C + R_ORBIT}
										cy={C}
										r={33}
									/>
									<line
										className={styles.lead}
										x1={C + R_ORBIT + NODE_R + 4}
										y1={C}
										x2={C + R_EXIT}
										y2={C}
									/>
									<circle
										className={styles.leadDot}
										cx={C + R_EXIT}
										cy={C}
										r={3.4}
									/>

									{PROBLEMS.map((problem, index) => (
										<g
											key={problem.id}
											className={`${styles.node} ${
												index === active ? styles.nodeActive : ""
											}`}
											ref={(element) => {
												nodeRefs.current[index] = element
											}}
											onMouseEnter={() => select(index)}
											onClick={() => setOpenIndex(index)}
										>
											<circle className={styles.nodeShadow} r={NODE_R + 7} />
											<circle className={styles.nodeDisc} r={NODE_R} />
											<g
												className={styles.nodeIcon}
												transform="translate(-10 -10) scale(0.833)"
											>
												{ICON_PATHS[problem.icon]}
											</g>
										</g>
									))}
								</svg>

								<div className={styles.core}>
									<button
										type="button"
										ref={coreCardRef}
										className={styles.coreCard}
										onClick={() => setOpenIndex(active)}
										aria-label={`See how we solve ${activeProblem.title}`}
									>
										<AnimatePresence mode="wait" initial={false}>
											<motion.span
												className={styles.coreBody}
												key={activeProblem.id}
												initial={{ opacity: 0, y: 10 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0, y: -10 }}
												transition={{ duration: 0.32, ease: EASE_OUT }}
											>
												<span className={styles.coreKicker}>
													Problem {String(active + 1).padStart(2, "0")} /{" "}
													{String(PROBLEMS.length).padStart(2, "0")}
												</span>
												<span className={styles.coreTitle}>{activeProblem.title}</span>
												<span className={styles.coreHint}>
													<ArrowIcon size={13} />
													See how we solve it
												</span>
											</motion.span>
										</AnimatePresence>
									</button>
								</div>
							</div>

							<div className={styles.hubFooter}>
								<span className={styles.hubHint}>
									Auto-cycling · select a service to hold
								</span>
								<span className={styles.hubDots}>
									{PROBLEMS.map((problem, index) => (
										<button
											key={`dot-${problem.id}`}
											type="button"
											className={`${styles.hubDot} ${
												index === active ? styles.hubDotActive : ""
											}`}
											onClick={() => select(index)}
											aria-label={`Show ${problem.title}`}
											aria-current={index === active}
										/>
									))}
								</span>
							</div>
						</div>

						<div className={styles.cards}>
							<p className={styles.cardsLabel}>Where we step in</p>
							{PROBLEMS.map((problem, index) => {
								const isActive = index === active
								return (
									<motion.button
										key={problem.id}
										type="button"
										ref={(element) => {
											cardRefs.current[index] = element
										}}
										className={`${styles.card} ${isActive ? styles.cardActive : ""}`}
										initial={{ opacity: 0, y: 16 }}
										animate={inView ? { opacity: 1, y: 0 } : undefined}
										transition={{ duration: 0.5, delay: 0.06 * index, ease: EASE_OUT }}
										whileHover={{ y: -1 }}
										whileTap={{ scale: 0.994 }}
										onMouseEnter={() => {
											select(index)
											setHeld(true)
										}}
										onMouseLeave={() => setHeld(false)}
										onFocus={() => {
											select(index)
											setHeld(true)
										}}
										onBlur={() => setHeld(false)}
										onClick={() => setOpenIndex(index)}
										aria-haspopup="dialog"
										aria-current={isActive}
									>
										<span className={styles.cardIndex}>
											{String(index + 1).padStart(2, "0")}
										</span>
										<span className={styles.cardIcon}>
											<ServiceIcon name={problem.icon} />
										</span>
										<span className={styles.cardMain}>
											<span className={styles.cardTitle}>{problem.title}</span>
											<span className={styles.cardService}>{problem.service}</span>
											<AnimatePresence initial={false}>
												{isActive ? (
													<motion.span
														key="reveal"
														className={styles.cardReveal}
														initial={{ height: 0, opacity: 0 }}
														animate={{ height: "auto", opacity: 1 }}
														exit={{ height: 0, opacity: 0 }}
														transition={{
															height: { duration: 0.42, ease: EASE_OUT },
															opacity: { duration: 0.26 },
														}}
													>
														<span className={styles.cardRevealInner}>
															<span className={styles.cardSummary}>
																{problem.summary}
															</span>
															<span className={styles.cardMetric}>
																<b className={styles.cardMetricValue}>
																	{problem.metric.value}
																</b>
																<span className={styles.cardMetricLabel}>
																	{problem.metric.label}
																</span>
															</span>
														</span>
													</motion.span>
												) : null}
											</AnimatePresence>
										</span>
										<span className={styles.cardArrow}>
											<ArrowIcon />
										</span>
									</motion.button>
								)
							})}
						</div>
					</div>
				</div>

				{openProblem ? (
					<ProblemDialog
						problem={openProblem}
						index={openIndex ?? 0}
						total={PROBLEMS.length}
						onClose={() => setOpenIndex(null)}
						onSelect={setOpenIndex}
					/>
				) : null}
			</section>
		</MotionConfig>
	)
}
