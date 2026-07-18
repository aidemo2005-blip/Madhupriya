'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { config } from '@/lib/config';

export default function FavoritePerson() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });
  const lines = config.favoritePerson.lines;

  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.05, 1.35]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.25, 0.55]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -24]);
  const secondaryImageY = useTransform(scrollYProgress, [0, 1], [24, -12]);

  const favoriteImages = config.favoritePerson.images?.length
    ? config.favoritePerson.images
    : [config.favoritePerson.image ?? '/images/5.jpeg'];

  return (
    <section ref={ref} className="relative h-[300vh] bg-[#ffe4ec]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ scale, y: imageY }} className="absolute inset-0">
          <Image
            src={favoriteImages[0]}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </motion.div>
        {favoriteImages[1] ? (
          <motion.div
            style={{ y: secondaryImageY }}
            className="absolute right-6 bottom-6 w-64 h-96 overflow-hidden rounded-[2rem] border border-white/70 shadow-2xl hidden sm:block"
          >
            <Image
              src={favoriteImages[1]}
              alt=""
              fill
              sizes="18rem"
              className="object-cover"
              priority
            />
          </motion.div>
        ) : null}
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-gradient-to-b from-rose-200/40 via-rose-300/30 to-rose-500/50"
        />
        <div className="absolute inset-0 vignette pointer-events-none" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          {lines.map((line, i) => (
            <Line key={i} text={line} index={i} total={lines.length} progress={scrollYProgress} reduce={reduce} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Line({
  text,
  index,
  total,
  progress,
  reduce,
}: {
  text: string;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  reduce: boolean | null;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const mid = (start + end) / 2;
  const opacity = useTransform(progress, [start, mid, end], [0, 1, 0.85]);
  const y = useTransform(progress, [start, end], reduce ? [0, 0] : [40, -20]);
  const blur = useTransform(progress, [start, mid, end], reduce ? [0, 0, 0] : [14, 0, 6]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  return (
    <motion.p
      style={{ opacity, y, filter, textShadow: '0 2px 24px rgba(0,0,0,0.25)' }}
      className={`font-serif leading-snug py-2 ${
        index === total - 1
          ? 'text-3xl sm:text-5xl italic text-gradient-rose'
          : 'text-2xl sm:text-4xl text-white'
      }`}
    >
      {text}
    </motion.p>
  );
}
