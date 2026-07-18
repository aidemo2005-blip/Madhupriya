'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { config } from '@/lib/config';
import Particles from '../Particles';
import GradientOrbs from '../GradientOrbs';

function Line({
  text,
  index,
  total,
  progress,
}: {
  text: string;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
  const reduce = useReducedMotion();
  const start = index / total;
  const end = (index + 1) / total;
  const mid = (start + end) / 2;

  const opacity = useTransform(progress, [start, mid, end], [0.18, 1, 0.3]);
  const y = useTransform(progress, [start, end], reduce ? [0, 0] : [50, -50]);
  const blur = useTransform(progress, [start, mid, end], reduce ? [0, 0, 0] : [14, 0, 14]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  return (
    <motion.p
      style={{ opacity, y, filter }}
      className={`font-serif leading-snug py-3 ${
        index === total - 1
          ? 'text-3xl sm:text-5xl italic text-gradient-rose'
          : 'text-2xl sm:text-4xl text-rose-900/90'
      }`}
    >
      {text}
    </motion.p>
  );
}

export default function Beginning() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });
  const lines = config.beginning.lines;

  return (
    <section ref={ref} className="relative min-h-[400vh] bg-gradient-to-b from-[#fff5f7] to-[#ffe4ec]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        <GradientOrbs />
        <Particles count={28} color="rgba(225, 29, 72, 0.45)" />
        <div className="vignette absolute inset-0 pointer-events-none" />
        <div className="relative z-10 w-full max-w-3xl px-6">
          {lines.map((line, i) => (
            <Line
              key={i}
              text={line}
              index={i}
              total={lines.length}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
