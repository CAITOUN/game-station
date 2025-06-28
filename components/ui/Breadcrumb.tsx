import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <nav aria-label="面包屑导航" className={`flex items-center space-x-1 text-sm text-muted-foreground ${className}`}>
      {/* 首页链接 */}
      <Link 
        href="/" 
        className="flex items-center hover:text-foreground transition-colors"
        title="返回首页"
      >
        <Home className="w-4 h-4" />
        <span className="sr-only">首页</span>
      </Link>
      
      {items.length > 0 && <ChevronRight className="w-4 h-4" />}
      
      {/* 面包屑项目 */}
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {item.href ? (
            <Link 
              href={item.href}
              className="hover:text-foreground transition-colors truncate max-w-[150px]"
              title={item.label}
            >
              {item.label}
            </Link>
          ) : (
            <span 
              className="text-foreground font-medium truncate max-w-[150px]" 
              aria-current="page"
              title={item.label}
            >
              {item.label}
            </span>
          )}
          {index < items.length - 1 && <ChevronRight className="w-4 h-4" />}
        </React.Fragment>
      ))}
    </nav>
  );
}

// 结构化数据组件
interface BreadcrumbStructuredDataProps {
  items: Array<{ label: string; href?: string }>;
}

export function BreadcrumbStructuredData({ items }: BreadcrumbStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "首页",
        "item": "https://game-station.games/"
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.label,
        ...(item.href && { "item": `https://game-station.games${item.href}` })
      }))
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

 