import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import { MainLayout } from "@/components/layout/MainLayout";
import { GameFrame } from "@/components/ui/GameFrame";
import { FullscreenButton } from "@/components/ui/FullscreenButton";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { SimilarGames } from "@/components/ui/SimilarGames";

import { getGameById, getGamesByCategory } from "@/lib/games";

interface GamePageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: GamePageProps): Promise<Metadata> {
  // Convert slug to game ID safely
  const gameId = parseInt(String(params.slug), 10);
  const game = getGameById(gameId);
  
  if (!game) {
    return {
      title: "Game Not Found",
      description: "The requested game could not be found."
    };
  }
  
  return {
    title: `${game.title} - Game Station`,
    description: game.description,
    openGraph: {
      title: `${game.title} - Game Station`,
      description: game.description,
      images: [{ url: game.image, width: 1200, height: 630, alt: game.title }]
    }
  };
}

export default function GamePage({ params }: GamePageProps) {
  // Convert slug to game ID safely
  const gameId = parseInt(String(params.slug), 10);
  const game = getGameById(gameId);
  
  if (!game) {
    notFound();
  }
  
  // Get the first tag to use for similar games
  const firstTag = game.tags.split(",")[0].trim();
  const similarGames = getGamesByCategory(firstTag, 4).filter(g => g.id !== game.id);
  
  // Determine the category for breadcrumb
  const categories = ["action", "adventure", "arcade", "puzzle", "racing", "shooting", "sports", "strategy"];
  const gameCategories = game.tags.toLowerCase().split(",").map(tag => tag.trim());
  const category = categories.find(cat => gameCategories.includes(cat)) || "games";
  
  // Extract tags for display
  const tagList = game.tags.split(",").map(tag => tag.trim());
  
  return (
    <MainLayout>
      <div className="w-full max-w-[1400px] mx-auto px-4 py-4 md:py-6">
        {/* Breadcrumb Navigation */}
        <Breadcrumb 
          items={[
            { label: "Home", href: "/" },
            { label: `${category.charAt(0).toUpperCase() + category.slice(1)} Games`, href: `/category/${category}` },
            { label: game.title, href: `/games/${game.id}`, active: true }
          ]} 
        />
        
        <div className="mt-4">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight">{game.title}</h1>
          
          {/* Game Tags */}
          <div className="mt-2 flex flex-wrap">
            {tagList.slice(0, 6).map((tag, index) => (
              <Link
                key={index}
                href={`/tag/${encodeURIComponent(tag)}`}
                className="inline-flex mr-2 mb-2 items-center rounded-full bg-primary/10 border border-primary/20 px-2.5 py-0.5 text-xs text-primary hover:bg-primary/20 transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
          
          {/* Game Description - only show on larger screens */}
          <p className="mt-3 text-sm text-muted-foreground line-clamp-2 md:line-clamp-none hidden md:block">{game.description}</p>
        </div>
        
        <div className="mt-4 md:mt-6 grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-4">
          {/* Main Content - Game Area */}
          <div className="lg:col-span-3">
            {/* Game Frame */}
            <div className="relative rounded-lg overflow-hidden border border-border bg-card">
              <GameFrame src={game.embed} title={game.title} />
              <FullscreenButton targetId="game-frame" />
            </div>
            
            {/* Game Description - only show on mobile */}
            <div className="mt-4 md:hidden">
              <p className="text-sm text-muted-foreground">{game.description}</p>
            </div>
            
            {/* Game Instructions */}
            <div className="mt-4 rounded-lg border border-border bg-card p-4">
              <details>
                <summary className="font-medium cursor-pointer">Game Controls</summary>
                <div className="mt-2 text-sm text-muted-foreground">
                  <p>Controls may vary depending on the game type:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li>Use arrow keys or WASD to move</li>
                    <li>Space bar is typically used for jumping or confirming actions</li>
                    <li>Mouse click for interaction or aiming</li>
                    <li>Some games may have special controls, please check in-game instructions</li>
                  </ul>
                </div>
              </details>
            </div>
          </div>
          
          {/* Sidebar - Similar Games */}
          <div className="lg:col-span-1 mt-4 lg:mt-0">
            <SimilarGames games={similarGames} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 