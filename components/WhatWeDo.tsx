"use client";

import { useState } from "react";
import { CAPABILITIES } from "../lib/data";
import { useFilm } from "./FilmContext";
import { ArrowUpRight, ChevronDown, Sparkles } from "lucide-react";

export default function WhatWeDo() {
  const { openProjectModal } = useFilm();
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section id="services" className="relative w-full py-20 sm:py-28 bg-[#050608] border-b border-white/[0.08]">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
        
        {/* Rounded Services Container Card (Matching Screenshot) */}
        <div className="relative rounded-[2rem] sm:rounded-[3rem] bg-gradient-to-b from-[#0D0E14] via-[#090A0E] to-[#060709] border border-white/10 p-8 sm:p-14 lg:p-20 overflow-hidden shadow-2xl">
          
          {/* Subtle Ambient Light */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[140px] pointer-events-none" />

          {/* Section Heading (Matching Screenshot: Big "Services." Header) */}
          <div className="mb-14 sm:mb-20">
            <span className="text-xs font-mono text-accent uppercase tracking-widest block mb-3">
              05 // CAPABILITIES &amp; MANDATES
            </span>
            <h2 className="font-primary font-bold text-5xl sm:text-7xl md:text-8xl text-white tracking-tight leading-none">
              Services<span className="text-accent">.</span>
            </h2>
          </div>

          {/* Active Featured Service Top Highlight */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 mb-12 border-b border-white/10">
            {/* Left Col: Big Service Number & Focus */}
            <div className="lg:col-span-5">
              <span className="font-mono text-4xl sm:text-5xl font-bold text-accent block mb-3">
                {CAPABILITIES[activeIdx].num}.
              </span>
              <h3 className="font-primary font-bold text-2xl sm:text-3xl text-white mb-2">
                {CAPABILITIES[activeIdx].title}
              </h3>
              <p className="font-secondary text-sm text-cinema-muted leading-relaxed">
                {CAPABILITIES[activeIdx].focus}
              </p>
              <div className="mt-4 text-xs font-mono text-cinema-dim">
                ESTIMATED DELIVERY: <span className="text-white font-medium">{CAPABILITIES[activeIdx].leadTime}</span>
              </div>
            </div>

            {/* Right Col: Capability Badges (Matching Screenshot Pill Tags) */}
            <div className="lg:col-span-7 flex flex-wrap content-center gap-2 sm:gap-3">
              {CAPABILITIES[activeIdx].items.map((item, i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-full bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 text-xs sm:text-sm font-secondary text-white/90 tracking-wide transition-colors"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Services Accordion List (5 Numbered Blocks, Strictly exact copy) */}
          <div className="divide-y divide-white/[0.08]">
            {CAPABILITIES.map((cap, idx) => {
              const isActive = activeIdx === idx;
              return (
                <div
                  key={cap.num}
                  onClick={() => setActiveIdx(idx)}
                  className={`py-6 sm:py-8 transition-all cursor-pointer group flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                    isActive ? "opacity-100" : "opacity-60 hover:opacity-100"
                  }`}
                >
                  {/* Left: Number + Title */}
                  <div className="flex items-center gap-4 sm:gap-6">
                    <span className="font-mono text-sm sm:text-base text-accent font-semibold">
                      {cap.num}
                    </span>
                    <h4 className="font-primary font-bold text-xl sm:text-2xl lg:text-3xl text-white group-hover:text-accent transition-colors">
                      {cap.num} — {cap.title}
                    </h4>
                  </div>

                  {/* Center: Capability list inline */}
                  <div className="md:max-w-xl">
                    <p className="font-secondary text-xs sm:text-sm text-cinema-muted">
                      {cap.items.join(" · ")}
                    </p>
                  </div>

                  {/* Right: Select / Brief Action */}
                  <div className="flex items-center gap-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openProjectModal(cap.title);
                      }}
                      className="px-4 py-1.5 rounded-full text-xs font-secondary text-white/80 bg-white/[0.04] hover:bg-accent hover:text-black border border-white/10 hover:border-accent transition-all"
                    >
                      Brief Scope
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Button inside Card (Matching Screenshot Pill CTA) */}
          <div className="mt-14 flex justify-start">
            <button
              onClick={() => openProjectModal()}
              className="btn-primary group px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-black bg-white hover:bg-accent transition-all duration-300 rounded-full font-primary flex items-center gap-3 shadow-lg"
            >
              <span>DISCUSS YOUR MANDATE</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
