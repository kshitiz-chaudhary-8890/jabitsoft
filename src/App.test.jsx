import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import App from "./App";

afterEach(cleanup);

describe("Agero design studio page", () => {
  it("renders the complete reference-inspired journey", () => {
    render(<App />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getAllByText(/jabitsoft/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/recent works/i, { selector: "h2" })).toBeInTheDocument();
    expect(screen.getByText(/what we do/i, { selector: "h2" })).toBeInTheDocument();
    expect(screen.queryByText(/explore pricing/i, { selector: "h2" })).not.toBeInTheDocument();
    expect(screen.getByText(/your questions, answered/i, { selector: "h2" })).toBeInTheDocument();
    expect(screen.getByText(/got a project in mind/i)).toBeInTheDocument();
  });

  it("registers the showcase as the GSAP scroll-scale scene", () => {
    render(<App />);
    expect(screen.getByRole("region", { name: /selected design showcase/i }))
      .toHaveAttribute("data-scroll-scale", "gsap");
  });

  it("renders one Recent Works section with a single GSAP owner", () => {
    render(<App />);

    const headings = screen.getAllByRole("heading", { name: /recent works/i });
    expect(headings).toHaveLength(1);

    const section = screen.getByRole("region", { name: /recent works/i });
    expect(section).toHaveAttribute("data-recent-works-scroll", "gsap");
    expect(screen.queryByText("Archin")).not.toBeInTheDocument();
  });

  it("opens and closes the mobile navigation", async () => {
    const user = userEvent.setup();
    render(<App />);
    const toggle = screen.getByRole("button", { name: /open menu/i });
    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("navigation", { name: /primary navigation/i })).toHaveClass("is-open");
    await user.click(screen.getByRole("button", { name: /close menu/i }));
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("renders services showcase, testimonials, and accordion content", async () => {
    const user = userEvent.setup();
    render(<App />);
    expect(screen.getByRole("heading", { name: /web platforms/i })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /next testimonial/i }));
    expect(screen.getByText(/whole process felt effortless/i)).toBeVisible();
    const question = screen.getByRole("button", { name: /how do i start a project/i });
    await user.click(question);
    expect(question).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(/start with the contact form below/i)).toBeVisible();
  });

  it("renders the five finalized service cards inside the horizontal scroll stage", () => {
    render(<App />);

    const stage = screen.getByRole("region", {
      name: /services horizontal showcase/i,
    });

    expect(stage).toHaveAttribute("data-horizontal-scroll", "gsap");
    expect(
      screen.getAllByRole("group", { name: /service \d of 5/i }),
    ).toHaveLength(5);
    expect(
      screen.getByRole("heading", { name: /erp & custom software/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /agentic ai/i }),
    ).toBeInTheDocument();
  });
});
