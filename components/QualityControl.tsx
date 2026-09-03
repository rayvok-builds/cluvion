"use client";

import { useState } from "react";
import { CheckCircle2, ShieldCheck, Crosshair } from "lucide-react";

export default function QualityControl() {
  const [activeCheck, setActiveCheck] = useState<string | null>(null);

  const checks = [
    { id: "face", name: "FACE", status: "PASS", note: "Anatomy & micro-expressions locked." },
    { id: "hands", name: "HANDS", status: "PASS", note: "Accurate finger geometry & realistic articulation." },
    { id: "product", name: "PRODUCT", status: "PASS", note: "1:1 physical product match approved before render." },
    { id: "texture", name: "TEXTURE", status: "PASS", note: "Natural skin pores, cloth weaves, jewelry facets." },
    { id: "logo", name: "LOGO", status: "PASS", note: "Zero typography hallucination or vector drift." },
    { id: "light", name: "LIGHT", status: "PASS", note: "Physically consistent light sources across angles." },
    { id: "shadow", name: "SHADOW", status: "PASS", note: "Directional contact shadows grounded to plane." },
    { id: "continuity", name: "CONTINUITY", status: "PASS", note: "Scene-to-scene memory across entire cut." },
  ];

  return (
    <section className="relative w-full py-24 sm:py-32 bg-[#050608] border-b border-white/[0.08] select-none">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-8 border-b border-white/[0.12] mb-12">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-accent tracking-widest font-semibold">07</span>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/50">
              // QUALITY CONTROL · STUDIO AUDIT
            </span>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest mt-2 sm:mt-0 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            QC PROTOCOL // 100% STUDIO GATE
          </span>
        </div>

        {/* Big Bold Manifesto Headline */}
        <div className="max-w-5xl mb-14">
          <h2 className="font-switzer font-medium uppercase text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.02]">
            If It Looks AI, <br />
            It Doesn&apos;t Leave <br />
            <span className="text-accent underline decoration-accent/40 underline-offset-8">
              The Studio.
            </span>
          </h2>
          <p className="font-dmsans text-base sm:text-xl text-white/60 mt-6 max-w-2xl font-light leading-relaxed">
            Anyone can type a prompt into an algorithm and get a random clip. We direct, refine, grade, and hold the standard until it is indistinguishable from camera capture.
          </p>
        </div>

        {/* Interactive Inspection Console Over Cinematic Frame */}
        <div className="border border-white/10 bg-[#090A0E] grid grid-cols-1 lg:grid-cols-12 overflow-hidden shadow-2xl">
          {/* Left: Interactive Inspection Video Frame (7 cols) */}
          <div className="lg:col-span-7 relative min-h-[420px] lg:min-h-[500px] bg-black overflow-hidden flex items-center justify-center p-6">
            <video
              src="https://res.cloudinary.com/dokrpo5fl/video/upload/v1788349388/coffee.hevc_jkd40a.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-80 filter contrast-110"
            />
            <div className="absolute inset-0 bg-black/40" />

            {/* Target Reticles HUD */}
            <div className="relative z-10 w-full h-full flex flex-col justify-between pointer-events-none p-4 font-mono text-[10px] text-white/60">
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 bg-black/70 px-2.5 py-1 border border-white/10">
                  <Crosshair className="w-3 h-3 text-accent" />
                  OPTICAL INSPECTION ACTIVE
                </span>
                <span className="text-emerald-400 bg-black/70 px-2 py-1 border border-white/10">
                  ZERO DEFECT TOLERANCE
                </span>
              </div>

              {/* Center Crosshair Marker */}
              <div className="self-center flex flex-col items-center gap-2 bg-black/60 backdrop-blur-sm p-3 border border-accent/40">
                <div className="w-8 h-8 border border-accent/60 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 bg-accent" />
                </div>
                <span className="text-[10px] text-accent font-bold">1:1 TEXTURE LOCK VERIFIED</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="bg-black/70 px-2 py-1 border border-white/10">
                  RESOLUTION: 4K MASTER CINEMA
                </span>
                <span className="bg-black/70 px-2 py-1 border border-white/10">
                  COLOR SPACE: REC.709
                </span>
              </div>
            </div>
          </div>

          {/* Right: 8-Point Checkpoints Matrix (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-10 border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col justify-between bg-[#07080B]">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
                <span className="font-mono text-xs text-white/40 uppercase tracking-widest">
                  8-POINT VERIFICATION MATRIX
                </span>
                <span className="font-mono text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 font-bold">
                  QC STATUS: PASS
                </span>
              </div>

              {/* Checkpoints Grid */}
              <div className="grid grid-cols-2 gap-2.5 font-mono text-xs mb-6">
                {checks.map((chk) => (
                  <div
                    key={chk.id}
                    onMouseEnter={() => setActiveCheck(chk.note)}
                    onMouseLeave={() => setActiveCheck(null)}
                    className="p-3 border border-white/10 bg-black/40 hover:border-accent/50 transition-colors flex items-center justify-between cursor-pointer group"
                  >
                    <span className="text-white/80 group-hover:text-white font-medium">
                      {chk.name}
                    </span>
                    <span className="text-emerald-400 flex items-center gap-1 text-[11px] font-bold">
                      ✓ {chk.status}
                    </span>
                  </div>
                ))}
              </div>

              {/* Dynamic Note Box */}
              <div className="p-3.5 bg-white/[0.02] border border-white/10 font-mono text-xs text-white/60 min-h-[50px] flex items-center">
                {activeCheck ? (
                  <span className="text-accent animate-fadeIn">{activeCheck}</span>
                ) : (
                  <span>Hover over any checkpoint to view studio tolerance standard.</span>
                )}
              </div>
            </div>

            {/* Bottom Statement Banner */}
            <div className="pt-6 border-t border-white/10 mt-6">
              <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest block mb-1">
                STUDIO PROMISE
              </span>
              <p className="font-switzer font-medium text-lg sm:text-xl text-white uppercase tracking-tight">
                If It Breaks, We Rebuild It.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
