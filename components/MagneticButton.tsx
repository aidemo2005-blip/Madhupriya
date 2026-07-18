'use client';

import { useRef, useState, type ReactNode, type MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type Props = {
  children: ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  as?: 'button' | 'div';
};

export default function MagneticButton({
  children,
  className = '',
  strength = 0.4,
  onClick,
  as = 'button',
}: Props) {
  const ref = useRef<HTMLButtonElement | HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    setPos({ x: relX * strength, y: relY * strength });
  };

  const onLeave = () => {
    setPos({ x: 0, y: 0 });
    setHovered(false);
  };

  const MotionTag = as === 'button' ? motion.button : motion.div;

  return (
    <MotionTag
      ref={ref as never}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      onClick={onClick}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 18, mass: 0.3 }}
      className={cn(
        'relative inline-flex items-center justify-center no-tap-highlight',
        className
      )}
      data-hovered={hovered}
    >
      {children}
    </MotionTag>
  );
}
