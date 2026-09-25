import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Reveal, RevealGroup } from "./reveal";

const reducedMotion = vi.hoisted(() => ({ current: false }));

vi.mock("motion/react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("motion/react")>();
  return {
    ...actual,
    useReducedMotion: () => reducedMotion.current,
  };
});

afterEach(() => {
  cleanup();
  reducedMotion.current = false;
});

describe("Reveal", () => {
  it("renders the configured element and content", () => {
    render(
      <Reveal as="p" className="copy" data-testid="revealed-copy">
        Revealed content
      </Reveal>,
    );

    const element = screen.getByTestId("revealed-copy");

    expect(element.tagName).toBe("P");
    expect(element).toHaveClass("copy");
    expect(element).toHaveTextContent("Revealed content");
  });

  it("renders settled content without an animation when motion is reduced", () => {
    reducedMotion.current = true;

    render(<Reveal as="p">Settled content</Reveal>);

    const element = screen.getByText("Settled content");

    expect(element.tagName).toBe("P");
    expect(element.getAttribute("style") ?? "").not.toContain("opacity: 0");
  });
});

describe("RevealGroup", () => {
  it("renders direct children as elements with group styling", () => {
    render(
      <RevealGroup className="grid">
        <p data-testid="first-child">First child</p>
        <p data-testid="second-child">Second child</p>
      </RevealGroup>,
    );

    const group = screen.getByTestId("first-child").parentElement;
    const first = screen.getByTestId("first-child");
    const second = screen.getByTestId("second-child");

    expect(group).toHaveClass("grid");
    expect(first.tagName).toBe("P");
    expect(second.tagName).toBe("P");
    expect(first).toHaveTextContent("First child");
    expect(second).toHaveTextContent("Second child");
  });

  it("renders children in their settled state when motion is reduced", () => {
    reducedMotion.current = true;

    render(
      <RevealGroup>
        <p>Settled first</p>
        <p>Settled second</p>
      </RevealGroup>,
    );

    expect(screen.getByText("Settled first").getAttribute("style") ?? "").not.toContain(
      "opacity: 0",
    );
    expect(screen.getByText("Settled second").getAttribute("style") ?? "").not.toContain(
      "opacity: 0",
    );
  });
});
