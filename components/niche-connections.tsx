import Link from "next/link";
import type { Content, Niche } from "@/lib/content-model";
import { getNicheExploration } from "@/lib/exploration";

export function NicheConnections({
  data,
  niche,
}: {
  data: Content;
  niche: Niche;
}) {
  const { concepts, related } = getNicheExploration(data, niche);
  const sources = (ids: string[]) =>
    data.sources.filter((source) => ids.includes(source.id));
  return (
    <section className="panel mt-8" aria-labelledby="related-interests-title">
      <div className="eyebrow">Follow your curiosity</div>
      <h2 id="related-interests-title">Connected concepts and interests</h2>
      <p className="muted">
        Curated connections to explore, not a ranking or an assessment of your
        interests. Explanations and proposed source support still require
        editorial review.
      </p>
      <h3 className="mt-7">Academic concepts behind this niche</h3>
      {concepts.length ? (
        <ul className="relationship-grid">
          {concepts.map(({ concept, explanation }) => (
            <li key={concept.id} className="relationship-card">
              <Link
                className="card-link"
                href={`/topics/${concept.topicId}?concept=${concept.id}`}
              >
                Explore {concept.title} →
              </Link>
              <p>{explanation}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="muted">
          No concept connections have been curated yet.{" "}
          <Link href={`/topics/${niche.topicId}`}>
            Browse the topic overview
          </Link>
          .
        </p>
      )}
      <h3 className="mt-7">Related areas of interest</h3>
      {related.length ? (
        <ul className="relationship-grid">
          {related.map(({ niche: target, explanation, sourceIds }) => (
            <li key={target.id} className="relationship-card">
              <Link
                className="card-link"
                href={`/topics/${target.topicId}/niches/${target.id}`}
              >
                Explore {target.title} →
              </Link>
              <p>{explanation}</p>
              <p className="text-sm muted mt-3">Proposed reference pages:</p>
              <ul className="text-sm space-y-2 mt-2">
                {sources(sourceIds).map((source) => (
                  <li key={source.id}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {source.publisher}: {source.title}
                    </a>{" "}
                    <span className="badge">
                      {source.verification === "verified"
                        ? "Reviewed"
                        : "Source review required"}
                    </span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p className="muted">
          No related niches have been curated yet.{" "}
          <Link href={`/topics/${niche.topicId}`}>
            Explore other interests in this topic
          </Link>
          .
        </p>
      )}
    </section>
  );
}
