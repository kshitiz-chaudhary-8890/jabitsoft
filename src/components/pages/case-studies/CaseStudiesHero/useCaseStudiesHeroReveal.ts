"use client";

import { useEffect, useLayoutEffect } from "react";
import { gsap } from "gsap";

/**
 * Case studies hero reload reveal — same masked cascade as the other
 * heroes (Minati-style: whole shell slides up while masked pieces rise).
 */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function useCaseStudiesHeroReveal(
  sectionRef: React.RefObject<HTMLElement | null>,
  shellRef: React.RefObject<HTMLDivElement | null>,
) {
  useIsomorphicLayoutEffect(() => {
    const hero = sectionRef.current;
    const shell = shellRef.current;
    if (!hero || !shell) return undefined;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return undefined;

    const rises = shell.querySelectorAll<HTMLElement>(".jabit-cshero__rise-inner");
    if (!rises.length) return undefined;

    let cancelled = false;

    const ctx = gsap.context(() => {
      gsap.set(shell, { y: 64 });
      gsap.set(rises, { yPercent: 115, autoAlpha: 0 });

      const tl = gsap.timeline({ paused: true });
      tl.to(shell, { y: 0, duration: 1.4, ease: "power3.out", clearProps: "transform" }, 0).to(
        rises,
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: 1,
          stagger: 0.14,
          ease: "power2.out",
          clearProps: "transform",
        },
        0.1,
      );

      const play = () => {
        if (!cancelled && tl.progress() === 0) tl.play();
      };

      if (typeof document !== "undefined" && document.fonts?.ready) {
        document.fonts.ready.then(play).catch(play);
        window.setTimeout(play, 1200);
      } else {
        play();
      }
    }, hero);

    return () => {
      cancelled = true;
      ctx.revert();
    };
  }, [sectionRef, shellRef]);
}
