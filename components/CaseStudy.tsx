"use client";

import { useRef, useState } from "react";
import { useFilm } from "./FilmContext";
import { ArrowRight, Play, Volume2, VolumeX } from "lucide-react";

export default function CaseStudy() {
  const { openCaseStudy, openVideoLightbox } = useFilm();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleSound = () => {
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  return (
    <section id="work" className="relative w-full py-24 sm:py-32 bg-[#050608] border-b border-white/[0.08] select-none">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-8 border-b border-white/[0.12] mb-12">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-accent tracking-widest font-semibold">05</span>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-white/50">
              // SELECTED WORK · PRODUCTION DOSSIER
            </span>
          </div>
          <span className="text-[11px] font-mono text-white/30 uppercase tracking-widest mt-2 sm:mt-0">
            CASE STUDY // WISH U
          </span>
        </div>

        {/* Main Production Dossier Container */}
        <div className="border border-white/10 bg-[#090A0E] grid grid-cols-1 lg:grid-cols-12 overflow-hidden shadow-2xl">
          {/* ── Left Column: Large Cinematic Film (7 Cols) ── */}
          <div className="lg:col-span-7 relative min-h-[420px] lg:min-h-[580px] bg-black overflow-hidden group">
            <video
              ref={videoRef}
              src="https://res.cloudinary.com/dokrpo5fl/video/upload/v1788349391/6.hevc_q4albe.mp4"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="absolute inset-0 w-full h-full object-cover rounded-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

            {/* Top Project Tag */}
            <div className="absolute top-6 left-6 z-20 flex items-center gap-2 font-mono text-[11px] text-white/80 bg-black/60 backdrop-blur-md px-3 py-1.5 border border-white/15">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span>PROJECT 001 // WISH U</span>
            </div>

            {/* Sound Toggle */}
            <button
              type="button"
              onClick={toggleSound}
              className="absolute bottom-6 right-6 z-20 flex items-center gap-2 px-3.5 py-2 bg-black/70 backdrop-blur-md border border-white/15 text-white/80 hover:text-accent hover:border-accent/40 text-[11px] font-mono uppercase tracking-wider rounded-none transition-colors"
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>Muted</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-accent animate-pulse" />
                  <span className="text-accent font-semibold">Audio On</span>
                </>
              )}
            </button>

            {/* Bottom Overlay Info */}
            <div className="absolute bottom-6 left-6 z-20">
              <span className="text-[10px] font-mono text-accent uppercase tracking-widest block">
                GLOBAL BRAND FILM &amp; ADS
              </span>
              <h3 className="font-switzer font-medium uppercase text-2xl sm:text-3xl text-white">
                Shot Nowhere. Delivered Everywhere.
              </h3>
            </div>
          </div>

          {/* ── Right Column: Production Breakdown Dossier (5 Cols) ── */}
          <div className="lg:col-span-5 p-6 sm:p-10 lg:p-12 border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col justify-between bg-[#07080B]">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
                <span className="font-mono text-xs text-white/40 uppercase tracking-widest">
                  PRODUCTION METRICS MATRIX
                </span>
                <span className="font-mono text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5">
                  AUDITED STATS
                </span>
              </div>

              {/* 4 Big Metrics Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-black/40 border border-white/10">
                  <span className="font-mono text-[10px] text-white/40 uppercase block mb-1">AD VARIATIONS</span>
                  <span className="font-switzer font-bold text-3xl sm:text-4xl text-white">14</span>
                  <span className="font-mono text-[10px] text-white/30 block mt-1">TESTED IN WEEK 01</span>
                </div>

                <div className="p-4 bg-black/40 border border-white/10">
                  <span className="font-mono text-[10px] text-white/40 uppercase block mb-1">TURNAROUND</span>
                  <span className="font-switzer font-bold text-3xl sm:text-4xl text-accent">07</span>
                  <span className="font-mono text-[10px] text-white/30 block mt-1">DAYS BRIEF TO FINAL</span>
                </div>

                <div className="p-4 bg-black/40 border border-white/10">
                  <span className="font-mono text-[10px] text-white/40 uppercase block mb-1">FORMATS</span>
                  <span className="font-switzer font-bold text-3xl sm:text-4xl text-white">06</span>
                  <span className="font-mono text-[10px] text-white/30 block mt-1">16:9, 9:16, 4:5, 1:1</span>
                </div>

                <div className="p-4 bg-black/40 border border-white/10">
                  <span className="font-mono text-[10px] text-white/40 uppercase block mb-1">PHYSICAL FLIGHTS</span>
                  <span className="font-switzer font-bold text-3xl sm:text-4xl text-emerald-400">00</span>
                  <span className="font-mono text-[10px] text-white/30 block mt-1">ZERO TRAVEL PERMITS</span>
                </div>
              </div>

              {/* Breakdown List */}
              <div className="space-y-2.5 font-mono text-xs border-t border-white/[0.08] pt-6 mb-8">
                <div className="flex justify-between py-1 border-b border-white/[0.04]">
                  <span className="text-white/50">CONCEPT</span>
                  <span className="text-white font-medium">01 MASTER SCRIPT</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/[0.04]">
                  <span className="text-white/50">CHARACTERS</span>
                  <span className="text-white font-medium">04 MESH-LOCKED MODELS</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/[0.04]">
                  <span className="text-white/50">LOCATIONS</span>
                  <span className="text-white font-medium">06 SYNTHESIZED SETS</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/[0.04]">
                  <span className="text-white/50">CAMPAIGNS</span>
                  <span className="text-white font-medium">03 REGIONAL LAUNCHES</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3 pt-6 border-t border-white/10">
              <button
                type="button"
                onClick={openCaseStudy}
                className="w-full py-4 bg-white hover:bg-accent text-black font-switzer font-medium text-xs sm:text-sm uppercase tracking-widest rounded-none border border-white hover:border-accent transition-all duration-200 flex items-center justify-center gap-2 group shadow-[0_4px_25px_rgba(255,255,255,0.1)]"
              >
                <span>Read Full Case Study</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
