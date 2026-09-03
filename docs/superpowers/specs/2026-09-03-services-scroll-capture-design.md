# Services Scroll Capture and Panel Fit Design

## Scope

Fix only the Services panel sequence. Preserve the Services heading and every other page section. The existing heading remains in normal document flow and scrolls away before panel capture begins.

This document supersedes the CSS-sticky and fixed-500vh mechanism described in the earlier Services design. The five service items, purpose-built HTML/CSS scenes, color system, mobile behavior, and reduced-motion goals remain unchanged.

## Desktop Scroll Architecture

Use the same GSAP ScrollTrigger pinning pattern already used by Recent Works.

- The panel stage has a normal 100svh layout height.
- ScrollTrigger begins at `top top` when the panel stage reaches the viewport top.
- GSAP pins only the panel stage with `pin: true`, `pinSpacing: true`, and `anticipatePin: 1`.
- The scroll distance is recalculated as `window.innerHeight * (panelCount - 1)`. Five panels therefore receive four viewport-height transition segments.
- The CSS `500vh` scene height and CSS sticky positioning are removed so they cannot combine with GSAP pin spacing.
- Horizontal travel is recalculated as `track.scrollWidth - window.innerWidth`.
- Track translation is `-(scrollProgress * horizontalTravel)`.
- The first panel is centered at progress zero and the fifth panel is centered at progress one.
- The active panel is the panel whose center is closest to the viewport center.
- At the end boundary, ScrollTrigger releases immediately and the Founder section resumes normal vertical flow without extra space or a jump.
- If horizontal travel is zero or fewer than two panels exist, pinning is skipped.
- Refresh and resize recalculate scroll distance, track travel, and panel positions.

## Panel Focus and Activation

Panel position, scale, opacity, and blur are scrubbed directly against scroll progress.

- Active: scale 1, opacity 1, blur 0
- Inactive: scale 0.9, opacity 0.4, blur 2px

Title, description, tags, and major scene elements reveal only when the active center changes. The title moves from 24px below to its resting position over 560ms. Supporting elements use 60-100ms stagger intervals. React state changes only when the active index changes, not on every scroll frame.

The top-right progress indicator uses the same active-center result. Completed steps are solid Jabit Blue dots, the active step is an elongated Jabit Blue bar, and upcoming steps are light-gray dots. Geometry changes use transforms rather than animated width.

## Viewport Fit and Composition

Validate all five panels at 1440x900 and 1440x800.

- Panel width is 76vw, capped at 1120px.
- Panel height uses a responsive viewport clamp that leaves room for the progress row and vertical stage padding.
- The panel is vertically centered within the pinned viewport.
- Desktop text and visual columns use an approximate 42/58 split.
- Every panel keeps at least 24px internal edge padding.
- At 1440x800, spacing and visual height reduce responsively without reducing the edge padding below 24px.
- Meaningful content cannot overflow or be clipped by the rounded panel bounds.

The longest title, `ERP & Custom Software`, is the sizing stress test. Its index, two-line title, description, three tags, and ERP scene must fit together within the actual panel at both desktop test sizes.

Each illustration is tuned independently:

- Web editor and dashboard layers remain inside their visual frame.
- Mobile phone frames fit fully inside the allotted scene; negative bottom positioning cannot crop meaningful phone content.
- ERP modules and records table preserve readable hierarchy and safe insets.
- Cloud pipeline and infrastructure nodes compress cleanly at the shorter height.
- AI nodes, connectors, and activity trace remain inside safe bounds.

## Keyboard and Screen-Reader Support

- Each panel is focusable with `tabIndex="0"` and has a label in the form `Service 3 of 5: ERP & Custom Software`.
- Each progress control is a native button with at least a 44px target and a label in the form `Show service 3: ERP & Custom Software`.
- Enter and Space activate progress buttons through native button behavior.
- Left and Right Arrow move to the previous or next panel. Home and End move to the first or final panel.
- Desktop keyboard navigation maps to the same GSAP ScrollTrigger start/end range as wheel scrolling. Mobile keyboard navigation scrolls the native snap rail.
- The active panel and progress button expose `aria-current`.
- A polite live region announces active-panel changes once per index change.
- Decorative product scenes are hidden from assistive technology.
- All essential text meets WCAG AA contrast, and focus indicators remain visible against white surfaces.

## Mobile and Reduced Motion

Below the `md` breakpoint, GSAP pinning is disabled. The scene uses auto height and a native horizontal overflow rail with mandatory center snapping. Dots remain tap and keyboard operable.

With `prefers-reduced-motion: reduce`, pinning and horizontal scrub are disabled at every viewport. All five cards render vertically at full opacity without transform or blur.

## Lifecycle and Failure Safety

- Reuse the installed GSAP, ScrollTrigger, and Lenis integration.
- Kill the Services ScrollTrigger and GSAP context on unmount or breakpoint change.
- Disconnect mobile observers and remove temporary animation state during cleanup.
- Refresh ScrollTrigger after layout and font measurements settle.
- Never trap page scrolling when track measurements are invalid.

## Validation

Run the complete page path at 1440x900 and 1440x800:

1. Scroll through the Services heading in normal flow.
2. Confirm capture begins exactly when the panel stage reaches the viewport top.
3. Confirm Web Platforms is centered first.
4. Scroll through all five panels and verify middle panels show both neighbor peeks when space permits.
5. Confirm ERP title, description, tags, and scene fit without clipping.
6. Confirm both Mobile phone frames remain inside the scene.
7. Confirm Agentic AI reaches its centered final state.
8. Confirm the stage releases directly into Founder without a blank gap or jump.
9. Verify keyboard dots, panel focus, Arrow keys, Home, End, focus rings, labels, current state, and live announcements.
10. Verify mobile snap behavior and absence of page-level horizontal overflow.
11. Verify reduced-motion static stacking.
12. Run the production build.
13. Run Lighthouse performance before the implementation and after the final implementation, and record both scores and observed regressions or improvements.

No implementation is complete if either desktop viewport clips content, scroll capture begins late, release leaves a spacer, keyboard navigation fails, or Lighthouse reveals a material performance regression caused by Services.

## Lighthouse Comparison

Local Vite development-server audits were run with the same Lighthouse settings before and after implementation. External image loading and development-mode overhead make the absolute score unsuitable as a production benchmark, so the comparison is used only as a regression signal.

| Metric | Before | After |
| --- | ---: | ---: |
| Performance score | 26 | 26 |
| First Contentful Paint | 8.7s | 7.8s |
| Largest Contentful Paint | 16.3s | 15.7s |
| Total Blocking Time | 3,130ms | 3,500ms |
| Cumulative Layout Shift | 0.008 | 0.007 |

The overall performance score remained unchanged. Paint and layout-shift metrics improved slightly; the Total Blocking Time variation did not change the aggregate score and should be rechecked against a production build before deployment.
