"use client";

import { useEffect, type ReactNode } from "react";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

function getNavigationType(): "navigate" | "reload" | "back_forward" {
  const entries = performance.getEntriesByType("navigation");
  if (!entries.length) return "navigate";
  const type = (entries[0] as PerformanceNavigationTiming).type;
  if (type === "reload" || type === "back_forward") return type;
  return "navigate";
}

function restoreNativePosition(key: string): boolean {
  if (getNavigationType() === "back_forward") return true;

  let target = window.scrollY;
  if (window.location.hash) {
    const anchorId = decodeURIComponent(window.location.hash.slice(1));
    const anchor = document.getElementById(anchorId);
    if (!anchor) return false;
    target = Math.round(anchor.getBoundingClientRect().top + window.scrollY);
  } else {
    const saved = Number(sessionStorage.getItem(key));
    if (!Number.isFinite(saved) || saved <= 0) return true;
    target = saved;
  }

  const max = document.documentElement.scrollHeight - window.innerHeight;
  target = Math.max(0, Math.min(target, max));
  const html = document.documentElement;
  const previousBehavior = html.style.scrollBehavior;
  html.style.scrollBehavior = "auto";
  window.scrollTo(0, target);
  html.style.scrollBehavior = previousBehavior;
  return Math.abs(target - window.scrollY) < 20;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useEffect(() => {
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    const key = `jabit-scroll:${window.location.pathname}`;
    const persist = () => {
      try {
        sessionStorage.setItem(key, String(window.scrollY));
      } catch {
        /* storage unavailable */
      }
    };
    window.addEventListener("pagehide", persist);

    if (reduced || typeof ResizeObserver === "undefined") {
      const restore = () => {
        try {
          if (restoreNativePosition(key)) {
            document.getElementById("jabit-restore-veil")?.remove();
            window.clearInterval(retry);
            window.clearTimeout(deadline);
          }
        } catch {
          document.getElementById("jabit-restore-veil")?.remove();
        }
      };
      const initialFrame = window.requestAnimationFrame(restore);
      const retry = window.setInterval(restore, 100);
      const deadline = window.setTimeout(() => {
        restore();
        document.getElementById("jabit-restore-veil")?.remove();
        window.clearInterval(retry);
      }, 2200);
      return () => {
        window.cancelAnimationFrame(initialFrame);
        window.clearInterval(retry);
        window.clearTimeout(deadline);
        window.removeEventListener("pagehide", persist);
      };
    }

    let cancelled = false;
    let disposeRuntime: (() => void) | undefined;
    const nativeRestoreFrame = window.requestAnimationFrame(() => {
      try {
        restoreNativePosition(key);
      } finally {
        document.getElementById("jabit-restore-veil")?.remove();
      }
    });

    void Promise.all([import("gsap"), import("gsap/ScrollTrigger"), import("lenis")]).then(
      ([gsapModule, scrollTriggerModule, lenisModule]) => {
        if (cancelled) return;

        const { gsap } = gsapModule;
        const { ScrollTrigger } = scrollTriggerModule;
        const Lenis = lenisModule.default;

        gsap.registerPlugin(ScrollTrigger);
        const html = document.documentElement;
        const previousScrollBehavior = html.style.scrollBehavior;
        html.style.scrollBehavior = "auto";
        const lenis = new Lenis({
          // A slightly quicker settle keeps the premium glide without making the
          // page feel like it is lagging behind the wheel.
          lerp: 0.11,
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 1,
          syncTouch: false,
          anchors: true,
        });
        const updateScroll = () => ScrollTrigger.update();
        const updateFrame = (time: number) => lenis.raf(time * 1000);

        lenis.on("scroll", updateScroll);
        gsap.ticker.add(updateFrame);
        gsap.ticker.lagSmoothing(0);

        let isDisposed = false;
        let userInteracted = false;
        const markInteract = () => {
          userInteracted = true;
        };
        window.addEventListener("wheel", markInteract, { passive: true, once: true });
        window.addEventListener("touchstart", markInteract, { passive: true, once: true });

        const restore = () => {
          if (userInteracted) return;
          try {
            if (getNavigationType() === "back_forward") return;
            const saved = Number(sessionStorage.getItem(key));
            let target = window.scrollY;
            if (window.location.hash) {
              const anchorId = decodeURIComponent(window.location.hash.slice(1));
              const anchor = document.getElementById(anchorId);
              if (anchor) {
                target = Math.round(anchor.getBoundingClientRect().top + window.scrollY);
              }
            } else if (Number.isFinite(saved) && saved > 0) {
              target = saved;
            }
            const max = document.documentElement.scrollHeight - window.innerHeight;
            target = Math.max(0, Math.min(target, max));
            if (Math.abs(target - window.scrollY) < 20) return;

            html.style.scrollBehavior = "auto";
            window.scrollTo(0, target);
            ScrollTrigger.refresh();
          } catch {
            /* noop */
          }
        };

        const dropVeil = () => {
          document.getElementById("jabit-restore-veil")?.remove();
        };

        const scheduleRestore = () => {
          if (isDisposed) return;
          ScrollTrigger.refresh();
          window.setTimeout(() => {
            if (isDisposed) return;
            restore();
            dropVeil();
          }, 0);
        };

        const initialFrame = window.requestAnimationFrame(scheduleRestore);

        document.fonts?.ready.finally(() => {
          window.setTimeout(scheduleRestore, 100);
        });

        const fallback = window.setTimeout(scheduleRestore, 2500);

        disposeRuntime = () => {
          isDisposed = true;
          window.cancelAnimationFrame(initialFrame);
          window.clearTimeout(fallback);
          window.removeEventListener("wheel", markInteract);
          window.removeEventListener("touchstart", markInteract);
          lenis.off("scroll", updateScroll);
          gsap.ticker.remove(updateFrame);
          lenis.destroy();
          html.style.scrollBehavior = previousScrollBehavior;
        };
      },
    );

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(nativeRestoreFrame);
      window.removeEventListener("pagehide", persist);
      disposeRuntime?.();
    };
  }, []);

  return children;
}
