import Link from "next/link";
import { getAboutMetrics, getBusinessSettings, getPublicFaqs } from "../../lib/cms";
import { isSupabaseConfigured } from "../../lib/supabase/env";
import { createSupabasePublicClient } from "../../lib/supabase/server";
import { requireCmsAdmin } from "./auth";
import CmsDashboard from "./CmsDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!isSupabaseConfigured()) {
    return (
      <main className="cms-setup">
        <div className="cms-setup-card">
          <p className="cms-eyebrow">Favosa Farms CMS</p>
          <h1>Connect your Supabase project</h1>
          <p>
            Add your Supabase project URL and anonymous key to the deployment
            environment, then apply the database migration.
          </p>
          <ol>
            <li>Copy <code>.env.example</code> to <code>.env.local</code>.</li>
            <li>Set <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>.</li>
            <li>Follow the setup steps in <code>supabase/README.md</code>.</li>
          </ol>
          <p className="cms-setup-note">
            No service-role key belongs in this application.
          </p>
        </div>
      </main>
    );
  }

  const { user } = await requireCmsAdmin();
  const supabase = createSupabasePublicClient();
  const [settings, faqs, metrics, inquiryResult] = await Promise.all([
    getBusinessSettings(),
    getPublicFaqs(),
    getAboutMetrics(),
    supabase
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100),
  ]);

  if (inquiryResult.error) {
    throw new Error(`Could not load enquiries: ${inquiryResult.error.message}`);
  }

  return (
    <main className="cms-shell">
      <header className="cms-header">
        <div>
          <p className="cms-eyebrow">Favosa Farms</p>
          <h1>Content dashboard</h1>
          <p>Manage the public information and customer enquiries on your site.</p>
        </div>
        <div className="cms-header-actions">
          <span className="cms-user-email">{user.email}</span>
          <Link className="cms-public-link" href="/" target="_blank">
            View website
          </Link>
        </div>
      </header>
      <CmsDashboard
        faqs={faqs}
        inquiries={inquiryResult.data}
        metrics={metrics}
        settings={settings}
      />
    </main>
  );
}
