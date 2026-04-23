"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface LightboxProps {
  images: { src: string; alt: string }[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function Lightbox({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: LightboxProps) {
  const current = images[currentIndex];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    },
    [onClose, onNext, onPrev]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[200] bg-near-black/96 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        role="dialog"
        aria-modal="true"
        aria-label="Image lightbox"
        onClick={onClose}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 text-bone/60 hover:text-bone transition-colors p-2"
          aria-label="Close lightbox"
        >
          <X size={22} strokeWidth={1.5} />
        </button>

        {/* Counter */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-bone/40">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Prev */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-4 lg:left-8 z-10 text-bone/60 hover:text-bone transition-colors p-3"
          aria-label="Previous image"
        >
          <ChevronLeft size={28} strokeWidth={1.5} />
        </button>

        {/* Image */}
        <motion.div
          key={currentIndex}
          className="relative max-w-5xl max-h-[85vh] w-full h-full flex items-center justify-center px-16 lg:px-20"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative w-full h-full">
            <Image
              src={current.src}
              alt={current.alt}
              fill
              className="object-contain"
              sizes="(max-width: 1280px) 100vw, 1200px"
              priority
            />
          </div>
        </motion.div>

        {/* Next */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-4 lg:right-8 z-10 text-bone/60 hover:text-bone transition-colors p-3"
          aria-label="Next image"
        >
          <ChevronRight size={28} strokeWidth={1.5} />
        </button>

        {/* Alt text */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-sans text-[10px] tracking-[0.15em] uppercase text-bone/30 text-center max-w-sm px-4">
          {current.alt}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
