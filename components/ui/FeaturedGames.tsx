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

  // Use the first game as the main featured game
  const mainGame = games[0];
  
  // Use the rest for the grid
  const otherGames = games.slice(1);

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold tracking-tight mb-4" style={{
        backgroundImage: "linear-gradient(to right, #60a5fa, #a855f7)",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        color: "transparent"
      }}>Featured Games</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Main featured game */}
        <Link href={`/games/${mainGame.id}`} className="group">
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg gradient-border">
            <div className="relative h-full w-full">
              <Image
                src={mainGame.image}
                alt={mainGame.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 p-4">
                <h3 className="text-xl font-bold text-white">{mainGame.title}</h3>
                <p className="text-sm text-white/80 line-clamp-2 mt-1">
                  {mainGame.description}
                </p>
                <span className="inline-flex items-center rounded-full bg-primary px-2.5 py-0.5 text-xs font-medium text-primary-foreground mt-2">
                  Featured
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* Grid of other featured games */}
        <div className="grid grid-cols-2 gap-4">
          {otherGames.slice(0, 4).map((game) => (
            <Link key={game.id} href={`/games/${game.id}`} className="group">
              <div className="relative aspect-[16/9] overflow-hidden rounded-lg gradient-border">
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
      </div>
    </section>
  );
} 