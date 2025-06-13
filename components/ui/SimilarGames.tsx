import Image from "next/image";
import Link from "next/link";
import { Gamepad2 } from "lucide-react";
import type { Game } from "@/lib/games";

interface SimilarGamesProps {
  games: Game[];
}

export function SimilarGames({ games }: SimilarGamesProps) {
  if (games.length === 0) {
    return null;
  }

  return (
    <div className="rounded-xl overflow-hidden border border-blue-500/20 bg-gradient-to-br from-blue-900/10 to-purple-900/10 backdrop-blur-sm">
      <div className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500/20 to-purple-600/20 border-b border-blue-500/20">
        <Gamepad2 className="h-5 w-5 text-blue-400" />
        <h3 className="font-medium text-lg bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Similar Games</h3>
      </div>
      
      <div className="p-4 space-y-4">
        {games.map((game) => (
          <Link 
            key={game.id} 
            href={`/games/${game.id}`}
            className="flex items-start gap-3 group rounded-lg p-2 transition-colors hover:bg-blue-500/10"
          >
            <div className="relative h-16 w-24 overflow-hidden rounded-md flex-shrink-0 shadow-lg shadow-blue-500/5">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-600/30 mix-blend-overlay z-10 opacity-0 group-hover:opacity-60 transition-opacity"></div>
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
              <h4 className="font-medium text-sm line-clamp-2 group-hover:text-blue-300 transition-colors">
                {game.title}
              </h4>
              
              <div className="mt-1">
                <span className="inline-flex items-center rounded-full bg-blue-500/10 border border-blue-400/30 px-2 py-0.5 text-xs font-medium text-blue-100 group-hover:bg-blue-500/20 transition-colors">
                  {game.tags.split(",")[0].trim()}
                </span>
              </div>
            </div>
            
            <div className="flex-shrink-0">
                              <span className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500/80 to-purple-600/80 h-8 w-8 text-xs font-medium text-white group-hover:from-blue-500 group-hover:to-purple-600 transition-colors shadow-lg group-hover:shadow-blue-500/20 transform group-hover:scale-110 transition-transform">
                  Play
                </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 