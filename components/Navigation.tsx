"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { navLinks, BOOKSY_URL } from "@/lib/data";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-bone/95 backdrop-blur-sm border-b border-near-black/8"
            : "bg-transparent"
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: 1.9 }}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-12 h-16 lg:h-20 flex items-center justify-between">
          <a
            href="#home"
            onClick={(e) => handleAnchorClick(e, "#home")}
            className="flex items-center flex-shrink-0"
            aria-label="EDENS — Home"
          >
            <Image
              src="/logo.jpg"
              alt="EDENS"
              width={120}
              height={48}
              className={`h-7 w-auto object-contain transition-all duration-500 ${
                scrolled ? "" : "invert"
              }`}
              priority
            />
          </a>

          <ul className="hidden md:flex items-center gap-7 lg:gap-9">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className={`font-sans text-[10px] font-medium tracking-[0.18em] uppercase transition-colors duration-300 ${
                    scrolled
                      ? "text-near-black/70 hover:text-near-black"
                      : "text-bone/70 hover:text-bone"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={BOOKSY_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="book"
              className={`hidden md:inline-flex items-center px-6 py-2.5 font-sans text-[10px] font-medium tracking-[0.18em] uppercase border transition-all duration-300 ${
                scrolled
                  ? "bg-near-black text-bone border-near-black hover:bg-transparent hover:text-near-black"
                  : "bg-bone text-near-black border-bone hover:bg-transparent hover:text-bone"
              }`}
            >
              Book Now
            </a>

            <button
              onClick={() => setMobileOpen(true)}
              className={`md:hidden p-1.5 rounded-sm transition-colors ${
                scrolled ? "text-near-black" : "text-bone"
              }`}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[100] bg-near-black flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-bone/10">
              <Image
                src="/logo.jpg"
                alt="EDENS"
                width={120}
                height={48}
                className="h-7 w-auto object-contain invert"
              />
              <button
                onClick={() => setMobileOpen(false)}
                className="text-bone/70 hover:text-bone transition-colors p-1.5"
                aria-label="Close navigation menu"
              >
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>

            <nav className="flex-1 flex flex-col justify-center px-10 overflow-y-auto">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="block py-5 font-display text-[clamp(2.5rem,8vw,4rem)] font-light text-bone border-b border-bone/10 leading-tight hover:text-gold transition-colors duration-300"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.12 + i * 0.065,
                    duration: 0.5,
                    ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <motion.div
              className="px-10 py-8 border-t border-bone/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
            >
              <a
                href={BOOKSY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-4 bg-bone text-near-black font-sans text-[10px] font-medium tracking-[0.18em] uppercase hover:bg-gold transition-colors duration-300"
              >
                Book an Appointment
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
