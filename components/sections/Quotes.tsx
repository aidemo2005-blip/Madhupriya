'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { config } from '@/lib/config';
import Particles from '../Particles';

export default function Quotes() {
  const quotes = config.quotes;
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  return (
    <section ref={ref} className="relative bg-gradient-to-b from-[#ffd0e0] via-[#ffc8d8] to-[#ffd6e6]" style={{ height: `${quotes.length * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <div className="orb bg-rose-300/60" style={{ width: '60vmax', height: '60vmax', top: '-10%', left: '-20%' }} />
          <div className="orb bg-fuchsia-300/45" style={{ width: '50vmax', height: '50vmax', bottom: '-15%', right: '-20%' }} />
        </div>
        <Particles count={24} color="rgba(225, 29, 72, 0.4)" />
        <div className="vignette absolute inset-0 pointer-events-none" />

        <div className="relative z-10 w-full max-w-4xl px-6">
          {quotes.map((q, i) => {
            const start = i / quotes.length;
            const end = (i + 1) / quotes.length;
            const mid = (start + end) / 2;
            return (
              <QuoteLine key={i} text={q} progress={scrollYProgress} start={start} mid={mid} end={end} reduce={reduce} />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function QuoteLine({
  text,
  progress,
  start,
  mid,
  end,
  reduce,
}: {
  text: string;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  start: number;
  mid: number;
  end: number;
  reduce: boolean | null;
}) {
  const opacity = useTransform(progress, [start, mid, end], [0, 1, 0]);
  const y = useTransform(progress, [start, end], reduce ? [0, 0] : [80, -80]);
  const blur = useTransform(progress, [start, mid, end], reduce ? [0, 0, 0] : [20, 0, 20]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);
  const scale = useTransform(progress, [start, mid, end], [0.96, 1, 0.96]);

  return (
    <motion.blockquote
      style={{ opacity, y, filter, scale }}
      className="absolute inset-0 flex items-center justify-center text-center"
    >
      <p className="font-serif italic text-2xl sm:text-4xl md:text-5xl text-rose-800 leading-snug max-w-3xl">
        <span className="text-rose-400/70 mr-2 align-top text-3xl">&ldquo;</span>
        {text}
        <span className="text-rose-400/70 ml-2 align-bottom text-3xl">&rdquo;</span>
      </p>
    </motion.blockquote>
  );
}
