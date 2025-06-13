// 客户端专用的分析和推荐功能

export interface GameVisit {
  gameId: number;
  visitCount: number;
  lastVisited: number; // timestamp
}

export interface UserGameHistory {
  recentlyPlayed: number[]; // 最近玩过的游戏ID列表
  favoriteCategories: string[]; // 用户偏好的游戏分类
  visitHistory: GameVisit[]; // 访问历史
}

// localStorage键名
const USER_HISTORY_KEY = 'user_game_history';
const GLOBAL_STATS_KEY = 'global_game_stats';

// 记录游戏访问
export function recordGameVisit(gameId: number, gameTags: string): void {
  if (typeof window === 'undefined') return; // SSR安全检查

  try {
    // 更新用户历史
    updateUserHistory(gameId, gameTags);
    
    // 更新全局统计
    updateGlobalStats(gameId);
  } catch (error) {
    console.warn('Failed to record game visit:', error);
  }
}

// 更新用户历史
function updateUserHistory(gameId: number, gameTags: string): void {
  const userHistory = getUserHistory();
  
  // 更新最近玩过的游戏（最多保存20个）
  userHistory.recentlyPlayed = userHistory.recentlyPlayed.filter(id => id !== gameId);
  userHistory.recentlyPlayed.unshift(gameId);
  userHistory.recentlyPlayed = userHistory.recentlyPlayed.slice(0, 20);
  
  // 更新偏好分类
  const tags = gameTags.split(',').map(tag => tag.trim().toLowerCase());
  tags.forEach(tag => {
    if (!userHistory.favoriteCategories.includes(tag)) {
      userHistory.favoriteCategories.push(tag);
    }
  });
  
  // 限制偏好分类数量（最多15个）
  userHistory.favoriteCategories = userHistory.favoriteCategories.slice(0, 15);
  
  // 更新访问历史
  const existingVisit = userHistory.visitHistory.find(v => v.gameId === gameId);
  if (existingVisit) {
    existingVisit.visitCount++;
    existingVisit.lastVisited = Date.now();
  } else {
    userHistory.visitHistory.push({
      gameId,
      visitCount: 1,
      lastVisited: Date.now()
    });
  }
  
  // 限制访问历史数量（最多100个）
  userHistory.visitHistory = userHistory.visitHistory
    .sort((a, b) => b.lastVisited - a.lastVisited)
    .slice(0, 100);
  
  localStorage.setItem(USER_HISTORY_KEY, JSON.stringify(userHistory));
}

// 更新全局统计
function updateGlobalStats(gameId: number): void {
  const stats = getGlobalStats();
  
  const existingStat = stats.find(s => s.gameId === gameId);
  if (existingStat) {
    existingStat.visitCount++;
    existingStat.lastVisited = Date.now();
  } else {
    stats.push({
      gameId,
      visitCount: 1,
      lastVisited: Date.now()
    });
  }
  
  // 限制全局统计数量（最多500个）
  const sortedStats = stats
    .sort((a, b) => b.visitCount - a.visitCount)
    .slice(0, 500);
  
  localStorage.setItem(GLOBAL_STATS_KEY, JSON.stringify(sortedStats));
}

// 获取用户历史
export function getUserHistory(): UserGameHistory {
  if (typeof window === 'undefined') {
    return {
      recentlyPlayed: [],
      favoriteCategories: [],
      visitHistory: []
    };
  }

  try {
    const stored = localStorage.getItem(USER_HISTORY_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.warn('Failed to parse user history:', error);
  }
  
  return {
    recentlyPlayed: [],
    favoriteCategories: [],
    visitHistory: []
  };
}

// 获取全局统计
export function getGlobalStats(): GameVisit[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(GLOBAL_STATS_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.warn('Failed to parse global stats:', error);
  }
  
  return [];
}

// 获取热门游戏ID列表（基于访问次数）
export function getPopularGameIds(count: number = 10): number[] {
  const stats = getGlobalStats();
  return stats
    .sort((a, b) => b.visitCount - a.visitCount)
    .slice(0, count)
    .map(stat => stat.gameId);
}

// 获取最近热门游戏ID列表（基于最近7天的访问）
export function getRecentPopularGameIds(count: number = 10): number[] {
  const stats = getGlobalStats();
  const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
  
  return stats
    .filter(stat => stat.lastVisited > sevenDaysAgo)
    .sort((a, b) => b.visitCount - a.visitCount)
    .slice(0, count)
    .map(stat => stat.gameId);
} 