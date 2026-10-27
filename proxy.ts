import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

/**
 * Keeps the admin's Supabase session fresh for preview requests.
 *
 * Server Components cannot write cookies, so a token refreshed while
 * rendering the preview would be lost and the rotated refresh token would
 * log the dashboard out. Refreshing here writes the new cookies onto the
 * response first. It only runs for the preview route and for requests that
 * carry the Draft Mode cookie, so normal visitors never hit Supabase Auth.
 */
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  await supabase.auth.getUser();
  return response;
}

export const config = {
  matcher: [
    "/api/preview",
    {
      source: "/((?!_next/|assets/|api/|favicon).*)",
      has: [{ type: "cookie", key: "__prerender_bypass" }],
    },
  ],
};
