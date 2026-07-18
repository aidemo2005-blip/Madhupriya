'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Intro from '@/components/Intro';
import ProgressIndicator from '@/components/ProgressIndicator';
import MusicPlayer from '@/components/MusicPlayer';
import CursorInteractions from '@/components/CursorInteractions';
import Beginning from '@/components/sections/Beginning';
import PhotoMemories from '@/components/sections/PhotoMemories';
import ThingsILove from '@/components/sections/ThingsILove';
import Quotes from '@/components/sections/Quotes';
import FavoritePerson from '@/components/sections/FavoritePerson';
import BuildUp from '@/components/sections/BuildUp';
import Confession from '@/components/sections/Confession';
import Finale from '@/components/sections/Finale';

export default function Home() {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (entered) {
      window.scrollTo({ top: 1, behavior: 'auto' });
    }
  }, [entered]);

  return (
    <main className="relative grain">
      <CursorInteractions />
      <ProgressIndicator />
      <MusicPlayer />

      <AnimatePresence>
        {!entered && <Intro onEnter={() => setEntered(true)} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: entered ? 1 : 0 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        aria-hidden={!entered}
        style={{ pointerEvents: entered ? 'auto' : 'none' }}
      >
        <Beginning />
        <PhotoMemories />
        <ThingsILove />
        <Quotes />
        <FavoritePerson />
        <BuildUp onReveal={() => {}} />
        <Confession />
        <Finale />
      </motion.div>
    </main>
  );
}
