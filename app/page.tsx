import Link from "next/link";
import { content } from "@/lib/content";
import { DiscoveryForm } from "@/components/discovery-form";
import { TopicShortcuts } from "@/components/topic-shortcuts";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="eyebrow">From coursework to curiosity</div>
        <h1>
          Find the interest
          <br />
          within your subject<span className="accent">.</span>
        </h1>
        <p className="hero-copy">
          A broad subject can hold a very specific interest. Explore the
          concepts that catch your attention, see where they matter, and take
          one practical step.
        </p>
        <div className="hero-trail" aria-label="Your exploration journey">
          <span>Academic concept</span>
          <span aria-hidden="true">→</span>
          <span>Specific interest</span>
          <span aria-hidden="true">→</span>
          <span>Practical next step</span>
        </div>
      </section>
      <div className="home-grid">
        <DiscoveryForm data={content} />
        <aside className="starter-aside">
          <div className="eyebrow">Your first exploration</div>
          <h2>Health Systems</h2>
          <p>
            How do decisions, money and people shape the care a health system
            can provide?
          </p>
          <ul className="starter-list">
            <li>Leadership & governance</li>
            <li>Health financing</li>
            <li>Health workforce</li>
          </ul>
          <Link className="button button-light" href="/topics/health-systems">
            Explore Health Systems →
          </Link>
          <p className="mt-6 text-sm">
            A small starter dataset. Source verification and editorial review
            are pending.
          </p>
        </aside>
      </div>
      <section className="mt-12" aria-labelledby="subjects-title">
        <div className="eyebrow">The bigger picture</div>
        <h2 id="subjects-title">Five subjects. Find your starting point.</h2>
        <p className="muted">
          Discover any of these subjects. Health Systems has starter niche
          guidance; the other four have topic overviews, with detailed guidance
          still planned.
        </p>
        <TopicShortcuts topics={content.topics} />
      </section>
      <div className="review-notice mt-10">
        <strong>Educational starter · content review required</strong>
        <p>
          {content.disclaimer} Submitted text is matched locally and is not
          saved or sent to a service.
        </p>
      </div>
    </>
  );
}
