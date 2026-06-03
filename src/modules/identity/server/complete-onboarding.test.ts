import { describe, it, expect } from "vitest";
import { OnboardingSchema } from "./complete-onboarding";

describe("OnboardingSchema", () => {
  const valid = {
    display_name: "Jane Doe",
    country_iso2: "KE",
    category: "household" as const,
    literacy_self_assessment: "beginner" as const,
  };

  it("accepts a well-formed payload", () => {
    expect(OnboardingSchema.safeParse(valid).success).toBe(true);
  });

  it("accepts optional literacy_self_assessment as null", () => {
    const result = OnboardingSchema.safeParse({
      ...valid,
      literacy_self_assessment: null,
    });
    expect(result.success).toBe(true);
  });

  it("accepts optional literacy_self_assessment as undefined", () => {
    const { literacy_self_assessment: _, ...rest } = valid;
    expect(OnboardingSchema.safeParse(rest).success).toBe(true);
  });

  it("rejects empty display_name", () => {
    const result = OnboardingSchema.safeParse({ ...valid, display_name: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path[0] === "display_name")).toBe(true);
    }
  });

  it("rejects display_name longer than 80 characters", () => {
    const result = OnboardingSchema.safeParse({
      ...valid,
      display_name: "a".repeat(81),
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid country code (wrong length)", () => {
    const result = OnboardingSchema.safeParse({ ...valid, country_iso2: "KEN" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path[0] === "country_iso2")).toBe(true);
    }
  });

  it("rejects lowercase country code", () => {
    const result = OnboardingSchema.safeParse({ ...valid, country_iso2: "ke" });
    expect(result.success).toBe(false);
  });

  it("rejects missing category", () => {
    const result = OnboardingSchema.safeParse({ ...valid, category: undefined });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path[0] === "category")).toBe(true);
    }
  });

  it("rejects invalid category value", () => {
    const result = OnboardingSchema.safeParse({ ...valid, category: "employer" });
    expect(result.success).toBe(false);
  });

  it("rejects invalid literacy_self_assessment value", () => {
    const result = OnboardingSchema.safeParse({
      ...valid,
      literacy_self_assessment: "expert",
    });
    expect(result.success).toBe(false);
  });

  it("trims whitespace from display_name", () => {
    const result = OnboardingSchema.safeParse({
      ...valid,
      display_name: "  Jane Doe  ",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.display_name).toBe("Jane Doe");
    }
  });
});
