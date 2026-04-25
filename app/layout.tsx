import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
  viewportFit: "cover",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        {/* Yellow safe-area band — fixed to viewport top, fills the iOS notch
            zone so it always reads as the same yellow as the nav. Cannot cause
            horizontal overflow because left:0 + right:0 anchors it to the
            viewport edges, and pointer-events:none keeps it non-interactive. */}
        <div
          aria-hidden
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: "env(safe-area-inset-top, 0px)",
            background: "#FFCA58",
            zIndex: 49,
            pointerEvents: "none",
          }}
        />
        {children}
      </body>
    </html>
  );
}
