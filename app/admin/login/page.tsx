import type { Metadata } from "next";
import Link from "next/link";
import { isSupabaseConfigured } from "../../../lib/supabase/env";
import SignInForm from "./SignInForm";

export const metadata: Metadata = {
  title: "CMS sign in",
  robots: { index: false, follow: false },
};

type LoginPageProps = {
  searchParams: Promise<{ error?: string; next?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const destination =
    params.next?.startsWith("/admin") && params.next !== "/admin/login"
      ? params.next
      : "/admin";

  return (
    <main className="cms-login-page">
      <section className="cms-login-card">
        <p className="cms-eyebrow">Favosa Farms CMS</p>
        <h1>Admin sign in</h1>
        <p>Sign in with an account that has been granted CMS access.</p>
        {params.error === "access_denied" ? (
          <p className="cms-alert cms-alert-error" role="alert">
            This account is not authorized to manage the site. Ask an existing
            project owner to grant CMS access.
          </p>
        ) : null}
        {isSupabaseConfigured() ? (
          <SignInForm destination={destination} />
        ) : (
          <div className="cms-alert">
            Configure the Supabase environment variables and apply the database
            migration before signing in. See <code>supabase/README.md</code>.
          </div>
        )}
        <Link className="cms-back-link" href="/">
          ← Back to the website
        </Link>
      </section>
    </main>
  );
}
