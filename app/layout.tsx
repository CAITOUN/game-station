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
  description: "Play 458+ free online games instantly in your browser! No downloads needed. Action, adventure, puzzle, racing games and more. Start playing now!",
  keywords: [
    "free online games", 
    "browser games", 
    "play games online", 
    "free games", 
    "web games", 
    "no download games", 
    "instant games",
    "mob city game",
    "mob city games",
    "city games",
    "mafia games",
    "crime games",
    "gangster games",
    "urban games",
    "street games"
  ],
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
  manifest: "/manifest.json",
  other: {
    "google-adsense-account": "ca-pub-4843958868558245",
  },
  // Icons configuration
  icons: {
    icon: [
      { url: "/icon-simple.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml", sizes: "512x512" },
      { url: "/favicon.ico", sizes: "16x16 32x32" },
    ],
    apple: [
      { url: "/icon-simple.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml", sizes: "180x180" },
    ],
    shortcut: "/favicon.ico",
  },
  // Apple specific
  appleWebApp: {
    capable: true,
    title: "GamePlayGo",
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    title: "GamePlayGo - Play Free Online Games",
    description: "Play 458+ free online games instantly in your browser! Including mob city games, mafia adventures, action games and more. No downloads needed.",
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
    description: "Play 458+ free online games instantly! Mob city games, action adventures, racing and more in your browser.",
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
  // Viewport configuration
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* PWA primary color */}
        <meta name="theme-color" content="#3b82f6" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Mobile specific */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="GamePlayGo" />
        
        {/* Prevent zoom on inputs for mobile */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/icon-simple.svg" as="image" type="image/svg+xml" />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
      </head>
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
