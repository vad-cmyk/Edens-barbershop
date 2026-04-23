"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import Lightbox from "@/components/Lightbox";
import { galleryImages } from "@/lib/data";

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const isOpen = lightboxIndex !== null;

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const nextImage = () =>
    setLightboxIndex((i) =>
      i !== null ? (i + 1) % galleryImages.length : 0
    );
  const prevImage = () =>
    setLightboxIndex((i) =>
      i !== null
        ? (i - 1 + galleryImages.length) % galleryImages.length
        : galleryImages.length - 1
    );

  // Asymmetric masonry layout — assign heights
  const heights = [
    "h-80",
    "h-96",
    "h-72",
    "h-96",
    "h-80",
    "h-72",
    "h-96",
    "h-80",
    "h-72",
    "h-96",
    "h-80",
  ];

  return (
    <>
      <section id="gallery" className="py-28 lg:py-40 bg-bone">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-20">
            <SectionHeading label="The Work" className="mb-7" />
            <motion.h2
              className="font-display font-light text-[clamp(2.4rem,5vw,3.8rem)] text-near-black leading-tight"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              Precision in every frame.
            </motion.h2>
          </div>

          {/* Masonry grid */}
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
            {galleryImages.map((image, i) => (
              <motion.div
                key={image.src}
                className="break-inside-avoid cursor-pointer group relative overflow-hidden"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.6,
                  delay: (i % 4) * 0.08,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                onClick={() => openLightbox(i)}
              >
                <div className={`relative ${heights[i % heights.length]} w-full`}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    loading="lazy"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-near-black/0 group-hover:bg-near-black/40 transition-colors duration-400 flex items-center justify-center">
                    <span className="font-sans text-[9px] font-medium tracking-[0.2em] uppercase text-bone opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      View
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Instagram follow CTA */}
          {/* TODO: Replace with real Instagram Basic Display API feed integration */}
          <motion.div
            className="mt-20 pt-16 border-t border-near-black/10 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-warm-grey mb-4">
              Follow the work
            </p>
            <div className="flex justify-center gap-3 flex-wrap">
              {[
                { handle: "@lewiscowdrycuts_", url: "https://instagram.com/lewiscowdrycuts_" },
                { handle: "@barber.rt_", url: "https://instagram.com/barber.rt_" },
                { handle: "@oliblacktattoo", url: "https://instagram.com/oliblacktattoo" },
              ].map((account) => (
                <a
                  key={account.handle}
                  href={account.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-5 py-2.5 border border-near-black/20 font-sans text-[10px] font-medium tracking-[0.15em] uppercase text-warm-grey hover:border-near-black hover:text-near-black transition-all duration-300"
                >
                  {account.handle}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {isOpen && lightboxIndex !== null && (
        <Lightbox
          images={galleryImages}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrev={prevImage}
        />
      )}
    </>
  );
}
