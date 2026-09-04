"use client";

import { useState } from "react";
import { FEATURED_VIDEOS, REEL_GRID_1, REEL_GRID_2 } from "../lib/data";
import WorkTile from "./WorkTile";
import { useFilm } from "./FilmContext";
import { ArrowRight, LayoutGrid, Square } from "lucide-react";

export default function WorkGrid() {
  const { openArchive } = useFilm();
  const [mobileView, setMobileView] = useState<"single" | "grid">("single");

  return (
    <section id="work" className="relative w-full py-12 sm:py-16 bg-[#050608] border-b border-white/[0.08] overflow-hidden">
      {/* Section Header */}
      <div className="w-full px-6 sm:px-10 mb-6 sm:mb-10 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-4 border-b border-white/[0.06]">
        <div className="flex items-baseline gap-4">
          <h2 className="font-primary font-bold text-4xl sm:text-6xl text-white tracking-tight leading-none uppercase">
            Projects<span className="text-accent">.</span>
          </h2>
        </div>

        {/* Mobile View Toggle Options (Visible on Mobile Screens Only) */}
        <div className="flex sm:hidden items-center justify-between gap-2 pt-2">
          <span className="font-mono text-[10px] text-white/50 uppercase tracking-widest">
            VIEW MODE:
          </span>
          <div className="flex items-center p-1 bg-black/60 border border-white/15 rounded-md backdrop-blur-md">
            <button
              type="button"
              onClick={() => setMobileView("single")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded text-[10.5px] font-mono tracking-wider uppercase transition-all ${
                mobileView === "single"
                  ? "bg-white text-black font-semibold shadow-sm"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <Square className="w-3 h-3" />
              <span>1 at a time</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileView("grid")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded text-[10.5px] font-mono tracking-wider uppercase transition-all ${
                mobileView === "grid"
                  ? "bg-white text-black font-semibold shadow-sm"
                  : "text-white/60 hover:text-white"
              }`}
            >
              <LayoutGrid className="w-3 h-3" />
              <span>Desktop Layout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Alternating Gallery Layout (Older Version) */}
      <div className="w-full flex flex-col gap-1 sm:gap-1.5 md:gap-2 px-0">
        {/* 1. First Full-Width Cinematic Feature Video */}
        <WorkTile item={FEATURED_VIDEOS.heroLarge1} isFullWidth />

        {/* 2. First 3-Reels Grid Row */}
        <div
          className={`w-full grid ${
            mobileView === "single"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-3"
          } gap-1 sm:gap-1.5 md:gap-2 px-0`}
        >
          {REEL_GRID_1.map((item, idx) => (
            <WorkTile key={item.id} item={item} index={idx} />
          ))}
        </div>

        {/* 3. Second Full-Width Cinematic Feature Video */}
        <WorkTile item={FEATURED_VIDEOS.heroLarge2} isFullWidth />

        {/* 4. Second 3-Reels Grid Row */}
        <div
          className={`w-full grid ${
            mobileView === "single"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-3"
          } gap-1 sm:gap-1.5 md:gap-2 px-0`}
        >
          {REEL_GRID_2.map((item, idx) => (
            <WorkTile key={item.id} item={item} index={idx + 3} />
          ))}
        </div>
      </div>

      {/* Bottom CTA Button */}
      <div className="mt-12 sm:mt-16 flex justify-center px-6">
        <button
          onClick={openArchive}
          className="group px-8 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-white bg-[#12131A] hover:bg-accent hover:text-black border border-white/15 hover:border-accent transition-all duration-300 rounded-full font-secondary flex items-center gap-3 shadow-lg"
        >
          <span>SEE MORE WORK</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
}
