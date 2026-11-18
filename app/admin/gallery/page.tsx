import type { Metadata } from "next";
import Link from "next/link";
import { createSupabasePublicClient } from "../../../lib/supabase/server";
import { isSupabaseConfigured } from "../../../lib/supabase/env";
import { requireCmsAdmin } from "../auth";
import { signOutCms } from "../actions";
import GalleryManager from "./GalleryManager";

export const metadata: Metadata = {
  title: "Manage Gallery",
};

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  if (!isSupabaseConfigured()) {
    return (
      <main className="cms-setup">
        <div className="cms-setup-card">
          <p className="cms-eyebrow">Favosa Farms CMS</p>
          <h1>Connect your Supabase project</h1>
          <p>Add the Supabase project URL and anonymous key, then apply the database migrations.</p>
          <Link className="cms-public-link" href="/admin">Back to dashboard</Link>
        </div>
      </main>
    );
  }

  const { user } = await requireCmsAdmin();
  const supabase = createSupabasePublicClient();
  const { data: items, error } = await supabase
    .from("gallery_items")
    .select("*")
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Could not load gallery items: ${error.message}`);
  }

  return (
    <main className="cms-root">
      <div className="cms-shell">
        <header className="cms-header">
          <div>
            <p className="cms-eyebrow">Favosa Farms</p>
            <h1>Manage gallery</h1>
            <p>Upload photos and videos to the public farm gallery.</p>
          </div>
          <div className="cms-header-actions">
            <span className="cms-user-email">{user.email}</span>
            <Link className="cms-public-link" href="/gallery" target="_blank">View gallery</Link>
          </div>
        </header>
        <nav aria-label="CMS navigation" className="cms-section-nav">
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/gallery">Gallery</Link>
          <form action={signOutCms}>
            <button className="cms-signout-button" type="submit">Sign out</button>
          </form>
        </nav>
        <GalleryManager items={items} />
      </div>
    </main>
  );
}
