"use client";

import { useState, useCallback, useEffect } from "react";
import { Maximize, Minimize } from "lucide-react";

interface FullscreenButtonProps {
  targetId: string;
}

export function FullscreenButton({ targetId }: FullscreenButtonProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = useCallback(() => {
    const element = document.getElementById(targetId);
    
    if (!element) return;
    
    if (!isFullscreen) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if ((element as any).webkitRequestFullscreen) {
        (element as any).webkitRequestFullscreen();
      } else if ((element as any).msRequestFullscreen) {
        (element as any).msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
      setIsFullscreen(false);
    }
  }, [isFullscreen, targetId]);

  // Monitor fullscreen state changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(
        document.fullscreenElement !== null ||
        (document as any).webkitFullscreenElement !== null ||
        (document as any).msFullscreenElement !== null
      );
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("msfullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("msfullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={toggleFullscreen}
      className="absolute bottom-4 right-4 rounded-full bg-gradient-to-r from-blue-500/80 to-purple-600/80 p-3 text-white hover:from-blue-500 hover:to-purple-600 transition-all duration-300 shadow-lg backdrop-blur-sm z-20 transform hover:scale-105 hover:shadow-blue-500/20 hover:shadow-xl"
      aria-label={isFullscreen ? "Exit Fullscreen" : "Fullscreen Mode"}
    >
      {isFullscreen ? (
        <Minimize className="h-5 w-5" />
      ) : (
        <Maximize className="h-5 w-5" />
      )}
      <span className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping"></span>
    </button>
  );
} 