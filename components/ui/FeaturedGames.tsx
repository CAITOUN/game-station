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
      <h2 className="category-heading">
        🌟 Featured Games
      </h2>
      
      {/* 全部使用小布局的网格，支持响应式 */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {games.map((game, index) => (
          <Link key={game.id} href={`/games/${game.id}`} className="group">
            <div className="featured-card animate-fade-in-up aspect-[4/3]" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="relative h-full w-full">
                <Image
                  src={game.image}
                  alt={game.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  unoptimized
                />
                <div className="featured-card-content">
                  <h3 className="text-sm font-bold text-white line-clamp-1">
                    {game.title}
                  </h3>
                  {/* 添加游戏标签 */}
                  {game.tags && (
                    <div className="flex gap-1 mt-1">
                      {game.tags.split(',').slice(0, 2).map((tag, tagIndex) => (
                        <span key={tagIndex} className="game-tag text-xs px-1.5 py-0.5">
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
} 