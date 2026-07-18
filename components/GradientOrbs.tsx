'use client';

import { motion } from 'framer-motion';

/** Soft floating gradient orbs (bright rose/pink/cream) used behind sections. */
export default function GradientOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <motion.div
        className="orb bg-rose-300/70"
        style={{ width: '40vmax', height: '40vmax', top: '-10%', left: '-10%' }}
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.1, 0.95, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="orb bg-pink-300/60"
        style={{ width: '38vmax', height: '38vmax', bottom: '-12%', right: '-8%' }}
        animate={{ x: [0, -30, 20, 0], y: [0, 25, -15, 0], scale: [1, 0.95, 1.1, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="orb bg-amber-200/70"
        style={{ width: '30vmax', height: '30vmax', top: '40%', left: '40%' }}
        animate={{ x: [0, 20, -25, 0], y: [0, -20, 15, 0], scale: [1, 1.05, 0.9, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="orb bg-fuchsia-300/40"
        style={{ width: '26vmax', height: '26vmax', top: '60%', left: '5%' }}
        animate={{ x: [0, 25, -15, 0], y: [0, -25, 10, 0], scale: [1, 1.08, 0.95, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
