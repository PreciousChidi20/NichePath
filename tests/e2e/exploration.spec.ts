import { test, expect } from "@playwright/test";

test("learners follow academic concepts and related niches without losing the existing journey", async ({
  page,
}) => {
  await page.goto("/topics/health-systems");
  await expect(page.getByText("Showing 3 of 3 niches")).toBeVisible();
  await page
    .getByRole("button", { name: /Risk pooling and insurance/ })
    .click();
  await expect(page.getByText("Showing 1 of 3 niches")).toBeVisible();
  await page.getByRole("link", { name: "Explore this niche" }).click();
  await expect(
    page.getByRole("heading", { name: "What this niche involves" }),
  ).toBeVisible();
  const connections = page.getByRole("region", {
    name: "Connected concepts and interests",
  });
  await expect(
    connections.getByRole("link", {
      name: "Explore Risk pooling and insurance →",
    }),
  ).toBeVisible();
  await expect(
    connections.getByRole("link", {
      name: "Explore Health leadership and governance →",
    }),
  ).toBeVisible();
  await expect(
    connections.getByText(/Financing choices raise questions/),
  ).toBeVisible();
  await connections
    .getByRole("link", { name: "Explore Health leadership and governance →" })
    .focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(
    "/topics/health-systems/niches/leadership-governance",
  );
  await page.getByRole("link", { name: "Explore Health workforce →" }).click();
  await expect(page).toHaveURL(
    "/topics/health-systems/niches/health-workforce",
  );
  await expect(
    page.getByRole("heading", { name: "Explore a staffing gap" }),
  ).toBeVisible();
  await page
    .getByRole("link", { name: "Explore Workforce distribution →" })
    .click();
  await expect(page).toHaveURL(
    "/topics/health-systems?concept=workforce-distribution",
  );
  await expect(
    page.getByRole("button", { name: /Workforce distribution/ }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(
    page.getByRole("link", { name: "Explore this niche" }),
  ).toHaveCount(1);
});

test("invalid concepts fall back safely and subject navigation preserves pending states", async ({
  page,
}) => {
  await page.goto("/topics/health-systems?concept=unknown");
  await expect(page.getByText(/That concept is not available/)).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Explore this niche" }),
  ).toHaveCount(3);
  await expect(page.getByRole("button", { pressed: true })).toHaveCount(0);
  const subjects = page.getByRole("region", {
    name: "Explore another subject",
  });
  await subjects
    .getByRole("link", { name: "Epidemiology", exact: true })
    .click();
  await expect(
    page.getByRole("heading", {
      name: "Detailed guidance is not available yet",
    }),
  ).toBeVisible();
  await page
    .getByRole("link", { name: "Explore the Health Systems case study →" })
    .click();
  await expect(
    page.getByRole("link", { name: "Explore this niche" }),
  ).toHaveCount(3);
});

test("all relationship destinations are valid and descriptions fit mobile layouts", async ({
  page,
}) => {
  for (const id of [
    "leadership-governance",
    "health-financing",
    "health-workforce",
  ]) {
    await page.goto(`/topics/health-systems/niches/${id}`);
    const region = page.getByRole("region", {
      name: "Connected concepts and interests",
    });
    const internalLinks = region.locator('a[href^="/topics/"]');
    await expect(internalLinks).toHaveCount(4);
    const destinations = await internalLinks.evaluateAll((links) =>
      links.map((link) => link.getAttribute("href")!),
    );
    for (const destination of destinations) {
      const response = await page.request.get(destination);
      expect(response.status()).toBe(200);
    }
    await expect(
      region.getByText("Source review required", { exact: true }),
    ).toHaveCount(4);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  }
});
