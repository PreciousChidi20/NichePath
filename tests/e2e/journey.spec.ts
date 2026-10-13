import { test, expect } from "@playwright/test";

test("input to interest to actionable financing guidance, with no excerpt transmission", async ({
  page,
}) => {
  await page.goto("/");
  const submitted = "PRIVATE-EXCERPT-739: risk pooling and health insurance";
  const outgoing: string[] = [];
  const unexpected: string[] = [];
  page.on("request", (request) => {
    outgoing.push(request.url(), request.postData() ?? "");
    if (!request.url().startsWith("http://127.0.0.1:3000"))
      unexpected.push(request.url());
  });
  await page
    .getByLabel("Topic, question or permitted coursework excerpt")
    .fill(submitted);
  await page.getByRole("button", { name: "Find connections" }).click();
  await expect(
    page.getByRole("heading", { name: "A possible connection" }),
  ).toBeVisible();
  await page
    .getByRole("link", { name: "Explore Health Systems →", exact: true })
    .first()
    .click();
  await expect(
    page.getByRole("button", { name: /Risk pooling and insurance/ }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(
    page.getByRole("heading", { name: "Health financing", exact: true }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Explore this niche" }).click();
  for (const name of [
    "Where it is applied",
    "Skills to explore",
    "Follow the money",
    "Keep your curiosity moving.",
    "Where this could lead",
    "Sources to review",
  ])
    await expect(
      page.getByRole("heading", { name, exact: true }),
    ).toBeVisible();
  await expect(
    page.getByText("Source review required", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", {
      name: /World Health Organization: Health financing/,
    }),
  ).toHaveAttribute(
    "href",
    "https://www.who.int/health-topics/health-financing",
  );
  expect(
    outgoing.some(
      (value) =>
        value.includes("PRIVATE-EXCERPT-739") ||
        value.includes(encodeURIComponent(submitted)),
    ),
  ).toBe(false);
  expect(unexpected).toEqual([]);
  const stored = await page.evaluate(() => ({
    local: Object.keys(localStorage),
    session: Object.keys(sessionStorage),
  }));
  expect(stored).toEqual({ local: [], session: [] });
  await page.getByRole("link", { name: "NichePath home" }).click();
  await expect(
    page.getByLabel("Topic, question or permitted coursework excerpt"),
  ).toHaveValue("");
});

test("handles unsupported, empty, planned and ambiguous input explicitly", async ({
  page,
}) => {
  await page.goto("/");
  const input = page.getByLabel(
    "Topic, question or permitted coursework excerpt",
  );
  const submit = page.getByRole("button", { name: "Find connections" });
  await submit.click();
  await expect(
    page.getByRole("heading", { name: "Start with a topic or question" }),
  ).toBeVisible();
  await input.fill("marine biology");
  await submit.click();
  await expect(
    page.getByRole("heading", { name: "No curated match yet" }),
  ).toBeVisible();
  await input.fill("biostatistics");
  await submit.click();
  await expect(
    page.getByText(
      /Topic overview available; detailed niche guidance is pending/,
    ),
  ).toBeVisible();
  await input.fill("epidemiology and health systems");
  await submit.click();
  await expect(
    page.getByRole("heading", { name: "More than one subject matched" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Clear text" }).click();
  await expect(input).toHaveValue("");
});

test("all niches are complete and mobile layouts do not overflow", async ({
  page,
}) => {
  for (const [id, title] of [
    ["leadership-governance", "Health leadership and governance"],
    ["health-financing", "Health financing"],
    ["health-workforce", "Health workforce"],
  ]) {
    await page.goto(`/topics/health-systems/niches/${id}`);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(title);
    await expect(page.getByText("Your output", { exact: true })).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  }
  await page.goto("/topics/health-systems");
  await expect(
    page.getByRole("link", { name: "Explore this niche" }),
  ).toHaveCount(3);
  await page.getByRole("button", { name: /Community participation/ }).click();
  await expect(
    page.getByRole("link", { name: "Explore this niche" }),
  ).toHaveCount(1);
  await page.getByRole("button", { name: "Show all three niches" }).click();
  await expect(
    page.getByRole("link", { name: "Explore this niche" }),
  ).toHaveCount(3);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page.goto("/");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
});

test("keyboard entry works and unavailable routes return a clear 404", async ({
  page,
}) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page
    .getByLabel("Topic, question or permitted coursework excerpt")
    .focus();
  await page.keyboard.type("workforce");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("heading", { name: "A possible connection" }),
  ).toBeVisible();
  for (const route of [
    "/topics/unknown",
    "/topics/health-policy/niches/health-financing",
    "/topics/health-systems/niches/unknown",
  ]) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(404);
    await expect(
      page.getByRole("heading", { name: "This path isn’t available yet." }),
    ).toBeVisible();
  }
});
