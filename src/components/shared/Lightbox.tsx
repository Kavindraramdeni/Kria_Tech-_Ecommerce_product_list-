import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: { imageSrc: string; caption: string }[];
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
}

export function Lightbox({ isOpen, onClose, images, currentIndex, onNext, onPrev }: LightboxProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-10"
        onClick={onClose}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2"
          aria-label="Close lightbox"
        >
          <X size={32} />
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-2 bg-white/10 rounded-full"
          aria-label="Previous image"
        >
          <ChevronLeft size={32} />
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-2 bg-white/10 rounded-full"
          aria-label="Next image"
        >
          <ChevronRight size={32} />
        </button>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={images[currentIndex].imageSrc}
            alt={images[currentIndex].caption}
            className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
            referrerPolicy="no-referrer"
          />
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mt-6 text-white text-xl font-medium text-center"
          >
            {images[currentIndex].caption}
          </motion.p>
          <p className="mt-2 text-white/50 text-sm">
            {currentIndex + 1} / {images.length}
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
