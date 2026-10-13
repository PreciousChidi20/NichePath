import { test } from "node:test";
import assert from "node:assert/strict";
import rawContent from "../data/health-systems.json";
import { validateContent } from "../lib/content-model";

test("starter covers the agreed subjects and three complete Health Systems niches", () => {
  const data = validateContent(rawContent);
  assert.deepEqual(
    data.topics.map((topic) => topic.title),
    [
      "Health Systems",
      "Epidemiology",
      "Biostatistics",
      "Health Policy",
      "Health Promotion",
    ],
  );
  assert.equal(data.niches.length, 3);
  assert.equal(data.concepts.length, 6);
  assert.ok(
    data.sources.every(
      (source) =>
        source.verification === "review-required" && source.reviewedOn === null,
    ),
  );
});
test("rejects duplicate identifiers", () => {
  const data = structuredClone(rawContent);
  data.sources.push(data.sources[0]);
  assert.throws(() => validateContent(data), /Duplicate sources IDs/);
});
test("rejects missing source links on interest connections", () => {
  const data = structuredClone(rawContent);
  data.concepts[0].connections[0].sourceIds = ["missing"];
  assert.throws(() => validateContent(data), /unknown source/);
});
test("rejects missing required progression fields", () => {
  const data = structuredClone(rawContent);
  data.niches[0].nextStep = "";
  assert.throws(() => validateContent(data));
});
test("rejects mismatched topic-niche references", () => {
  const data = structuredClone(rawContent);
  data.niches[0].topicId = "health-policy";
  assert.throws(
    () => validateContent(data),
    /invalid niche|missing owning topic/,
  );
});
test("verified sources require review evidence metadata", () => {
  const data = structuredClone(rawContent);
  data.sources[0].verification = "verified";
  assert.throws(() => validateContent(data), /review date/);
});
test("rejects unsafe source URL schemes", () => {
  const data = structuredClone(rawContent);
  data.sources[0].url = "javascript:alert(1)";
  assert.throws(() => validateContent(data), /HTTPS/);
});
