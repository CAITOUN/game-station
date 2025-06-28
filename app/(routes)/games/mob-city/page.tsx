import { Metadata } from "next";
import { MainLayout } from "@/components/layout/MainLayout";
import { GameGrid } from "@/components/ui/GameGrid";
import { getGamesByCategory } from "@/lib/games";

export const metadata: Metadata = {
  title: "Mob City Games - Free Online Crime & Mafia Games",
  description: "Play the best mob city games online! Experience crime action, mafia adventures, and urban warfare in these free browser games. No downloads needed.",
  keywords: [
    "mob city game",
    "mob city games", 
    "mafia games",
    "crime games",
    "gangster games",
    "urban games",
    "city crime games",
    "free mob games"
  ],
  openGraph: {
    title: "Mob City Games - Free Online Crime & Mafia Games",
    description: "Play the best mob city games online! Experience crime action, mafia adventures, and urban warfare.",
    type: "website",
  },
};

export default function MobCityGamesPage() {
  // Get all mob and city related games
  const mobCityGames = [
    ...getGamesByCategory("mob", 20),
    ...getGamesByCategory("city", 20),
    ...getGamesByCategory("crime", 20),
    ...getGamesByCategory("mafia", 20),
    ...getGamesByCategory("gangster", 20),
    ...getGamesByCategory("urban", 20)
  ].filter((game, index, self) => 
    index === self.findIndex(g => g.id === game.id)
  ); // Remove duplicates

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Mob City Games",
    "description": "Collection of free online mob city games featuring crime, mafia, and urban warfare themes",
    "url": "https://gameplaygo.vercel.app/games/mob-city",
    "mainEntity": {
      "@type": "ItemList",
      "name": "Mob City Games",
      "numberOfItems": mobCityGames.length,
      "itemListElement": mobCityGames.slice(0, 10).map((game, index) => ({
        "@type": "Game",
        "position": index + 1,
        "name": game.title,
        "description": game.description,
        "url": `https://gameplaygo.vercel.app/games/${game.id}`,
        "genre": "Action",
        "keywords": game.tags
      }))
    }
  };

  return (
    <MainLayout>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
            🏙️ Mob City Games
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Experience the ultimate mob city game collection! Play {mobCityGames.length} free online crime games 
            featuring mafia adventures, gangster action, and urban warfare. All games run directly in your browser.
          </p>
        </header>

        {/* Game Grid */}
        <GameGrid
          games={mobCityGames}
          columns={6}
        />

        {/* Additional SEO Content */}
        <div className="mt-12 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">About Mob City Games</h2>
          <div className="text-gray-300 space-y-4">
            <p>
              Mob city games offer an immersive experience into the world of organized crime and urban warfare. 
              These games typically feature complex storylines involving mafia families, street gangs, and law enforcement.
            </p>
            <p>
              Our collection includes various sub-genres:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Crime Action Games</strong> - Fast-paced shooting and combat</li>
              <li><strong>Mafia Strategy Games</strong> - Build your criminal empire</li>
              <li><strong>Urban Warfare</strong> - Street battles and territory control</li>
              <li><strong>Gangster Adventures</strong> - Story-driven criminal narratives</li>
            </ul>
            <p>
              All our mob city games are free to play and require no downloads. Simply click and start playing instantly!
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 