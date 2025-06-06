import { GameGrid } from "./GameGrid";
import type { Game } from "@/lib/games";

interface CategorySectionProps {
  title: string;
  games: Game[];
  slug: string;
}

export function CategorySection({ title, games, slug }: CategorySectionProps) {
  if (games.length === 0) {
    return null;
  }

  return (
    <section id={`category-${slug}`} className="py-8 scroll-mt-20">
      <GameGrid
        title={title}
        games={games}
        viewMoreLink={`/#category-${slug}`}
        columns={4}
      />
    </section>
  );
}