import fs from 'fs';
import path from 'path';
import { 
  getPopularGameIds, 
  getRecentPopularGameIds, 
  getPersonalizedGameIds,
  getUserHistory 
} from './analytics';

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

// 获取基于热门度的游戏推荐
export function getPopularGames(count: number = 8): Game[] {
  const games = loadGames();
  const popularIds = getPopularGameIds(count * 2); // 获取更多ID以备用
  
  if (popularIds.length === 0) {
    // 如果没有热门数据，回退到随机推荐
    const shuffled = [...games].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
  
  // 根据ID获取游戏，并过滤掉不存在的游戏
  const popularGames = popularIds
    .map(id => games.find(game => game.id === id))
    .filter((game): game is Game => game !== undefined)
    .slice(0, count);
  
  // 如果热门游戏不够，用随机游戏补充
  if (popularGames.length < count) {
    const remainingCount = count - popularGames.length;
    const excludeIds = popularGames.map(game => game.id);
    const remainingGames = games
      .filter(game => !excludeIds.includes(game.id))
      .sort(() => 0.5 - Math.random())
      .slice(0, remainingCount);
    
    popularGames.push(...remainingGames);
  }
  
  return popularGames;
}

// 获取本周热门游戏
export function getWeeklyPopularGames(count: number = 8): Game[] {
  const games = loadGames();
  const weeklyPopularIds = getRecentPopularGameIds(count * 2);
  
  if (weeklyPopularIds.length === 0) {
    // 如果没有本周数据，回退到总体热门
    return getPopularGames(count);
  }
  
  const weeklyGames = weeklyPopularIds
    .map(id => games.find(game => game.id === id))
    .filter((game): game is Game => game !== undefined)
    .slice(0, count);
  
  // 如果本周热门不够，用总体热门补充
  if (weeklyGames.length < count) {
    const remainingCount = count - weeklyGames.length;
    const excludeIds = weeklyGames.map(game => game.id);
    const popularGames = getPopularGames(remainingCount + 5) // 多获取一些以备筛选
      .filter(game => !excludeIds.includes(game.id))
      .slice(0, remainingCount);
    
    weeklyGames.push(...popularGames);
  }
  
  return weeklyGames;
}

// 获取个性化推荐游戏
export function getPersonalizedRecommendations(count: number = 8): Game[] {
  const games = loadGames();
  const userHistory = getUserHistory();
  
  if (userHistory.recentlyPlayed.length === 0) {
    // 新用户，返回热门游戏
    return getPopularGames(count);
  }
  
  const recommendedGames: Game[] = [];
  
  // 1. 基于用户偏好分类推荐
  const preferredTags = userHistory.favoriteCategories.slice(0, 3); // 取前3个偏好
  for (const tag of preferredTags) {
    const tagGames = getGamesByCategory(tag, 3)
      .filter(game => !userHistory.recentlyPlayed.includes(game.id))
      .filter(game => !recommendedGames.some(rec => rec.id === game.id));
    
    recommendedGames.push(...tagGames.slice(0, 2));
    
    if (recommendedGames.length >= count) break;
  }
  
  // 2. 如果推荐不够，添加相似游戏
  if (recommendedGames.length < count) {
    const recentlyPlayedGames = userHistory.recentlyPlayed.slice(0, 3)
      .map(id => games.find(game => game.id === id))
      .filter((game): game is Game => game !== undefined);
    
    for (const game of recentlyPlayedGames) {
      const similarGames = findSimilarGames(game, games, 3)
        .filter(similar => !userHistory.recentlyPlayed.includes(similar.id))
        .filter(similar => !recommendedGames.some(rec => rec.id === similar.id));
      
      recommendedGames.push(...similarGames.slice(0, 2));
      
      if (recommendedGames.length >= count) break;
    }
  }
  
  // 3. 如果还是不够，用热门游戏补充
  if (recommendedGames.length < count) {
    const remainingCount = count - recommendedGames.length;
    const excludeIds = [
      ...recommendedGames.map(game => game.id),
      ...userHistory.recentlyPlayed
    ];
    
    const popularGames = getPopularGames(remainingCount + 5)
      .filter(game => !excludeIds.includes(game.id))
      .slice(0, remainingCount);
    
    recommendedGames.push(...popularGames);
  }
  
  return recommendedGames.slice(0, count);
}

// 查找相似游戏（基于标签相似度）
function findSimilarGames(targetGame: Game, allGames: Game[], count: number = 5): Game[] {
  const targetTags = targetGame.tags.toLowerCase().split(',').map(tag => tag.trim());
  
  const similarities = allGames
    .filter(game => game.id !== targetGame.id)
    .map(game => {
      const gameTags = game.tags.toLowerCase().split(',').map(tag => tag.trim());
      const commonTags = targetTags.filter(tag => gameTags.includes(tag));
      const similarity = commonTags.length / Math.max(targetTags.length, gameTags.length);
      
      return { game, similarity };
    })
    .filter(item => item.similarity > 0.2) // 至少有20%的标签相似度
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, count)
    .map(item => item.game);
  
  return similarities;
}

// 获取推荐给你的游戏（综合个性化 + 热门）
export function getRecommendedForYou(count: number = 12): Game[] {
  const userHistory = getUserHistory();
  
  // 如果是新用户，返回混合推荐
  if (userHistory.recentlyPlayed.length === 0) {
    const popular = getPopularGames(count / 2);
    const weekly = getWeeklyPopularGames(count / 2);
    const mixed = [...popular, ...weekly];
    
    // 去重并限制数量
    const uniqueGames = mixed.filter((game, index, self) => 
      index === self.findIndex(g => g.id === game.id)
    );
    
    return uniqueGames.slice(0, count);
  }
  
  // 老用户，返回个性化推荐
  const personalized = getPersonalizedRecommendations(Math.ceil(count * 0.7)); // 70%个性化
  const popular = getWeeklyPopularGames(Math.ceil(count * 0.3)); // 30%热门
  
  const mixed = [...personalized, ...popular];
  const uniqueGames = mixed.filter((game, index, self) => 
    index === self.findIndex(g => g.id === game.id)
  );
  
  return uniqueGames.slice(0, count);
}

// 原有的getFeaturedGames函数保持不变，但我们可以让它更智能
export function getSmartFeaturedGames(count: number = 6): Game[] {
  // 结合热门度和随机性的智能精选
  const popular = getPopularGames(Math.ceil(count * 0.6)); // 60%热门
  const random = getFeaturedGames(Math.ceil(count * 0.4)); // 40%随机
  
  const mixed = [...popular, ...random];
  const uniqueGames = mixed.filter((game, index, self) => 
    index === self.findIndex(g => g.id === game.id)
  );
  
  return uniqueGames.slice(0, count);
}