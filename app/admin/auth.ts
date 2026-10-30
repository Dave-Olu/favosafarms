import { redirect } from "next/navigation";
import { createSupabaseSessionClient } from "../../lib/supabase/server";

export async function requireCmsAdmin() {
  const supabase = await createSupabaseSessionClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) redirect("/admin/login");

  const { data: membership, error } = await supabase
    .from("admin_users")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) throw new Error(`Could not verify CMS access: ${error.message}`);
  if (!membership) redirect("/admin/login?error=access_denied");

  return { supabase, user };
}
