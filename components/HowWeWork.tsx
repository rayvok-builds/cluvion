"use client";

import { useState } from "react";
import { Check, ArrowRight, Play, Film, Sliders, Layers } from "lucide-react";

export default function HowWeWork() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { num: "01", code: "BR", title: "BRIEF", label: "INTAKE & LOCK" },
    { num: "02", code: "SB", title: "STORYBOARD", label: "CINEMATIC FRAMING" },
    { num: "03", code: "PR", title: "PRODUCTION", label: "DIRECTION ENGINE" },
    { num: "04", code: "DL", title: "DELIVERY", label: "MULTI-ASPECT RATIOS" },
  ];

  return (
    <section id="process" className="relative w-full py-24 sm:py-32 bg-[#050608] border-b border-white/[0.08] select-none">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-8 border-b border-white/[0.12] mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-mono text-accent tracking-widest font-semibold">04</span>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/50">
                // THE PROCESS · PRODUCTION TIMELINE
              </span>
            </div>
            <h2 className="font-switzer font-medium uppercase text-3xl sm:text-5xl md:text-6xl text-white tracking-tight">
              From Idea <span className="text-accent">To Frame.</span>
            </h2>
          </div>
          <span className="text-[11px] font-mono text-white/30 uppercase tracking-widest mt-2 sm:mt-0">
            ZERO PHYSICAL SHOOTS · 100% DIRECTORIAL CONTROL
          </span>
        </div>

        {/* 4 Step Pipeline Selector Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-10">
          {steps.map((s, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={s.code}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`p-4 sm:p-5 border text-left transition-all duration-300 rounded-none group ${
                  isActive
                    ? "bg-[#0D0E14] border-accent/60 shadow-[0_0_20px_rgba(229,169,60,0.08)]"
                    : "bg-[#07080B] border-white/[0.08] hover:border-white/20 hover:bg-[#0A0B0E]"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-mono text-xs ${isActive ? "text-accent font-bold" : "text-white/30"}`}>
                    [{s.num}] ({s.code})
                  </span>
                  <div className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-accent" : "bg-white/20"}`} />
                </div>
                <h4 className={`font-switzer font-medium text-lg sm:text-xl uppercase ${isActive ? "text-white" : "text-white/60"}`}>
                  {s.title}
                </h4>
                <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest mt-1 block">
                  {s.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Interactive Visual Transformation Stage */}
        <div className="border border-white/10 bg-[#090A0E] p-6 sm:p-12 min-h-[480px] flex flex-col justify-between relative overflow-hidden">
          {/* Subtle Ambient Light */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[140px] pointer-events-none" />

          {/* ── STEP 01: BRIEF TERMINAL ── */}
          {activeStep === 0 && (
            <div className="space-y-8 animate-fadeIn">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <span className="font-mono text-xs text-accent uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  TECHNICAL PRODUCTION BRIEF // TERMINAL
                </span>
                <span className="font-mono text-xs text-emerald-400 uppercase bg-emerald-950/40 border border-emerald-500/30 px-2.5 py-1">
                  CONCEPT APPROVED ✓
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-mono">
                <div className="p-4 bg-black/40 border border-white/10">
                  <span className="text-[10px] text-white/40 uppercase block mb-1">PROJECT</span>
                  <span className="text-sm text-white font-semibold">WISH U</span>
                </div>
                <div className="p-4 bg-black/40 border border-white/10">
                  <span className="text-[10px] text-white/40 uppercase block mb-1">OBJECTIVE</span>
                  <span className="text-sm text-white font-semibold">NEW COLLECTION LAUNCH</span>
                </div>
                <div className="p-4 bg-black/40 border border-white/10">
                  <span className="text-[10px] text-white/40 uppercase block mb-1">FORMAT</span>
                  <span className="text-sm text-white font-semibold">BRAND FILM &amp; ADS</span>
                </div>
                <div className="p-4 bg-black/40 border border-white/10">
                  <span className="text-[10px] text-white/40 uppercase block mb-1">AUDIENCE</span>
                  <span className="text-sm text-white font-semibold">LUXURY CONSUMER</span>
                </div>
              </div>

              <div className="p-5 bg-black/50 border border-white/10 font-mono text-xs text-white/70 leading-relaxed max-w-3xl">
                <span className="text-accent block mb-2">// DIRECTORIAL NOTES:</span>
                Parisian architecture infused with heritage textures. Controlled volumetric lighting. 0 physical flights required. Fixed scope and turnaround locked within 48 hours.
              </div>
            </div>
          )}

          {/* ── STEP 02: STORYBOARD WITH CINEMATIC NOTATION ── */}
          {activeStep === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <span className="font-mono text-xs text-accent uppercase tracking-wider">
                  CINEMATIC STORYBOARD // 6-SHOT SEQUENTIAL COMPOSITION
                </span>
                <span className="font-mono text-xs text-white/40 uppercase">
                  STATUS: FRAME LOCK 100%
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  { num: "01", type: "WS", label: "ESTABLISHING WIDE", loc: "PARIS FACADE" },
                  { num: "02", type: "MS", label: "MEDIUM PROFILE", loc: "INTERIOR ATRIUM" },
                  { num: "03", type: "CU", label: "CLOSE-UP PRODUCT", loc: "TEXTURE MACRO" },
                  { num: "04", type: "TRACK", label: "MOTION TRACKING", loc: "MARBLE FOYER" },
                  { num: "05", type: "DOLLY", label: "SLOW DOLLY IN", loc: "DRAMATIC SILHOUETTE" },
                  { num: "06", type: "WIDE", label: "CLIMAX RESOLUTION", loc: "NIGHT CITYSCAPE" },
                ].map((f) => (
                  <div
                    key={f.num}
                    className="p-4 bg-black/60 border border-white/15 flex flex-col justify-between min-h-[160px] group hover:border-accent transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <span className="font-mono text-xs text-accent font-bold">[{f.num}]</span>
                      <span className="font-mono text-[9px] px-1.5 py-0.5 bg-white/10 border border-white/10 text-white">
                        {f.type}
                      </span>
                    </div>
                    <div className="font-mono text-[10px] text-white/80 uppercase mt-4">
                      {f.label}
                    </div>
                    <span className="font-mono text-[8px] text-white/40 mt-1 block">
                      {f.loc}
                    </span>
                  </div>
                ))}
              </div>

              <div className="text-[11px] font-mono text-white/50 text-center pt-2">
                Every frame approved and locked before a single render begins.
              </div>
            </div>
          )}

          {/* ── STEP 03: PRODUCTION ENGINE ── */}
          {activeStep === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <span className="font-mono text-xs text-accent uppercase tracking-wider">
                  STUDIO RENDERING PIPELINE // ACTIVE REFINEMENT
                </span>
                <span className="font-mono text-xs text-emerald-400 uppercase">
                  PROGRESS: 88% PASS
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 font-mono text-center">
                {["01 STILL", "02 MOTION", "03 LIGHT", "04 CHARACTER", "05 CAMERA", "06 FINAL"].map((st, i) => (
                  <div
                    key={i}
                    className={`p-4 border ${
                      i <= 4
                        ? "border-accent/40 bg-accent/[0.05] text-accent"
                        : "border-white/10 bg-black/50 text-white/40"
                    }`}
                  >
                    <span className="text-xs font-bold block">{st}</span>
                    <span className="text-[9px] text-white/40 block mt-1">
                      {i <= 4 ? "SYNTHESIZED ✓" : "COMPOSITING..."}
                    </span>
                  </div>
                ))}
              </div>

              {/* Minimal Sophisticated Rendering Progress Bar */}
              <div className="p-6 bg-black/70 border border-white/10 space-y-3 font-mono">
                <div className="flex justify-between text-xs">
                  <span className="text-white/60 uppercase">NEURAL PHOTOREAL RAY-TRACING &amp; LIGHT HARMONICS</span>
                  <span className="text-accent font-bold">88.4%</span>
                </div>
                <div className="w-full h-1.5 bg-white/10">
                  <div className="h-full bg-accent w-[88.4%] shadow-[0_0_12px_#E5A93C]" />
                </div>
                <span className="text-[10px] text-white/40 block">
                  ZERO HALLUCINATIONS · FACIAL MESH MEMORY VERIFIED
                </span>
              </div>
            </div>
          )}

          {/* ── STEP 04: MULTI-ASPECT DELIVERY ── */}
          {activeStep === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                <span className="font-mono text-xs text-accent uppercase tracking-wider">
                  ASPECT RATIO DEPLOYMENT // ALL PLATFORMS READY
                </span>
                <span className="font-mono text-xs text-emerald-400 uppercase">
                  DELIVERY STATUS: READY ✓
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-center">
                {[
                  { ratio: "16:9", label: "CINEMATIC BRAND FILM", cut: "30 SEC / 45 SEC", dest: "YOUTUBE & WEB" },
                  { ratio: "9:16", label: "TIKTOK & REELS", cut: "15 SEC / 06 SEC", dest: "META & TIKTOK" },
                  { ratio: "4:5", label: "FEED CAMPAIGN", cut: "15 SEC STATIC", dest: "INSTAGRAM CAROUSEL" },
                  { ratio: "1:1", label: "E-COMMERCE HERO", cut: "LOOPING PACKSHOT", dest: "STOREFRONT" },
                ].map((del, i) => (
                  <div key={i} className="p-5 border border-white/20 bg-black/60 text-left">
                    <span className="text-2xl font-bold text-accent block mb-2">{del.ratio}</span>
                    <span className="text-xs text-white block font-semibold">{del.label}</span>
                    <span className="text-[10px] text-white/50 block mt-1">{del.cut}</span>
                    <span className="text-[9px] text-white/30 block mt-3 pt-2 border-t border-white/10 uppercase">
                      TARGET: {del.dest}
                    </span>
                  </div>
                ))}
              </div>

              {/* Continuous Bridge Message */}
              <div className="p-4 bg-accent/[0.06] border border-accent/30 flex flex-col sm:flex-row items-center justify-between text-xs font-mono">
                <span className="text-white">
                  PRODUCTION COMPLETE → DELIVERED ASSETS AS FEATURED IN OUR CASE STUDIES
                </span>
                <a
                  href="#work"
                  className="text-accent underline uppercase tracking-widest mt-2 sm:mt-0 hover:text-white"
                >
                  EXPLORE FEATURED WORK ↓
                </a>
              </div>
            </div>
          )}

          {/* Bottom Step Indicator */}
          <div className="pt-6 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-white/40">
            <span>PIPELINE PHASE [{activeStep + 1} / 04]</span>
            <div className="flex gap-2">
              {steps.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveStep(i)}
                  className={`w-3 h-1 transition-all ${
                    activeStep === i ? "bg-accent w-6" : "bg-white/20"
                  }`}
                  aria-label={`Go to step ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
