"use client";

import { useState } from "react";
import { FEATURED_VIDEOS, REEL_GRID_1, REEL_GRID_2 } from "../lib/data";
import WorkTile from "./WorkTile";
import ExpandingWorkVideo from "./ExpandingWorkVideo";
import { useFilm } from "./FilmContext";
import { ArrowRight, LayoutGrid, Square } from "lucide-react";

import Link from "next/link";

export default function WorkGrid() {
  const { openArchive } = useFilm();
  const [mobileView, setMobileView] = useState<"single" | "grid">("single");

  return (
    <section id="work" className="relative w-full py-12 sm:py-16 bg-[#050608] overflow-visible">
      {/* Section Header */}
      <div className="w-full pb-8 sm:pb-12 border-b border-white/[0.08] text-center px-4 mb-8 sm:mb-12 flex flex-col items-center justify-center gap-4">
        <h2 className="font-primary font-bold uppercase text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none">
          PROJECTS
        </h2>

        {/* Mobile View Toggle Options (Visible on Mobile Screens Only) */}
        <div className="flex sm:hidden items-center justify-center gap-2 pt-1">
          <span className="font-mono text-[10px] text-white/50 uppercase tracking-widest">
            VIEW:
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
              <span>Grid</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Alternating Gallery Layout: 2 Landscape Videos with 3 Small Videos in Center */}
      <div className="w-full flex flex-col gap-1 sm:gap-1.5 md:gap-2 px-0">
        {/* 1. First Full-Width Landscape Cinematic Feature Video with Scroll-Triggered Expansion */}
        <ExpandingWorkVideo item={FEATURED_VIDEOS.heroLarge1} />

        {/* 2. Center 3-Reels Grid Row (3 Small Videos) */}
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

        {/* 3. Second Full-Width Landscape Cinematic Feature Video */}
        <WorkTile item={FEATURED_VIDEOS.heroLarge2} isFullWidth />
      </div>

      {/* Bottom Action: Redirect to Case Studies Page */}
      <div className="w-full pt-12 sm:pt-16 flex flex-col items-center justify-center px-4">
        <Link
          href="/case-studies"
          className="c-cta-button group relative inline-flex items-center justify-center gap-3 px-8 sm:px-12 py-4 sm:py-5 bg-white text-black font-primary font-bold text-sm sm:text-base uppercase tracking-[0.2em] border border-white transition-all duration-300 shadow-[0_4px_30px_rgba(255,255,255,0.15)] hover:shadow-[0_4px_35px_rgba(229,169,60,0.35)] hover:text-black"
        >
          <span>VIEW MORE</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
        </Link>
        
      </div>
    </section>
  );
}
