import { test, expect } from "@playwright/test";

test("consent: banner visible on first load with no cookie", async ({
  page,
  context,
}) => {
  await context.clearCookies();
  await page.goto("/", { waitUntil: "domcontentloaded", timeout: 60000 });

  await expect(page.getByRole("button", { name: /accept/i }).first()).toBeVisible({ timeout: 10000 });
});

test("consent: PostHog requests blocked before Accept", async ({
  page,
  context,
}) => {
  await context.clearCookies();

  const posthogRequests: string[] = [];
  page.on("request", (req) => {
    if (req.url().includes("posthog") || req.url().includes("ph-capture")) {
      posthogRequests.push(req.url());
    }
  });

  await page.goto("/", { waitUntil: "domcontentloaded", timeout: 60000 });
  // wait briefly for any deferred network requests
  await page.waitForTimeout(2000);

  expect(posthogRequests).toHaveLength(0);
});

test("consent: banner hidden after Accept, cookie set", async ({
  page,
  context,
}) => {
  await context.clearCookies();
  await page.goto("/", { waitUntil: "domcontentloaded", timeout: 60000 });

  const acceptBtn = page.getByRole("button", { name: /accept/i }).first();
  await expect(acceptBtn).toBeVisible({ timeout: 10000 });
  await acceptBtn.click();

  // Wait for banner to disappear
  await expect(acceptBtn).not.toBeVisible({ timeout: 5000 });

  const cookies = await context.cookies();
  const consentCookie = cookies.find((c) => c.name === "eili_consent");
  expect(consentCookie).toBeDefined();
  expect(consentCookie?.value).toBe("accepted");
});

test("consent: banner does not appear when eili_consent=granted cookie is present", async ({
  page,
  context,
}) => {
  await context.clearCookies();
  await context.addCookies([
    {
      name: "eili_consent",
      value: "accepted",
      domain: "localhost",
      path: "/",
    },
  ]);

  await page.goto("/", { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(500);

  await expect(page.getByRole("button", { name: /accept/i })).toHaveCount(0);
});
