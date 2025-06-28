import Link from "next/link";
import { Suspense } from "react";
import { Gamepad2, Home, Search, TrendingUp } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";

function NotFoundContent() {
  
  return (
    <MainLayout>
      {/* SEO结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "页面未找到 - 游戏站",
            "description": "您访问的页面不存在，请浏览我们的热门游戏",
            "url": "https://game-station.games/404",
          })
        }}
      />
      
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 text-center space-y-8">
        {/* 主要错误信息 */}
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <Gamepad2 className="w-24 h-24 text-blue-500 animate-pulse" />
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
                404
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            游戏页面未找到
          </h1>
          
          <h2 className="text-xl md:text-2xl font-semibold text-muted-foreground">
            抱歉，您访问的游戏或页面不存在
          </h2>
          
          <p className="max-w-lg text-muted-foreground">
            您要查找的游戏可能已被移动或删除。不过别担心，我们有数百款精彩游戏等待您来体验！
          </p>
        </div>

        {/* 导航选项 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl w-full">
          <Link 
            href="/"
            className="flex flex-col items-center gap-2 p-6 rounded-xl border border-border hover:border-blue-500 transition-colors group"
          >
            <Home className="w-8 h-8 text-blue-500 group-hover:scale-110 transition-transform" />
            <span className="font-medium">返回首页</span>
            <span className="text-sm text-muted-foreground">浏览所有游戏</span>
          </Link>
          
          <Link 
            href="/search"
            className="flex flex-col items-center gap-2 p-6 rounded-xl border border-border hover:border-purple-500 transition-colors group"
          >
            <Search className="w-8 h-8 text-purple-500 group-hover:scale-110 transition-transform" />
            <span className="font-medium">搜索游戏</span>
            <span className="text-sm text-muted-foreground">查找特定游戏</span>
          </Link>
          
          <Link 
            href="/games?sort=popular"
            className="flex flex-col items-center gap-2 p-6 rounded-xl border border-border hover:border-green-500 transition-colors group"
          >
            <TrendingUp className="w-8 h-8 text-green-500 group-hover:scale-110 transition-transform" />
            <span className="font-medium">热门游戏</span>
            <span className="text-sm text-muted-foreground">最受欢迎的游戏</span>
          </Link>
        </div>

        {/* 返回首页按钮 */}
        <div className="text-center">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Gamepad2 className="w-5 h-5" />
            查看更多游戏
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}

export default function NotFound() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">加载中...</div>}>
      <NotFoundContent />
    </Suspense>
  );
} 