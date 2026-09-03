import { describe, expect, it } from "vitest";

import { resolveSiteUrl, rootMetadata } from "./metadata";

describe("resolveSiteUrl", () => {
  it("uses the configured absolute site URL without a trailing slash", () => {
    expect(resolveSiteUrl("https://www.jabitsoft.com/").href).toBe("https://www.jabitsoft.com/");
  });

  it("falls back to the production origin when configuration is missing", () => {
    expect(resolveSiteUrl(undefined).href).toBe("https://jabitsoft.com/");
  });

  it("falls back safely when configuration is not an absolute URL", () => {
    expect(resolveSiteUrl("jabitsoft.com").href).toBe("https://jabitsoft.com/");
  });
});

describe("rootMetadata", () => {
  it("exposes the approved JabitSoft favicon", () => {
    expect(rootMetadata.icons).toEqual(
      expect.objectContaining({
        icon: expect.arrayContaining([
          expect.objectContaining({ type: "image/png" }),
        ]),
      }),
    );
  });
});
