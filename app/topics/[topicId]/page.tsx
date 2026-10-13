import Link from "next/link";
import { notFound } from "next/navigation";
import { content, getTopic } from "@/lib/content";
import { TopicExplorer } from "@/components/topic-explorer";

export function generateStaticParams() {
  return content.topics
    .filter((topic) => topic.status === "starter")
    .map((topic) => ({ topicId: topic.id }));
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
  if (!topic || topic.status !== "starter") notFound();
  const { concept } = await searchParams;
  return (
    <>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Discover</Link>
        <span aria-hidden="true">/</span>
        <span>{topic.title}</span>
      </nav>
      <section className="page-intro">
        <span className="badge">{content.label}</span>
        <h1>
          {topic.title}
          <span className="accent">.</span>
        </h1>
        <p className="hero-copy">{topic.summary}</p>
      </section>
      <div className="review-notice mb-8">
        <strong>Starter guidance · source review required</strong>
        <p>{content.disclaimer}</p>
      </div>
      <TopicExplorer
        key={typeof concept === "string" ? concept : topicId}
        concepts={content.concepts.filter((item) => item.topicId === topicId)}
        niches={content.niches.filter((item) => item.topicId === topicId)}
        sources={content.sources}
        initialConceptId={typeof concept === "string" ? concept : undefined}
      />
    </>
  );
}
