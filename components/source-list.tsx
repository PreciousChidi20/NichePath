import type { Source } from "@/lib/content-model";

export function SourceList({ sources }: { sources: Source[] }) {
  return (
    <ul className="source-list">
      {sources.map((source) => (
        <li key={source.id}>
          <div className="flex flex-wrap items-center gap-2">
            <a href={source.url} target="_blank" rel="noopener noreferrer">
              {source.publisher}: {source.title}{" "}
              <span aria-label="opens in a new tab">→</span>
            </a>
            <span className="badge">
              {source.verification === "verified"
                ? "Reviewed"
                : "Source review required"}
            </span>
          </div>
          <p>{source.supports}</p>
          <p className="text-sm">{source.reviewNote}</p>
          {source.reviewedOn && (
            <p className="text-sm">Reviewed: {source.reviewedOn}</p>
          )}
        </li>
      ))}
    </ul>
  );
}
