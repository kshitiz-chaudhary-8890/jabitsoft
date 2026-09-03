import { describe, expect, it } from "vitest";

import sitemap from "./sitemap";

describe("sitemap", () => {
  it("publishes the canonical homepage after the route exists", () => {
    expect(sitemap()).toEqual([
      {
        url: "https://jabitsoft.com/",
        changeFrequency: "monthly",
        priority: 1,
      },
    ]);
  });
});
