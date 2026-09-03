"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

interface ClientCredit {
  id: string;
  name: string;
  category: string;
  scope: string;
  year: string;
  previewUrl: string;
  videoUrl?: string;
}

const CLIENT_CREDITS: ClientCredit[] = [
  {
    id: "wish-u",
    name: "WISH U",
    category: "Luxury Fashion",
    scope: "Global Brand Film & Social Suite",
    year: "2026",
    previewUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "https://res.cloudinary.com/dokrpo5fl/video/upload/v1788349391/6.hevc_q4albe.mp4",
  },
  {
    id: "auraashe",
    name: "AURAASHÈ",
    category: "Haute Joaillerie",
    scope: "High-Jewelry Macro & Campaign Stills",
    year: "2026",
    previewUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "https://res.cloudinary.com/dokrpo5fl/video/upload/v1788349406/2.hevc_vmuagc.mp4",
  },
  {
    id: "hastutii",
    name: "HASTUTII CRAFT",
    category: "Heritage Apparel",
    scope: "Episodic Campaign & Lookbook",
    year: "2026",
    previewUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "https://res.cloudinary.com/dokrpo5fl/video/upload/v1788350306/4-tujvmy.hevc_pg3wkf.mp4",
  },
  {
    id: "client-04",
    name: "[CLIENT 04]",
    category: "Automotive EV",
    scope: "Cinematic Launch & Visual Stills",
    year: "2026",
    previewUrl: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "https://res.cloudinary.com/dokrpo5fl/video/upload/v1788358969/Copy-of-mercedece.hevc_hhojlb.mp4",
  },
  {
    id: "client-05",
    name: "[CLIENT 05]",
    category: "D2C Cosmetics",
    scope: "14 Performance Variations & UGC Set",
    year: "2026",
    previewUrl: "https://images.unsplash.com/photo-1616469829941-c7200edec809?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "https://res.cloudinary.com/dokrpo5fl/video/upload/v1788349395/7.hevc_fltmal.mp4",
  },
];

export default function ClientGrid() {
  const [activeClient, setActiveClient] = useState<ClientCredit | null>(null);

  return (
    <section className="relative w-full py-20 sm:py-28 bg-[#050608] border-b border-white/[0.08] overflow-hidden select-none">
      {/* Background Subtle Ambience on Hover */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-700 z-0"
        style={{ opacity: activeClient ? 0.22 : 0 }}
      >
        {activeClient?.videoUrl ? (
          <video
            key={activeClient.id}
            src={activeClient.videoUrl}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover filter blur-md grayscale brightness-50"
          />
        ) : null}
      </div>

      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-8 border-b border-white/[0.12] mb-2">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-accent tracking-widest font-semibold">02</span>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/50">
              // SELECTED CLIENTS · PRODUCTION ARCHIVE
            </span>
          </div>
          <span className="text-[11px] font-mono text-white/30 uppercase tracking-widest mt-2 sm:mt-0">
            NAME → EVIDENCE
          </span>
        </div>

        {/* Editorial Credits List */}
        <div className="divide-y divide-white/[0.08]">
          {CLIENT_CREDITS.map((client, idx) => {
            const isHovered = activeClient?.id === client.id;
            return (
              <div
                key={client.id}
                onMouseEnter={() => setActiveClient(client)}
                onMouseLeave={() => setActiveClient(null)}
                className={`group relative py-7 sm:py-9 transition-all duration-300 cursor-pointer ${
                  isHovered ? "bg-white/[0.02]" : ""
                }`}
              >
                {/* Thin active indicator line on hover */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-[2px] bg-accent transition-all duration-300 ${
                    isHovered ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
                  }`}
                />

                <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4 px-2 sm:px-4">
                  {/* Index / Code */}
                  <div className="md:col-span-1">
                    <span
                      className={`text-xs font-mono transition-colors duration-200 ${
                        isHovered ? "text-accent" : "text-white/25"
                      }`}
                    >
                      [0{idx + 1}]
                    </span>
                  </div>

                  {/* Client Name */}
                  <div className="md:col-span-5">
                    <h3
                      className={`font-switzer font-medium text-2xl sm:text-3xl md:text-4xl tracking-tight uppercase transition-all duration-200 ${
                        isHovered ? "text-white translate-x-1" : "text-white/70"
                      }`}
                    >
                      {client.name}
                    </h3>
                  </div>

                  {/* Category & Scope */}
                  <div className="md:col-span-4 flex flex-col">
                    <span
                      className={`font-mono text-xs uppercase tracking-widest transition-colors duration-200 ${
                        isHovered ? "text-accent" : "text-white/50"
                      }`}
                    >
                      {client.category}
                    </span>
                    <span className="font-dmsans text-xs text-white/35 mt-0.5 tracking-wide">
                      {client.scope}
                    </span>
                  </div>

                  {/* Year & Action Indicator */}
                  <div className="md:col-span-2 flex items-center justify-between md:justify-end gap-4">
                    <span className="font-mono text-xs text-white/25">
                      {client.year}
                    </span>
                    <div
                      className={`w-7 h-7 flex items-center justify-center border transition-all duration-300 ${
                        isHovered
                          ? "border-accent text-accent bg-accent/10"
                          : "border-white/10 text-white/30"
                      }`}
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
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
