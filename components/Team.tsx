"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import InstagramIcon from "@/components/ui/InstagramIcon";
import SectionHeading from "@/components/ui/SectionHeading";
import { team } from "@/lib/data";

export default function Team() {
  return (
    <section id="team" className="py-28 lg:py-40 bg-bone">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-20">
          <SectionHeading label="The Team" className="mb-7" />
          <motion.h2
            className="font-display font-light text-[clamp(2.4rem,5vw,3.8rem)] text-near-black leading-tight"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
          >
            The people behind the work.
          </motion.h2>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.15 } },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {team.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function TeamCard({ member }: { member: (typeof team)[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 32 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
        },
      }}
      className="group relative flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image container */}
      <div className="relative overflow-hidden bg-near-black aspect-[4/5]">
        {member.image.startsWith("https://placehold.co") ? (
          /* CSS placeholder — replace with real headshot */
          <div className="absolute inset-0 flex items-center justify-center bg-charcoal transition-all duration-700 group-hover:brightness-75">
            <span className="font-display font-light text-7xl text-bone/20 select-none tracking-widest">
              {member.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
        ) : (
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-75"
            style={{ objectPosition: member.objectPosition ?? "center" }}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        )}

        {/* Bio overlay — slides up on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              className="absolute inset-0 flex flex-col justify-end p-7 bg-gradient-to-t from-near-black/90 via-near-black/50 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.p
                className="font-sans text-[13px] text-bone/80 leading-relaxed"
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 8, opacity: 0 }}
                transition={{ duration: 0.35, delay: 0.05 }}
              >
                {member.bio}
              </motion.p>

              <motion.a
                href={member.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 font-sans text-[9px] font-medium tracking-[0.2em] uppercase text-gold hover:text-bone transition-colors duration-300"
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, delay: 0.1 }}
                aria-label={`Follow ${member.name} on Instagram`}
              >
                <InstagramIcon size={12} />
                {member.instagram}
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Text below image */}
      <div className="pt-5 flex items-start justify-between">
        <div>
          <h3 className="font-display font-light text-2xl text-near-black leading-tight">
            {member.name}
          </h3>
          <p className="font-sans text-[9px] font-medium tracking-[0.2em] uppercase text-warm-grey mt-1">
            {member.role}
          </p>
        </div>

        <a
          href={member.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-warm-grey hover:text-near-black transition-colors duration-300 mt-1"
          aria-label={`${member.name} on Instagram`}
        >
          <InstagramIcon size={16} strokeWidth={1.5} />
        </a>
      </div>
    </motion.div>
  );
}
