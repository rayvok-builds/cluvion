"use client";

import { useState } from "react";
import { Sparkles, Layers, Eye, EyeOff } from "lucide-react";

export default function ImpossibleShot() {
  const [activeLayer, setActiveLayer] = useState<number | null>(null);

  const layers = [
    { label: "LOCATION", status: "GENERATED", detail: "Surreal brutalist temple in Parisian fog. 0 physical permits." },
    { label: "CAST", status: "GENERATED", detail: "Custom couture models with persistent facial geometry." },
    { label: "LIGHT", status: "DIRECTED", detail: "Ray-traced volumetric twilight with physical caustics." },
    { label: "CAMERA", status: "DIRECTED", detail: "Impossible 200mm virtual macro moving at 120fps." },
    { label: "PRODUCT", status: "LOCKED", detail: "1:1 diamond facet & textile weave accuracy. Zero mutation." },
  ];

  return (
    <section className="relative w-full py-28 sm:py-36 bg-[#050608] border-b border-white/[0.08] overflow-hidden select-none">
      {/* Background High-Couture Atmosphere */}
      <div className="absolute inset-0 z-0">
        <video
          src="https://res.cloudinary.com/dokrpo5fl/video/upload/v1788349406/2.hevc_vmuagc.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover filter brightness-[0.38] contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050608] via-transparent to-[#050608]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
        {/* Section Marker */}
        <div className="flex items-center gap-3 mb-8">
          <span className="text-xs font-mono text-accent tracking-widest font-semibold">06</span>
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/50">
            // THE IMPOSSIBLE SHOT · CREATIVE POSSIBILITY
          </span>
        </div>

        {/* Big Provocative Headline */}
        <div className="max-w-4xl mb-14 sm:mb-20">
          <h2 className="font-switzer font-medium uppercase text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tight leading-[0.98]">
            What If <br />
            The Set <br />
            <span className="text-accent underline decoration-accent/40 underline-offset-8">
              Didn&apos;t Exist?
            </span>
          </h2>
        </div>

        {/* Layer Deconstruction Interface */}
        <div className="border border-white/15 bg-black/70 backdrop-blur-md p-6 sm:p-10 max-w-4xl">
          <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
            <span className="font-mono text-xs text-white/60 uppercase tracking-widest">
              DECONSTRUCTING THE COMPOSITE LAYERS
            </span>
            <span className="font-mono text-xs text-accent uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
              LAYER INSPECTION ACTIVE
            </span>
          </div>

          <div className="space-y-3">
            {layers.map((layer, idx) => {
              const isSelected = activeLayer === idx;
              return (
                <div
                  key={layer.label}
                  onClick={() => setActiveLayer(isSelected ? null : idx)}
                  className={`p-4 sm:p-5 border transition-all duration-300 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isSelected
                      ? "border-accent bg-accent/[0.08]"
                      : "border-white/10 bg-white/[0.02] hover:border-white/25"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-white/30">0{idx + 1}</span>
                    <span className="font-switzer font-medium text-base sm:text-lg text-white uppercase tracking-wider">
                      {layer.label}
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 border border-white/15 text-accent bg-black/60">
                      {layer.status}
                    </span>
                  </div>

                  <p className="font-dmsans text-xs text-white/60 sm:text-right max-w-sm">
                    {layer.detail}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Final Statement */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest block">
                PRODUCTION VERDICT
              </span>
              <span className="font-switzer font-bold text-2xl sm:text-3xl text-white uppercase tracking-tight">
                The Shot Exists.
              </span>
            </div>

            <div className="font-mono text-xs text-white/50 max-w-md leading-relaxed">
              We don&apos;t wait for the weather, book transatlantic flights, or rent soundstages. We direct reality.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
