"use client";

import { useState } from "react";
import { FEATURED_VIDEOS, REEL_GRID_1, REEL_GRID_2 } from "../lib/data";
import WorkTile from "./WorkTile";
import ExpandingWorkVideo from "./ExpandingWorkVideo";
import TextReveal from "./TextReveal";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function WorkGrid() {
  const [mobileView, setMobileView] = useState<"single" | "grid">("grid");

  return (
    <section id="work" className="relative w-full py-12 sm:py-16 bg-[#050608] overflow-visible">
      {/* Section Header */}
      <div className="w-full pb-8 sm:pb-12 border-b border-white/[0.08] text-center px-4 mb-8 sm:mb-12 flex flex-col items-center justify-center gap-4">
        <TextReveal
          as="h2"
          lines={["PROJECTS"]}
          className="font-primary font-bold uppercase text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-none"
        />

        {/* Minimal Mobile View Switcher (3 lines vs Grid icon) */}
        <div className="flex sm:hidden items-center justify-center pt-1">
          <div className="inline-flex items-center p-1 bg-white/[0.06] border border-white/10 rounded-full backdrop-blur-md shadow-lg">
            {/* 3 lines (list/single view) */}
            <button
              type="button"
              onClick={() => setMobileView("single")}
              aria-label="Single view"
              className={`p-2 rounded-full transition-all duration-200 ${mobileView === "single"
                  ? "bg-white text-black shadow-sm"
                  : "text-white/50 hover:text-white"
                }`}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            </button>

            {/* Grid icon (3-column portrait grid view matching 2nd screenshot) */}
            <button
              type="button"
              onClick={() => setMobileView("grid")}
              aria-label="Grid view"
              className={`p-2 rounded-full transition-all duration-200 ${mobileView === "grid"
                  ? "bg-white text-black shadow-sm"
                  : "text-white/50 hover:text-white"
                }`}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="5" height="18" rx="1" />
                <rect x="10" y="3" width="5" height="18" rx="1" />
                <rect x="17" y="3" width="5" height="18" rx="1" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main Alternating Gallery Layout: Matching Screenshot 2 Structure */}
      <div className="w-full flex flex-col gap-1 sm:gap-1.5 md:gap-2 px-0">
        {/* 1. First Full-Width Landscape Cinematic Feature Video with Scroll-Triggered Expansion */}
        <ExpandingWorkVideo item={FEATURED_VIDEOS.heroLarge1} mobileView={mobileView} />

        {/* 2. First 3-Reels Grid Row (Matching 3 vertical videos side-by-side in screenshot 2) */}
        <div
          className={`w-full grid ${mobileView === "single"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-3"
            } gap-1 sm:gap-1.5 md:gap-2 px-0`}
        >
          {REEL_GRID_1.map((item, idx) => (
            <WorkTile key={item.id} item={item} index={idx} mobileView={mobileView} />
          ))}
        </div>

        {/* 3. Second Full-Width Landscape Cinematic Feature Video */}
        <WorkTile item={FEATURED_VIDEOS.heroLarge2} isFullWidth mobileView={mobileView} />

        {/* 4. Second 3-Reels Grid Row */}
        <div
          className={`w-full grid ${mobileView === "single"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-3"
            } gap-1 sm:gap-1.5 md:gap-2 px-0`}
        >
          {REEL_GRID_2.map((item, idx) => (
            <WorkTile key={item.id} item={item} index={idx} mobileView={mobileView} />
          ))}
        </div>
      </div>

      {/* Bottom Action: Redirect to Case Studies Page */}
      <div className="w-full pt-12 sm:pt-16 flex flex-col items-center justify-center px-4">
        <Link
          href="/case-studies"
          className="group inline-flex items-center justify-center gap-3 px-8 sm:px-12 py-3.5 sm:py-4 bg-white hover:bg-black text-black hover:text-white border border-white font-mono text-xs sm:text-sm uppercase tracking-[0.15em] transition-all duration-300 cursor-pointer rounded-none select-none shadow-sm"
        >
          <span>VIEW MORE</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
        </Link>
      </div>
    </section>
  );
}
