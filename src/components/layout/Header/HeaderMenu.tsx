"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import { headerNavigation, industryNavigation, serviceNavigation } from "@/data/navigation";

import styles from "./Header.module.css";

type MenuKind = "industries" | "services";

const megaMenus = {
  industries: {
    title: "Built around the way your industry operates.",
    description:
      "We start with the business system, then bring the right product, engineering, and growth expertise around it.",
    items: industryNavigation,
    spotlight: {
      title: "Not sure where you fit?",
      description: "Tell us your stack and stage — we will scope the right engagement together.",
      ctaLabel: "Talk to engineering",
      ctaHref: "/contact-us",
    },
    viewAllLabel: "View all industries",
  },
  services: {
    title: "One delivery team, six connected capabilities.",
    description:
      "Choose a starting point, or bring us the business problem. We will shape the right path together.",
    items: serviceNavigation,
    spotlight: {
      title: "Agentic AI Development",
      description:
        "Autonomous AI systems that plan, act, and integrate with real business workflows. Fixed scope before you commit.",
      ctaLabel: "Book a scoping call",
      ctaHref: "/contact-us",
    },
    viewAllLabel: "View all services",
  },
} as const;

function ArrowIcon({
  kind = "right",
  className,
}: {
  kind?: "right" | "up-right";
  className?: string;
}) {
  if (kind === "up-right") {
    return (
      <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M3.5 12.5 12.5 3.5M6 3.5h6.5V10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M2.75 8h10.5M9 3.75 13.25 8 9 12.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HeaderMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<MenuKind | null>(null);
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const pathname = usePathname();
  const navigationId = useId();
  const menuRef = useRef<HTMLElement>(null);
  const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearMenuTimers = () => {
    if (openTimerRef.current) clearTimeout(openTimerRef.current);
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    openTimerRef.current = null;
    closeTimerRef.current = null;
  };

  useEffect(() => {
    const closeOnPointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setOpenMenu(null);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        clearMenuTimers();
        setIsOpen(false);
        setOpenMenu(null);
      }
    };
    const syncLocation = () => {
      const currentPath = pathname ?? window.location.pathname ?? "/";
      if (currentPath === "/services" || currentPath.startsWith("/services/")) {
        setActiveHref("/services");
        return;
      }
      setActiveHref(window.location.hash ? `/${window.location.hash}` : currentPath);
    };

    document.addEventListener("pointerdown", closeOnPointerDown);
    document.addEventListener("keydown", closeOnEscape);
    window.addEventListener("hashchange", syncLocation);
    window.addEventListener("popstate", syncLocation);
    syncLocation();

    return () => {
      clearMenuTimers();
      document.removeEventListener("pointerdown", closeOnPointerDown);
      document.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("hashchange", syncLocation);
      window.removeEventListener("popstate", syncLocation);
    };
  }, [pathname]);

  // Lock body scroll when the mobile drawer is open.
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  // Desktop hover intent: small open delay, generous close delay so moving
  // from the trigger down into the full-width panel never flickers.
  const openMegaMenu = (kind: MenuKind, immediate = false) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = null;
    if (immediate) {
      if (openTimerRef.current) clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
      setOpenMenu(kind);
      return;
    }
    // Already open (e.g. pointer moved from trigger into the panel):
    // stay open with no re-delay so there is no flicker.
    if (openMenu === kind) return;
    // Switching kinds quickly: newest hover intent wins.
    if (openTimerRef.current) clearTimeout(openTimerRef.current);
    openTimerRef.current = setTimeout(() => {
      openTimerRef.current = null;
      setOpenMenu(kind);
    }, 110);
  };

  const scheduleMenuClose = () => {
    if (openTimerRef.current) clearTimeout(openTimerRef.current);
    openTimerRef.current = null;
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      closeTimerRef.current = null;
      setOpenMenu(null);
    }, 320);
  };

  const selectDestination = (href: string) => {
    clearMenuTimers();
    setIsOpen(false);
    setOpenMenu(null);
    setActiveHref(href);
  };

  const contact = headerNavigation.find(
    (item): item is Extract<(typeof headerNavigation)[number], { isAction: true }> =>
      "isAction" in item && item.isAction,
  );

  // Industries and Services both resolve to /services, so matching href alone
  // would mark both triggers active on the services route. Only the "Services"
  // trigger may take the active state there; the Industries trigger never does.
  const isItemActive = (item: (typeof headerNavigation)[number]): boolean => {
    if (activeHref === null) return false;
    if ("menu" in item && item.menu === "industries") return false;
    return "href" in item && activeHref === item.href;
  };

  return (
    <>
      {/* Desktop + mobile scrim. Clicking it closes any open menu. */}
      <button
        type="button"
        aria-hidden="true"
        tabIndex={-1}
        className={`${styles.scrim}${openMenu || isOpen ? ` ${styles.scrimVisible}` : ""}`}
        onClick={() => {
          setIsOpen(false);
          setOpenMenu(null);
        }}
      />
      <nav
        ref={menuRef}
        id={navigationId}
        className={`${styles.navLinks}${isOpen ? ` ${styles.isOpen}` : ""}`}
        aria-label="Primary navigation"
      >
        {/* Mobile drawer header (visible ≤1024px only via CSS) */}
        <div className={styles.drawerHead} aria-hidden={!isOpen}>
          <span className={styles.drawerTitle}>Menu</span>
          <button
            className={styles.drawerClose}
            type="button"
            aria-label="Close menu"
            onClick={() => {
              clearMenuTimers();
              setIsOpen(false);
              setOpenMenu(null);
            }}
          >
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M3 3l10 10M13 3L3 13"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {headerNavigation.map((item) => {
          const isAction = "isAction" in item && item.isAction;
          const menuKind = "menu" in item ? (item.menu as MenuKind) : null;

          if (menuKind) {
            const menu = megaMenus[menuKind];
            const menuId = `${navigationId}-${menuKind}`;
            const isMenuOpen = openMenu === menuKind;
            const itemHref = "href" in item ? item.href : undefined;

            return (
              <div
                className={styles.megaMenuRoot}
                key={item.label}
                onMouseEnter={() => openMegaMenu(menuKind)}
                onMouseLeave={scheduleMenuClose}
                onBlurCapture={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node | null))
                    scheduleMenuClose();
                }}
              >
                <div className={styles.menuTriggerRow}>
                  {itemHref ? (
                    <Link
                      className={styles.menuLink}
                      href={itemHref}
                      data-nav-item
                      aria-current={isItemActive(item) ? "page" : undefined}
                      onClick={() => selectDestination(itemHref)}
                      onFocus={() => openMegaMenu(menuKind, true)}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      className={styles.menuLink}
                      type="button"
                      data-nav-item
                      aria-expanded={isMenuOpen}
                      aria-controls={menuId}
                      onClick={() => setOpenMenu(isMenuOpen ? null : menuKind)}
                      onFocus={() => openMegaMenu(menuKind, true)}
                    >
                      {item.label}
                    </button>
                  )}
                  <button
                    className={styles.menuToggle}
                    type="button"
                    aria-label={`Open ${item.label.toLowerCase()} submenu`}
                    aria-expanded={isMenuOpen}
                    aria-controls={menuId}
                    onClick={() => {
                      // Desktop uses hover to open; a click should keep it open
                      // (hover already fires before click). Inside the mobile
                      // drawer there is no hover, so the chevron toggles.
                      clearMenuTimers();
                      if (isOpen) {
                        setOpenMenu((current) => (current === menuKind ? null : menuKind));
                      } else {
                        setOpenMenu(menuKind);
                      }
                    }}
                  >
                    <svg
                      className={`${styles.dropdownArrow}${isMenuOpen ? ` ${styles.dropdownArrowOpen}` : ""}`}
                      viewBox="0 0 12 12"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path d="M2.5 4.25 6 7.75l3.5-3.5" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </button>
                </div>
                <section
                  id={menuId}
                  className={`${styles.megaMenu}${isMenuOpen ? ` ${styles.megaMenuOpen}` : ""}`}
                  aria-label={`${item.label} navigation`}
                  aria-hidden={!isMenuOpen}
                  inert={!isMenuOpen}
                >
                  <div className={styles.megaInner}>
                    <div className={styles.megaMain}>
                      <div className={styles.megaIntro}>
                        <strong className={styles.megaTitle}>{menu.title}</strong>
                        <p className={styles.megaDescription}>{menu.description}</p>
                        {itemHref ? (
                          <Link
                            className={styles.megaViewAll}
                            href={itemHref}
                            onClick={() => selectDestination(itemHref)}
                          >
                            {menu.viewAllLabel}
                            <ArrowIcon kind="up-right" className={styles.arrowUpRight} />
                          </Link>
                        ) : null}
                      </div>
                      <div className={styles.megaGrid}>
                        {menu.items.map((entry) => (
                          <Link
                            className={styles.megaItem}
                            href={entry.href}
                            key={entry.href}
                            onClick={() => selectDestination(entry.href)}
                          >
                            <span className={styles.megaItemBody}>
                              <span className={styles.megaItemTitle}>
                                {entry.label}
                                <span className={styles.megaItemArrowCircle}>
                                  <ArrowIcon kind="right" className={styles.megaItemArrow} />
                                </span>
                              </span>
                              <span className={styles.megaItemDescription}>
                                {entry.description}
                              </span>
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                    <aside className={styles.megaSpotlight} aria-label="Featured">
                      <strong className={styles.spotlightTitle}>{menu.spotlight.title}</strong>
                      <p className={styles.spotlightCopy}>{menu.spotlight.description}</p>
                      <Link
                        className={styles.spotlightCta}
                        href={menu.spotlight.ctaHref}
                        data-site-button
                        data-button-variant="primary"
                        data-button-theme="dark"
                        data-button-size="compact"
                        onClick={() => selectDestination(menu.spotlight.ctaHref)}
                      >
                        {menu.spotlight.ctaLabel}
                        <ArrowIcon className={styles.spotlightCtaArrow} />
                      </Link>
                    </aside>
                    <div className={styles.megaFooter}>
                      <span className={styles.megaHelp}>
                        Need help choosing?{" "}
                        <Link href="/contact-us" onClick={() => selectDestination("/contact-us")}>
                          Book a 15 minute call
                          <ArrowIcon className={styles.arrowSmall} />
                        </Link>
                      </span>
                      <span className={styles.megaQuickLinks}>
                        <Link
                          href="/case-studies"
                          onClick={() => selectDestination("/case-studies")}
                        >
                          Case studies
                        </Link>
                        <Link href="/#blog" onClick={() => selectDestination("/#blog")}>
                          Blog
                        </Link>
                      </span>
                    </div>
                  </div>
                </section>
              </div>
            );
          }

          if (!("href" in item)) return null;

          return (
            <Link
              className={isAction ? styles.mobileContact : undefined}
              href={item.href}
              data-nav-item
              aria-current={activeHref === item.href ? "location" : undefined}
              onClick={() => selectDestination(item.href)}
              key={item.label}
            >
              {item.label}
            </Link>
          );
        })}

        {/* Mobile drawer footer (visible ≤1024px only via CSS) */}
        <div className={styles.drawerFoot}>
          <p className={styles.drawerNote}>Fixed scope before you commit. NDA on request.</p>
        </div>
      </nav>
      {contact ? (
        <Link
          className={`${styles.button} ${styles.buttonDark} ${styles.navContact}`}
          href={contact.href}
          data-site-button
          data-button-variant="primary"
          data-button-size="compact"
          aria-current={activeHref === contact.href ? "location" : undefined}
          onClick={() => selectDestination(contact.href)}
        >
          {contact.label}
        </Link>
      ) : null}
      <button
        className={`${styles.menuButton}${isOpen ? ` ${styles.menuButtonOpen}` : ""}`}
        type="button"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls={navigationId}
        onClick={() => {
          clearMenuTimers();
          setIsOpen((open) => !open);
          setOpenMenu(null);
        }}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>
    </>
  );
}
