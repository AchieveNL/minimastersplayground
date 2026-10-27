import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import { draftMode } from "next/headers";
import { getPreviewContent, getSiteContent } from "../lib/content";
import { ContentProvider } from "./content-context";
import SiteGate from "./components/ClosedPage";

export const revalidate = 300;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#FFCA58",
};

export const metadata: Metadata = {
  title: "Minimasters Playground - Tiny Heroes Big Adventures",
  description: "Minimasters is een unieke belevingswereld waar kinderen spelenderwijs de grote-mensenwereld ontdekken.",
  icons: {
    icon: "/favicon-32x32.png",
  },
  openGraph: {
    title: "Minimasters Playground - Tiny Heroes Big Adventures",
    description: "Minimasters is een unieke belevingswereld waar kinderen spelenderwijs de grote-mensenwereld ontdekken.",
    images: [
      {
        url: "/linkpreview.jpeg",
        width: 1200,
        height: 630,
        alt: "Minimasters Playground",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Minimasters Playground - Tiny Heroes Big Adventures",
    description: "Minimasters is een unieke belevingswereld waar kinderen spelenderwijs de grote-mensenwereld ontdekken.",
    images: ["/linkpreview.jpeg"],
  },
};

const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Draft Mode is only switched on by /api/preview for a logged-in admin.
  // Visitors keep getting the cached live site.
  const { isEnabled: previewing } = await draftMode();
  const preview = previewing ? await getPreviewContent() : null;
  const content = preview?.content ?? (await getSiteContent());
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap"
          rel="stylesheet"
        />
        {/* <link rel="preconnect" href="https://fonts.googleapis.com"> */}
        {/* <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin> */}
        <link
          href="https://fonts.googleapis.com/css2?family=Jersey+10&family=Quicksand:wght@300..700&family=Titan+One&display=swap"
          rel="stylesheet"
        ></link>
      </head>
      <body className="bg-[#F8F5E3] overflow-x-clip">
        {/* GoogleTagManager only injects the script tag, so the no-JS
            iframe fallback from the container snippet goes here. */}
        {gtmId ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        ) : null}
        <ContentProvider content={content}>
          <SiteGate
            preview={
              preview
                ? { concepten: preview.concepten, weergave: preview.weergave }
                : null
            }
          >
            {children}
          </SiteGate>
        </ContentProvider>
      </body>
      {gtmId ? <GoogleTagManager gtmId={gtmId} /> : null}
    </html>
  );
}
