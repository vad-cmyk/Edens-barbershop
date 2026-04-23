"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import { stats } from "@/lib/data";
import { useEffect, useState } from "react";

function AnimatedCounter({
  target,
  suffix,
  inView,
}: {
  target: number;
  suffix: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), target);
      setCount(current);
      if (current >= target) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function About() {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });

  const imageRef = useRef<HTMLDivElement>(null);
  const imageInView = useInView(imageRef, { once: true, margin: "-80px" });

  return (
    <section id="about" className="py-28 lg:py-40 bg-bone overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image column */}
          <div ref={imageRef} className="relative">
            <motion.div
              className="relative overflow-hidden"
              style={{
                clipPath: imageInView
                  ? "inset(0 0 0 0)"
                  : "inset(0 0 100% 0)",
              }}
              animate={{
                clipPath: imageInView ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
              }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src="/images/504562859_18047550272575605_199543636622676739_n.jpg"
                alt="The EDENS team outside their Wymondham barbershop"
                width={700}
                height={900}
                className="w-full h-[480px] lg:h-[600px] object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-near-black/10" />
            </motion.div>

            {/* Floating stat badge */}
            <motion.div
              className="absolute -bottom-6 -right-6 lg:-right-10 bg-charcoal text-bone p-7 hidden sm:block"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={
                imageInView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.85 }
              }
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <p className="font-display text-5xl font-light leading-none text-bone">
                20
                <span className="text-gold">+</span>
              </p>
              <p className="font-sans text-[9px] font-medium tracking-[0.2em] uppercase text-bone/60 mt-1.5">
                Years of craft
              </p>
            </motion.div>
          </div>

          {/* Text column */}
          <motion.div
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: 0.1, delayChildren: 0.2 },
              },
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <SectionHeading label="Our Story" className="justify-start mb-8" />

            <motion.h2
              variants={fadeUp}
              className="font-display font-light text-[clamp(2.2rem,5vw,3.4rem)] leading-tight tracking-tight text-near-black mb-8"
            >
              More than a haircut.
              <br />
              <span className="italic text-warm-grey">A practice.</span>
            </motion.h2>

            <motion.div
              variants={fadeUp}
              className="space-y-5 text-warm-grey leading-[1.8] text-[15px]"
            >
              <p>
                EDENS was built on the belief that a barbershop should feel like
                somewhere you actually want to be. Not rushed, not impersonal —
                a place with craft at its centre and people who genuinely care
                about their work.
              </p>
              <p>
                With over two decades of combined experience, our team brings
                together precision barbering and tattoo artistry under one roof
                in Wymondham, Norfolk. Every client leaves looking and feeling
                exactly as they should.
              </p>
              <p>
                We keep the shop small so that the work stays personal. No
                conveyor belt, no compromises.
              </p>
            </motion.div>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-3 gap-6 mt-14 pt-10 border-t border-near-black/10">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="text-center lg:text-left"
                  initial={{ opacity: 0, y: 20 }}
                  animate={statsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.7,
                    delay: 0.2 + i * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  <p className="font-display font-light text-4xl lg:text-5xl leading-none text-near-black">
                    <AnimatedCounter
                      target={stat.value}
                      suffix={stat.suffix}
                      inView={statsInView}
                    />
                  </p>
                  <p className="font-sans text-[9px] font-medium tracking-[0.2em] uppercase text-warm-grey/80 mt-2">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
