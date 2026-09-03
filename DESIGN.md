# Orionix — Creative Design Studio

## Mission
Create implementation-ready, token-driven UI guidance for Orionix — Creative Design Studio that is optimized for consistency, accessibility, and fast delivery across marketing site.

## Brand
- Product/brand: Orionix — Creative Design Studio
- URL: https://orionix.framer.website/
- Audience: buyers, teams, and decision-makers
- Product surface: marketing site

## Style Foundations
- Visual style: clean, functional, implementation-oriented
- Main font style: `font.family.primary=Inter`, `font.family.stack=Inter, Inter Placeholder, sans-serif`, `font.size.base=14px`, `font.weight.base=400`, `font.lineHeight.base=20px`
- Typography scale: `font.size.xs=1px`, `font.size.sm=12px`, `font.size.md=14px`, `font.size.lg=16px`, `font.size.xl=24px`, `font.size.2xl=32px`, `font.size.3xl=40px`, `font.size.4xl=48px`
- Color palette: `color.text.primary=#141414`, `color.text.secondary=#ffffff`, `color.text.tertiary=#0000ee`, `color.surface.base=#000000`, `color.surface.muted=#f9f8f6`, `color.surface.strong=#0066ff`
- Spacing scale: `space.1=4px`, `space.2=6px`, `space.3=8px`, `space.4=10px`, `space.5=16px`, `space.6=20px`, `space.7=23px`
- Radius/shadow/motion tokens: `radius.xs=6px`, `radius.sm=12px` | `shadow.1=rgba(0, 0, 0, 0.12) 0px 1px 1px 0px, rgba(0, 0, 0, 0.2) 0px 1.5px 3px 0px, rgba(0, 0, 0, 0.2) 0px 4px 8px 0px, rgba(0, 0, 0, 0.3) 0px 12px 24px -6px`

## Accessibility
- Target: WCAG 2.2 AA
- Keyboard-first interactions required.
- Focus-visible rules required.
- Contrast constraints required.

## Writing Tone
Concise, confident, implementation-focused.

## Rules: Do
- Use semantic tokens, not raw hex values, in component guidance.
- Every component must define states for default, hover, focus-visible, active, disabled, loading, and error.
- Component behavior should specify responsive and edge-case handling.
- Interactive components must document keyboard, pointer, and touch behavior.
- Accessibility acceptance criteria must be testable in implementation.

## Rules: Don't
- Do not allow low-contrast text or hidden focus indicators.
- Do not introduce one-off spacing or typography exceptions.
- Do not use ambiguous labels or non-descriptive actions.
- Do not ship component guidance without explicit state rules.

## Guideline Authoring Workflow
1. Restate design intent in one sentence.
2. Define foundations and semantic tokens.
3. Define component anatomy, variants, interactions, and state behavior.
4. Add accessibility acceptance criteria with pass/fail checks.
5. Add anti-patterns, migration notes, and edge-case handling.
6. End with a QA checklist.

## Required Output Structure
- Context and goals.
- Design tokens and foundations.
- Component-level rules (anatomy, variants, states, responsive behavior).
- Accessibility requirements and testable acceptance criteria.
- Content and tone standards with examples.
- Anti-patterns and prohibited implementations.
- QA checklist.

## Component Rule Expectations
- Include keyboard, pointer, and touch behavior.
- Include spacing and typography token requirements.
- Include long-content, overflow, and empty-state handling.
- Include known page component density: links (36), lists (4), buttons (1), navigation (1).


## Quality Gates
- Every non-negotiable rule must use "must".
- Every recommendation should use "should".
- Every accessibility rule must be testable in implementation.
- Teams should prefer system consistency over local visual exceptions.
