"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [hasSeenLoading, setHasSeenLoading] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("edens-loaded");
    if (seen) {
      setVisible(false);
      setHasSeenLoading(true);
      return;
    }

    const timer = setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("edens-loaded", "1");
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  if (hasSeenLoading) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9998] bg-near-black flex flex-col items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
        >
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Image
              src="/logo.jpg"
              alt="EDENS"
              width={160}
              height={64}
              className="h-10 w-auto object-contain invert"
              priority
            />
          </motion.div>

          <motion.div
            className="mt-10 w-24 h-px bg-bone/20 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="h-full bg-bone"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, delay: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
