'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { config } from '@/lib/config';
import MagneticButton from '../MagneticButton';
import Particles from '../Particles';

export default function Finale() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#ffd6e6] via-[#ffe4ec] to-[#fff5f7] py-24">
      <Particles count={50} hearts color="rgba(225, 29, 72, 0.6)" />
      <div className="vignette absolute inset-0 pointer-events-none" />

      <div className="relative z-10 w-full max-w-2xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20, filter: reduce ? 'blur(0px)' : 'blur(14px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif italic text-rose-700/85 text-2xl sm:text-3xl mb-10"
        >
          {config.finale.intro}
        </motion.p>

        <AnimatePresence mode="wait">
          {!open ? (
            <motion.div
              key="cta"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 1 }}
            >
              <MagneticButton
                onClick={() => setOpen(true)}
                strength={0.5}
                className="group relative rounded-full px-9 py-4 text-white"
              >
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-500 to-fuchsia-500 shadow-[0_8px_30px_-6px_rgba(225,29,72,0.6)]" />
                <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-rose-400 to-fuchsia-400 opacity-70 blur-md group-hover:opacity-100 transition" />
                <span className="relative flex items-center gap-2 font-serif text-lg">
                  {config.finale.cta}
                  <Heart size={16} className="fill-rose-300 text-rose-300" />
                </span>
              </MagneticButton>
            </motion.div>
          ) : (
            <Envelope />
          )}
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1.4 }}
          className="font-hand text-rose-500/80 text-xl sm:text-2xl mt-16"
        >
          {config.finale.signoff}
        </motion.p>
      </div>
    </section>
  );
}

function Envelope() {
  const reduce = useReducedMotion();
  return (
    <motion.div
      key="envelope"
      initial={{ opacity: 0, scale: 0.85, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto max-w-md"
    >
      {/* Envelope flap */}
      <motion.div
        initial={{ rotateX: 0 }}
        animate={{ rotateX: -180 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: 'top' }}
        className="absolute -top-[1px] left-0 right-0 h-1/2 z-20"
      >
        <div
          className="w-full h-full"
          style={{
            background: 'linear-gradient(135deg, #f7c9d6 0%, #f49ab5 100%)',
            clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
          }}
        />
      </motion.div>

      {/* Envelope body */}
      <div className="relative rounded-lg overflow-hidden shadow-2xl">
        <div className="bg-[#f7c9d6] h-10" />
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#fbf7f2] px-8 py-10 text-left"
        >
          <p className="font-hand text-neutral-800 text-xl sm:text-2xl leading-relaxed whitespace-pre-line">
            {config.finale.note}
          </p>
          <div className="mt-6 flex items-center gap-2 text-rose-400">
            <Heart size={16} className="fill-rose-400" />
            <span className="font-hand text-lg text-neutral-600">
              {config.myName}
            </span>
          </div>
        </motion.div>
        <div className="bg-[#f7c9d6] h-6" />
      </div>

      {/* Wax seal */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 12 }}
        className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 z-30 h-14 w-14 rounded-full bg-gradient-to-br from-rose-500 to-rose-700 flex items-center justify-center shadow-lg"
      >
        <Heart size={20} className="text-rose-50 fill-rose-50" />
      </motion.div>
    </motion.div>
  );
}
