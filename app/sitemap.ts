import { MetadataRoute } from 'next'
import { getAllGames } from '@/lib/games'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://gameplaygo.com' // 替换为您的实际域名
  
  // 获取所有游戏
  const games = getAllGames()
  
  // 主要页面
  const mainPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]
  
  // 游戏页面
  const gamePages = games.map((game) => ({
    url: `${baseUrl}/games/${game.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))
  
  return [...mainPages, ...gamePages]
} 