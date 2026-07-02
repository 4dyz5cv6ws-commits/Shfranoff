'use client';

import { motion } from 'framer-motion';

const THREAD_PATH =
  'M2 12 C 80 2, 160 26, 240 10 S 400 2, 480 14 S 640 24, 718 8';

export function SaffronThreadHero({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 720 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <motion.path
        d={THREAD_PATH}
        stroke="#D89B3C"
        strokeWidth="1.4"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
      />
    </svg>
  );
}

export function SaffronThreadDivider({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 720 24" fill="none" className={className} aria-hidden="true">
      <path
        d={THREAD_PATH}
        stroke="#D89B3C"
        strokeWidth="1"
        strokeLinecap="round"
        opacity={0.35}
      />
    </svg>
  );
}
