"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, Home, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface Category {
  name: string;
  icon: string;
  slug: string;
}

interface Tag {
  name: string;
  count: number;
}

interface SidebarProps {
  mobile?: boolean;
  onClose?: () => void;
  collapsed?: boolean;
}

export function Sidebar({ mobile = false, onClose, collapsed = false }: SidebarProps) {
  // Sample categories data - in a real app, this might come from an API
  const categories: Category[] = [
    { name: "Action", icon: "🔥", slug: "action" },
    { name: "Adventure", icon: "🧭", slug: "adventure" },
    { name: "Arcade", icon: "🎮", slug: "arcade" },
    { name: "Puzzle", icon: "🧩", slug: "puzzle" },
    { name: "Racing", icon: "🏎️", slug: "racing" },
    { name: "Shooting", icon: "🎯", slug: "shooting" },
    { name: "Sports", icon: "⚽", slug: "sports" },
    { name: "Strategy", icon: "🧠", slug: "strategy" },
  ];

  const [popularTags, setPopularTags] = useState<Tag[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const router = useRouter();

  // In a real app, this would fetch data from an API
  useEffect(() => {
    // This is a simulation of fetching popular tags
    const tags: Tag[] = [
      { name: "2d", count: 42 },
      { name: "3d", count: 35 },
      { name: "car", count: 28 },
      { name: "driving", count: 25 },
      { name: "multiplayer", count: 18 },
    ];
    
    setPopularTags(tags);
  }, []);

  const handleCategoryClick = (slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveCategory(slug);
    
    const categorySlug = slug;
    setTimeout(() => {
      const categorySection = document.getElementById(`category-${categorySlug}`);
      if (categorySection) {
        categorySection.scrollIntoView({ behavior: 'smooth' });
      } else {
        router.push(`/#category-${categorySlug}`);
      }
      
      if (mobile && onClose) {
        onClose();
      }
    }, 0);
  };

  const handleTagClick = (tag: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setTimeout(() => {
      const tagSection = document.getElementById(`tag-${tag}`);
      if (tagSection) {
        tagSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        router.push(`/#tag-${tag}`);
      }
      
      if (mobile && onClose) {
        onClose();
      }
    }, 0);
  };

  const handleAllGamesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveCategory(null);
    
    setTimeout(() => {
      router.push("/");
      
      if (mobile && onClose) {
        onClose();
      }
    }, 0);
  };

  // If collapsed, show only icons
  if (collapsed && !mobile) {
    return (
      <aside className="h-full w-full overflow-y-auto sidebar-scrollbar shadow-xl relative no-drag">
        <div className="gradient-bg h-full w-full py-4 px-2 border-r border-transparent bg-clip-border" 
          style={{
            backgroundImage: 'linear-gradient(to right, transparent, transparent), linear-gradient(to bottom, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.3))',
            minHeight: '100%'
          }}>
          
          {/* Mini logo or identifier */}
          <div className="mb-6 flex justify-center">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
              <Gamepad2 className="h-5 w-5 text-white" />
            </div>
          </div>
          
          <div className="space-y-6">
            <nav className="flex flex-col items-center space-y-4">
              {/* All Games Button */}
              <TooltipProvider delayDuration={300}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      className={`sidebar-btn-focus flex items-center justify-center rounded-full w-10 h-10 transition-all duration-300 relative overflow-hidden group ${
                        activeCategory === null 
                          ? "bg-gradient-to-r from-blue-400/20 to-purple-500/20 text-primary" 
                          : "text-sidebar-foreground hover:text-primary"
                      }`}
                      onClick={handleAllGamesClick}
                    >
                      <Home className="h-5 w-5 relative z-10 transition-transform duration-300 group-hover:scale-110" />
                      <span className={`absolute bottom-0 left-0 right-0 mx-auto h-[2px] bg-gradient-to-r from-blue-400 to-purple-500 transition-width duration-300 rounded-full ${
                        activeCategory === null ? "w-6" : "w-0 group-hover:w-6"
                      }`}></span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>全部游戏</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              {categories.map((category) => (
                <TooltipProvider key={category.slug} delayDuration={300}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        className={`sidebar-btn-focus flex items-center justify-center rounded-full w-10 h-10 transition-all duration-300 relative overflow-hidden group ${
                          activeCategory === category.slug 
                            ? "bg-gradient-to-r from-blue-400/20 to-purple-500/20 text-primary" 
                            : "text-sidebar-foreground hover:text-primary"
                        } focus:outline-none focus:ring-2 focus:ring-blue-400/40`}
                        onClick={(e) => handleCategoryClick(category.slug, e)}
                      >
                        <span className="text-xl relative z-10 transition-transform duration-300 group-hover:scale-110">{category.icon}</span>
                        <span className={`absolute bottom-0 left-0 right-0 mx-auto h-[2px] bg-gradient-to-r from-blue-400 to-purple-500 transition-width duration-300 rounded-full ${
                          activeCategory === category.slug ? "w-6" : "w-0 group-hover:w-6"
                        }`}></span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{category.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </nav>
            
            {/* 固定位置的分隔指示器 */}
            <div className="flex justify-center mt-4 mb-2">
              <div className="w-6 h-[2px] bg-gradient-to-r from-blue-400/30 to-purple-500/30 rounded-full"></div>
            </div>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className={`${mobile ? '' : 'h-full w-full'} overflow-y-auto sidebar-scrollbar shadow-xl relative no-drag`}>
      <div className={`gradient-bg h-full w-full p-4 ${mobile ? '' : 'border-r border-transparent bg-clip-border'}`} 
        style={{
          backgroundImage: mobile ? '' : 'linear-gradient(to right, transparent, transparent), linear-gradient(to bottom, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.3))',
          minHeight: '100%'
        }}>
        {mobile && onClose && (
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold tracking-tight" style={{
              backgroundImage: "linear-gradient(to right, #60a5fa, #a855f7)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent"
            }}>Menu</h2>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
        
        <div className="space-y-6">
          <div>
            <h2 className="mb-2 text-lg font-semibold tracking-tight" style={{
              backgroundImage: "linear-gradient(to right, #60a5fa, #a855f7)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent"
            }}>Categories</h2>
            <nav className="space-y-1">
              {/* All Games Button */}
              <button
                type="button"
                className={`sidebar-btn-focus w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all duration-300 relative overflow-hidden group ${
                  activeCategory === null 
                    ? "bg-gradient-to-r from-blue-400/20 to-purple-500/20 text-primary font-medium" 
                    : "text-sidebar-foreground hover:text-primary"
                } focus:outline-none focus:ring-2 focus:ring-blue-400/40`}
                onClick={handleAllGamesClick}
              >
                <Home className="h-4 w-4 relative z-10 transition-transform duration-300 group-hover:scale-110" />
                <span className="relative z-10">All Games</span>
                <span className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-400 to-purple-500 transition-width duration-300 rounded-full ${
                  activeCategory === null ? "w-full" : "w-0 group-hover:w-full"
                }`}></span>
              </button>
              
              {categories.map((category) => (
                <button
                  key={category.slug}
                  type="button"
                  className={`sidebar-btn-focus w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all duration-300 relative overflow-hidden group ${
                    activeCategory === category.slug 
                      ? "bg-gradient-to-r from-blue-400/20 to-purple-500/20 text-primary font-medium" 
                      : "text-sidebar-foreground hover:text-primary"
                  } focus:outline-none focus:ring-2 focus:ring-blue-400/40`}
                  onClick={(e) => handleCategoryClick(category.slug, e)}
                >
                  <span className="text-xl relative z-10 transition-transform duration-300 group-hover:scale-110">{category.icon}</span>
                  <span className="relative z-10">{category.name}</span>
                  <span className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-400 to-purple-500 transition-width duration-300 rounded-full ${
                    activeCategory === category.slug ? "w-full" : "w-0 group-hover:w-full"
                  }`}></span>
                </button>
              ))}
              
              {/* Popular Tags Section */}
              {popularTags.length > 0 && (
                <div className="mt-6">
                  <h2 className="mb-2 text-lg font-semibold tracking-tight" style={{
                    backgroundImage: "linear-gradient(to right, #60a5fa, #a855f7)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent"
                  }}>Popular Tags</h2>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag) => (
                      <button
                        key={tag.name}
                        type="button"
                        className="sidebar-btn-focus inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 focus:outline-none focus:ring-2 focus:ring-blue-400/40"
                        onClick={(e) => handleTagClick(tag.name, e)}
                      >
                        <span>{tag.name}</span>
                        <span className="ml-1 text-xs opacity-70">({tag.count})</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </nav>
          </div>
        </div>
      </div>
    </aside>
  );
}