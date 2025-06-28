import { GameGrid } from "./GameGrid";
import type { Game } from "@/lib/games";

interface MobCitySectionProps {
  games: Game[];
}

export function MobCitySection({ games }: MobCitySectionProps) {
  if (games.length === 0) {
    return null;
  }

  return (
    <section className="py-8 scroll-mt-20" id="mob-city-games">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight mb-2" style={{
          backgroundImage: "linear-gradient(to right, #ef4444, #dc2626)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent"
        }}>
          🏙️ Mob City Games
        </h2>
        <p className="text-gray-400 text-sm">
          Experience the ultimate mob city game collection - crime, action, and urban warfare!
        </p>
      </div>
      
      <GameGrid
        games={games}
        columns={6}
      />
    </section>
  );
} 