"use client";

import { useState } from "react";
import { Check, X, ShieldAlert, Sparkles, Layers, Sliders } from "lucide-react";

export default function WhyItWorks() {
  const [activeTab, setActiveTab] = useState<"consistency" | "product" | "pacing">("consistency");

  const comparisons = {
    consistency: {
      title: "Character Continuity",
      rawAi: "Faces drift, clothing shifts between shots, no scene memory.",
      cluvionCraft: "Locked facial topology, consistent wardrobe, precise lighting across 30+ shots.",
    },
    product: {
      title: "Product Lock & Texture",
      rawAi: "Hallucinated logos, melted jewelry stones, incorrect stitching.",
      cluvionCraft: "1:1 photoreal product locks approved prior to final composite.",
    },
    pacing: {
      title: "Cinematic Storytelling",
      rawAi: "Random 4-second motion clips stitched without narrative pacing.",
      cluvionCraft: "Directorial cuts, dramatic tension, sound design, hook architecture.",
    },
  };

  return (
    <section id="about" className="relative w-full py-24 sm:py-32 bg-[#070709] border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12 sm:mb-16 pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-accent tracking-widest font-semibold">08</span>
            <span className="text-xs font-secondary uppercase tracking-[0.25em] text-cinema-muted">
              STUDIO PHILOSOPHY // WHY IT WORKS
            </span>
          </div>
          <div className="text-[11px] font-mono text-cinema-dim hidden sm:block">
            DIRECTORIAL CRAFT
          </div>
        </div>

        {/* Big Bold Headline (Exact Copy) */}
        <div className="max-w-5xl mb-12">
          <h2 className="font-primary font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl uppercase text-white tracking-tight leading-[1.08] mb-8">
            WE&apos;RE NOT AN AI TOOL. WE&apos;RE THE PEOPLE WHO MASTERED THEM.
          </h2>

          {/* Exact Copy Paragraph */}
          <p className="font-secondary text-lg sm:text-2xl text-cinema-muted leading-relaxed font-light">
            Anyone can generate a clip. Very few can hold a character across 30 shots, keep a beaded clutch photoreal in every frame, and cut a story that sells — that&apos;s the{" "}
            <span className="accent-italic text-accent font-medium uppercase tracking-wider">craft</span>, and it&apos;s ours.
          </p>
        </div>

        {/* Interactive Craft vs Raw AI Comparison Widget */}
        <div className="mt-14 p-6 sm:p-10 rounded-xl bg-[#0B0C10] border border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
            <div className="flex items-center gap-2 text-xs font-mono text-cinema-muted uppercase tracking-wider">
              <Layers className="w-4 h-4 text-accent" />
              <span>THE CRAFT GAP: RAW AI GENERATORS VS CLUVION DIRECTORS</span>
            </div>

            {/* Tab Controls */}
            <div className="flex items-center gap-2">
              {(["consistency", "product", "pacing"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded text-xs font-secondary transition-all ${
                    activeTab === tab
                      ? "bg-white text-black font-semibold shadow"
                      : "bg-white/[0.04] text-cinema-muted hover:text-white"
                  }`}
                >
                  {tab === "consistency" ? "Character" : tab === "product" ? "Product" : "Directing"}
                </button>
              ))}
            </div>
          </div>

          {/* Side by side comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
            {/* Raw AI column */}
            <div className="p-6 rounded-lg bg-black/40 border border-red-500/20 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-red-400 text-xs font-mono uppercase tracking-wider mb-3">
                  <X className="w-4 h-4" />
                  <span>Unfiltered AI Tools</span>
                </div>
                <h4 className="font-primary font-bold text-lg text-white/90 mb-2">
                  {comparisons[activeTab].title}
                </h4>
                <p className="font-secondary text-sm text-cinema-dim leading-relaxed">
                  {comparisons[activeTab].rawAi}
                </p>
              </div>
              <span className="text-[11px] font-mono text-red-400/60 uppercase tracking-widest mt-6 block">
                [ UNRELIABLE FOR LUXURY BRANDS ]
              </span>
            </div>

            {/* Cluvion Studio Craft column */}
            <div className="p-6 rounded-lg bg-accent/[0.04] border border-accent/40 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-accent text-xs font-mono uppercase tracking-wider mb-3">
                  <Check className="w-4 h-4" />
                  <span>Cluvion Studio Craft</span>
                </div>
                <h4 className="font-primary font-bold text-lg text-white mb-2">
                  {comparisons[activeTab].title}
                </h4>
                <p className="font-secondary text-sm text-white/90 leading-relaxed">
                  {comparisons[activeTab].cluvionCraft}
                </p>
              </div>
              <span className="text-[11px] font-mono text-accent uppercase tracking-widest mt-6 block">
                [ CAMERA-GRADE COMMERCIAL FINISH ]
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
