import { test, expect } from "@playwright/test";

test("all niches show explained skills, reflection, pathways and evidence context", async ({
  page,
}) => {
  for (const id of [
    "leadership-governance",
    "health-financing",
    "health-workforce",
  ]) {
    await page.goto(`/topics/health-systems/niches/${id}`);
    await expect(
      page.getByText("Practice connection:", { exact: false }),
    ).toHaveCount(3);
    await expect(
      page.getByRole("heading", { name: "Reflect on your activity" }),
    ).toBeVisible();
    await expect(
      page.getByText("Academic exploration", { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText("Professional domain", { exact: true }),
    ).toBeVisible();
    await expect(
      page
        .getByRole("region", { name: "How references relate to this guidance" })
        .getByText("Source review required", { exact: true }),
    ).toHaveCount(3);
    await expect(
      page.getByLabel("Curated next steps (read-only)"),
    ).toHaveAttribute("readonly", "");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  }
});

test("explicit copy uses only curated content and leaves storage and requests private", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  const outgoing: string[] = [];
  page.on("request", (request) =>
    outgoing.push(request.url(), request.postData() ?? ""),
  );
  await page.goto("/");
  await page
    .getByLabel("Topic, question or permitted coursework excerpt")
    .fill("PRIVATE-EXCERPT-701 risk pooling");
  await page.getByRole("button", { name: "Find connections" }).click();
  await page
    .getByRole("region", { name: "Topic matching results" })
    .getByRole("link", { name: "Explore Health Systems →" })
    .click();
  await page.getByRole("link", { name: "Explore this niche" }).click();
  await page.evaluate(() =>
    navigator.clipboard.writeText("UNCHANGED-UNTIL-COPY"),
  );
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    "UNCHANGED-UNTIL-COPY",
  );
  await page.getByRole("button", { name: "Copy next steps" }).focus();
  await page.keyboard.press("Enter");
  await expect(
    page.getByText("Next steps copied. Source-review notes are included."),
  ).toBeVisible();
  const copied = await page.evaluate(() => navigator.clipboard.readText());
  expect(copied).toBe(
    await page.getByLabel("Curated next steps (read-only)").inputValue(),
  );
  expect(copied).toContain("Follow the money");
  expect(copied).toContain("SOURCE REVIEW REQUIRED");
  expect(copied).toContain(
    "https://www.who.int/health-topics/health-financing",
  );
  expect(copied).not.toContain("PRIVATE-EXCERPT-701");
  expect(outgoing.some((value) => value.includes("PRIVATE-EXCERPT-701"))).toBe(
    false,
  );
  expect(
    await page.evaluate(() => [
      Object.keys(localStorage),
      Object.keys(sessionStorage),
    ]),
  ).toEqual([[], []]);
  expect(await context.cookies()).toEqual([]);
  await page.evaluate(() => navigator.clipboard.writeText(""));
});

for (const failure of ["missing", "denied"] as const) {
  test(`clipboard ${failure} provides an accessible selectable fallback`, async ({
    page,
  }) => {
    await page.addInitScript((mode) => {
      Object.defineProperty(navigator, "clipboard", {
        configurable: true,
        value:
          mode === "missing"
            ? undefined
            : { writeText: () => Promise.reject(new Error("Denied")) },
      });
    }, failure);
    await page.goto("/topics/health-systems/niches/health-workforce");
    await page.getByRole("button", { name: "Copy next steps" }).click();
    await expect(
      page.getByText(/Automatic copying is unavailable/),
    ).toBeVisible();
    const text = page.getByLabel("Curated next steps (read-only)");
    await expect(text).toBeFocused();
    expect(
      await text.evaluate(
        (element: HTMLTextAreaElement) =>
          element.selectionEnd - element.selectionStart,
      ),
    ).toBe((await text.inputValue()).length);
    await page.getByRole("button", { name: "Select summary" }).click();
    await expect(
      page.getByText("Summary selected. Use your device’s copy command."),
    ).toBeVisible();
  });
}
