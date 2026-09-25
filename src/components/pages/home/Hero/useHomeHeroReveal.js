"use client";

import { useEffect, useLayoutEffect } from "react";
import { gsap } from "gsap";

/**
 * Home hero reload reveal — same masked cascade as the About hero
 * (Minati-style: whole shell slides up while masked pieces rise inside it).
 *
 * - useIsomorphicLayoutEffect hides the start state before paint: no flash
 *   of visible content, and no SSR useLayoutEffect console warning.
 * - Entrance waits for document.fonts.ready so display metrics are final.
 */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function useHomeHeroReveal(sectionRef, shellRef) {
  useIsomorphicLayoutEffect(() => {
    const hero = sectionRef.current;
    const shell = shellRef.current;
    if (!hero || !shell) return undefined;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return undefined;

    const rises = shell.querySelectorAll(".jabit-hero__rise-inner");
    if (!rises.length) return undefined;

    let cancelled = false;
    let loaderObserver;

    const ctx = gsap.context(() => {
      // Hidden start states, applied before paint.
      gsap.set(shell, { y: 64 });
      gsap.set(rises, { yPercent: 115, autoAlpha: 0 });

      const tl = gsap.timeline({ paused: true });
      tl.to(shell, { y: 0, duration: 0.9, ease: "power3.out", clearProps: "transform" }, 0).to(
        rises,
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.6,
          stagger: 0.04,
          ease: "power2.out",
          clearProps: "transform",
        },
        0.05,
      );

      const play = () => {
        if (cancelled || tl.progress() !== 0) return;
        if (document.querySelector(".site-loader-veil")) {
          if (!loaderObserver) {
            loaderObserver = new MutationObserver(() => {
              if (!document.querySelector(".site-loader-veil")) {
                loaderObserver.disconnect();
                loaderObserver = undefined;
                play();
              }
            });
            loaderObserver.observe(document.body, { childList: true, subtree: true });
          }
          return;
        }
        tl.play();
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
      loaderObserver?.disconnect();
      ctx.revert();
    };
  }, [sectionRef, shellRef]);
}
