"use client";

import { useRef, useEffect } from "react";

interface ClientCredit {
  id: string;
  name: string;
  category: string;
  year: string;
  image: string;
}

const CLIENT_CREDITS: ClientCredit[] = [
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
  {
    id: "okapi",
    name: "OKAPI SWIM",
    category: "Coastal Apparel",
    year: "2026",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "monochrome",
    name: "MONOCHROME LABS",
    category: "Spatial Audio",
    year: "2026",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "elysian",
    name: "ELYSIAN HOROLOGY",
    category: "Swiss Watchmaking",
    year: "2026",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1600&auto=format&fit=crop",
  },
];

export default function ClientGrid() {
  const bgImageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Preload all client images for instantaneous response
  useEffect(() => {
    CLIENT_CREDITS.forEach((client) => {
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
    <section className="relative w-full min-h-[90vh] flex flex-col justify-center bg-[#070709] border-b border-white/[0.08] overflow-hidden select-none py-20 sm:py-28">
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
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-6 border-b border-white/[0.12] mb-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-accent tracking-widest font-semibold">
              02
            </span>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/50">
              // SELECTED CLIENTS · PRODUCTION ARCHIVE
            </span>
          </div>
          <span className="text-[11px] font-mono text-white/30 uppercase tracking-widest mt-2 sm:mt-0">
            NAME → PORTFOLIO
          </span>
        </div>

        {/* ── Projects List with Exclusion Invert Hover Wipe ── */}
        <div className="w-full">
          {CLIENT_CREDITS.map((client, idx) => {
            const indexFormatted = String(idx + 1).padStart(2, "0");
            return (
              <div
                key={client.id}
                onMouseEnter={() => handleMouseEnter(client.image)}
                className="client-codepen-item group"
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
              </div>
            );
          })}
        </div>

        {/* Bottom Editorial Note */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] font-mono text-white/30 tracking-widest uppercase">
          <span>ALL CLIENT PRODUCTIONS EXECUTED WITHOUT PHYSICAL SHOOTS</span>
          <span className="mt-2 sm:mt-0">[ CONFIDENTIAL MANDATES SEALED ]</span>
        </div>
      </div>
    </section>
  );
}
