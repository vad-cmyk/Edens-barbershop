"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { BOOKSY_URL } from "@/lib/data";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 2.0 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
      aria-label="EDENS Barbershop — Wymondham"
    >
      {/* Background image with parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: imageY }}
      >
        <Image
          src="/images/502579374_9729158220466580_4096631646632462273_n.jpg"
          alt="Precision craft — EDENS Barbershop"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-near-black/75" />
        {/* Subtle gradient at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-near-black/50 to-transparent" />
      </motion.div>

      {/* Noise texture */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-30"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        variants={container}
        initial="hidden"
        animate="show"
        style={{ y: textY, opacity }}
      >
        {/* Eyebrow */}
        <motion.div
          variants={item}
          className="flex items-center justify-center gap-3 mb-10"
        >
          <span className="block h-px w-8 bg-bone/30" />
          <span className="font-sans text-[10px] font-medium tracking-[0.25em] uppercase text-bone/50">
            Wymondham, United Kingdom
          </span>
          <span className="block h-px w-8 bg-bone/30" />
        </motion.div>

        {/* Main heading */}
        <motion.h1
          variants={item}
          className="font-display font-light text-[clamp(4rem,15vw,9rem)] leading-none tracking-[0.12em] text-bone mb-8"
        >
          - EDENS -
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={item}
          className="font-display font-light text-[clamp(1.1rem,2.5vw,1.4rem)] italic text-bone/70 mb-14 leading-relaxed max-w-xl mx-auto"
        >
          Wymondham&rsquo;s quietly refined barbershop.
          <br />
          Twenty years of craft.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href={BOOKSY_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="book"
            className="inline-flex items-center justify-center px-9 py-4 bg-bone text-near-black font-sans text-[10px] font-medium tracking-[0.18em] uppercase border border-bone hover:bg-transparent hover:text-bone transition-all duration-300"
          >
            Book an Appointment
          </a>
          <a
            href="#services"
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector("#services")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center justify-center px-9 py-4 bg-transparent text-bone font-sans text-[10px] font-medium tracking-[0.18em] uppercase border border-bone/40 hover:border-bone hover:bg-bone/10 transition-all duration-300"
          >
            Explore Services
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.0, duration: 0.8 }}
        style={{ opacity }}
      >
        <span className="font-sans text-[8px] font-medium tracking-[0.3em] uppercase text-bone/40">
          Scroll
        </span>
        <div className="w-px h-12 bg-bone/20 overflow-hidden">
          <motion.div
            className="w-full bg-bone/60"
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
            style={{ height: "40%" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
