"use client";

import { RefObject, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Scroll reveal for industry sections.
 * Performance budget: transform + opacity only (no blur filters),
 * whole section settles in ~1s. Respects reduced motion.
 */
export function useIndustryReveal(ref: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const section = ref.current;
    if (!section) return undefined;

    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const headingFill = section.querySelector<HTMLElement>(".section-heading-fill");
      if (headingFill) {
        if (reduced) {
          headingFill.style.backgroundSize = "100% 100%, 100% 100%";
        } else {
          gsap.fromTo(
            headingFill,
            { backgroundSize: "0% 100%, 100% 100%" },
            {
              backgroundSize: "100% 100%, 100% 100%",
              ease: "none",
              scrollTrigger: {
                trigger: headingFill,
                start: "top 94%",
                end: "top 48%",
                scrub: 0.6,
                invalidateOnRefresh: true,
              },
            },
          );
        }
      }

      if (reduced) return;

      const intro = section.querySelectorAll<HTMLElement>("[data-ind-intro]");
      const rules = section.querySelectorAll<HTMLElement>("[data-ind-rule]");
      const items = section.querySelectorAll<HTMLElement>("[data-ind-item]");

      // Small travel, fast settle — expo.out keeps it soft without long tails.
      if (intro.length) gsap.set(intro, { autoAlpha: 0, y: 28 });
      if (rules.length) gsap.set(rules, { scaleX: 0, transformOrigin: "left center" });
      if (items.length) gsap.set(items, { autoAlpha: 0, y: 28 });

      const timeline = gsap.timeline({
        defaults: { ease: "expo.out", overwrite: "auto" },
        scrollTrigger: { trigger: section, start: "top 85%", once: true },
      });

      // t=0.00 → intros cascade (3 max ≈ 0.55s)
      if (intro.length) {
        timeline.to(intro, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.07 });
      }
      // t=0.25 → rules draw (0.55s)
      if (rules.length) {
        timeline.to(rules, { scaleX: 1, duration: 0.55, stagger: 0.05 }, 0.25);
      }
      // t=0.35 → items cascade (6 max ≈ 0.85s, settles ≈1.2s)
      if (items.length) {
        timeline.to(items, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.07 }, 0.35);
      }
    }, section);

    let cancelled = false;
    const refresh = () => {
      if (!cancelled) ScrollTrigger.refresh();
    };
    const refreshFrame = window.requestAnimationFrame(refresh);

    window.addEventListener("load", refresh, { once: true });
    void document.fonts?.ready.then(refresh);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(refreshFrame);
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, [ref]);
}
