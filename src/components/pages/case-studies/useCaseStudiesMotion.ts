"use client";

import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useCaseStudiesMotion(rootRef: RefObject<HTMLDivElement | null>) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    gsap.registerPlugin(ScrollTrigger);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return undefined;

    const context = gsap.context(() => {
      const heroTimeline = gsap.timeline({ defaults: { ease: "power4.out" } });
      heroTimeline
        .from("[data-cs-hero-copy]", {
          autoAlpha: 0,
          y: 34,
          duration: 0.85,
          stagger: 0.12,
        })
        .from(
          "[data-cs-hero-word]",
          {
            yPercent: 112,
            rotateX: -16,
            transformOrigin: "50% 100%",
            duration: 0.9,
            stagger: 0.035,
          },
          0.08,
        )
        .from("[data-cs-hero-lower]", { autoAlpha: 0, y: 26, duration: 0.72, stagger: 0.08 }, 0.32);

      gsap.utils.toArray<HTMLElement>("[data-cs-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 34 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.72,
            ease: "power4.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
              once: true,
            },
          },
        );
      });

      const cards = gsap.utils.toArray<HTMLElement>("[data-cs-card]");
      gsap.set(cards, {
        autoAlpha: 0,
        y: 58,
        scale: 0.975,
        rotateX: 5,
        transformOrigin: "50% 100%",
      });
      gsap.set("[data-cs-frame]", { clipPath: "inset(0 0 100% 0)" });

      ScrollTrigger.batch(cards, {
        start: "top 94%",
        once: true,
        onEnter: (batch) => {
          const frames = batch
            .map((card) => card.querySelector<HTMLElement>("[data-cs-frame]"))
            .filter((frame): frame is HTMLElement => Boolean(frame));
          const bodies = batch
            .map((card) => card.querySelector<HTMLElement>("[data-cs-card-body]"))
            .filter((body): body is HTMLElement => Boolean(body));

          const timeline = gsap.timeline({ defaults: { ease: "power4.out" } });
          timeline
            .to(batch, {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              rotateX: 0,
              duration: 0.74,
              stagger: 0.075,
            })
            .to(
              frames,
              {
                clipPath: "inset(0 0 0% 0)",
                duration: 0.86,
                stagger: 0.075,
              },
              0.08,
            )
            .fromTo(
              bodies,
              { autoAlpha: 0, y: 24 },
              { autoAlpha: 1, y: 0, duration: 0.62, stagger: 0.06 },
              0.2,
            );
        },
      });

      gsap.utils.toArray<HTMLElement>(".section-heading-fill").forEach((heading) => {
        gsap.fromTo(
          heading,
          { backgroundSize: "0% 100%, 100% 100%" },
          {
            backgroundSize: "100% 100%, 100% 100%",
            ease: "none",
            scrollTrigger: {
              trigger: heading,
              start: "top 100%",
              end: "top 55%",
              scrub: 0.55,
              invalidateOnRefresh: true,
            },
          },
        );
      });

      const media = gsap.matchMedia();
      media.add("(min-width: 900px)", () => {
        gsap.utils.toArray<HTMLElement>("[data-cs-image]").forEach((visual) => {
          gsap.fromTo(
            visual,
            { yPercent: -5, scale: 1.08 },
            {
              yPercent: 5,
              scale: 1.08,
              ease: "none",
              scrollTrigger: {
                trigger: visual,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8,
              },
            },
          );
        });
      });
    }, root);

    return () => context.revert();
  }, [rootRef]);
}
