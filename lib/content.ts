import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { contentDefaults, type SiteContent } from "../content/defaults";
import { createClient as createServerClient } from "./supabase/server";
import { fillMissing } from "./fill-defaults";

type Row = { key: string; value: unknown };

/** Lays DB rows over the content, one whole section per row. */
function applyRows(content: SiteContent, rows: Row[] | null) {
  for (const row of rows ?? []) {
    if (row.key in content && row.value) {
      (content as Record<string, unknown>)[row.key] = fillMissing(
        row.value,
        (contentDefaults as Record<string, unknown>)[row.key],
      );
    }
  }
}

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
    applyRows(merged, data);
  } catch {
    // DB unreachable — serve defaults, never break the site
  }
  return merged;
}

/** Which page the preview shows: the full site or the closed page. */
export type PreviewView = "website" | "gesloten";
export const PREVIEW_VIEW_COOKIE = "mm_voorbeeld_weergave";

export type PreviewState = {
  content: SiteContent;
  /** Sections with a concept that is not live yet. */
  concepten: number;
  weergave: PreviewView;
};

/**
 * Live content with the dashboard's concepts on top, for Draft Mode only.
 * Returns null unless an admin is logged in, so a leftover preview cookie
 * shows the normal site. The concept table is unreadable without a login
 * anyway (see supabase/drafts.sql).
 */
export async function getPreviewContent(): Promise<PreviewState | null> {
  try {
    const supabase = await createServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    const [live, drafts] = await Promise.all([
      supabase.from("site_content").select("key, value"),
      supabase.from("site_content_draft").select("key, value"),
    ]);
    const merged = structuredClone(contentDefaults) as SiteContent;
    applyRows(merged, live.data);
    applyRows(merged, drafts.data);

    const cookieStore = await cookies();
    return {
      content: merged,
      concepten: drafts.data?.length ?? 0,
      weergave:
        cookieStore.get(PREVIEW_VIEW_COOKIE)?.value === "gesloten"
          ? "gesloten"
          : "website",
    };
  } catch {
    return null;
  }
}
