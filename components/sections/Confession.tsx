'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion, useInView } from 'framer-motion';
import { config } from '@/lib/config';
import Particles from '../Particles';
import GradientOrbs from '../GradientOrbs';

export default function Confession() {
  const beats = config.confession.beats;
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setStep(beats.length);
      setDone(true);
      return;
    }
    if (step >= beats.length) {
      setDone(true);
      return;
    }
    const delay =
      step === 0 ? 900 : step === 1 ? 1400 : step === 2 ? 1900 : 1300;
    const t = setTimeout(() => setStep((s) => s + 1), delay);
    return () => clearTimeout(t);
  }, [step, beats.length, reduce, inView]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#fff5f7] via-[#ffe4ec] to-[#ffd6e6] py-24">
      <GradientOrbs />
      <Particles count={70} hearts color="rgba(225, 29, 72, 0.65)" />
      <div className="vignette absolute inset-0 pointer-events-none" />

      <div ref={ref} className="relative z-10 w-full max-w-3xl px-6 text-center min-h-[60vh] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {step < beats.length ? (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 30, filter: reduce ? 'blur(0px)' : 'blur(18px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: reduce ? 'blur(0px)' : 'blur(18px)' }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <p
                className={
                  step === 0
                    ? 'font-serif text-4xl sm:text-6xl text-gradient-rose'
                    : step === 1
                    ? 'font-serif italic text-rose-600/80 text-2xl sm:text-3xl'
                    : step === 2
                    ? 'font-serif text-3xl sm:text-5xl text-rose-800 leading-snug'
                    : 'font-serif text-xl sm:text-3xl text-rose-900/85 leading-relaxed'
                }
              >
                {beats[step]}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="all"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
              className="space-y-4"
            >
              {beats.map((b, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20, filter: reduce ? 'blur(0px)' : 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.9, delay: i * 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className={
                    i === 0
                      ? 'font-serif text-2xl sm:text-3xl text-rose-600/80'
                      : i === beats.length - 1
                      ? 'font-serif text-3xl sm:text-5xl text-gradient-rose pt-4'
                      : 'font-serif text-lg sm:text-2xl text-rose-900/85 leading-relaxed'
                  }
                >
                  {b}
                </motion.p>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {done && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-12"
          >
            <FinaleAnchor />
          </motion.div>
        )}
      </div>
    </section>
  );
}

function FinaleAnchor() {
  return (
    <div
      id="finale"
      className="scroll-mt-24"
    />
  );
}
