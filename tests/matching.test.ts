import { test } from "node:test";
import assert from "node:assert/strict";
import rawContent from "../data/health-systems.json";
import { validateContent } from "../lib/content-model";
import { matchTopics, MAX_INPUT_LENGTH } from "../lib/matching";
const data = validateContent(rawContent);

test("matches all five topic titles exactly", () => {
  for (const topic of data.topics) {
    const result = matchTopics(topic.title, data);
    assert.equal(result.kind, "matched");
    assert.deepEqual(
      result.matches.map((match) => match.topicId),
      [topic.id],
    );
  }
});
test("topic titles still match when they are not duplicated in aliases", () => {
  const changed = structuredClone(data);
  changed.topics[1].aliases = ["outbreak investigation"];
  assert.deepEqual(matchTopics("Epidemiology", changed).matches, [
    { topicId: "epidemiology", conceptIds: [] },
  ]);
});
test("curated aliases connect questions to the agreed subjects", () => {
  for (const [input, topicId] of [
    ["How does outbreak investigation work?", "epidemiology"],
    ["Can we interpret confidence intervals?", "biostatistics"],
    ["Discuss public health legislation", "health-policy"],
    ["What is behaviour change?", "health-promotion"],
    ["How does health services organization work?", "health-systems"],
  ])
    assert.deepEqual(
      matchTopics(input, data).matches.map((match) => match.topicId),
      [topicId],
    );
});
test("overlapping aliases are deduplicated and candidates have predictable order", () => {
  const result = matchTopics(
    "Health promotion: behaviour change and health education. Epidemiology and outbreak investigation.",
    data,
  );
  assert.deepEqual(
    result.matches.map((match) => match.topicId),
    ["epidemiology", "health-promotion"],
  );
});
test("word boundaries and unsupported material do not invent matches", () => {
  for (const input of [
    "prebiostatistical",
    "policyanalysis",
    "marine biology",
    "<script>alert(1)</script>",
    "?!",
  ])
    assert.equal(matchTopics(input, data).kind, "unsupported");
});
test("normalizes Unicode and punctuation and accepts the exact character limit", () => {
  assert.equal(matchTopics("Ｈｅａｌｔｈ Ｐｏｌｉｃｙ", data).kind, "matched");
  const input = "health systems".padEnd(MAX_INPUT_LENGTH, " ");
  assert.equal(matchTopics(input, data).kind, "matched");
  assert.equal(matchTopics(input + "x", data).kind, "too-long");
});

test("matches case and punctuation without matching inside unrelated words", () => {
  assert.equal(matchTopics("HEALTH-SYSTEMS!", data).kind, "matched");
  assert.equal(matchTopics("microinsurance", data).kind, "unsupported");
});
test("connects a permitted excerpt about insurance and risk pooling to financing", () => {
  const result = matchTopics(
    "We discuss health insurance and risk pooling in this lesson.",
    data,
  );
  assert.equal(result.kind, "matched");
  assert.deepEqual(result.matches, [
    { topicId: "health-systems", conceptIds: ["risk-pooling"] },
  ]);
});
test("keeps ambiguous subject matches for learner confirmation", () => {
  const result = matchTopics("Epidemiology and health workforce", data);
  assert.deepEqual(
    result.matches.map((match) => match.topicId),
    ["health-systems", "epidemiology"],
  );
});
test("recognises planned subjects without fabricating guidance", () => {
  const result = matchTopics("Biostatistics", data);
  assert.deepEqual(result.matches, [
    { topicId: "biostatistics", conceptIds: [] },
  ]);
});
test("handles empty, oversized and unsupported inputs", () => {
  assert.equal(matchTopics("  ", data).kind, "empty");
  assert.equal(
    matchTopics("x".repeat(MAX_INPUT_LENGTH + 1), data).kind,
    "too-long",
  );
  assert.equal(matchTopics("marine biology", data).kind, "unsupported");
});
