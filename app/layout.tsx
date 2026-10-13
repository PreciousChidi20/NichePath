import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "NichePath · Find the interest within",
    template: "%s · NichePath",
  },
  description:
    "A curated learning companion connecting MPH concepts to interests, practical activities and next steps.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <header className="site-header">
          <div className="shell flex items-center justify-between gap-4">
            <Link className="brand" href="/" aria-label="NichePath home">
              <span className="brand-mark" aria-hidden="true">
                n
              </span>
              NichePath
            </Link>
            <span className="header-note">
              MPH learning companion <span className="badge">Starter</span>
            </span>
          </div>
        </header>
        <main id="main" className="shell" tabIndex={-1}>
          {children}
        </main>
        <footer className="shell site-footer">
          <p>Made for curiosity. Built for your next small step.</p>
          <p>Milestone 2 · Curated discovery · No AI or LMS connection</p>
        </footer>
      </body>
    </html>
  );
}
