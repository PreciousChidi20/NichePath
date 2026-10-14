import { test, expect } from "@playwright/test";

const subjects = [
  [
    "Health Systems",
    "health-systems",
    "How does health services organization work?",
  ],
  ["Epidemiology", "epidemiology", "Explain outbreak investigation"],
  ["Biostatistics", "biostatistics", "How do confidence intervals work?"],
  ["Health Policy", "health-policy", "What is policy analysis?"],
  ["Health Promotion", "health-promotion", "Discuss health education"],
];
const label = "Topic, question or permitted coursework excerpt";

test("all five subjects support matching, confirmation and direct navigation", async ({
  page,
}) => {
  for (const [title, id, question] of subjects) {
    await page.goto("/");
    await page.getByLabel(label).fill(question);
    await page.getByRole("button", { name: "Find connections" }).click();
    // Matching must not navigate until the learner explicitly chooses a result.
    await expect(page).toHaveURL("/");
    const results = page.getByRole("region", {
      name: "Topic matching results",
    });
    await expect(results).toBeFocused();
    await expect(
      results.getByRole("link", { name: `Explore ${title} →`, exact: true }),
    ).toHaveCount(1);
    await results
      .getByRole("link", { name: `Explore ${title} →`, exact: true })
      .click();
    await expect(page).toHaveURL(new RegExp(`/topics/${id}(?:\\?|$)`));
    await expect(page.getByRole("heading", { level: 1 })).toContainText(title);
    const confirmedConcept = new URL(page.url()).searchParams.get("concept");
    await expect(page.getByRole("button", { pressed: true })).toHaveCount(
      confirmedConcept ? 1 : 0,
    );
    await expect(
      page.getByRole("link", { name: "Explore this niche" }),
    ).toHaveCount(confirmedConcept ? 1 : id === "health-systems" ? 3 : 2);
    await page.getByRole("button", { name: "Show all niches" }).click();
    await expect(
      page.getByRole("link", { name: "Explore this niche" }),
    ).toHaveCount(id === "health-systems" ? 3 : 2);
    await page.goto("/");
    await page
      .getByRole("list", { name: "Supported topic shortcuts" })
      .getByRole("link", { name: new RegExp(`^${title}`) })
      .click();
    await expect(page).toHaveURL(new RegExp(`/topics/${id}(?:\\?|$)`));
    await expect(
      page.getByRole("link", { name: "Explore this niche" }),
    ).toHaveCount(id === "health-systems" ? 3 : 2);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  }
});

test("ambiguous results expose all candidates and keyboard confirmation chooses the intended subject", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByLabel(label)
    .fill("epidemiology, confidence intervals and health promotion");
  await page.getByRole("button", { name: "Find connections" }).click();
  const results = page.getByRole("region", { name: "Topic matching results" });
  await expect(results.getByRole("link")).toHaveCount(3);
  await expect(page).toHaveURL("/");
  await results.getByRole("link", { name: "Explore Biostatistics →" }).focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/topics\/biostatistics(?:\?|$)/);
});

test("unsupported input offers all five working shortcuts and updates invalidate stale results", async ({
  page,
}) => {
  await page.goto("/");
  const input = page.getByLabel(label);
  await input.fill("marine biology");
  await page.getByRole("button", { name: "Find connections" }).click();
  const results = page.getByRole("region", { name: "Topic matching results" });
  await expect(results.getByRole("link")).toHaveCount(5);
  await results
    .getByRole("link", { name: "Health Policy", exact: true })
    .click();
  await expect(page).toHaveURL("/topics/health-policy");
  await page.goto("/");
  await input.fill("epidemiology");
  await page.getByRole("button", { name: "Find connections" }).click();
  await input.fill("unsupported topic");
  await expect(results).toHaveCount(0);
});

test("character limit, empty-state association and clear action are accessible", async ({
  page,
}) => {
  await page.goto("/");
  const input = page.getByLabel(label);
  await page.getByRole("button", { name: "Find connections" }).click();
  await expect(input).toHaveAttribute("aria-invalid", "true");
  await expect(input).toHaveAttribute("aria-describedby", /discovery-results/);
  await input.fill("health systems".padEnd(2000, "x"));
  await expect(input).toHaveAttribute("maxlength", "2000");
  await expect(page.getByText("2000/2000", { exact: true })).toBeVisible();
  await expect(
    page.getByText("Character limit reached. Shorten your text to add more."),
  ).toBeVisible();
  await input.press("End");
  await page.keyboard.type("extra");
  expect(await input.inputValue()).toHaveLength(2000);
  await page.getByRole("button", { name: "Clear text" }).click();
  await expect(input).toHaveValue("");
  await expect(page.getByText("0/2000", { exact: true })).toBeVisible();
});

test("pasted input is never transmitted or persisted, and reload clears it", async ({
  page,
  context,
}) => {
  await page.goto("/");
  const input = page.getByLabel(label);
  const excerpt =
    "PRIVATE-COURSEWORK-928: outbreak investigation and health policy";
  const requests: string[] = [];
  page.on("request", (request) =>
    requests.push(request.url(), request.postData() ?? ""),
  );
  // Paste a fictional test fixture using Chromium's real clipboard path.
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.evaluate((text) => navigator.clipboard.writeText(text), excerpt);
  await input.focus();
  await page.keyboard.press("Control+V");
  await expect(input).toHaveValue(excerpt);
  await page.evaluate(() => navigator.clipboard.writeText(""));
  await page.getByRole("button", { name: "Find connections" }).click();
  await expect(
    page.getByRole("heading", { name: "More than one subject matched" }),
  ).toBeVisible();
  const before = await page.evaluate(async () => ({
    local: Object.keys(localStorage),
    session: Object.keys(sessionStorage),
    databases: (await indexedDB.databases()).length,
    caches: await caches.keys(),
  }));
  expect(before).toEqual({ local: [], session: [], databases: 0, caches: [] });
  expect(await context.cookies()).toEqual([]);
  await page.reload();
  await expect(input).toHaveValue("");
  await expect(
    page.getByRole("region", { name: "Topic matching results" }),
  ).toHaveCount(0);
  expect(
    requests.some((value) => value.includes("PRIVATE-COURSEWORK-928")),
  ).toBe(false);
  expect(
    requests.every(
      (value) => !value || value.startsWith("http://127.0.0.1:3000"),
    ),
  ).toBe(true);
});
