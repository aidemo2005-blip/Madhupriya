'use client';

import { useEffect, useRef } from 'react';

/** Desktop-only cursor glow that follows the pointer + click-to-burst hearts. */
export default function CursorInteractions() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(hover: none)').matches) return; // skip on touch
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const glow = glowRef.current;
    if (!glow) return;

    let raf = 0;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let cx = tx;
    let cy = ty;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      glow.style.opacity = '1';
    };
    const onLeave = () => {
      glow.style.opacity = '0';
    };

    const loop = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      glow.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    const onClick = (e: MouseEvent) => {
      burstHearts(e.clientX, e.clientY);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('click', onClick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('click', onClick);
    };
  }, []);

  return <div ref={glowRef} className="cursor-glow" aria-hidden style={{ opacity: 0 }} />;
}

function burstHearts(x: number, y: number) {
  const container = document.createElement('div');
  container.className = 'heart-burst';
  container.style.left = `${x}px`;
  container.style.top = `${y}px`;
  document.body.appendChild(container);

  const count = 8;
  for (let i = 0; i < count; i++) {
    const span = document.createElement('span');
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
    const dist = 50 + Math.random() * 70;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist - 30;
    span.style.setProperty('--dx', `${dx}px`);
    span.style.setProperty('--dy', `${dy}px`);
    span.style.setProperty('--rot', `${Math.random() * 360}deg`);
    span.style.animationDelay = `${Math.random() * 0.08}s`;
    container.appendChild(span);
  }

  setTimeout(() => container.remove(), 1100);
}
