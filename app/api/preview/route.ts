import { cookies, draftMode } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import { createClient } from "../../../lib/supabase/server";
import { PREVIEW_VIEW_COOKIE } from "../../../lib/content";

/**
 * Only same-site paths, so `terug` cannot bounce to another domain. Browsers
 * read `/\evil.com` as `//evil.com`, so the result is resolved and its origin
 * compared rather than trusting a prefix check.
 */
function safePath(value: string | null, base: URL) {
  if (
    !value ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    value.includes("\\") ||
    /[\x00-\x1f]/.test(value)
  ) {
    return "/";
  }
  try {
    const url = new URL(value, base);
    return url.origin === base.origin ? url.pathname + url.search + url.hash : "/";
  } catch {
    return "/";
  }
}

/**
 * /api/preview                      → start the preview (admins only)
 * /api/preview?weergave=gesloten    → show the closed page in the preview
 * /api/preview?weergave=website     → show the full site in the preview
 * /api/preview?actie=uit            → stop the preview, back to /beheer
 */
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const draft = await draftMode();
  const cookieStore = await cookies();

  if (params.get("actie") === "uit") {
    draft.disable();
    cookieStore.delete(PREVIEW_VIEW_COOKIE);
    redirect("/beheer");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/beheer");

  const weergave = params.get("weergave");
  if (weergave === "gesloten" || weergave === "website") {
    cookieStore.set(PREVIEW_VIEW_COOKIE, weergave, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
    });
  } else {
    cookieStore.delete(PREVIEW_VIEW_COOKIE);
  }

  draft.enable();
  redirect(safePath(params.get("terug"), request.nextUrl));
}
