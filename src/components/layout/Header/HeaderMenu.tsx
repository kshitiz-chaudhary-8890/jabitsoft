"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

import { headerNavigation, serviceNavigation } from "@/data/navigation";

import styles from "./Header.module.css";

export function HeaderMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const navigationId = useId();
  const servicesId = useId();
  const servicesRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openedByHoverRef = useRef(false);

  useEffect(() => {
    const closeOnPointerDown = (event: PointerEvent) => {
      if (!servicesRef.current?.contains(event.target as Node)) setServicesOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setServicesOpen(false);
      }
    };
    const syncLocation = () => {
      setActiveHref(
        window.location.pathname.startsWith("/services/")
          ? "#services"
          : window.location.hash || null,
      );
    };

    document.addEventListener("pointerdown", closeOnPointerDown);
    document.addEventListener("keydown", closeOnEscape);
    window.addEventListener("hashchange", syncLocation);
    window.addEventListener("popstate", syncLocation);
    syncLocation();

    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
      document.removeEventListener("pointerdown", closeOnPointerDown);
      document.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("hashchange", syncLocation);
      window.removeEventListener("popstate", syncLocation);
    };
  }, []);

  const openServices = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setServicesOpen(true);
  };

  const scheduleServicesClose = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);

    closeTimerRef.current = setTimeout(() => {
      setServicesOpen(false);
      closeTimerRef.current = null;
    }, 160);
  };

  const selectDestination = (href: string) => {
    setIsOpen(false);
    setServicesOpen(false);
    setActiveHref(href);
  };

  const contact = headerNavigation.find((item) => "isAction" in item && item.isAction);

  return (
    <>
      <nav
        id={navigationId}
        className={`${styles.navLinks}${isOpen ? ` ${styles.isOpen}` : ""}`}
        aria-label="Primary navigation"
      >
        {headerNavigation.map((item) => {
          const isServices = "hasDropdown" in item && item.hasDropdown;
          const isAction = "isAction" in item && item.isAction;

          if (isServices) {
            return (
              <div
                className={styles.servicesMenu}
                ref={servicesRef}
                key={item.label}
                onMouseEnter={() => {
                  openedByHoverRef.current = true;
                  openServices();
                }}
                onMouseLeave={() => {
                  openedByHoverRef.current = false;
                  scheduleServicesClose();
                }}
                onBlurCapture={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                    scheduleServicesClose();
                  }
                }}
              >
                <button
                  className={`${styles.navTrigger} ${styles.servicesLink}`}
                  type="button"
                  data-nav-item
                  aria-expanded={servicesOpen}
                  aria-controls={servicesId}
                  aria-current={activeHref === item.href ? "location" : undefined}
                  onClick={(event) => {
                    if (closeTimerRef.current) {
                      clearTimeout(closeTimerRef.current);
                      closeTimerRef.current = null;
                    }

                    if (event.detail > 0 && openedByHoverRef.current && servicesOpen) {
                      openedByHoverRef.current = false;
                      return;
                    }

                    setServicesOpen((open) => !open);
                  }}
                >
                  {item.label}
                  <svg
                    className={`${styles.dropdownArrow}${servicesOpen ? ` ${styles.dropdownArrowOpen}` : ""}`}
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path d="M2.5 4.25 6 7.75l3.5-3.5" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </button>
                <div
                  id={servicesId}
                  className={`${styles.megaMenu}${servicesOpen ? ` ${styles.megaMenuOpen}` : ""}`}
                  aria-hidden={!servicesOpen}
                  inert={servicesOpen ? undefined : true}
                >
                  <div className={styles.serviceGrid}>
                    {serviceNavigation.map((service) => (
                      <Link
                        className={styles.serviceItem}
                        href={service.href}
                        onClick={() => selectDestination("#services")}
                        key={service.href}
                      >
                        <span className={styles.serviceTitle}>{service.label}</span>
                        <span className={styles.serviceDescription}>{service.description}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          }

          return (
            <a
              className={isAction ? styles.mobileContact : undefined}
              href={item.href}
              data-nav-item
              aria-current={activeHref === item.href ? "location" : undefined}
              onClick={() => selectDestination(item.href)}
              key={item.label}
            >
              {item.label}
            </a>
          );
        })}
      </nav>
      {contact ? (
        <a
          className={`${styles.button} ${styles.buttonDark} ${styles.navContact}`}
          href={contact.href}
          aria-current={activeHref === contact.href ? "location" : undefined}
          onClick={() => selectDestination(contact.href)}
        >
          {contact.label}
        </a>
      ) : null}
      <button
        className={styles.menuButton}
        type="button"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls={navigationId}
        onClick={() => {
          setIsOpen((open) => !open);
          setServicesOpen(false);
        }}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>
    </>
  );
}
