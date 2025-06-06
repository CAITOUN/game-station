import { MainLayout } from "@/components/layout/MainLayout";
import { FeaturedGames } from "@/components/ui/FeaturedGames";
import { GameGrid } from "@/components/ui/GameGrid";
import { CategorySection } from "@/components/ui/CategorySection";
import { 
  getFeaturedGames, 
  getNewGames, 
  getGamesByCategory,
  getGamesCount
} from "@/lib/games";

export default function Home() {
  // Get total game count
  const totalGames = getGamesCount();
  console.log(`Total games: ${totalGames}`);
  
  // Get game data
  const featuredGames = getFeaturedGames(5);
  const newGames = getNewGames(12);
  
  // Get games by categories
  const actionGames = getGamesByCategory("action", 8);
  const adventureGames = getGamesByCategory("adventure", 8);
  const arcadeGames = getGamesByCategory("arcade", 8);
  const puzzleGames = getGamesByCategory("puzzle", 8);
  const racingGames = getGamesByCategory("racing", 8);
  const shootingGames = getGamesByCategory("shooting", 8);
  const sportsGames = getGamesByCategory("sports", 8);
  const strategyGames = getGamesByCategory("strategy", 8);
  
  // Get games by popular tags
  const games2d = getGamesByCategory("2d", 8);
  const games3d = getGamesByCategory("3d", 8);
  const carGames = getGamesByCategory("car", 8);
  const drivingGames = getGamesByCategory("driving", 8);
  const multiplayerGames = getGamesByCategory("multiplayer", 8);
  
  // Add some additional common tag games
  const zombieGames = getGamesByCategory("zombie", 8);
  const physicsGames = getGamesByCategory("physics", 8);
  const simulatorGames = getGamesByCategory("simulator", 8);
  const stuntGames = getGamesByCategory("stunt", 8);
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Featured Games Section */}
        <FeaturedGames games={featuredGames} />
        
        {/* New Games Section */}
        <section className="py-8 scroll-mt-20" id="new-games">
          <GameGrid
            title="New Games"
            games={newGames}
            viewMoreLink="/#new-games"
            columns={4}
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
            viewMoreLink="/#tag-2d"
            columns={4}
          />
        </section>
        
        <section id="tag-3d" className="py-8 scroll-mt-20">
          <GameGrid
            title="3D Games"
            games={games3d}
            viewMoreLink="/#tag-3d"
            columns={4}
          />
        </section>
        
        <section id="tag-car" className="py-8 scroll-mt-20">
          <GameGrid
            title="Car Games"
            games={carGames}
            viewMoreLink="/#tag-car"
            columns={4}
          />
        </section>
        
        <section id="tag-driving" className="py-8 scroll-mt-20">
          <GameGrid
            title="Driving Games"
            games={drivingGames}
            viewMoreLink="/#tag-driving"
            columns={4}
          />
        </section>
        
        <section id="tag-multiplayer" className="py-8 scroll-mt-20">
          <GameGrid
            title="Multiplayer Games"
            games={multiplayerGames}
            viewMoreLink="/#tag-multiplayer"
            columns={4}
          />
        </section>
        
        {/* Additional Tag Sections */}
        <section id="tag-zombie" className="py-8 scroll-mt-20">
          <GameGrid
            title="Zombie Games"
            games={zombieGames}
            viewMoreLink="/#tag-zombie"
            columns={4}
          />
        </section>
        
        <section id="tag-physics" className="py-8 scroll-mt-20">
          <GameGrid
            title="Physics Games"
            games={physicsGames}
            viewMoreLink="/#tag-physics"
            columns={4}
          />
        </section>
        
        <section id="tag-simulator" className="py-8 scroll-mt-20">
          <GameGrid
            title="Simulator Games"
            games={simulatorGames}
            viewMoreLink="/#tag-simulator"
            columns={4}
          />
        </section>
        
        <section id="tag-stunt" className="py-8 scroll-mt-20">
          <GameGrid
            title="Stunt Games"
            games={stuntGames}
            viewMoreLink="/#tag-stunt"
            columns={4}
          />
        </section>
      </div>
    </MainLayout>
  );
}
