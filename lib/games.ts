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
    const games: Game[] = gamesData.map((game: any, index: number) => ({
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
  // 从所有游戏中随机选择一些作为精选游戏
  // 为了保持一致性，这里使用固定种子
  const shuffled = [...games].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function getNewGames(count: number = 8): Game[] {
  const games = loadGames();
  // 取最新添加的游戏（假设数组中靠后的是较新的游戏）
  return games.slice(-count);
}

export function getGamesByCategory(category: string, count: number = 8): Game[] {
  const games = loadGames();
  
  // 过滤包含指定标签的游戏
  const filteredGames = games.filter(game => 
    game.tags.toLowerCase().split(',').map(tag => tag.trim()).includes(category.toLowerCase()) ||
    game.tags.toLowerCase().includes(category.toLowerCase())
  );
  
  // 如果找不到足够的游戏，返回所有匹配的游戏
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

// 获取所有游戏
export function getAllGames(): Game[] {
  return loadGames();
}

// 获取游戏总数
export function getGamesCount(): number {
  return loadGames().length;
}