"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useServiceReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const section = ref.current;
    if (!section) return undefined;

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        const hero = section.querySelector<HTMLElement>("[data-motion-hero]");
        if (hero) {
          const heroTimeline = gsap.timeline({ defaults: { ease: "power4.out" } });
          heroTimeline
            .from(hero.querySelectorAll<HTMLElement>("[data-motion-hero-copy]"), {
              autoAlpha: 0,
              y: 34,
              duration: 0.85,
              stagger: 0.12,
            })
            .from(
              hero.querySelectorAll<HTMLElement>("[data-motion-hero-word]"),
              {
                yPercent: 112,
                rotateX: -16,
                transformOrigin: "50% 100%",
                duration: 0.9,
                stagger: 0.035,
              },
              0.08,
            );

          const systemMap = hero.querySelector<HTMLElement>("[data-motion-system-map]");
          if (systemMap) {
            heroTimeline
              .from(
                systemMap,
                { autoAlpha: 0, y: 70, scale: 0.9, rotate: 2.5, duration: 1.1 },
                0.28,
              )
              .from(
                systemMap.querySelectorAll<HTMLElement>("[data-motion-map-node]"),
                { autoAlpha: 0, y: 28, scale: 0.86, duration: 0.62, stagger: 0.1 },
                0.72,
              );

            gsap.to(systemMap, {
              yPercent: -7,
              rotate: -0.8,
              ease: "none",
              scrollTrigger: {
                trigger: hero,
                start: "top top",
                end: "bottom top",
                scrub: 0.9,
                invalidateOnRefresh: true,
              },
            });
          }
        }

        section.querySelectorAll<HTMLElement>("[data-motion-heading]").forEach((heading) => {
          const kicker = heading.querySelector<HTMLElement>("[data-motion-heading-kicker]");
          const intro = heading.querySelector<HTMLElement>("[data-motion-heading-intro]");

          if (kicker) {
            gsap.from(kicker, {
              autoAlpha: 0,
              x: -28,
              duration: 0.58,
              ease: "power3.out",
              scrollTrigger: { trigger: heading, start: "top 92%", once: true },
            });
          }

          if (intro) {
            gsap.from(intro, {
              autoAlpha: 0,
              y: 22,
              duration: 0.64,
              ease: "power3.out",
              scrollTrigger: { trigger: heading, start: "top 88%", once: true },
            });
          }
        });

        const proof = section.querySelector<HTMLElement>("[data-motion-proof]");
        if (proof) {
          gsap.from(proof.querySelectorAll<HTMLElement>("[data-motion-proof-item]"), {
            autoAlpha: 0,
            y: 24,
            duration: 0.62,
            stagger: 0.065,
            ease: "power3.out",
            scrollTrigger: { trigger: proof, start: "top 94%", once: true },
          });
        }

        const motionRows = Array.from(
          section.querySelectorAll<HTMLElement>("[data-motion-row], [data-motion-card]"),
        );
        ScrollTrigger.batch(motionRows, {
          start: "top 94%",
          once: true,
          onEnter: (batch) => {
            batch.forEach((item) => item.setAttribute("data-visible", "true"));
            gsap.fromTo(
              batch,
              { autoAlpha: 0, y: 28 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.62,
                stagger: 0.055,
                ease: "power3.out",
                clearProps: "opacity,visibility,transform",
              },
            );
          },
        });

        section.querySelectorAll<HTMLElement>("[data-reveal-group]").forEach((group) => {
          const revealItems = Array.from(
            group.querySelectorAll<HTMLElement>("[data-reveal]"),
          ).filter((element) => !element.querySelector(".section-heading-fill"));

          gsap.fromTo(
            revealItems,
            { opacity: 0, y: 34 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.075,
              ease: "power3.out",
              clearProps: "opacity,transform",
              scrollTrigger: { trigger: group, start: "top 82%", once: true },
            },
          );
        });

        const rule = section.querySelector<HTMLElement>("[data-process-rule]");
        if (rule) {
          gsap.fromTo(
            rule,
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: "none",
              transformOrigin: "left center",
              scrollTrigger: { trigger: rule, start: "top 84%", end: "top 34%", scrub: 0.7 },
            },
          );
        }

        section.querySelectorAll<HTMLElement>("[data-process-stage]").forEach((stage) => {
          const cells = stage.querySelectorAll<HTMLElement>("[data-process-cell]");
          gsap.from(cells, {
            autoAlpha: 0,
            x: 22,
            duration: 0.68,
            stagger: 0.055,
            ease: "power3.out",
            scrollTrigger: {
              trigger: stage,
              start: "top 88%",
              once: true,
            },
          });
        });

        section.querySelectorAll<HTMLElement>(".section-heading-fill").forEach((heading) => {
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
      }, section);

      return () => context.revert();
    });

    return () => media.revert();
  }, []);

  return ref;
}
