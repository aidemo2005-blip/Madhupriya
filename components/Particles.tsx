'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

type Props = {
  count?: number;
  className?: string;
  color?: string;
  hearts?: boolean;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  a: number;
  isHeart: boolean;
};

export default function Particles({
  count = 36,
  className = '',
  color = 'rgba(255, 200, 220, 0.9)',
  hearts = false,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let particles: Particle[] = [];

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const n = isMobile ? Math.min(count, Math.floor(count * 0.5)) : count;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = w * window.devicePixelRatio;
      canvas.height = h * window.devicePixelRatio;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
      init();
    };

    const init = () => {
      particles = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.18,
        vy: -0.15 - Math.random() * 0.35,
        r: 0.6 + Math.random() * 1.8,
        a: 0.2 + Math.random() * 0.6,
        isHeart: hearts && Math.random() < 0.18,
      }));
    };

    const drawHeart = (x: number, y: number, s: number, alpha: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(s / 12, s / 12);
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.moveTo(0, 3);
      ctx.bezierCurveTo(0, -1, -5, -1, -5, 2);
      ctx.bezierCurveTo(-5, 5, 0, 7, 0, 10);
      ctx.bezierCurveTo(0, 7, 5, 5, 5, 2);
      ctx.bezierCurveTo(5, -1, 0, -1, 0, 3);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.restore();
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) {
          p.y = h + 10;
          p.x = Math.random() * w;
        }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;

        if (p.isHeart) {
          drawHeart(p.x, p.y, p.r * 4, p.a);
        } else {
          ctx.beginPath();
          ctx.globalAlpha = p.a;
          ctx.fillStyle = color;
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };

    resize();
    tick();
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [count, color, hearts, reduce]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 ${className}`}
      aria-hidden
    />
  );
}
