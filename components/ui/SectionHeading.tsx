"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  label: string;
  className?: string;
  light?: boolean;
}

export default function SectionHeading({
  label,
  className = "",
  light = false,
}: SectionHeadingProps) {
  return (
    <motion.div
      className={`flex items-center justify-center gap-4 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
    >
      <span
        className={`block h-px w-8 ${light ? "bg-bone/40" : "bg-near-black/30"}`}
      />
      <span
        className={`font-sans text-[10px] font-medium tracking-[0.25em] uppercase ${
          light ? "text-bone/60" : "text-warm-grey"
        }`}
      >
        {label}
      </span>
      <span
        className={`block h-px w-8 ${light ? "bg-bone/40" : "bg-near-black/30"}`}
      />
    </motion.div>
  );
}
