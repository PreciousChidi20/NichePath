import Link from "next/link";
export default function NotFound() {
  return (
    <section className="hero">
      <div className="eyebrow">Outside this starter</div>
      <h1>This path isn’t available yet.</h1>
      <p className="hero-copy">
        Only Health Systems and its three starter niches are available in
        Milestone 1.
      </p>
      <Link className="button mt-6" href="/topics/health-systems">
        Explore Health Systems →
      </Link>
    </section>
  );
}
