import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { contentDefaults, type SiteContent } from "../content/defaults";

// Read-only fetch with anon key; no cookies needed so plain client is fine
// (keeps this callable from cached server contexts).
export async function getSiteContent(): Promise<SiteContent> {
  const merged = structuredClone(contentDefaults) as SiteContent;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return merged;

  try {
    const supabase = createSupabaseClient(url, key);
    const { data, error } = await supabase
      .from("site_content")
      .select("key, value");
    if (error || !data) return merged;
    for (const row of data) {
      if (row.key in merged && row.value) {
        (merged as Record<string, unknown>)[row.key] = row.value;
      }
    }
  } catch {
    // DB unreachable — serve defaults, never break the site
  }
  return merged;
}
