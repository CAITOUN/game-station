import Image from "next/image";
import Link from "next/link";
import type { Game } from "@/lib/games";

interface SimilarGamesProps {
  games: Game[];
}

export function SimilarGames({ games }: SimilarGamesProps) {
  if (games.length === 0) {
    return null;
  }

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <h3 className="font-medium text-lg mb-4">Similar Games</h3>
      
      <div className="space-y-4">
        {games.map((game) => (
          <Link 
            key={game.id} 
            href={`/games/${game.id}`}
            className="flex items-start gap-3 group"
          >
            <div className="relative h-16 w-24 overflow-hidden rounded-md flex-shrink-0">
              <Image
                src={game.image}
                alt={game.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 96px, 96px"
                unoptimized
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                {game.title}
              </h4>
              
              <div className="mt-1">
                <span className="inline-flex items-center rounded-full bg-primary/10 border border-primary/20 px-2 py-0.5 text-xs text-primary">
                  {game.tags.split(",")[0].trim()}
                </span>
              </div>
            </div>
            
            <div className="flex-shrink-0">
              <span className="inline-flex items-center justify-center rounded-full bg-primary/90 h-8 w-8 text-xs font-medium text-primary-foreground hover:bg-primary transition-colors">
                Play
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 