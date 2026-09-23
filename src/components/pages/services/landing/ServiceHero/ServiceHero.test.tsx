import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi, beforeAll } from "vitest";

vi.mock("gsap", () => ({
  gsap: {
    registerPlugin: vi.fn(),
    set: vi.fn(),
    context: (fn: () => void) => {
      fn();
      return { revert: vi.fn() };
    },
    timeline: vi.fn(() => ({ to: vi.fn().mockReturnThis() })),
  },
}));
vi.mock("gsap/ScrollTrigger", () => ({ ScrollTrigger: {} }));

import { ServiceHero } from "./ServiceHero";

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockReturnValue({ matches: true, addEventListener: vi.fn() }),
  });
});

afterEach(() => cleanup());

describe("ServiceHero", () => {
  it("renders the eyebrow, headline, description and CTAs", () => {
    render(<ServiceHero />);
    expect(screen.getByText("Our Services")).toBeInTheDocument();
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent(/Built for/i);
    expect(heading).toHaveTextContent(/Engineered around your business/i);
    expect(
      screen.getByText(/We pair product thinking, design and engineering/i),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Explore what we build/i })).toHaveAttribute(
      "href",
      "#what-we-build",
    );
    expect(screen.getByRole("link", { name: /Talk to us/i })).toHaveAttribute(
      "href",
      "mailto:hello@jabitsoft.com?subject=New%20Project",
    );
  });

  it("renders the proof strip with verifiable facts", () => {
    render(<ServiceHero />);
    expect(screen.getByRole("list", { name: /Delivery facts/i })).toBeInTheDocument();
    expect(screen.getByText("Six service lines")).toBeInTheDocument();
    expect(screen.getByText("One accountable team")).toBeInTheDocument();
    expect(screen.getByText("Design to deployment")).toBeInTheDocument();
  });

  it("no longer renders the black services grid", () => {
    render(<ServiceHero />);
    expect(screen.queryByRole("link", { name: /Agentic AI Development/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /Cloud Consulting/i })).not.toBeInTheDocument();
  });
});
