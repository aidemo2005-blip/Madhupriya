'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music2, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { config } from '@/lib/config';

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const autoPlayAttemptedRef = useRef(false);
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [vol, setVol] = useState(0.5);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = vol;
    a.muted = muted;
  }, [vol, muted]);

  useEffect(() => {
    if (autoPlayAttemptedRef.current || playing) return;
    const passiveOpts = { passive: true } as AddEventListenerOptions;
    const tryPlay = async () => {
      if (autoPlayAttemptedRef.current || playing) return;
      autoPlayAttemptedRef.current = true;
      const a = audioRef.current;
      if (!a) return;
      try {
        await a.play();
        setPlaying(true);
        setOpen(true);
        return;
      } catch (err) {
        // audible autoplay blocked. attempt muted autoplay as a fallback.
        // eslint-disable-next-line no-console
        console.warn('Autoplay attempt blocked or failed:', err);
        try {
          a.muted = true;
          await a.play();
          // mark muted state in React so controls reflect it
          setMuted(true);
          setPlaying(true);
          setOpen(true);
          // eslint-disable-next-line no-console
          console.warn('Muted autoplay succeeded; user can unmute via controls.');
        } catch (err2) {
          // final fallback: open controls so user can manually start playback
          setOpen(true);
          // eslint-disable-next-line no-console
          console.warn('Muted autoplay also failed:', err2);
        }
      }
    };

    window.addEventListener('scroll', tryPlay, passiveOpts);
    window.addEventListener('wheel', tryPlay, passiveOpts);
    window.addEventListener('touchstart', tryPlay, passiveOpts);
    window.addEventListener('pointerdown', tryPlay);
    window.addEventListener('keydown', tryPlay);

    return () => {
      window.removeEventListener('scroll', tryPlay, passiveOpts);
      window.removeEventListener('wheel', tryPlay, passiveOpts);
      window.removeEventListener('touchstart', tryPlay, passiveOpts);
      window.removeEventListener('pointerdown', tryPlay);
      window.removeEventListener('keydown', tryPlay);
    };
  }, [playing]);

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      try {
        await a.play();
        setPlaying(true);
      } catch {
        /* ignore */
      }
    }
  };

  return (
    <>
      <audio ref={audioRef} src={config.music.src} loop preload="auto" />
      <div className="fixed bottom-5 right-5 z-[70] flex items-end gap-3">
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="glass rounded-2xl px-4 py-3 flex flex-col gap-2 w-52 shadow-2xl"
            >
              <div className="flex items-center justify-between text-rose-700">
                <span className="text-xs font-medium tracking-wide">
                  {config.music.title}
                </span>
                <button
                  onClick={() => setMuted((m) => !m)}
                  className="opacity-80 hover:opacity-100 transition"
                  aria-label="Mute"
                >
                  {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                </button>
              </div>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={muted ? 0 : vol}
                onChange={(e) => {
                  setVol(parseFloat(e.target.value));
                  setMuted(false);
                }}
                className="w-full accent-rose-300"
                aria-label="Volume"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => {
            if (!open) setOpen(true);
            toggle();
          }}
          whileTap={{ scale: 0.92 }}
          className="glass h-12 w-12 rounded-full flex items-center justify-center text-rose-700 shadow-xl"
          aria-label={playing ? 'Pause music' : 'Play music'}
        >
          <motion.span
            animate={{ rotate: playing ? 0 : 0 }}
            className="relative flex items-center justify-center"
          >
            {playing ? (
              <Pause size={18} />
            ) : (
              <Play size={18} className="ml-0.5" />
            )}
            {playing && (
              <motion.span
                className="absolute inset-0 rounded-full border border-rose-400/50"
                animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
              />
            )}
          </motion.span>
        </motion.button>
      </div>
    </>
  );
}
