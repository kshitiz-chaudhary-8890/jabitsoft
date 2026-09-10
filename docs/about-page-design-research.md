# About Page Design Research

Last reviewed: 10 September 2026

## Goal

Build the JabitSoft About page as a company narrative rather than a copy of the homepage. The page should explain who JabitSoft is, how the company thinks, why it is credible, and what makes it a strong long-term technology partner.

The existing About hero is retained as the opening section.

## Reference Libraries Reviewed

1. [Curated Design Sections](https://curated.design/sections/)
2. [Recent Design](https://recent.design/?category=web)
3. [21st.dev](https://21st.dev/)
4. [OriginKit](https://www.originkit.dev/)
5. [ThreeUI](https://threeui.com/browse)

## Recommended Page Structure

### 1. Existing About Hero

Retain the current `Software that works as one system.` hero.

Purpose:

- Introduce JabitSoft's core positioning.
- Establish the same visual language as the homepage.
- Provide one clear conversation CTA.

### 2. Company at a Glance

Combine a short company introduction with a small set of meaningful proof points such as:

- Since 2007
- Projects delivered
- Clients served
- Industries or countries reached

References:

- [21st.dev About Bento](https://21st.dev/@uilayout.contact/components/about-bento)
- [OriginKit Features 02](https://www.originkit.dev/sections/features-02)
- [Curated Design statistics reference](https://curated.design/sections/2228/)

Direction:

- Use an asymmetric editorial grid.
- Allow the numbers to carry the visual hierarchy.
- Avoid turning every metric into a heavy card.
- Keep the section light, spacious, and predominantly white.

### 3. Our Story

Present the JabitSoft journey as a concise narrative. The written story should be the primary content, supported by one restrained interactive visual.

References:

- [21st.dev Content With Illustration](https://21st.dev/@ravikatiyar162/components/content-with-illustration)
- [ThreeUI Structure Flow](https://threeui.com/three-js/structure-flow/structure-flow)

Direction:

- Narrative on the left and visual system on the right.
- Do not use the dark ThreeUI appearance directly.
- Adapt the visual to a white background with controlled JabitSoft blue.
- Provide a static, lightweight fallback on mobile and for reduced motion.

### 4. Mission, Vision and Principles

Show what JabitSoft believes and how those beliefs affect its work.

References:

- [OriginKit feature sections](https://www.originkit.dev/sections/category/features)
- [Curated Design feature sections](https://www.curated.design/sections/type/features/)

Direction:

- Avoid three generic, equal-sized cards.
- Use one prominent active statement with a supporting selectable list.
- Keep interactions optional so all content remains readable without animation.

### 5. Founder Story

Create an editorial founder section with a large portrait, a short personal note, and the thinking behind building JabitSoft.

References:

- [Curated Design team reference](https://curated.design/sections/2104/)
- [21st.dev Content With Illustration](https://21st.dev/@ravikatiyar162/components/content-with-illustration)

Direction:

- Do not use a small profile-card layout.
- The portrait, quote, and story should feel human and credible.
- Keep the copy focused on leadership, experience, and company purpose.

### 6. Built Differently

Explain the four main differentiators:

- Business-first thinking
- Scalable engineering
- Design and technology working together
- Long-term partnership and support

Reference:

- [21st.dev About Bento](https://21st.dev/@uilayout.contact/components/about-bento)

Direction:

- Borrow the flexible grid structure, not the original styling.
- Do not repeat the homepage service-card design.
- Mix text-led and visual cells to avoid a uniform card wall.

### 7. People and Culture

Use real team and workplace photography with a connected interactive list.

Best reference:

- [21st.dev Team Showcase](https://21st.dev/@makviesainte/components/team-showcase)

Direction:

- Use a magazine-like photo composition.
- Images can begin in grayscale and reveal colour on hover.
- Hovering a name can highlight its matching photograph.
- Touch devices must not depend on hover to reveal essential information.
- Avoid fake team-member content and stock portraits.

### 8. Our Journey

Show selected company milestones from 2007 to the present.

References:

- [21st.dev Timeline-02](https://21st.dev/@ruixen.ui/components/timeline-02)
- [21st.dev sticky scroll timeline](https://21st.dev/@manuarora700/components/timeline)
- [Recent Design cartridge timeline](https://recent.design/i/a85mqyr-mobile-portfolio-with-cartridge-timeline)

Direction:

- Prefer the cleaner structure of Timeline-02.
- Add a subtle scroll-progress treatment on desktop.
- Use a straightforward vertical timeline on mobile.
- Include only meaningful milestones rather than every year.

### 9. Industries and Trust

Show the industries JabitSoft understands and support the claims with selected client or institutional proof.

References:

- [Curated Design statistics reference](https://curated.design/sections/2228/)
- [21st.dev About components](https://21st.dev/community/components/s/about)

Direction:

- Combine industry labels with proof instead of showing another logo carousel.
- Possible industries include healthcare, government, retail, logistics, manufacturing, and professional services.
- Keep this visually distinct from the homepage client-results section.

### 10. Existing CTA and Footer

Reuse the shared homepage CTA and footer to keep the site consistent. Do not add another large About-specific CTA directly above it.

## Final Recommended Flow

1. About Hero
2. Company at a Glance
3. Our Story
4. Mission, Vision and Principles
5. Founder Story
6. Built Differently
7. People and Culture
8. Our Journey
9. Industries and Trust
10. Shared CTA and Footer

## Visual Rules

- Keep the main background white.
- Reuse the homepage content width, gutters, typography scale, eyebrow style, and section spacing.
- Use black and neutral grey as the main palette with controlled JabitSoft blue accents.
- Do not place every content block inside a rounded card.
- Avoid repeating layouts already used in Homepage Services, Problems We Solve, How We Work, and Company Stats.
- Preserve strong whitespace and an editorial reading rhythm.
- Keep headings concise and use sentence case consistently.

## Motion and Performance Rules

- Motion must support hierarchy and storytelling rather than decorate every element.
- Use entrance reveals, restrained image transitions, and scroll progress only where they add meaning.
- Use ThreeUI or WebGL for no more than one supporting visual on the page.
- Lazy-load any Three.js experience and keep it out of the critical rendering path.
- Provide static fallbacks for mobile, low-power devices, and `prefers-reduced-motion`.
- Do not make essential content dependent on hover, autoplay, or animation completion.
- Keep the page smooth and consistent with the homepage animation language.

## Content Rules

- Use verified company facts only.
- Replace placeholder statistics and team details before release.
- Keep the About page focused on identity, people, beliefs, and history.
- Keep detailed services, case studies, and work-process explanations on their dedicated pages.
- Preserve the production pathname `/about-us/` when the redesigned page goes live.

## Implementation Status

- Existing About hero: implemented
- Remaining sections: research and structure approved for further discussion
- Section implementation: not started as part of this research step

