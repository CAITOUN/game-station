import { GameCard } from "./GameCard";
import type { Game } from "@/lib/games";

interface GameGridProps {
  games: Game[];
  title?: string;
  viewMoreLink?: string;
  columns?: number;
}

export function GameGrid({
  games,
  title,
  viewMoreLink,
  columns = 4,
}: GameGridProps) {
  if (games.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {title && (
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        </div>
      )}

      <div
        className={`grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-${columns}`}
      >
        {games.map((game) => (
          <GameCard
            key={game.id}
            id={game.id}
            title={game.title}
            image={game.image}
            tags={game.tags}
            isNew={games.indexOf(game) < 3} // Just for demo, first 3 are "new"
            isHot={game.id % 5 === 0} // Just for demo, every 5th is "hot"
            isFeatured={game.id % 7 === 0} // Just for demo, every 7th is "featured"
          />
        ))}
      </div>
    </div>
  );
}