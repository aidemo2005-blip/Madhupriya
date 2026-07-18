'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { config } from '@/lib/config';
import MagneticButton from '../MagneticButton';
import Particles from '../Particles';

type Props = { onReveal: () => void };

export default function BuildUp({ onReveal }: Props) {
  const lines = config.buildUp.lines;
  const reduce = useReducedMotion();
  const [revealed, setRevealed] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-[#ffd6e6] to-[#fff5f7] overflow-hidden py-24">
      <Particles count={18} color="rgba(225, 29, 72, 0.35)" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="orb bg-rose-300/50" style={{ width: '40vmax', height: '40vmax', top: '20%', left: '30%' }} />
      </div>

      <div className="relative z-10 max-w-2xl px-6 text-center">
        <div className="space-y-8">
          {lines.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 30, filter: reduce ? 'blur(0px)' : 'blur(14px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 1.2, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className={`font-serif ${
                i === lines.length - 1
                  ? 'text-3xl sm:text-4xl italic text-rose-700'
                  : 'text-2xl sm:text-3xl text-rose-900/85'
              }`}
            >
              {line}
            </motion.p>
          ))}
        </div>

        <div className="mt-16">
          <AnimatePresence mode="wait">
            {!revealed ? (
              <motion.div
                key="cta"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 1 }}
              >
                <MagneticButton
                  onClick={() => {
                    setRevealed(true);
                    setTimeout(onReveal, 700);
                  }}
                  strength={0.5}
                  className="group relative rounded-full px-8 py-4 text-white"
                >
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-500 to-fuchsia-500 shadow-[0_8px_30px_-6px_rgba(225,29,72,0.55)]" />
                  <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-rose-400 to-fuchsia-400 opacity-70 blur-md group-hover:opacity-100 transition" />
                  <span className="relative font-serif italic text-lg">
                    {config.buildUp.cta}
                  </span>
                </MagneticButton>
              </motion.div>
            ) : (
              <motion.div
                key="leaving"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0, filter: 'blur(12px)' }}
                transition={{ duration: 0.7 }}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
