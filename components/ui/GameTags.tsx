import Link from "next/link";
import { cn } from "@/lib/utils";

interface GameTagsProps {
  tags: string;
  className?: string;
  limit?: number;
}

export function GameTags({ tags, className, limit }: GameTagsProps) {
  // 将标签字符串转换为数组
  const tagList = tags.split(",").map(tag => tag.trim()).filter(Boolean);
  
  // 如果有限制，则只显示指定数量的标签
  const displayTags = limit ? tagList.slice(0, limit) : tagList;
  
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {displayTags.map((tag) => (
        <Link
          key={tag}
          href={`/tag/${encodeURIComponent(tag)}`}
          className="inline-flex items-center rounded-full bg-primary/10 border border-primary/20 px-2.5 py-0.5 text-xs text-primary hover:bg-primary/20 transition-colors"
        >
          {tag}
        </Link>
      ))}
      
      {limit && tagList.length > limit && (
        <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">
          +{tagList.length - limit}
        </span>
      )}
    </div>
  );
} 