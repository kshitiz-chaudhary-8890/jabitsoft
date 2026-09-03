import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";

import { Header } from "./Header";

afterEach(cleanup);

describe("Header", () => {
  it("preserves the approved navigation labels and hash destinations", () => {
    render(<Header />);

    expect(screen.getByRole("link", { name: "JabitSoft home" })).toHaveAttribute("href", "/");

    const navigation = screen.getByRole("navigation", { name: "Primary navigation" });
    const topLevelItems = navigation.querySelectorAll("[data-nav-item]");

    expect([...topLevelItems].map(({ textContent }) => textContent?.trim())).toEqual([
      "About",
      "Portfolio",
      "Services",
      "Careers",
      "Blog",
      "Contact",
    ]);
    expect(
      [...navigation.querySelectorAll<HTMLAnchorElement>("a[data-nav-item]")].map(
        ({ textContent, hash }) => [textContent, hash],
      ),
    ).toEqual([
      ["About", "#about"],
      ["Portfolio", "#works"],
      ["Careers", "#careers"],
      ["Blog", "#blog"],
      ["Contact", "#contact"],
    ]);
    expect(screen.queryByRole("link", { name: "Home" })).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Services" }).querySelector("svg"),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Contact" })).toHaveLength(2);
  });

  it("opens the Services menu and exposes all approved service routes", async () => {
    const user = userEvent.setup();
    render(<Header />);

    const trigger = screen.getByRole("button", { name: "Services" });
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

  it("opens the mobile navigation and closes it after a navigation choice", async () => {
    const user = userEvent.setup();
    render(<Header />);

    const toggle = screen.getByRole("button", { name: "Open menu" });
    await user.click(toggle);

    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(toggle).toHaveAccessibleName("Close menu");

    await user.click(screen.getByRole("link", { name: "Portfolio" }));

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

    expect(await screen.findByRole("button", { name: "Services" })).toHaveAttribute(
      "aria-current",
      "location",
    );

    window.history.replaceState(null, "", "/");
  });
});
