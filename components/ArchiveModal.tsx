"use client";

import { useEffect, useState } from "react";
import { useFilm } from "./FilmContext";
import { WORK_ITEMS } from "../lib/data";
import { X, Play, Maximize2, Sparkles, Filter } from "lucide-react";
import Image from "next/image";

export default function ArchiveModal() {
  const { isArchiveOpen, closeArchive, openVideoLightbox } = useFilm();
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeArchive();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeArchive]);

  if (!isArchiveOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-2xl p-4 sm:p-8 overflow-y-auto animate-in fade-in duration-300">
      <div className="relative w-full max-w-6xl bg-[#0B0C10] border border-white/15 rounded-xl shadow-2xl p-6 sm:p-10 my-8">
        {/* Close Button */}
        <button
          onClick={closeArchive}
          className="absolute top-6 right-6 p-2.5 rounded-full bg-white/[0.06] hover:bg-white/15 text-white/80 hover:text-white transition-colors"
          aria-label="Close Archive"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Archive Header */}
        <div className="mb-8 border-b border-white/10 pb-6">
          <span className="text-xs font-mono text-accent uppercase tracking-widest block mb-2">
            [ STUDIO REPERTORY ARCHIVE ]
          </span>
          <h2 className="font-primary font-bold text-3xl sm:text-4xl text-white uppercase tracking-tight">
            Complete Production Vault
          </h2>
          <p className="font-secondary text-xs sm:text-sm text-cinema-muted mt-2">
            Explore 100+ commercial cuts, UGC variations, and AI micro-dramas.
          </p>
        </div>

        {/* Works Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WORK_ITEMS.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => {
                closeArchive();
                openVideoLightbox(item);
              }}
              className="group relative rounded-lg overflow-hidden border border-white/10 hover:border-accent/50 bg-[#08090C] p-4 cursor-pointer transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-video rounded overflow-hidden bg-black mb-3">
                <Image
                  src={item.posterUrl}
                  alt={item.client}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[10px] font-mono text-white/80">
                  <span>{item.aspectRatio}</span>
                  <span>{item.duration}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-1">
                {item.isPlaceholder ? (
                  <span className="text-xs font-mono text-cinema-dim border border-dashed border-white/20 px-1.5 py-0.5 rounded">
                    [CLIENT]
                  </span>
                ) : (
                  <h4 className="font-primary font-bold text-white group-hover:text-accent transition-colors">
                    {item.client}
                  </h4>
                )}
                <span className="text-[10px] font-mono text-cinema-dim">{item.year}</span>
              </div>

              <p className="font-secondary text-xs text-cinema-muted truncate">
                {item.tagline}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

