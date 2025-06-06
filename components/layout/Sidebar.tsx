"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, ChevronLeft, ChevronRight, Home, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
  onToggleCollapse?: () => void;
}

export function Sidebar({ mobile = false, onClose, collapsed = false, onToggleCollapse }: SidebarProps) {
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
      { name: "free", count: 50 },
      { name: "multiplayer", count: 18 },
      { name: "racing", count: 22 },
      { name: "shooting", count: 20 },
    ];
    
    setPopularTags(tags);
  }, []);

  const handleCategoryClick = (slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    setActiveCategory(slug);
    
    // Scroll to the category section
    const categorySection = document.getElementById(`category-${slug}`);
    if (categorySection) {
      categorySection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If we're not on the homepage, navigate to homepage with category hash
      router.push(`/#category-${slug}`);
    }
    
    // Close mobile sidebar if needed
    if (mobile && onClose) {
      onClose();
    }
  };

  const handleTagClick = (tag: string, e: React.MouseEvent) => {
    e.preventDefault();
    
    // Scroll to the tag section if it exists
    const tagSection = document.getElementById(`tag-${tag}`);
    if (tagSection) {
      tagSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If we're not on the homepage, navigate to homepage with tag hash
      router.push(`/#tag-${tag}`);
    }
    
    // Close mobile sidebar if needed
    if (mobile && onClose) {
      onClose();
    }
  };

  const handleAllGamesClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveCategory(null);
    router.push("/");
    
    // Close mobile sidebar if needed
    if (mobile && onClose) {
      onClose();
    }
  };

  // If collapsed, show only icons
  if (collapsed && !mobile) {
    return (
      <aside className="h-full overflow-y-auto shadow-xl relative no-drag">
        <div className="gradient-bg h-full py-4 px-2 border-r border-transparent bg-clip-border" 
          style={{
            backgroundImage: 'linear-gradient(to right, transparent, transparent), linear-gradient(to bottom, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.3))'
          }}>
          {/* Toggle button - 内嵌到侧边栏中 */}
          {onToggleCollapse && (
            <button 
              onClick={onToggleCollapse}
              className="absolute right-0 top-4 z-40 flex h-8 w-6 items-center justify-center text-white transition-colors duration-300 group overflow-hidden no-drag"
              aria-label="Expand sidebar"
            >
              <div className="w-full h-full flex items-center justify-start pl-1 bg-gradient-to-r from-blue-400 to-purple-500">
                <ChevronRight className="h-4 w-4" />
              </div>
            </button>
          )}
          
          {/* Mini logo or identifier */}
          <div className="mb-6 flex justify-center">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
              <Gamepad2 className="h-5 w-5 text-white" />
            </div>
          </div>
          
          <div className="space-y-6">
            <nav className="flex flex-col items-center space-y-4">
              {/* All Games Button */}
              <Link
                href="/"
                className={`flex items-center justify-center rounded-full w-10 h-10 transition-all duration-300 relative overflow-hidden group ${
                  activeCategory === null 
                    ? "bg-gradient-to-r from-blue-400/20 to-purple-500/20 text-primary" 
                    : "text-sidebar-foreground hover:text-primary"
                }`}
                onClick={handleAllGamesClick}
                title="All Games"
              >
                <Home className="h-5 w-5 relative z-10 transition-transform duration-300 group-hover:scale-110" />
                <span className={`absolute bottom-0 left-0 right-0 mx-auto h-[2px] bg-gradient-to-r from-blue-400 to-purple-500 transition-width duration-300 rounded-full ${
                  activeCategory === null ? "w-6" : "w-0 group-hover:w-6"
                }`}></span>
              </Link>
              
              {categories.map((category) => (
                <a
                  key={category.slug}
                  href={`/#category-${category.slug}`}
                  className={`flex items-center justify-center rounded-full w-10 h-10 transition-all duration-300 relative overflow-hidden group ${
                    activeCategory === category.slug 
                      ? "bg-gradient-to-r from-blue-400/20 to-purple-500/20 text-primary" 
                      : "text-sidebar-foreground hover:text-primary"
                  }`}
                  onClick={(e) => handleCategoryClick(category.slug, e)}
                  title={category.name}
                >
                  <span className="text-xl relative z-10 transition-transform duration-300 group-hover:scale-110">{category.icon}</span>
                  <span className={`absolute bottom-0 left-0 right-0 mx-auto h-[2px] bg-gradient-to-r from-blue-400 to-purple-500 transition-width duration-300 rounded-full ${
                    activeCategory === category.slug ? "w-6" : "w-0 group-hover:w-6"
                  }`}></span>
                </a>
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
    <aside className={`${mobile ? '' : 'h-full'} overflow-y-auto shadow-xl relative no-drag`}>
      <div className={`gradient-bg h-full p-4 ${mobile ? '' : 'border-r border-transparent bg-clip-border'}`} 
        style={{
          backgroundImage: mobile ? '' : 'linear-gradient(to right, transparent, transparent), linear-gradient(to bottom, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.3))'
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
        
        {!mobile && onToggleCollapse && (
                      <button 
              onClick={onToggleCollapse}
              className="absolute right-0 top-4 z-40 flex h-8 w-6 items-center justify-center text-white transition-colors duration-300 group overflow-hidden no-drag"
              aria-label="Collapse sidebar"
            >
            <div className="w-full h-full flex items-center justify-end pr-1 bg-gradient-to-r from-blue-400 to-purple-500">
              <ChevronLeft className="h-4 w-4" />
            </div>
          </button>
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
              <Link
                href="/"
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all duration-300 relative overflow-hidden group ${
                  activeCategory === null 
                    ? "bg-gradient-to-r from-blue-400/20 to-purple-500/20 text-primary font-medium" 
                    : "text-sidebar-foreground hover:text-primary"
                }`}
                onClick={handleAllGamesClick}
              >
                <Home className="h-4 w-4 relative z-10 transition-transform duration-300 group-hover:scale-110" />
                <span className="relative z-10">All Games</span>
                <span className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-400 to-purple-500 transition-width duration-300 rounded-full ${
                  activeCategory === null ? "w-full" : "w-0 group-hover:w-full"
                }`}></span>
              </Link>
              
              {categories.map((category) => (
                <a
                  key={category.slug}
                  href={`/#category-${category.slug}`}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all duration-300 relative overflow-hidden group ${
                    activeCategory === category.slug 
                      ? "bg-gradient-to-r from-blue-400/20 to-purple-500/20 text-primary font-medium" 
                      : "text-sidebar-foreground hover:text-primary"
                  }`}
                  onClick={(e) => handleCategoryClick(category.slug, e)}
                >
                  <span className="text-xl relative z-10 transition-transform duration-300 group-hover:scale-110">{category.icon}</span>
                  <span className="relative z-10">{category.name}</span>
                  <span className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-400 to-purple-500 transition-width duration-300 rounded-full ${
                    activeCategory === category.slug ? "w-full" : "w-0 group-hover:w-full"
                  }`}></span>
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-semibold tracking-tight" style={{
              backgroundImage: "linear-gradient(to right, #60a5fa, #a855f7)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent"
            }}>Popular Tags</h2>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <a
                  key={tag.name}
                  href={`/#tag-${tag.name}`}
                  className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-400/10 to-purple-500/10 border border-blue-400/20 px-2.5 py-0.5 text-xs font-medium text-primary hover:from-blue-400/20 hover:to-purple-500/20 transition-colors duration-300 hover:shadow-sm"
                  onClick={(e) => handleTagClick(tag.name, e)}
                >
                  {tag.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
} 