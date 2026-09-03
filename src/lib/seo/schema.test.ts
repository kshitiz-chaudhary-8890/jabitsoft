import { describe, expect, it } from "vitest";

import { serializeJsonLd } from "./schema";

describe("serializeJsonLd", () => {
  it("escapes opening angle brackets to keep JSON-LD out of HTML parsing", () => {
    expect(serializeJsonLd({ name: "</script><script>alert(1)</script>" })).toBe(
      '{"name":"\\u003c/script>\\u003cscript>alert(1)\\u003c/script>"}',
    );
  });
});
