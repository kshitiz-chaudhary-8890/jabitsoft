import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { SiteLoader } from "./SiteLoader";

const todayStamp = () => {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate(),
  ).padStart(2, "0")}`;
};

beforeEach(() => {
  vi.useFakeTimers();
  window.localStorage.clear();
  document.cookie = "jabit-loader-seen=; max-age=0; path=/";
  document.documentElement.style.overflow = "";
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe("SiteLoader", () => {
  it("does not show or lock the page for a visitor already seen today", () => {
    window.localStorage.setItem("jabit-loader-seen", todayStamp());

    render(<SiteLoader />);

    expect(screen.queryByText("JabitSoft.com")).not.toBeInTheDocument();
    expect(document.documentElement.style.overflow).toBe("");
  });
});
