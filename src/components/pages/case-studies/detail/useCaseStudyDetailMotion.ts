"use client";

import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useCaseStudyDetailMotion(rootRef: RefObject<HTMLDivElement | null>) {
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        const heroTimeline = gsap.timeline({ defaults: { ease: "power4.out" } });
        heroTimeline
          .from("[data-detail-copy]", {
            autoAlpha: 0,
            y: 30,
            duration: 0.78,
            stagger: 0.09,
          })
          .from(
            "[data-detail-word]",
            {
              yPercent: 112,
              rotateX: -16,
              transformOrigin: "50% 100%",
              duration: 0.9,
              stagger: 0.045,
            },
            0.08,
          )
          .fromTo(
            "[data-detail-hero-media]",
            { clipPath: "inset(0 0 100% 0)", y: 34 },
            { clipPath: "inset(0 0 0% 0)", y: 0, duration: 1.05 },
            0.3,
          )
          .fromTo(
            "[data-detail-hero-image]",
            { scale: 1.12 },
            { scale: 1.03, duration: 1.25 },
            0.3,
          );

        gsap.from("[data-detail-sidebar] > *", {
          autoAlpha: 0,
          y: 36,
          duration: 0.75,
          stagger: 0.08,
          ease: "power4.out",
          scrollTrigger: {
            trigger: "[data-detail-sidebar]",
            start: "top 91%",
            once: true,
          },
        });

        gsap.utils.toArray<HTMLElement>("[data-detail-chapter]").forEach((chapter) => {
          const line = chapter.querySelector<HTMLElement>("header i");
          const paragraphs = chapter.querySelectorAll<HTMLElement>("[data-detail-paragraph]");
          const chapterMedia = chapter.querySelector<HTMLElement>("[data-detail-media]");

          if (line) {
            gsap.from(line, {
              scaleX: 0,
              transformOrigin: "left center",
              ease: "none",
              scrollTrigger: {
                trigger: line,
                start: "top 92%",
                end: "top 68%",
                scrub: 0.45,
              },
            });
          }

          gsap.from(paragraphs, {
            autoAlpha: 0,
            y: 26,
            duration: 0.68,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: chapter,
              start: "top 86%",
              once: true,
            },
          });

          if (chapterMedia) {
            gsap.fromTo(
              chapterMedia,
              { clipPath: "inset(0 0 100% 0)" },
              {
                clipPath: "inset(0 0 0% 0)",
                duration: 0.95,
                ease: "power4.out",
                scrollTrigger: {
                  trigger: chapterMedia,
                  start: "top 90%",
                  once: true,
                },
              },
            );
          }
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

        gsap.utils
          .toArray<HTMLElement>("[data-detail-quote], [data-detail-reveal]")
          .forEach((element) => {
            gsap.from(element, {
              autoAlpha: 0,
              y: 28,
              duration: 0.72,
              ease: "power3.out",
              scrollTrigger: { trigger: element, start: "top 90%", once: true },
            });
          });
      }, root);

      return () => context.revert();
    });

    media.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.to("[data-detail-hero-image]", {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-detail-hero-media]",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.9,
          },
        });

        gsap.utils.toArray<HTMLElement>("[data-detail-image]").forEach((image) => {
          gsap.fromTo(
            image,
            { yPercent: -5, scale: 1.08 },
            {
              yPercent: 5,
              scale: 1.08,
              ease: "none",
              scrollTrigger: {
                trigger: image,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.85,
              },
            },
          );
        });
      }, root);

      return () => context.revert();
    });

    return () => media.revert();
  }, [rootRef]);
}
