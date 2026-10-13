import Link from "next/link";
import type { Topic } from "@/lib/content-model";

/** Topic availability for discovery is separate from detailed guidance coverage. */
export function TopicShortcuts({
  topics,
  compact = false,
}: {
  topics: Topic[];
  compact?: boolean;
}) {
  return (
    <ul
      className={compact ? "topic-shortcuts" : "subject-grid"}
      aria-label="Supported topic shortcuts"
    >
      {topics.map((topic) => (
        <li key={topic.id}>
          <Link
            className={
              compact
                ? "topic-shortcut"
                : `subject-card${topic.status === "starter" ? " available" : ""}`
            }
            href={`/topics/${topic.id}`}
          >
            <span>{topic.title}</span>
            {!compact && (
              <span className="text-sm">
                {topic.status === "starter"
                  ? "Explore starter →"
                  : "Topic overview →"}
              </span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}
