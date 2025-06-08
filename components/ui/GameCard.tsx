import Image from "next/image";
import Link from "next/link";
import { Sparkles, Flame, Star, Zap, Award, Trophy, Clock } from "lucide-react";

interface GameCardProps {
  id: number;
  title: string;
  image: string;
  tags: string;
  isNew?: boolean;
  isHot?: boolean;
  isFeatured?: boolean;
}

export function GameCard({
  id,
  title,
  image,
  tags,
  isNew = false,
  isHot = false,
  isFeatured = false,
}: GameCardProps) {
  // Convert tags string to array
  const tagList = tags.split(",");
  
  // 获取游戏类型标签，用于角标显示
  const gameType = tagList.find(tag => 
    ["action", "racing", "puzzle", "adventure", "shooter", "strategy", "sports", "arcade"].includes(tag.trim().toLowerCase())
  );
  
  // 根据标签生成一个随机特性
  const randomFeatures = [
    { name: "Popular", icon: <Trophy className="h-3 w-3" /> },
    { name: "Trending", icon: <Flame className="h-3 w-3" /> },
    { name: "Top Rated", icon: <Star className="h-3 w-3" /> },
    { name: "Award", icon: <Award className="h-3 w-3" /> },
    { name: "New", icon: <Clock className="h-3 w-3" /> }
  ];
  
  // 使用游戏ID生成一个伪随机数，选择一个特性标签
  const featureIndex = id % randomFeatures.length;
  const randomFeature = randomFeatures[featureIndex];
  
  // 仅为一部分游戏显示随机特性标签（比如ID能被3整除的游戏）
  const shouldShowRandomFeature = id % 3 === 0;
  
  return (
    <Link href={`/games/${id}`} className="group">
      <div className="relative overflow-hidden rounded-lg transition-all duration-300 hover:shadow-xl gradient-border">
        <div className="aspect-[16/9] w-full overflow-hidden rounded-t-lg bg-muted">
          <div className="relative h-full w-full">
            <Image
              src={image}
              alt={title}
              width={320}
              height={180}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          {/* Status badges - 移到右上角 */}
          <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
            {isNew && (
              <div className="flex items-center gap-1 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 px-2 py-1 text-xs font-bold text-white shadow-lg animate-pulse">
                <Zap className="h-3 w-3" />
                <span>NEW</span>
              </div>
            )}
            {isHot && (
              <div className="flex items-center gap-1 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-2 py-1 text-xs font-bold text-white shadow-lg">
                <Flame className="h-3 w-3" />
                <span>HOT</span>
              </div>
            )}
            {isFeatured && (
              <div className="flex items-center gap-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-2 py-1 text-xs font-bold text-white shadow-lg">
                <Sparkles className="h-3 w-3" />
                <span>FEATURED</span>
              </div>
            )}
            {shouldShowRandomFeature && !isNew && !isHot && !isFeatured && (
              <div className="flex items-center gap-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-2 py-1 text-xs font-bold text-white shadow-lg">
                {randomFeature.icon}
                <span>{randomFeature.name.toUpperCase()}</span>
              </div>
            )}
          </div>
          
          {/* 游戏类型角标 - 改为更明显的设计 */}
          {gameType && (
            <div className="absolute top-0 left-0">
              <div className="bg-gradient-to-r from-primary to-primary/80 text-xs font-bold text-primary-foreground py-1 px-3 rounded-br-lg shadow-md">
                {gameType.trim().toUpperCase()}
              </div>
            </div>
          )}
        </div>
        
        <div className="p-3 gradient-card rounded-b-lg">
          <h3 className="font-medium line-clamp-1">{title}</h3>
          
          <div className="mt-1 flex flex-wrap gap-1">
            {tagList.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-primary/10 border border-primary/20 px-2 py-0.5 text-xs text-primary"
              >
                {tag.trim()}
              </span>
            ))}
            {tagList.length > 3 && (
              <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                +{tagList.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
} 