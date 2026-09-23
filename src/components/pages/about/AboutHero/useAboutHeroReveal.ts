"use client";

import { useEffect, useLayoutEffect } from "react";
import { gsap } from "gsap";

/**
 * About hero reload reveal — Minati-style masked cascade on one master
 * timeline (gsap-web skill: hero-timeline pattern).
 *
 * - useIsomorphicLayoutEffect hides the start state synchronously after
 *   mount but before paint: no flash of visible content, and no SSR
 *   useLayoutEffect console warning.
 * - Entrance waits for document.fonts.ready so Oswald metrics are final
 *   before the masked lines rise.
 * - Eyebrows, headline lines, sub and both buttons rise in a single
 *   DOM-order cascade: power2.out, 0.5s, stagger 0.18.
 */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function useAboutHeroReveal(
  sectionRef: React.RefObject<HTMLElement | null>,
  shellRef: React.RefObject<HTMLDivElement | null>,
) {
  useIsomorphicLayoutEffect(() => {
    const hero = sectionRef.current;
    const shell = shellRef.current;
    if (!hero || !shell) return undefined;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return undefined;

    const rises = shell.querySelectorAll<HTMLElement>(".jabit-abhero__rise-inner");
    if (!rises.length) return undefined;

    let cancelled = false;

    const ctx = gsap.context(() => {
      // Hidden start states, applied before paint.
      gsap.set(shell, { y: 64 });
      gsap.set(rises, { yPercent: 115, autoAlpha: 0 });

      // Whole shell slides up (1s power3.out) while masked items cascade
      // inside it (0.45s power2.out, stagger 0.2) — same dual motion.
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

      // Play once webfonts settle; fallback timer covers hanging fonts.ready.
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
