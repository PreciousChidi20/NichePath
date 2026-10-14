import { test, expect } from "@playwright/test";
import data from "../../data/mph-content.json";

test("every subject has a complete discovery-to-niche-and-next-step journey", async ({
  page,
}) => {
  for (const topic of data.topics) {
    await page.goto("/");
    await page
      .getByLabel("Topic, question or permitted coursework excerpt")
      .fill(topic.title);
    await page.getByRole("button", { name: "Find connections" }).click();
    await page
      .getByRole("region", { name: "Topic matching results" })
      .getByRole("link", { name: `Explore ${topic.title} →` })
      .click();
    await expect(
      page.getByRole("link", { name: "Explore this niche" }),
    ).toHaveCount(topic.nicheIds.length);
    for (const id of topic.nicheIds) {
      const niche = data.niches.find((item) => item.id === id)!;
      const response = await page.goto(`/topics/${topic.id}/niches/${id}`);
      expect(response?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toContainText(
        niche.title,
      );
      await expect(
        page.getByRole("heading", { name: niche.activity.title, exact: true }),
      ).toBeVisible();
      const summary = await page
        .getByLabel("Curated next steps (read-only)")
        .inputValue();
      expect(summary).toContain(niche.nextStep);
      expect(summary).toContain("SOURCE REVIEW REQUIRED");
      for (const related of niche.relatedNiches) {
        const target = data.niches.find((item) => item.id === related.nicheId)!;
        await expect(
          page
            .getByRole("region", { name: "Connected concepts and interests" })
            .getByRole("link", { name: `Explore ${target.title} →` }),
        ).toHaveAttribute(
          "href",
          `/topics/${target.topicId}/niches/${target.id}`,
        );
      }
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
    }
  }
});
