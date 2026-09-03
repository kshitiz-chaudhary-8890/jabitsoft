# Services Horizontal Panels Design

## Scope

Rebuild only the Services showcase below the existing Services heading. Preserve the navbar, hero, logo marquee, Recent Works, testimonials, founder, awards, pricing, FAQ, contact, footer, and all other page sections.

The existing heading remains unchanged and stays in normal document flow:

- `(Services)`
- `What we do`
- `We build robust, scalable systems that power businesses worldwide.`

The heading scrolls away normally. Only the panel scene below it becomes sticky.

## Services

The sequence contains five panels in this order:

1. Web Platforms
2. Mobile Engineering
3. ERP & Custom Software
4. Cloud & DevOps
5. Agentic AI

Each panel contains a small index, a dominant title, a concise description, three outlined tags, and a unique service-specific product scene.

## Desktop Structure

The horizontal scene uses a 500vh outer container. Its inner viewport is sticky at the top, 100svh tall, and clips horizontal overflow. The panel track is a single flex row.

Each desktop panel is 76vw wide, capped at 1120px. Its height is `min(68svh, 620px)` with a 500px minimum for standard desktop viewports. The track has calculated left and right padding equal to half the difference between the viewport and panel width. This centers the first panel at progress zero and the final panel at progress one.

Middle active panels show controlled peeks of both neighboring panels. The first and last states naturally show a peek on only one side.

The Services heading is not part of the sticky viewport. The sticky scene releases immediately after the fifth panel completes, after which the Founder section resumes normal document flow.

## Scroll Model

Scroll progress is measured continuously from zero to one across the 500vh scene. Horizontal travel is measured at runtime:

`travel = total panel row width - viewport width`

The track translation is:

`translateX = -(scroll progress * travel)`

The active panel is the panel whose horizontal center is closest to the viewport center. Active state must not use rounded fixed scroll steps.

For each panel, center distance drives a continuous focus value. Panel styling interpolates from the inactive state to the active state:

- Active: scale 1, opacity 1, blur 0
- Inactive: scale 0.9, opacity 0.4, blur 2px

Track position, panel scale, opacity, and blur remain scrubbed one-to-one with scrolling.

## Panel Layout and Styling

Panels use a two-column desktop layout. The left column holds service content and the right column holds the product scene. Mobile panels stack content above the illustration.

Surfaces stay white or very light gray. Borders use a thin low-opacity gray and shadows remain soft. Titles use the existing project font in near-black. Descriptions and tags use muted gray. Jabit Blue `#0099FF` is reserved for indicators, active accents, and one or two meaningful highlights inside each illustration.

The small label has at least 24px clearance from every panel edge. The title is at least 2.5 times the description size. No oversized decorative index, ghost heading, or repeated background title is used.

Tags are compact outlined pills without a strong fill.

## Purpose-Built Product Scenes

All five illustrations are separate HTML/CSS compositions. They do not share one generic mockup with swapped labels.

### Web Platforms

A dark code editor and light analytics dashboard overlap within a browser-like workspace. The scene includes varied code lines, a navigation rail, a compact traffic chart, performance status, and a restrained blue deployment or performance highlight.

### Mobile Engineering

Two offset phone frames create depth. One shows a product home screen with navigation and metrics. The other shows a focused interaction or activity state. Controls, cards, navigation, and status elements use realistic proportions rather than uniform placeholder bars.

### ERP & Custom Software

A system map connects distinct operational modules to a structured data table. Modules represent areas such as orders, inventory, finance, and reporting. The table uses varied row content, statuses, and a deliberate blue active record or connection.

### Cloud & DevOps

A deployment pipeline moves through build, test, deploy, and monitor stages. Infrastructure nodes and health states sit beneath or beside it. Lines and status markers communicate relationships, with blue reserved for the active deployment path.

### Agentic AI

A central agent connects to retrieval, memory, tools, and output nodes. A compact activity trace shows work moving through the system. Node sizes and relationships vary intentionally, and blue identifies the currently active tool or action.

## Activation Motion

When a panel becomes active, its title animates from 24px below and zero opacity to its resting position and full opacity over 560ms using an ease equivalent to `cubic-bezier(0.22, 1, 0.36, 1)`.

Description, tags, and scene elements reveal with subtle vertical movement and 60-100ms stagger intervals. These activation animations are discrete, while panel position and focus styling remain continuously scroll-scrubbed.

The progress control sits at the top right of the sticky viewport:

- Completed steps: solid blue dot
- Active step: elongated blue bar
- Upcoming steps: light gray dot

Indicator geometry uses transform scaling instead of animated width to avoid layout work.

## Mobile Behavior

Below the `md` breakpoint, the 500vh scene and sticky behavior are disabled. The section returns to auto height. Panels appear in a horizontally scrollable rail using mandatory center snap. Mobile cards are 88vw wide, capped at 560px, and stack text above the illustration.

Dots appear below the rail and can navigate to a panel. Active state is determined by panel visibility within the mobile scroller. Mobile uses only a simple entrance reveal and does not use desktop scrubbed parallax or scroll-jacking.

The rail must not create page-level horizontal overflow.

## Reduced Motion

When `prefers-reduced-motion: reduce` is active, sticky positioning, horizontal translation, blur interpolation, and reveal motion are disabled. All five panels render as a static vertical stack in reading order with full opacity and no transform.

## Accessibility

- The Services heading labels the section.
- The panel rail has a descriptive accessible name.
- Every panel exposes its number and service name.
- The active panel and active progress step expose their current state.
- Dot controls have at least a 44px interaction target and visible keyboard focus.
- A polite live region announces active service changes without firing on every scroll frame.
- Decorative product-scene details stay hidden from assistive technology because the adjacent text conveys their meaning.
- Text and controls maintain readable contrast against white and light-gray surfaces.

## Performance and Lifecycle

- GSAP and ScrollTrigger use the versions already installed in the project.
- Scroll animation changes transform and opacity. Blur is limited to the specified 2px inactive state.
- React state changes only when the nearest active panel changes, never for every scroll frame.
- `will-change` applies only to the active panel and its immediate neighbors.
- Internal illustration timelines run only when their panel becomes active.
- Measurements refresh after resize and layout changes.
- All ScrollTrigger instances, observers, and GSAP contexts are cleaned up when the component unmounts or the breakpoint changes.

## Implementation Boundaries

The current inline SVG service illustrations will be removed from the Services implementation and replaced by five isolated HTML/CSS scene components. Shared tokens cover surface color, border, radius, shadow, and typography, while each scene owns its own composition and visual hierarchy.

No global font, global color, smooth-scroll setting, navigation markup, or unrelated section styling changes are included.

## Validation

Completion requires verification at desktop and mobile widths:

- The heading scrolls away before the sticky panel scene takes over.
- The first and last panels center exactly at the start and end.
- Middle active panels show both neighboring peeks when viewport width permits.
- Horizontal movement remains tied directly to vertical scroll.
- Panel focus changes continuously without jumps.
- The progress indicator matches the nearest centered panel.
- Every product scene is visibly distinct and service-specific.
- Sticky behavior releases cleanly after Agentic AI.
- Mobile uses native snap without pinning or page overflow.
- Reduced motion shows a static vertical stack.
- Keyboard focus and navigation work.
- The production build succeeds.
