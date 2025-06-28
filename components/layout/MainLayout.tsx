"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import GameBackground from "@/components/ui/GameBackground";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
  const collapseTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 检测屏幕尺寸并在移动设备上自动折叠侧边栏
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      if (width < 1024) {
        setSidebarCollapsed(true);
      } else {
        setSidebarCollapsed(false);
      }
    };

    // 初始化检查
    checkScreenSize();
    
    // 监听窗口大小变化
    window.addEventListener('resize', checkScreenSize);
    
    // 清理监听器
    return () => {
      window.removeEventListener('resize', checkScreenSize);
      // 清理所有定时器
      if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
      if (collapseTimerRef.current) clearTimeout(collapseTimerRef.current);
    };
  }, []);

  // 使用防抖处理鼠标悬停事件
  const handleMouseEnter = useCallback(() => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    
    if (collapseTimerRef.current) {
      clearTimeout(collapseTimerRef.current);
      collapseTimerRef.current = null;
    }
    
    // 立即展开侧边栏
    setIsHovering(true);
    setSidebarCollapsed(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    
    // 延迟折叠侧边栏，给用户足够时间点击
    collapseTimerRef.current = setTimeout(() => {
      setIsHovering(false);
      setSidebarCollapsed(true);
    }, 600); // 600ms延迟，防止意外折叠并给点击操作留出时间
  }, []);

  return (
    <div className="flex min-h-screen flex-col relative">
      {/* 动态游戏背景 */}
      <GameBackground particleCount={30} />
      
      <Header />
      <div className="flex flex-1 pt-16">
        {/* 使用React状态和事件处理实现自动展开/折叠功能 */}
        <div 
          className="sidebar-container fixed left-0 top-16 bottom-0 z-30 hidden md:block"
          style={{ height: 'calc(100vh - var(--header-height))' }}
        >
          {/* 折叠状态的侧边栏 */}
          <div 
            className={`sidebar-collapsed absolute left-0 top-0 w-[var(--sidebar-width-collapsed)] h-full shadow-xl transition-all duration-300 ${!sidebarCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            onMouseEnter={handleMouseEnter}
          >
            <Sidebar collapsed={true} />
          </div>
          
          {/* 展开状态的侧边栏 */}
          <div 
            ref={sidebarRef}
            className={`sidebar-expanded absolute left-0 top-0 w-[var(--sidebar-width-expanded)] h-full shadow-xl transition-all duration-300 ${sidebarCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            onMouseLeave={handleMouseLeave}
          >
            <Sidebar collapsed={false} />
          </div>
        </div>
        
        {/* Main content - 响应式调整 */}
        <div 
          className={`w-full transition-all ${
            sidebarCollapsed ? "md:ml-[var(--sidebar-width-collapsed)]" : "md:ml-[var(--sidebar-width-expanded)]"
          } flex-1 flex flex-col`}
          style={{ transitionDuration: 'var(--sidebar-transition-duration)' }}
        >
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
} 