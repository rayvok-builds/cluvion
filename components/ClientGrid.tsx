"use client";

import { useRef, useEffect } from "react";

import Link from "next/link";

interface ClientCredit {
  id: string;
  name: string;
  category: string;
  year: string;
  image: string;
}

const MAIN_CLIENTS: ClientCredit[] = [
  {
    id: "wish-u",
    name: "WISH U",
    category: "Luxury Fashion",
    year: "2026",
    image:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "auraashe",
    name: "AURAASHÈ",
    category: "Haute Joaillerie",
    year: "2026",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "hastutii",
    name: "HASTUTII CRAFT",
    category: "Heritage Apparel",
    year: "2026",
    image:
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "mercedes",
    name: "MERCEDES-BENZ",
    category: "Automotive EV",
    year: "2026",
    image:
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "cosmetics",
    name: "LUMEN COSMETICS",
    category: "D2C Performance",
    year: "2026",
    image:
      "https://images.unsplash.com/photo-1616469829941-c7200edec809?q=80&w=1600&auto=format&fit=crop",
  },
];

const MARQUEE_CLIENTS = [
  "OKAPI SWIM",
  "MONOCHROME LABS",
  "ELYSIAN HOROLOGY",
  "VOLT NUTRITION",
  "NOVA DYNAMICS",
  "SERENE WELLNESS",
  "AETHER AUDIO",
  "VALOIS PARFUMS",
];

export default function ClientGrid() {
  const bgImageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Preload main client images for instantaneous response
  useEffect(() => {
    MAIN_CLIENTS.forEach((client) => {
      const img = new Image();
      img.src = client.image;
    });
  }, []);

  const handleMouseEnter = (imageUrl: string) => {
    const bgImage = bgImageRef.current;
    if (!bgImage) return;

    // Reset transform & transition
    bgImage.style.transition = "none";
    bgImage.style.transform = "scale(1.2)";

    // Set source and reveal
    bgImage.src = imageUrl;
    bgImage.style.opacity = "0.75";

    // Double rAF ensures browser paints the scale(1.2) before triggering 1.0 ease
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        bgImage.style.transition =
          "transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s ease";
        bgImage.style.transform = "scale(1.0)";
      });
    });
  };

  const handleMouseLeave = () => {
    const bgImage = bgImageRef.current;
    if (!bgImage) return;
    bgImage.style.opacity = "0";
  };

  return (
    <section id="clients" className="relative w-full min-h-[90vh] flex flex-col justify-center bg-[#070709] border-b border-white/[0.08] overflow-hidden select-none py-20 sm:py-28">
      {/* ── Background Zoom Image Container (CodePen Style) ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          ref={bgImageRef}
          alt=""
          className="absolute inset-0 w-full h-full object-cover will-change-transform opacity-0 filter brightness-90 contrast-105"
          style={{
            transform: "scale(1.2)",
            transition: "transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s ease",
          }}
        />
        {/* Subtle Dark Vignette & Gradient Overlays for optimal readability */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-transparent to-[#070709]/80 pointer-events-none" />
      </div>

      {/* ── Foreground Content Container ── */}
      <div
        ref={containerRef}
        onMouseLeave={handleMouseLeave}
        className="w-full max-w-[1050px] mx-auto px-6 sm:px-10 relative z-10"
      >
        {/* Section Header */}
        <div className="w-full pb-8 sm:pb-12 border-b border-white/[0.08] text-center px-4 mb-8 sm:mb-12">
          <h2 className="font-primary font-bold uppercase text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none">
            CLIENTS
          </h2>
        </div>

        {/* ── 5 Main Client Rows with Exclusion Invert Hover Wipe (Clickable to Case Studies) ── */}
        <div className="w-full">
          {MAIN_CLIENTS.map((client, idx) => {
            const indexFormatted = String(idx + 1).padStart(2, "0");
            return (
              <Link
                key={client.id}
                href={`/case-studies/${client.id}`}
                onMouseEnter={() => handleMouseEnter(client.image)}
                className="client-codepen-item group block text-inherit no-underline"
              >
                {/* Title */}
                <div className="client-codepen-title flex items-baseline gap-4 sm:gap-6">
                  <span className="font-mono text-xs sm:text-sm text-white/40 tracking-wider">
                    [{indexFormatted}]
                  </span>
                  <h3 className="font-primary text-2xl sm:text-4xl md:text-5xl uppercase tracking-tight text-[#f8f5f2] leading-tight transition-transform duration-200 group-hover:translate-x-1">
                    {client.name}
                  </h3>
                </div>

                {/* Meta: Category & Year */}
                <div className="client-codepen-meta flex items-center gap-4 sm:gap-8 text-right">
                  <span className="hidden sm:inline font-mono text-xs sm:text-[13px] uppercase tracking-widest text-[#f8f5f2]/70">
                    {client.category}
                  </span>
                  <span className="font-mono text-xs sm:text-sm text-[#f8f5f2]/60 tracking-wider">
                    {client.year}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        
      </div>

      {/* ── Horizontal Marquee for Remaining Clients (Continuous ticker with NO links) ── */}
      <div className="w-full mt-4 pt-6 border-t border-white/[0.08] relative z-10 overflow-hidden bg-black/30 backdrop-blur-sm py-4 select-none">
        {/* Subtle Edge Fade Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#070709] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#070709] to-transparent z-20 pointer-events-none" />

        <div className="flex w-max animate-marquee pointer-events-none">
          {MARQUEE_CLIENTS.concat(MARQUEE_CLIENTS).concat(MARQUEE_CLIENTS).map((clientName, idx) => (
            <div
              key={idx}
              className="flex items-center gap-8 mx-6 shrink-0 select-none"
            >
              <span className="font-primary font-bold text-sm sm:text-base tracking-[0.25em] text-white/40 uppercase">
                {clientName}
              </span>
              <span className="text-accent/50 text-xs select-none">·</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
