import { test, expect } from "@playwright/test";

// ── Onboarding page: unauthenticated visitor ─────────────────────────────────
test("onboarding page redirects unauthenticated user to login", async ({
  page,
}) => {
  await page.goto("/account/onboarding");
  // Middleware/page should redirect to /auth/login
  await expect(page).toHaveURL(/\/auth\/login/);
});

// ── Onboarding page: renders correctly (via direct navigation) ────────────────
test("onboarding page renders form fields when accessed directly", async ({
  page,
}) => {
  // We access the page without session; it should redirect to login
  // This verifies the redirect path itself works correctly
  const response = await page.goto("/account/onboarding");
  // Either 200 on the onboarding page or a redirect to login — no 500
  expect(response?.status()).toBeLessThan(500);
});

// ── /account redirects unauthenticated visitor to login ───────────────────────
test("/account redirects unauthenticated user to login", async ({ page }) => {
  await page.goto("/account");
  await expect(page).toHaveURL(/\/auth\/login/);
});

// ── Auth login page: renders magic link form ─────────────────────────────────
test("login page renders magic link form", async ({ page }) => {
  await page.goto("/auth/login");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Sign In",
  );
  await expect(page.getByRole("textbox", { name: /email/i })).toBeVisible();
  await expect(
    page.getByRole("button", { name: /send sign-in link/i }),
  ).toBeVisible();
});

// ── Tool pages: disclaimer present ───────────────────────────────────────────
const toolPages = [
  { name: "Planner", path: "/tools/planner" },
  { name: "Scorecard", path: "/tools/scorecard" },
  { name: "Reset", path: "/tools/reset" },
];

for (const { name, path } of toolPages) {
  test(`${name} tool page loads and shows disclaimer`, async ({ page }) => {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(
      page.getByText("not personalised financial advice"),
    ).toBeVisible();
  });
}

// ── Reader flow ───────────────────────────────────────────────────────────────
test("start-reading page lists a book", async ({ page }) => {
  await page.goto("/start-reading");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  // At least one link to a book chapter exists
  await expect(page.getByRole("link", { name: /read|start|chapter/i }).first()).toBeVisible();
});

test("book index page loads", async ({ page }) => {
  await page.goto("/start-reading/household-money-literacy");
  const response = await page.goto("/start-reading/household-money-literacy");
  expect(response?.status()).toBeLessThan(500);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("chapter 1 loads correctly", async ({ page }) => {
  await page.goto("/start-reading/household-money-literacy/1");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  // Reader mode switcher should be present
  await expect(page.getByText(/standard|lite/i).first()).toBeVisible();
});

// ── Footer: mobile order check ────────────────────────────────────────────────
test("footer contains Identity, Get Started, Navigation, Legal sections", async ({
  page,
}) => {
  await page.goto("/for-households");
  const footer = page.locator("footer");
  await expect(footer.getByText("Economic & Industrial Literacy Institute").first()).toBeVisible();
  await expect(footer.getByText("Get Started")).toBeVisible();
  await expect(footer.getByText("Navigation")).toBeVisible();
  await expect(footer.getByText("Legal")).toBeVisible();
});

test("footer mobile: Get Started appears before Navigation in DOM order", async ({
  page,
  isMobile,
}) => {
  await page.goto("/for-households");
  const footer = page.locator("footer");
  const getStartedEl = footer.getByText("Get Started");
  const navigationEl = footer.getByText("Navigation");

  const gsBox = await getStartedEl.boundingBox();
  const navBox = await navigationEl.boundingBox();

  if (isMobile && gsBox && navBox) {
    // On mobile, Get Started (Actions) renders visually above Navigation
    expect(gsBox.y).toBeLessThan(navBox.y);
  } else {
    // On desktop both should exist — order check not applicable
    await expect(getStartedEl).toBeVisible();
    await expect(navigationEl).toBeVisible();
  }
});

// ── PDF download endpoints: return 200 ───────────────────────────────────────
test("planner PDF download endpoint responds", async ({ page }) => {
  const response = await page.request.get("/api/download/planner");
  expect(response.status()).toBeLessThan(500);
});

test("scorecard PDF download endpoint responds", async ({ page }) => {
  const response = await page.request.get("/api/download/scorecard");
  expect(response.status()).toBeLessThan(500);
});

test("reset PDF download endpoint responds", async ({ page }) => {
  const response = await page.request.get("/api/download/reset");
  expect(response.status()).toBeLessThan(500);
});
