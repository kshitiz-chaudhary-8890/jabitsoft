"use client";

import { RefObject, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useAboutReveal(ref: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const section = ref.current;
    if (!section) return undefined;

    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return undefined;

    const ctx = gsap.context(() => {
      const intro = section.querySelectorAll<HTMLElement>("[data-about-intro]:not(h2)");
      const headingFill = section.querySelector<HTMLElement>(
        ".section-heading-fill:not([data-about-heading-fill])",
      );
      const items = section.querySelectorAll<HTMLElement>("[data-about-item]");
      const rules = section.querySelectorAll<HTMLElement>("[data-about-rule]");

      if (intro.length) gsap.set(intro, { autoAlpha: 0, y: 26 });
      if (items.length) gsap.set(items, { autoAlpha: 0, y: 30 });
      if (rules.length) gsap.set(rules, { scaleX: 0, transformOrigin: "left center" });

      if (headingFill) {
        gsap.fromTo(
          headingFill,
          { backgroundSize: "0% 100%, 100% 100%" },
          {
            backgroundSize: "100% 100%, 100% 100%",
            ease: "none",
            scrollTrigger: {
              trigger: headingFill,
              start: "top 92%",
              end: "top 38%",
              scrub: 0.7,
              invalidateOnRefresh: true,
            },
          },
        );
      }

      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: section, start: "top 82%", once: true },
      });

      if (intro.length) {
        timeline.to(intro, { autoAlpha: 1, y: 0, duration: 0.65, stagger: 0.08 });
      }
      if (rules.length) {
        timeline.to(rules, { scaleX: 1, duration: 0.7, stagger: 0.06 }, intro.length ? "-=0.35" : 0);
      }
      if (items.length) {
        timeline.to(
          items,
          { autoAlpha: 1, y: 0, duration: 0.68, stagger: 0.08 },
          intro.length || rules.length ? "-=0.45" : 0,
        );
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

/**
 * Drives the lower About-page heading fill from its live viewport position.
 * Unlike document-position ScrollTriggers, this remains correct after the
 * horizontal team section adds/removes pin spacing.
 */
export function useAboutHeadingFill(ref: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const section = ref.current;
    const heading = section?.querySelector<HTMLElement>("[data-about-heading-fill]");
    if (!section || !heading) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      heading.style.backgroundSize = "100% 100%, 100% 100%";
      return undefined;
    }

    let frame = 0;
    let disposed = false;

    const update = () => {
      frame = 0;
      if (disposed) return;

      const top = heading.getBoundingClientRect().top;
      const start = window.innerHeight * 0.92;
      const end = window.innerHeight * 0.38;
      const progress = Math.min(1, Math.max(0, (start - top) / (start - end)));

      heading.style.backgroundSize = `${progress * 100}% 100%, 100% 100%`;
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    const observer = new ResizeObserver(schedule);
    observer.observe(section);
    observer.observe(document.body);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    void document.fonts?.ready.then(schedule);
    schedule();

    return () => {
      disposed = true;
      if (frame) window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      heading.style.removeProperty("background-size");
    };
  }, [ref]);
}
