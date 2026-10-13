import Link from "next/link";
import { notFound } from "next/navigation";
import { content, getTopic } from "@/lib/content";
import { TopicExplorer } from "@/components/topic-explorer";
import { TopicShortcuts } from "@/components/topic-shortcuts";

export function generateStaticParams() {
  return content.topics.map((topic) => ({ topicId: topic.id }));
}

export default async function TopicPage({
  params,
  searchParams,
}: {
  params: Promise<{ topicId: string }>;
  searchParams: Promise<{ concept?: string | string[] }>;
}) {
  const { topicId } = await params;
  const topic = getTopic(topicId);
  if (!topic) notFound();
  const { concept } = await searchParams;
  return (
    <>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Discover</Link>
        <span aria-hidden="true">/</span>
        <span>{topic.title}</span>
      </nav>
      <section className="page-intro">
        <span className="badge">
          {topic.status === "starter"
            ? content.label
            : "Topic overview · niche guidance pending"}
        </span>
        <h1>
          {topic.title}
          <span className="accent">.</span>
        </h1>
        <p className="hero-copy">{topic.summary}</p>
      </section>
      {topic.status === "planned" ? (
        <section className="panel">
          <h2>Detailed guidance is not available yet</h2>
          <p className="muted">
            You confirmed {topic.title}. This subject is supported for topic
            discovery, but curated niches, activities and sources have not been
            added. No recommendations are inferred from your input.
          </p>
          <Link className="button mt-5" href="/topics/health-systems">
            Explore the Health Systems case study →
          </Link>
          <h3 className="mt-7">Choose another subject</h3>
          <TopicShortcuts
            topics={content.topics.filter((item) => item.id !== topicId)}
            compact
          />
        </section>
      ) : (
        <>
          <div className="review-notice mb-8">
            <strong>Starter guidance · source review required</strong>
            <p>{content.disclaimer}</p>
          </div>
          <TopicExplorer
            key={typeof concept === "string" ? concept : topicId}
            concepts={content.concepts.filter(
              (item) => item.topicId === topicId,
            )}
            niches={content.niches.filter((item) => item.topicId === topicId)}
            sources={content.sources}
            initialConceptId={typeof concept === "string" ? concept : undefined}
          />
        </>
      )}
      <section className="panel mt-8" aria-labelledby="other-subjects-title">
        <h2 id="other-subjects-title">Explore another subject</h2>
        <p className="muted">
          Keep exploring through the five agreed MPH subject areas. Detailed
          niche guidance is currently available for Health Systems.
        </p>
        <TopicShortcuts
          topics={content.topics.filter((item) => item.id !== topicId)}
          compact
        />
      </section>
    </>
  );
}
