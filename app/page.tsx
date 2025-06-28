import { MainLayout } from "@/components/layout/MainLayout";
import { FeaturedGames } from "@/components/ui/FeaturedGames";
import { GameGrid } from "@/components/ui/GameGrid";
import { CategorySection } from "@/components/ui/CategorySection";
import { RecommendedSection } from "@/components/ui/RecommendedSection";
import { WeeklyPopularSection } from "@/components/ui/WeeklyPopularSection";
import { MobCitySection } from "@/components/ui/MobCitySection";
import { 
  getFeaturedGames, 
  getNewGames, 
  getGamesByCategory,
  getGamesCount,
  getSmartFeaturedGames,
  getPopularGames
} from "@/lib/games";

export default function Home() {
  // Get total game count
  const totalGames = getGamesCount();
  console.log(`Total games: ${totalGames}`);
  
  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "GamePlayGo",
    "url": "https://gameplaygo.com",
    "description": "Play free online games instantly in your browser. No downloads needed.",
    "publisher": {
      "@type": "Organization",
      "name": "GamePlayGo"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://gameplaygo.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
  
  // Get game data - 增加显示的游戏数量
  const featuredGames = getSmartFeaturedGames(12); // 从5个增加到12个
  const newGames = getNewGames(18); // 从12个增加到18个
  
  // 获取热门游戏作为推荐组件的备用数据
  const popularGamesForRecommendations = getPopularGames(18); // 从12个增加到18个
  const popularGamesForWeekly = getPopularGames(18); // 从12个增加到18个
  
  // Get games by categories - 增加每个类别的游戏数量
  const actionGames = getGamesByCategory("action", 12); // 从8个增加到12个
  const adventureGames = getGamesByCategory("adventure", 12);
  const arcadeGames = getGamesByCategory("arcade", 12);
  const puzzleGames = getGamesByCategory("puzzle", 12);
  const racingGames = getGamesByCategory("racing", 12);
  const shootingGames = getGamesByCategory("shooting", 12);
  const sportsGames = getGamesByCategory("sports", 12);
  const strategyGames = getGamesByCategory("strategy", 12);
  
  // Get games by popular tags - 增加标签类别的游戏数量
  const games2d = getGamesByCategory("2d", 12); // 从8个增加到12个
  const games3d = getGamesByCategory("3d", 12);
  const carGames = getGamesByCategory("car", 12);
  const drivingGames = getGamesByCategory("driving", 12);
  const multiplayerGames = getGamesByCategory("multiplayer", 12);
  
  // Add some additional common tag games
  const zombieGames = getGamesByCategory("zombie", 12); // 从8个增加到12个
  const physicsGames = getGamesByCategory("physics", 12);
  const simulatorGames = getGamesByCategory("simulator", 12);
  const stuntGames = getGamesByCategory("stunt", 12);

  // Get mob city and crime games for the special section
  const mobCityGames = [
    ...getGamesByCategory("mob", 6),
    ...getGamesByCategory("city", 6),
    ...getGamesByCategory("crime", 6),
    ...getGamesByCategory("mafia", 6),
    ...getGamesByCategory("gangster", 6),
    ...getGamesByCategory("urban", 6)
  ].filter((game, index, self) => 
    index === self.findIndex(g => g.id === game.id)
  ).slice(0, 12); // Remove duplicates and limit to 12 games

  return (
    <MainLayout>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="container mx-auto px-4 py-8">
        {/* SEO-optimized H1 tag for homepage */}
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Free Online Games - Play Browser Games Instantly
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Discover and play {totalGames}+ free online games directly in your browser. 
            No downloads required - enjoy action, adventure, puzzle, racing and more game categories instantly.
          </p>
        </header>
      
        {/* Featured Games Section */}
        <FeaturedGames games={featuredGames} />
        
        {/* Mob City Games Special Section */}
        {mobCityGames.length > 0 && (
          <MobCitySection games={mobCityGames} />
        )}
        
        {/* 个性化推荐区域 */}
        <RecommendedSection 
          fallbackGames={popularGamesForRecommendations}
          popularGames={popularGamesForRecommendations}
          columns={6}
        />
        
        {/* 本周热门区域 */}
        <WeeklyPopularSection 
          games={popularGamesForWeekly}
          columns={6}
        />
        
        {/* New Games Section */}
        <section className="py-8 scroll-mt-20" id="new-games">
          <GameGrid
            title="New Games"
            games={newGames}
            columns={6}
          />
        </section>
        
        {/* Category Sections */}
        <CategorySection title="Action Games" games={actionGames} slug="action" />
        <CategorySection title="Adventure Games" games={adventureGames} slug="adventure" />
        <CategorySection title="Arcade Games" games={arcadeGames} slug="arcade" />
        <CategorySection title="Puzzle Games" games={puzzleGames} slug="puzzle" />
        <CategorySection title="Racing Games" games={racingGames} slug="racing" />
        <CategorySection title="Shooting Games" games={shootingGames} slug="shooting" />
        <CategorySection title="Sports Games" games={sportsGames} slug="sports" />
        <CategorySection title="Strategy Games" games={strategyGames} slug="strategy" />
        
        {/* Tag Sections */}
        <section id="tag-2d" className="py-8 scroll-mt-20">
          <GameGrid
            title="2D Games"
            games={games2d}
            columns={6}
          />
        </section>
        
        <section id="tag-3d" className="py-8 scroll-mt-20">
          <GameGrid
            title="3D Games"
            games={games3d}
            columns={6}
          />
        </section>
        
        <section id="tag-car" className="py-8 scroll-mt-20">
          <GameGrid
            title="Car Games"
            games={carGames}
            columns={6}
          />
        </section>
        
        <section id="tag-driving" className="py-8 scroll-mt-20">
          <GameGrid
            title="Driving Games"
            games={drivingGames}
            columns={6}
          />
        </section>
        
        <section id="tag-multiplayer" className="py-8 scroll-mt-20">
          <GameGrid
            title="Multiplayer Games"
            games={multiplayerGames}
            columns={6}
          />
        </section>
        
        {/* Additional Tag Sections */}
        <section id="tag-zombie" className="py-8 scroll-mt-20">
          <GameGrid
            title="Zombie Games"
            games={zombieGames}
            columns={6}
          />
        </section>
        
        <section id="tag-physics" className="py-8 scroll-mt-20">
          <GameGrid
            title="Physics Games"
            games={physicsGames}
            columns={6}
          />
        </section>
        
        <section id="tag-simulator" className="py-8 scroll-mt-20">
          <GameGrid
            title="Simulator Games"
            games={simulatorGames}
            columns={6}
          />
        </section>
        
        <section id="tag-stunt" className="py-8 scroll-mt-20">
          <GameGrid
            title="Stunt Games"
            games={stuntGames}
            columns={6}
          />
        </section>
      </div>
    </MainLayout>
  );
}
