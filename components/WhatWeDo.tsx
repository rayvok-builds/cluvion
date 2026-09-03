"use client";

import { useState, useRef } from "react";
import { ArrowUpRight, Volume2, VolumeX, Sparkles, Layers, SlidersHorizontal, RefreshCw } from "lucide-react";
import { useFilm } from "./FilmContext";

interface ServiceItem {
  id: string;
  num: string;
  title: string;
  desc: string;
  capabilities: string[];
  turnaround: string;
  videoUrl: string;
  posterUrl: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: "brand-films",
    num: "01",
    title: "Brand Films",
    desc: "Hero identity, narrative scale, and brand films shot without physical sets or crews.",
    capabilities: ["Launch Films", "Founder Stories", "Festive Campaigns", "Concept Films", "4K Mastering"],
    turnaround: "7–14 Days",
    videoUrl: "https://res.cloudinary.com/dokrpo5fl/video/upload/v1788358969/Copy-of-mercedece.hevc_hhojlb.mp4",
    posterUrl: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "performance-ugc",
    num: "02",
    title: "Performance & UGC",
    desc: "One master creative splitting into multiple vertical variations. 1 Idea → Multiple high-converting variations.",
    capabilities: ["AI UGC Ads", "Hook Variations", "Creative Testing", "Meta Ready", "TikTok Ready"],
    turnaround: "3–5 Days",
    videoUrl: "https://res.cloudinary.com/dokrpo5fl/video/upload/v1788349395/7.hevc_fltmal.mp4",
    posterUrl: "https://images.unsplash.com/photo-1616469829941-c7200edec809?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "product-stills",
    num: "03",
    title: "Product Films & Stills",
    desc: "Product locked. World unlimited. Photoreal packshots and dynamic scenes with zero physical shipping.",
    capabilities: ["Photoreal Packshots", "Lifestyle Scenes", "Fashion", "Jewellery", "Product Campaigns"],
    turnaround: "4–7 Days",
    videoUrl: "https://res.cloudinary.com/dokrpo5fl/video/upload/v1788349390/9.hevc_d5gmk6.mp4",
    posterUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "micro-dramas",
    num: "04",
    title: "AI Micro-Dramas",
    desc: "One consistent character moving seamlessly through 30+ sequential cinematic scenes. The format eating the feed.",
    capabilities: ["Episodic Content", "Consistent Characters", "Branded Storytelling", "Social-First Formats"],
    turnaround: "10–14 Days",
    videoUrl: "https://res.cloudinary.com/dokrpo5fl/video/upload/v1788350306/4-tujvmy.hevc_pg3wkf.mp4",
    posterUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "growth",
    num: "05",
    title: "Growth & Mandates",
    desc: "Creative → Distribution → Performance. Film to ad variations to Meta Ads to performance optimization.",
    capabilities: ["Meta Ads", "Social Media Mandates", "Creative Testing", "Performance Optimisation"],
    turnaround: "Ongoing Mandate",
    videoUrl: "https://res.cloudinary.com/dokrpo5fl/video/upload/v1788358987/okapiswim.hevc_wgp3od.mp4",
    posterUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
  },
];

const PRODUCT_LOCATIONS = [
  { name: "PARIS", time: "GOLDEN HOUR", temp: "18°C" },
  { name: "DUBAI", time: "MIDNIGHT DUNE", temp: "29°C" },
  { name: "JAIPUR", time: "PALACE DAWN", temp: "24°C" },
  { name: "TOKYO", time: "NEON RAIN", temp: "16°C" },
];

export default function WhatWeDo() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [activeLocationIdx, setActiveLocationIdx] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { openProjectModal } = useFilm();

  const activeService = SERVICES[activeIdx];

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  return (
    <section id="services" className="relative w-full min-h-screen bg-[#050608] border-b border-white/[0.08] select-none">
      {/* Top Header Bar */}
      <div className="w-full px-6 sm:px-10 py-5 border-b border-white/[0.08] flex items-center justify-between bg-[#050608]">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-accent tracking-widest font-semibold">04</span>
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/50">
            // INTERACTIVE PRODUCTION CONSOLE
          </span>
        </div>
        <div className="flex items-center gap-3 text-[11px] font-mono text-white/30 hidden sm:flex">
          <span>MODE: [{activeService.num} / 05]</span>
          <span>·</span>
          <span>STUDIO REALTIME ENGINE</span>
        </div>
      </div>

      {/* Main Console Layout: Split Screen */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-60px)]">
        {/* ── Left Column: Interactive Mode Selector (5 Cols) ── */}
        <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-white/[0.08] p-6 sm:p-10 lg:p-14 flex flex-col justify-between bg-[#050608]">
          <div>
            <span className="font-mono text-xs text-accent uppercase tracking-widest block mb-4">
              CAPABILITIES &amp; MANDATES
            </span>
            <h2 className="font-switzer font-medium uppercase text-3xl sm:text-5xl text-white tracking-tight leading-none mb-10">
              Services<span className="text-accent">.</span>
            </h2>

            {/* Service Navigation Buttons */}
            <div className="space-y-2">
              {SERVICES.map((s, idx) => {
                const isActive = activeIdx === idx;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setActiveIdx(idx)}
                    className={`w-full text-left p-4 sm:p-5 border transition-all duration-300 rounded-none flex items-center justify-between group ${
                      isActive
                        ? "bg-[#0E1015] border-accent/50 shadow-[0_0_25px_rgba(229,169,60,0.06)]"
                        : "bg-[#07080B] border-white/[0.06] hover:border-white/20 hover:bg-[#0A0B0E]"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`font-mono text-xs ${
                          isActive ? "text-accent font-bold" : "text-white/30"
                        }`}
                      >
                        {s.num}
                      </span>
                      <span
                        className={`font-switzer font-medium uppercase text-base sm:text-lg tracking-wide ${
                          isActive ? "text-white" : "text-white/70 group-hover:text-white"
                        }`}
                      >
                        {s.title}
                      </span>
                    </div>

                    <div
                      className={`w-2 h-2 rounded-full transition-colors ${
                        isActive ? "bg-accent shadow-[0_0_8px_#E5A93C]" : "bg-white/10"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Active Service Technical Summary Card */}
            <div className="mt-8 p-5 bg-[#090A0E] border border-white/[0.08] space-y-4">
              <p className="font-dmsans text-sm text-white/70 leading-relaxed">
                {activeService.desc}
              </p>

              <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono">
                <span className="text-white/40 uppercase">TURNAROUND SLA:</span>
                <span className="text-white font-medium">{activeService.turnaround}</span>
              </div>

              {/* Capabilities Pill List */}
              <div className="pt-2 flex flex-wrap gap-1.5">
                {activeService.capabilities.map((c, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 text-[10px] font-mono text-white/70 bg-white/[0.04] border border-white/[0.06] uppercase"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Action CTA */}
          <div className="pt-8">
            <button
              type="button"
              onClick={() => openProjectModal(activeService.title)}
              className="w-full py-4 bg-white hover:bg-accent text-black font-switzer font-medium text-xs sm:text-sm uppercase tracking-widest rounded-none border border-white hover:border-accent transition-all duration-200 flex items-center justify-center gap-2 group shadow-[0_4px_25px_rgba(255,255,255,0.1)]"
            >
              <span>Brief {activeService.title}</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* ── Right Column: Cinematic Visual Viewport (7 Cols) ── */}
        <div className="lg:col-span-7 relative h-[65vh] sm:h-[75vh] lg:h-auto min-h-[500px] overflow-hidden bg-[#070709] flex flex-col justify-between p-6 sm:p-10">
          {/* Viewport Top HUD */}
          <div className="relative z-20 flex items-center justify-between text-xs font-mono text-white/60">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="tracking-widest uppercase">LIVE VIEWPORT // {activeService.title}</span>
            </div>

            {/* Audio Toggle Button */}
            <button
              type="button"
              onClick={toggleMute}
              className="flex items-center gap-2 px-3 py-1.5 bg-black/70 backdrop-blur-md border border-white/15 text-white/80 hover:text-accent hover:border-accent/40 text-[11px] font-mono uppercase tracking-wider rounded-none transition-colors"
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>Audio Muted</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-accent animate-pulse" />
                  <span className="text-accent font-semibold">Audio On</span>
                </>
              )}
            </button>
          </div>

          {/* Dynamic Visual Content based on active mode */}
          <div className="absolute inset-0 z-0">
            {/* Mode 01: Standard 16:9 Brand Film Viewport */}
            {activeIdx === 0 && (
              <div className="w-full h-full relative">
                <video
                  ref={videoRef}
                  src={activeService.videoUrl}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-cover rounded-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />
                <div className="absolute bottom-8 left-8 z-10">
                  <span className="text-[10px] font-mono text-accent uppercase tracking-widest block mb-1">
                    [ MASTER 4K COMPOSITE ]
                  </span>
                  <h4 className="font-switzer font-medium text-2xl sm:text-3xl text-white uppercase tracking-tight">
                    Cinematic Brand Film
                  </h4>
                  <p className="font-dmsans text-xs sm:text-sm text-white/60 mt-1 max-w-md">
                    Zero physical cameras, lighting rigs, or travel permits.
                  </p>
                </div>
              </div>
            )}

            {/* Mode 02: Performance & UGC (1 Idea → 3 Vertical Variations) */}
            {activeIdx === 1 && (
              <div className="w-full h-full relative p-6 sm:p-12 flex flex-col justify-center items-center bg-[#07070A]">
                <div className="text-center mb-6 z-10">
                  <span className="text-xs font-mono text-accent uppercase tracking-widest block">
                    1 MASTER CREATIVE → MULTIPLE CONVERTING HOOKS
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 sm:gap-6 w-full max-w-2xl h-[65%] z-10">
                  {[
                    { label: "HOOK A · DIRECT", roas: "3.4x", copy: "Direct Problem / Solved" },
                    { label: "HOOK B · UGC FEEL", roas: "4.1x", copy: "User Reaction / Proof" },
                    { label: "HOOK C · FOUNDER", roas: "3.8x", copy: "Origin Story / Craft" },
                  ].map((hook, i) => (
                    <div
                      key={i}
                      className="relative border border-white/20 bg-black/60 rounded-none overflow-hidden flex flex-col justify-between p-3 sm:p-4 group hover:border-accent transition-colors"
                    >
                      <video
                        src={activeService.videoUrl}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover opacity-65 group-hover:opacity-90 transition-opacity"
                      />
                      <div className="relative z-10 flex justify-between items-start">
                        <span className="text-[9px] font-mono text-accent bg-black/80 px-1.5 py-0.5 border border-white/10">
                          {hook.label}
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400 font-bold">
                          {hook.roas}
                        </span>
                      </div>
                      <div className="relative z-10 bg-black/80 p-1.5 border border-white/10 text-[9px] font-mono text-white/80">
                        {hook.copy}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 text-center z-10">
                  <span className="text-[11px] font-mono text-white/40 uppercase tracking-widest">
                    EXPORT: 9:16 META &amp; TIKTOK READY WITH 10+ HOOK EXPERIMENTS
                  </span>
                </div>
              </div>
            )}

            {/* Mode 03: Product Films & Stills (Product Locked, World Unlimited) */}
            {activeIdx === 2 && (
              <div className="w-full h-full relative flex flex-col justify-center items-center bg-[#070709]">
                <video
                  ref={videoRef}
                  src={activeService.videoUrl}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover filter brightness-75"
                />
                <div className="absolute inset-0 bg-black/50" />

                {/* Interactive Location Switcher HUD */}
                <div className="relative z-10 text-center max-w-lg p-6 bg-black/80 border border-white/15 backdrop-blur-md">
                  <span className="text-[10px] font-mono text-accent uppercase tracking-widest block mb-2">
                    PRODUCT LOCKED · WORLD UNLIMITED
                  </span>
                  <h4 className="font-switzer font-medium text-xl sm:text-2xl text-white uppercase tracking-tight mb-4">
                    Instant Global Location Synthesis
                  </h4>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                    {PRODUCT_LOCATIONS.map((loc, i) => (
                      <button
                        key={loc.name}
                        type="button"
                        onClick={() => setActiveLocationIdx(i)}
                        className={`p-2 border text-left text-[10px] font-mono uppercase transition-all ${
                          activeLocationIdx === i
                            ? "border-accent bg-accent/15 text-white"
                            : "border-white/10 bg-white/[0.02] text-white/50 hover:text-white"
                        }`}
                      >
                        <div className="font-bold">{loc.name}</div>
                        <div className="text-[8px] text-white/40">{loc.time}</div>
                      </button>
                    ))}
                  </div>

                  <p className="text-[11px] font-mono text-white/60">
                    Product geometries locked with zero stone drift or texture mutation.
                  </p>
                </div>
              </div>
            )}

            {/* Mode 04: AI Micro-Dramas (Consistent Characters Across 30+ Shots) */}
            {activeIdx === 3 && (
              <div className="w-full h-full relative p-6 sm:p-10 flex flex-col justify-center items-center bg-[#070709]">
                <video
                  ref={videoRef}
                  src={activeService.videoUrl}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover filter brightness-70"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/40" />

                <div className="relative z-10 w-full max-w-xl">
                  <div className="mb-4">
                    <span className="text-[10px] font-mono text-accent uppercase tracking-widest block">
                      CHARACTER CONTINUITY ENGINE
                    </span>
                    <h4 className="font-switzer font-medium text-2xl text-white uppercase">
                      Episodic AI Micro-Drama
                    </h4>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { shot: "SHOT 01", desc: "Arrival / CU" },
                      { shot: "SHOT 08", desc: "Dialogue / MS" },
                      { shot: "SHOT 19", desc: "Action / Tracking" },
                      { shot: "SHOT 30", desc: "Climax / Wide" },
                    ].map((st, i) => (
                      <div
                        key={i}
                        className="p-3 border border-white/15 bg-black/70 text-left font-mono"
                      >
                        <span className="text-[9px] text-accent block">{st.shot}</span>
                        <span className="text-[10px] text-white/80 block mt-1">{st.desc}</span>
                        <span className="text-[8px] text-emerald-400 block mt-2">100% IDENTITY LOCK</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Mode 05: Growth & Mandates (Full-Funnel Pipeline) */}
            {activeIdx === 4 && (
              <div className="w-full h-full relative p-6 sm:p-10 flex flex-col justify-center items-center bg-[#070709]">
                <video
                  ref={videoRef}
                  src={activeService.videoUrl}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover filter brightness-60"
                />
                <div className="absolute inset-0 bg-black/60" />

                <div className="relative z-10 w-full max-w-xl text-center">
                  <span className="text-xs font-mono text-accent uppercase tracking-widest block mb-2">
                    FULL-FUNNEL CREATIVE ENGINE
                  </span>
                  <h4 className="font-switzer font-medium text-2xl sm:text-3xl text-white uppercase mb-6">
                    Creative → Distribution → Performance
                  </h4>

                  {/* Flow Steps */}
                  <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 font-mono text-[11px]">
                    {["FILM", "→", "CREATIVE", "→", "META & TIKTOK", "→", "DATA", "→", "OPTIMISE"].map((step, idx) => (
                      <span
                        key={idx}
                        className={
                          step === "→"
                            ? "text-white/30"
                            : "px-3 py-1.5 bg-black/80 border border-white/20 text-white font-medium"
                        }
                      >
                        {step}
                      </span>
                    ))}
                  </div>

                  <p className="font-dmsans text-xs text-white/60 max-w-md mx-auto mt-6">
                    We don&apos;t just hand over mp4 files. We produce, run, test, and scale the winning creative iterations weekly.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Viewport Bottom Technical Metadata */}
          <div className="relative z-20 flex flex-col sm:flex-row items-start sm:items-center justify-between text-[11px] font-mono text-white/40 pt-4 border-t border-white/[0.08] bg-[#050608]/70 backdrop-blur-sm p-3">
            <span>PIPELINE: PROPRIETARY CLUVION ENGINE</span>
            <span className="mt-1 sm:mt-0">LATENCY: INSTANT REVISION</span>
          </div>
        </div>
      </div>
    </section>
  );
}
