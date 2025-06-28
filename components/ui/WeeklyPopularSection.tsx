import { Game } from '@/lib/games';
import { GameCard } from './GameCard';

interface WeeklyPopularSectionProps {
  games: Game[]; // 服务器端渲染的游戏
  title?: string;
  columns?: number;
}

export function WeeklyPopularSection({ 
  games, 
  title = "Weekly Popular", 
  columns = 6 
}: WeeklyPopularSectionProps) {
  // 动态生成网格类名
  const getGridCols = () => {
    switch (columns) {
      case 6:
        return "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4";
      case 4:
        return "grid grid-cols-2 md:grid-cols-4 gap-4";
      case 3:
        return "grid grid-cols-2 md:grid-cols-3 gap-4";
      default:
        return "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4";
    }
  };

  return (
    <section className="py-8 scroll-mt-20" id="weekly-popular">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">
          {title}
          <span className="ml-2 text-sm font-normal text-gray-400">
            Curated game recommendations
          </span>
        </h2>
      </div>
      
      <div className={getGridCols()}>
        {games.map((game, index) => (
          <GameCard 
            key={game.id} 
            id={game.id}
            title={game.title}
            image={game.image}
            tags={game.tags}
            isHot={index < 3} // 前3个标记为热门
          />
        ))}
      </div>
    </section>
  );
} 