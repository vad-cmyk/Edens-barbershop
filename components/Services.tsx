"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { services, BOOKSY_URL } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function Services() {
  return (
    <section id="services" className="py-28 lg:py-40 bg-charcoal relative overflow-hidden">
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(250,250,247,1) 1px, transparent 1px), linear-gradient(90deg, rgba(250,250,247,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-20">
          <SectionHeading label="Services" light className="mb-7" />
          <motion.h2
            className="font-display font-light text-[clamp(2.4rem,5vw,3.8rem)] text-bone leading-tight"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Every chair, every time.
          </motion.h2>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-bone/10"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {services.map((service) => (
            <motion.div
              key={service.name}
              variants={cardVariants}
              className="group bg-charcoal p-8 flex flex-col justify-between min-h-[240px] relative overflow-hidden transition-all duration-400 hover:bg-near-black"
            >
              {/* Gold accent line — appears on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />

              <div>
                <h3 className="font-display font-light text-2xl text-bone mb-3 leading-snug group-hover:text-gold transition-colors duration-300">
                  {service.name}
                </h3>
                <p className="font-sans text-[13px] text-bone/50 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="flex items-end justify-between mt-8">
                <div>
                  <p className="font-sans text-xl font-light text-bone tracking-tight">
                    {service.price}
                  </p>
                  <p className="font-sans text-[9px] font-medium tracking-[0.2em] uppercase text-bone/30 mt-0.5">
                    {service.duration}
                  </p>
                </div>

                <a
                  href={BOOKSY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="book"
                  className="flex items-center gap-1.5 font-sans text-[9px] font-medium tracking-[0.18em] uppercase text-bone/40 hover:text-gold transition-colors duration-300 group/link"
                  aria-label={`Book ${service.name} on Booksy`}
                >
                  Book
                  <ArrowUpRight
                    size={12}
                    className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                  />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <a
            href={BOOKSY_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="book"
            className="inline-flex items-center gap-2 px-9 py-4 bg-bone text-near-black font-sans text-[10px] font-medium tracking-[0.18em] uppercase hover:bg-gold transition-colors duration-300"
          >
            Book Your Appointment
            <ArrowUpRight size={13} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
