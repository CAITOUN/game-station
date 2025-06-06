import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, Gamepad2 } from "lucide-react";

import { MainLayout } from "@/components/layout/MainLayout";
import { GameFrame } from "@/components/ui/GameFrame";
import { FullscreenButton } from "@/components/ui/FullscreenButton";
import { SimilarGames } from "@/components/ui/SimilarGames";

import { getGameById, getGamesByCategory } from "@/lib/games";

interface GamePageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: GamePageProps): Promise<Metadata> {
  // Convert slug to game ID safely
  const gameId = parseInt(params.slug, 10);
  const game = getGameById(gameId);
  
  if (!game) {
    return {
      title: "Game Not Found",
      description: "The requested game could not be found."
    };
  }
  
  return {
    title: `${game.title} - GamePlayGo`,
    description: game.description,
    openGraph: {
      title: `${game.title} - GamePlayGo`,
      description: game.description,
      images: [{ url: game.image, width: 1200, height: 630, alt: game.title }]
    }
  };
}

export default async function GamePage({ params }: GamePageProps) {
  // Convert slug to game ID safely
  const gameId = parseInt(params.slug, 10);
  const game = getGameById(gameId);
  
  if (!game) {
    notFound();
  }
  
  // Get the first tag to use for similar games
  const firstTag = game.tags.split(",")[0].trim();
  const similarGames = getGamesByCategory(firstTag, 4).filter(g => g.id !== game.id);
  
  // Extract tags for display
  const gameCategories = game.tags.toLowerCase().split(",").map(tag => tag.trim());
  
  // Extract tags for display
  const tagList = game.tags.split(",").map(tag => tag.trim());
  
  return (
    <MainLayout>
      <div className="relative">
        {/* Background blur effect */}
        <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-3xl z-10"></div>
          <div className="absolute inset-0 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] z-0">
            <Image 
              src={game.image} 
              alt="" 
              fill 
              className="object-cover opacity-40 scale-110" 
              unoptimized
            />
          </div>
        </div>
        
        <div className="w-full max-w-[1400px] mx-auto px-4 py-4 md:py-6 relative z-10">
          {/* Top navigation */}
          <div className="flex justify-between items-center mb-6">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Games</span>
            </Link>
          </div>
          
          {/* Game header */}
          <div className="relative mb-6 rounded-xl overflow-hidden bg-gradient-to-b from-blue-900/20 to-purple-900/20 p-4 md:p-6 backdrop-blur-md border border-blue-500/20">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(59,130,246,0.1),transparent_70%)] [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row gap-4 md:gap-6 items-start">
              {/* Game thumbnail */}
              <div className="relative rounded-lg overflow-hidden shrink-0 w-full md:w-48 lg:w-64 h-40 md:h-36 lg:h-40 shadow-xl shadow-blue-500/5">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-600/30 mix-blend-overlay z-10 opacity-60 pointer-events-none"></div>
                <Image 
                  src={game.image} 
                  alt={game.title} 
                  fill 
                  className="object-cover" 
                  unoptimized
                />
              </div>
              
              {/* Game info */}
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">{game.title}</h1>
                
                {/* Game meta */}
                <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-blue-100/70">
                  <div className="flex items-center gap-1">
                    <Gamepad2 className="h-4 w-4" />
                    <span>{firstTag.charAt(0).toUpperCase() + firstTag.slice(1)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>Endless fun</span>
                  </div>
                </div>
                
                {/* Game Tags */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {tagList.slice(0, 8).map((tag, index) => (
                    <Link
                      key={index}
                      href={`/tag/${encodeURIComponent(tag)}`}
                      className="inline-flex items-center rounded-full bg-blue-500/10 border border-blue-400/30 px-2.5 py-1 text-xs font-medium text-blue-100 hover:bg-blue-500/20 transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
                
                {/* Game Description */}
                <p className="mt-3 text-sm text-blue-100/80 line-clamp-3 md:line-clamp-none">{game.description}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 md:mt-6 grid grid-cols-1 gap-6 lg:grid-cols-4">
            {/* Main Content - Game Area */}
            <div className="lg:col-span-3">
              {/* Game Frame */}
              <div className="relative">
                <GameFrame src={game.embed} title={game.title} />
                <FullscreenButton targetId="game-frame" />
              </div>
              
              {/* Game Instructions */}
              <div className="mt-6 rounded-xl overflow-hidden border border-blue-500/20 bg-gradient-to-br from-blue-900/10 to-purple-900/10 backdrop-blur-sm">
                <div className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500/20 to-purple-600/20 border-b border-blue-500/20">
                  <Gamepad2 className="h-5 w-5 text-blue-400" />
                  <h3 className="font-medium text-lg bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Game Controls</h3>
                </div>
                
                <div className="p-4">
                  <div className="text-sm text-blue-100/80">
                    <p>Controls may vary depending on the game type:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1.5">
                      <li className="transition-transform hover:translate-x-1 hover:text-blue-300">Use <span className="text-blue-400 font-medium">arrow keys</span> or <span className="text-blue-400 font-medium">WASD</span> to move</li>
                      <li className="transition-transform hover:translate-x-1 hover:text-blue-300"><span className="text-blue-400 font-medium">Space bar</span> is typically used for jumping or confirming actions</li>
                      <li className="transition-transform hover:translate-x-1 hover:text-blue-300"><span className="text-blue-400 font-medium">Mouse click</span> for interaction or aiming</li>
                      <li className="transition-transform hover:translate-x-1 hover:text-blue-300">Some games may have special controls, please check in-game instructions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sidebar - Similar Games */}
            <div className="lg:col-span-1 mt-4 lg:mt-0">
              <SimilarGames games={similarGames} />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 