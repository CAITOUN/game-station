"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";

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
      {/* Game container with gradient border and effects - all decorative elements are pointer-events-none */}
      <div className="relative w-full rounded-xl overflow-hidden bg-gradient-to-br from-blue-500/5 to-purple-600/5 p-[2px]">
        {/* Decorative background effects - ensure they don't block interactions */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 blur-[8px] opacity-25 pointer-events-none"></div>
        <div className="absolute inset-0 rounded-xl overflow-hidden [mask-image:linear-gradient(white,transparent)] bg-[radial-gradient(circle_at_top_right,rgba(95,96,250,0.2),transparent_65%)] pointer-events-none"></div>
        <div className="absolute inset-0 rounded-xl overflow-hidden border border-blue-500/20 pointer-events-none"></div>

        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-10 rounded-xl pointer-events-none">
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="h-10 w-10 animate-spin text-blue-400" />
              <p className="text-sm font-medium bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Loading your game...</p>
            </div>
          </div>
        )}

        {/* Game iframe with responsive container */}
        <div className="w-full rounded-xl overflow-hidden bg-black relative" style={{ height: "calc(min(80vh, 600px))" }}>
          <iframe
            id="game-frame"
            ref={iframeRef}
            src={src}
            title={title}
            className="h-full w-full absolute inset-0"
            allowFullScreen
            onLoad={handleLoad}
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          />
        </div>
      </div>
    </div>
  );
} 