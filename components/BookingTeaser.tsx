"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { team, BOOKSY_URL } from "@/lib/data";

export default function BookingTeaser() {
  const [selectedMember, setSelectedMember] = useState<
    (typeof team)[0] | null
  >(null);

  return (
    <>
      <section className="py-28 lg:py-40 bg-near-black relative overflow-hidden">
        {/* Radial gradient atmosphere */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-charcoal/60 blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-20">
            <SectionHeading label="Book Your Chair" light className="mb-7" />
            <motion.h2
              className="font-display font-light text-[clamp(2.4rem,5vw,3.8rem)] text-bone leading-tight"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
            >
              Choose your specialist.
            </motion.h2>
            <motion.p
              className="font-sans text-[13px] text-bone/40 mt-4 tracking-wide"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              Select a team member to learn more and book directly.
            </motion.p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.12 } },
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            {team.map((member) => (
              <motion.button
                key={member.name}
                variants={{
                  hidden: { opacity: 0, y: 28 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.8,
                      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
                    },
                  },
                }}
                onClick={() => setSelectedMember(member)}
                className="group relative overflow-hidden text-left border border-bone/10 hover:border-bone/30 transition-all duration-400 p-8 flex flex-col justify-between min-h-[200px] focus-visible:outline-none focus-visible:border-gold"
                aria-label={`Learn more about ${member.name}`}
              >
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/50 transition-colors duration-400" />

                <div className="relative z-10">
                  <p className="font-sans text-[9px] font-medium tracking-[0.22em] uppercase text-bone/30 mb-3">
                    {member.role}
                  </p>
                  <h3 className="font-display font-light text-3xl text-bone leading-tight group-hover:text-gold transition-colors duration-300">
                    {member.name}
                  </h3>
                </div>

                <div className="relative z-10 flex items-center justify-between mt-8">
                  <span className="font-sans text-[9px] font-medium tracking-[0.2em] uppercase text-bone/30 group-hover:text-bone/60 transition-colors duration-300">
                    {member.instagram}
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="text-bone/20 group-hover:text-gold transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            className="fixed inset-0 z-[150] flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelectedMember(null)}
          >
            <div className="absolute inset-0 bg-near-black/80 backdrop-blur-sm" />

            <motion.div
              className="relative z-10 bg-bone max-w-lg w-full overflow-hidden"
              initial={{ opacity: 0, y: 32, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-5 right-5 z-10 text-warm-grey hover:text-near-black transition-colors"
                aria-label="Close"
              >
                <X size={18} strokeWidth={1.5} />
              </button>

              <div className="relative h-56 bg-charcoal flex items-center justify-center overflow-hidden">
                {!selectedMember.image.startsWith("https://placehold.co") && (
                  <Image
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    fill
                    className="object-cover opacity-70"
                  />
                )}
                <span className="font-display font-light text-7xl text-bone/15 select-none relative z-10">
                  {selectedMember.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
                <div className="absolute inset-0 bg-gradient-to-t from-bone/80 to-transparent" />
              </div>

              <div className="p-8">
                <p className="font-sans text-[9px] font-medium tracking-[0.22em] uppercase text-warm-grey mb-2">
                  {selectedMember.role}
                </p>
                <h3 className="font-display font-light text-3xl text-near-black mb-5">
                  {selectedMember.name}
                </h3>
                <p className="font-sans text-[13px] text-warm-grey leading-[1.8] mb-8">
                  {selectedMember.bio}
                </p>

                <div className="flex gap-3">
                  <a
                    href={BOOKSY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="book"
                    className="flex-1 text-center py-3.5 bg-near-black text-bone font-sans text-[10px] font-medium tracking-[0.18em] uppercase hover:bg-charcoal transition-colors duration-300"
                  >
                    Book with {selectedMember.name.split(" ")[0]}
                  </a>
                  <a
                    href={selectedMember.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3.5 border border-near-black/20 font-sans text-[10px] font-medium tracking-[0.18em] uppercase text-warm-grey hover:border-near-black hover:text-near-black transition-all duration-300"
                  >
                    Instagram
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
