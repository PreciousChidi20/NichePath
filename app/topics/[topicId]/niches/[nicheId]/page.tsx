import Link from "next/link";
import { notFound } from "next/navigation";
import { content, getNiche, getSources, getTopic } from "@/lib/content";
import { SourceList } from "@/components/source-list";
import { NicheConnections } from "@/components/niche-connections";

export function generateStaticParams() {
  return content.niches.map((niche) => ({
    topicId: niche.topicId,
    nicheId: niche.id,
  }));
}

export default async function NichePage({
  params,
}: {
  params: Promise<{ topicId: string; nicheId: string }>;
}) {
  const { topicId, nicheId } = await params;
  const niche = getNiche(topicId, nicheId);
  const topic = getTopic(topicId);
  if (!niche || !topic) notFound();
  return (
    <>
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Discover</Link>
        <span aria-hidden="true">/</span>
        <Link href={`/topics/${topicId}`}>{topic.title}</Link>
        <span aria-hidden="true">/</span>
        <span>{niche.title}</span>
      </nav>
      <section className="page-intro">
        <div className="eyebrow">A direction to explore</div>
        <h1>
          {niche.title}
          <span className="accent">.</span>
        </h1>
        <p className="hero-copy">{niche.description}</p>
      </section>
      <div className="review-notice mb-8">
        <strong>Illustrative guidance · source review required</strong>
        <p>{content.disclaimer}</p>
      </div>
      <div className="detail-grid">
        <div className="space-y-7">
          <section className="panel" aria-labelledby="niche-overview-title">
            <div className="eyebrow">Understand the niche</div>
            <h2 id="niche-overview-title">What this niche involves</h2>
            <div className="space-y-4">
              {niche.overview.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
          <section className="panel">
            <div className="eyebrow">Make the connection</div>
            <h2>Where it is applied</h2>
            <ul className="content-list">
              {niche.practicalApplications.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <h3 className="mt-7">Skills to explore</h3>
            <ul className="skill-list">
              {niche.skills.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section className="panel activity-panel">
            <div className="flex flex-wrap justify-between gap-3">
              <div className="eyebrow">03 / Try something practical</div>
              <span className="badge">
                About {niche.activity.estimatedMinutes} minutes
              </span>
            </div>
            <h2>{niche.activity.title}</h2>
            <p>{niche.activity.objective}</p>
            <ol className="activity-steps">
              {niche.activity.instructions.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <div className="output-note">
              <strong>Your output</strong>
              <p>{niche.activity.expectedOutput}</p>
            </div>
            <p className="mt-4 text-sm muted">
              An original practice activity using hypothetical examples. It is
              not an assessed task or a validated professional tool.
            </p>
          </section>
        </div>
        <aside className="space-y-7">
          <section className="next-step-panel">
            <div className="eyebrow">One small next step</div>
            <h2>Keep your curiosity moving.</h2>
            <p>{niche.nextStep}</p>
          </section>
          <section className="panel">
            <h2>Where this could lead</h2>
            <ul className="content-list">
              {niche.illustrativePathways.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-4 text-sm muted">
              Illustrative academic and professional domains. Entry requirements
              and opportunities depend on your context; these are not job or
              qualification guarantees.
            </p>
          </section>
        </aside>
      </div>
      <NicheConnections data={content} niche={niche} />
      <section className="panel mt-8" aria-labelledby="sources-title">
        <div className="eyebrow">Read, question, verify</div>
        <h2 id="sources-title">Sources to review</h2>
        <p className="muted">
          Proposed WHO reference pages, not verified citations. This environment
          could not access them. Check the pages and their support for this
          guidance before relying on the starter content.
        </p>
        <SourceList sources={getSources(niche.sourceIds)} />
      </section>
      <Link className="card-link mt-8" href={`/topics/${topicId}`}>
        ← Explore another {topic.title} interest
      </Link>
    </>
  );
}
