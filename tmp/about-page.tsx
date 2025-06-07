import Link from "next/link";
import { Suspense } from "react";

function AboutPageContent() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 py-12 text-center">
      <h1 className="text-3xl font-bold tracking-tight mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">关于 GamePlayGo</h1>
      
      <div className="space-y-6 max-w-3xl">
        <p className="text-lg">
          GamePlayGo 是一个专注于浏览器游戏的平台，所有游戏都是免费的。
          我们的使命是提供一个有趣且易于访问的游戏体验，无需下载或安装。
        </p>
        
        <div className="rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold mb-3">我们的收藏</h2>
          <p>
            我们提供各种类别的游戏，包括动作、冒险、益智、赛车等。
            所有游戏都经过精心挑选，确保它们直接在浏览器中提供流畅的游戏体验。
          </p>
        </div>
        
        <div className="mt-12 mb-4">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
          >
            返回游戏收藏
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen">加载中...</div>}>
      <AboutPageContent />
    </Suspense>
  );
} 