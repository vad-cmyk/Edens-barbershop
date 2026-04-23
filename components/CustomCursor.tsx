"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [isHoveringCTA, setIsHoveringCTA] = useState(false);
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.4 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    if (mq.matches) return;

    const handleMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setVisible(true);
    };

    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isCTA =
        target.closest("[data-cursor='book']") !== null ||
        target.closest("a[href*='booksy']") !== null;
      const isLink =
        target.closest("a") !== null || target.closest("button") !== null;
      setIsHoveringCTA(isCTA);
      setIsHoveringLink(!isCTA && isLink);
    };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (reducedMotion) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none"
      style={{ x, y }}
    >
      <motion.div
        className="relative flex items-center justify-center"
        animate={{
          width: isHoveringCTA ? 80 : isHoveringLink ? 20 : 12,
          height: isHoveringCTA ? 80 : isHoveringLink ? 20 : 12,
          borderRadius: isHoveringCTA ? 40 : 50,
          x: isHoveringCTA ? -40 : isHoveringLink ? -10 : -6,
          y: isHoveringCTA ? -40 : isHoveringLink ? -10 : -6,
          backgroundColor: isHoveringCTA ? "#0a0a0a" : isHoveringLink ? "rgba(10,10,10,0.4)" : "#0a0a0a",
        }}
        transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
        style={{ opacity: visible ? 1 : 0 }}
      >
        <motion.span
          className="font-sans text-[9px] font-medium tracking-[0.15em] uppercase text-bone select-none"
          animate={{ opacity: isHoveringCTA ? 1 : 0 }}
          transition={{ duration: 0.15 }}
        >
          Book
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
