"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () =>
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(next, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused, current]);

  return (
    <section
      className="py-28 lg:py-40 bg-bone border-t border-near-black/8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-20">
          <SectionHeading label="Kind Words" className="mb-7" />
        </div>

        <div className="relative min-h-[220px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
            >
              {/* Opening quote mark */}
              <p className="font-display text-[7rem] leading-none text-near-black/8 select-none -mb-8">
                &ldquo;
              </p>

              <blockquote className="font-display font-light italic text-[clamp(1.3rem,3vw,1.9rem)] text-near-black leading-relaxed tracking-[-0.01em] max-w-2xl mx-auto">
                {testimonials[current].quote}
              </blockquote>

              <footer className="mt-8">
                <p className="font-sans text-[10px] font-medium tracking-[0.22em] uppercase text-warm-grey">
                  — {testimonials[current].author}
                </p>
              </footer>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-8 mt-14">
          <button
            onClick={prev}
            className="text-warm-grey hover:text-near-black transition-colors p-2"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={18} strokeWidth={1.5} />
          </button>

          <div className="flex items-center gap-2.5">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-px transition-all duration-400 ${
                  i === current
                    ? "w-8 bg-near-black"
                    : "w-3 bg-near-black/25 hover:bg-near-black/50"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="text-warm-grey hover:text-near-black transition-colors p-2"
            aria-label="Next testimonial"
          >
            <ChevronRight size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </section>
  );
}
