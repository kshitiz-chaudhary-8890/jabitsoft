import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";

import { Header } from "./Header";

afterEach(cleanup);

describe("Header", () => {
  it("preserves the approved navigation labels and destinations", () => {
    render(<Header />);

    expect(screen.getByRole("link", { name: "JabitSoft home" })).toHaveAttribute("href", "/");

    const navigation = screen.getByRole("navigation", { name: "Primary navigation" });
    const topLevelItems = navigation.querySelectorAll("[data-nav-item]");

    expect([...topLevelItems].map(({ textContent }) => textContent?.trim())).toEqual([
      "About",
      "Industries",
      "Services",
      "Case Studies",
      "Blog",
      "Contact Us",
    ]);
    expect(
      [...navigation.querySelectorAll<HTMLAnchorElement>("a[data-nav-item]")].map(
        ({ textContent, pathname, hash }) => [textContent, pathname, hash],
      ),
    ).toEqual([
      ["About", "/about-us", ""],
      ["Industries", "/services", ""],
      ["Services", "/services", ""],
      ["Case Studies", "/case-studies", ""],
      ["Blog", "/blogs", ""],
      ["Contact Us", "/contact-us", ""],
    ]);
    expect(screen.queryByRole("link", { name: "Home" })).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Open services submenu" }).querySelector("svg"),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Open industries submenu" }).querySelector("svg")).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Contact Us" })).toHaveLength(2);
  });

  it("opens the Services menu and exposes all approved service routes", async () => {
    const user = userEvent.setup();
    render(<Header />);

    const trigger = screen.getByRole("button", { name: "Open services submenu" });
    await user.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("link", { name: /Agentic AI Development/i })).toHaveAttribute(
      "href",
      "/services/agentic-ai-development",
    );
    expect(screen.getByRole("link", { name: /Cloud Consulting/i })).toHaveAttribute(
      "href",
      "/services/cloud-consulting",
    );
    expect(screen.getByRole("link", { name: /Mobile Application Development/i })).toHaveAttribute(
      "href",
      "/services/mobile-application-development",
    );
    expect(screen.getByRole("link", { name: /ERP Services/i })).toHaveAttribute(
      "href",
      "/services/erp-services",
    );
    expect(screen.getByRole("link", { name: /SEO \/ Digital Marketing/i })).toHaveAttribute(
      "href",
      "/services/seo-digital-marketing",
    );
    expect(screen.getByRole("link", { name: /Website Solutions/i })).toHaveAttribute(
      "href",
      "/services/website-solutions",
    );
  });

  it("opens the Industries menu with links that stay on the services route", async () => {
    const user = userEvent.setup();
    render(<Header />);

    const trigger = screen.getByRole("button", { name: "Open industries submenu" });
    await user.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("link", { name: /SaaS & Platforms/i })).toHaveAttribute(
      "href",
      "/services?industry=saas",
    );
  });

  it("opens the mobile navigation and closes it after a navigation choice", async () => {
    const user = userEvent.setup();
    render(<Header />);

    const toggle = screen.getByRole("button", { name: "Open menu" });
    await user.click(toggle);

    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(toggle).toHaveAccessibleName("Close menu");

    await user.click(screen.getByRole("link", { name: "Case Studies" }));

    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveAccessibleName("Open menu");
  });

  it("closes the mobile navigation with Escape", async () => {
    const user = userEvent.setup();
    render(<Header />);

    const toggle = screen.getByRole("button", { name: "Open menu" });
    await user.click(toggle);
    await user.keyboard("{Escape}");

    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("marks the current hash section as active", async () => {
    window.history.replaceState(null, "", "/#services");

    render(<Header />);

    expect(await screen.findByRole("link", { name: "Services" })).toHaveAttribute("href", "/services");

    window.history.replaceState(null, "", "/");
  });
});
