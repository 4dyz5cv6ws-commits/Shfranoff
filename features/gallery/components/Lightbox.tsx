'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { GalleryImage } from '../types';

export function Lightbox({
  images,
  index,
  onClose,
  onNavigate
}: {
  images: GalleryImage[];
  index: number | null;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}) {
  const isOpen = index !== null;
  const current = index !== null ? images[index] : null;

  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && index !== null) onNavigate((index + 1) % images.length);
      if (e.key === 'ArrowLeft' && index !== null) onNavigate((index - 1 + images.length) % images.length);
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, index, images.length, onClose, onNavigate]);

  return (
    <AnimatePresence>
      {isOpen && current && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-bg/95 p-4"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            aria-label="Закрыть просмотр"
            className="absolute right-5 top-5 text-cream/70 hover:text-saffron"
          >
            <X size={24} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((index! - 1 + images.length) % images.length);
            }}
            aria-label="Предыдущее фото"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-cream/70 hover:text-saffron sm:left-6"
          >
            <ChevronLeft size={28} />
          </button>

          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="relative h-[80vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image src={current.src} alt={current.alt} fill sizes="90vw" className="object-contain" />
          </motion.div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((index! + 1) % images.length);
            }}
            aria-label="Следующее фото"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-cream/70 hover:text-saffron sm:right-6"
          >
            <ChevronRight size={28} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
