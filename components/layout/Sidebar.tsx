"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  // If collapsed, show only icons
  if (collapsed && !mobile) {
    return (
      <aside className="h-full overflow-y-auto shadow-xl">
        <div className="gradient-bg h-full py-4 px-2 border-r border-sidebar-border rounded-r-lg">
          {/* Mini logo or identifier */}
          <div className="mb-6 flex justify-center">
            <span className="text-2xl font-bold" style={{
              backgroundImage: "linear-gradient(to right, #60a5fa, #a855f7)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent"
            }}>G</span>
          </div>
          
          <div className="space-y-6">
            <nav className="flex flex-col items-center space-y-4">
              {categories.map((category) => (
                <a
                  key={category.slug}
                  href={`/#category-${category.slug}`}
                  className={`flex items-center justify-center rounded-lg p-2 w-10 h-10 transition-all duration-300 hover:bg-accent/50 hover:text-accent-foreground ${
                    activeCategory === category.slug 
                      ? "bg-primary/20 text-primary" 
                      : "text-sidebar-foreground"
                  }`}
                  onClick={(e) => handleCategoryClick(category.slug, e)}
                  title={category.name}
                >
                  <span className="text-xl">{category.icon}</span>
                </a>
              ))}
            </nav>
            
            {/* Mini popular tags indicator */}
            <div className="flex justify-center">
              <div className="w-8 h-1 bg-primary/20 rounded-full"></div>
            </div>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className={`${mobile ? '' : 'h-full'} overflow-y-auto shadow-xl ${mobile ? '' : 'animate-float'}`}>
      <div className={`gradient-bg h-full p-4 ${mobile ? '' : 'border-r border-sidebar-border rounded-r-lg'}`}>
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
              {categories.map((category) => (
                <a
                  key={category.slug}
                  href={`/#category-${category.slug}`}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all duration-300 hover:bg-accent/50 hover:text-accent-foreground hover:translate-x-1 ${
                    activeCategory === category.slug 
                      ? "bg-primary/20 text-primary translate-x-1" 
                      : "text-sidebar-foreground"
                  }`}
                  onClick={(e) => handleCategoryClick(category.slug, e)}
                >
                  <span className="text-xl">{category.icon}</span>
                  <span>{category.name}</span>
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
                  className="inline-flex items-center rounded-full bg-primary/10 border border-primary/20 px-2.5 py-0.5 text-xs font-medium text-primary hover:bg-primary/20 transition-all duration-300 hover:scale-105"
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