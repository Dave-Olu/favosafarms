import Link from "next/link";

export default function NotFound() {
  return (
    <main className="wrap not-found">
      <div>
        <p className="eyebrow">404</p>
        <h1>We couldn&apos;t find that page</h1>
        <p>The page may have moved or the link may be out of date.</p>
        <Link className="btn-solid on-dark" href="/">
          Return to the homepage
        </Link>
      </div>
    </main>
  );
}
