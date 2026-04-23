"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import InstagramIcon from "@/components/ui/InstagramIcon";
import { navLinks, BOOKSY_URL } from "@/lib/data";

const socialAccounts = [
  { handle: "@lewiscowdrycuts_", url: "https://instagram.com/lewiscowdrycuts_" },
  { handle: "@barber.rt_", url: "https://instagram.com/barber.rt_" },
  { handle: "@oliblacktattoo", url: "https://instagram.com/oliblacktattoo" },
];

export default function Footer() {
  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-near-black border-t border-bone/8">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Main footer grid */}
        <div className="py-16 lg:py-20 grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {/* Column 1 — Logo + tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Image
              src="/logo.jpg"
              alt="EDENS"
              width={120}
              height={48}
              className="h-7 w-auto object-contain invert mb-6"
            />
            <p className="font-sans text-[13px] text-bone/40 leading-relaxed max-w-[220px]">
              With over 20 years of experience, providing personalised grooming
              with a friendly, dedicated team.
            </p>
            <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-bone/20 mt-5">
              Wymondham, NR18 9AL
            </p>
          </motion.div>

          {/* Column 2 — Quick nav */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-bone/30 mb-6">
              Navigate
            </p>
            <nav aria-label="Footer navigation">
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleAnchorClick(e, link.href)}
                      className="font-sans text-[13px] text-bone/50 hover:text-bone transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={BOOKSY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-[13px] text-gold/70 hover:text-gold transition-colors duration-300"
                  >
                    Book Now ↗
                  </a>
                </li>
              </ul>
            </nav>
          </motion.div>

          {/* Column 3 — Contact + social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-bone/30 mb-6">
              Contact
            </p>
            <div className="space-y-3 mb-8">
              <p className="font-sans text-[13px] text-bone/50">
                Unit 5, Acorn Court, Wymondham NR18 9AL
              </p>
              <a
                href="tel:07824697164"
                className="block font-sans text-[13px] text-bone/50 hover:text-bone transition-colors duration-300"
              >
                07824 697164
              </a>
            </div>

            <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-bone/30 mb-4">
              Follow
            </p>
            <div className="flex flex-col gap-2.5">
              {socialAccounts.map((account) => (
                <a
                  key={account.handle}
                  href={account.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-sans text-[12px] text-bone/40 hover:text-bone transition-colors duration-300"
                >
                  <InstagramIcon size={12} strokeWidth={1.5} />
                  {account.handle}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-bone/8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-[11px] text-bone/25 tracking-wide">
            © 2026 EDENS. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a
              href="#"
              className="font-sans text-[11px] text-bone/25 hover:text-bone/50 transition-colors duration-300"
            >
              Privacy
            </a>
            <a
              href="#"
              className="font-sans text-[11px] text-bone/25 hover:text-bone/50 transition-colors duration-300"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
