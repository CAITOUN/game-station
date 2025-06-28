'use client';

import { useState, useEffect } from 'react';
import { Game } from '@/lib/games';
import { GameCard } from './GameCard';
import { getUserHistory } from '@/lib/client-analytics';

interface RecommendedSectionProps {
  fallbackGames: Game[]; // 服务器端渲染的备用游戏
  popularGames: Game[]; // 服务器端预计算的热门游戏
  title?: string;
  columns?: number;
}

export function RecommendedSection({ 
  fallbackGames, 
  popularGames,
  title = "推荐给你", 
  columns = 6 
}: RecommendedSectionProps) {
  const [recommendedGames, setRecommendedGames] = useState<Game[]>(fallbackGames);
  const [userType, setUserType] = useState<'new' | 'returning'>('new');

  useEffect(() => {
    // 客户端加载时检查用户历史
    try {
      const userHistory = getUserHistory();
      const hasHistory = userHistory.recentlyPlayed.length > 0;
      setUserType(hasHistory ? 'returning' : 'new');

      // 如果有用户历史，使用热门游戏作为推荐
      if (hasHistory && popularGames.length > 0) {
        setRecommendedGames(popularGames);
      }
    } catch (error) {
      console.warn('Failed to load user history:', error);
      // 保持使用fallbackGames
    }
  }, [popularGames]);

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

  const displayTitle = userType === 'returning' ? 'Recommended for You' : 'Popular Games';

  return (
    <section className="py-8 scroll-mt-20" id="recommended">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">
          {displayTitle}
          {userType === 'returning' && (
            <span className="ml-2 text-sm font-normal text-gray-400">
              Based on your gaming preferences
            </span>
          )}
        </h2>
      </div>
      
      <div className={getGridCols()}>
        {recommendedGames.map((game) => (
          <GameCard 
            key={game.id} 
            id={game.id}
            title={game.title}
            image={game.image}
            tags={game.tags}
          />
        ))}
      </div>
      
      {userType === 'new' && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-400">
            Play a few games and we'll provide personalized recommendations!
          </p>
        </div>
      )}
    </section>
  );
} 