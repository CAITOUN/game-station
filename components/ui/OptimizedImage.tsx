"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageIcon } from "lucide-react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  fill?: boolean;
  unoptimized?: boolean;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  sizes,
  placeholder = "empty",
  blurDataURL,
  fill = false,
  unoptimized = false,
  ...props
}: OptimizedImageProps) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // 生成模糊占位符
  const generateBlurDataURL = () => {
    if (blurDataURL) return blurDataURL;
    
    // 生成简单的渐变模糊占位符
    const svg = `
      <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:0.3" />
            <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:0.3" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad)" />
      </svg>
    `;
    
    return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
  };

  // 错误时显示的占位符
  if (error) {
    return (
      <div 
        className={`flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 ${className}`}
        style={{ width, height }}
      >
        <ImageIcon className="w-8 h-8 text-gray-400" />
        <span className="sr-only">{alt}</span>
      </div>
    );
  }

  const imageProps = {
    src,
    alt,
    className: `transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`,
    onError: () => setError(true),
    onLoad: () => setLoaded(true),
    priority,
    sizes: sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    placeholder: placeholder as any,
    ...(placeholder === "blur" && { blurDataURL: generateBlurDataURL() }),
    unoptimized,
    ...props,
  };

  if (fill) {
    return <Image {...imageProps} fill />;
  }

  return (
    <Image
      {...imageProps}
      width={width || 400}
      height={height || 300}
    />
  );
} 