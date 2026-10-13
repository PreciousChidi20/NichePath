"use client";

import Link from "next/link";
import { useState } from "react";
import type { Concept, Niche, Source } from "@/lib/content-model";
import { SourceList } from "@/components/source-list";

export function TopicExplorer({
  concepts,
  niches,
  sources,
  initialConceptId,
}: {
  concepts: Concept[];
  niches: Niche[];
  sources: Source[];
  initialConceptId?: string;
}) {
  const [selectedId, setSelectedId] = useState(
    concepts.some((concept) => concept.id === initialConceptId)
      ? initialConceptId
      : undefined,
  );
  const selected = concepts.find((concept) => concept.id === selectedId);
  const invalidInitialConcept =
    !!initialConceptId &&
    !concepts.some((concept) => concept.id === initialConceptId);
  const visibleNiches = selected
    ? niches.filter((niche) =>
        selected.connections.some(
          (connection) => connection.nicheId === niche.id,
        ),
      )
    : niches;
  return (
    <>
      <section className="panel" aria-labelledby="interest-title">
        <div className="eyebrow">01 / Notice an interest</div>
        <h2 id="interest-title">Which question draws you in?</h2>
        <p className="muted">
          Choose a concept to see a curated connection to a more specific
          interest and a professional domain.
        </p>
        {invalidInitialConcept && !selected && (
          <p className="feedback mt-4">
            That concept is not available in this topic. Showing all curated
            niches instead.
          </p>
        )}
        {!concepts.length && (
          <p className="feedback mt-4">
            No concept connections have been curated for this topic yet. You can
            browse available niches below.
          </p>
        )}
        <div className="concept-grid">
          {concepts.map((concept) => (
            <button
              key={concept.id}
              type="button"
              className="concept-button"
              aria-pressed={selectedId === concept.id}
              onClick={() =>
                setSelectedId(
                  selectedId === concept.id ? undefined : concept.id,
                )
              }
            >
              <span className="font-semibold">{concept.title}</span>
              <span>{concept.interestPrompt}</span>
            </button>
          ))}
        </div>
        <button
          type="button"
          className="text-button mt-5"
          onClick={() => setSelectedId(undefined)}
        >
          Show all niches
        </button>
      </section>
      <section className="mt-10" aria-labelledby="connections-title">
        <div className="eyebrow">02 / Follow a connection</div>
        <h2 id="connections-title">
          {selected
            ? `Connections from ${selected.title.toLowerCase()}`
            : "Directions to explore"}
        </h2>
        <p className="muted mb-6">
          These are exploratory connections, not a career assessment or a
          ranking of your interests.
        </p>
        <p className="text-sm muted mb-5" role="status">
          Showing {visibleNiches.length} of {niches.length} niches
        </p>
        {!visibleNiches.length && (
          <div className="feedback">
            <h3>No curated niches to show</h3>
            <p>
              This view has no available niche connections yet.{" "}
              <Link href="/">Choose another supported topic</Link>, or clear
              your concept selection.
            </p>
          </div>
        )}
        <div className="niche-grid" aria-live="polite">
          {visibleNiches.map((niche, index) => {
            const connection = selected?.connections.find(
              (item) => item.nicheId === niche.id,
            );
            const related = concepts.filter((concept) =>
              concept.connections.some((item) => item.nicheId === niche.id),
            );
            return (
              <article key={niche.id} className="panel niche-card">
                <span className="card-number" aria-hidden="true">
                  0{index + 1}
                </span>
                <span className="badge">Illustrative niche</span>
                <h3>{niche.title}</h3>
                <p>{niche.description}</p>
                <div className="connection-note">
                  <strong>
                    {connection ? "Why this connects" : "Interests to explore"}
                  </strong>
                  <p>
                    {connection?.explanation ??
                      related.map((concept) => concept.title).join(" · ")}
                  </p>
                </div>
                <p className="text-sm muted">
                  Professional domain: {niche.illustrativePathways[1]}
                </p>
                <Link
                  className="card-link"
                  href={`/topics/${niche.topicId}/niches/${niche.id}`}
                >
                  Explore this niche <span aria-hidden="true">→</span>
                </Link>
              </article>
            );
          })}
        </div>
        {selected && (
          <div className="mt-6 panel">
            <h3>Source for this connection</h3>
            <p className="text-sm muted">
              The connection is drafted for exploration. Its source support
              still needs review.
            </p>
            <SourceList
              sources={sources.filter((source) =>
                selected.connections.some((connection) =>
                  connection.sourceIds.includes(source.id),
                ),
              )}
            />
          </div>
        )}
      </section>
    </>
  );
}
