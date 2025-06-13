'use client';

import { useEffect } from 'react';
import { recordGameVisit } from '@/lib/client-analytics';

interface GameTrackerProps {
  gameId: number;
  gameTags: string;
}

export function GameTracker({ gameId, gameTags }: GameTrackerProps) {
  useEffect(() => {
    // 记录游戏访问
    recordGameVisit(gameId, gameTags);
  }, [gameId, gameTags]);

  // 这个组件不渲染任何内容，只负责跟踪
  return null;
} 