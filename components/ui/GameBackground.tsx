"use client";

import { useEffect, useRef } from "react";

interface GameBackgroundProps {
  className?: string;
  particleCount?: number;
}

export default function GameBackground({ 
  className = "", 
  particleCount = 50 
}: GameBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 设置画布尺寸
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 粒子类
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
      decay: number;

      constructor() {
        const canvasWidth = canvas?.width || window.innerWidth;
        const canvasHeight = canvas?.height || window.innerHeight;
        
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 0.5;
        
        // 随机选择科技感颜色
        const colors = [
          'rgba(59, 130, 246, ',    // 蓝色
          'rgba(147, 51, 234, ',    // 紫色
          'rgba(16, 185, 129, ',    // 青色
          'rgba(236, 72, 153, ',    // 粉色
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = Math.random() * 0.8 + 0.2;
        this.decay = Math.random() * 0.02 + 0.005;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        // 边界处理
        const canvasWidth = canvas?.width || window.innerWidth;
        const canvasHeight = canvas?.height || window.innerHeight;
        
        if (this.x < 0 || this.x > canvasWidth) this.vx *= -1;
        if (this.y < 0 || this.y > canvasHeight) this.vy *= -1;
        
        // 透明度变化
        this.alpha -= this.decay;
        if (this.alpha <= 0) {
          this.alpha = Math.random() * 0.8 + 0.2;
          this.x = Math.random() * canvasWidth;
          this.y = Math.random() * canvasHeight;
        }
      }

      draw() {
        if (!ctx) return;
        
        ctx.save();
        ctx.globalAlpha = this.alpha;
        
        // 绘制粒子
        ctx.fillStyle = this.color + this.alpha + ')';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // 绘制发光效果
        ctx.shadowColor = this.color + '0.8)';
        ctx.shadowBlur = this.size * 2;
        ctx.fill();
        
        ctx.restore();
      }
    }

    // 创建粒子数组
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // 连线效果
    const drawConnections = () => {
      if (!ctx) return;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            const opacity = (100 - distance) / 100 * 0.1;
            ctx.save();
            ctx.globalAlpha = opacity;
            ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
    };

    // 动画循环
    const animate = () => {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // 更新和绘制粒子
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      // 绘制连线
      drawConnections();
      
      requestAnimationFrame(animate);
    };

    animate();

    // 清理函数
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [particleCount]);

  return (
    <>
      {/* 粒子画布 */}
      <canvas
        ref={canvasRef}
        className={`fixed inset-0 pointer-events-none z-[-1] ${className}`}
        style={{ background: 'transparent' }}
      />
      
      {/* 装饰性几何图形 */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        {/* 大圆环 */}
        <div className="absolute top-10 right-10 w-96 h-96 border border-blue-500/10 rounded-full animate-float-gentle" />
        <div className="absolute top-20 right-20 w-80 h-80 border border-purple-500/10 rounded-full animate-float-gentle" style={{ animationDelay: '2s' }} />
        
        {/* 小装饰圆点 */}
        <div className="absolute top-1/4 left-10 w-2 h-2 bg-blue-500/30 rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-purple-500/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-cyan-500/30 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* 线性装饰 */}
        <div className="absolute top-1/2 left-0 w-32 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        <div className="absolute bottom-1/3 right-0 w-24 h-px bg-gradient-to-l from-transparent via-purple-500/20 to-transparent" />
      </div>
    </>
  );
} 