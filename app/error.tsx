"use client";

import Link from "next/link";

export default function ExplorationError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="hero" aria-labelledby="exploration-error-title">
      <div className="eyebrow">Exploration unavailable</div>
      <h1 id="exploration-error-title">We couldn’t load this exploration.</h1>
      <p className="hero-copy">
        Please try again, or return to topic discovery. We cannot show guidance
        when its content is unavailable.
      </p>
      <div className="mt-6 flex flex-wrap gap-4">
        <button className="button" type="button" onClick={reset}>
          Try again
        </button>
        <Link className="button button-light" href="/">
          Return to topic discovery
        </Link>
      </div>
    </section>
  );
}
