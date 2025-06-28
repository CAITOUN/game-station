import Image from "next/image";
import Link from "next/link";
import type { Game } from "@/lib/games";

interface FeaturedGamesProps {
  games: Game[];
}

export function FeaturedGames({ games }: FeaturedGamesProps) {
  if (games.length === 0) {
    return null;
  }

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold tracking-tight mb-4" style={{
        backgroundImage: "linear-gradient(to right, #60a5fa, #a855f7)",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        color: "transparent"
      }}>Featured Games</h2>
      
      {/* 全部使用小布局的网格，支持响应式 */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {games.map((game) => (
          <Link key={game.id} href={`/games/${game.id}`} className="group">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg gradient-border">
              <div className="relative h-full w-full">
                <Image
                  src={game.image}
                  alt={game.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 p-2">
                  <h3 className="text-sm font-bold text-white line-clamp-1">
                    {game.title}
                  </h3>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
} 