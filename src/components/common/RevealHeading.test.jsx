import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import RevealHeading from "./RevealHeading.jsx";

afterEach(cleanup);

describe("RevealHeading", () => {
  it("preserves heading semantics and exposes one accessible label", () => {
    render(
      <RevealHeading as="h2" id="recent-works-title">
        Recent Works
      </RevealHeading>,
    );

    const heading = screen.getByRole("heading", {
      level: 2,
      name: "Recent Works",
    });

    expect(heading).toHaveAttribute("id", "recent-works-title");
    expect(heading.querySelector("[data-reveal-visual]"))
      .toHaveAttribute("aria-hidden", "true");
    expect(heading.querySelectorAll("[data-reveal-word]")).toHaveLength(2);
    expect(heading.querySelectorAll("[data-reveal-char]")).toHaveLength(11);
  });

  it("preserves nested hero structure and void elements", () => {
    render(
      <RevealHeading as="h1" id="hero-title" aria-label="Our Engineers Build">
        <span className="hero-line">
          Our Engineers <span className="inline-image"><img src="/hero.jpg" alt="" /></span> Build
        </span>
      </RevealHeading>,
    );

    const heading = screen.getByRole("heading", {
      level: 1,
      name: "Our Engineers Build",
    });

    expect(heading.querySelector(".hero-line")).toBeInTheDocument();
    expect(heading.querySelector(".inline-image img"))
      .toHaveAttribute("src", "/hero.jpg");
  });
});
