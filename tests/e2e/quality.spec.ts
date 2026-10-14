import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import data from "../../data/mph-content.json";

const routes = [
  "/",
  ...data.topics.map((topic) => `/topics/${topic.id}`),
  ...data.niches.map((niche) => `/topics/${niche.topicId}/niches/${niche.id}`),
  "/topics/not-a-topic",
];
test("pending clipboard action announces progress and prevents duplicate copying", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: {
        writeText: () =>
          new Promise<void>((resolve) => {
            (window as unknown as { finishCopy: () => void }).finishCopy =
              resolve;
          }),
      },
    });
  });
  await page.goto("/topics/health-systems/niches/health-financing");
  await page.getByRole("button", { name: "Copy next steps" }).click();
  await expect(
    page.getByText("Copying your next steps…", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Copying…", exact: true }),
  ).toBeDisabled();
  await page.evaluate(() =>
    (window as unknown as { finishCopy: () => void }).finishCopy(),
  );
  await expect(
    page.getByText("Next steps copied. Source-review notes are included."),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Copy next steps" }),
  ).toBeEnabled();
});
test("all application pages pass automated accessibility and responsive checks", async ({
  page,
}) => {
  test.setTimeout(120000);
  for (const route of routes) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(
      route === "/topics/not-a-topic" ? 404 : 200,
    );
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"])
      .analyze();
    expect(
      result.violations.map((issue) => ({
        id: issue.id,
        nodes: issue.nodes.map((node) => node.target),
      })),
      route,
    ).toEqual([]);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
      route,
    ).toBe(true);
  }
});

test("discovery feedback states retain accessible labels and semantic headings", async ({
  page,
}) => {
  for (const text of [
    "",
    "unsupported private fixture",
    "health systems and epidemiology",
    "risk pooling",
  ]) {
    await page.goto("/");
    await page
      .getByLabel("Topic, question or permitted coursework excerpt")
      .fill(text);
    await page.getByRole("button", { name: "Find connections" }).click();
    await expect(
      page.getByRole("region", { name: "Topic matching results" }),
    ).toBeFocused();
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"])
      .analyze();
    expect(result.violations.map((issue) => issue.id)).toEqual([]);
  }
});

test("full keyboard journey reaches a concept, niche and manual next-step selection", async ({
  page,
}) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main")).toBeFocused();
  // Locate controls by keyboard tab order instead of programmatic focus.
  async function tabTo(name: string) {
    for (let step = 0; step < 80; step++) {
      if (
        await page
          .getByRole("button", { name, exact: true })
          .evaluate((element) => element === document.activeElement)
      )
        return;
      await page.keyboard.press("Tab");
    }
    throw new Error(`Keyboard could not reach ${name}`);
  }
  await page.keyboard.press("Tab");
  await expect(
    page.getByLabel("Topic, question or permitted coursework excerpt"),
  ).toBeFocused();
  await page.keyboard.type("risk pooling");
  await tabTo("Find connections");
  await page.keyboard.press("Enter");
  await page.keyboard.press("Tab");
  await expect(
    page
      .getByRole("region", { name: "Topic matching results" })
      .getByRole("link", { name: "Explore Health Systems →" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  const nicheLink = page.getByRole("link", { name: "Explore this niche" });
  for (
    let step = 0;
    step < 80 &&
    !(await nicheLink.evaluate(
      (element) => element === document.activeElement,
    ));
    step++
  )
    await page.keyboard.press("Tab");
  await expect(nicheLink).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Health financing",
  );
  await tabTo("Select summary");
  await page.keyboard.press("Enter");
  await expect(page.getByLabel("Curated next steps (read-only)")).toBeFocused();
  await expect(
    page.getByText("Summary selected. Use your device’s copy command."),
  ).toBeVisible();
});

test("excerpt stays out of headers, requests, URLs, caches, cookies and navigation state", async ({
  page,
  context,
}) => {
  const marker = "PRIVATE_QA_EXCERPT_614";
  const observed: string[] = [];
  const errors: string[] = [];
  page.on("request", (request) =>
    observed.push(
      request.url(),
      request.postData() ?? "",
      JSON.stringify(request.headers()),
    ),
  );
  page.on("console", (message) => observed.push(message.text()));
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await page
    .getByLabel("Topic, question or permitted coursework excerpt")
    .fill(`${marker} confounding`);
  await page.getByRole("button", { name: "Find connections" }).click();
  await page
    .getByRole("region", { name: "Topic matching results" })
    .getByRole("link", { name: "Explore Epidemiology →" })
    .click();
  await page.getByRole("link", { name: "Explore this niche" }).click();
  expect(
    await page.getByLabel("Curated next steps (read-only)").inputValue(),
  ).not.toContain(marker);
  expect(page.url()).not.toContain(marker);
  const state = await page.evaluate(async () => ({
    local: Object.keys(localStorage),
    session: Object.keys(sessionStorage),
    indexed: (await indexedDB.databases()).length,
    caches: await caches.keys(),
    history: JSON.stringify(history.state),
  }));
  expect(state.local).toEqual([]);
  expect(state.session).toEqual([]);
  expect(state.indexed).toBe(0);
  expect(state.caches).toEqual([]);
  expect(state.history).not.toContain(marker);
  expect(await context.cookies()).toEqual([]);
  await page.goBack();
  await page.goBack();
  await expect(
    page.getByLabel("Topic, question or permitted coursework excerpt"),
  ).toHaveValue("");
  await page.reload();
  await expect(
    page.getByLabel("Topic, question or permitted coursework excerpt"),
  ).toHaveValue("");
  expect(observed.some((value) => value.includes(marker))).toBe(false);
  expect(errors).toEqual([]);
});
