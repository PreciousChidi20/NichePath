import { test } from "node:test";
import assert from "node:assert/strict";
import rawContent from "../data/health-systems.json";
import { validateContent } from "../lib/content-model";
import { matchTopics, MAX_INPUT_LENGTH } from "../lib/matching";
const data = validateContent(rawContent);

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
