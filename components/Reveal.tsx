'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  blur?: boolean;
  once?: boolean;
  amount?: number;
};

export function Reveal({
  children,
  className = '',
  delay = 0,
  y = 24,
  blur = true,
  once = true,
  amount = 0.3,
}: Props) {
  const reduce = useReducedMotion();
  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: reduce ? 0 : y,
      filter: blur && !reduce ? 'blur(12px)' : 'blur(0px)',
    },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
}

/** Staggered container — children should be motion elements with variants. */
export function Stagger({
  children,
  className = '',
  stagger = 0.12,
  delay = 0,
  once = true,
  amount = 0.3,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  once?: boolean;
  amount?: number;
}) {
  const reduce = useReducedMotion();
  const variants: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduce ? 0 : stagger, delayChildren: delay },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = '',
  y = 28,
  blur = true,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  blur?: boolean;
}) {
  const reduce = useReducedMotion();
  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: reduce ? 0 : y,
      filter: blur && !reduce ? 'blur(14px)' : 'blur(0px)',
    },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}

/** Parallax wrapper — moves its child based on scroll within the viewport. */
export function Parallax({
  children,
  className = '',
  speed = 0.2,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`${speed * 100}%`, `${-speed * 100}%`]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y: reduce ? 0 : y }}>{children}</motion.div>
    </div>
  );
}
