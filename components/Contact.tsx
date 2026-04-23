"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, ArrowUpRight } from "lucide-react";
import InstagramIcon from "@/components/ui/InstagramIcon";
import SectionHeading from "@/components/ui/SectionHeading";
import { openingHours, BOOKSY_URL } from "@/lib/data";

const socialAccounts = [
  { handle: "@lewiscowdrycuts_", url: "https://instagram.com/lewiscowdrycuts_", label: "Lewis Cowdry" },
  { handle: "@barber.rt_", url: "https://instagram.com/barber.rt_", label: "RT Barber" },
  { handle: "@oliblacktattoo", url: "https://instagram.com/oliblacktattoo", label: "Oli Black Tattoo" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

export default function Contact() {
  return (
    <section id="contact" className="py-28 lg:py-40 bg-bone border-t border-near-black/8">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-20">
          <SectionHeading label="Visit Us" className="mb-7" />
          <motion.h2
            className="font-display font-light text-[clamp(2.4rem,5vw,3.8rem)] text-near-black leading-tight"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
          >
            Find us in Wymondham.
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left — Info */}
          <motion.div
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.1 } },
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            {/* Address */}
            <motion.div variants={fadeUp} className="flex gap-4 mb-10">
              <MapPin size={16} strokeWidth={1.5} className="text-warm-grey mt-1 flex-shrink-0" />
              <div>
                <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-warm-grey mb-2">
                  Address
                </p>
                <address className="not-italic font-sans text-[15px] text-near-black leading-relaxed">
                  Unit 5, Acorn Court
                  <br />
                  Wymondham
                  <br />
                  NR18 9AL
                </address>
              </div>
            </motion.div>

            {/* Phone */}
            <motion.div variants={fadeUp} className="flex gap-4 mb-10">
              <Phone size={16} strokeWidth={1.5} className="text-warm-grey mt-1 flex-shrink-0" />
              <div>
                <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-warm-grey mb-2">
                  Phone
                </p>
                <a
                  href="tel:07824697164"
                  className="font-sans text-[15px] text-near-black hover:text-warm-grey transition-colors duration-300"
                >
                  07824 697164
                </a>
              </div>
            </motion.div>

            {/* Opening Hours */}
            <motion.div variants={fadeUp} className="mb-10">
              <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-warm-grey mb-5">
                Opening Hours
              </p>
              <div className="space-y-2.5">
                {openingHours.map(({ day, hours }) => (
                  <div
                    key={day}
                    className="flex items-baseline justify-between border-b border-near-black/6 pb-2.5"
                  >
                    <span
                      className={`font-sans text-[13px] ${
                        hours === "Closed" ? "text-near-black/30" : "text-near-black"
                      }`}
                    >
                      {day}
                    </span>
                    <span
                      className={`font-sans text-[13px] ${
                        hours === "Closed" ? "text-near-black/25" : "text-near-black"
                      }`}
                    >
                      {hours}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Social */}
            <motion.div variants={fadeUp} className="mb-12">
              <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-warm-grey mb-5">
                Follow
              </p>
              <div className="flex flex-col gap-3">
                {socialAccounts.map((account) => (
                  <a
                    key={account.handle}
                    href={account.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-sans text-[13px] text-near-black/60 hover:text-near-black transition-colors duration-300 group"
                    aria-label={`Follow ${account.label} on Instagram`}
                  >
                    <InstagramIcon size={13} strokeWidth={1.5} className="flex-shrink-0" />
                    {account.handle}
                    <ArrowUpRight
                      size={11}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeUp}>
              <a
                href={BOOKSY_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="book"
                className="inline-flex items-center gap-2 px-9 py-4 bg-near-black text-bone font-sans text-[10px] font-medium tracking-[0.18em] uppercase hover:bg-charcoal transition-colors duration-300"
              >
                Book Now
                <ArrowUpRight size={13} />
              </a>
            </motion.div>
          </motion.div>

          {/* Right — Map */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
            className="relative"
          >
            <div className="relative overflow-hidden" style={{ paddingBottom: "100%" }}>
              {/* TODO: Replace with your actual Google Maps embed URL for Unit 5 Acorn Court, Wymondham */}
              <iframe
                src="https://maps.google.com/maps?q=Unit+5+Acorn+Court,+Wymondham+NR18+9AL&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="absolute inset-0 w-full h-full border-0 grayscale"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="EDENS Barbershop location — Unit 5 Acorn Court, Wymondham"
                aria-label="Map showing EDENS location in Wymondham"
              />
            </div>
            {/* Map caption */}
            <p className="font-sans text-[10px] font-medium tracking-[0.15em] uppercase text-warm-grey mt-4">
              Unit 5, Acorn Court, Wymondham NR18 9AL
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
