import Image from "next/image";
import Link from "next/link";

interface GameCardProps {
  id: number;
  title: string;
  image: string;
  tags: string;
  isNew?: boolean;
  isHot?: boolean;
  isFeatured?: boolean;
}

export function GameCard({
  id,
  title,
  image,
  tags,
  isNew = false,
  isHot = false,
  isFeatured = false,
}: GameCardProps) {
  // Convert tags string to array
  const tagList = tags.split(",");
  
  return (
    <Link href={`/games/${id}`} className="group">
      <div className="relative overflow-hidden rounded-lg transition-all duration-300 hover:shadow-xl gradient-border">
        <div className="aspect-[16/9] w-full overflow-hidden rounded-t-lg bg-muted">
          <div className="relative h-full w-full">
            <Image
              src={image}
              alt={title}
              width={320}
              height={180}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          {/* Status badges */}
          <div className="absolute top-2 left-2 flex gap-1">
            {isNew && (
              <span className="rounded bg-primary px-1.5 py-0.5 text-xs font-medium text-primary-foreground">
                New
              </span>
            )}
            {isHot && (
              <span className="rounded bg-destructive px-1.5 py-0.5 text-xs font-medium text-primary-foreground">
                Hot
              </span>
            )}
            {isFeatured && (
              <span className="rounded bg-accent px-1.5 py-0.5 text-xs font-medium text-accent-foreground">
                Featured
              </span>
            )}
          </div>
        </div>
        
        <div className="p-3 gradient-card rounded-b-lg">
          <h3 className="font-medium line-clamp-1">{title}</h3>
          
          <div className="mt-1 flex flex-wrap gap-1">
            {tagList.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-primary/10 border border-primary/20 px-2 py-0.5 text-xs text-primary"
              >
                {tag.trim()}
              </span>
            ))}
            {tagList.length > 3 && (
              <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                +{tagList.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
} 