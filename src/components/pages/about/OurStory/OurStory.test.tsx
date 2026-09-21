import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi, beforeAll } from "vitest";

vi.mock("gsap", () => ({
  gsap: {
    registerPlugin: vi.fn(),
    set: vi.fn(),
    to: vi.fn(),
    fromTo: vi.fn(),
    context: (fn: () => void) => {
      fn();
      return { revert: vi.fn() };
    },
    timeline: vi.fn(() => ({ to: vi.fn().mockReturnThis() })),
  },
}));
vi.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: { create: vi.fn() },
}));

import { OurStory } from "./OurStory";

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockReturnValue({ matches: true, addEventListener: vi.fn() }),
  });
});

afterEach(() => cleanup());

describe("OurStory", () => {
  it("renders the intro narrative with the promise deck", () => {
    render(<OurStory />);
    expect(screen.getByText("Our Story")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      /Know More About Jabit Soft/i,
    );
    expect(
      screen.getByText(/brilliance isn’t just a promise — it’s our Edge/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Headquartered in Noida/i)).toBeInTheDocument();
  });

  it("renders the compact objective statement", () => {
    render(<OurStory />);
    expect(screen.getByText("Our objective is to")).toBeInTheDocument();
    expect(
      screen.getByText(/Deliver excellence\. Drive growth\. Ensure reliability\./i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Build trust\./i)).toBeInTheDocument();
  });

  it("renders mission, vision and values", () => {
    render(<OurStory />);
    expect(screen.getByRole("heading", { name: "Mission" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Vision" })).toBeInTheDocument();
    expect(screen.getByText("Excellence First")).toBeInTheDocument();
    expect(screen.getByText("Impact Driven")).toBeInTheDocument();
    expect(screen.getByText(/foundation of our culture/i)).toBeInTheDocument();
  });

  it("keeps the our-story anchor id", () => {
    render(<OurStory />);
    expect(screen.getByRole("region", { name: /Know More About Jabit Soft/i })).toHaveAttribute(
      "id",
      "our-story",
    );
  });
});
