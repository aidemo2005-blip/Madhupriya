'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { config } from '@/lib/config';
import { Stagger, StaggerItem } from '../Reveal';
import GradientOrbs from '../GradientOrbs';

function Card({
  title,
  text,
  index,
}: {
  title: string;
  text: string;
  index: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40, filter: reduce ? 'blur(0px)' : 'blur(14px)' },
        show: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      whileHover={{ y: -8, scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 250, damping: 20 }}
      className="glass hover-ring rounded-3xl p-6 sm:p-8 relative overflow-hidden group"
    >
      <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-rose-400/40 blur-2xl group-hover:bg-rose-400/60 transition-colors" />
      <div className="absolute -bottom-10 -left-10 h-24 w-24 rounded-full bg-fuchsia-400/30 blur-2xl" />
      <span className="font-hand text-rose-500 text-xl">
        {String(index + 1).padStart(2, '0')}
      </span>
      <h3 className="font-serif text-2xl sm:text-3xl text-rose-800 mt-2 leading-tight">
        {title}
      </h3>
      <p className="text-rose-900/70 text-sm sm:text-base mt-3 leading-relaxed">
        {text}
      </p>
    </motion.div>
  );
}

export default function ThingsILove() {
  const reasons = config.reasons;
  return (
    <section className="relative py-24 sm:py-32 bg-gradient-to-b from-[#ffe4ec] to-[#ffd0e0] overflow-hidden">
      <GradientOrbs />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <Stagger>
          <StaggerItem>
            <p className="font-hand text-rose-500 text-2xl mb-2">things about you</p>
          </StaggerItem>
          <StaggerItem>
            <h2 className="font-serif text-4xl sm:text-6xl text-rose-800 mb-14 max-w-3xl">
              What I love about you
            </h2>
          </StaggerItem>
        </Stagger>

        <Stagger stagger={0.18} amount={0.15} className="grid gap-5 sm:gap-7 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <Card key={i} title={r.title} text={r.text} index={i} />
          ))}
        </Stagger>
      </div>
    </section>
  );
}
