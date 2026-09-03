# Jabit Website — Orionix-Inspired Implementation Plan

## Project Goal

Build the Jabit website using the Orionix Creative Design Studio website as the main visual and interaction reference.

The final website must **not use the Orionix brand name** anywhere.  
The site must use **Jabit branding** throughout.

---

## Locked Design Direction

### Brand
- Brand name: **Jabit**
- Do not use **Orionix** in visible website content.
- The reference website is only for layout, visual direction, spacing, composition, and animation behavior.

### Color System
Use a mostly black-and-white visual system.

- Primary background: `#FFFFFF`
- Primary text: `#141414`
- Dark sections / dark UI where required: `#000000`
- Secondary text: neutral gray tones
- Main accent color: **Jabit Blue `#3B8EFF`**

### Accent Color Replacement Rule
Wherever the reference design uses a third/accent color other than black or white, replace it with:

```css
#3B8EFF
```

Use Jabit Blue for:
- Highlighted text
- Active states
- Hover accents
- Buttons where an accent CTA is required
- Decorative UI details
- Selected states
- Small visual markers
- Links where appropriate
- Interactive emphasis

Do not introduce random additional brand colors unless required by an existing asset.

---

# Reference Direction

Use the Orionix Creative Design Studio website as the main reference for:

- Overall visual hierarchy
- Large editorial typography
- Section spacing
- Grid structure
- Hero composition
- Navigation treatment
- Project showcase
- Services presentation
- Process section
- Pricing section
- Testimonials
- Statistics
- Insights/blog section
- FAQ
- Final CTA
- Footer
- Scroll-based motion
- Hover interactions
- Entrance animation feel

Reference:

`https://orionix.framer.website/`

The implementation does **not** need to copy Orionix content, logo, or branding.

---

# Hero Background — Custom Change

The main Jabit website is a **white-theme website**.

Do not convert the website into the dark Plety theme.

From the Plety reference prompt, use **only the hero background video**.

## Hero Background Video

```text
https://cdn.sceneai.art/Hero%20Section%20Video/50b4f304-cdca-4e12-8735-580d225834be.mp4
```

Recommended implementation:

```jsx
<video
  autoPlay
  loop
  muted
  playsInline
  className="absolute inset-0 w-full h-full object-cover"
>
  <source
    src="https://cdn.sceneai.art/Hero%20Section%20Video/50b4f304-cdca-4e12-8735-580d225834be.mp4"
    type="video/mp4"
  />
</video>
```

### Important
Do **not** copy:
- Plety black page background
- Plety dark navigation
- Plety dark gradient overlay
- Plety hero heading
- Plety buttons
- Plety marquee
- Plety section design

Only reuse the **background video**.

If readability requires it, a very subtle white overlay may be used:

```jsx
<div className="absolute inset-0 bg-white/10" />
```

A subtle white fade toward the bottom is also acceptable:

```jsx
<div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-white" />
```

Avoid heavy overlays that hide the video.

---

# Implementation Phases

## Phase 1 — Existing Project Inspection

Before writing or restructuring code:

1. Inspect the current project.
2. Identify:
   - Framework
   - App/router structure
   - Existing global CSS
   - Existing components
   - Existing fonts
   - Animation libraries
   - Utility libraries
   - Current responsive breakpoints
3. Reuse the existing architecture where reasonable.
4. Do not create unnecessary duplicate components.
5. Do not rewrite unrelated parts of the project.

---

# Phase 2 — Global Design Foundation

Create or adapt reusable design tokens for the Jabit version.

## Colors

```css
--color-background: #ffffff;
--color-text: #141414;
--color-black: #000000;
--color-white: #ffffff;
--color-accent: #3b8eff;
```

Neutral grays may be added as needed for:
- Secondary text
- Borders
- Muted backgrounds
- Hover states

Keep the palette minimal.

## Typography

Use a clean modern sans-serif font.

The typography should feel:
- Large
- Editorial
- Premium
- Minimal
- Highly legible

Do not make all headings uppercase.

Prefer natural casing / lowercase where it fits the visual reference.

## Layout

Use:
- Large horizontal spacing on desktop
- Generous vertical section spacing
- Clear content hierarchy
- Responsive max-width containers
- Strong whitespace

Avoid cramped layouts.

---

# Phase 3 — Navigation

Build a clean minimal navigation inspired by the Orionix reference.

Requirements:

- Jabit logo / wordmark
- White/light visual treatment
- Clean desktop navigation
- Responsive mobile menu
- Smooth hover transitions
- Proper keyboard focus states
- Navigation should visually integrate with the hero

If a sticky or fixed behavior is used, it should feel subtle and premium.

---

# Phase 4 — Hero Section

This section must be completed and polished before moving to later sections.

## Hero Requirements

- White-theme composition
- Background video from the Plety prompt
- Large Orionix-inspired typography
- Jabit branding/content
- Strong visual hierarchy
- Premium spacing
- Responsive layout
- Background video must fully cover the hero
- Text must stay readable over the video
- No unnecessary dark overlay

## Hero Structure

Suggested layering:

```text
Hero
├── Background video
├── Optional subtle white overlay
├── Navigation
├── Main headline
├── Supporting copy
├── Supporting metadata / small UI
└── CTA / interaction if part of final design
```

---

# Phase 5 — Hero Entrance Animation

Do not use a generic fade-up on every element.

The entrance animation should feel closer to a premium Framer/agency website.

Recommended sequence:

1. Hero background is already visible/running.
2. Navigation enters subtly.
3. Main heading reveals line-by-line.
4. Heading can use an overflow-mask reveal.
5. Supporting text enters after the heading.
6. Small metadata/details enter with a short stagger.
7. CTA appears last.

## Motion Characteristics

Use:
- Smooth easing
- Slight upward translation
- Opacity transitions
- Mask/clip reveals for large text
- Controlled stagger
- No excessive bounce
- No cartoonish easing

Suggested durations:

```text
Main heading: 900–1200ms
Supporting content: 700–900ms
Stagger gap: 80–180ms
```

Use a premium easing curve rather than `linear`.

Example:

```css
cubic-bezier(0.22, 1, 0.36, 1)
```

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

---

# Phase 6 — Clients / Reel Section

After the hero is approved, implement the client/reel portion.

Requirements:

- Minimal section label
- Trusted-by style client presentation
- Clean logo arrangement
- Large whitespace
- Smooth marquee or controlled movement if needed
- Reel/media section with a visually dominant presentation

Do not over-animate client logos.

---

# Phase 7 — Featured Work

Create a large project showcase inspired by Orionix.

Requirements:

- Strong project imagery/video
- Large card treatment
- Project name
- Short description
- Service/category labels
- Smooth hover interactions
- Responsive image sizing
- Consistent spacing

Interactions may include:

- Image scale
- Cursor-follow details
- Text reveal
- Subtle card movement

Keep effects controlled.

---

# Phase 8 — Services

Create five primary service entries.

Reference behavior:
- Large service numbering
- Strong typography
- Supporting description
- Supporting tags/skills
- Visual/image interaction

Suggested numbering:

```text
01
02
03
04
05
```

Use Jabit service content.

Desktop may use a more interactive layout.

Mobile must become a clean stacked layout.

---

# Phase 9 — How We Work / Process

Create a three-step process section inspired by the Orionix structure.

Example flow:

```text
01 — Discovery
02 — Strategy
03 — Design / Development
```

Use Jabit-specific copy.

Visual behavior may use:
- Scroll reveal
- Sticky media
- Progressive highlighting

Only use pinned/sticky animation if it improves the reference match and does not hurt usability.

---

# Phase 10 — Pricing

Create the pricing section only if pricing is part of the Jabit content requirements.

If no real pricing is available:
- Do not invent business-critical numbers.
- Use placeholders only when explicitly allowed.
- Prefer editable data structures.

Cards should visually match the overall premium style.

---

# Phase 11 — Testimonials + Stats

## Testimonials

Use:
- Large quote typography
- Client image where available
- Name
- Role/company
- Smooth transitions if slider behavior is needed

## Statistics

Use large numbers for important metrics.

Possible animation:
- Count-up on first viewport entry

Do not repeat the animation every time the user scrolls slightly.

---

# Phase 12 — Insights / Blog

Create the blog/insights area with:

- Section label
- Large heading
- Featured article cards
- Date
- Category
- Title
- Short description
- Image
- View all action

Maintain the same spacing system as the project cards.

---

# Phase 13 — FAQ

Create a clean accordion section.

Requirements:

- Minimal borders
- Strong typography
- Smooth open/close
- Accessible buttons
- Keyboard support
- Correct `aria-expanded`
- No layout jumping

Animation should be smooth but fast.

---

# Phase 14 — Final CTA

Create a high-impact final call-to-action.

Requirements:

- Oversized headline
- Strong Jabit messaging
- Clear CTA
- Black/white foundation
- Jabit Blue accent
- Strong whitespace

It should visually transition naturally into the footer.

---

# Phase 15 — Footer

Footer should contain the Jabit brand, not Orionix.

Potential structure:

```text
Jabit
Services
Company
Resources
Contact
Social links
Copyright
```

Keep the footer clean and editorial.

---

# Animation System

Use one consistent animation language across the site.

Recommended animation types:

- Text mask reveals
- Staggered text entry
- Scroll-triggered reveals
- Image scale reveals
- Subtle parallax
- Hover scale
- Hover underline
- Section media transitions

Avoid:

- Random animations per section
- Excessive floating
- Bounce effects
- Long delays
- Heavy motion on mobile
- Animating everything at once

---

# Responsive Implementation

Build desktop first because the reference is desktop-led.

Then perform dedicated passes for:

## Desktop
- Large typography
- Large media
- Wide spacing
- Full interactions

## Tablet
- Reduced heading sizes
- Reduced gaps
- Preserve composition
- Simplify interactions where needed

## Mobile
- Clean stacked layout
- No horizontal overflow
- Correct hero video crop
- Responsive typography
- Touch-friendly controls
- Reduced motion complexity
- Mobile navigation

Do not simply scale desktop down.

---

# Accessibility

The final implementation must:

- Support keyboard navigation
- Use visible focus states
- Maintain sufficient contrast
- Use semantic HTML
- Provide alt text for meaningful images
- Respect reduced-motion preferences
- Use accessible accordions
- Avoid interaction states that exist only on hover

---

# Code Quality Rules

Codex should:

- Reuse existing project conventions.
- Keep components modular.
- Avoid unnecessary dependencies.
- Avoid large monolithic components.
- Keep repeated content in arrays/data structures.
- Use reusable animation helpers when practical.
- Keep styling consistent.
- Avoid magic values unless required to match the reference.
- Do not modify unrelated code.
- Do not break existing routes.
- Do not replace existing assets without reason.

---

# Build Order — Strict

Follow this order:

```text
1. Inspect existing project
2. Global styles/tokens
3. Navbar
4. Hero background video
5. Hero layout
6. Hero entrance animation
7. Responsive hero polish
8. Clients + reel
9. Featured work
10. Services
11. Process
12. Pricing
13. Testimonials + stats
14. Insights/blog
15. FAQ
16. Final CTA
17. Footer
18. Full responsive pass
19. Animation polish
20. Accessibility + QA
```

Do **not** rush into building the entire homepage before the hero is correct.

---

# First Delivery Requirement

The first implementation milestone must contain only:

- Navigation
- Hero
- Background video
- Hero typography
- Hero supporting content
- Hero entrance animation
- Desktop responsive behavior
- Mobile hero/navigation behavior

Complete and visually polish this milestone before implementing the next homepage section.

---

# Final Locked Summary

```text
Reference design:
Orionix Creative Design Studio

Final brand:
Jabit

Base visual system:
Black + White

Accent:
Jabit Blue #3B8EFF

Hero:
Orionix-inspired layout and motion

Hero background:
Plety prompt video only

Dark Plety theme:
Do not use

Orionix branding/content:
Do not use in final website

Implementation strategy:
Build section-by-section, starting with navbar + hero.
```
