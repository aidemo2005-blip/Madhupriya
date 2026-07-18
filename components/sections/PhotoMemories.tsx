'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { config } from '@/lib/config';
import { Reveal } from '../Reveal';

function Polaroid({
  src,
  caption,
  rotate,
  className = '',
  style = {},
}: {
  src: string;
  caption: string;
  rotate: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`polaroid ${className}`}
      style={{ transform: `rotate(${rotate}deg)`, ...style }}
    >
      <div className="relative w-full aspect-[3/4] overflow-hidden rounded-sm bg-neutral-200">
        <Image
          src={src}
          alt={caption}
          fill
          sizes="(max-width: 768px) 80vw, 360px"
          className="object-cover"
        />
      </div>
      <p className="font-hand text-neutral-700 text-lg leading-tight mt-3 px-1 text-center">
        {caption}
      </p>
    </div>
  );
}

export default function PhotoMemories() {
  const photos = config.photos;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const yUp = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
  const yDown = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);

  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: 'center' });
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => setIdx(embla.selectedScrollSnap());
    embla.on('select', onSelect);
    onSelect();
    return () => {
      embla.off('select', onSelect);
    };
  }, [embla]);

  return (
    <section
      ref={ref}
      className="relative bg-gradient-to-b from-[#ffe4ec] via-[#ffd6e6] to-[#ffe4ec] py-24 sm:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="orb bg-rose-300/50" style={{ width: '50vmax', height: '50vmax', top: '10%', left: '-15%' }} />
        <div className="orb bg-fuchsia-300/40" style={{ width: '40vmax', height: '40vmax', bottom: '0%', right: '-10%' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <Reveal>
          <p className="font-hand text-rose-500 text-2xl mb-2">little pieces of us</p>
          <h2 className="font-serif text-4xl sm:text-6xl text-rose-800 mb-16">
            Moments I keep going back to
          </h2>
        </Reveal>

        {/* Desktop: editorial scattered layout */}
        <div className="hidden md:grid grid-cols-12 gap-6 relative h-[1200px]">
          {photos.map((p, i) => {
            const positions = [
              'col-start-1 col-span-4 top-0',
              'col-start-6 col-span-4 top-12',
              'col-start-9 col-span-4 top-0',
              'col-start-2 col-span-4 top-72',
              'col-start-6 col-span-4 top-64',
              'col-start-10 col-span-3 top-80',
              'col-start-1 col-span-4 top-[520px]',
              'col-start-5 col-span-4 top-[560px]',
            ];
            const parallaxY = i % 2 === 0 ? yUp : yDown;
            return (
              <motion.div
                key={i}
                className={`absolute ${positions[i % positions.length]}`}
                style={{ y: parallaxY }}
                initial={{ opacity: 0, y: 60, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: p.rotate }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1, delay: (i % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.04, rotate: 0, zIndex: 5 }}
              >
                <Polaroid src={p.src} caption={p.caption} rotate={0} className="w-64" />
              </motion.div>
            );
          })}
        </div>

        {/* Mobile: swipeable carousel */}
        <div className="md:hidden">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {photos.map((p, i) => (
                <div
                  key={i}
                  className="flex-[0_0_80%] min-w-0 px-2"
                >
                  <Polaroid src={p.src} caption={p.caption} rotate={0} />
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-1.5 mt-6">
            {photos.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === idx ? 'w-6 bg-rose-500' : 'w-1.5 bg-rose-300/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
