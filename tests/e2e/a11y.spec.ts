import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const ROUTES = [
  { name: "Home", path: "/" },
  { name: "Start Reading", path: "/start-reading" },
  { name: "Publications", path: "/publications" },
  { name: "Tools", path: "/tools" },
  { name: "Planner", path: "/tools/planner" },
  { name: "Scorecard", path: "/tools/scorecard" },
  { name: "Reset", path: "/tools/reset" },
  { name: "For Households", path: "/for-households" },
  { name: "About", path: "/about" },
  { name: "Privacy", path: "/privacy" },
  { name: "Terms", path: "/terms" },
  { name: "Login", path: "/auth/login" },
];

for (const route of ROUTES) {
  test(`a11y: ${route.name} (${route.path}) — zero Axe violations`, async ({
    page,
  }) => {
    await page.goto(route.path);
    await page.waitForLoadState("domcontentloaded");

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();

    if (results.violations.length > 0) {
      const summary = results.violations
        .map(
          (v) =>
            `[${v.impact}] ${v.id}: ${v.description}\n  Nodes: ${v.nodes.map((n) => n.target.join(", ")).join(" | ")}`,
        )
        .join("\n");
      throw new Error(
        `${results.violations.length} Axe violation(s) on ${route.path}:\n${summary}`,
      );
    }

    expect(results.violations).toHaveLength(0);
  });
}
