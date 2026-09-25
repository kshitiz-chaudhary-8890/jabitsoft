"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAboutHeadingFill, useAboutReveal } from "../useAboutReveal";
import styles from "./OfficeGallery.module.css";

const images = [
  {
    src: "https://ik.imagekit.io/5bwd4hel7/About%20us/Office%20Images/IMG_0656.JPG-scaled.jpeg",
    alt: "Bright modern engineering workspace with open collaborative desks",
    caption: "Open engineering studio configured for rapid cross-functional alignment",
  },
  {
    src: "https://ik.imagekit.io/5bwd4hel7/About%20us/Office%20Images/IMG_0653.JPG.jpeg",
    alt: "Contemporary office lounge prepared for informal discussions",
    caption: "Breakout lounge designed for spontaneous architectural reviews",
  },
  {
    src: "https://ik.imagekit.io/5bwd4hel7/About%20us/Office%20Images/IMG_0655.JPG-scaled.jpeg",
    alt: "Team discussing product roadmap around a meeting table",
    caption: "Sprint planning and technical roadmap review in session",
  },
  {
    src: "https://ik.imagekit.io/5bwd4hel7/About%20us/Office%20Images/IMG_0641.jpeg",
    alt: "Open office interior with ample natural daylight",
    caption: "Natural daylight and quiet zones to protect deep technical focus",
  },
  {
    src: "https://ik.imagekit.io/5bwd4hel7/About%20us/Office%20Images/IMG_0651.JPG.jpeg",
    alt: "Modern high-ceiling engineering lab and tech workspace",
    caption: "Dedicated hardware and software testing environment",
  },
  {
    src: "https://ik.imagekit.io/5bwd4hel7/About%20us/Office%20Images/IMG_0654.JPG.jpeg",
    alt: "Quiet meeting room with acoustic glass partitions",
    caption: "Acoustic-treated conference room for focused client strategy syncs",
  },
  {
    src: "https://ik.imagekit.io/5bwd4hel7/About%20us/Office%20Images/1761134064537%20(1).jpg",
    alt: "Engineers collaborating inside a spacious design office",
    caption: "Cross-disciplinary design pairing and interaction prototyping",
  },
  {
    src: "https://ik.imagekit.io/5bwd4hel7/About%20us/Office%20Images/IMG_0650.JPG.jpeg",
    alt: "Engineering team conducting architecture review",
    caption: "Core engineering group collaborating on live system topologies",
  },
  {
    src: "https://ik.imagekit.io/5bwd4hel7/About%20us/Office%20Images/DSC08546-scaled.jpg",
    alt: "Minimalist open studio with natural sunlight and ergonomic desks",
    caption: "Ergonomic workstations structured for continuous deep work",
  },
];

const COUNT = images.length;

const FOCUSABLE_SELECTOR = [
  "button:not([disabled])",
  "[href]",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

const tileClasses = [
  styles.tileOne,
  styles.tileTwo,
  styles.tileThree,
  styles.tileFour,
  styles.tileFive,
  styles.tileSix,
  styles.tileSeven,
  styles.tileEight,
  styles.tileNine,
];

export function OfficeGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const focusRestoreRef = useRef<HTMLElement | null>(null);

  const [activeImage, setActiveImage] = useState<number | null>(null);
  const reducedMotion = useReducedMotion();
  const portalRoot = typeof document === "undefined" ? null : document.body;
  useAboutReveal(sectionRef);
  useAboutHeadingFill(sectionRef);

  const isOpen = activeImage !== null;
  const activeIndex = activeImage ?? 0;

  const openGallery = useCallback((index: number) => setActiveImage(index), []);
  const closeGallery = useCallback(() => setActiveImage(null), []);
  const showPrevious = useCallback(() => {
    setActiveImage((current) => (current === null ? 0 : (current - 1 + COUNT) % COUNT));
  }, []);
  const showNext = useCallback(() => {
    setActiveImage((current) => (current === null ? 0 : (current + 1) % COUNT));
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!reducedMotion) {
        gsap.from("[data-gallery-tile]", {
          opacity: 0,
          y: 30,
          scale: 0.985,
          duration: 0.8,
          stagger: 0.055,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "[data-gallery-grid]",
            start: "top 82%",
            once: true,
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    if (document.activeElement instanceof HTMLElement) {
      focusRestoreRef.current = document.activeElement;
    }

    requestAnimationFrame(() => closeButtonRef.current?.focus());
  }, [isOpen]);

  useEffect(() => {
    if (activeImage === null) return;

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeGallery();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        showPrevious();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        showNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImage, closeGallery, showPrevious, showNext]);

  const trapFocus = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab" || !dialogRef.current) return;

    const focusable = Array.from(
      dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
    ).filter((element) => element.offsetParent !== null || element === document.activeElement);

    if (focusable.length === 0) {
      event.preventDefault();
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <section
      ref={sectionRef}
      id="office-gallery"
      className={styles.section}
      aria-labelledby="gallery-title"
    >
      <div className={styles.shell}>
        <header className={styles.intro}>
          <p data-about-intro className={styles.eyebrow}>
            Inside JabitSoft
          </p>

          <h2 id="gallery-title">
            <span data-about-heading-fill className="section-heading-fill">
              Agency snaps
            </span>
          </h2>

          <p data-about-intro className={styles.description}>
            From lively team outings and playful office moments to special celebrations, these
            photos showcase our vibrant culture and the strong bonds that bring us together.
          </p>
        </header>

        <div
          className={styles.bentoGrid}
          data-gallery-grid
          aria-label="Inside JabitSoft image gallery"
        >
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              data-gallery-tile
              className={`${styles.tile} ${tileClasses[index]}`}
              onClick={() => openGallery(index)}
              aria-label={`Open image ${index + 1} of ${COUNT}: ${image.caption}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 767px) 100vw, (max-width: 1100px) 50vw, 60vw"
                className={styles.tileImage}
                priority={index === 0}
              />
            </button>
          ))}
        </div>
      </div>

      {/* AnimatePresence filters ReactPortal objects, so the portal must wrap it. */}
      {portalRoot &&
        createPortal(
          <AnimatePresence
            onExitComplete={() => {
              focusRestoreRef.current?.focus?.();
              focusRestoreRef.current = null;
            }}
          >
            {isOpen && (
              <div
                key="office-gallery-lightbox"
                ref={dialogRef}
                className={styles.modalBackdrop}
                role="dialog"
                aria-modal="true"
                aria-label="Gallery image viewer"
                onClick={closeGallery}
                onKeyDown={trapFocus}
              >
                <motion.div
                  className={styles.backdropBg}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reducedMotion ? 0 : 0.28, ease: "easeOut" }}
                />

                <motion.div
                  className={styles.modalContent}
                  onClick={(event) => event.stopPropagation()}
                  initial={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.965, y: 14 }}
                  animate={reducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
                  exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.975, y: 8 }}
                  transition={{
                    duration: reducedMotion ? 0 : 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <button
                    ref={closeButtonRef}
                    className={styles.closeBtn}
                    type="button"
                    onClick={closeGallery}
                    aria-label="Close viewer (Escape)"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>

                  <div className={styles.imageFrame}>
                    <AnimatePresence initial={false} mode="wait">
                      <motion.div
                        key={activeIndex}
                        className={styles.imageStage}
                        initial={{ opacity: 0, scale: 1.015 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.99 }}
                        transition={{
                          duration: reducedMotion ? 0 : 0.2,
                          ease: "easeOut",
                        }}
                      >
                        <Image
                          src={images[activeIndex].src}
                          alt={images[activeIndex].alt}
                          fill
                          sizes="92vw"
                          priority
                          className={styles.modalImage}
                        />
                      </motion.div>
                    </AnimatePresence>

                    <button
                      className={`${styles.navControl} ${styles.navPrev}`}
                      type="button"
                      onClick={showPrevious}
                      aria-label="Previous image (Left Arrow)"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                    </button>

                    <button
                      className={`${styles.navControl} ${styles.navNext}`}
                      type="button"
                      onClick={showNext}
                      aria-label="Next image (Right Arrow)"
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          portalRoot,
        )}
    </section>
  );
}
