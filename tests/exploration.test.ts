import { test } from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import rawContent from "../data/health-systems.json";
import { validateContent } from "../lib/content-model";
import { getNicheExploration } from "../lib/exploration";
import { NicheConnections } from "../components/niche-connections";
import { TopicExplorer } from "../components/topic-explorer";
import ExplorationError from "../app/error";
const data = validateContent(rawContent);

test("error fallback does not expose raw error contents and offers recovery", () => {
  const markup = renderToStaticMarkup(
    createElement(ExplorationError, {
      error: new Error("PRIVATE-DETAIL-143"),
      reset: () => undefined,
    }),
  );
  assert.doesNotMatch(markup, /PRIVATE-DETAIL-143/);
  assert.match(markup, /Try again/);
  assert.match(markup, /Return to topic discovery/);
});

test("all Health Systems niches have detailed descriptions and resolved curated connections", () => {
  for (const niche of data.niches) {
    assert.equal(niche.overview.length, 2);
    const result = getNicheExploration(data, niche);
    assert.equal(result.concepts.length, 2);
    assert.equal(result.related.length, 2);
    assert.ok(
      result.related.every((relation) => relation.niche.id !== niche.id),
    );
    assert.ok(
      result.concepts.every(
        (connection) => connection.concept.topicId === niche.topicId,
      ),
    );
  }
});
test("rejects missing related targets, self-links and duplicate relationships", () => {
  for (const [id, expected] of [
    ["missing", /unknown related niche/],
    ["leadership-governance", /cannot link to itself/],
    ["health-financing", /duplicate related niches/],
  ] as const) {
    const changed = structuredClone(rawContent);
    changed.niches[0].relatedNiches[1].nicheId = id;
    assert.throws(() => validateContent(changed), expected);
  }
});
test("rejects relation source references and incomplete overview text", () => {
  const changed = structuredClone(rawContent);
  changed.niches[0].relatedNiches[0].sourceIds = ["missing"];
  assert.throws(() => validateContent(changed), /unknown source/);
  changed.niches[0].relatedNiches[0].sourceIds = ["who-governance"];
  changed.niches[0].overview = [];
  assert.throws(() => validateContent(changed));
});
test("rejects duplicate concept connections", () => {
  const changed = structuredClone(rawContent);
  changed.concepts[0].connections.push(changed.concepts[0].connections[0]);
  assert.throws(() => validateContent(changed), /duplicate niche connections/);
});
test("relationship component renders useful empty states without inferred links", () => {
  const niche = { ...data.niches[0], relatedNiches: [] };
  const markup = renderToStaticMarkup(
    createElement(NicheConnections, { data: { ...data, concepts: [] }, niche }),
  );
  assert.match(markup, /No concept connections have been curated yet/);
  assert.match(markup, /No related niches have been curated yet/);
  assert.match(markup, /Browse the topic overview/);
});
test("topic explorer supports a no-content view and invalid concept fallback", () => {
  const empty = renderToStaticMarkup(
    createElement(TopicExplorer, { concepts: [], niches: [], sources: [] }),
  );
  assert.match(empty, /No curated niches to show/);
  assert.match(empty, /Choose another supported topic/);
  const invalid = renderToStaticMarkup(
    createElement(TopicExplorer, {
      concepts: data.concepts,
      niches: data.niches,
      sources: data.sources,
      initialConceptId: "unknown",
    }),
  );
  assert.match(invalid, /That concept is not available/);
  assert.equal((invalid.match(/Explore this niche/g) ?? []).length, 3);
});
