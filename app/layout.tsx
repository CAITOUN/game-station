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
  title: {
    default: "GamePlayGo - Play Free Online Games | Browser Games",
    template: "%s | GamePlayGo"
  },
  description: "Play 280+ free online games instantly in your browser! No downloads needed. Action, adventure, puzzle, racing games and more. Start playing now!",
  keywords: ["free online games", "browser games", "play games online", "free games", "web games", "no download games", "instant games"],
  authors: [{ name: "GamePlayGo" }],
  creator: "GamePlayGo",
  publisher: "GamePlayGo",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://gameplaygo.vercel.app"),
  alternates: {
    canonical: "https://gameplaygo.vercel.app",
  },
  other: {
    "google-adsense-account": "ca-pub-4843958868558245",
  },
  openGraph: {
    title: "GamePlayGo - Play Free Online Games",
    description: "Play 280+ free online games instantly in your browser! No downloads needed. Action, adventure, puzzle, racing games and more.",
    url: "https://gameplaygo.vercel.app",
    siteName: "GamePlayGo",
    images: [
      {
        url: "/images/og-image.svg",
        width: 1200,
        height: 630,
        alt: "GamePlayGo - Free Online Games",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GamePlayGo - Play Free Online Games",
    description: "Play 280+ free online games instantly in your browser! No downloads needed.",
    images: ["/images/twitter-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // 添加您的Google验证码
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
