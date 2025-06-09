import Link from 'next/link';

interface FooterProps {
  centered?: boolean;
}

export function Footer({ centered = false }: FooterProps) {
  return (
    <footer className="border-t border-border/40 bg-background/95 py-6 mt-auto w-full">
      <div className={`${centered ? 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' : 'container'}`}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 关于我们 */}
          <div>
            <h3 className="text-base font-medium text-foreground mb-4">关于 GameStation</h3>
            <p className="text-sm text-muted-foreground mb-4">
              GameStation 提供精选的免费在线游戏，无需下载，直接在浏览器中享受游戏乐趣。
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>

          {/* 快速链接 */}
          <div>
            <h3 className="text-base font-medium text-foreground mb-4">快速链接</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary">首页</Link>
              </li>
              <li>
                <Link href="/games/popular" className="text-muted-foreground hover:text-primary">热门游戏</Link>
              </li>
              <li>
                <Link href="/games/new" className="text-muted-foreground hover:text-primary">最新游戏</Link>
              </li>
              <li>
                <Link href="/categories" className="text-muted-foreground hover:text-primary">游戏分类</Link>
              </li>
            </ul>
          </div>

          {/* 支持 */}
          <div>
            <h3 className="text-base font-medium text-foreground mb-4">支持</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/help" className="text-muted-foreground hover:text-primary">帮助中心</Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary">常见问题</Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary">联系我们</Link>
              </li>
              <li>
                <Link href="/feedback" className="text-muted-foreground hover:text-primary">反馈建议</Link>
              </li>
            </ul>
          </div>

          {/* 法律信息 */}
          <div>
            <h3 className="text-base font-medium text-foreground mb-4">法律信息</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary">使用条款</Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary">隐私政策</Link>
              </li>
              <li>
                <Link href="/cookies" className="text-muted-foreground hover:text-primary">Cookie 政策</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/40">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs md:text-sm text-muted-foreground">
              © {new Date().getFullYear()} <span style={{
                backgroundImage: "linear-gradient(to right, #60a5fa, #a855f7)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                fontWeight: "500"
              }}>GameStation</span>. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <p className="text-xs text-muted-foreground">
                使用本网站即表示您同意我们的使用条款和隐私政策
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 