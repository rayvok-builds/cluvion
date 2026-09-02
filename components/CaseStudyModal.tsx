"use client";

import { useEffect } from "react";
import { useFilm } from "./FilmContext";
import { X, ArrowUpRight, CheckCircle2, TrendingUp, DollarSign, Layers } from "lucide-react";

export default function CaseStudyModal() {
  const { isCaseStudyOpen, closeCaseStudy, openProjectModal } = useFilm();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCaseStudy();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeCaseStudy]);

  if (!isCaseStudyOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-2xl p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-300">
      <div className="relative w-full max-w-3xl bg-[#0D0E14] border border-white/15 rounded-xl shadow-2xl p-6 sm:p-10 my-8">
        {/* Close Button */}
        <button
          onClick={closeCaseStudy}
          className="absolute top-6 right-6 p-2.5 rounded-full bg-white/[0.06] hover:bg-white/15 text-white/80 hover:text-white transition-colors"
          aria-label="Close Case Study"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Case Study Header */}
        <div className="mb-8 border-b border-white/10 pb-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-0.5 text-xs font-mono tracking-widest text-cinema-muted border border-dashed border-accent/40 rounded bg-accent/[0.05] uppercase">
              [FEATURED CLIENT]
            </span>
            <span className="text-xs font-mono text-cinema-dim">
              CASE STUDY REF: CLV-2026-08
            </span>
          </div>

          <h2 className="font-primary font-bold text-2xl sm:text-4xl text-white uppercase tracking-tight mb-4">
            Creative Pipeline &amp; Meta Ads Mandate
          </h2>

          <div className="font-primary font-bold text-lg sm:text-xl text-accent">
            14 ad variations in one week · 60% below traditional production cost · Full production + Meta Ads mandate
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="p-4 rounded-lg bg-black/40 border border-white/10">
            <span className="text-[11px] font-mono text-cinema-dim uppercase block mb-1">
              VARIATIONS DELIVERED
            </span>
            <span className="font-primary font-bold text-2xl text-white">14 Assets</span>
            <span className="text-xs font-secondary text-cinema-muted block mt-1">
              7 hooks, 2 ratios (9:16 &amp; 16:9)
            </span>
          </div>

          <div className="p-4 rounded-lg bg-black/40 border border-white/10">
            <span className="text-[11px] font-mono text-cinema-dim uppercase block mb-1">
              COST EFFICIENCY
            </span>
            <span className="font-primary font-bold text-2xl text-emerald-400">60% Below</span>
            <span className="text-xs font-secondary text-cinema-muted block mt-1">
              vs traditional ₹35L studio quote
            </span>
          </div>

          <div className="p-4 rounded-lg bg-black/40 border border-white/10">
            <span className="text-[11px] font-mono text-cinema-dim uppercase block mb-1">
              MANDATE SCALE
            </span>
            <span className="font-primary font-bold text-2xl text-accent">Full Funnel</span>
            <span className="text-xs font-secondary text-cinema-muted block mt-1">
              Concept to ad performance
            </span>
          </div>
        </div>

        {/* Narrative Paragraphs */}
        <div className="space-y-4 font-secondary text-sm sm:text-base text-cinema-muted leading-relaxed mb-8">
          <p>
            We ran <span className="text-white font-medium">[Client]</span>&apos;s entire creative pipeline — brand film to scroll-stopping ad variations — proof that great frames and great numbers aren&apos;t a trade-off.
          </p>
          <p>
            Instead of spending three weeks on casting, permits, studio rentals, and weather delays, we constructed an ultra-high fidelity visual world with locked product assets and character consistency across 14 ad creatives.
          </p>
        </div>

        {/* CTA Footer */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs font-secondary text-cinema-dim">
            Ready to execute a similar campaign for your brand?
          </span>

          <button
            onClick={() => {
              closeCaseStudy();
              openProjectModal("Growth Mandate");
            }}
            className="btn-primary w-full sm:w-auto px-6 py-3 text-xs font-bold uppercase tracking-wider text-black bg-white hover:bg-accent transition-colors rounded-sm font-primary"
          >
            Brief Mandate Like This
          </button>
        </div>
      </div>
    </div>
  );
}
