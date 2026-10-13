import Link from "next/link";
export default function NotFound() {
  return (
    <section className="hero">
      <div className="eyebrow">Outside this starter</div>
      <h1>This path isn’t available yet.</h1>
      <p className="hero-copy">
        Choose one of the five supported subject overviews. Detailed starter
        niches are currently available only for Health Systems.
      </p>
      <Link className="button mt-6" href="/topics/health-systems">
        Explore Health Systems →
      </Link>
    </section>
  );
}
