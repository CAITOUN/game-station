import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/components/layout/GoogleAnalytics";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GamePlayGo - Play Free Online Games",
  description: "Explore a collection of free online games across various categories. Play directly in your browser without downloads.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <GoogleAnalytics gaId="G-3WYWSVQW67" />
      <body
        className={`${inter.className} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
