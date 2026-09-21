import { describe, expect, it } from "vitest";

import sitemap from "./sitemap";

describe("sitemap", () => {
  it("publishes the canonical public routes", () => {
    expect(sitemap()).toEqual(
      expect.arrayContaining([
        {
          url: "https://jabitsoft.com/",
        },
        {
          url: "https://jabitsoft.com/about-us",
        },
        {
          url: "https://jabitsoft.com/services",
        },
        {
          url: "https://jabitsoft.com/contact-us",
        },
        {
          url: "https://jabitsoft.com/blogs",
        },
      ]),
    );
  });
});
