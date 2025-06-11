import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/components/layout/GoogleAnalytics";
import GoogleAdSense from "@/components/layout/GoogleAdSense";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GamePlayGo - Play Free Online Games",
  description: "Explore a collection of free online games across various categories. Play directly in your browser without downloads.",
  metadataBase: new URL("https://gameplaygo.vercel.app"),
  alternates: {
    canonical: "https://gameplaygo.vercel.app",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gameplaygo.vercel.app",
    title: "GamePlayGo - Play Free Online Games",
    description: "Explore a collection of free online games across various categories. Play directly in your browser without downloads.",
    siteName: "GamePlayGo",
    images: [
      {
        url: "/images/og-image.svg",
        width: 1200,
        height: 630,
        alt: "GamePlayGo - Play Free Online Games"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "GamePlayGo - Play Free Online Games",
    description: "Explore a collection of free online games across various categories. Play directly in your browser without downloads.",
    images: ["/images/twitter-image.svg"]
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <GoogleAnalytics gaId="G-3WYWSVQW67" />
      <GoogleAdSense adClientId="ca-pub-4843958868558245" />
      <body
        className={`${inter.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
