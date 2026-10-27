"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../../lib/supabase/server";

/**
 * Puts every concept live at once, then empties the concept table and
 * refreshes the cached site. All sections go together so the site is never
 * half-updated.
 */
export async function publishDrafts(): Promise<
  { ok: true; count: number } | { ok: false; error: string }
> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Niet ingelogd" };

  const { data: drafts, error } = await supabase
    .from("site_content_draft")
    .select("key, value, updated_at");
  if (error) return { ok: false, error: error.message };
  if (!drafts.length) return { ok: true, count: 0 };

  const now = new Date().toISOString();
  const { error: publishError } = await supabase.from("site_content").upsert(
    drafts.map((d) => ({ key: d.key, value: d.value, updated_at: now })),
  );
  if (publishError) return { ok: false, error: publishError.message };

  // Only remove the exact versions that went live: a concept saved while
  // this ran has a newer updated_at, so it stays and is published next time.
  const results = await Promise.all(
    drafts.map((d) =>
      supabase
        .from("site_content_draft")
        .delete()
        .eq("key", d.key)
        .eq("updated_at", d.updated_at),
    ),
  );
  const deleteError = results.find((r) => r.error)?.error;

  revalidatePath("/", "layout");
  if (deleteError) {
    return {
      ok: false,
      error: `staat live, maar concepten opruimen mislukte (${deleteError.message})`,
    };
  }
  return { ok: true, count: drafts.length };
}
