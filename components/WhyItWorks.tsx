"use client";

import { useState } from "react";
import { Sliders, Sparkles, Layers, ArrowRight } from "lucide-react";

interface SignalNode {
  id: string;
  name: string;
  desc: string;
  pos: string;
}

const SIGNAL_NODES: SignalNode[] = [
  { id: "story", name: "STORY", desc: "Directorial arcs, narrative tension, hook architecture.", pos: "top" },
  { id: "character", name: "CHARACTER", desc: "Consistent facial topology & wardrobe locked across 30+ shots.", pos: "top-right" },
  { id: "product", name: "PRODUCT", desc: "1:1 photoreal packs, jewelry facets, exact stitch precision.", pos: "left" },
  { id: "camera", name: "CAMERA", desc: "Anamorphic lenses, focal lengths, simulated crane & dolly moves.", pos: "right" },
  { id: "light", name: "LIGHT", desc: "Physically based ray-tracing, studio keys, volumetric bounce.", pos: "bottom-left" },
  { id: "location", name: "LOCATION", desc: "Paris to Jaipur. Zero flights, permits, or weather delays.", pos: "bottom" },
  { id: "performance", name: "PERFORMANCE", desc: "Ad testing, ROAS acceleration, rapid hook variations.", pos: "bottom-right" },
];

export default function WhyItWorks() {
  const [activeNode, setActiveNode] = useState<SignalNode>(SIGNAL_NODES[0]);

  return (
    <section id="about" className="relative w-full py-24 sm:py-32 bg-[#050608] border-b border-white/[0.08] select-none">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-8 border-b border-white/[0.12] mb-12">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-accent tracking-widest font-semibold">08</span>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/50">
              // STUDIO PHILOSOPHY · THE SIGNAL
            </span>
          </div>
          <span className="text-[11px] font-mono text-white/30 uppercase tracking-widest mt-2 sm:mt-0">
            INTELLIGENCE CONNECTED TO CRAFT
          </span>
        </div>

        {/* Big Bold Headline */}
        <div className="max-w-5xl mb-14">
          <h2 className="font-switzer font-medium text-3xl sm:text-5xl md:text-6xl lg:text-7xl uppercase text-white tracking-tight leading-[1.05] mb-6">
            We&apos;re Not An AI Tool. <br />
            We&apos;re The People Who{" "}
            <span className="text-accent underline decoration-accent/40 underline-offset-8">
              Mastered Them.
            </span>
          </h2>
          <p className="font-dmsans text-lg sm:text-2xl text-white/60 leading-relaxed font-light max-w-3xl">
            Anyone can generate a clip. Very few can hold a character across 30 shots, keep a product photoreal in every frame, and direct a story that actually sells. That&apos;s the craft. That&apos;s CLUVION.
          </p>
        </div>

        {/* ── "THE SIGNAL" INTERACTIVE CONNECTED SYSTEM ── */}
        <div className="border border-white/10 bg-[#090A0E] p-8 sm:p-14 relative overflow-hidden shadow-2xl">
          {/* Subtle Ambience */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[160px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Left: Interactive Signal Diagram (7 cols) */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center p-6 border border-white/10 bg-black/60 relative min-h-[420px]">
              {/* Central CLUVION Aperture Node */}
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border border-accent/60 bg-accent/10 flex flex-col items-center justify-center text-center p-2 shadow-[0_0_40px_rgba(229,169,60,0.15)] z-20 my-6">
                <span className="font-mono text-[9px] text-accent tracking-widest uppercase block">
                  CORE HUB
                </span>
                <span className="font-switzer font-bold text-sm sm:text-base text-white tracking-wider">
                  CLUVION
                </span>
                <span className="font-mono text-[8px] text-white/50 mt-1">
                  DIRECTORIAL ENGINE
                </span>
              </div>

              {/* Surrounding Connected Input Nodes */}
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-lg z-20">
                {SIGNAL_NODES.map((node) => {
                  const isActive = activeNode.id === node.id;
                  return (
                    <button
                      key={node.id}
                      type="button"
                      onClick={() => setActiveNode(node)}
                      className={`px-3.5 py-2 border font-mono text-xs uppercase tracking-wider transition-all duration-200 rounded-none flex items-center gap-2 ${
                        isActive
                          ? "border-accent bg-accent/20 text-white shadow-[0_0_15px_rgba(229,169,60,0.2)] font-bold"
                          : "border-white/15 bg-black/70 text-white/60 hover:text-white hover:border-white/30"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isActive ? "bg-accent shadow-[0_0_6px_#E5A93C]" : "bg-white/20"
                        }`}
                      />
                      <span>{node.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Technical Signal Footnote */}
              <div className="mt-8 font-mono text-[10px] text-white/30 uppercase tracking-widest text-center">
                INPUT → INTELLIGENCE → PRODUCTION → OUTPUT → PERFORMANCE
              </div>
            </div>

            {/* Right: Active Node Detail Inspector (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 bg-[#07080B] border border-white/10 min-h-[380px]">
              <div>
                <span className="font-mono text-[10px] text-accent tracking-widest uppercase block mb-1">
                  ACTIVE SIGNAL CHANNEL
                </span>
                <h3 className="font-switzer font-medium text-2xl sm:text-3xl text-white uppercase tracking-tight mb-3">
                  {activeNode.name}
                </h3>
                <p className="font-dmsans text-sm sm:text-base text-white/70 leading-relaxed font-light mb-6">
                  {activeNode.desc}
                </p>

                <div className="p-4 bg-black/50 border border-white/10 font-mono text-xs text-white/50 space-y-2">
                  <div className="flex justify-between">
                    <span>CONTROL SPEC:</span>
                    <span className="text-white font-medium">PRECISION LOCKED</span>
                  </div>
                  <div className="flex justify-between">
                    <span>HUMAN SUPERVISION:</span>
                    <span className="text-accent font-medium">DIRECTOR LEVEL</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ARTEFACT DEFECT:</span>
                    <span className="text-emerald-400 font-medium">ZERO TOLERANCE</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 mt-6 font-mono text-[11px] text-white/40">
                Click any channel node to inspect our directorial control architecture.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
