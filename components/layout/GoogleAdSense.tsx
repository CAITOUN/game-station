'use client';

import Script from 'next/script';

export default function GoogleAdSense({ adClientId }: { adClientId: string }) {
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClientId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
} 