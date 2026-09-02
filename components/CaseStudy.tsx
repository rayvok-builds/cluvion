"use client";

import { useFilm } from "./FilmContext";
import { ArrowRight, BarChart3, Film, Sparkles } from "lucide-react";

export default function CaseStudy() {
  const { openCaseStudy } = useFilm();

  return (
    <section className="relative w-full py-24 sm:py-32 bg-[#070709] border-b border-white/[0.08] overflow-hidden">
      {/* Background Accent Glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12 sm:mb-16 pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-accent tracking-widest font-semibold">07</span>
            <span className="text-xs font-secondary uppercase tracking-[0.25em] text-cinema-muted">
              BENCHMARK // CASE STUDY
            </span>
          </div>
          <div className="text-[11px] font-mono text-cinema-dim hidden sm:block">
            FEATURED MANDATE
          </div>
        </div>

        {/* Featured Client Container */}
        <div className="relative rounded-xl bg-gradient-to-b from-[#0D0E14] to-[#08090C] border border-white/10 p-8 sm:p-12 lg:p-16">
          <div className="max-w-4xl">
            {/* Featured Client Placeholder Header (Visually Distinct) */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-3.5 py-1 text-xs font-mono tracking-widest text-cinema-muted border border-dashed border-accent/40 rounded bg-accent/[0.05] uppercase">
                [FEATURED CLIENT]
              </span>
              <span className="text-xs font-secondary text-cinema-dim">
                D2C Luxury &amp; Performance Mandate
              </span>
            </div>

            {/* Three Numbers / Key Metrics (Exact Copy) */}
            <div className="font-primary font-bold text-xl sm:text-2xl lg:text-3xl text-white tracking-wide leading-snug mb-8">
              14 ad variations in one week · 60% below traditional production cost · Full production + Meta Ads mandate
            </div>

            {/* One Short Paragraph (Exact Copy) */}
            <p className="font-secondary text-base sm:text-lg lg:text-xl text-cinema-muted leading-relaxed max-w-3xl mb-10 font-normal">
              We ran <span className="text-white font-medium">[Client]</span>&apos;s entire creative pipeline — brand film to scroll-stopping ad variations — proof that great frames and great numbers aren&apos;t a trade-off.
            </p>

            {/* Exit Link CTA (Exact Copy: [ READ THE FULL CASE STUDY → ]) */}
            <div>
              <button
                onClick={openCaseStudy}
                className="btn-primary group inline-flex items-center gap-3 px-7 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-black bg-white hover:bg-accent transition-all duration-300 rounded-sm shadow-[0_0_25px_rgba(255,255,255,0.06)] hover:shadow-[0_0_25px_rgba(229,169,60,0.3)] font-primary"
              >
                <span>READ THE FULL CASE STUDY</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
