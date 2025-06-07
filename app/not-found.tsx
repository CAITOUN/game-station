import Link from "next/link";
import { Suspense } from "react";

function NotFoundContent() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-4 text-center">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">页面未找到</h2>
      <p className="mb-8 max-w-md text-muted-foreground">
        抱歉，您尝试访问的页面不存在或已被移除。
      </p>
      <Link 
        href="/"
        className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        返回首页
      </Link>
    </div>
  );
}

export default function NotFound() {
  return (
    <Suspense fallback={<div>加载中...</div>}>
      <NotFoundContent />
    </Suspense>
  );
} 