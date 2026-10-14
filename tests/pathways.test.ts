import { test } from "node:test";
import assert from "node:assert/strict";
import raw from "../data/health-systems.json";
import { validateContent } from "../lib/content-model";
import { buildNextStepSummary } from "../lib/summary";
const data = validateContent(raw);

test("every niche has explained skills tied to real applications and complete activities", () => {
  for (const niche of data.niches) {
    assert.ok(
      niche.skills.every(
        (skill) =>
          skill.explanation &&
          niche.practicalApplications[skill.applicationIndex],
      ),
    );
    assert.deepEqual(
      niche.illustrativePathways.map((pathway) => pathway.kind),
      ["academic", "professional"],
    );
    assert.ok(niche.activity.reflection && niche.nextStepOutcome);
    assert.equal(new Set(niche.evidence.map((entry) => entry.area)).size, 3);
  }
});
test("rejects missing application references and incomplete evidence coverage", () => {
  const changed = structuredClone(raw);
  changed.niches[0].skills[0].applicationIndex = 99;
  assert.throws(() => validateContent(changed), /missing application/);
  changed.niches[0].skills[0].applicationIndex = 0;
  changed.niches[0].evidence[1].area = changed.niches[0].evidence[0].area;
  assert.throws(() => validateContent(changed), /unique and complete/);
});
test("rejects missing evidence sources and empty skill explanations", () => {
  const changed = structuredClone(raw);
  changed.niches[0].evidence[0].sourceIds = ["missing"];
  assert.throws(() => validateContent(changed), /unknown source/);
  changed.niches[0].evidence[0].sourceIds = changed.niches[0].sourceIds;
  changed.niches[0].skills[0].explanation = "";
  assert.throws(() => validateContent(changed));
});
test("summaries include actionable steps, outputs, source URLs and review caveats", () => {
  for (const niche of data.niches) {
    const summary = buildNextStepSummary(data.topics[0], niche, data.sources);
    for (const text of [
      niche.activity.title,
      niche.activity.expectedOutput,
      niche.nextStep,
      niche.nextStepOutcome,
      "SOURCE REVIEW REQUIRED",
      "not entry requirements",
      "https://www.who.int/",
    ])
      assert.ok(summary.includes(text));
  }
});
test("summary composition ignores extra input and unrelated sources", () => {
  const extended = { ...data.niches[0], excerpt: "PRIVATE-EXCERPT-701" };
  const summary = buildNextStepSummary(data.topics[0], extended, data.sources);
  assert.ok(!summary.includes("PRIVATE-EXCERPT-701"));
  assert.ok(
    !summary.includes("https://www.who.int/health-topics/health-financing"),
  );
});
test("summary rejects wrong topic ownership and missing source records", () => {
  assert.throws(
    () => buildNextStepSummary(data.topics[1], data.niches[0], data.sources),
    /does not own/,
  );
  assert.throws(
    () => buildNextStepSummary(data.topics[0], data.niches[0], []),
    /source missing/,
  );
});
