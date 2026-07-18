'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { config } from '@/lib/config';
import Particles from './Particles';
import MagneticButton from './MagneticButton';
import GradientOrbs from './GradientOrbs';

type Props = { onEnter: () => void };

export default function Intro({ onEnter }: Props) {
  const [step, setStep] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const reduce = useReducedMotion();
  const lines = config.intro.lines;

  useEffect(() => {
    if (reduce) {
      const t = setTimeout(() => setStep(lines.length), 600);
      return () => clearTimeout(t);
    }
    if (step >= lines.length) return;
    const t = setTimeout(() => setStep((s) => s + 1), step === 0 ? 1600 : 2600);
    return () => clearTimeout(t);
  }, [step, lines.length, reduce]);

  const handleEnter = () => {
    setLeaving(true);
    setTimeout(onEnter, 1100);
  };

  return (
    <motion.section
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#fff1f5] via-[#ffe4ec] to-[#ffd6e6]"
      animate={{ opacity: leaving ? 0 : 1, filter: leaving ? 'blur(20px)' : 'blur(0px)' }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <GradientOrbs />
      <Particles count={60} hearts color="rgba(225, 29, 72, 0.7)" />
      <div className="vignette absolute inset-0 pointer-events-none" />

      <div className="relative z-10 w-full max-w-2xl px-6 text-center">
        <AnimatePresence mode="wait">
          {step < lines.length ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 30, filter: 'blur(18px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -30, filter: 'blur(18px)' }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="min-h-[40vh] flex items-center justify-center"
            >
              <p
                className={
                  step === 0
                    ? 'font-serif italic text-rose-700/90 text-4xl sm:text-6xl'
                    : 'font-serif text-rose-800 text-2xl sm:text-4xl leading-snug'
                }
                style={{ textShadow: '0 2px 30px rgba(244, 114, 182, 0.35)' }}
              >
                {lines[step]}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="cta"
              initial={{ opacity: 0, y: 30, filter: 'blur(18px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center gap-8"
            >
              <p className="font-serif italic text-rose-700/90 text-lg sm:text-2xl">
                So... I made this for you.
              </p>
              <MagneticButton
                onClick={handleEnter}
                strength={0.5}
                className="group relative rounded-full px-9 py-4 text-white"
              >
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 shadow-[0_8px_30px_-6px_rgba(225,29,72,0.6)]" />
                <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-rose-400 to-fuchsia-400 opacity-60 blur-lg animate-pulse" />
                <span className="relative flex items-center gap-2 text-base sm:text-lg font-medium">
                  {config.intro.cta}
                  <Heart size={18} className="fill-white text-white" />
                </span>
              </MagneticButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
