"use client";

import { useEffect, useRef, useState } from "react";

interface GameFrameProps {
  src: string;
  title: string;
}

export function GameFrame({ src, title }: GameFrameProps) {
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Handle iframe load complete event
  const handleLoad = () => {
    setIsLoading(false);
  };

  // Set iframe sandbox attributes and security policies
  useEffect(() => {
    if (iframeRef.current) {
      // Additional iframe security settings can be added here
    }
  }, []);

  return (
    <div className="relative w-full">
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-card/80 z-10">
          <div className="flex flex-col items-center space-y-4">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <p className="text-sm text-muted-foreground">Loading game...</p>
          </div>
        </div>
      )}

      {/* Game iframe with responsive container */}
      <div className="w-full" style={{ height: "calc(min(80vh, 600px))" }}>
        <iframe
          id="game-frame"
          ref={iframeRef}
          src={src}
          title={title}
          className="h-full w-full"
          allowFullScreen
          onLoad={handleLoad}
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        />
      </div>
    </div>
  );
} 