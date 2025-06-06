import fs from 'fs';
import path from 'path';

export interface Game {
  id: number;
  title: string;
  embed: string;
  image: string;
  tags: string;
  description: string;
}

// Interface for game data read from JSON file
interface GameData {
  title: string;
  embed: string;
  image: string;
  tags: string;
  description: string;
}

let gamesCache: Game[] | null = null;

export function loadGames(): Game[] {
  if (gamesCache) return gamesCache;

  try {
    // Read the game.json file
    const filePath = path.join(process.cwd(), 'game.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    
    // Parse the JSON data
    const gamesData = JSON.parse(fileContents);
    
    // Add an ID to each game (based on its position in the array)
    const games: Game[] = gamesData.map((game: GameData, index: number) => ({
      id: index + 1,
      ...game,
    }));
    
    // Cache the games data
    gamesCache = games;
    
    return games;
  } catch (error) {
    console.error('Error loading games data:', error);
    return [];
  }
}

export function getFeaturedGames(count: number = 6): Game[] {
  const games = loadGames();
  // Randomly select games as featured games
  // Using a fixed seed for consistency
  const shuffled = [...games].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function getNewGames(count: number = 8): Game[] {
  const games = loadGames();
  // Get the most recently added games (assuming games at the end of the array are newer)
  return games.slice(-count);
}

export function getGamesByCategory(category: string, count: number = 8): Game[] {
  const games = loadGames();
  
  // Filter games that include the specified tag
  const filteredGames = games.filter(game => 
    game.tags.toLowerCase().split(',').map(tag => tag.trim()).includes(category.toLowerCase()) ||
    game.tags.toLowerCase().includes(category.toLowerCase())
  );
  
  // If not enough games are found, return all matching games
  return filteredGames.slice(0, count);
}

export function getGameById(id: number): Game | undefined {
  const games = loadGames();
  return games.find(game => game.id === id);
}

export function searchGames(query: string): Game[] {
  const games = loadGames();
  
  if (!query) return [];
  
  const lowerCaseQuery = query.toLowerCase();
  
  return games.filter(game => 
    game.title.toLowerCase().includes(lowerCaseQuery) || 
    game.tags.toLowerCase().includes(lowerCaseQuery) ||
    game.description.toLowerCase().includes(lowerCaseQuery)
  );
}

export function getAllTags(): { name: string, count: number }[] {
  const games = loadGames();
  
  // Create a map to count occurrences of each tag
  const tagCounts = new Map<string, number>();
  
  games.forEach(game => {
    const tags = game.tags.split(',');
    tags.forEach(tag => {
      const trimmedTag = tag.trim();
      if (trimmedTag) {
        tagCounts.set(trimmedTag, (tagCounts.get(trimmedTag) || 0) + 1);
      }
    });
  });
  
  // Convert the map to an array of objects
  const tagsArray = Array.from(tagCounts.entries()).map(([name, count]) => ({
    name,
    count
  }));
  
  // Sort by count (descending)
  return tagsArray.sort((a, b) => b.count - a.count);
}

// Get all games
export function getAllGames(): Game[] {
  return loadGames();
}

// Get total game count
export function getGamesCount(): number {
  return loadGames().length;
}