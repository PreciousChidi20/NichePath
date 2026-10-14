import { test } from "node:test";
import assert from "node:assert/strict";
import rawContent from "../data/mph-content.json";
import { validateContent } from "../lib/content-model";

test("starter covers all five subjects with two or three complete niches", () => {
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
  assert.equal(data.niches.length, 11);
  for (const topic of data.topics) {
    assert.equal(topic.status, "starter");
    assert.ok(topic.nicheIds.length >= 2 && topic.nicheIds.length <= 3);
  }
  assert.equal(data.concepts.length, 23);
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
test("new subject niches have curated cross-topic connections and source review flags", () => {
  const data = validateContent(rawContent);
  for (const niche of data.niches.filter(
    (item) => item.topicId !== "health-systems",
  )) {
    assert.ok(
      niche.relatedNiches.some(
        (relation) =>
          data.niches.find((target) => target.id === relation.nicheId)
            ?.topicId !== niche.topicId,
      ),
    );
    assert.ok(
      niche.sourceIds.every((id) =>
        data.sources.some(
          (source) =>
            source.id === id && source.verification === "review-required",
        ),
      ),
    );
  }
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
