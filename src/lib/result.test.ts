import { describe, it, expect } from "vitest";
import { ok, err, type Result } from "./result";

describe("Result type", () => {
  it("ok() returns a success result", () => {
    const result = ok(42);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toBe(42);
    }
  });

  it("err() returns a failure result", () => {
    const result = err(new Error("fail"));
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.message).toBe("fail");
    }
  });

  it("narrows type correctly", () => {
    const result: Result<string, Error> = ok("hello");
    if (result.ok) {
      const value: string = result.value;
      expect(value).toBe("hello");
    }
  });
});
